export interface JsNormalizeResult {
  title: string;
  /** From frontmatter `slug:`, e.g. 'Web/JavaScript/Reference/Global_Objects/Array' — maps directly to the live MDN URL. */
  slug?: string;
  body: string;
}

function extractFrontmatter(raw: string): { title: string; slug?: string; rest: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) return { title: '', rest: raw };
  const frontmatter = fmMatch[1];
  const titleMatch = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m);
  const slugMatch = frontmatter.match(/^slug:\s*"?(.*?)"?\s*$/m);
  return {
    title: titleMatch ? titleMatch[1] : '',
    slug: slugMatch ? slugMatch[1] : undefined,
    rest: raw.slice(fmMatch[0].length)
  };
}

// mdn/content bodies are peppered with KumaScript macros (`{{jsxref(...)}}` etc.)
// instead of Docusaurus JSX. By far the most common (~12k occurrences across the
// JS corpus) is the xref family, which links a term to its own reference page —
// `{{jsxref("Array/length", "length")}}` -> the second arg is display text,
// `{{jsxref("Array.from()")}}` -> the single arg is both name and display.
// Resolved to inline code since these almost always name an API identifier.
const XREF_MACRO = /\{\{\s*(?:jsxref|domxref|DOMxRef|cssxref|htmlelement|HTMLElement|httpheader|HTTPHeader|glossary|Glossary|svgattr|SVGAttr)\(([^}]*)\)\s*\}\}/gi;

function resolveXrefMacros(text: string): string {
  return text.replace(XREF_MACRO, (_match, argsRaw: string) => {
    const args = [...argsRaw.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
    const display = args.length > 1 ? args[1] : args[0];
    return display ? `\`${display}\`` : '';
  });
}

// Small inline status badges MDN renders next to a term (e.g. a parameter marked optional).
const INLINE_BADGES: Record<string, string> = {
  optional_inline: '(optional)',
  deprecated_inline: '**Deprecated.**',
  'non-standard_inline': '**Non-standard.**',
  experimental_inline: '**Experimental.**',
  readonly_inline: '(read-only)'
};

function resolveInlineBadges(text: string): string {
  return text.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (match, name: string) => INLINE_BADGES[name] ?? match);
}

// Simple-strip policy (same trade-off as ingest/normalize.ts's resolveTypeRefs) for
// every remaining macro: interactive-example embeds, compat/spec tables, deprecation
// banners, page-nav helpers, etc. all render as widgets with no plain-text equivalent,
// so dropping them entirely beats trying to model each one.
function stripRemainingMacros(text: string): string {
  return text.replace(/\{\{[^{}]*\}\}/g, '');
}

function prependTitle(body: string, title: string): string {
  const resolvedTitle = title || 'Untitled';
  return `# ${resolvedTitle}\n\n${body.trimStart()}`;
}

export function normalizeMdn(raw: string): JsNormalizeResult {
  const { title, slug, rest } = extractFrontmatter(raw.replace(/\r\n/g, '\n'));
  let text = rest;
  text = resolveXrefMacros(text);
  text = resolveInlineBadges(text);
  text = stripRemainingMacros(text);
  text = prependTitle(text, title);
  return { title: title || 'Untitled', slug, body: `${text.trim()}\n` };
}
