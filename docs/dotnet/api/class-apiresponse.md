# APIResponse

> **Source:** [playwright.dev/dotnet/docs/api/class-apiresponse](https://playwright.dev/dotnet/docs/api/class-apiresponse)

---

APIResponse class represents responses returned by [ApiRequestContext.GetAsync()](/api/class-apirequestcontext.mdx#api-request-context-get) and similar methods.


---

## Methods

### BodyAsync {/* #api-response-body */}



Returns the buffer with response body.

**Usage**

```csharp
await ApiResponse.BodyAsync();
```

**Returns**
- byte&#91;&#93;

---

### DisposeAsync {/* #api-response-dispose */}



Disposes the body of this response. If not called then the body will stay in memory until the context closes.

**Usage**

```csharp
await ApiResponse.DisposeAsync();
```

**Returns**
- void

---

### Headers {/* #api-response-headers */}



An object with all the response HTTP headers associated with this response.

**Usage**

```csharp
ApiResponse.Headers
```

**Returns**
- IDictionary<string, string>

---

### HeadersArray {/* #api-response-headers-array */}



An array with all the response HTTP headers associated with this response. Header names are not lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```csharp
ApiResponse.HeadersArray
```

**Returns**
- IReadOnlyList<`HttpHeader`>
  - `name` string
    
    Name of the header.
  - `value` string
    
    Value of the header.

---

### JsonAsync {/* #api-response-json */}



Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

**Usage**

```csharp
await ApiResponse.JsonAsync();
```

**Returns**
- JsonElement?

---

### Ok {/* #api-response-ok */}



Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

**Usage**

```csharp
ApiResponse.Ok
```

**Returns**
- bool

---

### SecurityDetailsAsync {/* #api-response-security-details */}



Returns SSL and other security information. Resolves to `null` for non-HTTPS responses. For redirected requests, returns the information for the last request in the redirect chain.

**Usage**

```csharp
await ApiResponse.SecurityDetailsAsync();
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

### ServerAddrAsync {/* #api-response-server-addr */}



Returns the IP address and port of the server. Resolves to `null` if the server address is not available. For redirected requests, returns the information for the last request in the redirect chain.

**Usage**

```csharp
await ApiResponse.ServerAddrAsync();
```

**Returns**
- ServerAddr?
  - `ipAddress` string
    
    IPv4 or IPV6 address of the server.
  - `port` int
    
    
---

### Status {/* #api-response-status */}



Contains the status code of the response (e.g., 200 for a success).

**Usage**

```csharp
ApiResponse.Status
```

**Returns**
- int

---

### StatusText {/* #api-response-status-text */}



Contains the status text of the response (e.g. usually an "OK" for a success).

**Usage**

```csharp
ApiResponse.StatusText
```

**Returns**
- string

---

### TextAsync {/* #api-response-text */}



Returns the text representation of response body.

**Usage**

```csharp
await ApiResponse.TextAsync();
```

**Returns**
- string

---

### Timing {/* #api-response-timing */}



Returns resource timing information for given response. For redirected requests, returns the information for the last request in the redirect chain. When the response is served [from the HAR file](../mock.mdx#replaying-from-har), timing information is not available and all the values are -1. Find more information at [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

**Usage**

```csharp
ApiResponse.Timing
```

**Returns**
- Timing
  - `startTime` float
    
    Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC
  - `domainLookupStart` float
    
    Time immediately before the client starts the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `domainLookupEnd` float
    
    Time immediately after the client ends the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectStart` float
    
    Time immediately before the client starts establishing the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `secureConnectionStart` float
    
    Time immediately before the client starts the handshake process to secure the current connection. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectEnd` float
    
    Time immediately after the client establishes the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `requestStart` float
    
    Time immediately before the client starts requesting the resource from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseStart` float
    
    Time immediately after the client receives the first byte of the response from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseEnd` float
    
    Time immediately after the client receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first. The value is given in milliseconds relative to `startTime`, -1 if not available.

---

### Url {/* #api-response-url */}



Contains the URL of the response.

**Usage**

```csharp
ApiResponse.Url
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
