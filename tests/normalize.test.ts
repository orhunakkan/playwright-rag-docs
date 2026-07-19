import { describe, expect, it } from 'vitest';
import { normalizeMdx } from '../src/ingest/normalize.js';

describe('normalizeMdx', () => {
  it('flattens Tabs/TabItem variants in order instead of dropping non-default ones', () => {
    const raw = `---
id: intro
title: "Installation"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="js-package-manager"
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'}
  ]
}>
<TabItem value="npm">

\`\`\`bash
npm init playwright@latest
\`\`\`

</TabItem>
<TabItem value="yarn">

\`\`\`bash
yarn create playwright
\`\`\`

</TabItem>
<TabItem value="pnpm">

\`\`\`bash
pnpm create playwright
\`\`\`

</TabItem>
</Tabs>
`;
    const { body } = normalizeMdx(raw);

    expect(body).toContain('**npm**');
    expect(body).toContain('npm init playwright@latest');
    expect(body).toContain('**yarn**');
    expect(body).toContain('yarn create playwright');
    expect(body).toContain('**pnpm**');
    expect(body).toContain('pnpm create playwright');
    // Order preserved: npm before yarn before pnpm.
    expect(body.indexOf('**npm**')).toBeLessThan(body.indexOf('**yarn**'));
    expect(body.indexOf('**yarn**')).toBeLessThan(body.indexOf('**pnpm**'));
    expect(body).not.toContain('<Tabs');
    expect(body).not.toContain('<TabItem');
    expect(body).not.toContain("import Tabs");
  });

  it('strips <font> version badges and <x-search> wrappers entirely', () => {
    const raw = `---
id: class-browser
title: "Browser"
---
### bind {/* #browser-bind */}

<font size="2" style={{position: "relative", top: "-20px"}}>Added in: v1.59</font><x-search>browser.bind</x-search>

Binds the browser to a named pipe.
`;
    const { body } = normalizeMdx(raw);

    expect(body).not.toContain('<font');
    expect(body).not.toContain('<x-search>');
    expect(body).not.toContain('Added in: v1.59');
    expect(body).not.toContain('browser.bind</x-search>');
    expect(body).toContain('Binds the browser to a named pipe.');
    // The heading slug comment itself is left intact for the chunker to resolve.
    expect(body).toContain('### bind {/* #browser-bind */}');
  });

  it('resolves a frontmatter/body H1 conflict by keeping a single correct H1', () => {
    const raw = `---
id: installation
title: "Installation"
---
# Getting Started

Some intro text.
`;
    const { body, title } = normalizeMdx(raw);

    expect(title).toBe('Installation');
    const h1Lines = body.split('\n').filter((line) => line.startsWith('# '));
    expect(h1Lines).toEqual(['# Installation']);
    expect(body).not.toContain('# Getting Started');
    expect(body).toContain('Some intro text.');
  });

  it('simple-strips bracket type-refs while leaving real markdown links untouched', () => {
    const raw = `---
id: class-browser
title: "Browser"
---
Returns [Promise]&lt;[Object]&gt;.

See [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch) for details.
`;
    const { body } = normalizeMdx(raw);

    expect(body).toContain('Returns Promise<Object>.');
    expect(body).toContain('[browserType.launch()](/api/class-browsertype.mdx#browser-type-launch)');
  });
});
