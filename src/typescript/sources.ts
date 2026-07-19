import type { TsSection, TsSourceDescriptor } from './types.js';

export const TYPESCRIPT_WEBSITE_REPO = 'https://github.com/microsoft/TypeScript-Website.git';

const DOCS_ROOT = 'packages/documentation/copy/en';

// handbook-v1 (legacy, superseded by handbook-v2) is deliberately excluded.
const RECURSIVE_SECTIONS: TsSection[] = [
  'handbook-v2',
  'get-started',
  'javascript',
  'modules-reference',
  'project-config',
  'reference',
  'release-notes',
  'tutorials',
  'declaration-files'
];

export const SOURCES: TsSourceDescriptor[] = [
  {
    // Flat root-level pages (e.g. Nightly Builds.md). Non-recursive so it
    // never descends into the named section folders handled below.
    section: 'general',
    repoSubdir: DOCS_ROOT,
    recursive: false,
    outputDir: 'docs/typescript/general'
  },
  ...RECURSIVE_SECTIONS.map(
    (section): TsSourceDescriptor => ({
      section,
      repoSubdir: `${DOCS_ROOT}/${section}`,
      recursive: true,
      outputDir: `docs/typescript/${section}`
    })
  )
];
