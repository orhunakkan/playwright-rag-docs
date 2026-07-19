import { EMBEDDING_DIM } from './embed.js';

export const schema = {
  id: 'string',
  docType: 'enum',
  title: 'string',
  headingPath: 'string',
  content: 'string',
  sourceUrl: 'string',
  sourceFile: 'string',
  playwrightRef: 'string',
  embedding: `vector[${EMBEDDING_DIM}]`
} as const;
