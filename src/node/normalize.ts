import { parse as parseYaml } from 'yaml';

interface YamlChange {
  version?: string | string[];
  description?: string;
}

interface YamlMeta {
  added?: string | string[];
  deprecated?: string | string[];
  removed?: string | string[];
  napiVersion?: string | string[];
  changes?: YamlChange[];
}

// doc/api/*.md precedes almost every heading with an `<!-- YAML ... -->` HTML
// comment recording exactly which Node version added/deprecated/changed that
// API — genuine (if slightly irregular) YAML, including nested version lists
// for dual-backported changes, so it's parsed with the `yaml` package rather
// than regexed by hand.
const YAML_BLOCK = /<!--\s*YAML\n([\s\S]*?)\n[ \t]*-->\n?/g;
const INTRODUCED_IN = /<!--\s*introduced_in=(v[\d.]+)\s*-->\n?/g;
// Pure doc-generator bookkeeping (`<!--type=class-->`, `<!--name=fs-->`,
// `<!-- source_link=lib/fs.js -->`) with no reader-facing value.
const NOISE_COMMENT = /<!--\s*(?:type|name|source_link)=[^>]*-->\n?/g;

function formatVersion(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value.join(', ') : String(value);
}

function formatYamlBlock(yamlBody: string): string {
  let meta: YamlMeta;
  try {
    meta = (parseYaml(yamlBody) ?? {}) as YamlMeta;
  } catch {
    console.warn('  WARNING: failed to parse a YAML doc-metadata block, dropping it:', yamlBody.slice(0, 80));
    return '';
  }

  const lines: string[] = [];
  const added = formatVersion(meta.added);
  const deprecated = formatVersion(meta.deprecated);
  const removed = formatVersion(meta.removed);
  const napiVersion = formatVersion(meta.napiVersion);

  if (added) lines.push(`**Added in:** ${added}`);
  if (deprecated) lines.push(`**Deprecated since:** ${deprecated}`);
  if (removed) lines.push(`**Removed in:** ${removed}`);
  if (napiVersion) lines.push(`**N-API version:** ${napiVersion}`);
  if (meta.changes && meta.changes.length > 0) {
    lines.push('**History:**');
    for (const change of meta.changes) {
      const version = formatVersion(change.version) ?? 'unknown version';
      const description = (change.description ?? '').trim();
      lines.push(`- ${version}: ${description}`);
    }
  }

  return lines.length > 0 ? `${lines.join('\n')}\n\n` : '';
}

function resolveYamlBlocks(text: string): string {
  return text.replace(YAML_BLOCK, (_match, yamlBody: string) => formatYamlBlock(yamlBody));
}

function resolveIntroducedIn(text: string): string {
  return text.replace(INTRODUCED_IN, (_match, version: string) => `**Introduced in:** ${version}\n\n`);
}

function stripNoiseComments(text: string): string {
  return text.replace(NOISE_COMMENT, '');
}

/** Normalizes one doc/api/*.md file. The leading `# Title` line is left untouched. */
export function normalizeNodeDoc(raw: string): string {
  let text = raw.replace(/\r\n/g, '\n');
  text = resolveIntroducedIn(text);
  text = resolveYamlBlocks(text);
  text = stripNoiseComments(text);
  return `${text.trim()}\n`;
}
