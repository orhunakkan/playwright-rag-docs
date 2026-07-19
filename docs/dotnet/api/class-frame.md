# Frame

> **Source:** [playwright.dev/dotnet/docs/api/class-frame](https://playwright.dev/dotnet/docs/api/class-frame)

---

At every point of time, page exposes its current frame tree via the [Page.MainFrame](/api/class-page.mdx#page-main-frame) and [Frame.ChildFrames](/api/class-frame.mdx#frame-child-frames) methods.

Frame object's lifecycle is controlled by three events, dispatched on the page object:
* [Page.FrameAttached](/api/class-page.mdx#page-event-frame-attached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
* [Page.FrameNavigated](/api/class-page.mdx#page-event-frame-navigated) - fired when the frame commits navigation to a different URL.
* [Page.FrameDetached](/api/class-page.mdx#page-event-frame-detached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Firefox.LaunchAsync();
        var page = await browser.NewPageAsync();

        await page.GotoAsync("https://www.bing.com");
        DumpFrameTree(page.MainFrame, string.Empty);
    }

    private static void DumpFrameTree(IFrame frame, string indent)
    {
        Console.WriteLine($"{indent}{frame.Url}");
        foreach (var child in frame.ChildFrames)
            DumpFrameTree(child, indent + " ");
    }
}
```


---

## Methods

### AddScriptTagAsync {/* #frame-add-script-tag */}



Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

**Usage**

```csharp
await Frame.AddScriptTagAsync(options);
```

**Arguments**
- `options` `FrameAddScriptTagOptions?` *(optional)*
  - `Content` string? *(optional)*
    
    Raw JavaScript content to be injected into frame.
  - `Path` string? *(optional)*
    
    Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
  - `Type` string? *(optional)*
    
    Script type. Use 'module' in order to load a JavaScript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
  - `Url` string? *(optional)*
    
    URL of a script to be added.

**Returns**
- ElementHandle

---

### AddStyleTagAsync {/* #frame-add-style-tag */}



Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

**Usage**

```csharp
await Frame.AddStyleTagAsync(options);
```

**Arguments**
- `options` `FrameAddStyleTagOptions?` *(optional)*
  - `Content` string? *(optional)*
    
    Raw CSS content to be injected into frame.
  - `Path` string? *(optional)*
    
    Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
  - `Url` string? *(optional)*
    
    URL of the `<link>` tag.

**Returns**
- ElementHandle

---

### ChildFrames {/* #frame-child-frames */}



**Usage**

```csharp
Frame.ChildFrames
```

**Returns**
- IReadOnlyList<Frame>

---

### ContentAsync {/* #frame-content */}



Gets the full HTML contents of the frame, including the doctype.

**Usage**

```csharp
await Frame.ContentAsync();
```

**Returns**
- string

---

### DragAndDropAsync {/* #frame-drag-and-drop */}



**Usage**

```csharp
await Frame.DragAndDropAsync(source, target, options);
```

**Arguments**
- `source` string
  
  A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.
- `target` string
  
  A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameDragAndDropOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `SourcePosition` SourcePosition? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `Steps` int? *(optional)* 
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `TargetPosition` TargetPosition? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### EvaluateAsync {/* #frame-evaluate */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

If the function passed to the [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate) returns a Promise, then [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate) would wait for the promise to resolve and return its value.

If the function passed to the [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate) returns a non-Serializable value, then [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate) returns `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

```csharp
var result = await frame.EvaluateAsync<int>("(x, y) => Promise.resolve(x * y)", new[] { 7, 8 });
Console.WriteLine(result);
```

A string can also be passed in instead of a function.

```csharp
Console.WriteLine(await frame.EvaluateAsync<int>("1 + 2")); // prints "3"
```

ElementHandle instances can be passed as an argument to the [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate):

```csharp
var bodyHandle = await frame.EvaluateHandleAsync("document.body");
var html = await frame.EvaluateAsync<string>("(body, suffix) => body.innerHTML + suffix", new object [] { bodyHandle, "hello" });
await bodyHandle.DisposeAsync();
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

**Returns**
- object

---

### EvaluateHandleAsync {/* #frame-evaluate-handle */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression) as a JSHandle.

The only difference between [Frame.EvaluateAsync()](/api/class-frame.mdx#frame-evaluate) and [Frame.EvaluateHandleAsync()](/api/class-frame.mdx#frame-evaluate-handle) is that [Frame.EvaluateHandleAsync()](/api/class-frame.mdx#frame-evaluate-handle) returns JSHandle.

If the function, passed to the [Frame.EvaluateHandleAsync()](/api/class-frame.mdx#frame-evaluate-handle), returns a Promise, then [Frame.EvaluateHandleAsync()](/api/class-frame.mdx#frame-evaluate-handle) would wait for the promise to resolve and return its value.

**Usage**

```csharp
// Handle for the window object.
var aWindowHandle = await frame.EvaluateHandleAsync("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function.

```csharp
var docHandle = await frame.EvaluateHandleAsync("document"); // Handle for the `document`
```

JSHandle instances can be passed as an argument to the [Frame.EvaluateHandleAsync()](/api/class-frame.mdx#frame-evaluate-handle):

```csharp
var handle = await frame.EvaluateHandleAsync("() => document.body");
var resultHandle = await frame.EvaluateHandleAsync("(body, suffix) => body.innerHTML + suffix", new object[] { handle, "hello" });
Console.WriteLine(await resultHandle.JsonValueAsync<string>());
await resultHandle.DisposeAsync();
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression).

**Returns**
- JSHandle

---

### FrameElementAsync {/* #frame-frame-element */}



Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [ElementHandle.ContentFrameAsync()](/api/class-elementhandle.mdx#element-handle-content-frame). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

**Usage**

```csharp
var frameElement = await frame.FrameElementAsync();
var contentFrame = await frameElement.ContentFrameAsync();
Console.WriteLine(frame == contentFrame); // -> True
```

**Returns**
- ElementHandle

---

### FrameLocator {/* #frame-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe id="my-frame">`:

```csharp
var locator = frame.FrameLocator("#my-iframe").GetByText("Submit");
await locator.ClickAsync();
```

**Arguments**
- `selector` string
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### GetByAltText {/* #frame-get-by-alt-text */}



Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

```csharp
await page.GetByAltText("Playwright logo").ClickAsync();
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `FrameGetByAltTextOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByLabel {/* #frame-get-by-label */}



Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

```csharp
await page.GetByLabel("Username").FillAsync("john");
await page.GetByLabel("Password").FillAsync("secret");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `FrameGetByLabelOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByPlaceholder {/* #frame-get-by-placeholder */}



Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

```csharp
await page
    .GetByPlaceholder("name@example.com")
    .FillAsync("playwright@microsoft.com");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `FrameGetByPlaceholderOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByRole {/* #frame-get-by-role */}



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

```csharp
await Expect(Page
    .GetByRole(AriaRole.Heading, new() { Name = "Sign up" }))
    .ToBeVisibleAsync();

await page
    .GetByRole(AriaRole.Checkbox, new() { Name = "Subscribe" })
    .CheckAsync();

await page
    .GetByRole(AriaRole.Button, new() {
        NameRegex = new Regex("submit", RegexOptions.IgnoreCase)
    })
    .ClickAsync();
```

**Arguments**
- `role` `enum AriaRole { Alert, Alertdialog, Application, Article, Banner, Blockquote, Button, Caption, Cell, Checkbox, Code, Columnheader, Combobox, Complementary, Contentinfo, Definition, Deletion, Dialog, Directory, Document, Emphasis, Feed, Figure, Form, Generic, Grid, Gridcell, Group, Heading, Img, Insertion, Link, List, Listbox, Listitem, Log, Main, Marquee, Math, Meter, Menu, Menubar, Menuitem, Menuitemcheckbox, Menuitemradio, Navigation, None, Note, Option, Paragraph, Presentation, Progressbar, Radio, Radiogroup, Region, Row, Rowgroup, Rowheader, Scrollbar, Search, Searchbox, Separator, Slider, Spinbutton, Status, Strong, Subscript, Superscript, Switch, Tab, Table, Tablist, Tabpanel, Term, Textbox, Time, Timer, Toolbar, Tooltip, Tree, Treegrid, Treeitem }`
  
  Required aria role.
- `options` `FrameGetByRoleOptions?` *(optional)*
  - `Checked` bool? *(optional)*
    
    An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
    
    Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
  - `Description|DescriptionRegex` string? | Regex? *(optional)* 
    
    Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [Exact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
  - `Disabled` bool? *(optional)*
    
    An attribute that is usually set by `aria-disabled` or `disabled`.
    
    :::note
    
    Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
    :::
    
  - `Exact` bool? *(optional)* 
    
    Whether [Name|NameRegex](/api/class-frame.mdx#frame-get-by-role-option-name) and [Description|DescriptionRegex](/api/class-frame.mdx#frame-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
  - `Expanded` bool? *(optional)*
    
    An attribute that is usually set by `aria-expanded`.
    
    Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
  - `IncludeHidden` bool? *(optional)*
    
    Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
    
    Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
  - `Level` int? *(optional)*
    
    A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.
    
    Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
  - `Name|NameRegex` string? | Regex? *(optional)*
    
    Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [Exact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
  - `Pressed` bool? *(optional)*
    
    An attribute that is usually set by `aria-pressed`.
    
    Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
  - `Selected` bool? *(optional)*
    
    An attribute that is usually set by `aria-selected`.
    
    Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

**Returns**
- Locator

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

---

### GetByTestId {/* #frame-get-by-test-id */}



Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

```csharp
await page.GetByTestId("directions").ClickAsync();
```

**Arguments**
- `testId` string | Regex
  
  Id to locate the element by.

**Returns**
- Locator

**Details**

By default, the `data-testid` attribute is used as a test id. Use [Selectors.SetTestIdAttribute()](/api/class-selectors.mdx#selectors-set-test-id-attribute) to configure a different test id attribute if necessary.

---

### GetByText {/* #frame-get-by-text */}



Allows locating elements that contain given text.

See also [Locator.Filter()](/api/class-locator.mdx#locator-filter) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

```csharp
// Matches <span>
page.GetByText("world");

// Matches first <div>
page.GetByText("Hello world");

// Matches second <div>
page.GetByText("Hello", new() { Exact = true });

// Matches both <div>s
page.GetByText(new Regex("Hello"));

// Matches second <div>
page.GetByText(new Regex("^hello$", RegexOptions.IgnoreCase));
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `FrameGetByTextOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

---

### GetByTitle {/* #frame-get-by-title */}



Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

```csharp
await Expect(Page.GetByTitle("Issues count")).toHaveText("25 issues");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `FrameGetByTitleOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GotoAsync {/* #frame-goto */}



Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

The method will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the [Timeout](/api/class-frame.mdx#frame-goto-option-timeout) is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [Response.Status](/api/class-response.mdx#response-status).

:::note

The method either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
:::

:::note
Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
:::

**Usage**

```csharp
await Frame.GotoAsync(url, options);
```

**Arguments**
- `url` string
  
  URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `options` `FrameGotoOptions?` *(optional)*
  - `Referer` string? *(optional)*
    
    Referer header value. If provided it will take preference over the referer header value set by [Page.SetExtraHTTPHeadersAsync()](/api/class-page.mdx#page-set-extra-http-headers).
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `WaitUntil` `enum WaitUntilState { Load, DOMContentLoaded, NetworkIdle, Commit }?` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- Response?

---

### IsDetached {/* #frame-is-detached */}



Returns `true` if the frame has been detached, or `false` otherwise.

**Usage**

```csharp
Frame.IsDetached
```

**Returns**
- bool

---

### IsEnabledAsync {/* #frame-is-enabled */}



Returns whether the element is [enabled](../actionability.mdx#enabled).

**Usage**

```csharp
await Frame.IsEnabledAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsEnabledOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### Locator {/* #frame-locator */}



The method returns an element locator that can be used to perform actions on this page / frame. Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

[Learn more about locators](../locators.mdx).

[Learn more about locators](../locators.mdx).

**Usage**

```csharp
Frame.Locator(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to use when resolving DOM element.
- `options` `FrameLocatorOptions?` *(optional)*
  - `Has` Locator? *(optional)*
    
    Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
    
    Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNot` Locator? *(optional)* 
    
    Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNotText|HasNotTextRegex` string? | Regex? *(optional)* 
    
    Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
  - `HasText|HasTextRegex` string? | Regex? *(optional)*
    
    Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

**Returns**
- Locator

---

### Name {/* #frame-name */}



Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

:::note

This value is calculated once when the frame is created, and will not update if the attribute is changed later.
:::

**Usage**

```csharp
Frame.Name
```

**Returns**
- string

---

### Page {/* #frame-page */}



Returns the page containing this frame.

**Usage**

```csharp
Frame.Page
```

**Returns**
- Page

---

### ParentFrame {/* #frame-parent-frame */}



Parent frame, if any. Detached frames and main frames return `null`.

**Usage**

```csharp
Frame.ParentFrame
```

**Returns**
- Frame?

---

### SetContentAsync {/* #frame-set-content */}



This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write), inheriting all its specific characteristics and behaviors.

**Usage**

```csharp
await Frame.SetContentAsync(html, options);
```

**Arguments**
- `html` string
  
  HTML markup to assign to the page.
- `options` `FrameSetContentOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `WaitUntil` `enum WaitUntilState { Load, DOMContentLoaded, NetworkIdle, Commit }?` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- void

---

### TitleAsync {/* #frame-title */}



Returns the page title.

**Usage**

```csharp
await Frame.TitleAsync();
```

**Returns**
- string

---

### Url {/* #frame-url */}



Returns frame's url.

**Usage**

```csharp
Frame.Url
```

**Returns**
- string

---

### WaitForFunctionAsync {/* #frame-wait-for-function */}



Returns when the [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) returns a truthy value, returns that value.

**Usage**

The [Frame.WaitForFunctionAsync()](/api/class-frame.mdx#frame-wait-for-function) can be used to observe viewport size change:

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Firefox.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.SetViewportSizeAsync(50, 50);
        await page.MainFrame.WaitForFunctionAsync("window.innerWidth < 100");
    }
}
```

To pass an argument to the predicate of `frame.waitForFunction` function:

```csharp
var selector = ".foo";
await page.MainFrame.WaitForFunctionAsync("selector => !!document.querySelector(selector)", selector);
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression).
- `options` `FrameWaitForFunctionOptions?` *(optional)*
  - `PollingInterval` float? *(optional)*
    
    If specified, then it is treated as an interval in milliseconds at which the function would be executed. By default if the option is not specified [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) is executed in `requestAnimationFrame` callback.
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- JSHandle

---

### WaitForLoadStateAsync {/* #frame-wait-for-load-state */}



Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

:::note

Most of the time, this method is not needed because Playwright [auto-waits before every action](../actionability.mdx).
:::

**Usage**

```csharp
await frame.ClickAsync("button");
await frame.WaitForLoadStateAsync(); // Defaults to LoadState.Load
```

**Arguments**
- `state` `enum LoadState { Load, DOMContentLoaded, NetworkIdle }?` *(optional)*
  
  Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
- `options` `FrameWaitForLoadStateOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### WaitForURLAsync {/* #frame-wait-for-url */}



Waits for the frame to navigate to the given URL.

**Usage**

```csharp
await frame.ClickAsync("a.delayed-navigation"); // clicking the link will indirectly cause a navigation
await frame.WaitForURLAsync("**/target.html");
```

**Arguments**
- `url` string | Regex | Func<string, bool>
  
  A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
- `options` `FrameWaitForURLOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `WaitUntil` `enum WaitUntilState { Load, DOMContentLoaded, NetworkIdle, Commit }?` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- void

---

## Deprecated

### CheckAsync {/* #frame-check */}



:::warningDiscouraged

Use locator-based [Locator.CheckAsync()](/api/class-locator.mdx#locator-check) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-check-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-check-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-check-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await Frame.CheckAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameCheckOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### ClickAsync {/* #frame-click */}



:::warningDiscouraged

Use locator-based [Locator.ClickAsync()](/api/class-locator.mdx#locator-click) instead. Read more about [locators](../locators.mdx).

:::


This method clicks an element matching [selector](/api/class-frame.mdx#frame-click-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-click-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-click-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [Position](/api/class-frame.mdx#frame-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [NoWaitAfter](/api/class-frame.mdx#frame-click-option-no-wait-after) option is set.

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await Frame.ClickAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameClickOptions?` *(optional)*
  - `Button` `enum MouseButton { Left, Right, Middle }?` *(optional)*
    
    Defaults to `left`.
  - `ClickCount` int? *(optional)*
    
    defaults to 1. See UIEvent.detail.
  - `Delay` float? *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### DblClickAsync {/* #frame-dblclick */}



:::warningDiscouraged

Use locator-based [Locator.DblClickAsync()](/api/class-locator.mdx#locator-dblclick) instead. Read more about [locators](../locators.mdx).

:::


This method double clicks an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-dblclick-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [Position](/api/class-frame.mdx#frame-dblclick-option-position). if the first click of the `dblclick()` triggers a navigation event, this method will throw.

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

**Usage**

```csharp
await Frame.DblClickAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameDblClickOptions?` *(optional)*
  - `Button` `enum MouseButton { Left, Right, Middle }?` *(optional)*
    
    Defaults to `left`.
  - `Delay` float? *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### DispatchEventAsync {/* #frame-dispatch-event */}



:::warningDiscouraged

Use locator-based [Locator.DispatchEventAsync()](/api/class-locator.mdx#locator-dispatch-event) instead. Read more about [locators](../locators.mdx).

:::


The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```csharp
await frame.DispatchEventAsync("button#submit", "click");
```

Under the hood, it creates an instance of an event based on the given [type](/api/class-frame.mdx#frame-dispatch-event-option-type), initializes it with [eventInit](/api/class-frame.mdx#frame-dispatch-event-option-event-init) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [eventInit](/api/class-frame.mdx#frame-dispatch-event-option-event-init) is event-specific, please refer to the events documentation for the lists of initial properties:
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

```csharp
// Note you can only create DataTransfer in Chromium and Firefox
var dataTransfer = await frame.EvaluateHandleAsync("() => new DataTransfer()");
await frame.DispatchEventAsync("#source", "dragstart", new { dataTransfer });
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `type` string
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` EvaluationArgument? *(optional)*
  
  Optional event-specific initialization properties.
- `options` `FrameDispatchEventOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### EvalOnSelectorAsync {/* #frame-eval-on-selector */}



:::warningDiscouraged

This method does not wait for the element to pass the actionability checks and therefore can lead to the flaky tests. Use [Locator.EvaluateAsync()](/api/class-locator.mdx#locator-evaluate), other Locator helper methods or web-first assertions instead.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).

The method finds an element matching the specified selector within the frame and passes it as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression). If no elements match the selector, the method throws an error.

If [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression) returns a Promise, then [Frame.EvalOnSelectorAsync()](/api/class-frame.mdx#frame-eval-on-selector) would wait for the promise to resolve and return its value.

**Usage**

```csharp
var searchValue = await frame.EvalOnSelectorAsync<string>("#search", "el => el.value");
var preloadHref = await frame.EvalOnSelectorAsync<string>("linkrel=preload", "el => el.href");
var html = await frame.EvalOnSelectorAsync(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).
- `options` `FrameEvalOnSelectorOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- object

---

### EvalOnSelectorAllAsync {/* #frame-eval-on-selector-all */}



:::warningDiscouraged

In most cases, [Locator.EvaluateAllAsync()](/api/class-locator.mdx#locator-evaluate-all), other Locator helper methods and web-first assertions do a better job.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

If [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression) returns a Promise, then [Frame.EvalOnSelectorAllAsync()](/api/class-frame.mdx#frame-eval-on-selector-all) would wait for the promise to resolve and return its value.

**Usage**

```csharp
var divsCount = await frame.EvalOnSelectorAllAsync<bool>("div", "(divs, min) => divs.length >= min", 10);
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

**Returns**
- object

---

### FillAsync {/* #frame-fill */}



:::warningDiscouraged

Use locator-based [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-fill-option-selector), waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

**Usage**

```csharp
await Frame.FillAsync(selector, value, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `value` string
  
  Value to fill for the `<input>`, `<textarea>` or `contenteditable` element.
- `options` `FrameFillOptions?` *(optional)*
  - `Force` bool? *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### FocusAsync {/* #frame-focus */}



:::warningDiscouraged

Use locator-based [Locator.FocusAsync()](/api/class-locator.mdx#locator-focus) instead. Read more about [locators](../locators.mdx).

:::


This method fetches an element with [selector](/api/class-frame.mdx#frame-focus-option-selector) and focuses it. If there's no element matching [selector](/api/class-frame.mdx#frame-focus-option-selector), the method waits until a matching element appears in the DOM.

**Usage**

```csharp
await Frame.FocusAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameFocusOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### GetAttributeAsync {/* #frame-get-attribute */}



:::warningDiscouraged

Use locator-based [Locator.GetAttributeAsync()](/api/class-locator.mdx#locator-get-attribute) instead. Read more about [locators](../locators.mdx).

:::


Returns element attribute value.

**Usage**

```csharp
await Frame.GetAttributeAsync(selector, name, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `name` string
  
  Attribute name to get the value for.
- `options` `FrameGetAttributeOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string?

---

### HoverAsync {/* #frame-hover */}



:::warningDiscouraged

Use locator-based [Locator.HoverAsync()](/api/class-locator.mdx#locator-hover) instead. Read more about [locators](../locators.mdx).

:::


This method hovers over an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-hover-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [Position](/api/class-frame.mdx#frame-hover-option-position).

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await Frame.HoverAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameHoverOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)* 
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### InnerHTMLAsync {/* #frame-inner-html */}



:::warningDiscouraged

Use locator-based [Locator.InnerHTMLAsync()](/api/class-locator.mdx#locator-inner-html) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerHTML`.

**Usage**

```csharp
await Frame.InnerHTMLAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameInnerHTMLOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

---

### InnerTextAsync {/* #frame-inner-text */}



:::warningDiscouraged

Use locator-based [Locator.InnerTextAsync()](/api/class-locator.mdx#locator-inner-text) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerText`.

**Usage**

```csharp
await Frame.InnerTextAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameInnerTextOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

---

### InputValueAsync {/* #frame-input-value */}



:::warningDiscouraged

Use locator-based [Locator.InputValueAsync()](/api/class-locator.mdx#locator-input-value) instead. Read more about [locators](../locators.mdx).

:::


Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

**Usage**

```csharp
await Frame.InputValueAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameInputValueOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

---

### IsCheckedAsync {/* #frame-is-checked */}



:::warningDiscouraged

Use locator-based [Locator.IsCheckedAsync()](/api/class-locator.mdx#locator-is-checked) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

**Usage**

```csharp
await Frame.IsCheckedAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsCheckedOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsDisabledAsync {/* #frame-is-disabled */}



:::warningDiscouraged

Use locator-based [Locator.IsDisabledAsync()](/api/class-locator.mdx#locator-is-disabled) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

**Usage**

```csharp
await Frame.IsDisabledAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsDisabledOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsEditableAsync {/* #frame-is-editable */}



:::warningDiscouraged

Use locator-based [Locator.IsEditableAsync()](/api/class-locator.mdx#locator-is-editable) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [editable](../actionability.mdx#editable).

**Usage**

```csharp
await Frame.IsEditableAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsEditableOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsHiddenAsync {/* #frame-is-hidden */}



:::warningDiscouraged

Use locator-based [Locator.IsHiddenAsync()](/api/class-locator.mdx#locator-is-hidden) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).  [selector](/api/class-frame.mdx#frame-is-hidden-option-selector) that does not match any elements is considered hidden.

**Usage**

```csharp
await Frame.IsHiddenAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsHiddenOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Frame.IsHiddenAsync()](/api/class-frame.mdx#frame-is-hidden) does not wait for the element to become hidden and returns immediately.
    :::
    

**Returns**
- bool

---

### IsVisibleAsync {/* #frame-is-visible */}



:::warningDiscouraged

Use locator-based [Locator.IsVisibleAsync()](/api/class-locator.mdx#locator-is-visible) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [visible](../actionability.mdx#visible). [selector](/api/class-frame.mdx#frame-is-visible-option-selector) that does not match any elements is considered not visible.

**Usage**

```csharp
await Frame.IsVisibleAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameIsVisibleOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Frame.IsVisibleAsync()](/api/class-frame.mdx#frame-is-visible) does not wait for the element to become visible and returns immediately.
    :::
    

**Returns**
- bool

---

### PressAsync {/* #frame-press */}



:::warningDiscouraged

Use locator-based [Locator.PressAsync()](/api/class-locator.mdx#locator-press) instead. Read more about [locators](../locators.mdx).

:::


[key](/api/class-frame.mdx#frame-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-frame.mdx#frame-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-frame.mdx#frame-press-option-key) in the upper case.

If [key](/api/class-frame.mdx#frame-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```csharp
await Frame.PressAsync(selector, key, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `key` string
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` `FramePressOptions?` *(optional)*
  - `Delay` float? *(optional)*
    
    Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### QuerySelectorAsync {/* #frame-query-selector */}



:::warningDiscouraged

Use locator-based [Frame.Locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandle pointing to the frame element.

:::caution

The use of ElementHandle is discouraged, use Locator objects and web-first assertions instead.
:::

The method finds an element matching the specified selector within the frame. If no elements match the selector, returns `null`.

**Usage**

```csharp
await Frame.QuerySelectorAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `options` `FrameQuerySelectorOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- ElementHandle?

---

### QuerySelectorAllAsync {/* #frame-query-selector-all */}



:::warningDiscouraged

Use locator-based [Frame.Locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandles pointing to the frame elements.

:::caution

The use of ElementHandle is discouraged, use Locator objects instead.
:::

The method finds all elements matching the specified selector within the frame. If no elements match the selector, returns empty array.

**Usage**

```csharp
await Frame.QuerySelectorAllAsync(selector);
```

**Arguments**
- `selector` string
  
  A selector to query for.

**Returns**
- IReadOnlyList<ElementHandle>

---

### RunAndWaitForNavigationAsync {/* #frame-wait-for-navigation */}



:::warningDeprecated

This method is inherently racy, please use [Frame.WaitForURLAsync()](/api/class-frame.mdx#frame-wait-for-url) instead.

:::


Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:

```csharp
await frame.RunAndWaitForNavigationAsync(async () =>
{
    // Clicking the link will indirectly cause a navigation.
    await frame.ClickAsync("a.delayed-navigation");
});

// Resolves after navigation has finished
```

:::note
Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.
:::

**Arguments**
- `action` Func<Task> 
  
  Action that triggers the event.
- `options` `FrameRunAndWaitForNavigationOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Url|UrlRegex|UrlFunc` string? | Regex? | Func<string?, bool> *(optional)*
    
    A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
  - `WaitUntil` `enum WaitUntilState { Load, DOMContentLoaded, NetworkIdle, Commit }?` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- Response?

---

### WaitForNavigationAsync {/* #frame-wait-for-navigation */}



:::warningDeprecated

This method is inherently racy, please use [Frame.WaitForURLAsync()](/api/class-frame.mdx#frame-wait-for-url) instead.

:::


Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:

```csharp
await frame.RunAndWaitForNavigationAsync(async () =>
{
    // Clicking the link will indirectly cause a navigation.
    await frame.ClickAsync("a.delayed-navigation");
});

// Resolves after navigation has finished
```

:::note
Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.
:::

**Arguments**
- `options` `FrameRunAndWaitForNavigationOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Url|UrlRegex|UrlFunc` string? | Regex? | Func<string?, bool> *(optional)*
    
    A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
  - `WaitUntil` `enum WaitUntilState { Load, DOMContentLoaded, NetworkIdle, Commit }?` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- Response?

---

### SelectOptionAsync {/* #frame-select-option */}



:::warningDiscouraged

Use locator-based [Locator.SelectOptionAsync()](/api/class-locator.mdx#locator-select-option) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-select-option-option-selector), waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```csharp
// Single selection matching the value or label
await frame.SelectOptionAsync("select#colors", new[] { "blue" });
// single selection matching both the value and the label
await frame.SelectOptionAsync("select#colors", new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await frame.SelectOptionAsync("select#colors", new[] { "red", "green", "blue" });
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `values` string | ElementHandle | IEnumerable | `SelectOption` | IEnumerable | IEnumerable?
  - `Value` string? *(optional)*
    
    Matches by `option.value`. Optional.
  - `Label` string? *(optional)*
    
    Matches by `option.label`. Optional.
  - `Index` int? *(optional)*
    
    Matches by the index. Optional.
  
  Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are matching both values and labels. Option is considered matching if all specified properties match.
- `options` `FrameSelectOptionOptions?` *(optional)*
  - `Force` bool? *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- IReadOnlyList<string>

---

### SetCheckedAsync {/* #frame-set-checked */}



:::warningDiscouraged

Use locator-based [Locator.SetCheckedAsync()](/api/class-locator.mdx#locator-set-checked) instead. Read more about [locators](../locators.mdx).

:::


This method checks or unchecks an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await Frame.SetCheckedAsync(selector, checked, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `checkedState` bool
  
  Whether to check or uncheck the checkbox.
- `options` `FrameSetCheckedOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)*
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### SetInputFilesAsync {/* #frame-set-input-files */}



:::warningDiscouraged

Use locator-based [Locator.SetInputFilesAsync()](/api/class-locator.mdx#locator-set-input-files) instead. Read more about [locators](../locators.mdx).

:::


Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [selector](/api/class-frame.mdx#frame-set-input-files-option-selector) to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

**Usage**

```csharp
await Frame.SetInputFilesAsync(selector, files, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `files` string | IEnumerable<string> | `FilePayload` | IEnumerable<`FilePayload`>
  - `Name` string
    
    File name
  - `MimeType` string
    
    File type
  - `Buffer` byte&#91;&#93;
    
    File content
- `options` `FrameSetInputFilesOptions?` *(optional)*
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### TapAsync {/* #frame-tap */}



:::warningDiscouraged

Use locator-based [Locator.TapAsync()](/api/class-locator.mdx#locator-tap) instead. Read more about [locators](../locators.mdx).

:::


This method taps an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-tap-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Touchscreen](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [Position](/api/class-frame.mdx#frame-tap-option-position).

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

**Usage**

```csharp
await Frame.TapAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameTapOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### TextContentAsync {/* #frame-text-content */}



:::warningDiscouraged

Use locator-based [Locator.TextContentAsync()](/api/class-locator.mdx#locator-text-content) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.textContent`.

**Usage**

```csharp
await Frame.TextContentAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameTextContentOptions?` *(optional)*
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string?

---

### TypeAsync {/* #frame-type */}



:::warningDeprecated

In most cases, you should use [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

:::


Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [Frame.FillAsync()](/api/class-frame.mdx#frame-fill).

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.PressAsync()](/api/class-keyboard.mdx#keyboard-press).

**Usage**

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `text` string
  
  A text to type into a focused element.
- `options` `FrameTypeOptions?` *(optional)*
  - `Delay` float? *(optional)*
    
    Time to wait between key presses in milliseconds. Defaults to 0.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### UncheckAsync {/* #frame-uncheck */}



:::warningDiscouraged

Use locator-based [Locator.UncheckAsync()](/api/class-locator.mdx#locator-uncheck) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-frame.mdx#frame-uncheck-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-frame.mdx#frame-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await Frame.UncheckAsync(selector, options);
```

**Arguments**
- `selector` string
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `FrameUncheckOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### WaitForSelectorAsync {/* #frame-wait-for-selector */}



:::warningDiscouraged

Use web assertions that assert visibility or a locator-based [Locator.WaitForAsync()](/api/class-locator.mdx#locator-wait-for) instead. Read more about [locators](../locators.mdx).

:::


Returns when element specified by selector satisfies [State](/api/class-frame.mdx#frame-wait-for-selector-option-state) option. Returns `null` if waiting for `hidden` or `detached`.

:::note

Playwright automatically waits for element to be ready before performing an action. Using Locator objects and web-first assertions make the code wait-for-selector-free.
:::

Wait for the [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) to satisfy [State](/api/class-frame.mdx#frame-wait-for-selector-option-state) option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the [Timeout](/api/class-frame.mdx#frame-wait-for-selector-option-timeout) milliseconds, the function will throw.

**Usage**

This method works across navigations:

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync();
        var page = await browser.NewPageAsync();

        foreach (var currentUrl in new[] { "https://www.google.com", "https://bbc.com" })
        {
            await page.GotoAsync(currentUrl);
            element = await page.MainFrame.WaitForSelectorAsync("img");
            Console.WriteLine($"Loaded image: {await element.GetAttributeAsync("src")}");
        }
    }
}
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `options` `FrameWaitForSelectorOptions?` *(optional)*
  - `State` `enum WaitForSelectorState { Attached, Detached, Visible, Hidden }?` *(optional)*
    
    Defaults to `'visible'`. Can be either:
    * `'attached'` - wait for element to be present in DOM.
    * `'detached'` - wait for element to not be present in DOM.
    * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
    * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- ElementHandle?

---

### WaitForTimeoutAsync {/* #frame-wait-for-timeout */}



:::warningDiscouraged

Never wait for timeout in production. Tests that wait for time are inherently flaky. Use Locator actions and web assertions that wait automatically.

:::


Waits for the given [timeout](/api/class-frame.mdx#frame-wait-for-timeout-option-timeout) in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**

```csharp
await Frame.WaitForTimeoutAsync(timeout);
```

**Arguments**
- `timeout` float
  
  A timeout to wait for

**Returns**
- void


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
