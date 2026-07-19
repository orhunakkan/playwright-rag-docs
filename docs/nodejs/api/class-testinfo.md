# TestInfo

> **Source:** [playwright.dev/docs/api/class-testinfo](https://playwright.dev/docs/api/class-testinfo)

---

`TestInfo` contains information about currently running test. It is available to test functions, [test.beforeEach()](/api/class-test.mdx#test-before-each), [test.afterEach()](/api/class-test.mdx#test-after-each), [test.beforeAll()](/api/class-test.mdx#test-before-all) and [test.afterAll()](/api/class-test.mdx#test-after-all) hooks, and test-scoped fixtures. `TestInfo` provides utilities to control test execution: attach files, update test timeout, determine which test is currently running and whether it was retried, etc.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  expect(testInfo.title).toBe('basic test');
  await page.screenshot(testInfo.outputPath('screenshot.png'));
});
```


---

## Methods

### attach {/* #test-info-attach */}



Attach a value or a file from disk to the current test. Some reporters show test attachments. Either [path](/api/class-testinfo.mdx#test-info-attach-option-path) or [body](/api/class-testinfo.mdx#test-info-attach-option-body) must be specified, but not both.

For example, you can attach a screenshot to the test:

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev');
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});
```

Or you can attach files returned by your APIs:

```js
import { test, expect } from '@playwright/test';
import { download } from './my-custom-helpers';

test('basic test', async ({}, testInfo) => {
  const tmpPath = await download('a');
  await testInfo.attach('downloaded', { path: tmpPath });
});
```

:::note
[testInfo.attach()](/api/class-testinfo.mdx#test-info-attach) automatically takes care of copying attached files to a location that is accessible to reporters. You can safely remove the attachment after awaiting the attach call.
:::

**Usage**

```js
await testInfo.attach(name);
await testInfo.attach(name, options);
```

**Arguments**
- `name` string
  
  Attachment name. The name will also be sanitized and used as the prefix of file name when saving to disk.
- `options` Object *(optional)*
  - `body` string | Buffer *(optional)*
    
    Attachment body. Mutually exclusive with [path](/api/class-testinfo.mdx#test-info-attach-option-path).
  - `contentType` string *(optional)*
    
    Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`. If omitted, content type is inferred based on the [path](/api/class-testinfo.mdx#test-info-attach-option-path), or defaults to `text/plain` for string attachments and `application/octet-stream` for Buffer attachments.
  - `path` string *(optional)*
    
    Path on the filesystem to the attached file. Mutually exclusive with [body](/api/class-testinfo.mdx#test-info-attach-option-body).

**Returns**
- Promise<void>

---

### fail() {/* #test-info-fail-1 */}



Marks the currently running test as "should fail". Playwright Test runs this test and ensures that it is actually failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed. This is similar to [test.fail()](/api/class-test.mdx#test-fail).

**Usage**

```js
testInfo.fail();
```

---

### fail(condition) {/* #test-info-fail-2 */}



Conditionally mark the currently running test as "should fail" with an optional description. This is similar to [test.fail()](/api/class-test.mdx#test-fail).

**Usage**

```js
testInfo.fail(condition);
testInfo.fail(condition, description);
```

**Arguments**
- `condition` boolean
  
  Test is marked as "should fail" when the condition is `true`.
- `description` string *(optional)*
  
  Optional description that will be reflected in a test report.

---

### fixme() {/* #test-info-fixme-1 */}



Mark a test as "fixme", with the intention to fix it. Test is immediately aborted. This is similar to [test.fixme()](/api/class-test.mdx#test-fixme).

**Usage**

```js
testInfo.fixme();
```

---

### fixme(condition) {/* #test-info-fixme-2 */}



Conditionally mark the currently running test as "fixme" with an optional description. This is similar to [test.fixme()](/api/class-test.mdx#test-fixme).

**Usage**

```js
testInfo.fixme(condition);
testInfo.fixme(condition, description);
```

**Arguments**
- `condition` boolean
  
  Test is marked as "fixme" when the condition is `true`.
- `description` string *(optional)*
  
  Optional description that will be reflected in a test report.

---

### outputPath {/* #test-info-output-path */}



Returns a path inside the [testInfo.outputDir](/api/class-testinfo.mdx#test-info-output-dir) where the test can safely put a temporary file. Guarantees that tests running in parallel will not interfere with each other.

```js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('dir', 'temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the dir/temporary-file.txt', 'utf8');
});
```

> Note that `pathSegments` accepts path segments to the test output directory such as `testInfo.outputPath('relative', 'path', 'to', 'output')`.
> However, this path must stay within the [testInfo.outputDir](/api/class-testinfo.mdx#test-info-output-dir) directory for each test (i.e. `test-results/a-test-title`), otherwise it will throw.

**Usage**

```js
testInfo.outputPath(...pathSegments);
```

**Arguments**
- `...pathSegments` Array<string>
  
  Path segments to append at the end of the resulting path.

**Returns**
- string

---

### setTimeout {/* #test-info-set-timeout */}



Changes the timeout for the currently running test. Zero means no timeout. Learn more about [various timeouts](../test-timeouts.mdx).

Timeout is usually specified in the [configuration file](../test-configuration.mdx), but it could be useful to change the timeout in certain scenarios:

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});
```

