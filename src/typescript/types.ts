export type TsSection =
  | 'general'
  | 'handbook-v2'
  | 'get-started'
  | 'javascript'
  | 'modules-reference'
  | 'project-config'
  | 'reference'
  | 'release-notes'
  | 'tutorials'
  | 'declaration-files';

export interface TsSourceDescriptor {
  section: TsSection;
  /** Path inside the cloned TypeScript-Website repo to read .md files from. */
  repoSubdir: string;
  /** Whether to walk repoSubdir recursively (nested folders flatten with '-'). */
  recursive: boolean;
  /** Output directory for normalized .md files, e.g. docs/typescript/handbook-v2. */
  outputDir: string;
}

export interface TsRawDoc {
  section: TsSection;
  /** Path relative to the source's repoSubdir, e.g. 'Type Manipulation/Generics.md'. */
  relPath: string;
  raw: string;
}

export interface TsChunk {
  id: string;
  title: string;
  headingPath: string[];
  content: string;
  section: TsSection;
  sourceUrl: string;
  sourceFile: string;
  sourceRef: string;
}

export interface TsSyncMeta {
  commitSha: string;
  syncedAt: string;
  docCount: number;
  chunkCount: number;
  counts: Partial<Record<TsSection, number>>;
}
