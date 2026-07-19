# Screencast

> **Source:** [playwright.dev/java/docs/api/class-screencast](https://playwright.dev/java/docs/api/class-screencast)

---

Interface for capturing screencast frames from a page.


---

## Methods

### hideActions {/* #screencast-hide-actions */}



Removes action decorations.

**Usage**

```java
Screencast.hideActions();
```

**Returns**
- void

---

### hideOverlays {/* #screencast-hide-overlays */}



Hides overlays without removing them.

**Usage**

```java
Screencast.hideOverlays();
```

**Returns**
- void

---

### showActions {/* #screencast-show-actions */}



Enables visual annotations on interacted elements. Returns a disposable that stops showing actions when disposed.

**Usage**

```java
Screencast.showActions();
Screencast.showActions(options);
```

**Arguments**
- `options` `Screencast.ShowActionsOptions` *(optional)*
  - `setCursor` `enum ScreencastCursor { NONE, POINTER }` *(optional)* 
    
    Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
  - `setDuration` double *(optional)*
    
    How long each annotation is displayed in milliseconds. Defaults to `500`.
  - `setFontSize` int *(optional)*
    
    Font size of the action title in pixels. Defaults to `24`.
  - `setPosition` `enum AnnotatePosition { TOP_LEFT, TOP, TOP_RIGHT, BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT }` *(optional)*
    
    Position of the action title overlay. Defaults to `"top-right"`.

**Returns**
- Disposable

---

### showChapter {/* #screencast-show-chapter */}



Shows a chapter overlay with a title and optional description, centered on the page with a blurred backdrop. Useful for narrating video recordings. The overlay is removed after the specified duration, or 2000ms.

**Usage**

```java
Screencast.showChapter(title);
Screencast.showChapter(title, options);
```

**Arguments**
- `title` String
  
  Title text displayed prominently in the overlay.
- `options` `Screencast.ShowChapterOptions` *(optional)*
  - `setDescription` String *(optional)*
    
    Optional description text displayed below the title.
  - `setDuration` double *(optional)*
    
    Duration in milliseconds after which the overlay is automatically removed. Defaults to `2000`.

**Returns**
- void

---

### showOverlay {/* #screencast-show-overlay */}



Adds an overlay with the given HTML content. The overlay is displayed on top of the page until removed. Returns a disposable that removes the overlay when disposed.

**Usage**

```java
Screencast.showOverlay(html);
Screencast.showOverlay(html, options);
```

**Arguments**
- `html` String
  
  HTML content for the overlay.
- `options` `Screencast.ShowOverlayOptions` *(optional)*
  - `setDuration` double *(optional)*
    
    Duration in milliseconds after which the overlay is automatically removed. Overlay stays until dismissed if not provided.

**Returns**
- Disposable

---

### showOverlays {/* #screencast-show-overlays */}



Shows overlays.

**Usage**

```java
Screencast.showOverlays();
```

**Returns**
- void

---

### start {/* #screencast-start */}



Starts the screencast. When [setPath](/api/class-screencast.mdx#screencast-start-option-path) is provided, it saves video recording to the specified file. When [setOnFrame](/api/class-screencast.mdx#screencast-start-option-on-frame) is provided, delivers JPEG-encoded frames to the callback. Both can be used together.

**Usage**

**Arguments**
- `options` `Screencast.StartOptions` *(optional)*
  - `setOnFrame` Consumer<ScreencastFrame> *(optional)*
    - `setData` byte&#91;&#93;
      
      JPEG-encoded frame data.
    - `setTimestamp` double
      
      The timestamp of when the frame was presented by the browser, in milliseconds since the Unix epoch.
    - `setViewportWidth` int
      
      Width of the page viewport at the time the frame was captured.
    - `setViewportHeight` int
      
      Height of the page viewport at the time the frame was captured.
    
    Callback that receives JPEG-encoded frame data along with the page viewport size at the time of capture.
  - `setPath` Path *(optional)*
    
    Path where the video should be saved when the screencast is stopped. When provided, video recording is started.
  - `setQuality` int *(optional)*
    
    The quality of the image, between 0-100.
  - `setSize` Size *(optional)*
    - `setWidth` int
      
      Max frame width in pixels.
    - `setHeight` int
      
      Max frame height in pixels.
    
    Specifies the dimensions of screencast frames. The actual frame is scaled to preserve the page's aspect ratio and may be smaller than these bounds. If a screencast is already active (e.g. started by tracing or video recording), the existing configuration takes precedence and the frame size may exceed these bounds or this option may be ignored. If not specified the size will be equal to page viewport scaled down to fit into 800×800.

**Returns**
- Disposable

---

### stop {/* #screencast-stop */}



Stops the screencast and video recording if active. If a video was being recorded, saves it to the path specified in [Screencast.start()](/api/class-screencast.mdx#screencast-start).

**Usage**

```java
Screencast.stop();
```

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
