import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadIndex, type Db } from '../search/buildIndex.js';
import { hybridSearch, type SearchResult } from '../search/query.js';

const server = new McpServer({ name: 'playwright-rag-docs', version: '1.0.0' });

let dbPromise: Promise<Db> | undefined;

function getDb(): Promise<Db> {
  if (!dbPromise) {
    dbPromise = loadIndex();
  }
  return dbPromise;
}

function formatResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return 'No matching Playwright documentation found.';
  }
  return results
    .map((result) => {
      const path = result.headingPath ? `${result.title} > ${result.headingPath}` : result.title;
      return `### ${path}\n\n${result.content}\n\nSource: ${result.sourceUrl}`;
    })
    .join('\n\n---\n\n');
}

server.registerTool(
  'search_playwright_docs',
  {
    title: 'Search Playwright Node.js Docs',
    description:
      "Hybrid (keyword + semantic) search over Playwright's Node.js documentation (API reference, guides, MCP, and agent CLI docs). Returns cited excerpts with source URLs.",
    inputSchema: {
      query: z.string().describe('Natural-language question or exact API name (e.g. "page.locator" or "how do I wait for network idle")'),
      limit: z.number().int().min(1).max(20).optional().describe('Max results to return (default 5)'),
      docType: z.enum(['agent-cli', 'api', 'guides', 'mcp']).optional().describe('Restrict results to one doc category')
    }
  },
  async ({ query, limit, docType }) => {
    const db = await getDb();
    const results = await hybridSearch(db, query, { limit, docType });
    return { content: [{ type: 'text', text: formatResults(results) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
