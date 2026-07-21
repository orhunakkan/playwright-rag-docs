import { describe, expect, it } from 'vitest';
import { normalizeMdn } from '../src/javascript/normalize.js';

describe('normalizeMdn', () => {
  it('extracts title and slug from frontmatter, prepending title as an H1', () => {
    const raw = `---
title: Array
slug: Web/JavaScript/Reference/Global_Objects/Array
page-type: javascript-class
---

Some intro text.
`;
    const { title, slug, body } = normalizeMdn(raw);

    expect(title).toBe('Array');
    expect(slug).toBe('Web/JavaScript/Reference/Global_Objects/Array');
    expect(body).toContain('# Array');
    expect(body).toContain('Some intro text.');
  });

  it('resolves two-arg jsxref to its display text and single-arg jsxref to its own name, both as inline code', () => {
    const raw = `---
title: Array
slug: Web/JavaScript/Reference/Global_Objects/Array
---

See {{jsxref("Array/length", "length")}} and {{jsxref("Array.prototype.at()")}}.
`;
    const { body } = normalizeMdn(raw);

    expect(body).toContain('See `length` and `Array.prototype.at()`.');
    expect(body).not.toContain('{{jsxref');
  });

  it('translates inline status badges into plain text', () => {
    const raw = `---
title: Array.prototype.concat()
slug: Web/JavaScript/Reference/Global_Objects/Array/concat
---

- \`value1\`, …, \`valueN\` {{optional_inline}}
`;
    const { body } = normalizeMdn(raw);

    expect(body).toContain('`value1`, …, `valueN` (optional)');
    expect(body).not.toContain('{{optional_inline}}');
  });

  it('strips macro-only widgets (Compat, Specifications, InteractiveExample, etc.) with no text equivalent', () => {
    const raw = `---
title: Array
slug: Web/JavaScript/Reference/Global_Objects/Array
---

{{InteractiveExample("JavaScript Demo: Array")}}

## Specifications

{{Specifications}}

## Browser compatibility

{{Compat}}
`;
    const { body } = normalizeMdn(raw);

    expect(body).not.toContain('{{');
    expect(body).not.toContain('}}');
  });
});
