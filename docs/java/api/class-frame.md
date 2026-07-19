# Frame

> **Source:** [playwright.dev/java/docs/api/class-frame](https://playwright.dev/java/docs/api/class-frame)

---

At every point of time, page exposes its current frame tree via the [Page.mainFrame()](/api/class-page.mdx#page-main-frame) and [Frame.childFrames()](/api/class-frame.mdx#frame-child-frames) methods.

Frame object's lifecycle is controlled by three events, dispatched on the page object:
* [Page.onFrameAttached(handler)](/api/class-page.mdx#page-event-frame-attached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
* [Page.onFrameNavigated(handler)](/api/class-page.mdx#page-event-frame-navigated) - fired when the frame commits navigation to a different URL.
* [Page.onFrameDetached(handler)](/api/class-page.mdx#page-event-frame-detached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType firefox = playwright.firefox();
      Browser browser = firefox.launch();
      Page page = browser.newPage();
      page.navigate("https://www.google.com/chrome/browser/canary.html");
      dumpFrameTree(page.mainFrame(), "");
      browser.close();
    }
  }
  static void dumpFrameTree(Frame frame, String indent) {
    System.out.println(indent + frame.url());
    for (Frame child : frame.childFrames()) {
      dumpFrameTree(child, indent + "  ");
    }
  }
}
```


---

## Methods

### addScriptTag {/* #frame-add-script-tag */}



Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

**Usage**

```java
Frame.addScriptTag();
Frame.addScriptTag(options);
```

**Arguments**
- `options` `Frame.AddScriptTagOptions` *(optional)*
  - `setContent` String *(optional)*
    
    Raw JavaScript content to be injected into frame.
  - `setPath` Path *(optional)*
    
    Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
  - `setType` String *(optional)*
    
    Script type. Use 'module' in order to load a JavaScript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
  - `setUrl` String *(optional)*
    
    URL of a script to be added.

**Returns**
- ElementHandle

---

### addStyleTag {/* #frame-add-style-tag */}



Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

**Usage**

```java
Frame.addStyleTag();
Frame.addStyleTag(options);
```

**Arguments**
- `options` `Frame.AddStyleTagOptions` *(optional)*
  - `setContent` String *(optional)*
    
    Raw CSS content to be injected into frame.
  - `setPath` Path *(optional)*
    
    Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.
  - `setUrl` String *(optional)*
    
    URL of the `<link>` tag.

**Returns**
- ElementHandle

---

### childFrames {/* #frame-child-frames */}



**Usage**

```java
Frame.childFrames();
```

**Returns**
- List<Frame>

---

### content {/* #frame-content */}



Gets the full HTML contents of the frame, including the doctype.

**Usage**

```java
Frame.content();
```

**Returns**
- String

---

### dragAndDrop {/* #frame-drag-and-drop */}



**Usage**

```java
Frame.dragAndDrop(source, target);
Frame.dragAndDrop(source, target, options);
```

**Arguments**
- `source` String
  
  A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.
- `target` String
  
  A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.DragAndDropOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setSourcePosition` SourcePosition *(optional)* 
    - `setX` double
      
      
    - `setY` double
      
      
    Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `setSteps` int *(optional)* 
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTargetPosition` TargetPosition *(optional)* 
    - `setX` double
      
      
    - `setY` double
      
      
    Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### evaluate {/* #frame-evaluate */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

If the function passed to the [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns a Promise, then [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate) would wait for the promise to resolve and return its value.

If the function passed to the [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns a non-Serializable value, then [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate) returns `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

```java
Object result = frame.evaluate("(x, y) => {\n" +
  "  return Promise.resolve(x * y);\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "56"
```

A string can also be passed in instead of a function.

```java
System.out.println(frame.evaluate("1 + 2")); // prints "3"
```

ElementHandle instances can be passed as an argument to the [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate):

```java
ElementHandle bodyHandle = frame.evaluateHandle("document.body");
String html = (String) frame.evaluate("(body, suffix) => body.innerHTML + suffix", Arrays.asList(bodyHandle, "hello"));
bodyHandle.dispose();
```

**Arguments**
- `expression` String
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-option-expression).

**Returns**
- Object

---

### evaluateHandle {/* #frame-evaluate-handle */}



Returns the return value of [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression) as a JSHandle.

The only difference between [Frame.evaluate()](/api/class-frame.mdx#frame-evaluate) and [Frame.evaluateHandle()](/api/class-frame.mdx#frame-evaluate-handle) is that [Frame.evaluateHandle()](/api/class-frame.mdx#frame-evaluate-handle) returns JSHandle.

If the function, passed to the [Frame.evaluateHandle()](/api/class-frame.mdx#frame-evaluate-handle), returns a Promise, then [Frame.evaluateHandle()](/api/class-frame.mdx#frame-evaluate-handle) would wait for the promise to resolve and return its value.

**Usage**

```java
// Handle for the window object.
JSHandle aWindowHandle = frame.evaluateHandle("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function.

```java
JSHandle aHandle = frame.evaluateHandle("document"); // Handle for the "document".
```

JSHandle instances can be passed as an argument to the [Frame.evaluateHandle()](/api/class-frame.mdx#frame-evaluate-handle):

```java
JSHandle aHandle = frame.evaluateHandle("() => document.body");
JSHandle resultHandle = frame.evaluateHandle("(body, suffix) => body.innerHTML + suffix", Arrays.asList(aHandle, "hello"));
System.out.println(resultHandle.jsonValue());
resultHandle.dispose();
```

**Arguments**
- `expression` String
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-evaluate-handle-option-expression).

**Returns**
- JSHandle

---

### frameElement {/* #frame-frame-element */}



Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [ElementHandle.contentFrame()](/api/class-elementhandle.mdx#element-handle-content-frame). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

**Usage**

```java
ElementHandle frameElement = frame.frameElement();
Frame contentFrame = frameElement.contentFrame();
System.out.println(frame == contentFrame);  // -> true
```

**Returns**
- ElementHandle

---

### frameLocator {/* #frame-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe id="my-frame">`:

```java
Locator locator = frame.frameLocator("#my-iframe").getByText("Submit");
locator.click();
```

**Arguments**
- `selector` String
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### getByAltText {/* #frame-get-by-alt-text */}



Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

```java
page.getByAltText("Playwright logo").click();
```

**Arguments**
- `text` String | Pattern
  
  Text to locate the element for.
- `options` `Frame.GetByAltTextOptions` *(optional)*
  - `setExact` boolean *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### getByLabel {/* #frame-get-by-label */}



Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

```java
page.getByLabel("Username").fill("john");
page.getByLabel("Password").fill("secret");
```

**Arguments**
- `text` String | Pattern
  
  Text to locate the element for.
- `options` `Frame.GetByLabelOptions` *(optional)*
  - `setExact` boolean *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### getByPlaceholder {/* #frame-get-by-placeholder */}



Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

```java
page.getByPlaceholder("name@example.com").fill("playwright@microsoft.com");
```

**Arguments**
- `text` String | Pattern
  
  Text to locate the element for.
- `options` `Frame.GetByPlaceholderOptions` *(optional)*
  - `setExact` boolean *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### getByRole {/* #frame-get-by-role */}



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

```java
assertThat(page
    .getByRole(AriaRole.HEADING,
               new Page.GetByRoleOptions().setName("Sign up")))
    .isVisible();

page.getByRole(AriaRole.CHECKBOX,
               new Page.GetByRoleOptions().setName("Subscribe"))
    .check();

page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(
                   Pattern.compile("submit", Pattern.CASE_INSENSITIVE)))
    .click();
```

**Arguments**
- `role` `enum AriaRole { ALERT, ALERTDIALOG, APPLICATION, ARTICLE, BANNER, BLOCKQUOTE, BUTTON, CAPTION, CELL, CHECKBOX, CODE, COLUMNHEADER, COMBOBOX, COMPLEMENTARY, CONTENTINFO, DEFINITION, DELETION, DIALOG, DIRECTORY, DOCUMENT, EMPHASIS, FEED, FIGURE, FORM, GENERIC, GRID, GRIDCELL, GROUP, HEADING, IMG, INSERTION, LINK, LIST, LISTBOX, LISTITEM, LOG, MAIN, MARQUEE, MATH, METER, MENU, MENUBAR, MENUITEM, MENUITEMCHECKBOX, MENUITEMRADIO, NAVIGATION, NONE, NOTE, OPTION, PARAGRAPH, PRESENTATION, PROGRESSBAR, RADIO, RADIOGROUP, REGION, ROW, ROWGROUP, ROWHEADER, SCROLLBAR, SEARCH, SEARCHBOX, SEPARATOR, SLIDER, SPINBUTTON, STATUS, STRONG, SUBSCRIPT, SUPERSCRIPT, SWITCH, TAB, TABLE, TABLIST, TABPANEL, TERM, TEXTBOX, TIME, TIMER, TOOLBAR, TOOLTIP, TREE, TREEGRID, TREEITEM }`
  
  Required aria role.
- `options` `Frame.GetByRoleOptions` *(optional)*
  - `setChecked` boolean *(optional)*
    
    An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
    
    Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
  - `setDescription` String | Pattern *(optional)* 
    
    Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [setExact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
  - `setDisabled` boolean *(optional)*
    
    An attribute that is usually set by `aria-disabled` or `disabled`.
    
    :::note
    
    Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
    :::
    
  - `setExact` boolean *(optional)* 
    
    Whether [setName](/api/class-frame.mdx#frame-get-by-role-option-name) and [setDescription](/api/class-frame.mdx#frame-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
  - `setExpanded` boolean *(optional)*
    
    An attribute that is usually set by `aria-expanded`.
    
    Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
  - `setIncludeHidden` boolean *(optional)*
    
    Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
    
    Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
  - `setLevel` int *(optional)*
    
    A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.
    
    Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
  - `setName` String | Pattern *(optional)*
    
    Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [setExact](/api/class-frame.mdx#frame-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
  - `setPressed` boolean *(optional)*
    
    An attribute that is usually set by `aria-pressed`.
    
    Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
  - `setSelected` boolean *(optional)*
    
    An attribute that is usually set by `aria-selected`.
    
    Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

**Returns**
- Locator

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

---

### getByTestId {/* #frame-get-by-test-id */}



Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

```java
page.getByTestId("directions").click();
```

**Arguments**
- `testId` String | Pattern
  
  Id to locate the element by.

**Returns**
- Locator

**Details**

By default, the `data-testid` attribute is used as a test id. Use [Selectors.setTestIdAttribute()](/api/class-selectors.mdx#selectors-set-test-id-attribute) to configure a different test id attribute if necessary.

---

### getByText {/* #frame-get-by-text */}



Allows locating elements that contain given text.

See also [Locator.filter()](/api/class-locator.mdx#locator-filter) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

```java
// Matches <span>
page.getByText("world");

// Matches first <div>
page.getByText("Hello world");

// Matches second <div>
page.getByText("Hello", new Page.GetByTextOptions().setExact(true));

// Matches both <div>s
page.getByText(Pattern.compile("Hello"));

// Matches second <div>
page.getByText(Pattern.compile("^hello$", Pattern.CASE_INSENSITIVE));
```

**Arguments**
- `text` String | Pattern
  
  Text to locate the element for.
- `options` `Frame.GetByTextOptions` *(optional)*
  - `setExact` boolean *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

---

### getByTitle {/* #frame-get-by-title */}



Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

```java
assertThat(page.getByTitle("Issues count")).hasText("25 issues");
```

**Arguments**
- `text` String | Pattern
  
  Text to locate the element for.
- `options` `Frame.GetByTitleOptions` *(optional)*
  - `setExact` boolean *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### isDetached {/* #frame-is-detached */}



Returns `true` if the frame has been detached, or `false` otherwise.

**Usage**

```java
Frame.isDetached();
```

**Returns**
- boolean

---

### isEnabled {/* #frame-is-enabled */}



Returns whether the element is [enabled](../actionability.mdx#enabled).

**Usage**

```java
Frame.isEnabled(selector);
Frame.isEnabled(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsEnabledOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- boolean

---

### locator {/* #frame-locator */}



The method returns an element locator that can be used to perform actions on this page / frame. Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

[Learn more about locators](../locators.mdx).

[Learn more about locators](../locators.mdx).

**Usage**

```java
Frame.locator(selector);
Frame.locator(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to use when resolving DOM element.
- `options` `Frame.LocatorOptions` *(optional)*
  - `setHas` Locator *(optional)*
    
    Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
    
    Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `setHasNot` Locator *(optional)* 
    
    Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `setHasNotText` String | Pattern *(optional)* 
    
    Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
  - `setHasText` String | Pattern *(optional)*
    
    Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

**Returns**
- Locator

---

### name {/* #frame-name */}



Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

:::note

This value is calculated once when the frame is created, and will not update if the attribute is changed later.
:::

**Usage**

```java
Frame.name();
```

**Returns**
- String

---

### navigate {/* #frame-goto */}



Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

The method will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the [setTimeout](/api/class-frame.mdx#frame-goto-option-timeout) is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [Response.status()](/api/class-response.mdx#response-status).

:::note

The method either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
:::

:::note
Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
:::

**Usage**

```java
Frame.navigate(url);
Frame.navigate(url, options);
```

**Arguments**
- `url` String
  
  URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `options` `Frame.NavigateOptions` *(optional)*
  - `setReferer` String *(optional)*
    
    Referer header value. If provided it will take preference over the referer header value set by [Page.setExtraHTTPHeaders()](/api/class-page.mdx#page-set-extra-http-headers).
  - `setTimeout` double *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setWaitUntil` `enum WaitUntilState { LOAD, DOMCONTENTLOADED, NETWORKIDLE, COMMIT }` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- null | Response

---

### page {/* #frame-page */}



Returns the page containing this frame.

**Usage**

```java
Frame.page();
```

**Returns**
- Page

---

### parentFrame {/* #frame-parent-frame */}



Parent frame, if any. Detached frames and main frames return `null`.

**Usage**

```java
Frame.parentFrame();
```

**Returns**
- null | Frame

---

### setContent {/* #frame-set-content */}



This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write), inheriting all its specific characteristics and behaviors.

**Usage**

```java
Frame.setContent(html);
Frame.setContent(html, options);
```

**Arguments**
- `html` String
  
  HTML markup to assign to the page.
- `options` `Frame.SetContentOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setWaitUntil` `enum WaitUntilState { LOAD, DOMCONTENTLOADED, NETWORKIDLE, COMMIT }` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- void

---

### title {/* #frame-title */}



Returns the page title.

**Usage**

```java
Frame.title();
```

**Returns**
- String

---

### url {/* #frame-url */}



Returns frame's url.

**Usage**

```java
Frame.url();
```

**Returns**
- String

---

### waitForFunction {/* #frame-wait-for-function */}



Returns when the [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) returns a truthy value, returns that value.

**Usage**

The [Frame.waitForFunction()](/api/class-frame.mdx#frame-wait-for-function) can be used to observe viewport size change:

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType firefox = playwright.firefox();
      Browser browser = firefox.launch();
      Page page = browser.newPage();
      page.setViewportSize(50, 50);
      page.mainFrame().waitForFunction("window.innerWidth < 100");
      browser.close();
    }
  }
}
```

To pass an argument to the predicate of `frame.waitForFunction` function:

```java
String selector = ".foo";
frame.waitForFunction("selector => !!document.querySelector(selector)", selector);
```

**Arguments**
- `expression` String
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression).
- `options` `Frame.WaitForFunctionOptions` *(optional)*
  - `setPollingInterval` double *(optional)*
    
    If specified, then it is treated as an interval in milliseconds at which the function would be executed. By default if the option is not specified [expression](/api/class-frame.mdx#frame-wait-for-function-option-expression) is executed in `requestAnimationFrame` callback.
  - `setTimeout` double *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- JSHandle

---

### waitForLoadState {/* #frame-wait-for-load-state */}



Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

:::note

Most of the time, this method is not needed because Playwright [auto-waits before every action](../actionability.mdx).
:::

**Usage**

```java
frame.click("button"); // Click triggers navigation.
frame.waitForLoadState(); // Waits for "load" state by default.
```

**Arguments**
- `state` `enum LoadState { LOAD, DOMCONTENTLOADED, NETWORKIDLE }` *(optional)*
  
  Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
- `options` `Frame.WaitForLoadStateOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### waitForURL {/* #frame-wait-for-url */}



Waits for the frame to navigate to the given URL.

**Usage**

```java
frame.click("a.delayed-navigation"); // Clicking the link will indirectly cause a navigation
frame.waitForURL("**/target.html");
```

**Arguments**
- `url` String | Pattern | Predicate<String>
  
  A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
- `options` `Frame.WaitForURLOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setWaitUntil` `enum WaitUntilState { LOAD, DOMCONTENTLOADED, NETWORKIDLE, COMMIT }` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.

**Returns**
- void

---

## Deprecated

### check {/* #frame-check */}



:::warningDiscouraged

Use locator-based [Locator.check()](/api/class-locator.mdx#locator-check) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-check-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-check-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-check-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```java
Frame.check(selector);
Frame.check(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.CheckOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)* 
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### click {/* #frame-click */}



:::warningDiscouraged

Use locator-based [Locator.click()](/api/class-locator.mdx#locator-click) instead. Read more about [locators](../locators.mdx).

:::


This method clicks an element matching [selector](/api/class-frame.mdx#frame-click-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-click-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-click-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [setPosition](/api/class-frame.mdx#frame-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [setNoWaitAfter](/api/class-frame.mdx#frame-click-option-no-wait-after) option is set.

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```java
Frame.click(selector);
Frame.click(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.ClickOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setClickCount` int *(optional)*
    
    defaults to 1. See UIEvent.detail.
  - `setDelay` double *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setModifiers` List<`enum KeyboardModifier { ALT, CONTROL, CONTROLORMETA, META, SHIFT }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `setPosition` Position *(optional)*
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### dblclick {/* #frame-dblclick */}



:::warningDiscouraged

Use locator-based [Locator.dblclick()](/api/class-locator.mdx#locator-dblclick) instead. Read more about [locators](../locators.mdx).

:::


This method double clicks an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-dblclick-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-dblclick-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [setPosition](/api/class-frame.mdx#frame-dblclick-option-position). if the first click of the `dblclick()` triggers a navigation event, this method will throw.

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

**Usage**

```java
Frame.dblclick(selector);
Frame.dblclick(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.DblclickOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setDelay` double *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setModifiers` List<`enum KeyboardModifier { ALT, CONTROL, CONTROLORMETA, META, SHIFT }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)*
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### dispatchEvent {/* #frame-dispatch-event */}



:::warningDiscouraged

Use locator-based [Locator.dispatchEvent()](/api/class-locator.mdx#locator-dispatch-event) instead. Read more about [locators](../locators.mdx).

:::


The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```java
frame.dispatchEvent("button#submit", "click");
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

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = frame.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
frame.dispatchEvent("#source", "dragstart", arg);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `type` String
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` EvaluationArgument *(optional)*
  
  Optional event-specific initialization properties.
- `options` `Frame.DispatchEventOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### evalOnSelector {/* #frame-eval-on-selector */}



:::warningDiscouraged

This method does not wait for the element to pass the actionability checks and therefore can lead to the flaky tests. Use [Locator.evaluate()](/api/class-locator.mdx#locator-evaluate), other Locator helper methods or web-first assertions instead.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).

The method finds an element matching the specified selector within the frame and passes it as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression). If no elements match the selector, the method throws an error.

If [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression) returns a Promise, then [Frame.evalOnSelector()](/api/class-frame.mdx#frame-eval-on-selector) would wait for the promise to resolve and return its value.

**Usage**

```java
String searchValue = (String) frame.evalOnSelector("#search", "el => el.value");
String preloadHref = (String) frame.evalOnSelector("linkrel=preload", "el => el.href");
String html = (String) frame.evalOnSelector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

**Arguments**
- `selector` String
  
  A selector to query for.
- `expression` String
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-option-expression).
- `options` `Frame.EvalOnSelectorOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- Object

---

### evalOnSelectorAll {/* #frame-eval-on-selector-all */}



:::warningDiscouraged

In most cases, [Locator.evaluateAll()](/api/class-locator.mdx#locator-evaluate-all), other Locator helper methods and web-first assertions do a better job.

:::


Returns the return value of [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

If [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression) returns a Promise, then [Frame.evalOnSelectorAll()](/api/class-frame.mdx#frame-eval-on-selector-all) would wait for the promise to resolve and return its value.

**Usage**

```java
boolean divsCounts = (boolean) page.evalOnSelectorAll("div", "(divs, min) => divs.length >= min", 10);
```

**Arguments**
- `selector` String
  
  A selector to query for.
- `expression` String
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-frame.mdx#frame-eval-on-selector-all-option-expression).

**Returns**
- Object

---

### fill {/* #frame-fill */}



:::warningDiscouraged

Use locator-based [Locator.fill()](/api/class-locator.mdx#locator-fill) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-fill-option-selector), waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [Locator.pressSequentially()](/api/class-locator.mdx#locator-press-sequentially).

**Usage**

```java
Frame.fill(selector, value);
Frame.fill(selector, value, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `value` String
  
  Value to fill for the `<input>`, `<textarea>` or `contenteditable` element.
- `options` `Frame.FillOptions` *(optional)*
  - `setForce` boolean *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### focus {/* #frame-focus */}



:::warningDiscouraged

Use locator-based [Locator.focus()](/api/class-locator.mdx#locator-focus) instead. Read more about [locators](../locators.mdx).

:::


This method fetches an element with [selector](/api/class-frame.mdx#frame-focus-option-selector) and focuses it. If there's no element matching [selector](/api/class-frame.mdx#frame-focus-option-selector), the method waits until a matching element appears in the DOM.

**Usage**

```java
Frame.focus(selector);
Frame.focus(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.FocusOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### getAttribute {/* #frame-get-attribute */}



:::warningDiscouraged

Use locator-based [Locator.getAttribute()](/api/class-locator.mdx#locator-get-attribute) instead. Read more about [locators](../locators.mdx).

:::


Returns element attribute value.

**Usage**

```java
Frame.getAttribute(selector, name);
Frame.getAttribute(selector, name, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `name` String
  
  Attribute name to get the value for.
- `options` `Frame.GetAttributeOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- null | String

---

### hover {/* #frame-hover */}



:::warningDiscouraged

Use locator-based [Locator.hover()](/api/class-locator.mdx#locator-hover) instead. Read more about [locators](../locators.mdx).

:::


This method hovers over an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-hover-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-hover-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [setPosition](/api/class-frame.mdx#frame-hover-option-position).

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```java
Frame.hover(selector);
Frame.hover(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.HoverOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setModifiers` List<`enum KeyboardModifier { ALT, CONTROL, CONTROLORMETA, META, SHIFT }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `setNoWaitAfter` boolean *(optional)* 
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)*
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### innerHTML {/* #frame-inner-html */}



:::warningDiscouraged

Use locator-based [Locator.innerHTML()](/api/class-locator.mdx#locator-inner-html) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerHTML`.

**Usage**

```java
Frame.innerHTML(selector);
Frame.innerHTML(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.InnerHTMLOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- String

---

### innerText {/* #frame-inner-text */}



:::warningDiscouraged

Use locator-based [Locator.innerText()](/api/class-locator.mdx#locator-inner-text) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.innerText`.

**Usage**

```java
Frame.innerText(selector);
Frame.innerText(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.InnerTextOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- String

---

### inputValue {/* #frame-input-value */}



:::warningDiscouraged

Use locator-based [Locator.inputValue()](/api/class-locator.mdx#locator-input-value) instead. Read more about [locators](../locators.mdx).

:::


Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

**Usage**

```java
Frame.inputValue(selector);
Frame.inputValue(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.InputValueOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- String

---

### isChecked {/* #frame-is-checked */}



:::warningDiscouraged

Use locator-based [Locator.isChecked()](/api/class-locator.mdx#locator-is-checked) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

**Usage**

```java
Frame.isChecked(selector);
Frame.isChecked(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsCheckedOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- boolean

---

### isDisabled {/* #frame-is-disabled */}



:::warningDiscouraged

Use locator-based [Locator.isDisabled()](/api/class-locator.mdx#locator-is-disabled) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

**Usage**

```java
Frame.isDisabled(selector);
Frame.isDisabled(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsDisabledOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- boolean

---

### isEditable {/* #frame-is-editable */}



:::warningDiscouraged

Use locator-based [Locator.isEditable()](/api/class-locator.mdx#locator-is-editable) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [editable](../actionability.mdx#editable).

**Usage**

```java
Frame.isEditable(selector);
Frame.isEditable(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsEditableOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- boolean

---

### isHidden {/* #frame-is-hidden */}



:::warningDiscouraged

Use locator-based [Locator.isHidden()](/api/class-locator.mdx#locator-is-hidden) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).  [selector](/api/class-frame.mdx#frame-is-hidden-option-selector) that does not match any elements is considered hidden.

**Usage**

```java
Frame.isHidden(selector);
Frame.isHidden(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsHiddenOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Frame.isHidden()](/api/class-frame.mdx#frame-is-hidden) does not wait for the element to become hidden and returns immediately.
    :::
    

**Returns**
- boolean

---

### isVisible {/* #frame-is-visible */}



:::warningDiscouraged

Use locator-based [Locator.isVisible()](/api/class-locator.mdx#locator-is-visible) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [visible](../actionability.mdx#visible). [selector](/api/class-frame.mdx#frame-is-visible-option-selector) that does not match any elements is considered not visible.

**Usage**

```java
Frame.isVisible(selector);
Frame.isVisible(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.IsVisibleOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Frame.isVisible()](/api/class-frame.mdx#frame-is-visible) does not wait for the element to become visible and returns immediately.
    :::
    

**Returns**
- boolean

---

### press {/* #frame-press */}



:::warningDiscouraged

Use locator-based [Locator.press()](/api/class-locator.mdx#locator-press) instead. Read more about [locators](../locators.mdx).

:::


[key](/api/class-frame.mdx#frame-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-frame.mdx#frame-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-frame.mdx#frame-press-option-key) in the upper case.

If [key](/api/class-frame.mdx#frame-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```java
Frame.press(selector, key);
Frame.press(selector, key, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `key` String
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` `Frame.PressOptions` *(optional)*
  - `setDelay` double *(optional)*
    
    Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### querySelector {/* #frame-query-selector */}



:::warningDiscouraged

Use locator-based [Frame.locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandle pointing to the frame element.

:::caution

The use of ElementHandle is discouraged, use Locator objects and web-first assertions instead.
:::

The method finds an element matching the specified selector within the frame. If no elements match the selector, returns `null`.

**Usage**

```java
Frame.querySelector(selector);
Frame.querySelector(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to query for.
- `options` `Frame.QuerySelectorOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

**Returns**
- null | ElementHandle

---

### querySelectorAll {/* #frame-query-selector-all */}



:::warningDiscouraged

Use locator-based [Frame.locator()](/api/class-frame.mdx#frame-locator) instead. Read more about [locators](../locators.mdx).

:::


Returns the ElementHandles pointing to the frame elements.

:::caution

The use of ElementHandle is discouraged, use Locator objects instead.
:::

The method finds all elements matching the specified selector within the frame. If no elements match the selector, returns empty array.

**Usage**

```java
Frame.querySelectorAll(selector);
```

**Arguments**
- `selector` String
  
  A selector to query for.

**Returns**
- List<ElementHandle>

---

### selectOption {/* #frame-select-option */}



:::warningDiscouraged

Use locator-based [Locator.selectOption()](/api/class-locator.mdx#locator-select-option) instead. Read more about [locators](../locators.mdx).

:::


This method waits for an element matching [selector](/api/class-frame.mdx#frame-select-option-option-selector), waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```java
// Single selection matching the value or label
frame.selectOption("select#colors", "blue");
// single selection matching both the value and the label
frame.selectOption("select#colors", new SelectOption().setLabel("Blue"));
// multiple selection
frame.selectOption("select#colors", new String[] {"red", "green", "blue"});
```

**Arguments**
- `selector` String
  
  A selector to query for.
- `values` null | String | ElementHandle | String&#91;&#93; | `SelectOption` | ElementHandle&#91;&#93; | `SelectOption`&#91;&#93;
  - `setValue` String *(optional)*
    
    Matches by `option.value`. Optional.
  - `setLabel` String *(optional)*
    
    Matches by `option.label`. Optional.
  - `setIndex` int *(optional)*
    
    Matches by the index. Optional.
  
  Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are matching both values and labels. Option is considered matching if all specified properties match.
- `options` `Frame.SelectOptionOptions` *(optional)*
  - `setForce` boolean *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- List<String>

---

### setChecked {/* #frame-set-checked */}



:::warningDiscouraged

Use locator-based [Locator.setChecked()](/api/class-locator.mdx#locator-set-checked) instead. Read more about [locators](../locators.mdx).

:::


This method checks or unchecks an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-set-checked-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```java
Frame.setChecked(selector, checked);
Frame.setChecked(selector, checked, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `checked` boolean
  
  Whether to check or uncheck the checkbox.
- `options` `Frame.SetCheckedOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)*
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)*
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### setInputFiles {/* #frame-set-input-files */}



:::warningDiscouraged

Use locator-based [Locator.setInputFiles()](/api/class-locator.mdx#locator-set-input-files) instead. Read more about [locators](../locators.mdx).

:::


Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [selector](/api/class-frame.mdx#frame-set-input-files-option-selector) to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

**Usage**

```java
Frame.setInputFiles(selector, files);
Frame.setInputFiles(selector, files, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `files` Path | Path&#91;&#93; | `FilePayload` | `FilePayload`&#91;&#93;
  - `setName` String
    
    File name
  - `setMimeType` String
    
    File type
  - `setBuffer` byte&#91;&#93;
    
    File content
- `options` `Frame.SetInputFilesOptions` *(optional)*
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### tap {/* #frame-tap */}



:::warningDiscouraged

Use locator-based [Locator.tap()](/api/class-locator.mdx#locator-tap) instead. Read more about [locators](../locators.mdx).

:::


This method taps an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-tap-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-tap-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.touchscreen()](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [setPosition](/api/class-frame.mdx#frame-tap-option-position).

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

**Usage**

```java
Frame.tap(selector);
Frame.tap(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.TapOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setModifiers` List<`enum KeyboardModifier { ALT, CONTROL, CONTROLORMETA, META, SHIFT }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)*
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

---

### textContent {/* #frame-text-content */}



:::warningDiscouraged

Use locator-based [Locator.textContent()](/api/class-locator.mdx#locator-text-content) instead. Read more about [locators](../locators.mdx).

:::


Returns `element.textContent`.

**Usage**

```java
Frame.textContent(selector);
Frame.textContent(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.TextContentOptions` *(optional)*
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- null | String

---

### type {/* #frame-type */}



:::warningDeprecated

In most cases, you should use [Locator.fill()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [Locator.pressSequentially()](/api/class-locator.mdx#locator-press-sequentially).

:::


Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [Frame.fill()](/api/class-frame.mdx#frame-fill).

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](/api/class-keyboard.mdx#keyboard-press).

**Usage**

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `text` String
  
  A text to type into a focused element.
- `options` `Frame.TypeOptions` *(optional)*
  - `setDelay` double *(optional)*
    
    Time to wait between key presses in milliseconds. Defaults to 0.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### uncheck {/* #frame-uncheck */}



:::warningDiscouraged

Use locator-based [Locator.uncheck()](/api/class-locator.mdx#locator-uncheck) instead. Read more about [locators](../locators.mdx).

:::


This method checks an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector) by performing the following steps:
1. Find an element matching [selector](/api/class-frame.mdx#frame-uncheck-option-selector). If there is none, wait until a matching element is attached to the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [setForce](/api/class-frame.mdx#frame-uncheck-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.mouse()](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [setTimeout](/api/class-frame.mdx#frame-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```java
Frame.uncheck(selector);
Frame.uncheck(selector, options);
```

**Arguments**
- `selector` String
  
  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.
- `options` `Frame.UncheckOptions` *(optional)*
  - `setForce` boolean *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `setNoWaitAfter` boolean *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `setPosition` Position *(optional)* 
    - `setX` double
      
      
    - `setY` double
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `setScroll` `enum ScrollMode { AUTO, NONE }` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setTrial` boolean *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### waitForNavigation {/* #frame-wait-for-navigation */}



:::warningDeprecated

This method is inherently racy, please use [Frame.waitForURL()](/api/class-frame.mdx#frame-wait-for-url) instead.

:::


Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:

```java
// The method returns after navigation has finished
frame.waitForNavigation(() -> {
  // Clicking the link will indirectly cause a navigation
  frame.click("a.delayed-navigation");
});
```

:::note
Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.
:::

**Arguments**
- `options` `Frame.WaitForNavigationOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout), [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout), [Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `setUrl` String | Pattern | Predicate<String> *(optional)*
    
    A glob pattern, regex pattern, or predicate receiving URL to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.
  - `setWaitUntil` `enum WaitUntilState { LOAD, DOMCONTENTLOADED, NETWORKIDLE, COMMIT }` *(optional)*
    
    When to consider operation succeeded, defaults to `load`. Events can be either:
    * `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
    * `'load'` - consider operation to be finished when the `load` event is fired.
    * `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    * `'commit'` - consider operation to be finished when network response is received and the document started loading.
- `callback` Runnable 
  
  Callback that performs the action triggering the event.

**Returns**
- null | Response

---

### waitForSelector {/* #frame-wait-for-selector */}



:::warningDiscouraged

Use web assertions that assert visibility or a locator-based [Locator.waitFor()](/api/class-locator.mdx#locator-wait-for) instead. Read more about [locators](../locators.mdx).

:::


Returns when element specified by selector satisfies [setState](/api/class-frame.mdx#frame-wait-for-selector-option-state) option. Returns `null` if waiting for `hidden` or `detached`.

:::note

Playwright automatically waits for element to be ready before performing an action. Using Locator objects and web-first assertions make the code wait-for-selector-free.
:::

Wait for the [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) to satisfy [setState](/api/class-frame.mdx#frame-wait-for-selector-option-state) option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [selector](/api/class-frame.mdx#frame-wait-for-selector-option-selector) already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the [setTimeout](/api/class-frame.mdx#frame-wait-for-selector-option-timeout) milliseconds, the function will throw.

**Usage**

This method works across navigations:

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      for (String currentURL : Arrays.asList("https://google.com", "https://bbc.com")) {
        page.navigate(currentURL);
        ElementHandle element = page.mainFrame().waitForSelector("img");
        System.out.println("Loaded image: " + element.getAttribute("src"));
      }
      browser.close();
    }
  }
}
```

**Arguments**
- `selector` String
  
  A selector to query for.
- `options` `Frame.WaitForSelectorOptions` *(optional)*
  - `setState` `enum WaitForSelectorState { ATTACHED, DETACHED, VISIBLE, HIDDEN }` *(optional)*
    
    Defaults to `'visible'`. Can be either:
    * `'attached'` - wait for element to be present in DOM.
    * `'detached'` - wait for element to not be present in DOM.
    * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
    * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
  - `setStrict` boolean *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- null | ElementHandle

---

### waitForTimeout {/* #frame-wait-for-timeout */}



:::warningDiscouraged

Never wait for timeout in production. Tests that wait for time are inherently flaky. Use Locator actions and web assertions that wait automatically.

:::


Waits for the given [timeout](/api/class-frame.mdx#frame-wait-for-timeout-option-timeout) in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**

```java
Frame.waitForTimeout(timeout);
```

**Arguments**
- `timeout` double
  
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
