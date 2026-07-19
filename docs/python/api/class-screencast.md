# Screencast

> **Source:** [playwright.dev/python/docs/api/class-screencast](https://playwright.dev/python/docs/api/class-screencast)

---

Interface for capturing screencast frames from a page.


---

## Methods

### hide_actions {/* #screencast-hide-actions */}



Removes action decorations.

**Usage**

```python
screencast.hide_actions()
```

**Returns**
- NoneType

---

### hide_overlays {/* #screencast-hide-overlays */}



Hides overlays without removing them.

**Usage**

```python
screencast.hide_overlays()
```

**Returns**
- NoneType

---

### show_actions {/* #screencast-show-actions */}



Enables visual annotations on interacted elements. Returns a disposable that stops showing actions when disposed.

**Usage**

```python
screencast.show_actions()
screencast.show_actions(**kwargs)
```

**Arguments**
- `cursor` "none" | "pointer" *(optional)* 
  
  Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
- `duration` float *(optional)*
  
  How long each annotation is displayed in milliseconds. Defaults to `500`.
- `font_size` int *(optional)*
  
  Font size of the action title in pixels. Defaults to `24`.
- `position` "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" *(optional)*
  
  Position of the action title overlay. Defaults to `"top-right"`.

**Returns**
- Disposable

---

### show_chapter {/* #screencast-show-chapter */}



Shows a chapter overlay with a title and optional description, centered on the page with a blurred backdrop. Useful for narrating video recordings. The overlay is removed after the specified duration, or 2000ms.

**Usage**

```python
screencast.show_chapter(title)
screencast.show_chapter(title, **kwargs)
```

**Arguments**
- `title` str
  
  Title text displayed prominently in the overlay.
- `description` str *(optional)*
  
  Optional description text displayed below the title.
- `duration` float *(optional)*
  
  Duration in milliseconds after which the overlay is automatically removed. Defaults to `2000`.

**Returns**
- NoneType

---

### show_overlay {/* #screencast-show-overlay */}



Adds an overlay with the given HTML content. The overlay is displayed on top of the page until removed. Returns a disposable that removes the overlay when disposed.

**Usage**

```python
screencast.show_overlay(html)
screencast.show_overlay(html, **kwargs)
```

**Arguments**
- `html` str
  
  HTML content for the overlay.
- `duration` float *(optional)*
  
  Duration in milliseconds after which the overlay is automatically removed. Overlay stays until dismissed if not provided.

**Returns**
- Disposable

---

### show_overlays {/* #screencast-show-overlays */}



Shows overlays.

**Usage**

```python
screencast.show_overlays()
```

**Returns**
- NoneType

---

### start {/* #screencast-start */}



Starts the screencast. When [path](/api/class-screencast.mdx#screencast-start-option-path) is provided, it saves video recording to the specified file. When [on_frame](/api/class-screencast.mdx#screencast-start-option-on-frame) is provided, delivers JPEG-encoded frames to the callback. Both can be used together.

**Usage**

**Arguments**
- `on_frame` Callable\[Dict\]:Promise *(optional)*
  - `data` bytes
    
    JPEG-encoded frame data.
  - `timestamp` float
    
    The timestamp of when the frame was presented by the browser, in milliseconds since the Unix epoch.
  - `viewportWidth` int
    
    Width of the page viewport at the time the frame was captured.
  - `viewportHeight` int
    
    Height of the page viewport at the time the frame was captured.
  
  Callback that receives JPEG-encoded frame data along with the page viewport size at the time of capture.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Path where the video should be saved when the screencast is stopped. When provided, video recording is started.
- `quality` int *(optional)*
  
  The quality of the image, between 0-100.
- `size` Dict *(optional)*
  - `width` int
    
    Max frame width in pixels.
  - `height` int
    
    Max frame height in pixels.
  
  Specifies the dimensions of screencast frames. The actual frame is scaled to preserve the page's aspect ratio and may be smaller than these bounds. If a screencast is already active (e.g. started by tracing or video recording), the existing configuration takes precedence and the frame size may exceed these bounds or this option may be ignored. If not specified the size will be equal to page viewport scaled down to fit into 800×800.

**Returns**
- Disposable

---

### stop {/* #screencast-stop */}



Stops the screencast and video recording if active. If a video was being recorded, saves it to the path specified in [screencast.start()](/api/class-screencast.mdx#screencast-start).

**Usage**

```python
screencast.stop()
```

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
