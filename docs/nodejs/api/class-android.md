# Android

> **Source:** [playwright.dev/docs/api/class-android](https://playwright.dev/docs/api/class-android)

---

Playwright has **experimental** support for Android automation. This includes Chrome for Android and Android WebView.

*Requirements*
* Android device or AVD Emulator.
* [ADB daemon](https://developer.android.com/studio/command-line/adb) running and authenticated with your device. Typically running `adb devices` is all you need to do.
* [`Chrome 87`](https://play.google.com/store/apps/details?id=com.android.chrome) or newer installed on the device
* "Enable command line on non-rooted devices" enabled in `chrome://flags`.

*Known limitations*
* Raw USB operation is not yet supported, so you need ADB.
* Device needs to be awake to produce screenshots. Enabling "Stay awake" developer mode will help.
* We didn't run all the tests against the device, so not everything works.

*How to run*

An example of the Android automation script would be:

```js
const { _android: android } = require('playwright');

(async () => {
  // Connect to the device.
  const device = await android.devices();
  console.log(`Model: ${device.model()}`);
  console.log(`Serial: ${device.serial()}`);
  // Take screenshot of the whole device.
  await device.screenshot({ path: 'device.png' });

  {
    // --------------------- WebView -----------------------

    // Launch an application with WebView.
    await device.shell('am force-stop org.chromium.webview_shell');
    await device.shell('am start org.chromium.webview_shell/.WebViewBrowserActivity');
    // Get the WebView.
    const webview = await device.webView({ pkg: 'org.chromium.webview_shell' });

    // Fill the input box.
    await device.fill({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'github.com/microsoft/playwright');
    await device.press({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'Enter');

    // Work with WebView's page as usual.
    const page = await webview.page();
    await page.waitForNavigation({ url: /.*microsoft\/playwright.*/ });
    console.log(await page.title());
  }

  {
    // --------------------- Browser -----------------------

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    await page.goto('https://webkit.org/');
    console.log(await page.evaluate(() => window.location.href));
    await page.screenshot({ path: 'page.png' });

    await context.close();
  }

  // Close the device.
  await device.close();
})();
```


---

## Methods

### connect {/* #android-connect */}



This methods attaches Playwright to an existing Android device. Use [android.launchServer()](/api/class-android.mdx#android-launch-server) to launch a new Android server instance.

**Usage**

```js
await android.connect(endpoint);
await android.connect(endpoint, options);
```

**Arguments**
- `endpoint` string
  
  A browser websocket endpoint to connect to.
- `options` Object *(optional)*
  - `headers` Object<string, string> *(optional)*
    
    Additional HTTP headers to be sent with web socket connect request. Optional.
  - `slowMo` number *(optional)*
    
    Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to `0`.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds to wait for the connection to be established. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<AndroidDevice>

---

### devices {/* #android-devices */}



Returns the list of detected Android devices.

**Usage**

```js
await android.devices();
await android.devices(options);
```

**Arguments**
- `options` Object *(optional)*
  - `host` string *(optional)* 
    
    Optional host to establish ADB server connection. Default to `127.0.0.1`.
  - `omitDriverInstall` boolean *(optional)* 
    
    Prevents automatic playwright driver installation on attach. Assumes that the drivers have been installed already.
  - `port` number *(optional)* 
    
    Optional port to establish ADB server connection. Default to `5037`.

**Returns**
- Promise<Array<AndroidDevice>>

---

### launchServer {/* #android-launch-server */}



Launches Playwright Android server that clients can connect to. See the following example:

**Usage**

Server Side:

```js
const { _android } = require('playwright');

(async () => {
  const browserServer = await _android.launchServer({
    // If you have multiple devices connected and want to use a specific one.
    // deviceSerialNumber: '<deviceSerialNumber>',
  });
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);
})();
```

Client Side:

```js
const { _android } = require('playwright');

(async () => {
  const device = await _android.connect('<wsEndpoint>');

  console.log(device.model());
  console.log(device.serial());
  await device.shell('am force-stop com.android.chrome');
  const context = await device.launchBrowser();

  const page = await context.newPage();
  await page.goto('https://webkit.org/');
  console.log(await page.evaluate(() => window.location.href));
  await page.screenshot({ path: 'page-chrome-1.png' });

  await context.close();
})();
```

**Arguments**
- `options` Object *(optional)*
  - `adbHost` string *(optional)*
    
    Optional host to establish ADB server connection. Default to `127.0.0.1`.
  - `adbPort` number *(optional)*
    
    Optional port to establish ADB server connection. Default to `5037`.
  - `deviceSerialNumber` string *(optional)*
    
    Optional device serial number to launch the browser on. If not specified, it will throw if multiple devices are connected.
  - `host` string *(optional)* 
    
    Host to use for the web socket. It is optional and defaults to `localhost`, accepting connections only from the loopback interface. Pass an explicit address (e.g. `0.0.0.0`) to accept connections from the network — be aware this exposes the device RPC to anything that can reach the listening port.
  - `omitDriverInstall` boolean *(optional)*
    
    Prevents automatic playwright driver installation on attach. Assumes that the drivers have been installed already.
  - `port` number *(optional)*
    
    Port to use for the web socket. Defaults to 0 that picks any available port.
  - `wsPath` string *(optional)*
    
    Path at which to serve the Android Server. For security, this defaults to an unguessable string.
    
    :::warning
    
    Any process or web page (including those running in Playwright) with knowledge of the `wsPath` can take control of the OS user. For this reason, you should use an unguessable token when using this option.
    :::
    
**Returns**
- Promise<BrowserServer>

---

### setDefaultTimeout {/* #android-set-default-timeout */}



This setting will change the default maximum time for all the methods accepting [timeout](/api/class-android.mdx#android-set-default-timeout-option-timeout) option.

**Usage**

```js
android.setDefaultTimeout(timeout);
```

**Arguments**
- `timeout` number
  
  Maximum time in milliseconds


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
