# Response

> **Source:** [playwright.dev/java/docs/api/class-response](https://playwright.dev/java/docs/api/class-response)

---

Response class represents responses which are received by page.


---

## Methods

### allHeaders {/* #response-all-headers */}



An object with all the response HTTP headers associated with this response.

**Usage**

```java
Response.allHeaders();
```

**Returns**
- Map<String, String>

---

### body {/* #response-body */}



Returns the buffer with response body.

**Usage**

```java
Response.body();
```

**Returns**
- byte&#91;&#93;

---

### finished {/* #response-finished */}



Waits for this response to finish, returns always `null`.

**Usage**

```java
Response.finished();
```

**Returns**
- null | String

---

### frame {/* #response-frame */}



Returns the Frame that initiated this response.

**Usage**

```java
Response.frame();
```

**Returns**
- Frame

---

### fromServiceWorker {/* #response-from-service-worker */}



Indicates whether this Response was fulfilled by a Service Worker's Fetch Handler (i.e. via [FetchEvent.respondWith](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)).

**Usage**

```java
Response.fromServiceWorker();
```

**Returns**
- boolean

---

### headerValue {/* #response-header-value */}



Returns the value of the header matching the name. The name is case-insensitive. If multiple headers have the same name (except `set-cookie`), they are returned as a list separated by `, `. For `set-cookie`, the `\n` separator is used. If no headers are found, `null` is returned.

**Usage**

```java
Response.headerValue(name);
```

**Arguments**
- `name` String
  
  Name of the header.

**Returns**
- null | String

---

### headerValues {/* #response-header-values */}



Returns all values of the headers matching the name, for example `set-cookie`. The name is case-insensitive.

**Usage**

```java
Response.headerValues(name);
```

**Arguments**
- `name` String
  
  Name of the header.

**Returns**
- List<String>

---

### headers {/* #response-headers */}



An object with the response HTTP headers. The header names are lower-cased. Note that this method does not return security-related headers, including cookie-related ones. You can use [Response.allHeaders()](/api/class-response.mdx#response-all-headers) for complete list of headers that include `cookie` information.

**Usage**

```java
Response.headers();
```

**Returns**
- Map<String, String>

---

### headersArray {/* #response-headers-array */}



An array with all the request HTTP headers associated with this response. Unlike [Response.allHeaders()](/api/class-response.mdx#response-all-headers), header names are NOT lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```java
Response.headersArray();
```

**Returns**
- List<`HttpHeader`>
  - `name` String
    
    Name of the header.
  - `value` String
    
    Value of the header.

---

### httpVersion {/* #response-http-version */}



Returns the http version used by the response.

**Usage**

```java
Response.httpVersion();
```

**Returns**
- String

---

### ok {/* #response-ok */}



Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

**Usage**

```java
Response.ok();
```

**Returns**
- boolean

---

### request {/* #response-request */}



Returns the matching Request object.

**Usage**

```java
Response.request();
```

**Returns**
- Request

---

### securityDetails {/* #response-security-details */}



Returns SSL and other security information.

**Usage**

```java
Response.securityDetails();
```

**Returns**
- null | SecurityDetails
  - `issuer` String *(optional)*
    
    Common Name component of the Issuer field. from the certificate. This should only be used for informational purposes. Optional.
  - `protocol` String *(optional)*
    
    The specific TLS protocol used. (e.g. `TLS 1.3`). Optional.
  - `subjectName` String *(optional)*
    
    Common Name component of the Subject field from the certificate. This should only be used for informational purposes. Optional.
  - `validFrom` double *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes valid. Optional.
  - `validTo` double *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes invalid. Optional.

---

### serverAddr {/* #response-server-addr */}



Returns the IP address and port of the server.

**Usage**

```java
Response.serverAddr();
```

**Returns**
- null | ServerAddr
  - `ipAddress` String
    
    IPv4 or IPV6 address of the server.
  - `port` int
    
    
---

### status {/* #response-status */}



Contains the status code of the response (e.g., 200 for a success).

**Usage**

```java
Response.status();
```

**Returns**
- int

---

### statusText {/* #response-status-text */}



Contains the status text of the response (e.g. usually an "OK" for a success).

**Usage**

```java
Response.statusText();
```

**Returns**
- String

---

### text {/* #response-text */}



Returns the text representation of response body.

**Usage**

```java
Response.text();
```

**Returns**
- String

---

### url {/* #response-url */}



Contains the URL of the response.

**Usage**

```java
Response.url();
```

**Returns**
- String


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
PlaywrightException: /api/class-playwrightexception.mdx "PlaywrightException"
Request: /api/class-request.mdx "Request"
RequestOptions: /api/class-requestoptions.mdx "RequestOptions"
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

boolean: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "boolean"
byte&#91;&#93;: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "byte[]"
Consumer: https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html "Consumer"
Date: https://docs.oracle.com/javase/8/docs/api/java/util/Date.html "Date"
double: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "double"
InputStream: https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html "InputStream"
int: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "int"
long: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html "long"
JsonObject: https://www.javadoc.io/doc/com.google.code.gson/gson/latest/com.google.gson/com/google/gson/JsonObject.html "JsonObject"
List: https://docs.oracle.com/javase/8/docs/api/java/util/List.html "List"
Map: https://docs.oracle.com/javase/8/docs/api/java/util/Map.html "Map"
null: https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.7 "null"
Object: https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html "Object"
Path: https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html "Path"
Pattern: https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html "Pattern"
Predicate: https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html "Predicate"
void: https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html "void"
Runnable: https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html "Runnable"
RuntimeException: https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html "RuntimeException"
String: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html "String"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/java/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/java/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-java/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
