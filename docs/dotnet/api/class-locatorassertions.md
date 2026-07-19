# LocatorAssertions

> **Source:** [playwright.dev/dotnet/docs/api/class-locatorassertions](https://playwright.dev/dotnet/docs/api/class-locatorassertions)

---

The LocatorAssertions class provides assertion methods that can be used to make assertions about the Locator state in the tests.

```csharp
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

TestClass
public class ExampleTests : PageTest
{
    TestMethod
    public async Task StatusBecomesSubmitted()
    {
        // ...
        await Page.GetByRole(AriaRole.Button, new() { Name = "Sign In" }).ClickAsync();
        await Expect(Page.Locator(".status")).ToHaveTextAsync("Submitted");
    }
}
```


---

## Methods

### ToBeAttachedAsync {/* #locator-assertions-to-be-attached */}



Ensures that Locator points to an element that is [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

**Usage**

```csharp
await Expect(Page.GetByText("Hidden text")).ToBeAttachedAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeAttachedOptions?` *(optional)*
  - `Attached` bool? *(optional)*
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeCheckedAsync {/* #locator-assertions-to-be-checked */}



Ensures the Locator points to a checked input.

**Usage**

```csharp
var locator = Page.GetByLabel("Subscribe to newsletter");
await Expect(locator).ToBeCheckedAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeCheckedOptions?` *(optional)*
  - `Checked` bool? *(optional)* 
    
    Provides state to assert for. Asserts for input to be checked by default. This option can't be used when [Indeterminate](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-indeterminate) is set to true.
  - `Indeterminate` bool? *(optional)* 
    
    Asserts that the element is in the indeterminate (mixed) state. Only supported for checkboxes and radio buttons. This option can't be true when [Checked](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-checked) is provided.
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeDisabledAsync {/* #locator-assertions-to-be-disabled */}



Ensures the Locator points to a disabled element. Element is disabled if it has "disabled" attribute or is disabled via ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled). Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup` can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored by the browser.

**Usage**

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeDisabledAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeDisabledOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeEditableAsync {/* #locator-assertions-to-be-editable */}



Ensures the Locator points to an editable element.

**Usage**

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeEditableAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeEditableOptions?` *(optional)*
  - `Editable` bool? *(optional)* 
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeEmptyAsync {/* #locator-assertions-to-be-empty */}



Ensures the Locator points to an empty editable element or to a DOM node that has no text.

**Usage**

```csharp
var locator = Page.Locator("div.warning");
await Expect(locator).ToBeEmptyAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeEmptyOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeEnabledAsync {/* #locator-assertions-to-be-enabled */}



Ensures the Locator points to an enabled element.

**Usage**

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeEnabledAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeEnabledOptions?` *(optional)*
  - `Enabled` bool? *(optional)* 
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeFocusedAsync {/* #locator-assertions-to-be-focused */}



Ensures the Locator points to a focused DOM node.

**Usage**

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeFocusedAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeFocusedOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeHiddenAsync {/* #locator-assertions-to-be-hidden */}



Ensures that Locator either does not resolve to any DOM node, or resolves to a [non-visible](../actionability.mdx#visible) one.

**Usage**

```csharp
var locator = Page.Locator(".my-element");
await Expect(locator).ToBeHiddenAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeHiddenOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeInViewportAsync {/* #locator-assertions-to-be-in-viewport */}



Ensures the Locator points to an element that intersects viewport, according to the [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

**Usage**

```csharp
var locator = Page.GetByRole(AriaRole.Button);
// Make sure at least some part of element intersects viewport.
await Expect(locator).ToBeInViewportAsync();
// Make sure element is fully outside of viewport.
await Expect(locator).Not.ToBeInViewportAsync();
// Make sure that at least half of the element intersects viewport.
await Expect(locator).ToBeInViewportAsync(new() { Ratio = 0.5 });
```

**Arguments**
- `options` `LocatorAssertionsToBeInViewportOptions?` *(optional)*
  - `Ratio` float? *(optional)*
    
    The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at any positive ratio. Defaults to `0`.
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToBeVisibleAsync {/* #locator-assertions-to-be-visible */}



Ensures that Locator points to an attached and [visible](../actionability.mdx#visible) DOM node.

To check that at least one element from the list is visible, use [Locator.First](/api/class-locator.mdx#locator-first).

**Usage**

```csharp
// A specific element is visible.
await Expect(Page.GetByText("Welcome")).ToBeVisibleAsync();

// At least one item in the list is visible.
await Expect(Page.GetByTestId("todo-item").First).ToBeVisibleAsync();

// At least one of the two elements is visible, possibly both.
await Expect(
  Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
    .Or(Page.GetByRole(AriaRole.Button, new() { Name = "Sign up" }))
    .First
).ToBeVisibleAsync();
```

**Arguments**
- `options` `LocatorAssertionsToBeVisibleOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `Visible` bool? *(optional)* 

**Returns**
- void

---

### ToContainClassAsync {/* #locator-assertions-to-contain-class */}



Ensures the Locator points to an element with given CSS classes. All classes from the asserted value, separated by spaces, must be present in the [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) in any order.

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToContainClassAsync("middle selected row");
await Expect(locator).ToContainClassAsync("selected");
await Expect(locator).ToContainClassAsync("row middle");
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class lists. Each element's class attribute is matched against the corresponding class in the array:

```html
<div class='list'>
  <div class='component inactive'></div>
  <div class='component active'></div>
  <div class='component inactive'></div>
</div>
```

```csharp
var locator = Page.Locator(".list > .component");
await Expect(locator).ToContainClassAsync(new string[]{"inactive", "active", "inactive"});
```

**Arguments**
- `expected` string | IEnumerable<string>
  
  A string containing expected class names, separated by spaces, or a list of such strings to assert multiple elements.
- `options` `LocatorAssertionsToContainClassOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToContainTextAsync {/* #locator-assertions-to-contain-text */}



Ensures the Locator points to an element that contains the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToContainTextAsync("substring");
await Expect(locator).ToContainTextAsync(new Regex("\\d messages"));
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

```csharp
// ✓ Contains the right items in the right order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 1", "Text 3"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 3", "Text 2"});

// ✖ No item contains this text
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToContainTextAsync(new string[] {"Text 3"});
```

**Arguments**
- `expected` string | Regex | IEnumerable<string> | IEnumerable<Regex> 
  
  Expected substring or RegExp or a list of those.
- `options` `LocatorAssertionsToContainTextOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)* 
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-contain-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `UseInnerText` bool? *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- void

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### ToHaveAccessibleDescriptionAsync {/* #locator-assertions-to-have-accessible-description */}



Ensures the Locator points to an element with a given [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).

**Usage**

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveAccessibleDescriptionAsync("Save results to disk");
```

**Arguments**
- `description` string | Regex
  
  Expected accessible description.
- `options` `LocatorAssertionsToHaveAccessibleDescriptionOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)*
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-description-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveAccessibleErrorMessageAsync {/* #locator-assertions-to-have-accessible-error-message */}



