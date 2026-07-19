# Mouse

> **Source:** [playwright.dev/python/docs/api/class-mouse](https://playwright.dev/python/docs/api/class-mouse)

---

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

:::tip

If you want to debug where the mouse moved, you can use the [Trace viewer](../trace-viewer-intro.mdx) or [Playwright Inspector](../running-tests.mdx). A red dot showing the location of the mouse will be shown for every mouse action.
:::

Every `page` object has its own Mouse, accessible with [page.mouse](/api/class-page.mdx#page-mouse).

**sync**

```py
# using ‘page.mouse’ to trace a 100x100 square.
page.mouse.move(0, 0)
page.mouse.down()
page.mouse.move(0, 100)
page.mouse.move(100, 100)
page.mouse.move(100, 0)
page.mouse.move(0, 0)
page.mouse.up()
```

**async**

```py
# using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0)
await page.mouse.down()
await page.mouse.move(0, 100)
await page.mouse.move(100, 100)
await page.mouse.move(100, 0)
await page.mouse.move(0, 0)
await page.mouse.up()
```


---

## Methods

### click {/* #mouse-click */}



Shortcut for [mouse.move()](/api/class-mouse.mdx#mouse-move), [mouse.down()](/api/class-mouse.mdx#mouse-down), [mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```python
mouse.click(x, y)
mouse.click(x, y, **kwargs)
```

**Arguments**
- `x` float
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` float
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `click_count` int *(optional)*
  
  defaults to 1. See UIEvent.detail.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- NoneType

---

### dblclick {/* #mouse-dblclick */}



Shortcut for [mouse.move()](/api/class-mouse.mdx#mouse-move), [mouse.down()](/api/class-mouse.mdx#mouse-down), [mouse.up()](/api/class-mouse.mdx#mouse-up), [mouse.down()](/api/class-mouse.mdx#mouse-down) and [mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```python
mouse.dblclick(x, y)
mouse.dblclick(x, y, **kwargs)
```

**Arguments**
- `x` float
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` float
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- NoneType

---

### down {/* #mouse-down */}



Dispatches a `mousedown` event.

**Usage**

```python
mouse.down()
mouse.down(**kwargs)
```

**Arguments**
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `click_count` int *(optional)*
  
  defaults to 1. See UIEvent.detail.

**Returns**
- NoneType

---

### move {/* #mouse-move */}



Dispatches a `mousemove` event.

**Usage**

```python
mouse.move(x, y)
mouse.move(x, y, **kwargs)
```

**Arguments**
- `x` float
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` float
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `steps` int *(optional)*
  
  Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.

**Returns**
- NoneType

---

### up {/* #mouse-up */}



Dispatches a `mouseup` event.

**Usage**

```python
mouse.up()
mouse.up(**kwargs)
```

**Arguments**
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `click_count` int *(optional)*
  
  defaults to 1. See UIEvent.detail.

**Returns**
- NoneType

---

### wheel {/* #mouse-wheel */}



Dispatches a `wheel` event. This method is usually used to manually scroll the page. See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

:::note

Wheel events may cause scrolling if they are not handled, and this method does not wait for the scrolling to finish before returning.
:::

**Usage**

```python
mouse.wheel(delta_x, delta_y)
```

**Arguments**
- `delta_x` float
  
  Pixels to scroll horizontally.
- `delta_y` float
  
  Pixels to scroll vertically.

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
