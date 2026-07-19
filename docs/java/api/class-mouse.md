# Mouse

> **Source:** [playwright.dev/java/docs/api/class-mouse](https://playwright.dev/java/docs/api/class-mouse)

---

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

:::tip

If you want to debug where the mouse moved, you can use the [Trace viewer](../trace-viewer-intro.mdx) or [Playwright Inspector](../running-tests.mdx). A red dot showing the location of the mouse will be shown for every mouse action.
:::

Every `page` object has its own Mouse, accessible with [Page.mouse()](/api/class-page.mdx#page-mouse).

```java
// Using ‘page.mouse’ to trace a 100x100 square.
page.mouse().move(0, 0);
page.mouse().down();
page.mouse().move(0, 100);
page.mouse().move(100, 100);
page.mouse().move(100, 0);
page.mouse().move(0, 0);
page.mouse().up();
```


---

## Methods

### click {/* #mouse-click */}



Shortcut for [Mouse.move()](/api/class-mouse.mdx#mouse-move), [Mouse.down()](/api/class-mouse.mdx#mouse-down), [Mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```java
Mouse.click(x, y);
Mouse.click(x, y, options);
```

**Arguments**
- `x` double
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` double
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` `Mouse.ClickOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setClickCount` int *(optional)*
    
    defaults to 1. See UIEvent.detail.
  - `setDelay` double *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- void

---

### dblclick {/* #mouse-dblclick */}



Shortcut for [Mouse.move()](/api/class-mouse.mdx#mouse-move), [Mouse.down()](/api/class-mouse.mdx#mouse-down), [Mouse.up()](/api/class-mouse.mdx#mouse-up), [Mouse.down()](/api/class-mouse.mdx#mouse-down) and [Mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```java
Mouse.dblclick(x, y);
Mouse.dblclick(x, y, options);
```

**Arguments**
- `x` double
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` double
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` `Mouse.DblclickOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setDelay` double *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- void

---

### down {/* #mouse-down */}



Dispatches a `mousedown` event.

**Usage**

```java
Mouse.down();
Mouse.down(options);
```

**Arguments**
- `options` `Mouse.DownOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setClickCount` int *(optional)*
    
    defaults to 1. See UIEvent.detail.

**Returns**
- void

---

### move {/* #mouse-move */}



Dispatches a `mousemove` event.

**Usage**

```java
Mouse.move(x, y);
Mouse.move(x, y, options);
```

**Arguments**
- `x` double
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` double
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` `Mouse.MoveOptions` *(optional)*
  - `setSteps` int *(optional)*
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.

**Returns**
- void

---

### up {/* #mouse-up */}



Dispatches a `mouseup` event.

**Usage**

```java
Mouse.up();
Mouse.up(options);
```

**Arguments**
- `options` `Mouse.UpOptions` *(optional)*
  - `setButton` `enum MouseButton { LEFT, RIGHT, MIDDLE }` *(optional)*
    
    Defaults to `left`.
  - `setClickCount` int *(optional)*
    
    defaults to 1. See UIEvent.detail.

**Returns**
- void

---

### wheel {/* #mouse-wheel */}



Dispatches a `wheel` event. This method is usually used to manually scroll the page. See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

:::note

Wheel events may cause scrolling if they are not handled, and this method does not wait for the scrolling to finish before returning.
:::

**Usage**

```java
Mouse.wheel(deltaX, deltaY);
```

**Arguments**
- `deltaX` double
  
  Pixels to scroll horizontally.
- `deltaY` double
  
  Pixels to scroll vertically.

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
