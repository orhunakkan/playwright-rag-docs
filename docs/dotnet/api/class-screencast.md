# Screencast

> **Source:** [playwright.dev/dotnet/docs/api/class-screencast](https://playwright.dev/dotnet/docs/api/class-screencast)

---

Interface for capturing screencast frames from a page.


---

## Methods

### HideActionsAsync {/* #screencast-hide-actions */}



Removes action decorations.

**Usage**

```csharp
await Screencast.HideActionsAsync();
```

**Returns**
- void

---

### HideOverlaysAsync {/* #screencast-hide-overlays */}



Hides overlays without removing them.

**Usage**

```csharp
await Screencast.HideOverlaysAsync();
```

**Returns**
- void

---

### ShowActionsAsync {/* #screencast-show-actions */}



Enables visual annotations on interacted elements. Returns a disposable that stops showing actions when disposed.

**Usage**

```csharp
await Screencast.ShowActionsAsync(options);
```

**Arguments**
- `options` `ScreencastShowActionsOptions?` *(optional)*
  - `Cursor` `enum ScreencastCursor { None, Pointer }?` *(optional)* 
    
    Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
  - `Duration` float? *(optional)*
    
    How long each annotation is displayed in milliseconds. Defaults to `500`.
  - `FontSize` int? *(optional)*
    
    Font size of the action title in pixels. Defaults to `24`.
  - `Position` `enum AnnotatePosition { TopLeft, Top, TopRight, BottomLeft, Bottom, BottomRight }?` *(optional)*
    
    Position of the action title overlay. Defaults to `"top-right"`.

**Returns**
- Disposable

---

### ShowChapterAsync {/* #screencast-show-chapter */}



Shows a chapter overlay with a title and optional description, centered on the page with a blurred backdrop. Useful for narrating video recordings. The overlay is removed after the specified duration, or 2000ms.

**Usage**

```csharp
await Screencast.ShowChapterAsync(title, options);
```

**Arguments**
- `title` string
  
  Title text displayed prominently in the overlay.
- `options` `ScreencastShowChapterOptions?` *(optional)*
  - `Description` string? *(optional)*
    
    Optional description text displayed below the title.
  - `Duration` float? *(optional)*
    
    Duration in milliseconds after which the overlay is automatically removed. Defaults to `2000`.

**Returns**
- void

---

### ShowOverlayAsync {/* #screencast-show-overlay */}



Adds an overlay with the given HTML content. The overlay is displayed on top of the page until removed. Returns a disposable that removes the overlay when disposed.

**Usage**

```csharp
await Screencast.ShowOverlayAsync(html, options);
```

**Arguments**
- `html` string
  
  HTML content for the overlay.
- `options` `ScreencastShowOverlayOptions?` *(optional)*
  - `Duration` float? *(optional)*
    
    Duration in milliseconds after which the overlay is automatically removed. Overlay stays until dismissed if not provided.

**Returns**
- Disposable

---

### ShowOverlaysAsync {/* #screencast-show-overlays */}



Shows overlays.

**Usage**

```csharp
await Screencast.ShowOverlaysAsync();
```

**Returns**
- void

---

### StartAsync {/* #screencast-start */}



Starts the screencast. When [Path](/api/class-screencast.mdx#screencast-start-option-path) is provided, it saves video recording to the specified file. When [OnFrame](/api/class-screencast.mdx#screencast-start-option-on-frame) is provided, delivers JPEG-encoded frames to the callback. Both can be used together.

**Usage**

**Arguments**
- `options` `ScreencastStartOptions?` *(optional)*
  - `OnFrame` Func<ScreencastFrame, Task> *(optional)*
    - `Data` byte&#91;&#93;
      
      JPEG-encoded frame data.
    - `Timestamp` float
      
      The timestamp of when the frame was presented by the browser, in milliseconds since the Unix epoch.
    - `ViewportWidth` int
      
      Width of the page viewport at the time the frame was captured.
    - `ViewportHeight` int
      
      Height of the page viewport at the time the frame was captured.
    
    Callback that receives JPEG-encoded frame data along with the page viewport size at the time of capture.
  - `Path` string? *(optional)*
    
    Path where the video should be saved when the screencast is stopped. When provided, video recording is started.
  - `Quality` int? *(optional)*
    
    The quality of the image, between 0-100.
  - `Size` Size? *(optional)*
    - `Width` int
      
      Max frame width in pixels.
    - `Height` int
      
      Max frame height in pixels.
    
    Specifies the dimensions of screencast frames. The actual frame is scaled to preserve the page's aspect ratio and may be smaller than these bounds. If a screencast is already active (e.g. started by tracing or video recording), the existing configuration takes precedence and the frame size may exceed these bounds or this option may be ignored. If not specified the size will be equal to page viewport scaled down to fit into 800×800.

**Returns**
- Disposable

---

### StopAsync {/* #screencast-stop */}



Stops the screencast and video recording if active. If a video was being recorded, saves it to the path specified in [Screencast.StartAsync()](/api/class-screencast.mdx#screencast-start).

**Usage**

```csharp
await Screencast.StopAsync();
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
