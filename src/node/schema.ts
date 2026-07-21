import { EMBEDDING_DIM } from '../search/embed.js';

export const schema = {
  id: 'string',
  module: 'enum',
  title: 'string',
  headingPath: 'string',
  content: 'string',
  sourceUrl: 'string',
  sourceFile: 'string',
  sourceRef: 'string',
  embedding: `vector[${EMBEDDING_DIM}]`
} as const;
