import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { SourceDescriptor } from '../types.js';

const PLAYWRIGHT_DEV_BASE = 'https://playwright.dev';

/** Strips the .mdx/.md extension and joins path segments for local filenames. */
export function flattenRelPath(relPath: string): string {
  return relPath
    .replace(/\.mdx?$/i, '')
    .split(/[\\/]/)
    .join('-');
}

/** Same as flattenRelPath but preserves nested segments for the live site URL. */
export function relPathToUrlPath(relPath: string): string {
  return relPath
    .replace(/\.mdx?$/i, '')
    .split(/[\\/]/)
    .join('/');
}

export function buildSourceUrl(source: SourceDescriptor, relPath: string): string {
  return `${PLAYWRIGHT_DEV_BASE}${source.siteUrlPrefix}/${relPathToUrlPath(relPath)}`;
}

/** Inserts a `> Source:` attribution line right after the leading H1. */
export function buildFileContent(body: string, sourceUrl: string): string {
  const lines = body.split('\n');
  const h1Index = lines.findIndex((line) => line.startsWith('# '));
  const sourceLine = `> **Source:** [${sourceUrl.replace(/^https?:\/\//, '')}](${sourceUrl})`;
  if (h1Index === -1) {
    return [sourceLine, '', body].join('\n');
  }
  lines.splice(h1Index + 1, 0, '', sourceLine, '', '---');
  return lines.join('\n');
}

export async function writeNormalizedFile(
  source: SourceDescriptor,
  fileSlug: string,
  content: string
): Promise<string> {
  const outPath = join(source.outputDir, `${fileSlug}.md`);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, content, 'utf8');
  return outPath;
}
