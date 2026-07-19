# Route

> **Source:** [playwright.dev/dotnet/docs/api/class-route](https://playwright.dev/dotnet/docs/api/class-route)

---

Whenever a network route is set up with [Page.RouteAsync()](/api/class-page.mdx#page-route) or [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route), the `Route` object allows to handle the route.

Learn more about [networking](../network.mdx).


---

## Methods

### AbortAsync {/* #route-abort */}



Aborts the route's request.

**Usage**

```csharp
await Route.AbortAsync(errorCode);
```

**Arguments**
- `errorCode` string? *(optional)*
  
  Optional error code. Defaults to `failed`, could be one of the following:
  * `'aborted'` - An operation was aborted (due to user action)
  * `'accessdenied'` - Permission to access a resource, other than the network, was denied
  * `'addressunreachable'` - The IP address is unreachable. This usually means that there is no route to the specified host or network.
  * `'blockedbyclient'` - The client chose to block the request.
  * `'blockedbyresponse'` - The request failed because the response was delivered along with requirements which are not met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
  * `'connectionaborted'` - A connection timed out as a result of not receiving an ACK for data sent.
  * `'connectionclosed'` - A connection was closed (corresponding to a TCP FIN).
  * `'connectionfailed'` - A connection attempt failed.
  * `'connectionrefused'` - A connection attempt was refused.
  * `'connectionreset'` - A connection was reset (corresponding to a TCP RST).
  * `'internetdisconnected'` - The Internet connection has been lost.
  * `'namenotresolved'` - The host name could not be resolved.
  * `'timedout'` - An operation timed out.
  * `'failed'` - A generic failure occurred.

**Returns**
- void

---

### ContinueAsync {/* #route-continue */}



Sends route's request to the network with optional overrides.

**Usage**

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "bar" } };
    headers.Remove("origin");
    await route.ContinueAsync(new() { Headers = headers });
});
```

**Arguments**
- `options` `RouteContinueOptions?` *(optional)*
  - `Headers` IDictionary?<string, string> *(optional)*
    
    If set changes the request HTTP headers. Header values will be converted to a string.
  - `Method` string? *(optional)*
    
    If set changes the request method (e.g. GET or POST).
  - `PostData` byte&#91;&#93;? *(optional)*
    
    If set changes the post data of request.
  - `Url` string? *(optional)*
    
    If set changes the request URL. New URL must have same protocol as original one.

**Returns**
- void

**Details**

The [Headers](/api/class-route.mdx#route-continue-option-headers) option applies to both the routed request and any redirects it initiates. However, [Url](/api/class-route.mdx#route-continue-option-url), [Method](/api/class-route.mdx#route-continue-option-method), and [PostData](/api/class-route.mdx#route-continue-option-post-data) only apply to the original request and are not carried over to redirected requests.

[Route.ContinueAsync()](/api/class-route.mdx#route-continue) will immediately send the request to the network, other matching handlers won't be invoked. Use [Route.FallbackAsync()](/api/class-route.mdx#route-fallback) If you want next matching handler in the chain to be invoked.

:::warning

Some request headers are **forbidden** and cannot be overridden (for example, `Cookie`, `Host`, `Content-Length` and others, see [this MDN page](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header) for full list). If an override is provided for a forbidden header, it will be ignored and the original request header will be used.

To set custom cookies, use [BrowserContext.AddCookiesAsync()](/api/class-browsercontext.mdx#browser-context-add-cookies).
:::

---

### FallbackAsync {/* #route-fallback */}



Continues route's request with optional overrides. The method is similar to [Route.ContinueAsync()](/api/class-route.mdx#route-continue) with the difference that other matching handlers will be invoked before sending the request.

**Usage**

When several routes match the given pattern, they run in the order opposite to their registration. That way the last registered route can always override all the previous ones. In the example below, request will be handled by the bottom-most handler first, then it'll fall back to the previous one and in the end will be aborted by the first registered route.

```csharp
await page.RouteAsync("**/*", route => {
    // Runs last.
    await route.AbortAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs second.
    await route.FallbackAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs first.
    await route.FallbackAsync();
});
```

Registering multiple routes is useful when you want separate handlers to handle different kinds of requests, for example API calls vs page resources or GET requests vs POST requests as in the example below.

```csharp
// Handle GET requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "GET") {
        await route.FallbackAsync();
        return;
    }
    // Handling GET only.
    // ...
});

