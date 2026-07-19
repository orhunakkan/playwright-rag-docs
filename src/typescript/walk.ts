import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { TsRawDoc, TsSourceDescriptor } from './types.js';

async function collectMdPaths(dir: string, base: string, recursive: boolean): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (recursive) {
        paths.push(...(await collectMdPaths(join(dir, entry.name), join(base, entry.name), recursive)));
      }
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      paths.push(join(base, entry.name));
    }
  }
  return paths;
}

export async function readSourceFiles(repoPath: string, source: TsSourceDescriptor): Promise<TsRawDoc[]> {
  const subdirAbsPath = join(repoPath, source.repoSubdir);
  const relPaths = await collectMdPaths(subdirAbsPath, '', source.recursive);
  const docs: TsRawDoc[] = [];
  for (const relPath of relPaths) {
    const raw = await readFile(join(subdirAbsPath, relPath), 'utf8');
    docs.push({ section: source.section, relPath, raw });
  }
  return docs;
}
