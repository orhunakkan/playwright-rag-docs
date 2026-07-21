import { describe, expect, it } from 'vitest';
import { normalizeNodeDoc } from '../src/node/normalize.js';

describe('normalizeNodeDoc', () => {
  it('resolves <!--introduced_in=...--> to a readable line and leaves the title/stability text intact', () => {
    const raw = `# File system

<!--introduced_in=v0.10.0-->

> Stability: 2 - Stable

<!--name=fs-->

<!-- source_link=lib/fs.js -->

The \`node:fs\` module enables interacting with the file system.
`;
    const body = normalizeNodeDoc(raw);

    expect(body).toContain('# File system');
    expect(body).toContain('**Introduced in:** v0.10.0');
    expect(body).toContain('> Stability: 2 - Stable');
    expect(body).not.toContain('<!--');
    expect(body).not.toContain('-->');
  });

  it('parses a simple YAML doc-metadata block into an Added in line', () => {
    const raw = `# fs

## fs.readFileSync(path[, options])

<!-- YAML
added: v0.1.8
-->

* \`path\` {string}

Returns the contents of the file.
`;
    const body = normalizeNodeDoc(raw);

    expect(body).toContain('**Added in:** v0.1.8');
    expect(body).not.toContain('<!-- YAML');
  });

  it('formats a deprecated API with dual added versions and a change history', () => {
    const raw = `# Buffer

## buf.parent

<!-- YAML
added: v3.0.0
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: Use \`buf.buffer\` instead.
-->

> Stability: 0 - Deprecated: Use [\`buf.buffer\`][] instead.
`;
    const body = normalizeNodeDoc(raw);

    expect(body).toContain('**Added in:** v3.0.0');
    expect(body).toContain('**Deprecated since:** v6.0.0');
    expect(body).toContain('**History:**');
    expect(body).toContain('- v10.0.0: Use `buf.buffer` instead.');
    expect(body).not.toContain('pr-url');
  });

  it('handles a YAML block whose closing --> is indented on its own line', () => {
    const raw = `# http

### \`message.connection\`

<!-- YAML
added: v0.1.90
deprecated: v16.0.0
 -->

> Stability: 0 - Deprecated. Use [\`message.socket\`][].
`;
    const body = normalizeNodeDoc(raw);

    expect(body).toContain('**Added in:** v0.1.90');
    expect(body).toContain('**Deprecated since:** v16.0.0');
    expect(body).not.toContain('-->');
  });

  it('joins a dual-backported version array with a comma', () => {
    const raw = `# Buffer

## buf.toString

<!-- YAML
changes:
  - version:
      - v15.7.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/36952
    description: Introduced \`base64url\` encoding.
-->

Body text.
`;
    const body = normalizeNodeDoc(raw);

    expect(body).toContain('- v15.7.0, v14.18.0: Introduced `base64url` encoding.');
  });
});
