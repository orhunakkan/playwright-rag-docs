# FrameLocator

> **Source:** [playwright.dev/python/docs/api/class-framelocator](https://playwright.dev/python/docs/api/class-framelocator)

---

FrameLocator represents a view to the `iframe` on the page. It captures the logic sufficient to retrieve the `iframe` and locate elements in that iframe. FrameLocator can be created with either [locator.content_frame](/api/class-locator.mdx#locator-content-frame), [page.frame_locator()](/api/class-page.mdx#page-frame-locator) or [locator.frame_locator()](/api/class-locator.mdx#locator-frame-locator) method.

**sync**

```py
locator = page.locator("my-frame").content_frame.get_by_text("Submit")
locator.click()
```

**async**

```py
locator = page.locator("#my-frame").content_frame.get_by_text("Submit")
await locator.click()
```

**Strictness**

Frame locators are strict. This means that all operations on frame locators will throw if more than one element matches a given selector.

**sync**

```py
# Throws if there are several frames in DOM:
page.locator('.result-frame').content_frame.get_by_role('button').click()

# Works because we explicitly tell locator to pick the first frame:
page.locator('.result-frame').first.content_frame.get_by_role('button').click()
```

**async**

```py
# Throws if there are several frames in DOM:
await page.locator('.result-frame').content_frame.get_by_role('button').click()

# Works because we explicitly tell locator to pick the first frame:
await page.locator('.result-frame').first.content_frame.get_by_role('button').click()
```

**Converting Locator to FrameLocator**

If you have a Locator object pointing to an `iframe` it can be converted to FrameLocator using [locator.content_frame](/api/class-locator.mdx#locator-content-frame).

**Converting FrameLocator to Locator**

If you have a FrameLocator object it can be converted to Locator pointing to the same `iframe` using [frame_locator.owner](/api/class-framelocator.mdx#frame-locator-owner).


---

## Methods

### frame_locator {/* #frame-locator-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.

**Usage**

```python
frame_locator.frame_locator(selector)
```

**Arguments**
- `selector` str
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### get_by_alt_text {/* #frame-locator-get-by-alt-text */}



Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

**sync**

```py
page.get_by_alt_text("Playwright logo").click()
```

**async**

```py
await page.get_by_alt_text("Playwright logo").click()
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_label {/* #frame-locator-get-by-label */}



Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

**sync**

```py
page.get_by_label("Username").fill("john")
page.get_by_label("Password").fill("secret")
```

**async**

```py
await page.get_by_label("Username").fill("john")
await page.get_by_label("Password").fill("secret")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_placeholder {/* #frame-locator-get-by-placeholder */}



Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

**sync**

```py
page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

**async**

```py
await page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_role {/* #frame-locator-get-by-role */}



Allows locating elements by their [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles), [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes) and [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

Consider the following DOM structure.

```html
<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>
```

You can locate each element by its implicit role:

**sync**

```py
expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

page.get_by_role("checkbox", name="Subscribe").check()

page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

**async**

```py
await expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

await page.get_by_role("checkbox", name="Subscribe").check()

await page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

**Arguments**
- `role` "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
  
  Required aria role.
- `checked` bool *(optional)*
  
  An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
  
  Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
- `description` str | Pattern *(optional)* 
  
  Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-framelocator.mdx#frame-locator-get-by-role-option-exact) to control this behavior.
  
  Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
- `disabled` bool *(optional)*
  
  An attribute that is usually set by `aria-disabled` or `disabled`.
  
  :::note
  
  Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
  :::
  
- `exact` bool *(optional)* 
  
  Whether [name](/api/class-framelocator.mdx#frame-locator-get-by-role-option-name) and [description](/api/class-framelocator.mdx#frame-locator-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
- `expanded` bool *(optional)*
  
  An attribute that is usually set by `aria-expanded`.
  
  Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
- `include_hidden` bool *(optional)*
  
  Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
  
  Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
- `level` int *(optional)*
  
  A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.
  
  Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
- `name` str | Pattern *(optional)*
  
  Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-framelocator.mdx#frame-locator-get-by-role-option-exact) to control this behavior.
  
  Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
- `pressed` bool *(optional)*
  
  An attribute that is usually set by `aria-pressed`.
  
  Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
- `selected` bool *(optional)*
  
  An attribute that is usually set by `aria-selected`.
  
  Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

**Returns**
- Locator

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

---

### get_by_test_id {/* #frame-locator-get-by-test-id */}



Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

**sync**

```py
page.get_by_test_id("directions").click()
```

**async**

```py
await page.get_by_test_id("directions").click()
```

**Arguments**
- `test_id` str | Pattern
  
  Id to locate the element by.

**Returns**
- Locator

**Details**

By default, the `data-testid` attribute is used as a test id. Use [selectors.set_test_id_attribute()](/api/class-selectors.mdx#selectors-set-test-id-attribute) to configure a different test id attribute if necessary.

---

### get_by_text {/* #frame-locator-get-by-text */}



Allows locating elements that contain given text.

See also [locator.filter()](/api/class-locator.mdx#locator-filter) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

**sync**

```py
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

**async**

```py
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

---

### get_by_title {/* #frame-locator-get-by-title */}



Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

**sync**

```py
expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

**async**

```py
await expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### locator {/* #frame-locator-locator */}



The method finds an element matching the specified selector in the locator's subtree. It also accepts filter options, similar to [locator.filter()](/api/class-locator.mdx#locator-filter) method.

[Learn more about locators](../locators.mdx).

**Usage**

```python
frame_locator.locator(selector_or_locator)
frame_locator.locator(selector_or_locator, **kwargs)
```

**Arguments**
- `selector_or_locator` str | Locator
  
  A selector or locator to use when resolving DOM element.
- `has` Locator *(optional)*
  
  Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
  
  Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not` Locator *(optional)* 
  
  Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not_text` str | Pattern *(optional)* 
  
  Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
- `has_text` str | Pattern *(optional)*
  
  Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

**Returns**
- Locator

---

## Properties

### owner {/* #frame-locator-owner */}



Returns a Locator object pointing to the same `iframe` as this frame locator.

Useful when you have a FrameLocator object obtained somewhere, and later on would like to interact with the `iframe` element.

For a reverse operation, use [locator.content_frame](/api/class-locator.mdx#locator-content-frame).

**Usage**

**sync**

```py
frame_locator = page.locator("iframename=\"embedded\"").content_frame
# ...
locator = frame_locator.owner
expect(locator).to_be_visible()
```

**async**

```py
frame_locator = page.locator("iframename=\"embedded\"").content_frame
# ...
locator = frame_locator.owner
await expect(locator).to_be_visible()
```

**Returns**
- Locator

---

## Deprecated

### first {/* #frame-locator-first */}



:::warningDeprecated

Use [locator.first](/api/class-locator.mdx#locator-first) followed by [locator.content_frame](/api/class-locator.mdx#locator-content-frame) instead.

:::


Returns locator to the first matching frame.

**Usage**

```python
frame_locator.first
```

**Returns**
- FrameLocator

---

### last {/* #frame-locator-last */}



:::warningDeprecated

Use [locator.last](/api/class-locator.mdx#locator-last) followed by [locator.content_frame](/api/class-locator.mdx#locator-content-frame) instead.

:::


Returns locator to the last matching frame.

**Usage**

```python
frame_locator.last
```

**Returns**
- FrameLocator

---

### nth {/* #frame-locator-nth */}



:::warningDeprecated

Use [locator.nth()](/api/class-locator.mdx#locator-nth) followed by [locator.content_frame](/api/class-locator.mdx#locator-content-frame) instead.

:::


Returns locator to the n-th matching frame. It's zero based, `nth(0)` selects the first frame.

**Usage**

```python
frame_locator.nth(index)
```

**Arguments**
- `index` int

**Returns**
- FrameLocator


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
Error: /api/class-error.mdx "Error"
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

Any: https://docs.python.org/3/library/typing.html#typing.Any "Any"
bool: https://docs.python.org/3/library/stdtypes.html "bool"
bytes: https://docs.python.org/3/library/stdtypes.html#bytes "bytes"
Callable: https://docs.python.org/3/library/typing.html#typing.Callable "Callable"
EventContextManager: https://docs.python.org/3/reference/datamodel.html#context-managers "Event context manager"
EventEmitter: https://pyee.readthedocs.io/en/latest/#pyee.BaseEventEmitter "EventEmitter"
Exception: https://docs.python.org/3/library/exceptions.html#Exception "Exception"
Dict: https://docs.python.org/3/library/typing.html#typing.Dict "Dict"
float: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "float"
int: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "int"
List: https://docs.python.org/3/library/typing.html#typing.List "List"
NoneType: https://docs.python.org/3/library/constants.html#None "None"
Pattern: https://docs.python.org/3/library/re.html "Pattern"
URL: https://en.wikipedia.org/wiki/URL "URL"
pathlib.Path: https://realpython.com/python-pathlib/ "pathlib.Path"
str: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
Union: https://docs.python.org/3/library/typing.html#typing.Union "Union"
datetime: https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/python/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/python/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-python/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
