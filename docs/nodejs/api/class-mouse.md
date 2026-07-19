# Mouse

> **Source:** [playwright.dev/docs/api/class-mouse](https://playwright.dev/docs/api/class-mouse)

---

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

:::tip

If you want to debug where the mouse moved, you can use the [Trace viewer](../trace-viewer-intro.mdx) or [Playwright Inspector](../running-tests.mdx). A red dot showing the location of the mouse will be shown for every mouse action.
:::

Every `page` object has its own Mouse, accessible with [page.mouse](/api/class-page.mdx#page-mouse).

```js
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```


---

## Methods

### click {/* #mouse-click */}



Shortcut for [mouse.move()](/api/class-mouse.mdx#mouse-move), [mouse.down()](/api/class-mouse.mdx#mouse-down), [mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```js
await mouse.click(x, y);
await mouse.click(x, y, options);
```

**Arguments**
- `x` number
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` number
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` Object *(optional)*
  - `button` "left" | "right" | "middle" *(optional)*
    
    Defaults to `left`.
  - `clickCount` number *(optional)*
    
    defaults to 1. See UIEvent.detail.
  - `delay` number *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- Promise<void>

---

### dblclick {/* #mouse-dblclick */}



Shortcut for [mouse.move()](/api/class-mouse.mdx#mouse-move), [mouse.down()](/api/class-mouse.mdx#mouse-down), [mouse.up()](/api/class-mouse.mdx#mouse-up), [mouse.down()](/api/class-mouse.mdx#mouse-down) and [mouse.up()](/api/class-mouse.mdx#mouse-up).

**Usage**

```js
await mouse.dblclick(x, y);
await mouse.dblclick(x, y, options);
```

**Arguments**
- `x` number
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` number
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` Object *(optional)*
  - `button` "left" | "right" | "middle" *(optional)*
    
    Defaults to `left`.
  - `delay` number *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

**Returns**
- Promise<void>

---

### down {/* #mouse-down */}



Dispatches a `mousedown` event.

**Usage**

```js
await mouse.down();
await mouse.down(options);
```

**Arguments**
- `options` Object *(optional)*
  - `button` "left" | "right" | "middle" *(optional)*
    
    Defaults to `left`.
  - `clickCount` number *(optional)*
    
    defaults to 1. See UIEvent.detail.

**Returns**
- Promise<void>

---

### move {/* #mouse-move */}



Dispatches a `mousemove` event.

**Usage**

```js
await mouse.move(x, y);
await mouse.move(x, y, options);
```

**Arguments**
- `x` number
  
  X coordinate relative to the main frame's viewport in CSS pixels.
- `y` number
  
  Y coordinate relative to the main frame's viewport in CSS pixels.
- `options` Object *(optional)*
  - `steps` number *(optional)*
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.

**Returns**
- Promise<void>

---

### up {/* #mouse-up */}



Dispatches a `mouseup` event.

**Usage**

```js
await mouse.up();
await mouse.up(options);
```

**Arguments**
- `options` Object *(optional)*
  - `button` "left" | "right" | "middle" *(optional)*
    
    Defaults to `left`.
  - `clickCount` number *(optional)*
    
    defaults to 1. See UIEvent.detail.

**Returns**
- Promise<void>

---

### wheel {/* #mouse-wheel */}



Dispatches a `wheel` event. This method is usually used to manually scroll the page. See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

:::note

Wheel events may cause scrolling if they are not handled, and this method does not wait for the scrolling to finish before returning.
:::

**Usage**

```js
await mouse.wheel(deltaX, deltaY);
```

**Arguments**
- `deltaX` number
  
  Pixels to scroll horizontally.
- `deltaY` number
  
  Pixels to scroll vertically.

**Returns**
- Promise<void>


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserServer: /api/class-browserserver.mdx "BrowserServer"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Coverage: /api/class-coverage.mdx "Coverage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Disposable: /api/class-disposable.mdx "Disposable"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
FileChooser: /api/class-filechooser.mdx "FileChooser"
Frame: /api/class-frame.mdx "Frame"
FrameLocator: /api/class-framelocator.mdx "FrameLocator"
GenericAssertions: /api/class-genericassertions.mdx "GenericAssertions"
JSHandle: /api/class-jshandle.mdx "JSHandle"
Keyboard: /api/class-keyboard.mdx "Keyboard"
Locator: /api/class-locator.mdx "Locator"
LocatorAssertions: /api/class-locatorassertions.mdx "LocatorAssertions"
Logger: /api/class-logger.mdx "Logger"
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
SnapshotAssertions: /api/class-snapshotassertions.mdx "SnapshotAssertions"
TimeoutError: /api/class-timeouterror.mdx "TimeoutError"
Touchscreen: /api/class-touchscreen.mdx "Touchscreen"
Tracing: /api/class-tracing.mdx "Tracing"
Video: /api/class-video.mdx "Video"
WebError: /api/class-weberror.mdx "WebError"
WebSocket: /api/class-websocket.mdx "WebSocket"
WebSocketRoute: /api/class-websocketroute.mdx "WebSocketRoute"
WebStorage: /api/class-webstorage.mdx "WebStorage"
Worker: /api/class-worker.mdx "Worker"
Electron: /api/class-electron.mdx "Electron"
ElectronApplication: /api/class-electronapplication.mdx "ElectronApplication"
Android: /api/class-android.mdx "Android"
AndroidDevice: /api/class-androiddevice.mdx "AndroidDevice"
AndroidInput: /api/class-androidinput.mdx "AndroidInput"
AndroidSocket: /api/class-androidsocket.mdx "AndroidSocket"
AndroidWebView: /api/class-androidwebview.mdx "AndroidWebView"
Fixtures: /api/class-fixtures.mdx "Fixtures"
FullConfig: /api/class-fullconfig.mdx "FullConfig"
FullProject: /api/class-fullproject.mdx "FullProject"
Location: /api/class-location.mdx "Location"
Test: /api/class-test.mdx "Test"
TestConfig: /api/class-testconfig.mdx "TestConfig"
TestInfo: /api/class-testinfo.mdx "TestInfo"
TestInfoError: /api/class-testinfoerror.mdx "TestInfoError"
TestOptions: /api/class-testoptions.mdx "TestOptions"
TestProject: /api/class-testproject.mdx "TestProject"
TestStepInfo: /api/class-teststepinfo.mdx "TestStepInfo"
WorkerInfo: /api/class-workerinfo.mdx "WorkerInfo"
Reporter: /api/class-reporter.mdx "Reporter"
Suite: /api/class-suite.mdx "Suite"
TestCase: /api/class-testcase.mdx "TestCase"
TestError: /api/class-testerror.mdx "TestError"
TestResult: /api/class-testresult.mdx "TestResult"
TestRun: /api/class-testrun.mdx "TestRun"
TestStep: /api/class-teststep.mdx "TestStep"
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

AbortSignal: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal "AbortSignal"
Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
boolean: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
Buffer: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
ChildProcess: https://nodejs.org/api/child_process.html "ChildProcess"
Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date"
Error: https://nodejs.org/api/errors.html#errors_class_error "Error"
EventEmitter: https://nodejs.org/api/events.html#events_class_eventemitter "EventEmitter"
function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
FormData: https://developer.mozilla.org/en-US/docs/Web/API/FormData "FormData"
Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
Metadata: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object<string, any>"
null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null "null"
number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
Readable: https://nodejs.org/api/stream.html#stream_class_stream_readable "Readable"
ReadStream: https://nodejs.org/api/fs.html#class-fsreadstream "ReadStream"
RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp"
string: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "string"
void: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined "void"
URL: https://nodejs.org/api/url.html "URL"
URLPattern: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern "URLPattern"
URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams "URLSearchParams"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
