# JSHandle

> **Source:** [playwright.dev/dotnet/docs/api/class-jshandle](https://playwright.dev/dotnet/docs/api/class-jshandle)

---

JSHandle represents an in-page JavaScript object. JSHandles can be created with the [Page.EvaluateHandleAsync()](/api/class-page.mdx#page-evaluate-handle) method.

```csharp
var windowHandle = await page.EvaluateHandleAsync("() => window");
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is exposed with [JsHandle.DisposeAsync()](/api/class-jshandle.mdx#js-handle-dispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as an argument in [Page.EvalOnSelectorAsync()](/api/class-page.mdx#page-eval-on-selector), [Page.EvaluateAsync()](/api/class-page.mdx#page-evaluate) and [Page.EvaluateHandleAsync()](/api/class-page.mdx#page-evaluate-handle) methods.


---

## Methods

### AsElement {/* #js-handle-as-element */}



Returns either `null` or the object handle itself, if the object handle is an instance of ElementHandle.

**Usage**

```csharp
JsHandle.AsElement();
```

**Returns**
- ElementHandle?

---

### DisposeAsync {/* #js-handle-dispose */}



The `jsHandle.dispose` method stops referencing the element handle.

**Usage**

```csharp
await JsHandle.DisposeAsync();
```

**Returns**
- void

---

### EvaluateAsync {/* #js-handle-evaluate */}



Returns the return value of [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

This method passes this handle as the first argument to [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

If [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression) returns a Promise, then `handle.evaluate` would wait for the promise to resolve and return its value.

**Usage**

```csharp
var tweetHandle = await page.QuerySelectorAsync(".tweet .retweets");
Assert.AreEqual("10 retweets", await tweetHandle.EvaluateAsync("node => node.innerText"));
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

**Returns**
- object

---

### EvaluateHandleAsync {/* #js-handle-evaluate-handle */}



Returns the return value of [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression) as a JSHandle.

This method passes this handle as the first argument to [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression).

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle` returns JSHandle.

If the function passed to the `jsHandle.evaluateHandle` returns a Promise, then `jsHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [Page.EvaluateHandleAsync()](/api/class-page.mdx#page-evaluate-handle) for more details.

**Usage**

```csharp
await JsHandle.EvaluateHandleAsync(expression, arg);
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression).

**Returns**
- JSHandle

---

### GetPropertiesAsync {/* #js-handle-get-properties */}



The method returns a map with **own property names** as keys and JSHandle instances for the property values.

**Usage**

```csharp
var handle = await page.EvaluateHandleAsync("() => ({ window, document }");
var properties = await handle.GetPropertiesAsync();
var windowHandle = properties"window";
var documentHandle = properties"document";
await handle.DisposeAsync();
```

**Returns**
- Map<string, JSHandle>

---

### GetPropertyAsync {/* #js-handle-get-property */}



Fetches a single property from the referenced object.

**Usage**

```csharp
await JsHandle.GetPropertyAsync(propertyName);
```

**Arguments**
- `propertyName` string
  
  property to get

**Returns**
- JSHandle

---

### JsonValueAsync {/* #js-handle-json-value */}



Returns a JSON representation of the object. If the object has a `toJSON` function, it **will not be called**.

:::note

The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.
:::

**Usage**

```csharp
await JsHandle.JsonValueAsync();
```

**Returns**
- object


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
