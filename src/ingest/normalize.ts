export interface NormalizeResult {
  title: string;
  /** Present on sources that publish an exact live URL in frontmatter (e.g. TypeScript's docs). */
  permalink?: string;
  body: string;
}

function extractFrontmatter(raw: string): { title: string; permalink?: string; rest: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) return { title: '', rest: raw };
  const frontmatter = fmMatch[1];
  const titleMatch = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m);
  const permalinkMatch = frontmatter.match(/^permalink:\s*"?(.*?)"?\s*$/m);
  return {
    title: titleMatch ? titleMatch[1] : '',
    permalink: permalinkMatch ? permalinkMatch[1] : undefined,
    rest: raw.slice(fmMatch[0].length)
  };
}

function stripThemeImports(text: string): string {
  return text.replace(/^import\s+.+from\s+['"]@(?:theme|site)\/.+['"];?\s*$/gm, '');
}

/**
 * Flattens Docusaurus <Tabs>/<TabItem> blocks into labeled sequential
 * sections instead of dropping the non-default variants, e.g. npm/yarn/pnpm
 * or Python sync/async examples all survive, just de-JSX-ified.
 */
function unwrapTabs(text: string): string {
  return text.replace(/<Tabs\b([\s\S]*?)>([\s\S]*?)<\/Tabs>/g, (_match, attrs: string, body: string) => {
    const labelMap = new Map<string, string>();
    const valuesMatch = attrs.match(/values=\{\[([\s\S]*?)\]\}/);
    if (valuesMatch) {
      const entryRe = /\{\s*label:\s*'([^']*)'\s*,\s*value:\s*'([^']*)'\s*\}/g;
      let entry: RegExpExecArray | null;
      while ((entry = entryRe.exec(valuesMatch[1]))) {
        labelMap.set(entry[2], entry[1]);
      }
    }

    const sections: string[] = [];
    const itemRe = /<TabItem\s+value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/TabItem>/g;
    let item: RegExpExecArray | null;
    while ((item = itemRe.exec(body))) {
      const value = item[1];
      const content = item[2].trim();
      const label = labelMap.get(value) ?? value;
      sections.push(`**${label}**\n\n${content}`);
    }
    return sections.length > 0 ? sections.join('\n\n') : body.trim();
  });
}

function stripXSearch(text: string): string {
  return text.replace(/<x-search>[\s\S]*?<\/x-search>/g, '');
}

function stripFont(text: string): string {
  return text.replace(/<font\b[^>]*>[\s\S]*?<\/font>/g, '');
}

function stripAnchorDecorations(text: string): string {
  return text
    .replace(/<a\s+aria-hidden[^>]*\/>/g, '')
    .replace(/<a\s+href="#[^"]*"\s+class="list-anchor">#<\/a>/g, '');
}

/**
 * Simple-strip policy for Playwright's bracket type-ref shorthand (e.g.
 * `[Promise]&lt;[Object]&gt;` -> `Promise<Object>`): decode HTML entities,
 * drop brackets around anything that isn't an actual `[text](url)` link.
 * Trades full inline-code fidelity for a much simpler normalizer.
 */
function resolveTypeRefs(text: string): string {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\[([^[\]]+)\](?!\()/g, '$1');
}

function resolveH1(body: string, title: string): string {
  const trimmed = body.trimStart();
  const h1Match = trimmed.match(/^#[ \t]+.*(?:\r?\n|$)/);
  const resolvedTitle = title || 'Untitled';
  if (h1Match) {
    return `# ${resolvedTitle}\n${trimmed.slice(h1Match[0].length).trimStart()}`;
  }
  return `# ${resolvedTitle}\n\n${trimmed}`;
}

export function normalizeMdx(raw: string): NormalizeResult {
  const { title, permalink, rest } = extractFrontmatter(raw.replace(/\r\n/g, '\n'));
  let text = rest;
  text = stripThemeImports(text);
  text = unwrapTabs(text);
  text = stripXSearch(text);
  text = stripFont(text);
  text = stripAnchorDecorations(text);
  text = resolveTypeRefs(text);
  text = resolveH1(text, title);
  return { title: title || 'Untitled', permalink, body: `${text.trim()}\n` };
}
