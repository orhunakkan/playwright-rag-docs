export type DocType = 'agent-cli' | 'api' | 'guides' | 'mcp';

export type Language = 'nodejs' | 'python' | 'java' | 'dotnet';

export interface SourceDescriptor {
  language: Language;
  docType: DocType;
  /** Path inside the cloned playwright.dev repo to read .mdx files from. */
  repoSubdir: string;
  /** Whether to walk repoSubdir recursively (nested folders flatten with '-'). */
  recursive: boolean;
  /** Live playwright.dev URL path prefix, e.g. '/agent-cli' or '/python/docs/api'. */
  siteUrlPrefix: string;
  /** Output directory for normalized .md files, e.g. docs/python/api. */
  outputDir: string;
}

export interface RawDoc {
  language: Language;
  docType: DocType;
  /** Path relative to the source's repoSubdir, e.g. 'commands/attach.mdx'. */
  relPath: string;
  raw: string;
}

export interface Chunk {
  id: string;
  title: string;
  headingPath: string[];
  content: string;
  language: Language;
  docType: DocType;
  sourceUrl: string;
  sourceFile: string;
  playwrightRef: string;
}

export interface SyncMeta {
  commitSha: string;
  syncedAt: string;
  docCount: number;
  chunkCount: number;
  counts: Record<Language, Partial<Record<DocType, number>>>;
}
