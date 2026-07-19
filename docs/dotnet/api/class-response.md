# Response

> **Source:** [playwright.dev/dotnet/docs/api/class-response](https://playwright.dev/dotnet/docs/api/class-response)

---

Response class represents responses which are received by page.


---

## Methods

### AllHeadersAsync {/* #response-all-headers */}



An object with all the response HTTP headers associated with this response.

**Usage**

```csharp
await Response.AllHeadersAsync();
```

**Returns**
- IDictionary<string, string>

---

### BodyAsync {/* #response-body */}



Returns the buffer with response body.

**Usage**

```csharp
await Response.BodyAsync();
```

**Returns**
- byte&#91;&#93;

---

### FinishedAsync {/* #response-finished */}



Waits for this response to finish, returns always `null`.

**Usage**

```csharp
await Response.FinishedAsync();
```

**Returns**
- string?

---

### Frame {/* #response-frame */}



Returns the Frame that initiated this response.

**Usage**

```csharp
Response.Frame
```

**Returns**
- Frame

---

### FromServiceWorker {/* #response-from-service-worker */}



Indicates whether this Response was fulfilled by a Service Worker's Fetch Handler (i.e. via [FetchEvent.respondWith](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)).

**Usage**

```csharp
Response.FromServiceWorker
```

**Returns**
- bool

---

### HeaderValueAsync {/* #response-header-value */}



Returns the value of the header matching the name. The name is case-insensitive. If multiple headers have the same name (except `set-cookie`), they are returned as a list separated by `, `. For `set-cookie`, the `\n` separator is used. If no headers are found, `null` is returned.

**Usage**

```csharp
await Response.HeaderValueAsync(name);
```

**Arguments**
- `name` string
  
  Name of the header.

**Returns**
- string?

---

### HeaderValuesAsync {/* #response-header-values */}



Returns all values of the headers matching the name, for example `set-cookie`. The name is case-insensitive.

**Usage**

```csharp
await Response.HeaderValuesAsync(name);
```

**Arguments**
- `name` string
  
  Name of the header.

**Returns**
- IReadOnlyList<string>

---

### Headers {/* #response-headers */}



An object with the response HTTP headers. The header names are lower-cased. Note that this method does not return security-related headers, including cookie-related ones. You can use [Response.AllHeadersAsync()](/api/class-response.mdx#response-all-headers) for complete list of headers that include `cookie` information.

**Usage**

```csharp
Response.Headers
```

**Returns**
- IDictionary<string, string>

---

### HeadersArrayAsync {/* #response-headers-array */}



An array with all the request HTTP headers associated with this response. Unlike [Response.AllHeadersAsync()](/api/class-response.mdx#response-all-headers), header names are NOT lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```csharp
await Response.HeadersArrayAsync();
```

**Returns**
- IReadOnlyList<`HttpHeader`>
  - `name` string
    
    Name of the header.
  - `value` string
    
    Value of the header.

---

### HttpVersionAsync {/* #response-http-version */}



Returns the http version used by the response.

**Usage**

```csharp
await Response.HttpVersionAsync();
```

**Returns**
- string

---

### JsonAsync {/* #response-json */}



Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

**Usage**

```csharp
await Response.JsonAsync();
```

**Returns**
- JsonElement?

---

### Ok {/* #response-ok */}



Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

**Usage**

```csharp
Response.Ok
```

**Returns**
- bool

---

### Request {/* #response-request */}



Returns the matching Request object.

**Usage**

```csharp
Response.Request
```

**Returns**
- Request

---

### SecurityDetailsAsync {/* #response-security-details */}



Returns SSL and other security information.

**Usage**

```csharp
await Response.SecurityDetailsAsync();
```

**Returns**
- SecurityDetails?
  - `issuer` string? *(optional)*
    
    Common Name component of the Issuer field. from the certificate. This should only be used for informational purposes. Optional.
  - `protocol` string? *(optional)*
    
    The specific TLS protocol used. (e.g. `TLS 1.3`). Optional.
  - `subjectName` string? *(optional)*
    
    Common Name component of the Subject field from the certificate. This should only be used for informational purposes. Optional.
  - `validFrom` float? *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes valid. Optional.
  - `validTo` float? *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes invalid. Optional.

---

### ServerAddrAsync {/* #response-server-addr */}



Returns the IP address and port of the server.

**Usage**

```csharp
await Response.ServerAddrAsync();
```

**Returns**
- ServerAddr?
  - `ipAddress` string
    
    IPv4 or IPV6 address of the server.
  - `port` int
    
    
---

### Status {/* #response-status */}



Contains the status code of the response (e.g., 200 for a success).

**Usage**

```csharp
Response.Status
```

**Returns**
- int

---

### StatusText {/* #response-status-text */}



Contains the status text of the response (e.g. usually an "OK" for a success).

**Usage**

```csharp
Response.StatusText
```

**Returns**
- string

---

### TextAsync {/* #response-text */}



Returns the text representation of response body.

**Usage**

```csharp
await Response.TextAsync();
```

**Returns**
- string

---

### Url {/* #response-url */}



Contains the URL of the response.

**Usage**

```csharp
Response.Url
```

**Returns**
- string


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
