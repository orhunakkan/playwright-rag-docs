export interface NodeRawDoc {
  /** File stem under doc/api/, e.g. 'fs', 'child_process' — also used as the search-filterable module name. */
  module: string;
  raw: string;
}

export interface NodeChunk {
  id: string;
  title: string;
  headingPath: string[];
  content: string;
  module: string;
  sourceUrl: string;
  sourceFile: string;
  sourceRef: string;
}

export interface NodeSyncMeta {
  commitSha: string;
  tag: string;
  syncedAt: string;
  docCount: number;
  chunkCount: number;
}
