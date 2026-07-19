# Tracing

> **Source:** [playwright.dev/docs/api/class-tracing](https://playwright.dev/docs/api/class-tracing)

---

API for collecting and saving Playwright traces. Playwright traces can be opened in [Trace Viewer](../trace-viewer.mdx) after Playwright script runs.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `context.tracing`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

Start recording a trace before performing actions. At the end, stop tracing and save it to a file.

```js
const browser = await chromium.launch();
const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');
expect(page.url()).toBe('https://playwright.dev');
await context.tracing.stop({ path: 'trace.zip' });
```


---

## Methods

### group {/* #tracing-group */}



:::caution

Use `test.step` instead when available.
:::

Creates a new group within the trace, assigning any subsequent API calls to this group, until [tracing.groupEnd()](/api/class-tracing.mdx#tracing-group-end) is called. Groups can be nested and will be visible in the trace viewer.

**Usage**

```js
// use test.step instead
await test.step('Log in', async () => {
  // ...
});
```

**Arguments**
- `name` string
  
  Group name shown in the trace viewer.
- `options` Object *(optional)*
  - `location` Object *(optional)*
    - `file` string
      
      
    - `line` number *(optional)*
      
      
    - `column` number *(optional)*
      
      
    Specifies a custom location for the group to be shown in the trace viewer. Defaults to the location of the [tracing.group()](/api/class-tracing.mdx#tracing-group) call.

**Returns**
- Promise<Disposable>

---

### groupEnd {/* #tracing-group-end */}



Closes the last group created by [tracing.group()](/api/class-tracing.mdx#tracing-group).

**Usage**

```js
await tracing.groupEnd();
```

**Returns**
- Promise<void>

---

### start {/* #tracing-start */}



Start tracing.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `Tracing.start`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

**Usage**

```js
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');
expect(page.url()).toBe('https://playwright.dev');
await context.tracing.stop({ path: 'trace.zip' });
```

**Arguments**
- `options` Object *(optional)*
  - `live` boolean *(optional)* 
    
    When enabled, the trace is written to an unarchived file that is updated in real time as actions occur, instead of caching changes and archiving them into a zip file at the end. This is useful for live trace viewing during test execution.
  - `name` string *(optional)*
    
    If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [tracesDir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [tracing.stop()](/api/class-tracing.mdx#tracing-stop) instead.
  - `screenshots` boolean *(optional)*
    
    Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview.
  - `snapshots` boolean *(optional)*
    
    If this option is true tracing will
    * capture DOM snapshot on every action
    * record network activity
  - `sources` boolean *(optional)* 
    
    Whether to include source files for trace actions.
  - `title` string *(optional)* 
    
    Trace name to be shown in the Trace Viewer.

**Returns**
- Promise<void>

---

### startChunk {/* #tracing-start-chunk */}



Start a new trace chunk. If you'd like to record multiple traces on the same BrowserContext, use [tracing.start()](/api/class-tracing.mdx#tracing-start) once, and then create multiple trace chunks with [tracing.startChunk()](/api/class-tracing.mdx#tracing-start-chunk) and [tracing.stopChunk()](/api/class-tracing.mdx#tracing-stop-chunk).

**Usage**

```js
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');

await context.tracing.startChunk();
await page.getByText('Get Started').click();
// Everything between startChunk and stopChunk will be recorded in the trace.
await context.tracing.stopChunk({ path: 'trace1.zip' });

await context.tracing.startChunk();
await page.goto('http://example.com');
// Save a second trace file with different actions.
await context.tracing.stopChunk({ path: 'trace2.zip' });
```

**Arguments**
- `options` Object *(optional)*
  - `name` string *(optional)* 
    
    If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [tracesDir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [tracing.stopChunk()](/api/class-tracing.mdx#tracing-stop-chunk) instead.
  - `title` string *(optional)* 
    
    Trace name to be shown in the Trace Viewer.

**Returns**
- Promise<void>

---

### startHar {/* #tracing-start-har */}



Start recording a HAR (HTTP Archive) of network activity in this context. The HAR file is written to disk when [tracing.stopHar()](/api/class-tracing.mdx#tracing-stop-har) is called, or when the returned Disposable is disposed.

Only one HAR recording can be active at a time per BrowserContext.

**Usage**

```js
await context.tracing.startHar('trace.har');
const page = await context.newPage();
await page.goto('https://playwright.dev');
await context.tracing.stopHar();
```

**Arguments**
- `path` string
  
  Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, the HAR is saved as a zip archive with response bodies attached as separate files.
- `options` Object *(optional)*
  - `content` "omit" | "embed" | "attach" *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
  - `mode` "full" | "minimal" *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `resourcesDir` string *(optional)*
    
    Only used together with `content: 'attach'`. When set, response bodies are placed in this directory instead of next to the HAR file. Not compatible with a `.zip` HAR file.
  - `urlFilter` string | RegExp *(optional)*
    
    A glob or regex pattern to filter requests that are stored in the HAR. Defaults to none.

**Returns**
- Promise<Disposable>

---

### stop {/* #tracing-stop */}



Stop tracing.

**Usage**

```js
await tracing.stop();
await tracing.stop(options);
```

**Arguments**
- `options` Object *(optional)*
  - `path` string *(optional)*
    
    Export trace into the file with the given path.

**Returns**
- Promise<void>

---

### stopChunk {/* #tracing-stop-chunk */}



Stop the trace chunk. See [tracing.startChunk()](/api/class-tracing.mdx#tracing-start-chunk) for more details about multiple trace chunks.

**Usage**

```js
await tracing.stopChunk();
await tracing.stopChunk(options);
```

**Arguments**
- `options` Object *(optional)*
  - `path` string *(optional)*
    
    Export trace collected since the last [tracing.startChunk()](/api/class-tracing.mdx#tracing-start-chunk) call into the file with the given path.

**Returns**
- Promise<void>

---

### stopHar {/* #tracing-stop-har */}



Stop HAR recording and save the HAR file to the path given to [tracing.startHar()](/api/class-tracing.mdx#tracing-start-har).

**Usage**

```js
await tracing.stopHar();
```

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
