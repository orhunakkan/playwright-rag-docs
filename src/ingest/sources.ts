import type { SourceDescriptor } from '../types.js';

export const PLAYWRIGHT_DEV_REPO = 'https://github.com/microsoft/playwright.dev.git';

export const SOURCES: SourceDescriptor[] = [
  {
    docType: 'agent-cli',
    repoSubdir: 'agent-cli',
    recursive: true,
    siteUrlPrefix: '/agent-cli',
    outputDir: 'docs/nodejs/agent-cli'
  },
  {
    docType: 'mcp',
    repoSubdir: 'mcp',
    recursive: true,
    siteUrlPrefix: '/mcp',
    outputDir: 'docs/nodejs/mcp'
  },
  {
    docType: 'api',
    repoSubdir: 'nodejs/docs/api',
    recursive: false,
    siteUrlPrefix: '/docs/api',
    outputDir: 'docs/nodejs/api'
  },
  {
    docType: 'guides',
    // Top-level files only (non-recursive) — this naturally excludes the
    // nested `api/` subdirectory, which is handled by its own descriptor above.
    repoSubdir: 'nodejs/docs',
    recursive: false,
    siteUrlPrefix: '/docs',
    outputDir: 'docs/nodejs/guides'
  }
];
