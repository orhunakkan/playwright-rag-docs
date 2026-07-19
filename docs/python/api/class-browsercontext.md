# BrowserContext

> **Source:** [playwright.dev/python/docs/api/class-browsercontext](https://playwright.dev/python/docs/api/class-browsercontext)

---

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creating isolated non-persistent browser contexts with [browser.new_context()](/api/class-browser.mdx#browser-new-context) method. Non-persistent browser contexts don't write any browsing data to disk.

**sync**

```py
# create a new incognito browser context
context = browser.new_context()
# create a new page inside context.
page = context.new_page()
page.goto("https://example.com")
# dispose context once it is no longer needed.
context.close()
```

**async**

```py
# create a new incognito browser context
context = await browser.new_context()
# create a new page inside context.
page = await context.new_page()
await page.goto("https://example.com")
# dispose context once it is no longer needed.
await context.close()
```


---

## Methods

### add_cookies {/* #browser-context-add-cookies */}



Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [browser_context.cookies()](/api/class-browsercontext.mdx#browser-context-cookies).

**Usage**

**sync**

```py
browser_context.add_cookies(cookie_object1, cookie_object2)
```

**async**

```py
await browser_context.add_cookies(cookie_object1, cookie_object2)
```

**Arguments**
- `cookies` List\[Dict\]
  - `name` str
    
    
  - `value` str
    
    
  - `url` str *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `domain` str *(optional)*
    
    For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.
  - `path` str *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `expires` float *(optional)*
    
    Unix time in seconds. Optional.
  - `httpOnly` bool *(optional)*
    
    Optional.
  - `secure` bool *(optional)*
    
    Optional.
  - `sameSite` "Strict" | "Lax" | "None" *(optional)*
    
    Optional.
  - `partitionKey` str *(optional)*
    
    For partitioned third-party cookies (aka [CHIPS](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies)), the partition key. Optional.

**Returns**
- NoneType

---

### add_init_script {/* #browser-context-add-init-script */}



Adds a script which would be evaluated in one of the following scenarios:
* Whenever a page is created in the browser context or is navigated.
* Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;
```

**sync**

```py
# in your playwright script, assuming the preload.js file is in same directory.
browser_context.add_init_script(path="preload.js")
```

**async**

```py
# in your playwright script, assuming the preload.js file is in same directory.
await browser_context.add_init_script(path="preload.js")
```

:::note

The order of evaluation of multiple scripts installed via [browser_context.add_init_script()](/api/class-browsercontext.mdx#browser-context-add-init-script) and [page.add_init_script()](/api/class-page.mdx#page-add-init-script) is not defined.
:::

**Arguments**
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.
- `script` str *(optional)*
  
  Script to be evaluated in all pages in the browser context. Optional.

**Returns**
- Disposable

---

### clear_cookies {/* #browser-context-clear-cookies */}



Removes cookies from context. Accepts optional filter.

**Usage**

**sync**

```py
context.clear_cookies()
context.clear_cookies(name="session-id")
context.clear_cookies(domain="my-origin.com")
context.clear_cookies(path="/api/v1")
context.clear_cookies(name="session-id", domain="my-origin.com")
```

**async**

```py
await context.clear_cookies()
await context.clear_cookies(name="session-id")
await context.clear_cookies(domain="my-origin.com")
await context.clear_cookies(path="/api/v1")
await context.clear_cookies(name="session-id", domain="my-origin.com")
```

**Arguments**
- `domain` str | Pattern *(optional)* 
  
  Only removes cookies with the given domain.
- `name` str | Pattern *(optional)* 
  
  Only removes cookies with the given name.
- `path` str | Pattern *(optional)* 
  
  Only removes cookies with the given path.

**Returns**
- NoneType

---

### clear_permissions {/* #browser-context-clear-permissions */}



Clears all permission overrides for the browser context.

**Usage**

**sync**

```py
context = browser.new_context()
context.grant_permissions("clipboard-read")
# do stuff ..
context.clear_permissions()
```

**async**

```py
context = await browser.new_context()
await context.grant_permissions("clipboard-read")
# do stuff ..
context.clear_permissions()
```

**Returns**
- NoneType

---

### close {/* #browser-context-close */}



Closes the browser context. All the pages that belong to the browser context will be closed.

:::note

The default browser context cannot be closed.
:::

**Usage**

```python
browser_context.close()
browser_context.close(**kwargs)
```

**Arguments**
- `reason` str *(optional)* 
  
  The reason to be reported to the operations interrupted by the context closure.

**Returns**
- NoneType

---

### cookies {/* #browser-context-cookies */}



If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

**Usage**

```python
browser_context.cookies()
browser_context.cookies(**kwargs)
```

**Arguments**
- `urls` str | List\[str\] *(optional)*
  
  Optional list of URLs.

**Returns**
- List\[Dict\]
  - `name` str
    
    
  - `value` str
    
    
  - `domain` str
    
    
  - `path` str
    
    
  - `expires` float
    
    Unix time in seconds.
  - `httpOnly` bool
    
    
  - `secure` bool
    
    
  - `sameSite` "Strict" | "Lax" | "None"
    
    
  - `partitionKey` str *(optional)*
    
    
---

### expect_console_message {/* #browser-context-wait-for-console-message */}



Performs action and waits for a ConsoleMessage to be logged by in the pages in the context. If predicate is provided, it passes ConsoleMessage value into the `predicate` function and waits for `predicate(message)` to return a truthy value. Will throw an error if the page is closed before the [browser_context.on("console")](/api/class-browsercontext.mdx#browser-context-event-console) event is fired.

**Usage**

```python
browser_context.expect_console_message()
browser_context.expect_console_message(**kwargs)
```

**Arguments**
- `predicate` Callable\[ConsoleMessage\]:bool *(optional)*
  
  Receives the ConsoleMessage object and resolves to truthy value when the waiting should resolve.
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- EventContextManager\[ConsoleMessage\]

---

### expect_event {/* #browser-context-wait-for-event */}



Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the context closes before the event is fired. Returns the event data value.

**Usage**

**sync**

```py
with context.expect_event("page") as event_info:
    page.get_by_role("button").click()
page = event_info.value
```

**async**

```py
async with context.expect_event("page") as event_info:
    await page.get_by_role("button").click()
page = await event_info.value
```

**Arguments**
- `event` str
  
  Event name, same one would pass into `browserContext.on(event)`.
- `predicate` Callable *(optional)*
  
  Receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- EventContextManager

---

### expect_page {/* #browser-context-wait-for-page */}



Performs action and waits for a new Page to be created in the context. If predicate is provided, it passes Page value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the context closes before new Page is created.

**Usage**

```python
browser_context.expect_page()
browser_context.expect_page(**kwargs)
```

**Arguments**
- `predicate` Callable\[Page\]:bool *(optional)*
  
  Receives the Page object and resolves to truthy value when the waiting should resolve.
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- EventContextManager\[Page\]

---

### expose_binding {/* #browser-context-expose-binding */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-binding-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback). If the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) returns a Promise, it will be awaited.

The first argument of the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [page.expose_binding()](/api/class-page.mdx#page-expose-binding) for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:

**sync**

```py
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    context.expose_binding("pageURL", lambda source: source"page".url)
    page = context.new_page()
    page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    await context.expose_binding("pageURL", lambda source: source"page".url)
    page = await context.new_page()
    await page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    await page.get_by_role("button").click()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

**Arguments**
- `name` str
  
  Name of the function on the window object.
- `callback` Callable
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### expose_function {/* #browser-context-expose-function */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-function-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback).

If the [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) returns a Promise, it will be awaited.

See [page.expose_function()](/api/class-page.mdx#page-expose-function) for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:

**sync**

```py
import hashlib
from playwright.sync_api import sync_playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    context.expose_function("sha256", sha256)
    page = context.new_page()
    page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
import hashlib
from playwright.async_api import async_playwright, Playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    await context.expose_function("sha256", sha256)
    page = await context.new_page()
    await page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    await page.get_by_role("button").click()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

**Arguments**
- `name` str
  
  Name of the function on the window object.
- `callback` Callable
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### grant_permissions {/* #browser-context-grant-permissions */}



Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

**Usage**

```python
browser_context.grant_permissions(permissions)
browser_context.grant_permissions(permissions, **kwargs)
```

**Arguments**
- `permissions` List\[str\]
  
  A list of permissions to grant.
  
  :::danger
  
  Supported permissions differ between browsers, and even between different versions of the same browser. Any permission may stop working after an update.
  :::
  
  Here are some permissions that may be supported by some browsers:
  * `'accelerometer'`
  * `'ambient-light-sensor'`
  * `'background-sync'`
  * `'camera'`
  * `'clipboard-read'`
  * `'clipboard-write'`
  * `'geolocation'`
  * `'gyroscope'`
  * `'local-fonts'`
  * `'local-network-access'`
  * `'magnetometer'`
  * `'microphone'`
  * `'midi-sysex'` (system-exclusive midi)
  * `'midi'`
  * `'notifications'`
  * `'payment-handler'`
  * `'storage-access'`
  * `'screen-wake-lock'`
- `origin` str *(optional)*
  
  The origin to grant permissions to, e.g. "https://example.com".

**Returns**
- NoneType

---

### new_cdp_session {/* #browser-context-new-cdp-session */}



:::note

CDP sessions are only supported on Chromium-based browsers.
:::

Returns the newly created session.

**Usage**

```python
browser_context.new_cdp_session(page)
```

**Arguments**
- `page` Page | Frame
  
  Target to create new session for. For backwards-compatibility, this parameter is named `page`, but it can be a `Page` or `Frame` type.

**Returns**
- CDPSession

---

### new_page {/* #browser-context-new-page */}



Creates a new page in the browser context.

**Usage**

```python
browser_context.new_page()
```

**Returns**
- Page

---

### route {/* #browser-context-route */}



Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note

[browser_context.route()](/api/class-browsercontext.mdx#browser-context-route) will not intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [service_workers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.
:::

**Usage**

An example of a naive handler that aborts all image requests:

**sync**

```py
context = browser.new_context()
page = context.new_page()
context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

**async**

```py
context = await browser.new_context()
page = await context.new_page()
await context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

or the same snippet using a regex pattern instead:

**sync**

```py
context = browser.new_context()
page = context.new_page()
context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
page = context.new_page()
page.goto("https://example.com")
browser.close()
```

**async**

```py
context = await browser.new_context()
page = await context.new_page()
await context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
await page.goto("https://example.com")
await browser.close()
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

**sync**

```py
def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
context.route("/api/**", handle_route)
```

**async**

```py
async def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    await route.fulfill(body="mocked-data")
  else:
    await route.continue_()
await context.route("/api/**", handle_route)
```

Page routes (set up with [page.route()](/api/class-page.mdx#page-route)) take precedence over browser context routes when request matches both handlers.

To remove a route with its handler you can use [browser_context.unroute()](/api/class-browsercontext.mdx#browser-context-unroute).

:::note

Enabling routing disables http cache.
:::

**Arguments**
- `url` str | Pattern | Callable\[URL\]:bool
  
  A glob pattern, regex pattern, or predicate that receives a URL to match during routing. If [base_url](/api/class-browser.mdx#browser-new-context-option-base-url) is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
- `handler` Callable\[Route, Request\]:Promise\[Any\] | Any
  
  handler function to route the request.
- `times` int *(optional)* 
  
  How often a route should be used. By default it will be used every time.

**Returns**
- Disposable

---

### route_from_har {/* #browser-context-route-from-har */}



If specified the network requests that are made in the context will be served from the HAR file. Read more about [Replaying from HAR](../mock.mdx#replaying-from-har).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [service_workers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.

**Usage**

```python
browser_context.route_from_har(har)
browser_context.route_from_har(har, **kwargs)
```

**Arguments**
- `har` Union\[str, pathlib.Path\]
  
  Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.
- `intercept_api_requests` bool *(optional)* 
  
  If set to `true`, requests made via APIRequestContext (such as [browser_context.request](/api/class-browsercontext.mdx#browser-context-request) or [page.request](/api/class-page.mdx#page-request)) are also served from the HAR file. By default these requests are sent to the network, matching the behavior prior to v1.62. Defaults to `false` for backward compatibility.
- `not_found` "abort" | "fallback" *(optional)*
  * If set to 'abort' any request not found in the HAR file will be aborted.
  * If set to 'fallback' falls through to the next route handler in the handler chain.
  
  Defaults to abort.
- `update` bool *(optional)*
  
  If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) is called.
- `update_content` "embed" | "attach" *(optional)* 
  
  Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.
- `update_mode` "full" | "minimal" *(optional)* 
  
  When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.
- `url` str | Pattern *(optional)*
  
  A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

**Returns**
- NoneType

---

### route_web_socket {/* #browser-context-route-web-socket */}



This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages. See WebSocketRoute for more details and examples.

**sync**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message == "to-be-blocked":
    return
  ws.send(message)

def handler(ws: WebSocketRoute):
  ws.route_send(lambda message: message_handler(ws, message))
  ws.connect()

context.route_web_socket("/ws", handler)
```

**async**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message == "to-be-blocked":
    return
  ws.send(message)

async def handler(ws: WebSocketRoute):
  ws.route_send(lambda message: message_handler(ws, message))
  await ws.connect()

await context.route_web_socket("/ws", handler)
```

**Arguments**
- `url` str | Pattern | Callable\[URL\]:bool
  
  Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [base_url](/api/class-browser.mdx#browser-new-context-option-base-url) context option.
- `handler` Callable\[WebSocketRoute\]:Promise\[Any\] | Any
  
  Handler function to route the WebSocket.

**Returns**
- NoneType

---

### set_default_navigation_timeout {/* #browser-context-set-default-navigation-timeout */}



This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [page.go_back()](/api/class-page.mdx#page-go-back)
* [page.go_forward()](/api/class-page.mdx#page-go-forward)
* [page.goto()](/api/class-page.mdx#page-goto)
* [page.reload()](/api/class-page.mdx#page-reload)
* [page.set_content()](/api/class-page.mdx#page-set-content)
* [page.expect_navigation()](/api/class-page.mdx#page-wait-for-navigation)

:::note

[page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout) and [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) take priority over [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout).
:::

**Usage**

```python
browser_context.set_default_navigation_timeout(timeout)
```

**Arguments**
- `timeout` float
  
  Maximum navigation time in milliseconds

---

### set_default_timeout {/* #browser-context-set-default-timeout */}



This setting will change the default maximum time for all the methods accepting [timeout](/api/class-browsercontext.mdx#browser-context-set-default-timeout-option-timeout) option.

:::note

[page.set_default_navigation_timeout()](/api/class-page.mdx#page-set-default-navigation-timeout), [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) and [browser_context.set_default_navigation_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout) take priority over [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
:::

**Usage**

```python
browser_context.set_default_timeout(timeout)
```

**Arguments**
- `timeout` float
  
  Maximum time in milliseconds. Pass `0` to disable timeout.

---

### set_extra_http_headers {/* #browser-context-set-extra-http-headers */}



The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [page.set_extra_http_headers()](/api/class-page.mdx#page-set-extra-http-headers). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

:::note

[browser_context.set_extra_http_headers()](/api/class-browsercontext.mdx#browser-context-set-extra-http-headers) does not guarantee the order of headers in the outgoing requests.
:::

**Usage**

```python
browser_context.set_extra_http_headers(headers)
```

**Arguments**
- `headers` Dict\[str, str\]
  
  An object containing additional HTTP headers to be sent with every request. All header values must be strings.

**Returns**
- NoneType

---

### set_geolocation {/* #browser-context-set-geolocation */}



Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**

**sync**

```py
browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

**async**

```py
await browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

:::note

Consider using [browser_context.grant_permissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) to grant permissions for the browser context pages to read its geolocation.
:::

**Arguments**
- `geolocation` NoneType | Dict
  - `latitude` float
    
    Latitude between -90 and 90.
  - `longitude` float
    
    Longitude between -180 and 180.
  - `accuracy` float *(optional)*
    
    Non-negative accuracy value. Defaults to `0`.

**Returns**
- NoneType

---

### set_offline {/* #browser-context-set-offline */}



**Usage**

```python
browser_context.set_offline(offline)
```

**Arguments**
- `offline` bool
  
  Whether to emulate network being offline for the browser context.

**Returns**
- NoneType

---

### set_storage_state {/* #browser-context-set-storage-state */}



Clears the existing cookies, local storage, IndexedDB entries and virtual WebAuthn credentials, and sets the new storage state. When the storage state contains credentials, the virtual WebAuthn authenticator is installed (equivalent to [credentials.install()](/api/class-credentials.mdx#credentials-install)), preventing all real authenticators from working in this context.

**Usage**

**sync**

```py
# Load storage state from a file and apply it to the context.
context.set_storage_state("state.json")
```

**async**

```py
# Load storage state from a file and apply it to the context.
await context.set_storage_state("state.json")
```

**Arguments**
- `storage_state` Union\[str, pathlib.Path\] | Dict
  - `cookies` List\[Dict\]
    - `name` str
      
      
    - `value` str
      
      
    - `domain` str
      
      Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"
    - `path` str
      
      Domain and path are required
    - `expires` float
      
      Unix time in seconds.
    - `httpOnly` bool
      
      
    - `secure` bool
      
      
    - `sameSite` "Strict" | "Lax" | "None"
      
      sameSite flag
    
    Cookies to set for context
  - `origins` List\[Dict\]
    - `origin` str
      
      
    - `localStorage` List\[Dict\]
      - `name` str
        
        
      - `value` str
        
        
      localStorage to set for context
    
    
  Learn more about [storage state and auth](../auth.mdx).
  
  Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [browser_context.storage_state()](/api/class-browsercontext.mdx#browser-context-storage-state).

**Returns**
- NoneType

---

### storage_state {/* #browser-context-storage-state */}



Returns storage state for this browser context, contains current cookies, local storage snapshot, IndexedDB snapshot and virtual WebAuthn credentials.

**Usage**

```python
browser_context.storage_state()
browser_context.storage_state(**kwargs)
```

**Arguments**
- `credentials` bool *(optional)* 
  
  Set to `true` to include the context's virtual WebAuthn [browser_context.credentials](/api/class-browsercontext.mdx#browser-context-credentials) (passkeys) in the storage state snapshot. The captured credentials carry their private keys, so they can be re-seeded into a later context via the [storage_state](/api/class-browser.mdx#browser-new-context-option-storage-state) option or [browser_context.set_storage_state()](/api/class-browsercontext.mdx#browser-context-set-storage-state). Note that restoring the storage state that contains credentials will automatically install the virtual WebAuthn authenticator (see [credentials.install()](/api/class-credentials.mdx#credentials-install)), and prevent all real authenticators from working in this context.
- `indexed_db` bool *(optional)* 
  
  Set to `true` to include [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) in the storage state snapshot. If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  The file path to save the storage state to. If [path](/api/class-browsercontext.mdx#browser-context-storage-state-option-path) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.

**Returns**
- Dict
  - `cookies` List\[Dict\]
    - `name` str
      
      
    - `value` str
      
      
    - `domain` str
      
      
    - `path` str
      
      
    - `expires` float
      
      Unix time in seconds.
    - `httpOnly` bool
      
      
    - `secure` bool
      
      
    - `sameSite` "Strict" | "Lax" | "None"
      
      
    
  - `origins` List\[Dict\]
    - `origin` str
      
      
    - `localStorage` List\[Dict\]
      - `name` str
        
        
      - `value` str
        
        
      
    
---

### unroute {/* #browser-context-unroute */}



Removes a route created with [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route). When [handler](/api/class-browsercontext.mdx#browser-context-unroute-option-handler) is not specified, removes all routes for the [url](/api/class-browsercontext.mdx#browser-context-unroute-option-url).

**Usage**

```python
browser_context.unroute(url)
browser_context.unroute(url, **kwargs)
```

**Arguments**
- `url` str | Pattern | Callable\[URL\]:bool
  
  A glob pattern, regex pattern, or predicate receiving URL used to register a routing with [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route).
- `handler` Callable\[Route, Request\]:Promise\[Any\] | Any *(optional)*
  
  Optional handler function used to register a routing with [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route).

**Returns**
- NoneType

---

### unroute_all {/* #browser-context-unroute-all */}



Removes all routes created with [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route) and [browser_context.route_from_har()](/api/class-browsercontext.mdx#browser-context-route-from-har).

**Usage**

```python
browser_context.unroute_all()
browser_context.unroute_all(**kwargs)
```

**Arguments**
- `behavior` "wait" | "ignoreErrors" | "default" *(optional)*
  
  Specifies whether to wait for already running handlers and what to do if they throw errors:
  * `'default'` - do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may result in unhandled error
  * `'wait'` - wait for current handler calls (if any) to finish
  * `'ignoreErrors'` - do not wait for current handler calls (if any) to finish, all errors thrown by the handlers after unrouting are silently caught

**Returns**
- NoneType

---

### wait_for_event {/* #browser-context-wait-for-event-2 */}



:::note

In most cases, you should use [browser_context.expect_event()](/api/class-browsercontext.mdx#browser-context-wait-for-event).
:::

Waits for given `event` to fire. If predicate is provided, it passes event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the browser context is closed before the `event` is fired.

**Usage**

```python
browser_context.wait_for_event(event)
browser_context.wait_for_event(event, **kwargs)
```

**Arguments**
- `event` str
  
  Event name, same one typically passed into `*.on(event)`.
- `predicate` Callable *(optional)*
  
  Receives the event data and resolves to truthy value when the waiting should resolve.
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- Any

---

## Properties

### browser {/* #browser-context-browser */}



Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.

**Usage**

```python
browser_context.browser
```

**Returns**
- NoneType | Browser

---

### clock {/* #browser-context-clock */}



Playwright has ability to mock clock and passage of time.

**Usage**

```python
browser_context.clock
```

**Type**
- Clock

---

### credentials {/* #browser-context-credentials */}



Virtual WebAuthn authenticator for this context. Lets tests seed credentials and intercept `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies.

**Usage**

```python
browser_context.credentials
```

**Type**
- Credentials

---

### debugger {/* #browser-context-debugger */}



Debugger allows to pause and resume the execution.

**Usage**

```python
browser_context.debugger
```

**Type**
- Debugger

---

### is_closed {/* #browser-context-is-closed */}



Indicates that the browser context is in the process of closing or has already been closed.

**Usage**

```python
browser_context.is_closed()
```

**Returns**
- bool

---

### pages {/* #browser-context-pages */}



Returns all open pages in the context.

**Usage**

```python
browser_context.pages
```

**Returns**
- List\[Page\]

---

### request {/* #browser-context-request */}



API testing helper associated with this context. Requests made with this API will use context cookies.

**Usage**

```python
browser_context.request
```

**Type**
- APIRequestContext

---

### service_workers {/* #browser-context-service-workers */}



:::note

Service workers are only supported on Chromium-based browsers.
:::

All existing service workers in the context.

**Usage**

```python
browser_context.service_workers
```

**Returns**
- List\[Worker\]

---

### tracing {/* #browser-context-tracing */}



**Usage**

```python
browser_context.tracing
```

**Type**
- Tracing

---

## Events

### on("close") {/* #browser-context-event-close */}



Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [browser.close()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```python
browser_context.on("close", handler)
```

**Event data**
- BrowserContext

---

### on("console") {/* #browser-context-event-console */}



Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the ConsoleMessage event handler argument.

**Usage**

**sync**

```py
def print_args(msg):
    for arg in msg.args:
        print(arg.json_value())

context.on("console", print_args)
page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

**async**

```py
async def print_args(msg):
    values = []
    for arg in msg.args:
        values.append(await arg.json_value())
    print(values)

context.on("console", print_args)
await page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

**Event data**
- ConsoleMessage

---

### on("dialog") {/* #browser-context-event-dialog */}



Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [dialog.accept()](/api/class-dialog.mdx#dialog-accept) or [dialog.dismiss()](/api/class-dialog.mdx#dialog-dismiss) the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.

**Usage**

```python
context.on("dialog", lambda dialog: dialog.accept())
```

:::note
When no [page.on("dialog")](/api/class-page.mdx#page-event-dialog) or [browser_context.on("dialog")](/api/class-browsercontext.mdx#browser-context-event-dialog) listeners are present, all dialogs are automatically dismissed.
:::

**Event data**
- Dialog

---

### on("download") {/* #browser-context-event-download */}



Emitted when attachment download started in any page belonging to this context. User can access basic file operations on downloaded content via the passed Download instance. See also [page.on("download")](/api/class-page.mdx#page-event-download) to receive events about a specific page.

**Usage**

```python
browser_context.on("download", handler)
```

**Event data**
- Download

---

### on("frameattached") {/* #browser-context-event-frame-attached */}



Emitted when a frame is attached in any page belonging to this context. See also [page.on("frameattached")](/api/class-page.mdx#page-event-frame-attached) to receive events about a specific page.

**Usage**

```python
browser_context.on("frameattached", handler)
```

**Event data**
- Frame

---

### on("framedetached") {/* #browser-context-event-frame-detached */}



Emitted when a frame is detached in any page belonging to this context. See also [page.on("framedetached")](/api/class-page.mdx#page-event-frame-detached) to receive events about a specific page.

**Usage**

```python
browser_context.on("framedetached", handler)
```

**Event data**
- Frame

---

### on("framenavigated") {/* #browser-context-event-frame-navigated */}



Emitted when a frame is navigated to a new url in any page belonging to this context. See also [page.on("framenavigated")](/api/class-page.mdx#page-event-frame-navigated) to receive events about navigations in a specific page.

**Usage**

```python
browser_context.on("framenavigated", handler)
```

**Event data**
- Frame

---

### on("page") {/* #browser-context-event-page */}



The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [page.on("popup")](/api/class-page.mdx#page-event-popup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen to this network request, use [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route) and [browser_context.on("request")](/api/class-browsercontext.mdx#browser-context-event-request) respectively instead of similar methods on the Page.

**sync**

```py
with context.expect_page() as page_info:
    page.get_by_text("open new page").click(),
page = page_info.value
print(page.evaluate("location.href"))
```

**async**

```py
async with context.expect_page() as page_info:
    await page.get_by_text("open new page").click(),
page = await page_info.value
print(await page.evaluate("location.href"))
```

:::note

Use [page.wait_for_load_state()](/api/class-page.mdx#page-wait-for-load-state) to wait until the page gets to a particular state (you should not need it in most cases).
:::

**Usage**

```python
browser_context.on("page", handler)
```

**Event data**
- Page

---

### on("pageclose") {/* #browser-context-event-page-close */}



Emitted when a page in this context is closed. See also [page.on("close")](/api/class-page.mdx#page-event-close) to receive events about a specific page.

**Usage**

```python
browser_context.on("pageclose", handler)
```

**Event data**
- Page

---

### on("pageload") {/* #browser-context-event-page-load */}



Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched in any page belonging to this context. See also [page.on("load")](/api/class-page.mdx#page-event-load) to receive events about a specific page.

**Usage**

```python
browser_context.on("pageload", handler)
```

**Event data**
- Page

---

### on("request") {/* #browser-context-event-request */}



Emitted when a request is issued from any pages created through this context. The request object is read-only. To only listen for requests from a particular page, use [page.on("request")](/api/class-page.mdx#page-event-request).

In order to intercept and mutate requests, see [browser_context.route()](/api/class-browsercontext.mdx#browser-context-route) or [page.route()](/api/class-page.mdx#page-route).

**Usage**

```python
browser_context.on("request", handler)
```

**Event data**
- Request

---

### on("requestfailed") {/* #browser-context-event-request-failed */}



Emitted when a request fails, for example by timing out. To only listen for failed requests from a particular page, use [page.on("requestfailed")](/api/class-page.mdx#page-event-request-failed).

:::note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [browser_context.on("requestfinished")](/api/class-browsercontext.mdx#browser-context-event-request-finished) event and not with [browser_context.on("requestfailed")](/api/class-browsercontext.mdx#browser-context-event-request-failed).
:::

**Usage**

```python
browser_context.on("requestfailed", handler)
```

**Event data**
- Request

---

### on("requestfinished") {/* #browser-context-event-request-finished */}



Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for successful requests from a particular page, use [page.on("requestfinished")](/api/class-page.mdx#page-event-request-finished).

**Usage**

```python
browser_context.on("requestfinished", handler)
```

**Event data**
- Request

---

### on("response") {/* #browser-context-event-response */}



Emitted when response status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for response events from a particular page, use [page.on("response")](/api/class-page.mdx#page-event-response).

**Usage**

```python
browser_context.on("response", handler)
```

**Event data**
- Response

---

### on("serviceworker") {/* #browser-context-event-service-worker */}



:::note

Service workers are only supported on Chromium-based browsers.
:::

Emitted when new service worker is created in the context.

**Usage**

```python
browser_context.on("serviceworker", handler)
```

**Event data**
- Worker

---

### on("weberror") {/* #browser-context-event-web-error */}



Emitted when exception is unhandled in any of the pages in this context. To listen for errors from a particular page, use [page.on("pageerror")](/api/class-page.mdx#page-event-page-error) instead.

**Usage**

```python
browser_context.on("weberror", handler)
```

**Event data**
- WebError

---

## Deprecated

### on("backgroundpage") {/* #browser-context-event-background-page */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


This event is not emitted.

**Usage**

```python
browser_context.on("backgroundpage", handler)
```

**Event data**
- Page

---

### background_pages {/* #browser-context-background-pages */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


Returns an empty list.

**Usage**

```python
browser_context.background_pages
```

**Returns**
- List\[Page\]


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