Ensures the Locator points to an element with a given [aria errormessage](https://w3c.github.io/aria/#aria-errormessage).

**Usage**

```csharp
var locator = Page.GetByTestId("username-input");
await Expect(locator).ToHaveAccessibleErrorMessageAsync("Username is required.");
```

**Arguments**
- `errorMessage` string | Regex
  
  Expected accessible error message.
- `options` `LocatorAssertionsToHaveAccessibleErrorMessageOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)*
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-error-message-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveAccessibleNameAsync {/* #locator-assertions-to-have-accessible-name */}



Ensures the Locator points to an element with a given [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveAccessibleNameAsync("Save to disk");
```

**Arguments**
- `name` string | Regex
  
  Expected accessible name.
- `options` `LocatorAssertionsToHaveAccessibleNameOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)*
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-name-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveAttributeAsync {/* #locator-assertions-to-have-attribute */}



Ensures the Locator points to an element with given attribute.

**Usage**

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveAttributeAsync("type", "text");
```

**Arguments**
- `name` string 
  
  Attribute name.
- `value` string | Regex 
  
  Expected attribute value.
- `options` `LocatorAssertionsToHaveAttributeOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)* 
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-attribute-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveClassAsync {/* #locator-assertions-to-have-class */}



Ensures the Locator points to an element with given CSS classes. When a string is provided, it must fully match the element's `class` attribute. To match individual classes use [Expect(Locator).ToContainClassAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-contain-class).

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToHaveClassAsync("middle selected row");
await Expect(locator).ToHaveClassAsync(new Regex("(^|\\s)selected(\\s|$)"));
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class values. Each element's class attribute is matched against the corresponding string or regular expression in the array:

```csharp
var locator = Page.Locator(".list > .component");
await Expect(locator).ToHaveClassAsync(new string[]{"component", "component selected", "component"});
```

**Arguments**
- `expected` string | Regex | IEnumerable<string> | IEnumerable<Regex> 
  
  Expected class or RegExp or a list of those.
- `options` `LocatorAssertionsToHaveClassOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveCountAsync {/* #locator-assertions-to-have-count */}



Ensures the Locator resolves to an exact number of DOM nodes.

**Usage**

```csharp
var locator = Page.Locator("list > .component");
await Expect(locator).ToHaveCountAsync(3);
```

**Arguments**
- `count` int 
  
  Expected count.
- `options` `LocatorAssertionsToHaveCountOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveCSSAsync {/* #locator-assertions-to-have-css */}



Ensures the Locator resolves to an element with the given computed CSS style.

**Usage**

```csharp
var locator = Page.GetByRole(AriaRole.Button);
await Expect(locator).ToHaveCSSAsync("display", "flex");
```

**Arguments**
- `name` string 
  
  CSS property name.
- `value` string | Regex 
  
  CSS property value.
- `options` `LocatorAssertionsToHaveCSSOptions?` *(optional)*
  - `Pseudo` `enum PseudoElement { Before, After }?` *(optional)* 
    
    Pseudo-element to read computed styles from.
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveIdAsync {/* #locator-assertions-to-have-id */}



Ensures the Locator points to an element with the given DOM Node ID.

**Usage**

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToHaveIdAsync("lastname");
```

**Arguments**
- `id` string | Regex 
  
  Element id.
- `options` `LocatorAssertionsToHaveIdOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveJSPropertyAsync {/* #locator-assertions-to-have-js-property */}



Ensures the Locator points to an element with given JavaScript property. Note that this property can be of a primitive type as well as a plain serializable JavaScript object.

**Usage**

```csharp
var locator = Page.Locator(".component");
await Expect(locator).ToHaveJSPropertyAsync("loaded", true);
```

**Arguments**
- `name` string 
  
  Property name.
- `value` object 
  
  Property value.
- `options` `LocatorAssertionsToHaveJSPropertyOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveRoleAsync {/* #locator-assertions-to-have-role */}



Ensures the Locator points to an element with a given [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles).

Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass role `"checkbox"` on an element with a subclass role `"switch"` will fail.

**Usage**

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveRoleAsync(AriaRole.Button);
```

**Arguments**
- `role` `enum AriaRole { Alert, Alertdialog, Application, Article, Banner, Blockquote, Button, Caption, Cell, Checkbox, Code, Columnheader, Combobox, Complementary, Contentinfo, Definition, Deletion, Dialog, Directory, Document, Emphasis, Feed, Figure, Form, Generic, Grid, Gridcell, Group, Heading, Img, Insertion, Link, List, Listbox, Listitem, Log, Main, Marquee, Math, Meter, Menu, Menubar, Menuitem, Menuitemcheckbox, Menuitemradio, Navigation, None, Note, Option, Paragraph, Presentation, Progressbar, Radio, Radiogroup, Region, Row, Rowgroup, Rowheader, Scrollbar, Search, Searchbox, Separator, Slider, Spinbutton, Status, Strong, Subscript, Superscript, Switch, Tab, Table, Tablist, Tabpanel, Term, Textbox, Time, Timer, Toolbar, Tooltip, Tree, Treegrid, Treeitem }`
  
  Required aria role.
- `options` `LocatorAssertionsToHaveRoleOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveTextAsync {/* #locator-assertions-to-have-text */}



Ensures the Locator points to an element with the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, Test User"));
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, .*"));
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

```csharp
// ✓ Has the right items in the right order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});
```

**Arguments**
- `expected` string | Regex | IEnumerable<string> | IEnumerable<Regex> 
  
  Expected string or RegExp or a list of those.
- `options` `LocatorAssertionsToHaveTextOptions?` *(optional)*
  - `IgnoreCase` bool? *(optional)* 
    
    Whether to perform case-insensitive match. [IgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `UseInnerText` bool? *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- void

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### ToHaveValueAsync {/* #locator-assertions-to-have-value */}



Ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.

**Usage**

```csharp
var locator = Page.Locator("inputtype=number");
await Expect(locator).ToHaveValueAsync(new Regex("0-9"));
```

**Arguments**
- `value` string | Regex 
  
  Expected value.
- `options` `LocatorAssertionsToHaveValueOptions?` *(optional)*
  - `Timeout` float? *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToHaveValuesAsync {/* #locator-assertions-to-have-values */}



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

```csharp
var locator = Page.Locator("id=favorite-colors");
await locator.SelectOptionAsync(new string[] { "R", "G" });
await Expect(locator).ToHaveValuesAsync(new Regex[] { new Regex("R"), new Regex("G") });
```

**Arguments**
- `values` IEnumerable<string> | IEnumerable<Regex>
  
  Expected options currently selected.
- `options` `LocatorAssertionsToHaveValuesOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### ToMatchAriaSnapshotAsync {/* #locator-assertions-to-match-aria-snapshot */}



Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.mdx).

**Usage**

```csharp
await page.GotoAsync("https://demo.playwright.dev/todomvc/");
await Expect(page.Locator("body")).ToMatchAriaSnapshotAsync(@"
  - heading ""todos""
  - textbox ""What needs to be done?""
");
```

**Arguments**
- `expected` string
- `options` `LocatorAssertionsToMatchAriaSnapshotOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

## Properties

### Not {/* #locator-assertions-not */}



Makes the assertion check for the opposite condition.

**Usage**

For example, this code tests that the Locator doesn't contain text `"error"`:

```csharp
await Expect(locator).Not.ToContainTextAsync("error");
```

**Type**
- LocatorAssertions


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
CDPSessionEvent: /api/class-cdpsessionevent.mdx "CDPSessionEvent"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
FileChooser: /api/class-filechooser.mdx "FileChooser"
FormData: /api/class-formdata.mdx "FormData"
Frame: /api/class-frame.mdx "Frame"
FrameLocator: /api/class-framelocator.mdx "FrameLocator"
JSHandle: /api/class-jshandle.mdx "JSHandle"
Keyboard: /api/class-keyboard.mdx "Keyboard"
Locator: /api/class-locator.mdx "Locator"
LocatorAssertions: /api/class-locatorassertions.mdx "LocatorAssertions"
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
TimeoutError: /api/class-timeouterror.mdx "TimeoutError"
Touchscreen: /api/class-touchscreen.mdx "Touchscreen"
Tracing: /api/class-tracing.mdx "Tracing"
Video: /api/class-video.mdx "Video"
WebError: /api/class-weberror.mdx "WebError"
WebSocket: /api/class-websocket.mdx "WebSocket"
WebSocketFrame: /api/class-websocketframe.mdx "WebSocketFrame"
WebSocketRoute: /api/class-websocketroute.mdx "WebSocketRoute"
WebStorage: /api/class-webstorage.mdx "WebStorage"
Worker: /api/class-worker.mdx "Worker"
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

bool: https://docs.microsoft.com/en-us/dotnet/api/system.boolean "bool"
Date: https://learn.microsoft.com/en-us/dotnet/api/system.datetime "DateTime"
double: https://docs.microsoft.com/en-us/dotnet/api/system.double "double"
byte: https://docs.microsoft.com/en-us/dotnet/api/system.byte "byte"
int: https://docs.microsoft.com/en-us/dotnet/api/system.int32 "int"
long: https://docs.microsoft.com/en-us/dotnet/api/system.int64 "long"
void: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/void "void"
string: https://docs.microsoft.com/en-us/dotnet/api/system.string "string"
URL: https://nodejs.org/api/url.html "URL"
Regex: https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex "Regex"

Action: https://docs.microsoft.com/en-us/dotnet/api/system.action-1 "Action"
Func: https://docs.microsoft.com/en-us/dotnet/api/system.func-2 "Func"
IEnumerable: https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerable "IEnumerable"
IReadOnlyList: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlylist-1?view=net-9.0 "IReadOnlyList"
IDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.idictionary "IDictionary"
Task: https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-5.0 "Task"
IReadOnlyDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2 "IReadOnlyDictionary"
JsonElement: https://docs.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement "JsonElement"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-dotnet/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
