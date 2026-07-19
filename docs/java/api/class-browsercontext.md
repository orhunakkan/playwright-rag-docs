# BrowserContext

> **Source:** [playwright.dev/java/docs/api/class-browsercontext](https://playwright.dev/java/docs/api/class-browsercontext)

---

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creating isolated non-persistent browser contexts with [Browser.newContext()](/api/class-browser.mdx#browser-new-context) method. Non-persistent browser contexts don't write any browsing data to disk.

```java
// Create a new incognito browser context
BrowserContext context = browser.newContext();
// Create a new page inside context.
Page page = context.newPage();
page.navigate("https://example.com");
// Dispose context once it is no longer needed.
context.close();
```


---

## Methods

### addCookies {/* #browser-context-add-cookies */}



Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [BrowserContext.cookies()](/api/class-browsercontext.mdx#browser-context-cookies).

**Usage**

```java
browserContext.addCookies(Arrays.asList(cookieObject1, cookieObject2));
```

**Arguments**
- `cookies` List<`Cookie`>
  - `setName` String
    
    
  - `setValue` String
    
    
  - `setUrl` String *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `setDomain` String *(optional)*
    
    For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.
  - `setPath` String *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `setExpires` double *(optional)*
    
    Unix time in seconds. Optional.
  - `setHttpOnly` boolean *(optional)*
    
    Optional.
  - `setSecure` boolean *(optional)*
    
    Optional.
  - `setSameSite` `enum SameSiteAttribute { STRICT, LAX, NONE }` *(optional)*
    
    Optional.
  - `setPartitionKey` String *(optional)*
    
    For partitioned third-party cookies (aka [CHIPS](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies)), the partition key. Optional.

**Returns**
- void

---

### addInitScript {/* #browser-context-add-init-script */}



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

```java
// In your playwright script, assuming the preload.js file is in same directory.
browserContext.addInitScript(Paths.get("preload.js"));
```

:::note
The order of evaluation of multiple scripts installed via [BrowserContext.addInitScript()](/api/class-browsercontext.mdx#browser-context-add-init-script) and [Page.addInitScript()](/api/class-page.mdx#page-add-init-script) is not defined.
:::

**Arguments**
- `script` String | Path
  
  Script to be evaluated in all pages in the browser context.

**Returns**
- Disposable

---

### browser {/* #browser-context-browser */}



Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.

**Usage**

```java
BrowserContext.browser();
```

**Returns**
- null | Browser

---

### clearCookies {/* #browser-context-clear-cookies */}



Removes cookies from context. Accepts optional filter.

**Usage**

```java
context.clearCookies();
context.clearCookies(new BrowserContext.ClearCookiesOptions().setName("session-id"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setDomain("my-origin.com"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setPath("/api/v1"));
context.clearCookies(new BrowserContext.ClearCookiesOptions()
                         .setName("session-id")
                         .setDomain("my-origin.com"));
```

**Arguments**
- `options` `BrowserContext.ClearCookiesOptions` *(optional)*
  - `setDomain` String | Pattern *(optional)* 
    
    Only removes cookies with the given domain.
  - `setName` String | Pattern *(optional)* 
    
    Only removes cookies with the given name.
  - `setPath` String | Pattern *(optional)* 
    
    Only removes cookies with the given path.

**Returns**
- void

---

### clearPermissions {/* #browser-context-clear-permissions */}



Clears all permission overrides for the browser context.

**Usage**

```java
BrowserContext context = browser.newContext();
context.grantPermissions(Arrays.asList("clipboard-read"));
// do stuff ..
context.clearPermissions();
```

**Returns**
- void

---

### close {/* #browser-context-close */}



Closes the browser context. All the pages that belong to the browser context will be closed.

:::note

The default browser context cannot be closed.
:::

**Usage**

```java
BrowserContext.close();
BrowserContext.close(options);
```

**Arguments**
- `options` `BrowserContext.CloseOptions` *(optional)*
  - `setReason` String *(optional)* 
    
    The reason to be reported to the operations interrupted by the context closure.

**Returns**
- void

---

### cookies {/* #browser-context-cookies */}



If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

**Usage**

```java
BrowserContext.cookies();
BrowserContext.cookies(urls);
```

**Arguments**
- `urls` String | List<String> *(optional)*
  
  Optional list of URLs.

**Returns**
- List<`Cookie`>
  - `name` String
    
    
  - `value` String
    
    
  - `domain` String
    
    
  - `path` String
    
    
  - `expires` double
    
    Unix time in seconds.
  - `httpOnly` boolean
    
    
  - `secure` boolean
    
    
  - `sameSite` `enum SameSiteAttribute { STRICT, LAX, NONE }`
    
    
  - `partitionKey` String *(optional)*
    
    
---

### exposeBinding {/* #browser-context-expose-binding */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-binding-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback). If the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) returns a Promise, it will be awaited.

The first argument of the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [Page.exposeBinding()](/api/class-page.mdx#page-expose-binding) for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      context.exposeBinding("pageURL", (source, args) -> source.page().url());
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");
      page.getByRole(AriaRole.BUTTON).click();
    }
  }
}
```

**Arguments**
- `name` String
  
  Name of the function on the window object.
- `callback` `BindingCallback`
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### exposeFunction {/* #browser-context-expose-function */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-function-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback).

If the [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) returns a Promise, it will be awaited.

See [Page.exposeFunction()](/api/class-page.mdx#page-expose-function) for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:

```java
import com.microsoft.playwright.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      context.exposeFunction("sha256", args -> {
        String text = (String) args0;
        MessageDigest crypto;
        try {
          crypto = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
          return null;
        }
        byte[] token = crypto.digest(text.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(token);
      });
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>\n");
      page.getByRole(AriaRole.BUTTON).click();
    }
  }
}
```

**Arguments**
- `name` String
  
  Name of the function on the window object.
- `callback` `FunctionCallback`
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### grantPermissions {/* #browser-context-grant-permissions */}



Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

**Usage**

```java
BrowserContext.grantPermissions(permissions);
BrowserContext.grantPermissions(permissions, options);
```

**Arguments**
- `permissions` List<String>
  
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
- `options` `BrowserContext.GrantPermissionsOptions` *(optional)*
  - `setOrigin` String *(optional)*
    
    The origin to grant permissions to, e.g. "https://example.com".

**Returns**
- void

---

### isClosed {/* #browser-context-is-closed */}



Indicates that the browser context is in the process of closing or has already been closed.

**Usage**

```java
BrowserContext.isClosed();
```

**Returns**
- boolean

---

### newCDPSession {/* #browser-context-new-cdp-session */}



:::note

CDP sessions are only supported on Chromium-based browsers.
:::

Returns the newly created session.

**Usage**

```java
BrowserContext.newCDPSession(page);
```

**Arguments**
- `page` Page | Frame
  
  Target to create new session for. For backwards-compatibility, this parameter is named `page`, but it can be a `Page` or `Frame` type.

**Returns**
- CDPSession

---

### newPage {/* #browser-context-new-page */}



Creates a new page in the browser context.

**Usage**

```java
BrowserContext.newPage();
```

**Returns**
- Page

---

### pages {/* #browser-context-pages */}



Returns all open pages in the context.

**Usage**

```java
BrowserContext.pages();
```

**Returns**
- List<Page>

---

### route {/* #browser-context-route */}



Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note

[BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route) will not intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [setServiceWorkers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```java
BrowserContext context = browser.newContext();
context.route("**/*.{png,jpg,jpeg}", route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

or the same snippet using a regex pattern instead:

```java
BrowserContext context = browser.newContext();
context.route(Pattern.compile("(\\.png$)|(\\.jpg$)"), route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```java
context.route("/api/**", route -> {
  if (route.request().postData().contains("my-string"))
    route.fulfill(new Route.FulfillOptions().setBody("mocked-data"));
  else
    route.resume();
});
```

Page routes (set up with [Page.route()](/api/class-page.mdx#page-route)) take precedence over browser context routes when request matches both handlers.

To remove a route with its handler you can use [BrowserContext.unroute()](/api/class-browsercontext.mdx#browser-context-unroute).

:::note

Enabling routing disables http cache.
:::

**Arguments**
- `url` String | Pattern | Predicate<String>
  
  A glob pattern, regex pattern, or predicate that receives a URL to match during routing. If [setBaseURL](/api/class-browser.mdx#browser-new-context-option-base-url) is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
- `handler` Consumer<Route>
  
  handler function to route the request.
- `options` `BrowserContext.RouteOptions` *(optional)*
  - `setTimes` int *(optional)* 
    
    How often a route should be used. By default it will be used every time.

**Returns**
- Disposable

---

### routeFromHAR {/* #browser-context-route-from-har */}



If specified the network requests that are made in the context will be served from the HAR file. Read more about [Replaying from HAR](../mock.mdx#replaying-from-har).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [setServiceWorkers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.

**Usage**

```java
BrowserContext.routeFromHAR(har);
BrowserContext.routeFromHAR(har, options);
```

**Arguments**
- `har` Path
  
  Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.
- `options` `BrowserContext.RouteFromHAROptions` *(optional)*
  - `setInterceptAPIRequests` boolean *(optional)* 
    
    If set to `true`, requests made via APIRequestContext (such as [BrowserContext.request()](/api/class-browsercontext.mdx#browser-context-request) or [Page.request()](/api/class-page.mdx#page-request)) are also served from the HAR file. By default these requests are sent to the network, matching the behavior prior to v1.62. Defaults to `false` for backward compatibility.
  - `setNotFound` `enum HarNotFound { ABORT, FALLBACK }` *(optional)*
    * If set to 'abort' any request not found in the HAR file will be aborted.
    * If set to 'fallback' falls through to the next route handler in the handler chain.
    
    Defaults to abort.
  - `setUpdate` boolean *(optional)*
    
    If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) is called.
  - `setUpdateContent` `enum RouteFromHarUpdateContentPolicy { EMBED, ATTACH }` *(optional)* 
    
    Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.
  - `setUpdateMode` `enum HarMode { FULL, MINIMAL }` *(optional)* 
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.
  - `setUrl` String | Pattern *(optional)*
    
    A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

**Returns**
- void

---

### routeWebSocket {/* #browser-context-route-web-socket */}



This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages. See WebSocketRoute for more details and examples.

```java
context.routeWebSocket("/ws", ws -> {
  ws.routeSend(message -> {
    if ("to-be-blocked".equals(message))
      return;
    ws.send(message);
  });
  ws.connect();
});
```

**Arguments**
- `url` String | Pattern | Predicate<String>
  
  Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [setBaseURL](/api/class-browser.mdx#browser-new-context-option-base-url) context option.
- `handler` Consumer<WebSocketRoute>
  
  Handler function to route the WebSocket.

**Returns**
- void

---

### setDefaultNavigationTimeout {/* #browser-context-set-default-navigation-timeout */}



This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [Page.goBack()](/api/class-page.mdx#page-go-back)
* [Page.goForward()](/api/class-page.mdx#page-go-forward)
* [Page.navigate()](/api/class-page.mdx#page-goto)
* [Page.reload()](/api/class-page.mdx#page-reload)
* [Page.setContent()](/api/class-page.mdx#page-set-content)
* [Page.waitForNavigation()](/api/class-page.mdx#page-wait-for-navigation)

:::note

[Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) and [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) take priority over [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout).
:::

**Usage**

```java
BrowserContext.setDefaultNavigationTimeout(timeout);
```

**Arguments**
- `timeout` double
  
  Maximum navigation time in milliseconds

---

### setDefaultTimeout {/* #browser-context-set-default-timeout */}



This setting will change the default maximum time for all the methods accepting [timeout](/api/class-browsercontext.mdx#browser-context-set-default-timeout-option-timeout) option.

:::note

[Page.setDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout), [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) and [BrowserContext.setDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout) take priority over [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
:::

**Usage**

```java
BrowserContext.setDefaultTimeout(timeout);
```

**Arguments**
- `timeout` double
  
  Maximum time in milliseconds. Pass `0` to disable timeout.

---

### setExtraHTTPHeaders {/* #browser-context-set-extra-http-headers */}



The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [Page.setExtraHTTPHeaders()](/api/class-page.mdx#page-set-extra-http-headers). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

:::note

[BrowserContext.setExtraHTTPHeaders()](/api/class-browsercontext.mdx#browser-context-set-extra-http-headers) does not guarantee the order of headers in the outgoing requests.
:::

**Usage**

```java
BrowserContext.setExtraHTTPHeaders(headers);
```

**Arguments**
- `headers` Map<String, String>
  
  An object containing additional HTTP headers to be sent with every request. All header values must be strings.

**Returns**
- void

---

### setGeolocation {/* #browser-context-set-geolocation */}



Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**

```java
browserContext.setGeolocation(new Geolocation(59.95, 30.31667));
```

:::note
Consider using [BrowserContext.grantPermissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) to grant permissions for the browser context pages to read its geolocation.
:::

**Arguments**
- `geolocation` null | Geolocation
  - `setLatitude` double
    
    Latitude between -90 and 90.
  - `setLongitude` double
    
    Longitude between -180 and 180.
  - `setAccuracy` double *(optional)*
    
    Non-negative accuracy value. Defaults to `0`.

**Returns**
- void

---

### setOffline {/* #browser-context-set-offline */}



**Usage**

```java
BrowserContext.setOffline(offline);
```

**Arguments**
- `offline` boolean
  
  Whether to emulate network being offline for the browser context.

**Returns**
- void

---

### setStorageState {/* #browser-context-set-storage-state */}



Clears the existing cookies, local storage, IndexedDB entries and virtual WebAuthn credentials, and sets the new storage state. When the storage state contains credentials, the virtual WebAuthn authenticator is installed (equivalent to [Credentials.install()](/api/class-credentials.mdx#credentials-install)), preventing all real authenticators from working in this context.

**Usage**

```java
// Load storage state from a file and apply it to the context.
context.setStorageState(Paths.get("state.json"));
```

**Arguments**
- `storageStatePath` Path
  
  Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.

**Returns**
- void

---

### storageState {/* #browser-context-storage-state */}



Returns storage state for this browser context, contains current cookies, local storage snapshot, IndexedDB snapshot and virtual WebAuthn credentials.

**Usage**

```java
BrowserContext.storageState();
BrowserContext.storageState(options);
```

**Arguments**
- `options` `BrowserContext.StorageStateOptions` *(optional)*
  - `setCredentials` boolean *(optional)* 
    
    Set to `true` to include the context's virtual WebAuthn [BrowserContext.credentials()](/api/class-browsercontext.mdx#browser-context-credentials) (passkeys) in the storage state snapshot. The captured credentials carry their private keys, so they can be re-seeded into a later context via the [setStorageState](/api/class-browser.mdx#browser-new-context-option-storage-state) option or [BrowserContext.setStorageState()](/api/class-browsercontext.mdx#browser-context-set-storage-state). Note that restoring the storage state that contains credentials will automatically install the virtual WebAuthn authenticator (see [Credentials.install()](/api/class-credentials.mdx#credentials-install)), and prevent all real authenticators from working in this context.
  - `setIndexedDB` boolean *(optional)* 
    
    Set to `true` to include [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) in the storage state snapshot. If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.
  - `setPath` Path *(optional)*
    
    The file path to save the storage state to. If [setPath](/api/class-browsercontext.mdx#browser-context-storage-state-option-path) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.

**Returns**
- String

---

### unroute {/* #browser-context-unroute */}



Removes a route created with [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route). When [handler](/api/class-browsercontext.mdx#browser-context-unroute-option-handler) is not specified, removes all routes for the [url](/api/class-browsercontext.mdx#browser-context-unroute-option-url).

**Usage**

```java
BrowserContext.unroute(url);
BrowserContext.unroute(url, handler);
```

**Arguments**
- `url` String | Pattern | Predicate<String>
  
  A glob pattern, regex pattern, or predicate receiving URL used to register a routing with [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route).
- `handler` Consumer<Route> *(optional)*
  
  Optional handler function used to register a routing with [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route).

**Returns**
- void

---

### unrouteAll {/* #browser-context-unroute-all */}



Removes all routes created with [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route) and [BrowserContext.routeFromHAR()](/api/class-browsercontext.mdx#browser-context-route-from-har).

**Usage**

```java
BrowserContext.unrouteAll();
```

**Returns**
- void

---

### waitForCondition {/* #browser-context-wait-for-condition */}



The method will block until the condition returns true. All Playwright events will be dispatched while the method is waiting for the condition.

**Usage**

Use the method to wait for a condition that depends on page events:

```java
List<String> failedUrls = new ArrayList<>();
context.onResponse(response -> {
  if (!response.ok()) {
    failedUrls.add(response.url());
  }
});
page1.getByText("Create user").click();
page2.getByText("Submit button").click();
context.waitForCondition(() -> failedUrls.size() > 3);
```

**Arguments**
- `condition` BooleanSupplier
  
  Condition to wait for.
- `options` `BrowserContext.WaitForConditionOptions` *(optional)*
  - `setTimeout` double *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### waitForConsoleMessage {/* #browser-context-wait-for-console-message */}



Performs action and waits for a ConsoleMessage to be logged by in the pages in the context. If predicate is provided, it passes ConsoleMessage value into the `predicate` function and waits for `predicate(message)` to return a truthy value. Will throw an error if the page is closed before the [BrowserContext.onConsoleMessage(handler)](/api/class-browsercontext.mdx#browser-context-event-console) event is fired.

**Usage**

```java
BrowserContext.waitForConsoleMessage(callback);
BrowserContext.waitForConsoleMessage(callback, options);
```

**Arguments**
- `options` `BrowserContext.WaitForConsoleMessageOptions` *(optional)*
  - `setPredicate` Predicate<ConsoleMessage> *(optional)*
    
    Receives the ConsoleMessage object and resolves to truthy value when the waiting should resolve.
  - `setTimeout` double *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
- `callback` Runnable
  
  Callback that performs the action triggering the event.

**Returns**
- ConsoleMessage

---

### waitForPage {/* #browser-context-wait-for-page */}



Performs action and waits for a new Page to be created in the context. If predicate is provided, it passes Page value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the context closes before new Page is created.

**Usage**

```java
BrowserContext.waitForPage(callback);
BrowserContext.waitForPage(callback, options);
```

**Arguments**
- `options` `BrowserContext.WaitForPageOptions` *(optional)*
  - `setPredicate` Predicate<Page> *(optional)*
    
    Receives the Page object and resolves to truthy value when the waiting should resolve.
  - `setTimeout` double *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
- `callback` Runnable
  
  Callback that performs the action triggering the event.

**Returns**
- Page

---

## Properties

### clock() {/* #browser-context-clock */}



Playwright has ability to mock clock and passage of time.

**Usage**

```java
BrowserContext.clock()
```

**Returns**
- Clock

---

### credentials() {/* #browser-context-credentials */}



Virtual WebAuthn authenticator for this context. Lets tests seed credentials and intercept `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies.

**Usage**

```java
BrowserContext.credentials()
```

**Returns**
- Credentials

---

### debugger() {/* #browser-context-debugger */}



Debugger allows to pause and resume the execution.

**Usage**

```java
BrowserContext.debugger()
```

**Returns**
- Debugger

---

### request() {/* #browser-context-request */}



API testing helper associated with this context. Requests made with this API will use context cookies.

**Usage**

```java
BrowserContext.request()
```

**Returns**
- APIRequestContext

---

### tracing() {/* #browser-context-tracing */}



**Usage**

```java
BrowserContext.tracing()
```

**Returns**
- Tracing

---

## Events

### onClose(handler) {/* #browser-context-event-close */}



Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [Browser.close()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```java
BrowserContext.onClose(handler)
```

**Event data**
- BrowserContext

---

### onConsoleMessage(handler) {/* #browser-context-event-console */}



Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the ConsoleMessage event handler argument.

**Usage**

```java
context.onConsoleMessage(msg -> {
  for (int i = 0; i < msg.args().size(); ++i)
    System.out.println(i + ": " + msg.args().get(i).jsonValue());
});
page.evaluate("() => console.log('hello', 5, { foo: 'bar' })");
```

**Event data**
- ConsoleMessage

---

### onDialog(handler) {/* #browser-context-event-dialog */}



Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [Dialog.accept()](/api/class-dialog.mdx#dialog-accept) or [Dialog.dismiss()](/api/class-dialog.mdx#dialog-dismiss) the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.

**Usage**

```java
context.onDialog(dialog -> {
  dialog.accept();
});
```

:::note
When no [Page.onDialog(handler)](/api/class-page.mdx#page-event-dialog) or [BrowserContext.onDialog(handler)](/api/class-browsercontext.mdx#browser-context-event-dialog) listeners are present, all dialogs are automatically dismissed.
:::

**Event data**
- Dialog

---

### onDownload(handler) {/* #browser-context-event-download */}



Emitted when attachment download started in any page belonging to this context. User can access basic file operations on downloaded content via the passed Download instance. See also [Page.onDownload(handler)](/api/class-page.mdx#page-event-download) to receive events about a specific page.

**Usage**

```java
BrowserContext.onDownload(handler)
```

**Event data**
- Download

---

### onFrameAttached(handler) {/* #browser-context-event-frame-attached */}



Emitted when a frame is attached in any page belonging to this context. See also [Page.onFrameAttached(handler)](/api/class-page.mdx#page-event-frame-attached) to receive events about a specific page.

**Usage**

```java
BrowserContext.onFrameAttached(handler)
```

**Event data**
- Frame

---

### onFrameDetached(handler) {/* #browser-context-event-frame-detached */}



Emitted when a frame is detached in any page belonging to this context. See also [Page.onFrameDetached(handler)](/api/class-page.mdx#page-event-frame-detached) to receive events about a specific page.

**Usage**

```java
BrowserContext.onFrameDetached(handler)
```

**Event data**
- Frame

---

### onFrameNavigated(handler) {/* #browser-context-event-frame-navigated */}



Emitted when a frame is navigated to a new url in any page belonging to this context. See also [Page.onFrameNavigated(handler)](/api/class-page.mdx#page-event-frame-navigated) to receive events about navigations in a specific page.

**Usage**

```java
BrowserContext.onFrameNavigated(handler)
```

**Event data**
- Frame

---

### onPage(handler) {/* #browser-context-event-page */}



The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [Page.onPopup(handler)](/api/class-page.mdx#page-event-popup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen to this network request, use [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route) and [BrowserContext.onRequest(handler)](/api/class-browsercontext.mdx#browser-context-event-request) respectively instead of similar methods on the Page.

```java
Page newPage = context.waitForPage(() -> {
  page.getByText("open new page").click();
});
System.out.println(newPage.evaluate("location.href"));
```

:::note
Use [Page.waitForLoadState()](/api/class-page.mdx#page-wait-for-load-state) to wait until the page gets to a particular state (you should not need it in most cases).
:::

**Usage**

```java
BrowserContext.onPage(handler)
```

**Event data**
- Page

---

### onPageClose(handler) {/* #browser-context-event-page-close */}



Emitted when a page in this context is closed. See also [Page.onClose(handler)](/api/class-page.mdx#page-event-close) to receive events about a specific page.

**Usage**

```java
BrowserContext.onPageClose(handler)
```

**Event data**
- Page

---

### onPageLoad(handler) {/* #browser-context-event-page-load */}



Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched in any page belonging to this context. See also [Page.onLoad(handler)](/api/class-page.mdx#page-event-load) to receive events about a specific page.

**Usage**

```java
BrowserContext.onPageLoad(handler)
```

**Event data**
- Page

---

### onRequest(handler) {/* #browser-context-event-request */}



Emitted when a request is issued from any pages created through this context. The request object is read-only. To only listen for requests from a particular page, use [Page.onRequest(handler)](/api/class-page.mdx#page-event-request).

In order to intercept and mutate requests, see [BrowserContext.route()](/api/class-browsercontext.mdx#browser-context-route) or [Page.route()](/api/class-page.mdx#page-route).

**Usage**

```java
BrowserContext.onRequest(handler)
```

**Event data**
- Request

---

### onRequestFailed(handler) {/* #browser-context-event-request-failed */}



Emitted when a request fails, for example by timing out. To only listen for failed requests from a particular page, use [Page.onRequestFailed(handler)](/api/class-page.mdx#page-event-request-failed).

:::note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [BrowserContext.onRequestFinished(handler)](/api/class-browsercontext.mdx#browser-context-event-request-finished) event and not with [BrowserContext.onRequestFailed(handler)](/api/class-browsercontext.mdx#browser-context-event-request-failed).
:::

**Usage**

```java
BrowserContext.onRequestFailed(handler)
```

**Event data**
- Request

---

### onRequestFinished(handler) {/* #browser-context-event-request-finished */}



Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for successful requests from a particular page, use [Page.onRequestFinished(handler)](/api/class-page.mdx#page-event-request-finished).

**Usage**

```java
BrowserContext.onRequestFinished(handler)
```

**Event data**
- Request

---

### onResponse(handler) {/* #browser-context-event-response */}



Emitted when response status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for response events from a particular page, use [Page.onResponse(handler)](/api/class-page.mdx#page-event-response).

**Usage**

```java
BrowserContext.onResponse(handler)
```

**Event data**
- Response

---

### onWebError(handler) {/* #browser-context-event-web-error */}



Emitted when exception is unhandled in any of the pages in this context. To listen for errors from a particular page, use [Page.onPageError(handler)](/api/class-page.mdx#page-event-page-error) instead.

**Usage**

```java
BrowserContext.onWebError(handler)
```

**Event data**
- WebError

---

## Deprecated

### onBackgroundPage(handler) {/* #browser-context-event-background-page */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


This event is not emitted.

**Usage**

```java
BrowserContext.onBackgroundPage(handler)
```

**Event data**
- Page

---

### backgroundPages {/* #browser-context-background-pages */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


Returns an empty list.

**Usage**

```java
BrowserContext.backgroundPages();
```

**Returns**
- List<Page>


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
