import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { JsRawDoc, JsSourceDescriptor } from './types.js';

/**
 * mdn/content models one page per directory (`some/topic/index.md`), unlike
 * TypeScript-Website's flat `Topic.md` files. This walks directories rather
 * than files, recording each page's dir path relative to repoSubdir — the
 * repoSubdir itself is a page too (its own index.md), recorded as 'index'.
 */
async function collectPageDirs(dir: string, base: string, recursive: boolean): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const pages: string[] = [];

  const hasIndex = entries.some((entry) => entry.isFile() && entry.name.toLowerCase() === 'index.md');
  if (hasIndex) pages.push(base || 'index');

  if (recursive) {
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const nextBase = base ? `${base}/${entry.name}` : entry.name;
      pages.push(...(await collectPageDirs(join(dir, entry.name), nextBase, recursive)));
    }
  }

  return pages;
}

export async function readSourceFiles(repoPath: string, source: JsSourceDescriptor): Promise<JsRawDoc[]> {
  const subdirAbsPath = join(repoPath, source.repoSubdir);
  const relPaths = await collectPageDirs(subdirAbsPath, '', source.recursive);
  const docs: JsRawDoc[] = [];
  for (const relPath of relPaths) {
    const pageDir = relPath === 'index' ? subdirAbsPath : join(subdirAbsPath, relPath);
    const raw = await readFile(join(pageDir, 'index.md'), 'utf8');
    docs.push({ section: source.section, relPath, raw });
  }
  return docs;
}
