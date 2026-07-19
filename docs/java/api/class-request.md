# Request

> **Source:** [playwright.dev/java/docs/api/class-request](https://playwright.dev/java/docs/api/class-request)

---

Whenever the page sends a request for a network resource the following sequence of events are emitted by Page:
* [Page.onRequest(handler)](/api/class-page.mdx#page-event-request) emitted when the request is issued by the page.
* [Page.onResponse(handler)](/api/class-page.mdx#page-event-response) emitted when/if the response status and headers are received for the request.
* [Page.onRequestFinished(handler)](/api/class-page.mdx#page-event-request-finished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event), the  [Page.onRequestFailed(handler)](/api/class-page.mdx#page-event-request-failed) event is emitted.

:::note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `'requestfinished'` event.
:::

If request gets a 'redirect' response, the request is successfully finished with the `requestfinished` event, and a new request is  issued to a redirected url.


---

## Methods

### allHeaders {/* #request-all-headers */}



An object with all the request HTTP headers associated with this request. The header names are lower-cased.

**Usage**

```java
Request.allHeaders();
```

**Returns**
- Map<String, String>

---

### existingResponse {/* #request-existing-response */}



Returns the Response object if the response has already been received, `null` otherwise.

Unlike [Request.response()](/api/class-request.mdx#request-response), this method does not wait for the response to arrive. It returns immediately with the response object if the response has been received, or `null` if the response has not been received yet.

**Usage**

```java
Request.existingResponse();
```

**Returns**
- null | Response

---

### failure {/* #request-failure */}



The method returns `null` unless this request has failed, as reported by `requestfailed` event.

**Usage**

Example of logging of all the failed requests:

```java
page.onRequestFailed(request -> {
  System.out.println(request.url() + " " + request.failure());
});
```

**Returns**
- null | String

---

### frame {/* #request-frame */}



Returns the Frame that initiated this request.

**Usage**

```java
String frameUrl = request.frame().url();
```

**Returns**
- Frame

**Details**

Note that in some cases the frame is not available, and this method will throw.
* When request originates in the Service Worker. You can use `request.serviceWorker()` to check that.
* When navigation request is issued before the corresponding frame is created. You can use [Request.isNavigationRequest()](/api/class-request.mdx#request-is-navigation-request) to check that.

Here is an example that handles all the cases:

---

### headerValue {/* #request-header-value */}



Returns the value of the header matching the name. The name is case-insensitive.

**Usage**

```java
Request.headerValue(name);
```

**Arguments**
- `name` String
  
  Name of the header.

**Returns**
- null | String

---

### headers {/* #request-headers */}



An object with the request HTTP headers. The header names are lower-cased. Note that this method does not return security-related headers, including cookie-related ones. You can use [Request.allHeaders()](/api/class-request.mdx#request-all-headers) for complete list of headers that include `cookie` information.

**Usage**

```java
Request.headers();
```

**Returns**
- Map<String, String>

---

### headersArray {/* #request-headers-array */}



An array with all the request HTTP headers associated with this request. Unlike [Request.allHeaders()](/api/class-request.mdx#request-all-headers), header names are NOT lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```java
Request.headersArray();
```

**Returns**
- List<`HttpHeader`>
  - `name` String
    
    Name of the header.
  - `value` String
    
    Value of the header.

---

### isNavigationRequest {/* #request-is-navigation-request */}



Whether this request is driving frame's navigation.

Some navigation requests are issued before the corresponding frame is created, and therefore do not have [Request.frame()](/api/class-request.mdx#request-frame) available.

**Usage**

```java
Request.isNavigationRequest();
```

**Returns**
- boolean

---

### method {/* #request-method */}



Request's method (GET, POST, etc.)

**Usage**

```java
Request.method();
```

**Returns**
- String

---

### postData {/* #request-post-data */}



Request's post body, if any.

**Usage**

```java
Request.postData();
```

**Returns**
- null | String

---

### postDataBuffer {/* #request-post-data-buffer */}



Request's post body in a binary form, if any.

**Usage**

```java
Request.postDataBuffer();
```

**Returns**
- null | byte&#91;&#93;

---

### redirectedFrom {/* #request-redirected-from */}



Request that was redirected by the server to this one, if any.

When the server responds with a redirect, Playwright creates a new Request object. The two requests are connected by `redirectedFrom()` and `redirectedTo()` methods. When multiple server redirects has happened, it is possible to construct the whole redirect chain by repeatedly calling `redirectedFrom()`.

**Usage**

For example, if the website `http://example.com` redirects to `https://example.com`:

```java
Response response = page.navigate("http://example.com");
System.out.println(response.request().redirectedFrom().url()); // "http://example.com"
```

If the website `https://google.com` has no redirects:

```java
Response response = page.navigate("https://google.com");
System.out.println(response.request().redirectedFrom()); // null
```

**Returns**
- null | Request

---

### redirectedTo {/* #request-redirected-to */}



New request issued by the browser if the server responded with redirect.

**Usage**

This method is the opposite of [Request.redirectedFrom()](/api/class-request.mdx#request-redirected-from):

```java
System.out.println(request.redirectedFrom().redirectedTo() == request); // true
```

**Returns**
- null | Request

---

### resourceType {/* #request-resource-type */}



Contains the request's resource type as it was perceived by the rendering engine. ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

**Usage**

```java
Request.resourceType();
```

**Returns**
- String

---

### response {/* #request-response */}



Returns the matching Response object, or `null` if the response was not received due to error.

**Usage**

```java
Request.response();
```

**Returns**
- null | Response

---

### sizes {/* #request-sizes */}



Returns resource size information for given request.

**Usage**

```java
Request.sizes();
```

**Returns**
- Sizes
  - `requestBodySize` int
    
    Size of the request body (POST data payload) in bytes. Set to 0 if there was no body.
  - `requestHeadersSize` int
    
    Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body.
  - `responseBodySize` int
    
    Size of the received response body (encoded) in bytes.
  - `responseHeadersSize` int
    
    Total number of bytes from the start of the HTTP response message until (and including) the double CRLF before the body.

---

### timing {/* #request-timing */}



Returns resource timing information for given request. Most of the timing values become available upon the response, `responseEnd` becomes available when request finishes. Find more information at [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

**Usage**

```java
page.onRequestFinished(request -> {
  Timing timing = request.timing();
  System.out.println(timing.responseEnd - timing.startTime);
});
page.navigate("http://example.com");
```

**Returns**
- Timing
  - `startTime` double
    
    Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC
  - `domainLookupStart` double
    
    Time immediately before the client starts the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `domainLookupEnd` double
    
    Time immediately after the client ends the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectStart` double
    
    Time immediately before the client starts establishing the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `secureConnectionStart` double
    
    Time immediately before the client starts the handshake process to secure the current connection. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectEnd` double
    
    Time immediately after the client establishes the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `requestStart` double
    
    Time immediately before the client starts requesting the resource from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseStart` double
    
    Time immediately after the client receives the first byte of the response from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseEnd` double
    
    Time immediately after the client receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first. The value is given in milliseconds relative to `startTime`, -1 if not available.

---

### url {/* #request-url */}



URL of the request.

**Usage**

```java
Request.url();
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
