# LocatorAssertions

> **Source:** [playwright.dev/docs/api/class-locatorassertions](https://playwright.dev/docs/api/class-locatorassertions)

---

The LocatorAssertions class provides assertion methods that can be used to make assertions about the Locator state in the tests.

```js
import { test, expect } from '@playwright/test';

test('status becomes submitted', async ({ page }) => {
  // ...
  await page.getByRole('button').click();
  await expect(page.locator('.status')).toHaveText('Submitted');
});
```


---

## Methods

### toBeAttached {/* #locator-assertions-to-be-attached */}



Ensures that Locator points to an element that is [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

**Usage**

```js
await expect(page.getByText('Hidden text')).toBeAttached();
```

**Arguments**
- `options` Object *(optional)*
  - `attached` boolean *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeChecked {/* #locator-assertions-to-be-checked */}



Ensures the Locator points to a checked input.

**Usage**

```js
const locator = page.getByLabel('Subscribe to newsletter');
await expect(locator).toBeChecked();
```

**Arguments**
- `options` Object *(optional)*
  - `checked` boolean *(optional)* 
    
    Provides state to assert for. Asserts for input to be checked by default. This option can't be used when [indeterminate](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-indeterminate) is set to true.
  - `indeterminate` boolean *(optional)* 
    
    Asserts that the element is in the indeterminate (mixed) state. Only supported for checkboxes and radio buttons. This option can't be true when [checked](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-checked) is provided.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeDisabled {/* #locator-assertions-to-be-disabled */}



Ensures the Locator points to a disabled element. Element is disabled if it has "disabled" attribute or is disabled via ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled). Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup` can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored by the browser.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeDisabled();
```

**Arguments**
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeEditable {/* #locator-assertions-to-be-editable */}



Ensures the Locator points to an editable element.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeEditable();
```

**Arguments**
- `options` Object *(optional)*
  - `editable` boolean *(optional)* 
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeEmpty {/* #locator-assertions-to-be-empty */}



Ensures the Locator points to an empty editable element or to a DOM node that has no text.

**Usage**

```js
const locator = page.locator('div.warning');
await expect(locator).toBeEmpty();
```

**Arguments**
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeEnabled {/* #locator-assertions-to-be-enabled */}



Ensures the Locator points to an enabled element.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeEnabled();
```

**Arguments**
- `options` Object *(optional)*
  - `enabled` boolean *(optional)* 
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeFocused {/* #locator-assertions-to-be-focused */}



Ensures the Locator points to a focused DOM node.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeFocused();
```

**Arguments**
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeHidden {/* #locator-assertions-to-be-hidden */}



Ensures that Locator either does not resolve to any DOM node, or resolves to a [non-visible](../actionability.mdx#visible) one.

**Usage**

```js
const locator = page.locator('.my-element');
await expect(locator).toBeHidden();
```

**Arguments**
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeInViewport {/* #locator-assertions-to-be-in-viewport */}



Ensures the Locator points to an element that intersects viewport, according to the [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

**Usage**

```js
const locator = page.getByRole('button');
// Make sure at least some part of element intersects viewport.
await expect(locator).toBeInViewport();
// Make sure element is fully outside of viewport.
await expect(locator).not.toBeInViewport();
// Make sure that at least half of the element intersects viewport.
await expect(locator).toBeInViewport({ ratio: 0.5 });
```

**Arguments**
- `options` Object *(optional)*
  - `ratio` number *(optional)*
    
    The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at any positive ratio. Defaults to `0`.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toBeVisible {/* #locator-assertions-to-be-visible */}



Ensures that Locator points to an attached and [visible](../actionability.mdx#visible) DOM node.

To check that at least one element from the list is visible, use [locator.first()](/api/class-locator.mdx#locator-first).

**Usage**

```js
// A specific element is visible.
await expect(page.getByText('Welcome')).toBeVisible();

// At least one item in the list is visible.
await expect(page.getByTestId('todo-item').first()).toBeVisible();

// At least one of the two elements is visible, possibly both.
await expect(
    page.getByRole('button', { name: 'Sign in' })
        .or(page.getByRole('button', { name: 'Sign up' }))
        .first()
).toBeVisible();
```

**Arguments**
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
  - `visible` boolean *(optional)* 

**Returns**
- Promise<void>

---

### toContainClass {/* #locator-assertions-to-contain-class */}



Ensures the Locator points to an element with given CSS classes. All classes from the asserted value, separated by spaces, must be present in the [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) in any order.

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toContainClass('middle selected row');
await expect(locator).toContainClass('selected');
await expect(locator).toContainClass('row middle');
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class lists. Each element's class attribute is matched against the corresponding class in the array:

```html
<div class='list'>
  <div class='component inactive'></div>
  <div class='component active'></div>
  <div class='component inactive'></div>
</div>
```

```js
const locator = page.locator('.list > .component');
await expect(locator).toContainClass('inactive', 'active', 'inactive');
```

**Arguments**
- `expected` string | Array<string>
  
  A string containing expected class names, separated by spaces, or a list of such strings to assert multiple elements.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toContainText {/* #locator-assertions-to-contain-text */}



Ensures the Locator points to an element that contains the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```js
const locator = page.locator('.title');
await expect(locator).toContainText('substring');
await expect(locator).toContainText(/\d messages/);
```

If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. Elements from a **subset** of this list contain text from the expected array, respectively.
1. The matching subset of elements has the same order as the expected array.
1. Each text value from the expected array is matched by some element from the list.

For example, consider the following list:

```html
<ul>
  <li>Item Text 1</li>
  <li>Item Text 2</li>
  <li>Item Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Contains the right items in the right order
await expect(page.locator('ul > li')).toContainText('Text 1', 'Text 3');

// ✖ Wrong order
await expect(page.locator('ul > li')).toContainText('Text 3', 'Text 2');

// ✖ No item contains this text
await expect(page.locator('ul > li')).toContainText('Some 33');

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toContainText('Text 3');
```

**Arguments**
- `expected` string | RegExp | Array<string | RegExp> 
  
  Expected substring or RegExp or a list of those.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-contain-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
  - `useInnerText` boolean *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- Promise<void>

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### toHaveAccessibleDescription {/* #locator-assertions-to-have-accessible-description */}



Ensures the Locator points to an element with a given [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveAccessibleDescription('Save results to disk');
```

**Arguments**
- `description` string | RegExp
  
  Expected accessible description.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-description-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveAccessibleErrorMessage {/* #locator-assertions-to-have-accessible-error-message */}



Ensures the Locator points to an element with a given [aria errormessage](https://w3c.github.io/aria/#aria-errormessage).

**Usage**

```js
const locator = page.getByTestId('username-input');
await expect(locator).toHaveAccessibleErrorMessage('Username is required.');
```

**Arguments**
- `errorMessage` string | RegExp
  
  Expected accessible error message.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-error-message-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveAccessibleName {/* #locator-assertions-to-have-accessible-name */}



Ensures the Locator points to an element with a given [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveAccessibleName('Save to disk');
```

**Arguments**
- `name` string | RegExp
  
  Expected accessible name.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-name-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveAttribute(name, value) {/* #locator-assertions-to-have-attribute */}



Ensures the Locator points to an element with given attribute.

**Usage**

```js
const locator = page.locator('input');
await expect(locator).toHaveAttribute('type', 'text');
```

**Arguments**
- `name` string 
  
  Attribute name.
- `value` string | RegExp 
  
  Expected attribute value.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-attribute-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveAttribute(name) {/* #locator-assertions-to-have-attribute-2 */}



Ensures the Locator points to an element with given attribute. The method will assert attribute presence.

```js
const locator = page.locator('input');
// Assert attribute existence.
await expect(locator).toHaveAttribute('disabled');
await expect(locator).not.toHaveAttribute('open');
```

**Usage**

```js
await expect(locator).toHaveAttribute(name);
await expect(locator).toHaveAttribute(name, options);
```

**Arguments**
- `name` string
  
  Attribute name.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveClass {/* #locator-assertions-to-have-class */}



Ensures the Locator points to an element with given CSS classes. When a string is provided, it must fully match the element's `class` attribute. To match individual classes use [expect(locator).toContainClass()](/api/class-locatorassertions.mdx#locator-assertions-to-contain-class).

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toHaveClass('middle selected row');
await expect(locator).toHaveClass(/(^|\s)selected(\s|$)/);
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class values. Each element's class attribute is matched against the corresponding string or regular expression in the array:

```js
const locator = page.locator('.list > .component');
await expect(locator).toHaveClass('component', 'component selected', 'component');
```

**Arguments**
- `expected` string | RegExp | Array<string | RegExp> 
  
  Expected class or RegExp or a list of those.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveCount {/* #locator-assertions-to-have-count */}



Ensures the Locator resolves to an exact number of DOM nodes.

**Usage**

```js
const list = page.locator('list > .component');
await expect(list).toHaveCount(3);
```

**Arguments**
- `count` number 
  
  Expected count.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveCSS {/* #locator-assertions-to-have-css */}



Ensures the Locator resolves to an element with the given computed CSS style.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveCSS('display', 'flex');
```

**Arguments**
- `name` string 
  
  CSS property name.
- `value` string | RegExp 
  
  CSS property value.
- `options` Object *(optional)*
  - `pseudo` "before" | "after" *(optional)* 
    
    Pseudo-element to read computed styles from.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveId {/* #locator-assertions-to-have-id */}



Ensures the Locator points to an element with the given DOM Node ID.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toHaveId('lastname');
```

**Arguments**
- `id` string | RegExp 
  
  Element id.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveJSProperty {/* #locator-assertions-to-have-js-property */}



Ensures the Locator points to an element with given JavaScript property. Note that this property can be of a primitive type as well as a plain serializable JavaScript object.

**Usage**

```js
const locator = page.locator('.component');
await expect(locator).toHaveJSProperty('loaded', true);
```

**Arguments**
- `name` string 
  
  Property name.
- `value` Object 
  
  Property value.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveRole {/* #locator-assertions-to-have-role */}



Ensures the Locator points to an element with a given [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles).

Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass role `"checkbox"` on an element with a subclass role `"switch"` will fail.

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveRole('button');
```

**Arguments**
- `role` "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
  
  Required aria role.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveScreenshot(name) {/* #locator-assertions-to-have-screenshot-1 */}



This function will wait until two consecutive locator screenshots yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveScreenshot('image.png');

// Store the snapshot in the WebP format.
await expect(locator).toHaveScreenshot('image.webp');
```

Note that screenshot assertions only work with Playwright test runner.

**Arguments**
- `name` string | Array<string>
  
  Snapshot name. Must have a `.png` or `.webp` extension, the screenshot is captured in the corresponding format. Both formats are lossless.
- `options` Object *(optional)*
  - `animations` "disabled" | "allow" *(optional)*
    
    When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
    * finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
    * infinite animations are canceled to initial state, and then played over after the screenshot.
    
    Defaults to `"disabled"` that disables animations.
  - `caret` "hide" | "initial" *(optional)*
    
    When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.
  - `mask` Array<Locator> *(optional)*
    
    Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box `#FF00FF` (customized by [maskColor](/api/class-locatorassertions.mdx#locator-assertions-to-have-screenshot-1-option-mask-color)) that completely covers its bounding box. The mask is also applied to invisible elements, see [Matching only visible elements](../locators.mdx#matching-only-visible-elements) to disable that.
  - `maskColor` string *(optional)* 
    
    Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
  - `maxDiffPixelRatio` number *(optional)*
    
    An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is configurable with `TestConfig.expect`. Unset by default.
  - `maxDiffPixels` number *(optional)*
    
    An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by default.
  - `omitBackground` boolean *(optional)*
    
    Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
  - `scale` "css" | "device" *(optional)*
    
    When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.
    
    Defaults to `"css"`.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `stylePath` string | Array<string> *(optional)* 
    
    File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.
  - `threshold` number *(optional)*
    
    An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the same pixel in compared images, between zero (strict) and one (lax), default is configurable with `TestConfig.expect`. Defaults to `0.2`.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveScreenshot(options) {/* #locator-assertions-to-have-screenshot-2 */}



This function will wait until two consecutive locator screenshots yield the same result, and then compare the last screenshot with the expectation.

The snapshot is stored in the PNG format. To store it in the WebP format instead, pass a snapshot name with the `.webp` extension.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveScreenshot();
```

Note that screenshot assertions only work with Playwright test runner.

**Arguments**
- `options` Object *(optional)*
  - `animations` "disabled" | "allow" *(optional)*
    
    When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
    * finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
    * infinite animations are canceled to initial state, and then played over after the screenshot.
    
    Defaults to `"disabled"` that disables animations.
  - `caret` "hide" | "initial" *(optional)*
    
    When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.
  - `mask` Array<Locator> *(optional)*
    
    Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box `#FF00FF` (customized by [maskColor](/api/class-locatorassertions.mdx#locator-assertions-to-have-screenshot-2-option-mask-color)) that completely covers its bounding box. The mask is also applied to invisible elements, see [Matching only visible elements](../locators.mdx#matching-only-visible-elements) to disable that.
  - `maskColor` string *(optional)* 
    
    Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
  - `maxDiffPixelRatio` number *(optional)*
    
    An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is configurable with `TestConfig.expect`. Unset by default.
  - `maxDiffPixels` number *(optional)*
    
    An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by default.
  - `omitBackground` boolean *(optional)*
    
    Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
  - `scale` "css" | "device" *(optional)*
    
    When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.
    
    Defaults to `"css"`.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `stylePath` string | Array<string> *(optional)* 
    
    File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.
  - `threshold` number *(optional)*
    
    An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the same pixel in compared images, between zero (strict) and one (lax), default is configurable with `TestConfig.expect`. Defaults to `0.2`.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveText {/* #locator-assertions-to-have-text */}



Ensures the Locator points to an element with the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```js
const locator = page.locator('.title');
await expect(locator).toHaveText(/Welcome, Test User/);
await expect(locator).toHaveText(/Welcome, .*/);
```

If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. The number of elements equals the number of expected values in the array.
1. Elements from the list have text matching expected array values, one by one, in order.

For example, consider the following list:

```html
<ul>
  <li>Text 1</li>
  <li>Text 2</li>
  <li>Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Has the right items in the right order
await expect(page.locator('ul > li')).toHaveText('Text 1', 'Text 2', 'Text 3');

// ✖ Wrong order
await expect(page.locator('ul > li')).toHaveText('Text 3', 'Text 2', 'Text 1');

// ✖ Last item does not match
await expect(page.locator('ul > li')).toHaveText('Text 1', 'Text 2', 'Text');

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toHaveText('Text 1', 'Text 2', 'Text 3');
```

**Arguments**
- `expected` string | RegExp | Array<string | RegExp> 
  
  Expected string or RegExp or a list of those.
- `options` Object *(optional)*
  - `ignoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [ignoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
  - `useInnerText` boolean *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- Promise<void>

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### toHaveValue {/* #locator-assertions-to-have-value */}



Ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.

**Usage**

```js
const locator = page.locator('inputtype=number');
await expect(locator).toHaveValue(/0-9/);
```

**Arguments**
- `value` string | RegExp 
  
  Expected value.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toHaveValues {/* #locator-assertions-to-have-values */}



Ensures the Locator points to multi-select/combobox (i.e. a `select` with the `multiple` attribute) and the specified values are selected.

**Usage**

For example, given the following element:

```html
<select id="favorite-colors" multiple>
  <option value="R">Red</option>
  <option value="G">Green</option>
  <option value="B">Blue</option>
</select>
```

```js
const locator = page.locator('id=favorite-colors');
await locator.selectOption('R', 'G');
await expect(locator).toHaveValues(/R/, /G/);
```

**Arguments**
- `values` Array<string | RegExp>
  
  Expected options currently selected.
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toMatchAriaSnapshot(expected) {/* #locator-assertions-to-match-aria-snapshot */}



Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.mdx).

**Usage**

```js
await page.goto('https://demo.playwright.dev/todomvc/');
await expect(page.locator('body')).toMatchAriaSnapshot(`
  - heading "todos"
  - textbox "What needs to be done?"
`);
```

**Arguments**
- `expected` string
- `options` Object *(optional)*
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

### toMatchAriaSnapshot(options) {/* #locator-assertions-to-match-aria-snapshot-2 */}



Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.mdx).

Snapshot is stored in a separate `.aria.yml` file in a location configured by `expect.toMatchAriaSnapshot.pathTemplate` and/or `snapshotPathTemplate` properties in the configuration file.

**Usage**

```js
await expect(page.locator('body')).toMatchAriaSnapshot();
await expect(page.locator('body')).toMatchAriaSnapshot({ name: 'body.aria.yml' });
```

**Arguments**
- `options` Object *(optional)*
  - `name` string *(optional)*
    
    Name of the snapshot to store in the snapshot folder corresponding to this test. Generates sequential names if not specified.
  - `signal` AbortSignal *(optional)* 
    
    An optional [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal is aborted while the assertion is retrying, or is already aborted before the assertion starts, the assertion fails without retrying further.
  - `timeout` number *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

**Returns**
- Promise<void>

---

## Properties

### not {/* #locator-assertions-not */}



Makes the assertion check for the opposite condition.

**Usage**

For example, this code tests that the Locator doesn't contain text `"error"`:

```js
await expect(locator).not.toContainText('error');
```

**Type**
- LocatorAssertions


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserServer: /api/class-browserserver.mdx "BrowserServer"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Coverage: /api/class-coverage.mdx "Coverage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Disposable: /api/class-disposable.mdx "Disposable"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
FileChooser: /api/class-filechooser.mdx "FileChooser"
Frame: /api/class-frame.mdx "Frame"
FrameLocator: /api/class-framelocator.mdx "FrameLocator"
GenericAssertions: /api/class-genericassertions.mdx "GenericAssertions"
JSHandle: /api/class-jshandle.mdx "JSHandle"
Keyboard: /api/class-keyboard.mdx "Keyboard"
Locator: /api/class-locator.mdx "Locator"
LocatorAssertions: /api/class-locatorassertions.mdx "LocatorAssertions"
Logger: /api/class-logger.mdx "Logger"
Mouse: /api/class-mouse.mdx "Mouse"
Page: /api/class-page.mdx "Page"
PageAssertions: /api/class-pageassertions.mdx "PageAssertions"
Playwright: /api/class-playwright.mdx "Playwright"
PlaywrightAssertions: /api/class-playwrightassertions.mdx "PlaywrightAssertions"
Request: /api/class-request.mdx "Request"
Response: /api/class-response.mdx "Response"
Route: /api/class-route.mdx "Route"
Screencast: /api/class-screencast.mdx "Screencast"
Selectors: /api/class-selectors.mdx "Selectors"
SnapshotAssertions: /api/class-snapshotassertions.mdx "SnapshotAssertions"
TimeoutError: /api/class-timeouterror.mdx "TimeoutError"
Touchscreen: /api/class-touchscreen.mdx "Touchscreen"
Tracing: /api/class-tracing.mdx "Tracing"
Video: /api/class-video.mdx "Video"
WebError: /api/class-weberror.mdx "WebError"
WebSocket: /api/class-websocket.mdx "WebSocket"
WebSocketRoute: /api/class-websocketroute.mdx "WebSocketRoute"
WebStorage: /api/class-webstorage.mdx "WebStorage"
Worker: /api/class-worker.mdx "Worker"
Electron: /api/class-electron.mdx "Electron"
ElectronApplication: /api/class-electronapplication.mdx "ElectronApplication"
Android: /api/class-android.mdx "Android"
AndroidDevice: /api/class-androiddevice.mdx "AndroidDevice"
AndroidInput: /api/class-androidinput.mdx "AndroidInput"
AndroidSocket: /api/class-androidsocket.mdx "AndroidSocket"
AndroidWebView: /api/class-androidwebview.mdx "AndroidWebView"
Fixtures: /api/class-fixtures.mdx "Fixtures"
FullConfig: /api/class-fullconfig.mdx "FullConfig"
FullProject: /api/class-fullproject.mdx "FullProject"
Location: /api/class-location.mdx "Location"
Test: /api/class-test.mdx "Test"
TestConfig: /api/class-testconfig.mdx "TestConfig"
TestInfo: /api/class-testinfo.mdx "TestInfo"
TestInfoError: /api/class-testinfoerror.mdx "TestInfoError"
TestOptions: /api/class-testoptions.mdx "TestOptions"
TestProject: /api/class-testproject.mdx "TestProject"
TestStepInfo: /api/class-teststepinfo.mdx "TestStepInfo"
WorkerInfo: /api/class-workerinfo.mdx "WorkerInfo"
Reporter: /api/class-reporter.mdx "Reporter"
Suite: /api/class-suite.mdx "Suite"
TestCase: /api/class-testcase.mdx "TestCase"
TestError: /api/class-testerror.mdx "TestError"
TestResult: /api/class-testresult.mdx "TestResult"
TestRun: /api/class-testrun.mdx "TestRun"
TestStep: /api/class-teststep.mdx "TestStep"
Element: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
EvaluationArgument: /evaluating.mdx#evaluation-argument "EvaluationArgument"
Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
iterator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
selector: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
Serializable: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
UIEvent.detail: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
UnixTime: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
xpath: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"

AbortSignal: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal "AbortSignal"
Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
boolean: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
Buffer: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
ChildProcess: https://nodejs.org/api/child_process.html "ChildProcess"
Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date"
Error: https://nodejs.org/api/errors.html#errors_class_error "Error"
EventEmitter: https://nodejs.org/api/events.html#events_class_eventemitter "EventEmitter"
function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
FormData: https://developer.mozilla.org/en-US/docs/Web/API/FormData "FormData"
Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
Metadata: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object<string, any>"
null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null "null"
number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
Readable: https://nodejs.org/api/stream.html#stream_class_stream_readable "Readable"
ReadStream: https://nodejs.org/api/fs.html#class-fsreadstream "ReadStream"
RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp"
string: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "string"
void: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined "void"
URL: https://nodejs.org/api/url.html "URL"
URLPattern: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern "URLPattern"
URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams "URLSearchParams"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
