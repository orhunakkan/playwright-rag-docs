# Tracing

> **Source:** [playwright.dev/dotnet/docs/api/class-tracing](https://playwright.dev/dotnet/docs/api/class-tracing)

---

API for collecting and saving Playwright traces. Playwright traces can be opened in [Trace Viewer](../trace-viewer.mdx) after Playwright script runs.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `context.tracing`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

Start recording a trace before performing actions. At the end, stop tracing and save it to a file.

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");
await context.Tracing.StopAsync(new()
{
  Path = "trace.zip"
});
```


---

## Methods

### GroupAsync {/* #tracing-group */}



:::caution

Use `test.step` instead when available.
:::

Creates a new group within the trace, assigning any subsequent API calls to this group, until [Tracing.GroupEndAsync()](/api/class-tracing.mdx#tracing-group-end) is called. Groups can be nested and will be visible in the trace viewer.

**Usage**

```csharp
// All actions between GroupAsync and GroupEndAsync
// will be shown in the trace viewer as a group.
await Page.Context.Tracing.GroupAsync("Open Playwright.dev > API");
await Page.GotoAsync("https://playwright.dev/");
await Page.GetByRole(AriaRole.Link, new() { Name = "API" }).ClickAsync();
await Page.Context.Tracing.GroupEndAsync();
```

**Arguments**
- `name` string
  
  Group name shown in the trace viewer.
- `options` `TracingGroupOptions?` *(optional)*
  - `Location` Location? *(optional)*
    - `File` string
      
      
    - `Line` int? *(optional)*
      
      
    - `Column` int? *(optional)*
      
      
    Specifies a custom location for the group to be shown in the trace viewer. Defaults to the location of the [Tracing.GroupAsync()](/api/class-tracing.mdx#tracing-group) call.

**Returns**
- Disposable

---

### GroupEndAsync {/* #tracing-group-end */}



Closes the last group created by [Tracing.GroupAsync()](/api/class-tracing.mdx#tracing-group).

**Usage**

```csharp
await Tracing.GroupEndAsync();
```

**Returns**
- void

---

### StartAsync {/* #tracing-start */}



Start tracing.

:::note

You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `Tracing.start`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

**Usage**

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");
await context.Tracing.StopAsync(new()
{
  Path = "trace.zip"
});
```

**Arguments**
- `options` `TracingStartOptions?` *(optional)*
  - `Live` bool? *(optional)* 
    
    When enabled, the trace is written to an unarchived file that is updated in real time as actions occur, instead of caching changes and archiving them into a zip file at the end. This is useful for live trace viewing during test execution.
  - `Name` string? *(optional)*
    
    If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [TracesDir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [BrowserType.LaunchAsync()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [Tracing.StopAsync()](/api/class-tracing.mdx#tracing-stop) instead.
  - `Screenshots` bool? *(optional)*
    
    Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview.
  - `Snapshots` bool? *(optional)*
    
    If this option is true tracing will
    * capture DOM snapshot on every action
    * record network activity
  - `Sources` bool? *(optional)* 
    
    Whether to include source files for trace actions.
  - `Title` string? *(optional)* 
    
    Trace name to be shown in the Trace Viewer.

**Returns**
- void

---

### StartChunkAsync {/* #tracing-start-chunk */}



Start a new trace chunk. If you'd like to record multiple traces on the same BrowserContext, use [Tracing.StartAsync()](/api/class-tracing.mdx#tracing-start) once, and then create multiple trace chunks with [Tracing.StartChunkAsync()](/api/class-tracing.mdx#tracing-start-chunk) and [Tracing.StopChunkAsync()](/api/class-tracing.mdx#tracing-stop-chunk).

**Usage**

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");

await context.Tracing.StartChunkAsync();
await page.GetByText("Get Started").ClickAsync();
// Everything between StartChunkAsync and StopChunkAsync will be recorded in the trace.
await context.Tracing.StopChunkAsync(new()
{
  Path = "trace1.zip"
});

await context.Tracing.StartChunkAsync();
await page.GotoAsync("http://example.com");
// Save a second trace file with different actions.
await context.Tracing.StopChunkAsync(new()
{
  Path = "trace2.zip"
});
```

**Arguments**
- `options` `TracingStartChunkOptions?` *(optional)*
  - `Name` string? *(optional)* 
    
    If specified, intermediate trace files are going to be saved into the files with the given name prefix inside the [TracesDir](/api/class-browsertype.mdx#browser-type-launch-option-traces-dir) directory specified in [BrowserType.LaunchAsync()](/api/class-browsertype.mdx#browser-type-launch). To specify the final trace zip file name, you need to pass `path` option to [Tracing.StopChunkAsync()](/api/class-tracing.mdx#tracing-stop-chunk) instead.
  - `Title` string? *(optional)* 
    
    Trace name to be shown in the Trace Viewer.

**Returns**
- void

---

### StartHarAsync {/* #tracing-start-har */}



Start recording a HAR (HTTP Archive) of network activity in this context. The HAR file is written to disk when [Tracing.StopHarAsync()](/api/class-tracing.mdx#tracing-stop-har) is called, or when the returned Disposable is disposed.

Only one HAR recording can be active at a time per BrowserContext.

**Usage**

```csharp
await context.Tracing.StartHarAsync("trace.har");
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");
await context.Tracing.StopHarAsync();
```

**Arguments**
- `path` string
  
  Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, the HAR is saved as a zip archive with response bodies attached as separate files.
- `options` `TracingStartHarOptions?` *(optional)*
  - `Content` `enum HarContentPolicy { Omit, Embed, Attach }?` *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
  - `Mode` `enum HarMode { Full, Minimal }?` *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `UrlFilter|UrlFilterRegex` string? | Regex? *(optional)*
    
    A glob or regex pattern to filter requests that are stored in the HAR. Defaults to none.

**Returns**
- Disposable

---

### StopAsync {/* #tracing-stop */}



Stop tracing.

**Usage**

```csharp
await Tracing.StopAsync(options);
```

**Arguments**
- `options` `TracingStopOptions?` *(optional)*
  - `Path` string? *(optional)*
    
    Export trace into the file with the given path.

**Returns**
- void

---

### StopChunkAsync {/* #tracing-stop-chunk */}



Stop the trace chunk. See [Tracing.StartChunkAsync()](/api/class-tracing.mdx#tracing-start-chunk) for more details about multiple trace chunks.

**Usage**

```csharp
await Tracing.StopChunkAsync(options);
```

**Arguments**
- `options` `TracingStopChunkOptions?` *(optional)*
  - `Path` string? *(optional)*
    
    Export trace collected since the last [Tracing.StartChunkAsync()](/api/class-tracing.mdx#tracing-start-chunk) call into the file with the given path.

**Returns**
- void

---

### StopHarAsync {/* #tracing-stop-har */}



Stop HAR recording and save the HAR file to the path given to [Tracing.StartHarAsync()](/api/class-tracing.mdx#tracing-start-har).

**Usage**

```csharp
await Tracing.StopHarAsync();
```

**Returns**
- void


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
CDPSessionEvent: /api/class-cdpsessionevent.mdx "CDPSessionEvent"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
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
PlaywrightAssertions: /api/class-playwrightassertions.mdx "PlaywrightAssertions"
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
WebSocketFrame: /api/class-websocketframe.mdx "WebSocketFrame"
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

bool: https://docs.microsoft.com/en-us/dotnet/api/system.boolean "bool"
Date: https://learn.microsoft.com/en-us/dotnet/api/system.datetime "DateTime"
double: https://docs.microsoft.com/en-us/dotnet/api/system.double "double"
byte: https://docs.microsoft.com/en-us/dotnet/api/system.byte "byte"
int: https://docs.microsoft.com/en-us/dotnet/api/system.int32 "int"
long: https://docs.microsoft.com/en-us/dotnet/api/system.int64 "long"
void: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/void "void"
string: https://docs.microsoft.com/en-us/dotnet/api/system.string "string"
URL: https://nodejs.org/api/url.html "URL"
Regex: https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex "Regex"

Action: https://docs.microsoft.com/en-us/dotnet/api/system.action-1 "Action"
Func: https://docs.microsoft.com/en-us/dotnet/api/system.func-2 "Func"
IEnumerable: https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerable "IEnumerable"
IReadOnlyList: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlylist-1?view=net-9.0 "IReadOnlyList"
IDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.idictionary "IDictionary"
Task: https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-5.0 "Task"
IReadOnlyDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2 "IReadOnlyDictionary"
JsonElement: https://docs.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement "JsonElement"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-dotnet/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
