export type DocType = 'agent-cli' | 'api' | 'guides' | 'mcp';

export interface SourceDescriptor {
  docType: DocType;
  /** Path inside the cloned playwright.dev repo to read .mdx files from. */
  repoSubdir: string;
  /** Whether to walk repoSubdir recursively (nested folders flatten with '-'). */
  recursive: boolean;
  /** Live playwright.dev URL path prefix, e.g. '/agent-cli' or '/docs/api'. */
  siteUrlPrefix: string;
  /** Output directory for normalized .md files, e.g. docs/nodejs/agent-cli. */
  outputDir: string;
}

export interface RawDoc {
  docType: DocType;
  /** Path relative to the source's repoSubdir, e.g. 'commands/attach.mdx'. */
  relPath: string;
  raw: string;
}

export interface NormalizedDoc {
  docType: DocType;
  /** Flattened output filename without extension, e.g. 'commands-attach'. */
  fileSlug: string;
  title: string;
  body: string;
  sourceUrl: string;
  sourceFile: string;
}

export interface Chunk {
  id: string;
  title: string;
  headingPath: string[];
  content: string;
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
  countsByDocType: Record<DocType, number>;
}
