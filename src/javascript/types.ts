export type JsSection = 'general' | 'guide' | 'reference';

export interface JsSourceDescriptor {
  section: JsSection;
  /** Path inside the cloned mdn/content repo to read pages from. */
  repoSubdir: string;
  /** Whether to walk repoSubdir recursively for nested `index.md` pages. */
  recursive: boolean;
  /** Output directory for normalized .md files, e.g. docs/javascript/reference. */
  outputDir: string;
}

export interface JsRawDoc {
  section: JsSection;
  /** Directory path relative to the source's repoSubdir, e.g. 'global_objects/array/at', or 'index' for the section root. */
  relPath: string;
  raw: string;
}

export interface JsChunk {
  id: string;
  title: string;
  headingPath: string[];
  content: string;
  section: JsSection;
  sourceUrl: string;
  sourceFile: string;
  sourceRef: string;
}

export interface JsSyncMeta {
  commitSha: string;
  syncedAt: string;
  docCount: number;
  chunkCount: number;
  counts: Partial<Record<JsSection, number>>;
}
