# Request

> **Source:** [playwright.dev/python/docs/api/class-request](https://playwright.dev/python/docs/api/class-request)

---

Whenever the page sends a request for a network resource the following sequence of events are emitted by Page:
* [page.on("request")](/api/class-page.mdx#page-event-request) emitted when the request is issued by the page.
* [page.on("response")](/api/class-page.mdx#page-event-response) emitted when/if the response status and headers are received for the request.
* [page.on("requestfinished")](/api/class-page.mdx#page-event-request-finished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event), the  [page.on("requestfailed")](/api/class-page.mdx#page-event-request-failed) event is emitted.

:::note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `'requestfinished'` event.
:::

If request gets a 'redirect' response, the request is successfully finished with the `requestfinished` event, and a new request is  issued to a redirected url.


---

## Methods

### all_headers {/* #request-all-headers */}



An object with all the request HTTP headers associated with this request. The header names are lower-cased.

**Usage**

```python
request.all_headers()
```

**Returns**
- Dict\[str, str\]

---

### header_value {/* #request-header-value */}



Returns the value of the header matching the name. The name is case-insensitive.

**Usage**

```python
request.header_value(name)
```

**Arguments**
- `name` str
  
  Name of the header.

**Returns**
- NoneType | str

---

### headers_array {/* #request-headers-array */}



An array with all the request HTTP headers associated with this request. Unlike [request.all_headers()](/api/class-request.mdx#request-all-headers), header names are NOT lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```python
request.headers_array()
```

**Returns**
- List\[Dict\]
  - `name` str
    
    Name of the header.
  - `value` str
    
    Value of the header.

---

### response {/* #request-response */}



Returns the matching Response object, or `null` if the response was not received due to error.

**Usage**

```python
request.response()
```

**Returns**
- NoneType | Response

---

### sizes {/* #request-sizes */}



Returns resource size information for given request.

**Usage**

```python
request.sizes()
```

**Returns**
- Dict
  - `requestBodySize` int
    
    Size of the request body (POST data payload) in bytes. Set to 0 if there was no body.
  - `requestHeadersSize` int
    
    Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body.
  - `responseBodySize` int
    
    Size of the received response body (encoded) in bytes.
  - `responseHeadersSize` int
    
    Total number of bytes from the start of the HTTP response message until (and including) the double CRLF before the body.

---

## Properties

### existing_response {/* #request-existing-response */}



Returns the Response object if the response has already been received, `null` otherwise.

Unlike [request.response()](/api/class-request.mdx#request-response), this method does not wait for the response to arrive. It returns immediately with the response object if the response has been received, or `null` if the response has not been received yet.

**Usage**

```python
request.existing_response
```

**Returns**
- NoneType | Response

---

### failure {/* #request-failure */}



The method returns `null` unless this request has failed, as reported by `requestfailed` event.

**Usage**

Example of logging of all the failed requests:

```py
page.on("requestfailed", lambda request: print(request.url + " " + request.failure))
```

**Returns**
- NoneType | str

---

### frame {/* #request-frame */}



Returns the Frame that initiated this request.

**Usage**

```py
frame_url = request.frame.url
```

**Returns**
- Frame

**Details**

Note that in some cases the frame is not available, and this method will throw.
* When request originates in the Service Worker. You can use `request.serviceWorker()` to check that.
* When navigation request is issued before the corresponding frame is created. You can use [request.is_navigation_request()](/api/class-request.mdx#request-is-navigation-request) to check that.

Here is an example that handles all the cases:

---

### headers {/* #request-headers */}



An object with the request HTTP headers. The header names are lower-cased. Note that this method does not return security-related headers, including cookie-related ones. You can use [request.all_headers()](/api/class-request.mdx#request-all-headers) for complete list of headers that include `cookie` information.

**Usage**

```python
request.headers
```

**Returns**
- Dict\[str, str\]

---

### is_navigation_request {/* #request-is-navigation-request */}



Whether this request is driving frame's navigation.

Some navigation requests are issued before the corresponding frame is created, and therefore do not have [request.frame](/api/class-request.mdx#request-frame) available.

**Usage**

```python
request.is_navigation_request()
```

**Returns**
- bool

---

### method {/* #request-method */}



Request's method (GET, POST, etc.)

**Usage**

```python
request.method
```

**Returns**
- str

---

### post_data {/* #request-post-data */}



Request's post body, if any.

**Usage**

```python
request.post_data
```

**Returns**
- NoneType | str

---

### post_data_buffer {/* #request-post-data-buffer */}



Request's post body in a binary form, if any.

**Usage**

```python
request.post_data_buffer
```

**Returns**
- NoneType | bytes

---

### post_data_json {/* #request-post-data-json */}



Returns parsed request's body for `form-urlencoded` and JSON as a fallback if any.

When the response is `application/x-www-form-urlencoded` then a key/value object of the values will be returned. Otherwise it will be parsed as JSON.

**Usage**

```python
request.post_data_json
```

**Returns**
- NoneType | Dict

---

### redirected_from {/* #request-redirected-from */}



Request that was redirected by the server to this one, if any.

When the server responds with a redirect, Playwright creates a new Request object. The two requests are connected by `redirectedFrom()` and `redirectedTo()` methods. When multiple server redirects has happened, it is possible to construct the whole redirect chain by repeatedly calling `redirectedFrom()`.

**Usage**

For example, if the website `http://example.com` redirects to `https://example.com`:

**sync**

```py
response = page.goto("http://example.com")
print(response.request.redirected_from.url) # "http://example.com"
```

**async**

```py
response = await page.goto("http://example.com")
print(response.request.redirected_from.url) # "http://example.com"
```

If the website `https://google.com` has no redirects:

**sync**

```py
response = page.goto("https://google.com")
print(response.request.redirected_from) # None
```

**async**

```py
response = await page.goto("https://google.com")
print(response.request.redirected_from) # None
```

**Returns**
- NoneType | Request

---

### redirected_to {/* #request-redirected-to */}



New request issued by the browser if the server responded with redirect.

**Usage**

This method is the opposite of [request.redirected_from](/api/class-request.mdx#request-redirected-from):

```py
assert request.redirected_from.redirected_to == request
```

**Returns**
- NoneType | Request

---

### resource_type {/* #request-resource-type */}



Contains the request's resource type as it was perceived by the rendering engine. ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

**Usage**

```python
request.resource_type
```

**Returns**
- str

---

### service_worker {/* #request-service-worker */}



The Service Worker that is performing the request.

**Usage**

```python
request.service_worker
```

**Returns**
- NoneType | Worker

**Details**

This method is Chromium only. It's safe to call when using other browsers, but it will always be `null`.

Requests originated in a Service Worker do not have a [request.frame](/api/class-request.mdx#request-frame) available.

---

### timing {/* #request-timing */}



Returns resource timing information for given request. Most of the timing values become available upon the response, `responseEnd` becomes available when request finishes. Find more information at [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

**Usage**

**sync**

```py
with page.expect_event("requestfinished") as request_info:
    page.goto("http://example.com")
request = request_info.value
print(request.timing)
```

**async**

```py
async with page.expect_event("requestfinished") as request_info:
    await page.goto("http://example.com")
request = await request_info.value
print(request.timing)
```

**Returns**
- Dict
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

### url {/* #request-url */}



URL of the request.

**Usage**

```python
request.url
```

**Returns**
- str


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
