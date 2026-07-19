# APIResponse

> **Source:** [playwright.dev/python/docs/api/class-apiresponse](https://playwright.dev/python/docs/api/class-apiresponse)

---

APIResponse class represents responses returned by [api_request_context.get()](/api/class-apirequestcontext.mdx#api-request-context-get) and similar methods.

**sync**

```py
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    context = playwright.request.new_context()
    response = context.get("https://example.com/user/repos")
    assert response.ok
    assert response.status == 200
    assert response.headers"content-type" == "application/json; charset=utf-8"
    assert response.json()"name" == "foobar"
    assert response.body() == '{"status": "ok"}'
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    context = await playwright.request.new_context()
    response = await context.get("https://example.com/user/repos")
    assert response.ok
    assert response.status == 200
    assert response.headers"content-type" == "application/json; charset=utf-8"
    json_data = await response.json()
    assert json_data"name" == "foobar"
    assert await response.body() == '{"status": "ok"}'


async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```


---

## Methods

### body {/* #api-response-body */}



Returns the buffer with response body.

**Usage**

```python
api_response.body()
```

**Returns**
- bytes

---

### dispose {/* #api-response-dispose */}



Disposes the body of this response. If not called then the body will stay in memory until the context closes.

**Usage**

```python
api_response.dispose()
```

**Returns**
- NoneType

---

### json {/* #api-response-json */}



Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

**Usage**

```python
api_response.json()
```

**Returns**
- Dict

---

### security_details {/* #api-response-security-details */}



Returns SSL and other security information. Resolves to `null` for non-HTTPS responses. For redirected requests, returns the information for the last request in the redirect chain.

**Usage**

```python
api_response.security_details()
```

**Returns**
- NoneType | Dict
  - `issuer` str *(optional)*
    
    Common Name component of the Issuer field. from the certificate. This should only be used for informational purposes. Optional.
  - `protocol` str *(optional)*
    
    The specific TLS protocol used. (e.g. `TLS 1.3`). Optional.
  - `subjectName` str *(optional)*
    
    Common Name component of the Subject field from the certificate. This should only be used for informational purposes. Optional.
  - `validFrom` float *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes valid. Optional.
  - `validTo` float *(optional)*
    
    Unix timestamp (in seconds) specifying when this cert becomes invalid. Optional.

---

### server_addr {/* #api-response-server-addr */}



Returns the IP address and port of the server. Resolves to `null` if the server address is not available. For redirected requests, returns the information for the last request in the redirect chain.

**Usage**

```python
api_response.server_addr()
```

**Returns**
- NoneType | Dict
  - `ipAddress` str
    
    IPv4 or IPV6 address of the server.
  - `port` int
    
    
---

### text {/* #api-response-text */}



Returns the text representation of response body.

**Usage**

```python
api_response.text()
```

**Returns**
- str

---

## Properties

### headers {/* #api-response-headers */}



An object with all the response HTTP headers associated with this response.

**Usage**

```python
api_response.headers
```

**Returns**
- Dict\[str, str\]

---

### headers_array {/* #api-response-headers-array */}



An array with all the response HTTP headers associated with this response. Header names are not lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

**Usage**

```python
api_response.headers_array
```

**Returns**
- List\[Dict\]
  - `name` str
    
    Name of the header.
  - `value` str
    
    Value of the header.

---

### ok {/* #api-response-ok */}



Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

**Usage**

```python
api_response.ok
```

**Returns**
- bool

---

### status {/* #api-response-status */}



Contains the status code of the response (e.g., 200 for a success).

**Usage**

```python
api_response.status
```

**Returns**
- int

---

### status_text {/* #api-response-status-text */}



Contains the status text of the response (e.g. usually an "OK" for a success).

**Usage**

```python
api_response.status_text
```

**Returns**
- str

---

### timing {/* #api-response-timing */}



Returns resource timing information for given response. For redirected requests, returns the information for the last request in the redirect chain. When the response is served [from the HAR file](../mock.mdx#replaying-from-har), timing information is not available and all the values are -1. Find more information at [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

**Usage**

```python
api_response.timing
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

### url {/* #api-response-url */}



Contains the URL of the response.

**Usage**

```python
api_response.url
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
