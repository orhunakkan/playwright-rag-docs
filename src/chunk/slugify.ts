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
 *
 * Explicit slugs are still run through the slugger (not used verbatim): some
 * upstream pages reuse the same explicit slug across two different headings
 * (e.g. .NET's `class-browsercontext.mdx` gives both
 * `RunAndWaitForConsoleMessageAsync` and `WaitForConsoleMessageAsync` the
 * identical `#browser-context-wait-for-console-message` anchor) — this
 * dedupes those with a `-1`/`-2` suffix instead of colliding.
 */
export function resolveHeading(rawText: string, slugger: GithubSlugger): ResolvedHeading {
  const explicit = rawText.match(EXPLICIT_SLUG_RE);
  if (explicit) {
    const text = rawText.slice(0, explicit.index).trim();
    return { text, slug: slugger.slug(explicit[1]) };
  }
  const text = rawText.trim();
  return { text, slug: slugger.slug(text) };
}
