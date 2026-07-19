import GithubSlugger from 'github-slugger';

export const EXPLICIT_SLUG_RE = /\{\/\*\s*#([a-zA-Z0-9-]+)\s*\*\/\}\s*$/;
const EXPLICIT_SLUG_LINE_RE = /[ \t]*\{\/\*\s*#[a-zA-Z0-9-]+\s*\*\/\}[ \t]*$/gm;

/** Strips heading-slug comments from already-sliced chunk content (any line). */
export function stripSlugComments(text: string): string {
  return text.replace(EXPLICIT_SLUG_LINE_RE, '');
}

export interface ResolvedHeading {
  text: string;
  slug: string;
}

/**
 * Resolves a heading's display text and URL anchor slug. API pages carry an
 * explicit Docusaurus slug comment (`### bind {/* #browser-bind *\/}`); other
 * pages have no explicit slug and get one auto-derived the same way
 * Docusaurus does (github-slugger, in document order, with dedup suffixes).
 */
export function resolveHeading(rawText: string, slugger: GithubSlugger): ResolvedHeading {
  const explicit = rawText.match(EXPLICIT_SLUG_RE);
  if (explicit) {
    const text = rawText.slice(0, explicit.index).trim();
    const slug = explicit[1];
    slugger.slug(slug);
    return { text, slug };
  }
  const text = rawText.trim();
  return { text, slug: slugger.slug(text) };
}
