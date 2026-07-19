# Reporter

> **Source:** [playwright.dev/docs/api/class-reporter](https://playwright.dev/docs/api/class-reporter)

---

Test runner notifies the reporter about various events during test execution. All methods of the reporter are optional.

You can create a custom reporter by implementing a class with some of the reporter methods. Make sure to export this class as default.

**ts**

```js title="my-awesome-reporter.ts"
import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  constructor(options: { customOption?: string } = {}) {
    console.log(`my-awesome-reporter setup with customOption set to ${options.customOption}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}
export default MyReporter;
```

**js**

```js title="my-awesome-reporter.js"
// @ts-check

/** @implements {import('@playwright/test/reporter').Reporter} */
class MyReporter {
  constructor(options) {
    console.log(`my-awesome-reporter setup with customOption set to ${options.customOption}`);
  }

  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
  }
}

module.exports = MyReporter;
```

Now use this reporter with [testConfig.reporter](/api/class-testconfig.mdx#test-config-reporter). Learn more about [using reporters](../test-reporters.mdx).

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: ['./my-awesome-reporter.ts', { customOption: 'some value' }],
});
```

Here is a typical order of reporter calls:
* [reporter.onBegin()](/api/class-reporter.mdx#reporter-on-begin) is called once with a root suite that contains all other suites and tests. Learn more about suites hierarchySuite.
* [reporter.onTestBegin()](/api/class-reporter.mdx#reporter-on-test-begin) is called for each test run. It is given a TestCase that is executed, and a TestResult that is almost empty. Test result will be populated while the test runs (for example, with steps and stdio) and will get final `status` once the test finishes.
* [reporter.onStepBegin()](/api/class-reporter.mdx#reporter-on-step-begin) and [reporter.onStepEnd()](/api/class-reporter.mdx#reporter-on-step-end) are called for each executed step inside the test. When steps are executed, test run has not finished yet.
* [reporter.onTestEnd()](/api/class-reporter.mdx#reporter-on-test-end) is called when test run has finished. By this time, TestResult is complete and you can use [testResult.status](/api/class-testresult.mdx#test-result-status), [testResult.error](/api/class-testresult.mdx#test-result-error) and more.
* [reporter.onEnd()](/api/class-reporter.mdx#reporter-on-end) is called once after all tests that should run had finished.
* [reporter.onExit()](/api/class-reporter.mdx#reporter-on-exit) is called immediately before the test runner exits.

Additionally, [reporter.onStdOut()](/api/class-reporter.mdx#reporter-on-std-out) and [reporter.onStdErr()](/api/class-reporter.mdx#reporter-on-std-err) are called when standard output is produced in the worker process, possibly during a test execution, and [reporter.onError()](/api/class-reporter.mdx#reporter-on-error) is called when something went wrong outside of the test execution.

If your custom reporter does not print anything to the terminal, implement [reporter.printsToStdio()](/api/class-reporter.mdx#reporter-prints-to-stdio) and return `false`. This way, Playwright will use one of the standard terminal reporters in addition to your custom reporter to enhance user experience.

**Reporter errors**

Playwright will swallow any errors thrown in your custom reporter methods. If you need to detect or fail on reporter errors, you must wrap and handle them yourself.

**Merged report API notes**

When merging multiple [`blob`](../test-reporters#blob-reporter) reports via [`merge-reports`](../test-sharding#merge-reports-cli) CLI command, the same Reporter API is called to produce final reports and all existing reporters should work without any changes. There some subtle differences though which might affect some custom reporters.
* Projects from different shards are always kept as separate TestProject objects. E.g. if project 'Desktop Chrome' was sharded across 5 machines then there will be 5 instances of projects with the same name in the config passed to [reporter.onBegin()](/api/class-reporter.mdx#reporter-on-begin).


---

## Methods

### onBegin {/* #reporter-on-begin */}



Called once before running tests. All tests have been already discovered and put into a hierarchy of Suites.

**Usage**

```js
reporter.onBegin(config, suite);
```

**Arguments**
- `config` FullConfig
  
  Resolved configuration.
- `suite` Suite
  
  The root suite that contains all projects, files and test cases.

---

### onEnd {/* #reporter-on-end */}



Called after all tests have been run, or testing has been interrupted. Note that this method may return a Promise and Playwright Test will await it. Reporter is allowed to override the status and hence affect the exit code of the test runner.

**Usage**

```js
await reporter.onEnd(result);
```

**Arguments**
- `result` Object
  - `status` "passed" | "failed" | "timedout" | "interrupted"
    
    Test run status.
  - `startTime` Date
    
    Test run start wall time.
  - `duration` number
    
    Test run duration in milliseconds.
  
  Result of the full test run, `status` can be one of:
  * `'passed'` - Everything went as expected.
  * `'failed'` - Any test has failed.
  * `'timedout'` - The [testConfig.globalTimeout](/api/class-testconfig.mdx#test-config-global-timeout) has been reached.
  * `'interrupted'` - Interrupted by the user.

**Returns**
- Promise<Object>
  - `status` "passed" | "failed" | "timedout" | "interrupted" *(optional)*
    
    
---

### onError {/* #reporter-on-error */}



Called on some global error, for example unhandled exception in the worker process.

**Usage**

```js
reporter.onError(error);
reporter.onError(error, workerInfo);
```

**Arguments**
- `error` TestError
  
  The error.
- `workerInfo` WorkerInfo *(optional)* 
  
  Contains information about the worker that produced this error. `undefined` for errors that are not associated with a specific worker.

---

### onExit {/* #reporter-on-exit */}



Called immediately before test runner exists. At this point all the reporters have received the [reporter.onEnd()](/api/class-reporter.mdx#reporter-on-end) signal, so all the reports should be build. You can run the code that uploads the reports in this hook.

**Usage**

```js
await reporter.onExit();
```

**Returns**
- Promise<void>

---

### onStdErr {/* #reporter-on-std-err */}



Called when something has been written to the standard error in the worker process.

**Usage**

```js
reporter.onStdErr(chunk, test, result);
```

**Arguments**
- `chunk` string | Buffer
  
  Output chunk.
- `test` void | TestCase
  
  Test that was running. Note that output may happen when no test is running, in which case this will be void.
- `result` void | TestResult
  
  Result of the test run, this object gets populated while the test runs.

---

### onStdOut {/* #reporter-on-std-out */}



Called when something has been written to the standard output in the worker process.

**Usage**

```js
reporter.onStdOut(chunk, test, result);
```

**Arguments**
- `chunk` string | Buffer
  
  Output chunk.
- `test` void | TestCase
  
  Test that was running. Note that output may happen when no test is running, in which case this will be void.
- `result` void | TestResult
  
  Result of the test run, this object gets populated while the test runs.

---

### onStepBegin {/* #reporter-on-step-begin */}



Called when a test step started in the worker process.

**Usage**

```js
reporter.onStepBegin(test, result, step);
```

**Arguments**
- `test` TestCase
  
  Test that the step belongs to.
- `result` TestResult
  
  Result of the test run, this object gets populated while the test runs.
- `step` TestStep
  
  Test step instance that has started.

---

### onStepEnd {/* #reporter-on-step-end */}



Called when a test step finished in the worker process.

**Usage**

```js
reporter.onStepEnd(test, result, step);
```

**Arguments**
- `test` TestCase
  
  Test that the step belongs to.
- `result` TestResult
  
  Result of the test run.
- `step` TestStep
  
  Test step instance that has finished.

---

### onTestBegin {/* #reporter-on-test-begin */}



Called after a test has been started in the worker process.

**Usage**

```js
reporter.onTestBegin(test, result);
```

**Arguments**
- `test` TestCase
  
  Test that has been started.
- `result` TestResult
  
  Result of the test run, this object gets populated while the test runs.

---

### onTestEnd {/* #reporter-on-test-end */}



Called after a test has been finished in the worker process.

**Usage**

```js
reporter.onTestEnd(test, result);
```

**Arguments**
- `test` TestCase
  
  Test that has been finished.
- `result` TestResult
  
  Result of the test run.

---

### preprocess {/* #reporter-preprocess */}



Called after the configuration has been resolved and before [reporter.onBegin()](/api/class-reporter.mdx#reporter-on-begin). Allows a reporter to mark individual tests as skipped, excluded, fixed or failing.

**Usage**

```js
await reporter.preprocess(params);
```

**Arguments**
- `params` Object
  - `config` FullConfig
    
    Resolved configuration.
  - `suite` Suite
    
    The root suite that contains the projects, files and test cases that will run.
  - `testRun` TestRun
    
    Control which tests will run and their expected status.
  
  The suite reflects `--project`, `--grep`/`--grep-invert` and `.only` filtering, so it only contains tests that match the current invocation. Setup and dependency projects are readonly and cannot be changed through TestRun.
  
  The suite ignores the `--shard` argument: it always contains the full, un-sharded corpus. Playwright applies its built-in sharding after [reporter.preprocess()](/api/class-reporter.mdx#reporter-preprocess) returns, unless the reporter calls [testRun.skipSharding()](/api/class-testrun.mdx#test-run-skip-sharding).

**Returns**
- Promise<void>

---

### printsToStdio {/* #reporter-prints-to-stdio */}



Whether this reporter uses stdio for reporting. When it does not, Playwright Test could add some output to enhance user experience. If your reporter does not print to the terminal, it is strongly recommended to return `false`.

**Usage**

```js
reporter.printsToStdio();
```

**Returns**
- boolean


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
