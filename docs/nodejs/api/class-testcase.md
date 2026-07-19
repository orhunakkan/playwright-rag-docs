# TestCase

> **Source:** [playwright.dev/docs/api/class-testcase](https://playwright.dev/docs/api/class-testcase)

---

`TestCase` corresponds to every [test()](/api/class-test.mdx#test-call) call in a test file. When a single [test()](/api/class-test.mdx#test-call) is running in multiple projects or repeated multiple times, it will have multiple `TestCase` objects in corresponding projects' suites.


---

## Methods

### ok {/* #test-case-ok */}



Whether the test is considered running fine. Non-ok tests fail the test run with non-zero exit code.

**Usage**

```js
testCase.ok();
```

**Returns**
- boolean

---

### outcome {/* #test-case-outcome */}



Testing outcome for this test. Note that outcome is not the same as [testResult.status](/api/class-testresult.mdx#test-result-status):
* Test that is expected to fail and actually fails is `'expected'`.
* Test that passes on a second retry is `'flaky'`.

**Usage**

```js
testCase.outcome();
```

**Returns**
- "skipped" | "expected" | "unexpected" | "flaky"

---

### titlePath {/* #test-case-title-path */}



Returns a list of titles from the root down to this test.

**Usage**

```js
testCase.titlePath();
```

**Returns**
- Array<string>

---

## Properties

### annotations {/* #test-case-annotations */}



[testResult.annotations](/api/class-testresult.mdx#test-result-annotations) of the last test run.

**Usage**

```js
testCase.annotations
```

**Type**
- Array<Object>
  - `type` string
    
    Annotation type, for example `'skip'` or `'fail'`.
  - `description` string *(optional)*
    
    Optional description.
  - `location` Location *(optional)*
    
    Optional location in the source where the annotation is added.

---

### expectedStatus {/* #test-case-expected-status */}



Expected test status.
* Tests marked as [test.skip()](/api/class-test.mdx#test-skip) or [test.fixme()](/api/class-test.mdx#test-fixme) are expected to be `'skipped'`.
* Tests marked as [test.fail()](/api/class-test.mdx#test-fail) are expected to be `'failed'`.
* Other tests are expected to be `'passed'`.

See also [testResult.status](/api/class-testresult.mdx#test-result-status) for the actual status.

**Usage**

```js
testCase.expectedStatus
```

**Type**
- "passed" | "failed" | "timedOut" | "skipped" | "interrupted"

---

### id {/* #test-case-id */}



A test ID that is computed based on the test file name, test title and project name. The ID is unique within Playwright session.

**Usage**

```js
testCase.id
```

**Type**
- string

---

### location {/* #test-case-location */}



Location in the source where the test is defined.

**Usage**

```js
testCase.location
```

**Type**
- Location

---

### parent {/* #test-case-parent */}



Suite this test case belongs to.

**Usage**

```js
testCase.parent
```

**Type**
- Suite

---

### repeatEachIndex {/* #test-case-repeat-each-index */}



Contains the repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the [command line](../test-cli.mdx).

**Usage**

```js
testCase.repeatEachIndex
```

**Type**
- number

---

### results {/* #test-case-results */}



Results for each run of this test.

**Usage**

```js
testCase.results
```

**Type**
- Array<TestResult>

---

### retries {/* #test-case-retries */}



The maximum number of retries given to this test in the configuration.

Learn more about [test retries](../test-retries.mdx#retries).

**Usage**

```js
testCase.retries
```

**Type**
- number

---

### tags {/* #test-case-tags */}



The list of tags defined on the test or suite via [test()](/api/class-test.mdx#test-call) or [test.describe()](/api/class-test.mdx#test-describe), as well as `@`-tokens extracted from test and suite titles.

Learn more about [test tags](../test-annotations.mdx#tag-tests).

**Usage**

```js
testCase.tags
```

**Type**
- Array<string>

---

### timeout {/* #test-case-timeout */}



The timeout given to the test. Affected by [testConfig.timeout](/api/class-testconfig.mdx#test-config-timeout), [testProject.timeout](/api/class-testproject.mdx#test-project-timeout), [test.setTimeout()](/api/class-test.mdx#test-set-timeout), [test.slow()](/api/class-test.mdx#test-slow) and [testInfo.setTimeout()](/api/class-testinfo.mdx#test-info-set-timeout).

**Usage**

```js
testCase.timeout
```

**Type**
- number

---

### title {/* #test-case-title */}



Test title as passed to the [test()](/api/class-test.mdx#test-call) call.

**Usage**

```js
testCase.title
```

**Type**
- string

---

### type {/* #test-case-type */}



Returns "test". Useful for detecting test cases in [suite.entries()](/api/class-suite.mdx#suite-entries).

**Usage**

```js
testCase.type
```

**Type**
- "test"


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