**Usage**

```js
testInfo.setTimeout(timeout);
```

**Arguments**
- `timeout` number
  
  Timeout in milliseconds.

---

### skip() {/* #test-info-skip-1 */}



Unconditionally skip the currently running test. Test is immediately aborted. This is similar to [test.skip()](/api/class-test.mdx#test-skip).

**Usage**

```js
testInfo.skip();
```

---

### skip(condition) {/* #test-info-skip-2 */}



Conditionally skips the currently running test with an optional description. This is similar to [test.skip()](/api/class-test.mdx#test-skip).

**Usage**

```js
testInfo.skip(condition);
testInfo.skip(condition, description);
```

**Arguments**
- `condition` boolean
  
  A skip condition. Test is skipped when the condition is `true`.
- `description` string *(optional)*
  
  Optional description that will be reflected in a test report.

---

### slow() {/* #test-info-slow-1 */}



Marks the currently running test as "slow", giving it triple the default timeout. This is similar to [test.slow()](/api/class-test.mdx#test-slow).

**Usage**

```js
testInfo.slow();
```

---

### slow(condition) {/* #test-info-slow-2 */}



Conditionally mark the currently running test as "slow" with an optional description, giving it triple the default timeout. This is similar to [test.slow()](/api/class-test.mdx#test-slow).

**Usage**

```js
testInfo.slow(condition);
testInfo.slow(condition, description);
```

**Arguments**
- `condition` boolean
  
  Test is marked as "slow" when the condition is `true`.
- `description` string *(optional)*
  
  Optional description that will be reflected in a test report.

---

### snapshotPath {/* #test-info-snapshot-path */}



Returns a path to a snapshot file with the given `name`. Pass [kind](/api/class-testinfo.mdx#test-info-snapshot-path-option-kind) to obtain a specific path:
* `kind: 'screenshot'` for [expect(page).toHaveScreenshot()](/api/class-pageassertions.mdx#page-assertions-to-have-screenshot-1);
* `kind: 'aria'` for [expect(locator).toMatchAriaSnapshot()](/api/class-locatorassertions.mdx#locator-assertions-to-match-aria-snapshot);
* `kind: 'snapshot'` for [expect(value).toMatchSnapshot()](/api/class-snapshotassertions.mdx#snapshot-assertions-to-match-snapshot-1).

**Usage**

```js
await expect(page).toHaveScreenshot('header.png');
// Screenshot assertion above expects screenshot at this path:
const screenshotPath = test.info().snapshotPath('header.png', { kind: 'screenshot' });

await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'main.aria.yml' });
// Aria snapshot assertion above expects snapshot at this path:
const ariaSnapshotPath = test.info().snapshotPath('main.aria.yml', { kind: 'aria' });

expect('some text').toMatchSnapshot('snapshot.txt');
// Snapshot assertion above expects snapshot at this path:
const snapshotPath = test.info().snapshotPath('snapshot.txt');

expect('some text').toMatchSnapshot('dir', 'subdir', 'snapshot.txt');
// Snapshot assertion above expects snapshot at this path:
const nestedPath = test.info().snapshotPath('dir', 'subdir', 'snapshot.txt');
```

**Arguments**
- `...name` Array<string>
  
  The name of the snapshot or the path segments to define the snapshot file path. Snapshots with the same name in the same test file are expected to be the same.
  
  When passing [kind](/api/class-testinfo.mdx#test-info-snapshot-path-option-kind), multiple name segments are not supported.
- `options` Object *(optional)*
  - `kind` "snapshot" | "screenshot" | "aria" *(optional)* 
    
    The snapshot kind controls which snapshot path template is used. See [testConfig.snapshotPathTemplate](/api/class-testconfig.mdx#test-config-snapshot-path-template) for more details. Defaults to `'snapshot'`.

**Returns**
- string

---

## Properties

### annotations {/* #test-info-annotations */}



The list of annotations applicable to the current test. Includes annotations from the test, annotations from all [test.describe()](/api/class-test.mdx#test-describe) groups the test belongs to and file-level annotations for the test file.

Learn more about [test annotations](../test-annotations.mdx).

**Usage**

```js
testInfo.annotations
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

### attachments {/* #test-info-attachments */}



The list of files or buffers attached to the current test. Some reporters show test attachments.

To add an attachment, use [testInfo.attach()](/api/class-testinfo.mdx#test-info-attach) instead of directly pushing onto this array.

**Usage**

```js
testInfo.attachments
```

**Type**
- Array<Object>
  - `name` string
    
    Attachment name.
  - `contentType` string
    
    Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
  - `path` string *(optional)*
    
    Optional path on the filesystem to the attached file.
  - `body` Buffer *(optional)*
    
    Optional attachment body used instead of a file.

---

### column {/* #test-info-column */}



Column number where the currently running test is declared.

**Usage**

```js
testInfo.column
```

**Type**
- number

---

### config {/* #test-info-config */}



Processed configuration from the [configuration file](../test-configuration.mdx).

**Usage**

```js
testInfo.config
```

**Type**
- FullConfig

---

### duration {/* #test-info-duration */}



The number of milliseconds the test took to finish. Always zero before the test finishes, either successfully or not. Can be used in [test.afterEach()](/api/class-test.mdx#test-after-each) hook.

**Usage**

```js
testInfo.duration
```

**Type**
- number

---

### error {/* #test-info-error */}



First error thrown during test execution, if any. This is equal to the first element in [testInfo.errors](/api/class-testinfo.mdx#test-info-errors).

**Usage**

```js
testInfo.error
```

**Type**
- TestInfoError

---

### errors {/* #test-info-errors */}



Errors thrown during test execution, if any.

**Usage**

```js
testInfo.errors
```

**Type**
- Array<TestInfoError>

---

### expectedStatus {/* #test-info-expected-status */}



Expected status for the currently running test. This is usually `'passed'`, except for a few cases:
* `'skipped'` for skipped tests, e.g. with [test.skip()](/api/class-test.mdx#test-skip);
* `'failed'` for tests marked as failed with [test.fail()](/api/class-test.mdx#test-fail).

Expected status is usually compared with the actual [testInfo.status](/api/class-testinfo.mdx#test-info-status):

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
```

**Usage**

```js
testInfo.expectedStatus
```

**Type**
- "passed" | "failed" | "timedOut" | "skipped" | "interrupted"

---

### file {/* #test-info-file */}



Absolute path to a file where the currently running test is declared.

**Usage**

```js
testInfo.file
```

**Type**
- string

---

### fn {/* #test-info-fn */}



Test function as passed to `test(title, testFunction)`.

**Usage**

```js
testInfo.fn
```

**Type**
- function

---

### line {/* #test-info-line */}



Line number where the currently running test is declared.

**Usage**

```js
testInfo.line
```

**Type**
- number

---

### outputDir {/* #test-info-output-dir */}



Absolute path to the output directory for this specific test run. Each test run gets its own directory so they cannot conflict.

**Usage**

```js
testInfo.outputDir
```

**Type**
- string

---

### parallelIndex {/* #test-info-parallel-index */}



The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has the same `parallelIndex`.

Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about [parallelism and sharding](../test-parallel.mdx) with Playwright Test.

**Usage**

```js
testInfo.parallelIndex
```

**Type**
- number

---

### project {/* #test-info-project */}



Processed project configuration from the [configuration file](../test-configuration.mdx).

**Usage**

```js
testInfo.project
```

**Type**
- FullProject

---

### repeatEachIndex {/* #test-info-repeat-each-index */}



Specifies a unique repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the [command line](../test-cli.mdx).

**Usage**

```js
testInfo.repeatEachIndex
```

**Type**
- number

---

### retry {/* #test-info-retry */}



Specifies the retry number when the test is retried after a failure. The first test run has [testInfo.retry](/api/class-testinfo.mdx#test-info-retry) equal to zero, the first retry has it equal to one, and so on. Learn more about [retries](../test-retries.mdx#retries).

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  // You can access testInfo.retry in any hook or fixture.
  if (testInfo.retry > 0)
    console.log(`Retrying!`);
});

test('my test', async ({ page }, testInfo) => {
  // Here we clear some server-side state when retrying.
  if (testInfo.retry)
    await cleanSomeCachesOnTheServer();
  // ...
});
```

**Usage**

```js
testInfo.retry
```

**Type**
- number

---

### snapshotDir {/* #test-info-snapshot-dir */}



Absolute path to the snapshot output directory for this specific test. Each test suite gets its own directory so they cannot conflict.

This property does not account for the [testProject.snapshotPathTemplate](/api/class-testproject.mdx#test-project-snapshot-path-template) configuration.

**Usage**

```js
testInfo.snapshotDir
```

**Type**
- string

---

### snapshotSuffix {/* #test-info-snapshot-suffix */}



:::note

Use of [testInfo.snapshotSuffix](/api/class-testinfo.mdx#test-info-snapshot-suffix) is discouraged. Please use [testConfig.snapshotPathTemplate](/api/class-testconfig.mdx#test-config-snapshot-path-template) to configure snapshot paths.
:::

Suffix used to differentiate snapshots between multiple test configurations. For example, if snapshots depend on the platform, you can set `testInfo.snapshotSuffix` equal to `process.platform`. In this case `expect(value).toMatchSnapshot(snapshotName)` will use different snapshots depending on the platform. Learn more about [snapshots](../test-snapshots.mdx).

**Usage**

```js
testInfo.snapshotSuffix
```

**Type**
- string

---

### status {/* #test-info-status */}



Actual status for the currently running test. Available after the test has finished in [test.afterEach()](/api/class-test.mdx#test-after-each) hook and fixtures.

Status is usually compared with the [testInfo.expectedStatus](/api/class-testinfo.mdx#test-info-expected-status):

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
```

**Usage**

```js
testInfo.status
```

**Type**
- "passed" | "failed" | "timedOut" | "skipped" | "interrupted"

---

### tags {/* #test-info-tags */}



Tags that apply to the test. Learn more about [tags](../test-annotations.mdx#tag-tests).

:::note

Any changes made to this list while the test is running will not be visible to test reporters.
:::

**Usage**

```js
testInfo.tags
```

**Type**
- Array<string>

---

### testId {/* #test-info-test-id */}



Test id matching the test case id in the reporter API.

**Usage**

```js
testInfo.testId
```

**Type**
- string

---

### timeout {/* #test-info-timeout */}



Timeout in milliseconds for the currently running test. Zero means no timeout. Learn more about [various timeouts](../test-timeouts.mdx).

Timeout is usually specified in the [configuration file](../test-configuration.mdx)

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});
```

**Usage**

```js
testInfo.timeout
```

**Type**
- number

---

### title {/* #test-info-title */}



The title of the currently running test as passed to `test(title, testFunction)`.

**Usage**

```js
testInfo.title
```

**Type**
- string

---

### titlePath {/* #test-info-title-path */}



The full title path starting with the test file name.

**Usage**

```js
testInfo.titlePath
```

**Type**
- Array<string>

---

### workerIndex {/* #test-info-worker-index */}



The unique index of the worker process that is running the test. When a worker is restarted, for example after a failure, the new worker process gets a new unique `workerIndex`.

Also available as `process.env.TEST_WORKER_INDEX`. Learn more about [parallelism and sharding](../test-parallel.mdx) with Playwright Test.

**Usage**

```js
testInfo.workerIndex
```

**Type**
- number


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