// Handle POST requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "POST") {
        await route.FallbackAsync();
        return;
    }
    // Handling POST only.
    // ...
});
```

One can also modify request while falling back to the subsequent handler, that way intermediate route handler can modify url, method, headers and postData of the request.

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "foo-value" } };
    headers.Remove("bar");
    await route.FallbackAsync(new() { Headers = headers });
});
```

Use [Route.ContinueAsync()](/api/class-route.mdx#route-continue) to immediately send the request to the network, other matching handlers won't be invoked in that case.

**Arguments**
- `options` `RouteFallbackOptions?` *(optional)*
  - `Headers` IDictionary?<string, string> *(optional)*
    
    If set changes the request HTTP headers. Header values will be converted to a string.
  - `Method` string? *(optional)*
    
    If set changes the request method (e.g. GET or POST).
  - `PostData` byte&#91;&#93;? *(optional)*
    
    If set changes the post data of request.
  - `Url` string? *(optional)*
    
    If set changes the request URL. New URL must have same protocol as original one. Changing the URL won't affect the route matching, all the routes are matched using the original request URL.

**Returns**
- void

---

### FetchAsync {/* #route-fetch */}



Performs the request and fetches result without fulfilling it, so that the response could be modified and then fulfilled.

**Usage**

```csharp
await page.RouteAsync("https://dog.ceo/api/breeds/list/all", async route =>
{
    var response = await route.FetchAsync();
    dynamic json = await response.JsonAsync();
    json.message.big_red_dog = new string[] {};
    await route.FulfillAsync(new() { Response = response, Json = json });
});
```

**Arguments**
- `options` `RouteFetchOptions?` *(optional)*
  - `Headers` IDictionary?<string, string> *(optional)*
    
    If set changes the request HTTP headers. Header values will be converted to a string.
  - `MaxRedirects` int? *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `MaxRetries` int? *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `Method` string? *(optional)*
    
    If set changes the request method (e.g. GET or POST).
  - `PostData` byte&#91;&#93;? *(optional)*
    
    If set changes the post data of request.
  - `Timeout` float? *(optional)* 
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `Url` string? *(optional)*
    
    If set changes the request URL. New URL must have same protocol as original one.

**Returns**
- APIResponse

**Details**

Note that [Headers](/api/class-route.mdx#route-fetch-option-headers) option will apply to the fetched request as well as any redirects initiated by it. If you want to only apply [Headers](/api/class-route.mdx#route-fetch-option-headers) to the original request, but not to redirects, look into [Route.ContinueAsync()](/api/class-route.mdx#route-continue) instead.

---

### FulfillAsync {/* #route-fulfill */}



Fulfills route's request with given response.

**Usage**

An example of fulfilling all requests with 404 responses:

```csharp
await page.RouteAsync("**/*", route => route.FulfillAsync(new ()
{
    Status = 404,
    ContentType = "text/plain",
    Body = "Not Found!"
}));
```

An example of serving static file:

```csharp
await page.RouteAsync("**/xhr_endpoint", route => route.FulfillAsync(new() { Path = "mock_data.json" }));
```

**Arguments**
- `options` `RouteFulfillOptions?` *(optional)*
  - `Body` string? *(optional)*
    
    Optional response body as text.
  - `BodyBytes` byte&#91;&#93;? *(optional)* 
    
    Optional response body as raw bytes.
  - `ContentType` string? *(optional)*
    
    If set, equals to setting `Content-Type` response header.
  - `Headers` IDictionary?<string, string> *(optional)*
    
    Response headers. Header values will be converted to a string.
  - `Json` object? *(optional)* 
    
    JSON response. This method will set the content type to `application/json` if not set.
  - `Path` string? *(optional)*
    
    File path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory.
  - `Response` APIResponse? *(optional)* 
    
    APIResponse to fulfill route's request with. Individual fields of the response (such as headers) can be overridden using fulfill options.
  - `Status` int? *(optional)*
    
    Response status code, defaults to `200`.

**Returns**
- void

---

### Request {/* #route-request */}



A request to be routed.

**Usage**

```csharp
Route.Request
```

**Returns**
- Request


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
