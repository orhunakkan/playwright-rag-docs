# Tracing

> **Source:** [playwright.dev/python/docs/api/class-tracing](https://playwright.dev/python/docs/api/class-tracing)

---

API for collecting and saving Playwright traces. Playwright traces can be opened in [Trace Viewer](../trace-viewer.mdx) after Playwright script runs.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `context.tracing`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

Start recording a trace before performing actions. At the end, stop tracing and save it to a file.

**sync**

```py
browser = chromium.launch()
context = browser.new_context()
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")
context.tracing.stop(path = "trace.zip")
```

**async**

```py
browser = await chromium.launch()
context = await browser.new_context()
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")
await context.tracing.stop(path = "trace.zip")
```


---

## Methods

### group {/* #tracing-group */}



:::caution

Use `test.step` instead when available.
:::

Creates a new group within the trace, assigning any subsequent API calls to this group, until [tracing.group_end()](/api/class-tracing.mdx#tracing-group-end) is called. Groups can be nested and will be visible in the trace viewer.

**Usage**

**sync**

```py
# All actions between group and group_end
# will be shown in the trace viewer as a group.
page.context.tracing.group("Open Playwright.dev > API")
page.goto("https://playwright.dev/")
page.get_by_role("link", name="API").click()
page.context.tracing.group_end()
```

**async**

```py
# All actions between group and group_end
# will be shown in the trace viewer as a group.
await page.context.tracing.group("Open Playwright.dev > API")
await page.goto("https://playwright.dev/")
await page.get_by_role("link", name="API").click()
await page.context.tracing.group_end()
```

**Arguments**
- `name` str
  
  Group name shown in the trace viewer.
- `location` Dict *(optional)*
  - `file` str
    
    
  - `line` int *(optional)*
    
    
  - `column` int *(optional)*
    
    
  Specifies a custom location for the group to be shown in the trace viewer. Defaults to the location of the [tracing.group()](/api/class-tracing.mdx#tracing-group) call.

**Returns**
- Disposable

---

### group_end {/* #tracing-group-end */}



Closes the last group created by [tracing.group()](/api/class-tracing.mdx#tracing-group).

**Usage**

```python
tracing.group_end()
```

**Returns**
- NoneType

---

### start {/* #tracing-start */}



Start tracing.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `Tracing.start`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

**Usage**

**sync**

```py
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")
context.tracing.stop(path = "trace.zip")
```

**async**

```py
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")
await context.tracing.stop(path = "trace.zip")
```

**Arguments**
- `live` bool *(optional)* 
  
  When enabled, the trace is written to an unarchived file that is updated in real time as actions occur, instead of caching changes and archiving them into a zip file at the end. This is useful for live trace viewing during test execution.
- `name` str *(optional)*
  
  If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [traces_dir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [browser_type.launch()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [tracing.stop()](/api/class-tracing.mdx#tracing-stop) instead.
- `screenshots` bool *(optional)*
  
  Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview.
- `snapshots` bool *(optional)*
  
  If this option is true tracing will
  * capture DOM snapshot on every action
  * record network activity
- `sources` bool *(optional)* 
  
  Whether to include source files for trace actions.
- `title` str *(optional)* 
  
  Trace name to be shown in the Trace Viewer.

**Returns**
- NoneType

---

### start_chunk {/* #tracing-start-chunk */}



Start a new trace chunk. If you'd like to record multiple traces on the same BrowserContext, use [tracing.start()](/api/class-tracing.mdx#tracing-start) once, and then create multiple trace chunks with [tracing.start_chunk()](/api/class-tracing.mdx#tracing-start-chunk) and [tracing.stop_chunk()](/api/class-tracing.mdx#tracing-stop-chunk).

**Usage**

**sync**

```py
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")

context.tracing.start_chunk()
page.get_by_text("Get Started").click()
# Everything between start_chunk and stop_chunk will be recorded in the trace.
context.tracing.stop_chunk(path = "trace1.zip")

context.tracing.start_chunk()
page.goto("http://example.com")
# Save a second trace file with different actions.
context.tracing.stop_chunk(path = "trace2.zip")
```

**async**

```py
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")

await context.tracing.start_chunk()
await page.get_by_text("Get Started").click()
# Everything between start_chunk and stop_chunk will be recorded in the trace.
await context.tracing.stop_chunk(path = "trace1.zip")

await context.tracing.start_chunk()
await page.goto("http://example.com")
# Save a second trace file with different actions.
await context.tracing.stop_chunk(path = "trace2.zip")
```

**Arguments**
- `name` str *(optional)* 
  
  If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [traces_dir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [browser_type.launch()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [tracing.stop_chunk()](/api/class-tracing.mdx#tracing-stop-chunk) instead.
- `title` str *(optional)* 
  
  Trace name to be shown in the Trace Viewer.

**Returns**
- NoneType

---

### start_har {/* #tracing-start-har */}



Start recording a HAR (HTTP Archive) of network activity in this context. The HAR file is written to disk when [tracing.stop_har()](/api/class-tracing.mdx#tracing-stop-har) is called, or when the returned Disposable is disposed.

Only one HAR recording can be active at a time per BrowserContext.

**Usage**

**sync**

```py
context.tracing.start_har("trace.har")
page = context.new_page()
page.goto("https://playwright.dev")
context.tracing.stop_har()
```

**async**

```py
await context.tracing.start_har("trace.har")
page = await context.new_page()
await page.goto("https://playwright.dev")
await context.tracing.stop_har()
```

**Arguments**
- `path` Union\[str, pathlib.Path\]
  
  Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, the HAR is saved as a zip archive with response bodies attached as separate files.
- `content` "omit" | "embed" | "attach" *(optional)*
  
  Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
- `mode` "full" | "minimal" *(optional)*
  
  When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
- `url_filter` str | Pattern *(optional)*
  
  A glob or regex pattern to filter requests that are stored in the HAR. Defaults to none.

**Returns**
- Disposable

---

### stop {/* #tracing-stop */}



Stop tracing.

**Usage**

```python
tracing.stop()
tracing.stop(**kwargs)
```

**Arguments**
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Export trace into the file with the given path.

**Returns**
- NoneType

---

### stop_chunk {/* #tracing-stop-chunk */}



Stop the trace chunk. See [tracing.start_chunk()](/api/class-tracing.mdx#tracing-start-chunk) for more details about multiple trace chunks.

**Usage**

```python
tracing.stop_chunk()
tracing.stop_chunk(**kwargs)
```

**Arguments**
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Export trace collected since the last [tracing.start_chunk()](/api/class-tracing.mdx#tracing-start-chunk) call into the file with the given path.

**Returns**
- NoneType

---

### stop_har {/* #tracing-stop-har */}



Stop HAR recording and save the HAR file to the path given to [tracing.start_har()](/api/class-tracing.mdx#tracing-start-har).

**Usage**

```python
tracing.stop_har()
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
