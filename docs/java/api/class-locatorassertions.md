# LocatorAssertions

> **Source:** [playwright.dev/java/docs/api/class-locatorassertions](https://playwright.dev/java/docs/api/class-locatorassertions)

---

The LocatorAssertions class provides assertion methods that can be used to make assertions about the Locator state in the tests.

```java
// ...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestLocator {
  // ...
  @Test
  void statusBecomesSubmitted() {
    // ...
    page.getByRole(AriaRole.BUTTON).click();
    assertThat(page.locator(".status")).hasText("Submitted");
  }
}
```


---

## Methods

### containsClass {/* #locator-assertions-to-contain-class */}



Ensures the Locator points to an element with given CSS classes. All classes from the asserted value, separated by spaces, must be present in the [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) in any order.

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```java
assertThat(page.locator("#component")).containsClass("middle selected row");
assertThat(page.locator("#component")).containsClass("selected");
assertThat(page.locator("#component")).containsClass("row middle");
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class lists. Each element's class attribute is matched against the corresponding class in the array:

```html
<div class='list'>
  <div class='component inactive'></div>
  <div class='component active'></div>
  <div class='component inactive'></div>
</div>
```

```java
assertThat(page.locator(".list > .component")).containsClass(Arrays.asList("inactive", "active", "inactive"));
```

**Arguments**
- `expected` String | List<String>
  
  A string containing expected class names, separated by spaces, or a list of such strings to assert multiple elements.
- `options` `LocatorAssertions.ContainsClassOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### containsText {/* #locator-assertions-to-contain-text */}



Ensures the Locator points to an element that contains the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```java
assertThat(page.locator(".title")).containsText("substring");
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

```java
// ✓ Contains the right items in the right order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 1", "Text 3"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 3", "Text 2"});

// ✖ No item contains this text
assertThat(page.locator("ul > li")).containsText(new String[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).containsText(new String[] {"Text 3"});
```

**Arguments**
- `expected` String | Pattern | String&#91;&#93; | Pattern&#91;&#93; 
  
  Expected substring or RegExp or a list of those.
- `options` `LocatorAssertions.ContainsTextOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-contain-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `setUseInnerText` boolean *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- void

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### hasAccessibleDescription {/* #locator-assertions-to-have-accessible-description */}



Ensures the Locator points to an element with a given [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).

**Usage**

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasAccessibleDescription("Save results to disk");
```

**Arguments**
- `description` String | Pattern
  
  Expected accessible description.
- `options` `LocatorAssertions.HasAccessibleDescriptionOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-description-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasAccessibleErrorMessage {/* #locator-assertions-to-have-accessible-error-message */}



Ensures the Locator points to an element with a given [aria errormessage](https://w3c.github.io/aria/#aria-errormessage).

**Usage**

```java
Locator locator = page.getByTestId("username-input");
assertThat(locator).hasAccessibleErrorMessage("Username is required.");
```

**Arguments**
- `errorMessage` String | Pattern
  
  Expected accessible error message.
- `options` `LocatorAssertions.HasAccessibleErrorMessageOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-error-message-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasAccessibleName {/* #locator-assertions-to-have-accessible-name */}



Ensures the Locator points to an element with a given [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasAccessibleName("Save to disk");
```

**Arguments**
- `name` String | Pattern
  
  Expected accessible name.
- `options` `LocatorAssertions.HasAccessibleNameOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)*
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-accessible-name-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasAttribute {/* #locator-assertions-to-have-attribute */}



Ensures the Locator points to an element with given attribute.

**Usage**

```java
assertThat(page.locator("input")).hasAttribute("type", "text");
```

**Arguments**
- `name` String 
  
  Attribute name.
- `value` String | Pattern 
  
  Expected attribute value.
- `options` `LocatorAssertions.HasAttributeOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-attribute-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasClass {/* #locator-assertions-to-have-class */}



Ensures the Locator points to an element with given CSS classes. When a string is provided, it must fully match the element's `class` attribute. To match individual classes use [assertThat(locator).containsClass()](/api/class-locatorassertions.mdx#locator-assertions-to-contain-class).

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```java
assertThat(page.locator("#component")).hasClass("middle selected row");
assertThat(page.locator("#component")).hasClass(Pattern.compile("(^|\\s)selected(\\s|$)"));
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class values. Each element's class attribute is matched against the corresponding string or regular expression in the array:

```java
assertThat(page.locator(".list > .component")).hasClass(new String[] {"component", "component selected", "component"});
```

**Arguments**
- `expected` String | Pattern | String&#91;&#93; | Pattern&#91;&#93; 
  
  Expected class or RegExp or a list of those.
- `options` `LocatorAssertions.HasClassOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasCount {/* #locator-assertions-to-have-count */}



Ensures the Locator resolves to an exact number of DOM nodes.

**Usage**

```java
assertThat(page.locator("list > .component")).hasCount(3);
```

**Arguments**
- `count` int 
  
  Expected count.
- `options` `LocatorAssertions.HasCountOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasCSS {/* #locator-assertions-to-have-css */}



Ensures the Locator resolves to an element with the given computed CSS style.

**Usage**

```java
assertThat(page.getByRole(AriaRole.BUTTON)).hasCSS("display", "flex");
```

**Arguments**
- `name` String 
  
  CSS property name.
- `value` String | Pattern 
  
  CSS property value.
- `options` `LocatorAssertions.HasCSSOptions` *(optional)*
  - `setPseudo` `enum PseudoElement { BEFORE, AFTER }` *(optional)* 
    
    Pseudo-element to read computed styles from.
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasId {/* #locator-assertions-to-have-id */}



Ensures the Locator points to an element with the given DOM Node ID.

**Usage**

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).hasId("lastname");
```

**Arguments**
- `id` String | Pattern 
  
  Element id.
- `options` `LocatorAssertions.HasIdOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasJSProperty {/* #locator-assertions-to-have-js-property */}



Ensures the Locator points to an element with given JavaScript property. Note that this property can be of a primitive type as well as a plain serializable JavaScript object.

**Usage**

```java
assertThat(page.locator("input")).hasJSProperty("loaded", true);
```

**Arguments**
- `name` String 
  
  Property name.
- `value` Object 
  
  Property value.
- `options` `LocatorAssertions.HasJSPropertyOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasRole {/* #locator-assertions-to-have-role */}



Ensures the Locator points to an element with a given [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles).

Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass role `"checkbox"` on an element with a subclass role `"switch"` will fail.

**Usage**

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasRole(AriaRole.BUTTON);
```

**Arguments**
- `role` `enum AriaRole { ALERT, ALERTDIALOG, APPLICATION, ARTICLE, BANNER, BLOCKQUOTE, BUTTON, CAPTION, CELL, CHECKBOX, CODE, COLUMNHEADER, COMBOBOX, COMPLEMENTARY, CONTENTINFO, DEFINITION, DELETION, DIALOG, DIRECTORY, DOCUMENT, EMPHASIS, FEED, FIGURE, FORM, GENERIC, GRID, GRIDCELL, GROUP, HEADING, IMG, INSERTION, LINK, LIST, LISTBOX, LISTITEM, LOG, MAIN, MARQUEE, MATH, METER, MENU, MENUBAR, MENUITEM, MENUITEMCHECKBOX, MENUITEMRADIO, NAVIGATION, NONE, NOTE, OPTION, PARAGRAPH, PRESENTATION, PROGRESSBAR, RADIO, RADIOGROUP, REGION, ROW, ROWGROUP, ROWHEADER, SCROLLBAR, SEARCH, SEARCHBOX, SEPARATOR, SLIDER, SPINBUTTON, STATUS, STRONG, SUBSCRIPT, SUPERSCRIPT, SWITCH, TAB, TABLE, TABLIST, TABPANEL, TERM, TEXTBOX, TIME, TIMER, TOOLBAR, TOOLTIP, TREE, TREEGRID, TREEITEM }`
  
  Required aria role.
- `options` `LocatorAssertions.HasRoleOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasText {/* #locator-assertions-to-have-text */}



Ensures the Locator points to an element with the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Usage**

```java
assertThat(page.locator(".title")).hasText("Welcome, Test User");
assertThat(page.locator(".title")).hasText(Pattern.compile("Welcome, .*"));
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

```java
// ✓ Has the right items in the right order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});
```

**Arguments**
- `expected` String | Pattern | String&#91;&#93; | Pattern&#91;&#93; 
  
  Expected string or RegExp or a list of those.
- `options` `LocatorAssertions.HasTextOptions` *(optional)*
  - `setIgnoreCase` boolean *(optional)* 
    
    Whether to perform case-insensitive match. [setIgnoreCase](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `setUseInnerText` boolean *(optional)* 
    
    Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

**Returns**
- void

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and in the expected string before matching. When regular expression is used, the actual text is matched as is.

---

### hasValue {/* #locator-assertions-to-have-value */}



Ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.

**Usage**

```java
assertThat(page.locator("inputtype=number")).hasValue(Pattern.compile("0-9"));
```

**Arguments**
- `value` String | Pattern 
  
  Expected value.
- `options` `LocatorAssertions.HasValueOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### hasValues {/* #locator-assertions-to-have-values */}



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

```java
page.locator("id=favorite-colors").selectOption(new String[]{"R", "G"});
assertThat(page.locator("id=favorite-colors")).hasValues(new Pattern[] { Pattern.compile("R"), Pattern.compile("G") });
```

**Arguments**
- `values` String&#91;&#93; | Pattern&#91;&#93;
  
  Expected options currently selected.
- `options` `LocatorAssertions.HasValuesOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isAttached {/* #locator-assertions-to-be-attached */}



Ensures that Locator points to an element that is [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

**Usage**

```java
assertThat(page.getByText("Hidden text")).isAttached();
```

**Arguments**
- `options` `LocatorAssertions.IsAttachedOptions` *(optional)*
  - `setAttached` boolean *(optional)*
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isChecked {/* #locator-assertions-to-be-checked */}



Ensures the Locator points to a checked input.

**Usage**

```java
assertThat(page.getByLabel("Subscribe to newsletter")).isChecked();
```

**Arguments**
- `options` `LocatorAssertions.IsCheckedOptions` *(optional)*
  - `setChecked` boolean *(optional)* 
    
    Provides state to assert for. Asserts for input to be checked by default. This option can't be used when [setIndeterminate](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-indeterminate) is set to true.
  - `setIndeterminate` boolean *(optional)* 
    
    Asserts that the element is in the indeterminate (mixed) state. Only supported for checkboxes and radio buttons. This option can't be true when [setChecked](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked-option-checked) is provided.
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isDisabled {/* #locator-assertions-to-be-disabled */}



Ensures the Locator points to a disabled element. Element is disabled if it has "disabled" attribute or is disabled via ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled). Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup` can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored by the browser.

**Usage**

```java
assertThat(page.locator("button.submit")).isDisabled();
```

**Arguments**
- `options` `LocatorAssertions.IsDisabledOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isEditable {/* #locator-assertions-to-be-editable */}



Ensures the Locator points to an editable element.

**Usage**

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isEditable();
```

**Arguments**
- `options` `LocatorAssertions.IsEditableOptions` *(optional)*
  - `setEditable` boolean *(optional)* 
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isEmpty {/* #locator-assertions-to-be-empty */}



Ensures the Locator points to an empty editable element or to a DOM node that has no text.

**Usage**

```java
assertThat(page.locator("div.warning")).isEmpty();
```

**Arguments**
- `options` `LocatorAssertions.IsEmptyOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isEnabled {/* #locator-assertions-to-be-enabled */}



Ensures the Locator points to an enabled element.

**Usage**

```java
assertThat(page.locator("button.submit")).isEnabled();
```

**Arguments**
- `options` `LocatorAssertions.IsEnabledOptions` *(optional)*
  - `setEnabled` boolean *(optional)* 
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isFocused {/* #locator-assertions-to-be-focused */}



Ensures the Locator points to a focused DOM node.

**Usage**

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isFocused();
```

**Arguments**
- `options` `LocatorAssertions.IsFocusedOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isHidden {/* #locator-assertions-to-be-hidden */}



Ensures that Locator either does not resolve to any DOM node, or resolves to a [non-visible](../actionability.mdx#visible) one.

**Usage**

```java
assertThat(page.locator(".my-element")).isHidden();
```

**Arguments**
- `options` `LocatorAssertions.IsHiddenOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isInViewport {/* #locator-assertions-to-be-in-viewport */}



Ensures the Locator points to an element that intersects viewport, according to the [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

**Usage**

```java
Locator locator = page.getByRole(AriaRole.BUTTON);
// Make sure at least some part of element intersects viewport.
assertThat(locator).isInViewport();
// Make sure element is fully outside of viewport.
assertThat(locator).not().isInViewport();
// Make sure that at least half of the element intersects viewport.
assertThat(locator).isInViewport(new LocatorAssertions.IsInViewportOptions().setRatio(0.5));
```

**Arguments**
- `options` `LocatorAssertions.IsInViewportOptions` *(optional)*
  - `setRatio` double *(optional)*
    
    The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at any positive ratio. Defaults to `0`.
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

### isVisible {/* #locator-assertions-to-be-visible */}



Ensures that Locator points to an attached and [visible](../actionability.mdx#visible) DOM node.

To check that at least one element from the list is visible, use [Locator.first()](/api/class-locator.mdx#locator-first).

**Usage**

```java
// A specific element is visible.
assertThat(page.getByText("Welcome")).isVisible();

// At least one item in the list is visible.
assertThat(page.getByTestId("todo-item").first()).isVisible();

// At least one of the two elements is visible, possibly both.
assertThat(
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .or(page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign up")))
    .first()
).isVisible();
```

**Arguments**
- `options` `LocatorAssertions.IsVisibleOptions` *(optional)*
  - `setTimeout` double *(optional)* 
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.
  - `setVisible` boolean *(optional)* 

**Returns**
- void

---

### matchesAriaSnapshot {/* #locator-assertions-to-match-aria-snapshot */}



Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.mdx).

**Usage**

```java
page.navigate("https://demo.playwright.dev/todomvc/");
assertThat(page.locator("body")).matchesAriaSnapshot("""
  - heading "todos"
  - textbox "What needs to be done?"
""");
```

**Arguments**
- `expected` String
- `options` `LocatorAssertions.MatchesAriaSnapshotOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- void

---

## Properties

### not() {/* #locator-assertions-not */}



Makes the assertion check for the opposite condition.

**Usage**

For example, this code tests that the Locator doesn't contain text `"error"`:

```java
assertThat(locator).not().containsText("error");
```

**Returns**
- LocatorAssertions


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
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
PlaywrightException: /api/class-playwrightexception.mdx "PlaywrightException"
Request: /api/class-request.mdx "Request"
RequestOptions: /api/class-requestoptions.mdx "RequestOptions"
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

boolean: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "boolean"
byte&#91;&#93;: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "byte[]"
Consumer: https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html "Consumer"
Date: https://docs.oracle.com/javase/8/docs/api/java/util/Date.html "Date"
double: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "double"
InputStream: https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html "InputStream"
int: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "int"
long: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "long"
JsonObject: https://www.javadoc.io/doc/com.google.code.gson/gson/latest/com.google.gson/com/google/gson/JsonObject.html "JsonObject"
List: https://docs.oracle.com/javase/8/docs/api/java/util/List.html "List"
Map: https://docs.oracle.com/javase/8/docs/api/java/util/Map.html "Map"
null: https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.7 "null"
Object: https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html "Object"
Path: https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html "Path"
Pattern: https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html "Pattern"
Predicate: https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html "Predicate"
void: https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html "void"
Runnable: https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html "Runnable"
RuntimeException: https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html "RuntimeException"
String: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html "String"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/java/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/java/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-java/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
