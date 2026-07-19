# Route

> **Source:** [playwright.dev/python/docs/api/class-route](https://playwright.dev/python/docs/api/class-route)

---

Whenever a network route is set up with [page.route()](/api/class-page.mdx#page-route) or [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route), the `Route` object allows to handle the route.

Learn more about [networking](../network.mdx).


---

## Methods

### abort {/* #route-abort */}



Aborts the route's request.

**Usage**

```python
route.abort()
route.abort(**kwargs)
```

**Arguments**
- `error_code` str *(optional)*
  
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
- NoneType

---

### continue_ {/* #route-continue */}



Sends route's request to the network with optional overrides.

**Usage**

**sync**

```py
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.continue_(headers=headers)

page.route("**/*", handle)
```

**async**

```py
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.continue_(headers=headers)

await page.route("**/*", handle)
```

**Arguments**
- `headers` Dict\[str, str\] *(optional)*
  
  If set changes the request HTTP headers. Header values will be converted to a string.
- `method` str *(optional)*
  
  If set changes the request method (e.g. GET or POST).
- `post_data` str | bytes | Dict *(optional)*
  
  If set changes the post data of request.
- `url` str *(optional)*
  
  If set changes the request URL. New URL must have same protocol as original one.

**Returns**
- NoneType

**Details**

The [headers](/api/class-route.mdx#route-continue-option-headers) option applies to both the routed request and any redirects it initiates. However, [url](/api/class-route.mdx#route-continue-option-url), [method](/api/class-route.mdx#route-continue-option-method), and [post_data](/api/class-route.mdx#route-continue-option-post-data) only apply to the original request and are not carried over to redirected requests.

[route.continue_()](/api/class-route.mdx#route-continue) will immediately send the request to the network, other matching handlers won't be invoked. Use [route.fallback()](/api/class-route.mdx#route-fallback) If you want next matching handler in the chain to be invoked.

:::warning

Some request headers are **forbidden** and cannot be overridden (for example, `Cookie`, `Host`, `Content-Length` and others, see [this MDN page](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header) for full list). If an override is provided for a forbidden header, it will be ignored and the original request header will be used.

To set custom cookies, use [browser_context.add_cookies()](/api/class-browsercontext.mdx#browser-context-add-cookies).
:::

---

### fallback {/* #route-fallback */}



Continues route's request with optional overrides. The method is similar to [route.continue_()](/api/class-route.mdx#route-continue) with the difference that other matching handlers will be invoked before sending the request.

**Usage**

When several routes match the given pattern, they run in the order opposite to their registration. That way the last registered route can always override all the previous ones. In the example below, request will be handled by the bottom-most handler first, then it'll fall back to the previous one and in the end will be aborted by the first registered route.

**sync**

```py
page.route("**/*", lambda route: route.abort())  # Runs last.
page.route("**/*", lambda route: route.fallback())  # Runs second.
page.route("**/*", lambda route: route.fallback())  # Runs first.
```

**async**

```py
await page.route("**/*", lambda route: route.abort())  # Runs last.
await page.route("**/*", lambda route: route.fallback())  # Runs second.
await page.route("**/*", lambda route: route.fallback())  # Runs first.
```

Registering multiple routes is useful when you want separate handlers to handle different kinds of requests, for example API calls vs page resources or GET requests vs POST requests as in the example below.

**sync**

```py
# Handle GET requests.
def handle_get(route):
    if route.request.method != "GET":
        route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
def handle_post(route):
    if route.request.method != "POST":
        route.fallback()
        return
  # Handling POST only.
  # ...

page.route("**/*", handle_get)
page.route("**/*", handle_post)
```

**async**

```py
# Handle GET requests.
async def handle_get(route):
    if route.request.method != "GET":
        await route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
async def handle_post(route):
    if route.request.method != "POST":
        await route.fallback()
        return
  # Handling POST only.
  # ...

await page.route("**/*", handle_get)
await page.route("**/*", handle_post)
```

One can also modify request while falling back to the subsequent handler, that way intermediate route handler can modify url, method, headers and postData of the request.

**sync**

```py
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.fallback(headers=headers)

page.route("**/*", handle)
```

**async**

```py
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.fallback(headers=headers)

await page.route("**/*", handle)
```

Use [route.continue_()](/api/class-route.mdx#route-continue) to immediately send the request to the network, other matching handlers won't be invoked in that case.

**Arguments**
- `headers` Dict\[str, str\] *(optional)*
  
  If set changes the request HTTP headers. Header values will be converted to a string.
- `method` str *(optional)*
  
  If set changes the request method (e.g. GET or POST).
- `post_data` str | bytes | Dict *(optional)*
  
  If set changes the post data of request.
- `url` str *(optional)*
  
  If set changes the request URL. New URL must have same protocol as original one. Changing the URL won't affect the route matching, all the routes are matched using the original request URL.

**Returns**
- NoneType

---

### fetch {/* #route-fetch */}



Performs the request and fetches result without fulfilling it, so that the response could be modified and then fulfilled.

**Usage**

**sync**

```py
def handle(route):
    response = route.fetch()
    json = response.json()
    json"message""big_red_dog" = []
    route.fulfill(response=response, json=json)

page.route("https://dog.ceo/api/breeds/list/all", handle)
```

**async**

```py
async def handle(route):
    response = await route.fetch()
    json = await response.json()
    json"message""big_red_dog" = []
    await route.fulfill(response=response, json=json)

await page.route("https://dog.ceo/api/breeds/list/all", handle)
```

**Arguments**
- `headers` Dict\[str, str\] *(optional)*
  
  If set changes the request HTTP headers. Header values will be converted to a string.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `method` str *(optional)*
  
  If set changes the request method (e.g. GET or POST).
- `post_data` str | bytes | Dict *(optional)*
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `timeout` float *(optional)* 
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `url` str *(optional)*
  
  If set changes the request URL. New URL must have same protocol as original one.

**Returns**
- APIResponse

**Details**

Note that [headers](/api/class-route.mdx#route-fetch-option-headers) option will apply to the fetched request as well as any redirects initiated by it. If you want to only apply [headers](/api/class-route.mdx#route-fetch-option-headers) to the original request, but not to redirects, look into [route.continue_()](/api/class-route.mdx#route-continue) instead.

---

### fulfill {/* #route-fulfill */}



Fulfills route's request with given response.

**Usage**

An example of fulfilling all requests with 404 responses:

**sync**

```py
page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

**async**

```py
await page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

An example of serving static file:

**sync**

```py
page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

**async**

```py
await page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

**Arguments**
- `body` str | bytes *(optional)*
  
  Response body.
- `content_type` str *(optional)*
  
  If set, equals to setting `Content-Type` response header.
- `headers` Dict\[str, str\] *(optional)*
  
  Response headers. Header values will be converted to a string.
- `json` Dict *(optional)* 
  
  JSON response. This method will set the content type to `application/json` if not set.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  File path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory.
- `response` APIResponse *(optional)* 
  
  APIResponse to fulfill route's request with. Individual fields of the response (such as headers) can be overridden using fulfill options.
- `status` int *(optional)*
  
  Response status code, defaults to `200`.

**Returns**
- NoneType

---

## Properties

### request {/* #route-request */}



A request to be routed.

**Usage**

```python
route.request
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
