import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NodeRawDoc } from './types.js';

/** doc/api/ is flat — one .md file per module, unlike Playwright/TypeScript/MDN's nested trees. */
export async function readApiDocs(repoPath: string, subdir: string): Promise<NodeRawDoc[]> {
  const dirPath = join(repoPath, subdir);
  const entries = await readdir(dirPath, { withFileTypes: true });
  const docs: NodeRawDoc[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.md')) continue;
    const module = entry.name.replace(/\.md$/i, '');
    const raw = await readFile(join(dirPath, entry.name), 'utf8');
    docs.push({ module, raw });
  }

  return docs.sort((a, b) => a.module.localeCompare(b.module));
}
