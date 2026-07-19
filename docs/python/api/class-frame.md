# Frame

> **Source:** [playwright.dev/python/docs/api/class-frame](https://playwright.dev/python/docs/api/class-frame)

---

At every point of time, page exposes its current frame tree via the [page.main_frame](/api/class-page.mdx#page-main-frame) and [frame.child_frames](/api/class-frame.mdx#frame-child-frames) methods.

Frame object's lifecycle is controlled by three events, dispatched on the page object:
* [page.on("frameattached")](/api/class-page.mdx#page-event-frame-attached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
* [page.on("framenavigated")](/api/class-page.mdx#page-event-frame-navigated) - fired when the frame commits navigation to a different URL.
* [page.on("framedetached")](/api/class-page.mdx#page-event-frame-detached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

**sync**

```py
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = firefox.launch()
    page = browser.new_page()
    page.goto("https://www.theverge.com")
    dump_frame_tree(page.main_frame, "")
    browser.close()

def dump_frame_tree(frame, indent):
    print(indent + frame.name + '@' + frame.url)
    for child in frame.child_frames:
        dump_frame_tree(child, indent + "    ")

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = await firefox.launch()
    page = await browser.new_page()
    await page.goto("https://www.theverge.com")
    dump_frame_tree(page.main_frame, "")
    await browser.close()

def dump_frame_tree(frame, indent):
    print(indent + frame.name + '@' + frame.url)
    for child in frame.child_frames:
        dump_frame_tree(child, indent + "    ")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```


---

## Methods

### add_script_tag {/* #frame-add-script-tag */}



Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

**Usage**

```python
frame.add_script_tag()
frame.add_script_tag(**kwargs)
```

**Arguments**
- `content` str *(optional)*
  
  Raw JavaScript content to be injected into frame.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
- `type` str *(optional)*
  
  Script type. Use 'module' in order to load a JavaScript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- `url` str *(optional)*
  
  URL of a script to be added.

**Returns**
- ElementHandle

---

### add_style_tag {/* #frame-add-style-tag */}



Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

**Usage**

```python
frame.add_style_tag()
frame.add_style_tag(**kwargs)
```

**Arguments**
- `content` str *(optional)*
  
  Raw CSS content to be injected into frame.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
- `url` str *(optional)*
  
  URL of the `<link>` tag.

**Returns**
- ElementHandle

---

### content {/* #frame-content */}



Gets the full HTML contents of the frame, including the doctype.

**Usage**

```python
frame.content()
```

**Returns**
- str

---

### drag_and_drop {/* #frame-drag-and-drop */}



**Usage**

```python
frame.drag_and_drop(source, target)
frame.drag_and_drop(source, target, **kwargs)
```

**Arguments**
- `source` str
  
  A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.
- `target` str
  
  A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `source_position` Dict *(optional)* 
  - `x` float
    
    
  - `y` float
    
    
  Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
- `steps` int *(optional)* 
  
  Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `target_position` Dict *(optional)* 
  - `x` float
    
    
  - `y` float
    
    
  Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

---

### evaluate {/* #frame-evaluate */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

If the function passed to the [frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns a Promise, then [frame.evaluate()](/api/class-frame.mdx#frame-evaluate) would wait for the promise to resolve and return its value.

If the function passed to the [frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns a non-Serializable value, then [frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

**sync**

```py
result = frame.evaluate("(x, y) => Promise.resolve(x * y)", 7, 8)
print(result) # prints "56"
```

**async**

```py
result = await frame.evaluate("(x, y) => Promise.resolve(x * y)", 7, 8)
print(result) # prints "56"
```

A string can also be passed in instead of a function.

**sync**

```py
print(frame.evaluate("1 + 2")) # prints "3"
x = 10
print(frame.evaluate(f"1 + {x}")) # prints "11"
```

**async**

```py
print(await frame.evaluate("1 + 2")) # prints "3"
x = 10
print(await frame.evaluate(f"1 + {x}")) # prints "11"
```

ElementHandle instances can be passed as an argument to the [frame.evaluate()](/api/class-frame.mdx#frame-evaluate):

**sync**

```py
body_handle = frame.evaluate_handle("document.body")
html = frame.evaluate("(body, suffix) => body.innerHTML + suffix", body_handle, "hello")
body_handle.dispose()
```

**async**

```py
body_handle = await frame.evaluate_handle("document.body")
html = await frame.evaluate("(body, suffix) => body.innerHTML + suffix", body_handle, "hello")
await body_handle.dispose()
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

**Returns**
- Dict

---

### evaluate_handle {/* #frame-evaluate-handle */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression) as a JSHandle.

The only difference between [frame.evaluate()](/api/class-frame.mdx#frame-evaluate) and [frame.evaluate_handle()](/api/class-frame.mdx#frame-evaluate-handle) is that [frame.evaluate_handle()](/api/class-frame.mdx#frame-evaluate-handle) returns JSHandle.

If the function, passed to the [frame.evaluate_handle()](/api/class-frame.mdx#frame-evaluate-handle), returns a Promise, then [frame.evaluate_handle()](/api/class-frame.mdx#frame-evaluate-handle) would wait for the promise to resolve and return its value.

**Usage**

**sync**

```py
a_window_handle = frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

**async**

```py
a_window_handle = await frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

A string can also be passed in instead of a function.

**sync**

```py
a_handle = frame.evaluate_handle("document") # handle for the "document"
```

**async**

```py
a_handle = await frame.evaluate_handle("document") # handle for the "document"
```

JSHandle instances can be passed as an argument to the [frame.evaluate_handle()](/api/class-frame.mdx#frame-evaluate-handle):

**sync**

```py
a_handle = frame.evaluate_handle("document.body")
result_handle = frame.evaluate_handle("body => body.innerHTML", a_handle)
print(result_handle.json_value())
result_handle.dispose()
```

**async**

```py
a_handle = await frame.evaluate_handle("document.body")
result_handle = await frame.evaluate_handle("body => body.innerHTML", a_handle)
print(await result_handle.json_value())
await result_handle.dispose()
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression).

**Returns**
- JSHandle

---

### frame_element {/* #frame-frame-element */}



Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [element_handle.content_frame()](/api/class-elementhandle.mdx#element-handle-content-frame). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

**Usage**

**sync**

```py
frame_element = frame.frame_element()
content_frame = frame_element.content_frame()
assert frame == content_frame
```

**async**

```py
frame_element = await frame.frame_element()
content_frame = await frame_element.content_frame()
assert frame == content_frame
```

**Returns**
- ElementHandle

---

### frame_locator {/* #frame-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe id="my-frame">`:

**sync**

```py
locator = frame.frame_locator("#my-iframe").get_by_text("Submit")
locator.click()
```

**async**

```py
locator = frame.frame_locator("#my-iframe").get_by_text("Submit")
await locator.click()
```

**Arguments**
- `selector` str
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### get_by_alt_text {/* #frame-get-by-alt-text */}



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

### get_by_label {/* #frame-get-by-label */}



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

### get_by_placeholder {/* #frame-get-by-placeholder */}



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

### get_by_role {/* #frame-get-by-role */}



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
  
  Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
  
  Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
- `disabled` bool *(optional)*
  
  An attribute that is usually set by `aria-disabled` or `disabled`.
  
  :::note
  
  Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
  :::
  
- `exact` bool *(optional)* 
  
  Whether [name](/api/class-frame.mdx#frame-get-by-role-option-name) and [description](/api/class-frame.mdx#frame-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
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
  
  Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
  
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

### get_by_test_id {/* #frame-get-by-test-id */}



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

### get_by_text {/* #frame-get-by-text */}



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

### get_by_title {/* #frame-get-by-title */}



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

### goto {/* #frame-goto */}



Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

The method will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the [timeout](/api/class-frame.mdx#frame-goto-option-timeout) is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status](/api/class-response.mdx#response-status).

:::note

The method either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
:::

:::note
Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
:::

**Usage**

```python
frame.goto(url)
frame.goto(url, **kwargs)
```

**Arguments**
- `url` str
  
  URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `referer` str *(optional)*
  
  Referer header value. If provided it will take preference over the referer header value set by [page.set_extra_http_headers()](/api/class-page.mdx#page-set-extra-http-headers).
- `timeout` float *(optional)*
  
  Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `wait_until` "load" | "domcontentloaded" | "networkidle" | "commit" *(optional)*
  
  When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- NoneType | Response

---

### is_enabled {/* #frame-is-enabled */}



Returns whether the element is [enabled](../actionability.mdx#enabled).

**Usage**

```python
frame.is_enabled(selector)
frame.is_enabled(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### locator {/* #frame-locator */}



The method returns an element locator that can be used to perform actions on this page / frame. Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

[Learn more about locators](../locators.mdx).

[Learn more about locators](../locators.mdx).

**Usage**

```python
frame.locator(selector)
frame.locator(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to use when resolving DOM element.
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

### set_content {/* #frame-set-content */}



This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write), inheriting all its specific characteristics and behaviors.

**Usage**

```python
frame.set_content(html)
frame.set_content(html, **kwargs)
```

**Arguments**
- `html` str
  
  HTML markup to assign to the page.
- `timeout` float *(optional)*
  
  Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `wait_until` "load" | "domcontentloaded" | "networkidle" | "commit" *(optional)*
  
  When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- NoneType

---

### title {/* #frame-title */}



Returns the page title.

**Usage**

```python
frame.title()
```

**Returns**
- str

---

### wait_for_function {/* #frame-wait-for-function */}



Returns when the [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) returns a truthy value, returns that value.

**Usage**

The [frame.wait_for_function()](/api/class-frame.mdx#frame-wait-for-function) can be used to observe viewport size change:

**sync**

```py
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()
    page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    page.main_frame.wait_for_function("() => window.x > 0")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch()
    page = await browser.new_page()
    await page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    await page.main_frame.wait_for_function("() => window.x > 0")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

To pass an argument to the predicate of `frame.waitForFunction` function:

**sync**

```py
selector = ".foo"
frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

**async**

```py
selector = ".foo"
await frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression).
- `polling` float | "raf" *(optional)*
  
  If [polling](/api/class-frame.mdx#frame-wait-for-function-option-polling) is `'raf'`, then [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) is constantly executed in `requestAnimationFrame` callback. If [polling](/api/class-frame.mdx#frame-wait-for-function-option-polling) is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- JSHandle

---

### wait_for_load_state {/* #frame-wait-for-load-state */}



Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

:::note

Most of the time, this method is not needed because Playwright [auto-waits before every action](../actionability.mdx).
:::

**Usage**

**sync**

```py
frame.click("button") # click triggers navigation.
frame.wait_for_load_state() # the promise resolves after "load" event.
```

**async**

```py
await frame.click("button") # click triggers navigation.
await frame.wait_for_load_state() # the promise resolves after "load" event.
```

**Arguments**
- `state` "load" | "domcontentloaded" | "networkidle" *(optional)*
  
  Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
- `timeout` float *(optional)*
  
  Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### wait_for_url {/* #frame-wait-for-url */}



Waits for the frame to navigate to the given URL.

**Usage**

**sync**

```py
frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
frame.wait_for_url("**/target.html")
```

**async**

```py
await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
await frame.wait_for_url("**/target.html")
```

**Arguments**
- `url` str | Pattern | Callable\[URL\]:bool
  
  A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
- `timeout` float *(optional)*
  
  Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `wait_until` "load" | "domcontentloaded" | "networkidle" | "commit" *(optional)*
  
  When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- NoneType

---

## Properties

### child_frames {/* #frame-child-frames */}



**Usage**

```python
frame.child_frames
```

**Returns**
- List\[Frame\]

---

### is_detached {/* #frame-is-detached */}



Returns `true` if the frame has been detached, or `false` otherwise.

**Usage**

```python
frame.is_detached()
```

**Returns**
- bool

---

### name {/* #frame-name */}



Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

:::note

This value is calculated once when the frame is created, and will not update if the attribute is changed later.
:::

**Usage**

```python
frame.name
```

**Returns**
- str

---

### page {/* #frame-page */}



Returns the page containing this frame.

**Usage**

```python
frame.page
```

**Returns**
- Page

---

### parent_frame {/* #frame-parent-frame */}



Parent frame, if any. Detached frames and main frames return `null`.

**Usage**

```python
frame.parent_frame
```

**Returns**
- NoneType | Frame

---

### url {/* #frame-url */}



Returns frame's url.

**Usage**

```python
frame.url
```

**Returns**
- str

---

## Deprecated

### check {/* #frame-check */}



:::warningDiscouraged

Use locator-based [locator.check()](/api/class-locator.mdx#locator-check) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-check-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-check-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-check-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```python
frame.check(selector)
frame.check(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)* 
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

---

### click {/* #frame-click */}



:::warningDiscouraged

Use locator-based [locator.click()](/api/class-locator.mdx#locator-click) instead. Read more about [locators](../locators.mdx).

:::


This method clicks an element matching [selector](/api/class-frame.mdx#frame-click-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-click-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-click-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [position](/api/class-frame.mdx#frame-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [no_wait_after](/api/class-frame.mdx#frame-click-option-no-wait-after) option is set.

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```python
frame.click(selector)
frame.click(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `click_count` int *(optional)*
  
  defaults to 1. See UIEvent.detail.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option will default to `true` in the future.
  :::
  
  
  Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

---

### dblclick {/* #frame-dblclick */}



:::warningDiscouraged

Use locator-based [locator.dblclick()](/api/class-locator.mdx#locator-dblclick) instead. Read more about [locators](../locators.mdx).

:::


This method double clicks an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-dblclick-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [position](/api/class-frame.mdx#frame-dblclick-option-position). if the first click of the `dblclick()` triggers a navigation event, this method will throw.

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

**Usage**

```python
frame.dblclick(selector)
frame.dblclick(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

---

### dispatch_event {/* #frame-dispatch-event */}



:::warningDiscouraged

Use locator-based [locator.dispatch_event()](/api/class-locator.mdx#locator-dispatch-event) instead. Read more about [locators](../locators.mdx).

:::


The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

**sync**

```py
frame.dispatch_event("button#submit", "click")
```

**async**

```py
await frame.dispatch_event("button#submit", "click")
```

Under the hood, it creates an instance of an event based on the given [type](/api/class-frame.mdx#frame-dispatch-event-option-type), initializes it with [event_init](/api/class-frame.mdx#frame-dispatch-event-option-event-init) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [event_init](/api/class-frame.mdx#frame-dispatch-event-option-event-init) is event-specific, please refer to the events documentation for the lists of initial properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

**sync**

```py
# note you can only create data_transfer in chromium and firefox
data_transfer = frame.evaluate_handle("new DataTransfer()")
frame.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

**async**

```py
# note you can only create data_transfer in chromium and firefox
data_transfer = await frame.evaluate_handle("new DataTransfer()")
await frame.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `type` str
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `event_init` EvaluationArgument *(optional)*
  
  Optional event-specific initialization properties.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### eval_on_selector {/* #frame-eval-on-selector */}



:::warningDiscouraged

This method does not wait for the element to pass the actionability checks and therefore can lead to the flaky tests. Use [locator.evaluate()](/api/class-locator.mdx#locator-evaluate), other Locator helper methods or web-first assertions instead.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).

The method finds an element matching the specified selector within the frame and passes it as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression). If no elements match the selector, the method throws an error.

If [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression) returns a Promise, then [frame.eval_on_selector()](/api/class-frame.mdx#frame-eval-on-selector) would wait for the promise to resolve and return its value.

**Usage**

**sync**

```py
search_value = frame.eval_on_selector("#search", "el => el.value")
preload_href = frame.eval_on_selector("linkrel=preload", "el => el.href")
html = frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

**async**

```py
search_value = await frame.eval_on_selector("#search", "el => el.value")
preload_href = await frame.eval_on_selector("linkrel=preload", "el => el.href")
html = await frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

**Arguments**
- `selector` str
  
  A selector to query for.
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- Dict

---

### eval_on_selector_all {/* #frame-eval-on-selector-all */}



:::warningDiscouraged

In most cases, [locator.evaluate_all()](/api/class-locator.mdx#locator-evaluate-all), other Locator helper methods and web-first assertions do a better job.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

If [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression) returns a Promise, then [frame.eval_on_selector_all()](/api/class-frame.mdx#frame-eval-on-selector-all) would wait for the promise to resolve and return its value.

**Usage**

**sync**

```py
divs_counts = frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

**async**

```py
divs_counts = await frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

**Arguments**
- `selector` str
  
  A selector to query for.
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

**Returns**
- Dict

---

### expect_navigation {/* #frame-wait-for-navigation */}



:::warningDeprecated

This method is inherently racy, please use [frame.wait_for_url()](/api/class-frame.mdx#frame-wait-for-url) instead.

:::


Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:

**sync**

```py
with frame.expect_navigation():
    frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

**async**

```py
async with frame.expect_navigation():
    await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

:::note

Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.
:::

**Arguments**
- `timeout` float *(optional)*
  
  Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `url` str | Pattern | Callable\[URL\]:bool *(optional)*
  
  A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
- `wait_until` "load" | "domcontentloaded" | "networkidle" | "commit" *(optional)*
  
  When to consider operation succeeded, defaults to `load`. Events can be either:
  * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
  * `'load'` - consider operation to be finished when the `load` event is fired.
  * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- EventContextManager\[Response\]

---

### fill {/* #frame-fill */}



:::warningDiscouraged

Use locator-based [locator.fill()](/api/class-locator.mdx#locator-fill) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-fill-option-selector), waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [locator.press_sequentially()](/api/class-locator.mdx#locator-press-sequentially).

**Usage**

```python
frame.fill(selector, value)
frame.fill(selector, value, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `value` str
  
  Value to fill for the `<input>`, `<textarea>` or `contenteditable` element.
- `force` bool *(optional)* 
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### focus {/* #frame-focus */}



:::warningDiscouraged

Use locator-based [locator.focus()](/api/class-locator.mdx#locator-focus) instead. Read more about [locators](../locators.mdx).

:::


This method fetches an element with [selector](/api/class-frame.mdx#frame-focus-option-selector) and focuses it. If there's no element matching [selector](/api/class-frame.mdx#frame-focus-option-selector), the method waits until a matching element appears in the DOM.

**Usage**

```python
frame.focus(selector)
frame.focus(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### get_attribute {/* #frame-get-attribute */}



:::warningDiscouraged

Use locator-based [locator.get_attribute()](/api/class-locator.mdx#locator-get-attribute) instead. Read more about [locators](../locators.mdx).

:::


Returns element attribute value.

**Usage**

```python
frame.get_attribute(selector, name)
frame.get_attribute(selector, name, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `name` str
  
  Attribute name to get the value for.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | str

---

### hover {/* #frame-hover */}



:::warningDiscouraged

Use locator-based [locator.hover()](/api/class-locator.mdx#locator-hover) instead. Read more about [locators](../locators.mdx).

:::


This method hovers over an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-hover-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [position](/api/class-frame.mdx#frame-hover-option-position).

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```python
frame.hover(selector)
frame.hover(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)* 
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

---

### inner_html {/* #frame-inner-html */}



:::warningDiscouraged

Use locator-based [locator.inner_html()](/api/class-locator.mdx#locator-inner-html) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerHTML`.

**Usage**

```python
frame.inner_html(selector)
frame.inner_html(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

---

### inner_text {/* #frame-inner-text */}



:::warningDiscouraged

Use locator-based [locator.inner_text()](/api/class-locator.mdx#locator-inner-text) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerText`.

**Usage**

```python
frame.inner_text(selector)
frame.inner_text(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

---

### input_value {/* #frame-input-value */}



:::warningDiscouraged

Use locator-based [locator.input_value()](/api/class-locator.mdx#locator-input-value) instead. Read more about [locators](../locators.mdx).

:::


Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

**Usage**

```python
frame.input_value(selector)
frame.input_value(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

---

### is_checked {/* #frame-is-checked */}



:::warningDiscouraged

Use locator-based [locator.is_checked()](/api/class-locator.mdx#locator-is-checked) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

**Usage**

```python
frame.is_checked(selector)
frame.is_checked(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_disabled {/* #frame-is-disabled */}



:::warningDiscouraged

Use locator-based [locator.is_disabled()](/api/class-locator.mdx#locator-is-disabled) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

**Usage**

```python
frame.is_disabled(selector)
frame.is_disabled(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_editable {/* #frame-is-editable */}



:::warningDiscouraged

Use locator-based [locator.is_editable()](/api/class-locator.mdx#locator-is-editable) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [editable](../actionability.mdx#editable).

**Usage**

```python
frame.is_editable(selector)
frame.is_editable(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_hidden {/* #frame-is-hidden */}



:::warningDiscouraged

Use locator-based [locator.is_hidden()](/api/class-locator.mdx#locator-is-hidden) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).  [selector](/api/class-frame.mdx#frame-is-hidden-option-selector) that does not match any elements is considered hidden.

**Usage**

```python
frame.is_hidden(selector)
frame.is_hidden(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  :::warningDeprecated
  This option is ignored. [frame.is_hidden()](/api/class-frame.mdx#frame-is-hidden) does not wait for the element to become hidden and returns immediately.
  :::
  

**Returns**
- bool

---

### is_visible {/* #frame-is-visible */}



:::warningDiscouraged

Use locator-based [locator.is_visible()](/api/class-locator.mdx#locator-is-visible) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [visible](../actionability.mdx#visible). [selector](/api/class-frame.mdx#frame-is-visible-option-selector) that does not match any elements is considered not visible.

**Usage**

```python
frame.is_visible(selector)
frame.is_visible(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  :::warningDeprecated
  This option is ignored. [frame.is_visible()](/api/class-frame.mdx#frame-is-visible) does not wait for the element to become visible and returns immediately.
  :::
  

**Returns**
- bool

---

### press {/* #frame-press */}



:::warningDiscouraged

Use locator-based [locator.press()](/api/class-locator.mdx#locator-press) instead. Read more about [locators](../locators.mdx).

:::


[key](/api/class-frame.mdx#frame-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-frame.mdx#frame-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-frame.mdx#frame-press-option-key) in the upper case.

If [key](/api/class-frame.mdx#frame-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```python
frame.press(selector, key)
frame.press(selector, key, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `key` str
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `delay` float *(optional)*
  
  Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option will default to `true` in the future.
  :::
  
  
  Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### query_selector {/* #frame-query-selector */}



:::warningDiscouraged

Use locator-based [frame.locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandle pointing to the frame element.

:::caution

The use of ElementHandle is discouraged, use Locator objects and web-first assertions instead.
:::

The method finds an element matching the specified selector within the frame. If no elements match the selector, returns `null`.

**Usage**

```python
frame.query_selector(selector)
frame.query_selector(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to query for.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- NoneType | ElementHandle

---

### query_selector_all {/* #frame-query-selector-all */}



:::warningDiscouraged

Use locator-based [frame.locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandles pointing to the frame elements.

:::caution

The use of ElementHandle is discouraged, use Locator objects instead.
:::

The method finds all elements matching the specified selector within the frame. If no elements match the selector, returns empty array.

**Usage**

```python
frame.query_selector_all(selector)
```

**Arguments**
- `selector` str
  
  A selector to query for.

**Returns**
- List\[ElementHandle\]

---

### select_option {/* #frame-select-option */}



:::warningDiscouraged

Use locator-based [locator.select_option()](/api/class-locator.mdx#locator-select-option) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-select-option-option-selector), waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

**sync**

```py
# Single selection matching the value or label
frame.select_option("select#colors", "blue")
# single selection matching both the label
frame.select_option("select#colors", label="blue")
# multiple selection
frame.select_option("select#colors", value="red", "green", "blue")
```

**async**

```py
# Single selection matching the value or label
await frame.select_option("select#colors", "blue")
# single selection matching the label
await frame.select_option("select#colors", label="blue")
# multiple selection
await frame.select_option("select#colors", value="red", "green", "blue")
```

**Arguments**
- `selector` str
  
  A selector to query for.
- `force` bool *(optional)* 
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `element` ElementHandle | List\[ElementHandle\] *(optional)*
  
  Option elements to select. Optional.
- `index` int | List\[int\] *(optional)*
  
  Options to select by index. Optional.
- `value` str | List\[str\] *(optional)*
  
  Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- `label` str | List\[str\] *(optional)*
  
  Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.

**Returns**
- List\[str\]

---

### set_checked {/* #frame-set-checked */}



:::warningDiscouraged

Use locator-based [locator.set_checked()](/api/class-locator.mdx#locator-set-checked) instead. Read more about [locators](../locators.mdx).

:::


This method checks or unchecks an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```python
frame.set_checked(selector, checked)
frame.set_checked(selector, checked, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `checked` bool
  
  Whether to check or uncheck the checkbox.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)*
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

---

### set_input_files {/* #frame-set-input-files */}



:::warningDiscouraged

Use locator-based [locator.set_input_files()](/api/class-locator.mdx#locator-set-input-files) instead. Read more about [locators](../locators.mdx).

:::


Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [selector](/api/class-frame.mdx#frame-set-input-files-option-selector) to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

**Usage**

```python
frame.set_input_files(selector, files)
frame.set_input_files(selector, files, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `files` Union\[str, pathlib.Path\] | List\[Union\[str, pathlib.Path\]\] | Dict | List\[Dict\]
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### tap {/* #frame-tap */}



:::warningDiscouraged

Use locator-based [locator.tap()](/api/class-locator.mdx#locator-tap) instead. Read more about [locators](../locators.mdx).

:::


This method taps an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-tap-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.touchscreen](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [position](/api/class-frame.mdx#frame-tap-option-position).

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

**Usage**

```python
frame.tap(selector)
frame.tap(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

---

### text_content {/* #frame-text-content */}



:::warningDiscouraged

Use locator-based [locator.text_content()](/api/class-locator.mdx#locator-text-content) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.textContent`.

**Usage**

```python
frame.text_content(selector)
frame.text_content(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | str

---

### type {/* #frame-type */}



:::warningDeprecated

In most cases, you should use [locator.fill()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [locator.press_sequentially()](/api/class-locator.mdx#locator-press-sequentially).

:::


Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [frame.fill()](/api/class-frame.mdx#frame-fill).

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press()](/api/class-keyboard.mdx#keyboard-press).

**Usage**

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `text` str
  
  A text to type into a focused element.
- `delay` float *(optional)*
  
  Time to wait between key presses in milliseconds. Defaults to 0.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### uncheck {/* #frame-uncheck */}



:::warningDiscouraged

Use locator-based [locator.uncheck()](/api/class-locator.mdx#locator-uncheck) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-frame.mdx#frame-uncheck-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-frame.mdx#frame-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```python
frame.uncheck(selector)
frame.uncheck(selector, **kwargs)
```

**Arguments**
- `selector` str
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)* 
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)* 
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

---

### wait_for_selector {/* #frame-wait-for-selector */}



:::warningDiscouraged

Use web assertions that assert visibility or a locator-based [locator.wait_for()](/api/class-locator.mdx#locator-wait-for) instead. Read more about [locators](../locators.mdx).

:::


Returns when element specified by selector satisfies [state](/api/class-frame.mdx#frame-wait-for-selector-option-state) option. Returns `null` if waiting for `hidden` or `detached`.

:::note

Playwright automatically waits for element to be ready before performing an action. Using Locator objects and web-first assertions make the code wait-for-selector-free.
:::

Wait for the [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) to satisfy [state](/api/class-frame.mdx#frame-wait-for-selector-option-state) option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the [timeout](/api/class-frame.mdx#frame-wait-for-selector-option-timeout) milliseconds, the function will throw.

**Usage**

This method works across navigations:

**sync**

```py
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    for current_url in "https://google.com", "https://bbc.com":
        page.goto(current_url, wait_until="domcontentloaded")
        element = page.main_frame.wait_for_selector("img")
        print("Loaded image: " + str(element.get_attribute("src")))
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    for current_url in "https://google.com", "https://bbc.com":
        await page.goto(current_url, wait_until="domcontentloaded")
        element = await page.main_frame.wait_for_selector("img")
        print("Loaded image: " + str(await element.get_attribute("src")))
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

**Arguments**
- `selector` str
  
  A selector to query for.
- `state` "attached" | "detached" | "visible" | "hidden" *(optional)*
  
  Defaults to `'visible'`. Can be either:
  * `'attached'` - wait for element to be present in DOM.
  * `'detached'` - wait for element to not be present in DOM.
  * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
  * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
- `strict` bool *(optional)* 
  
  When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | ElementHandle

---

### wait_for_timeout {/* #frame-wait-for-timeout */}



:::warningDiscouraged

Never wait for timeout in production. Tests that wait for time are inherently flaky. Use Locator actions and web assertions that wait automatically.

:::


Waits for the given [timeout](/api/class-frame.mdx#frame-wait-for-timeout-option-timeout) in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**

```python
frame.wait_for_timeout(timeout)
```

**Arguments**
- `timeout` float
  
  A timeout to wait for

**Returns**
- NoneType


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
