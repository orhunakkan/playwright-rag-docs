import { mkdir, writeFile } from 'node:fs/promises';
import { chunkMarkdown } from '../src/chunk/chunker.js';
import { cleanupClone, cloneDocsRepo } from '../src/ingest/clone.js';
import { normalizeMdx } from '../src/ingest/normalize.js';
import { SOURCES } from '../src/ingest/sources.js';
import { readSourceFiles } from '../src/ingest/walk.js';
import { buildFileContent, buildSourceUrl, flattenRelPath, writeNormalizedFile } from '../src/ingest/write.js';
import { createDb, indexChunks, persistIndex } from '../src/search/buildIndex.js';
import type { Chunk, DocType, SyncMeta } from '../src/types.js';

async function main() {
  console.log('Cloning microsoft/playwright.dev (shallow)...');
  const { repoPath, commitSha } = await cloneDocsRepo();

  const allChunks: Chunk[] = [];
  const countsByDocType: Record<DocType, number> = {
    'agent-cli': 0,
    api: 0,
    guides: 0,
    mcp: 0
  };

  try {
    for (const source of SOURCES) {
      const rawDocs = await readSourceFiles(repoPath, source);
      console.log(`  ${source.docType}: ${rawDocs.length} file(s)`);
      countsByDocType[source.docType] = rawDocs.length;

      for (const rawDoc of rawDocs) {
        const { body } = normalizeMdx(rawDoc.raw);
        const sourceUrl = buildSourceUrl(source, rawDoc.relPath);
        const fileContent = buildFileContent(body, sourceUrl);
        const fileSlug = flattenRelPath(rawDoc.relPath);
        const outPath = (await writeNormalizedFile(source, fileSlug, fileContent)).split('\\').join('/');

        const chunks = chunkMarkdown(fileContent, {
          docType: source.docType,
          fileSlug,
          sourceUrl,
          sourceFile: outPath,
          playwrightRef: commitSha
        });
        allChunks.push(...chunks);
      }
    }
  } finally {
    await cleanupClone(repoPath);
  }

  console.log(`Chunked into ${allChunks.length} chunk(s) total. Embedding + indexing...`);

  const db = createDb();
  await indexChunks(db, allChunks);
  await persistIndex(db);

  const docCount = Object.values(countsByDocType).reduce((a, b) => a + b, 0);
  const meta: SyncMeta = {
    commitSha,
    syncedAt: new Date().toISOString(),
    docCount,
    chunkCount: allChunks.length,
    countsByDocType
  };
  await mkdir('data', { recursive: true });
  await writeFile('data/sync-meta.json', JSON.stringify(meta, null, 2), 'utf8');

  console.log('Sync complete.');
  console.log(`  commit: ${commitSha}`);
  console.log(`  docs: ${docCount} ${JSON.stringify(countsByDocType)}`);
  console.log(`  chunks: ${allChunks.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
