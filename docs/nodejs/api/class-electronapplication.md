# ElectronApplication

> **Source:** [playwright.dev/docs/api/class-electronapplication](https://playwright.dev/docs/api/class-electronapplication)

---

Electron application representation. You can use [electron.launch()](/api/class-electron.mdx#electron-launch) to obtain the application instance. This instance you can control main electron process as well as work with Electron windows:

```js
const { _electron: electron } = require('playwright');

(async () => {
  // Launch Electron app.
  const electronApp = await electron.launch({ args: 'main.js' });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
  // Capture a screenshot.
  await window.screenshot({ path: 'intro.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);
  // Click button.
  await window.click('text=Click me');
  // Exit app.
  await electronApp.close();
})();
```


---

## Methods

### browserWindow {/* #electron-application-browser-window */}



Returns the BrowserWindow object that corresponds to the given Playwright page.

**Usage**

```js
await electronApplication.browserWindow(page);
```

**Arguments**
- `page` Page
  
  Page to retrieve the window for.

**Returns**
- Promise<JSHandle>

---

### close {/* #electron-application-close */}



Closes Electron application.

**Usage**

```js
await electronApplication.close();
```

**Returns**
- Promise<void>

---

### context {/* #electron-application-context */}



This method returns browser context that can be used for setting up context-wide routing, etc.

**Usage**

```js
electronApplication.context();
```

**Returns**
- BrowserContext

---

### evaluate {/* #electron-application-evaluate */}



Returns the return value of [pageFunction](/api/class-electronapplication.mdx#electron-application-evaluate-option-expression).

If the function passed to the [electronApplication.evaluate()](/api/class-electronapplication.mdx#electron-application-evaluate) returns a Promise, then [electronApplication.evaluate()](/api/class-electronapplication.mdx#electron-application-evaluate) would wait for the promise to resolve and return its value.

If the function passed to the [electronApplication.evaluate()](/api/class-electronapplication.mdx#electron-application-evaluate) returns a non-Serializable value, then [electronApplication.evaluate()](/api/class-electronapplication.mdx#electron-application-evaluate) returns `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

```js
await electronApplication.evaluate(pageFunction);
await electronApplication.evaluate(pageFunction, arg);
```

**Arguments**
- `pageFunction` function | Electron
  
  Function to be evaluated in the main Electron process.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [pageFunction](/api/class-electronapplication.mdx#electron-application-evaluate-option-expression).

**Returns**
- Promise<Serializable>

---

### evaluateHandle {/* #electron-application-evaluate-handle */}



Returns the return value of [pageFunction](/api/class-electronapplication.mdx#electron-application-evaluate-handle-option-expression) as a JSHandle.

The only difference between [electronApplication.evaluate()](/api/class-electronapplication.mdx#electron-application-evaluate) and [electronApplication.evaluateHandle()](/api/class-electronapplication.mdx#electron-application-evaluate-handle) is that [electronApplication.evaluateHandle()](/api/class-electronapplication.mdx#electron-application-evaluate-handle) returns JSHandle.

If the function passed to the [electronApplication.evaluateHandle()](/api/class-electronapplication.mdx#electron-application-evaluate-handle) returns a Promise, then [electronApplication.evaluateHandle()](/api/class-electronapplication.mdx#electron-application-evaluate-handle) would wait for the promise to resolve and return its value.

**Usage**

```js
await electronApplication.evaluateHandle(pageFunction);
await electronApplication.evaluateHandle(pageFunction, arg);
```

**Arguments**
- `pageFunction` function | Electron
  
  Function to be evaluated in the main Electron process.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [pageFunction](/api/class-electronapplication.mdx#electron-application-evaluate-handle-option-expression).

**Returns**
- Promise<JSHandle>

---

### firstWindow {/* #electron-application-first-window */}



Convenience method that waits for the first application window to be opened.

**Usage**

```js
const electronApp = await electron.launch({
  args: 'main.js'
});
const window = await electronApp.firstWindow();
// ...
```

**Arguments**
- `options` Object *(optional)*
  - `timeout` number *(optional)* 
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- Promise<Page>

---

### process {/* #electron-application-process */}



Returns the main process for this Electron Application.

**Usage**

```js
electronApplication.process();
```

**Returns**
- ChildProcess

---

### waitForEvent {/* #electron-application-wait-for-event */}



Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the application is closed before the event is fired. Returns the event data value.

**Usage**

```js
const windowPromise = electronApp.waitForEvent('window');
await mainWindow.click('button');
const window = await windowPromise;
```

**Arguments**
- `event` string
  
  Event name, same one typically passed into `*.on(event)`.
- `optionsOrPredicate` function | Object *(optional)*
  - `predicate` function
    
    receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` number *(optional)*
    
    maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
  
  Either a predicate that receives an event or an options object. Optional.

**Returns**
- Promise<Object>

---

### windows {/* #electron-application-windows */}



Convenience method that returns all the opened windows.

**Usage**

```js
electronApplication.windows();
```

**Returns**
- Array<Page>

---

## Events

### on('close') {/* #electron-application-event-close */}



This event is issued when the application process has been terminated.

**Usage**

```js
electronApplication.on('close', data => {});
```

---

### on('console') {/* #electron-application-event-console */}



Emitted when JavaScript within the Electron main process calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` are available on the ConsoleMessage event handler argument.

**Usage**

```js
electronApp.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await electronApp.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

**Event data**
- ConsoleMessage

---

### on('window') {/* #electron-application-event-window */}



This event is issued for every window that is created **and loaded** in Electron. It contains a Page that can be used for Playwright automation.

**Usage**

```js
electronApplication.on('window', data => {});
```

**Event data**
- Page


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
