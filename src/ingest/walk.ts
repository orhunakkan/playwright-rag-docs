import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { RawDoc, SourceDescriptor } from '../types.js';

async function collectMdxPaths(dir: string, base: string, recursive: boolean): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (recursive) {
        paths.push(...(await collectMdxPaths(join(dir, entry.name), join(base, entry.name), recursive)));
      }
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.mdx')) {
      paths.push(join(base, entry.name));
    }
  }
  return paths;
}

export async function readSourceFiles(repoPath: string, source: SourceDescriptor): Promise<RawDoc[]> {
  const subdirAbsPath = join(repoPath, source.repoSubdir);
  const relPaths = await collectMdxPaths(subdirAbsPath, '', source.recursive);
  const docs: RawDoc[] = [];
  for (const relPath of relPaths) {
    const raw = await readFile(join(subdirAbsPath, relPath), 'utf8');
    docs.push({ docType: source.docType, relPath, raw });
  }
  return docs;
}
