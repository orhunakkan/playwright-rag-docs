# BrowserContext

> **Source:** [playwright.dev/dotnet/docs/api/class-browsercontext](https://playwright.dev/dotnet/docs/api/class-browsercontext)

---

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creating isolated non-persistent browser contexts with [Browser.NewContextAsync()](/api/class-browser.mdx#browser-new-context) method. Non-persistent browser contexts don't write any browsing data to disk.

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Firefox.LaunchAsync(new() { Headless = false });
// Create a new incognito browser context
var context = await browser.NewContextAsync();
// Create a new page inside context.
var page = await context.NewPageAsync();
await page.GotoAsync("https://bing.com");
// Dispose context once it is no longer needed.
await context.CloseAsync();
```


---

## Methods

### AddCookiesAsync {/* #browser-context-add-cookies */}



Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [BrowserContext.CookiesAsync()](/api/class-browsercontext.mdx#browser-context-cookies).

**Usage**

```csharp
await context.AddCookiesAsync(new[] { cookie1, cookie2 });
```

**Arguments**
- `cookies` IEnumerable<`Cookie`>
  - `Name` string
    
    
  - `Value` string
    
    
  - `Url` string? *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `Domain` string? *(optional)*
    
    For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.
  - `Path` string? *(optional)*
    
    Either `url` or both `domain` and `path` are required. Optional.
  - `Expires` float? *(optional)*
    
    Unix time in seconds. Optional.
  - `HttpOnly` bool? *(optional)*
    
    Optional.
  - `Secure` bool? *(optional)*
    
    Optional.
  - `SameSite` `enum SameSiteAttribute { Strict, Lax, None }?` *(optional)*
    
    Optional.
  - `PartitionKey` string? *(optional)*
    
    For partitioned third-party cookies (aka [CHIPS](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies)), the partition key. Optional.

**Returns**
- void

---

### AddInitScriptAsync {/* #browser-context-add-init-script */}



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

```csharp
await Context.AddInitScriptAsync(scriptPath: "preload.js");
```

:::note
The order of evaluation of multiple scripts installed via [BrowserContext.AddInitScriptAsync()](/api/class-browsercontext.mdx#browser-context-add-init-script) and [Page.AddInitScriptAsync()](/api/class-page.mdx#page-add-init-script) is not defined.
:::

**Arguments**
- `script` string | string
  
  Script to be evaluated in all pages in the browser context.

**Returns**
- Disposable

---

### Browser {/* #browser-context-browser */}



Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.

**Usage**

```csharp
BrowserContext.Browser
```

**Returns**
- Browser?

---

### ClearCookiesAsync {/* #browser-context-clear-cookies */}



Removes cookies from context. Accepts optional filter.

**Usage**

```csharp
await context.ClearCookiesAsync();
await context.ClearCookiesAsync(new() { Name = "session-id" });
await context.ClearCookiesAsync(new() { Domain = "my-origin.com" });
await context.ClearCookiesAsync(new() { Path = "/api/v1" });
await context.ClearCookiesAsync(new() { Name = "session-id", Domain = "my-origin.com" });
```

**Arguments**
- `options` `BrowserContextClearCookiesOptions?` *(optional)*
  - `Domain|DomainRegex` string? | Regex? *(optional)* 
    
    Only removes cookies with the given domain.
  - `Name|NameRegex` string? | Regex? *(optional)* 
    
    Only removes cookies with the given name.
  - `Path|PathRegex` string? | Regex? *(optional)* 
    
    Only removes cookies with the given path.

**Returns**
- void

---

### ClearPermissionsAsync {/* #browser-context-clear-permissions */}



Clears all permission overrides for the browser context.

**Usage**

```csharp
var context = await browser.NewContextAsync();
await context.GrantPermissionsAsync(new[] { "clipboard-read" });
// Alternatively, you can use the helper class ContextPermissions
//  to specify the permissions...
// do stuff ...
await context.ClearPermissionsAsync();
```

**Returns**
- void

---

### CloseAsync {/* #browser-context-close */}



Closes the browser context. All the pages that belong to the browser context will be closed.

:::note

The default browser context cannot be closed.
:::

**Usage**

```csharp
await BrowserContext.CloseAsync(options);
```

**Arguments**
- `options` `BrowserContextCloseOptions?` *(optional)*
  - `Reason` string? *(optional)* 
    
    The reason to be reported to the operations interrupted by the context closure.

**Returns**
- void

---

### CookiesAsync {/* #browser-context-cookies */}



If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

**Usage**

```csharp
await BrowserContext.CookiesAsync(urls);
```

**Arguments**
- `urls` string? | IEnumerable?<string> *(optional)*
  
  Optional list of URLs.

**Returns**
- IReadOnlyList<`BrowserContextCookiesResult`>
  - `name` string
    
    
  - `value` string
    
    
  - `domain` string
    
    
  - `path` string
    
    
  - `expires` float
    
    Unix time in seconds.
  - `httpOnly` bool
    
    
  - `secure` bool
    
    
  - `sameSite` `enum SameSiteAttribute { Strict, Lax, None }`
    
    
  - `partitionKey` string? *(optional)*
    
    
---

### ExposeBindingAsync {/* #browser-context-expose-binding */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-binding-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback). If the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) returns a Promise, it will be awaited.

The first argument of the [callback](/api/class-browsercontext.mdx#browser-context-expose-binding-option-callback) function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [Page.ExposeBindingAsync()](/api/class-page.mdx#page-expose-binding) for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
var context = await browser.NewContextAsync();

await context.ExposeBindingAsync("pageURL", source => source.Page.Url);
var page = await context.NewPageAsync();
await page.SetContentAsync("<script>\n" +
"  async function onClick() {\n" +
"    document.querySelector('div').textContent = await window.pageURL();\n" +
"  }\n" +
"</script>\n" +
"<button onclick=\"onClick()\">Click me</button>\n" +
"<div></div>");
await page.GetByRole(AriaRole.Button).ClickAsync();
```

**Arguments**
- `name` string
  
  Name of the function on the window object.
- `callback` Action<BindingSource, T, TResult>
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### ExposeFunctionAsync {/* #browser-context-expose-function */}



The method adds a function called [name](/api/class-browsercontext.mdx#browser-context-expose-function-option-name) on the `window` object of every frame in every page in the context. When called, the function executes [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) and returns a Promise which resolves to the return value of [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback).

If the [callback](/api/class-browsercontext.mdx#browser-context-expose-function-option-callback) returns a Promise, it will be awaited.

See [Page.ExposeFunctionAsync()](/api/class-page.mdx#page-expose-function) for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:

```csharp
using Microsoft.Playwright;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

class BrowserContextExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
        var context = await browser.NewContextAsync();

        await context.ExposeFunctionAsync("sha256", (string input) =>
        {
            return Convert.ToBase64String(
                SHA256.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(input)));
        });

        var page = await context.NewPageAsync();
        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.GetByRole(AriaRole.Button).ClickAsync();
        Console.WriteLine(await page.TextContentAsync("div"));
    }
}
```

**Arguments**
- `name` string
  
  Name of the function on the window object.
- `callback` Action<T, TResult>
  
  Callback function that will be called in the Playwright's context.

**Returns**
- Disposable

---

### GrantPermissionsAsync {/* #browser-context-grant-permissions */}



Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

**Usage**

```csharp
await BrowserContext.GrantPermissionsAsync(permissions, options);
```

**Arguments**
- `permissions` IEnumerable<string>
  
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
- `options` `BrowserContextGrantPermissionsOptions?` *(optional)*
  - `Origin` string? *(optional)*
    
    The origin to grant permissions to, e.g. "https://example.com".

**Returns**
- void

---

### IsClosed {/* #browser-context-is-closed */}



Indicates that the browser context is in the process of closing or has already been closed.

**Usage**

```csharp
BrowserContext.IsClosed
```

**Returns**
- bool

---

### NewCDPSessionAsync {/* #browser-context-new-cdp-session */}



:::note

CDP sessions are only supported on Chromium-based browsers.
:::

Returns the newly created session.

**Usage**

```csharp
await BrowserContext.NewCDPSessionAsync(page);
```

**Arguments**
- `page` Page | Frame
  
  Target to create new session for. For backwards-compatibility, this parameter is named `page`, but it can be a `Page` or `Frame` type.

**Returns**
- CDPSession

---

### NewPageAsync {/* #browser-context-new-page */}



Creates a new page in the browser context.

**Usage**

```csharp
await BrowserContext.NewPageAsync();
```

**Returns**
- Page

---

### Pages {/* #browser-context-pages */}



Returns all open pages in the context.

**Usage**

```csharp
BrowserContext.Pages
```

**Returns**
- IReadOnlyList<Page>

---

### RouteAsync {/* #browser-context-route */}



Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note

[BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route) will not intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [ServiceWorkers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync("**/*.{png,jpg,jpeg}", r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

or the same snippet using a regex pattern instead:

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync(new Regex("(\\.png$)|(\\.jpg$)"), r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```csharp
await page.RouteAsync("/api/**", async r =>
{
    if (r.Request.PostData.Contains("my-string"))
        await r.FulfillAsync(new() { Body = "mocked-data" });
    else
        await r.ContinueAsync();
});
```

Page routes (set up with [Page.RouteAsync()](/api/class-page.mdx#page-route)) take precedence over browser context routes when request matches both handlers.

To remove a route with its handler you can use [BrowserContext.UnrouteAsync()](/api/class-browsercontext.mdx#browser-context-unroute).

:::note

Enabling routing disables http cache.
:::

**Arguments**
- `url` string | Regex | Func<string, bool>
  
  A glob pattern, regex pattern, or predicate that receives a URL to match during routing. If [BaseURL](/api/class-browser.mdx#browser-new-context-option-base-url) is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
- `handler` Action<Route>
  
  handler function to route the request.
- `options` `BrowserContextRouteOptions?` *(optional)*
  - `Times` int? *(optional)* 
    
    How often a route should be used. By default it will be used every time.

**Returns**
- Disposable

---

### RouteFromHARAsync {/* #browser-context-route-from-har */}



If specified the network requests that are made in the context will be served from the HAR file. Read more about [Replaying from HAR](../mock.mdx#replaying-from-har).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [ServiceWorkers](/api/class-browser.mdx#browser-new-context-option-service-workers) to `'block'`.

**Usage**

```csharp
await BrowserContext.RouteFromHARAsync(har, options);
```

**Arguments**
- `har` string
  
  Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.
- `options` `BrowserContextRouteFromHAROptions?` *(optional)*
  - `InterceptAPIRequests` bool? *(optional)* 
    
    If set to `true`, requests made via APIRequestContext (such as [BrowserContext.APIRequest](/api/class-browsercontext.mdx#browser-context-request) or [Page.APIRequest](/api/class-page.mdx#page-request)) are also served from the HAR file. By default these requests are sent to the network, matching the behavior prior to v1.62. Defaults to `false` for backward compatibility.
  - `NotFound` `enum HarNotFound { Abort, Fallback }?` *(optional)*
    * If set to 'abort' any request not found in the HAR file will be aborted.
    * If set to 'fallback' falls through to the next route handler in the handler chain.
    
    Defaults to abort.
  - `Update` bool? *(optional)*
    
    If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) is called.
  - `UpdateContent` `enum RouteFromHarUpdateContentPolicy { Embed, Attach }?` *(optional)* 
    
    Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.
  - `UpdateMode` `enum HarMode { Full, Minimal }?` *(optional)* 
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.
  - `Url|UrlRegex` string? | Regex? *(optional)*
    
    A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

**Returns**
- void

---

### RouteWebSocketAsync {/* #browser-context-route-web-socket */}



This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages. See WebSocketRoute for more details and examples.

```csharp
await context.RouteWebSocketAsync("/ws", async ws => {
  ws.RouteSend(message => {
    if (message == "to-be-blocked")
      return;
    ws.Send(message);
  });
  await ws.ConnectAsync();
});
```

**Arguments**
- `url` string | Regex | Func<string, bool>
  
  Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [BaseURL](/api/class-browser.mdx#browser-new-context-option-base-url) context option.
- `handler` Action<WebSocketRoute>
  
  Handler function to route the WebSocket.

**Returns**
- void

---

### RunAndWaitForConsoleMessageAsync {/* #browser-context-wait-for-console-message */}



Performs action and waits for a ConsoleMessage to be logged by in the pages in the context. If predicate is provided, it passes ConsoleMessage value into the `predicate` function and waits for `predicate(message)` to return a truthy value. Will throw an error if the page is closed before the [BrowserContext.Console](/api/class-browsercontext.mdx#browser-context-event-console) event is fired.

**Usage**

```csharp
await BrowserContext.RunAndWaitForConsoleMessageAsync(action, options);
```

**Arguments**
- `action` Func<Task>
  
  Action that triggers the event.
- `options` `BrowserContextRunAndWaitForConsoleMessageOptions?` *(optional)*
  - `Predicate` Func<ConsoleMessage?, bool> *(optional)*
    
    Receives the ConsoleMessage object and resolves to truthy value when the waiting should resolve.
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- ConsoleMessage

---

### WaitForConsoleMessageAsync {/* #browser-context-wait-for-console-message */}



Performs action and waits for a ConsoleMessage to be logged by in the pages in the context. If predicate is provided, it passes ConsoleMessage value into the `predicate` function and waits for `predicate(message)` to return a truthy value. Will throw an error if the page is closed before the [BrowserContext.Console](/api/class-browsercontext.mdx#browser-context-event-console) event is fired.

**Usage**

```csharp
await BrowserContext.WaitForConsoleMessageAsync(action, options);
```

**Arguments**
- `options` `BrowserContextRunAndWaitForConsoleMessageOptions?` *(optional)*
  - `Predicate` Func<ConsoleMessage?, bool> *(optional)*
    
    Receives the ConsoleMessage object and resolves to truthy value when the waiting should resolve.
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- ConsoleMessage

---

### RunAndWaitForPageAsync {/* #browser-context-wait-for-page */}



Performs action and waits for a new Page to be created in the context. If predicate is provided, it passes Page value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the context closes before new Page is created.

**Usage**

```csharp
await BrowserContext.RunAndWaitForPageAsync(action, options);
```

**Arguments**
- `action` Func<Task> 
  
  Action that triggers the event.
- `options` `BrowserContextRunAndWaitForPageOptions?` *(optional)*
  - `Predicate` Func<Page?, bool> *(optional)*
    
    Receives the Page object and resolves to truthy value when the waiting should resolve.
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- Page

---

### WaitForPageAsync {/* #browser-context-wait-for-page */}



Performs action and waits for a new Page to be created in the context. If predicate is provided, it passes Page value into the `predicate` function and waits for `predicate(event)` to return a truthy value. Will throw an error if the context closes before new Page is created.

**Usage**

```csharp
await BrowserContext.WaitForPageAsync(action, options);
```

**Arguments**
- `options` `BrowserContextRunAndWaitForPageOptions?` *(optional)*
  - `Predicate` Func<Page?, bool> *(optional)*
    
    Receives the Page object and resolves to truthy value when the waiting should resolve.
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).

**Returns**
- Page

---

### SetDefaultNavigationTimeout {/* #browser-context-set-default-navigation-timeout */}



This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [Page.GoBackAsync()](/api/class-page.mdx#page-go-back)
* [Page.GoForwardAsync()](/api/class-page.mdx#page-go-forward)
* [Page.GotoAsync()](/api/class-page.mdx#page-goto)
* [Page.ReloadAsync()](/api/class-page.mdx#page-reload)
* [Page.SetContentAsync()](/api/class-page.mdx#page-set-content)
* [Page.RunAndWaitForNavigationAsync()](/api/class-page.mdx#page-wait-for-navigation)

:::note

[Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout) and [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) take priority over [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout).
:::

**Usage**

```csharp
BrowserContext.SetDefaultNavigationTimeout(timeout);
```

**Arguments**
- `timeout` float
  
  Maximum navigation time in milliseconds

---

### SetDefaultTimeout {/* #browser-context-set-default-timeout */}



This setting will change the default maximum time for all the methods accepting [timeout](/api/class-browsercontext.mdx#browser-context-set-default-timeout-option-timeout) option.

:::note

[Page.SetDefaultNavigationTimeout()](/api/class-page.mdx#page-set-default-navigation-timeout), [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) and [BrowserContext.SetDefaultNavigationTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-navigation-timeout) take priority over [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
:::

**Usage**

```csharp
BrowserContext.SetDefaultTimeout(timeout);
```

**Arguments**
- `timeout` float
  
  Maximum time in milliseconds. Pass `0` to disable timeout.

---

### SetExtraHTTPHeadersAsync {/* #browser-context-set-extra-http-headers */}



The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [Page.SetExtraHTTPHeadersAsync()](/api/class-page.mdx#page-set-extra-http-headers). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

:::note

[BrowserContext.SetExtraHTTPHeadersAsync()](/api/class-browsercontext.mdx#browser-context-set-extra-http-headers) does not guarantee the order of headers in the outgoing requests.
:::

**Usage**

```csharp
await BrowserContext.SetExtraHTTPHeadersAsync(headers);
```

**Arguments**
- `headers` IDictionary<string, string>
  
  An object containing additional HTTP headers to be sent with every request. All header values must be strings.

**Returns**
- void

---

### SetGeolocationAsync {/* #browser-context-set-geolocation */}



Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**

```csharp
await context.SetGeolocationAsync(new Geolocation()
{
    Latitude = 59.95f,
    Longitude = 30.31667f
});
```

:::note
Consider using [BrowserContext.GrantPermissionsAsync()](/api/class-browsercontext.mdx#browser-context-grant-permissions) to grant permissions for the browser context pages to read its geolocation.
:::

**Arguments**
- `geolocation` Geolocation?
  - `Latitude` float
    
    Latitude between -90 and 90.
  - `Longitude` float
    
    Longitude between -180 and 180.
  - `Accuracy` float? *(optional)*
    
    Non-negative accuracy value. Defaults to `0`.

**Returns**
- void

---

### SetOfflineAsync {/* #browser-context-set-offline */}



**Usage**

```csharp
await BrowserContext.SetOfflineAsync(offline);
```

**Arguments**
- `offline` bool
  
  Whether to emulate network being offline for the browser context.

**Returns**
- void

---

### SetStorageStateAsync {/* #browser-context-set-storage-state */}



Clears the existing cookies, local storage, IndexedDB entries and virtual WebAuthn credentials, and sets the new storage state. When the storage state contains credentials, the virtual WebAuthn authenticator is installed (equivalent to [Credentials.InstallAsync()](/api/class-credentials.mdx#credentials-install)), preventing all real authenticators from working in this context.

**Usage**

```csharp
// Load storage state from a file and apply it to the context.
await context.SetStorageStateAsync("state.json");
```

**Arguments**
- `storageStatePath` string
  
  Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.StorageStateAsync()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.

**Returns**
- void

---

### StorageStateAsync {/* #browser-context-storage-state */}



Returns storage state for this browser context, contains current cookies, local storage snapshot, IndexedDB snapshot and virtual WebAuthn credentials.

**Usage**

```csharp
await BrowserContext.StorageStateAsync(options);
```

**Arguments**
- `options` `BrowserContextStorageStateOptions?` *(optional)*
  - `Credentials` bool? *(optional)* 
    
    Set to `true` to include the context's virtual WebAuthn [BrowserContext.Credentials](/api/class-browsercontext.mdx#browser-context-credentials) (passkeys) in the storage state snapshot. The captured credentials carry their private keys, so they can be re-seeded into a later context via the [StorageState](/api/class-browser.mdx#browser-new-context-option-storage-state) option or [BrowserContext.SetStorageStateAsync()](/api/class-browsercontext.mdx#browser-context-set-storage-state). Note that restoring the storage state that contains credentials will automatically install the virtual WebAuthn authenticator (see [Credentials.InstallAsync()](/api/class-credentials.mdx#credentials-install)), and prevent all real authenticators from working in this context.
  - `IndexedDB` bool? *(optional)* 
    
    Set to `true` to include [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) in the storage state snapshot. If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.
  - `Path` string? *(optional)*
    
    The file path to save the storage state to. If [Path](/api/class-browsercontext.mdx#browser-context-storage-state-option-path) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.

**Returns**
- string

---

### UnrouteAsync {/* #browser-context-unroute */}



Removes a route created with [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route). When [handler](/api/class-browsercontext.mdx#browser-context-unroute-option-handler) is not specified, removes all routes for the [url](/api/class-browsercontext.mdx#browser-context-unroute-option-url).

**Usage**

```csharp
await BrowserContext.UnrouteAsync(url, handler);
```

**Arguments**
- `url` string | Regex | Func<string, bool>
  
  A glob pattern, regex pattern, or predicate receiving URL used to register a routing with [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route).
- `handler` Action<Route?> *(optional)*
  
  Optional handler function used to register a routing with [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route).

**Returns**
- void

---

### UnrouteAllAsync {/* #browser-context-unroute-all */}



Removes all routes created with [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route) and [BrowserContext.RouteFromHARAsync()](/api/class-browsercontext.mdx#browser-context-route-from-har).

**Usage**

```csharp
await BrowserContext.UnrouteAllAsync(options);
```

**Arguments**
- `options` `BrowserContextUnrouteAllOptions?` *(optional)*
  - `Behavior` `enum UnrouteBehavior { Wait, IgnoreErrors, Default }?` *(optional)*
    
    Specifies whether to wait for already running handlers and what to do if they throw errors:
    * `'default'` - do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may result in unhandled error
    * `'wait'` - wait for current handler calls (if any) to finish
    * `'ignoreErrors'` - do not wait for current handler calls (if any) to finish, all errors thrown by the handlers after unrouting are silently caught

**Returns**
- void

---

## Properties

### APIRequest {/* #browser-context-request */}



API testing helper associated with this context. Requests made with this API will use context cookies.

**Usage**

```csharp
BrowserContext.APIRequest
```

**Type**
- APIRequestContext

---

### Clock {/* #browser-context-clock */}



Playwright has ability to mock clock and passage of time.

**Usage**

```csharp
BrowserContext.Clock
```

**Type**
- Clock

---

### Credentials {/* #browser-context-credentials */}



Virtual WebAuthn authenticator for this context. Lets tests seed credentials and intercept `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies.

**Usage**

```csharp
BrowserContext.Credentials
```

**Type**
- Credentials

---

### Debugger {/* #browser-context-debugger */}



Debugger allows to pause and resume the execution.

**Usage**

```csharp
BrowserContext.Debugger
```

**Type**
- Debugger

---

### Tracing {/* #browser-context-tracing */}



**Usage**

```csharp
BrowserContext.Tracing
```

**Type**
- Tracing

---

## Events

### event Close {/* #browser-context-event-close */}



Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [Browser.CloseAsync()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```csharp
BrowserContext.Close += async (_, browserContext) => {};
```

**Event data**
- BrowserContext

---

### event Console {/* #browser-context-event-console */}



Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the ConsoleMessage event handler argument.

**Usage**

```csharp
context.Console += async (_, msg) =>
{
    foreach (var arg in msg.Args)
        Console.WriteLine(await arg.JsonValueAsync<object>());
};

await page.EvaluateAsync("console.log('hello', 5, { foo: 'bar' })");
```

**Event data**
- ConsoleMessage

---

### event Dialog {/* #browser-context-event-dialog */}



Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [Dialog.AcceptAsync()](/api/class-dialog.mdx#dialog-accept) or [Dialog.DismissAsync()](/api/class-dialog.mdx#dialog-dismiss) the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.

**Usage**

```csharp
Context.Dialog += async (_, dialog) =>
{
    await dialog.AcceptAsync();
};
```

:::note
When no [Page.Dialog](/api/class-page.mdx#page-event-dialog) or [BrowserContext.Dialog](/api/class-browsercontext.mdx#browser-context-event-dialog) listeners are present, all dialogs are automatically dismissed.
:::

**Event data**
- Dialog

---

### event Download {/* #browser-context-event-download */}



Emitted when attachment download started in any page belonging to this context. User can access basic file operations on downloaded content via the passed Download instance. See also [Page.Download](/api/class-page.mdx#page-event-download) to receive events about a specific page.

**Usage**

```csharp
BrowserContext.Download += async (_, download) => {};
```

**Event data**
- Download

---

### event FrameAttached {/* #browser-context-event-frame-attached */}



Emitted when a frame is attached in any page belonging to this context. See also [Page.FrameAttached](/api/class-page.mdx#page-event-frame-attached) to receive events about a specific page.

**Usage**

```csharp
BrowserContext.FrameAttached += async (_, frame) => {};
```

**Event data**
- Frame

---

### event FrameDetached {/* #browser-context-event-frame-detached */}



Emitted when a frame is detached in any page belonging to this context. See also [Page.FrameDetached](/api/class-page.mdx#page-event-frame-detached) to receive events about a specific page.

**Usage**

```csharp
BrowserContext.FrameDetached += async (_, frame) => {};
```

**Event data**
- Frame

---

### event FrameNavigated {/* #browser-context-event-frame-navigated */}



Emitted when a frame is navigated to a new url in any page belonging to this context. See also [Page.FrameNavigated](/api/class-page.mdx#page-event-frame-navigated) to receive events about navigations in a specific page.

**Usage**

```csharp
BrowserContext.FrameNavigated += async (_, frame) => {};
```

**Event data**
- Frame

---

### event Page {/* #browser-context-event-page */}



The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [Page.Popup](/api/class-page.mdx#page-event-popup) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen to this network request, use [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route) and [BrowserContext.Request](/api/class-browsercontext.mdx#browser-context-event-request) respectively instead of similar methods on the Page.

```csharp
var popup = await context.RunAndWaitForPageAsync(async =>
{
    await page.GetByText("open new page").ClickAsync();
});
Console.WriteLine(await popup.EvaluateAsync<string>("location.href"));
```

:::note
Use [Page.WaitForLoadStateAsync()](/api/class-page.mdx#page-wait-for-load-state) to wait until the page gets to a particular state (you should not need it in most cases).
:::

**Usage**

```csharp
BrowserContext.Page += async (_, page) => {};
```

**Event data**
- Page

---

### event PageClose {/* #browser-context-event-page-close */}



Emitted when a page in this context is closed. See also [Page.Close](/api/class-page.mdx#page-event-close) to receive events about a specific page.

**Usage**

```csharp
BrowserContext.PageClose += async (_, page) => {};
```

**Event data**
- Page

---

### event PageLoad {/* #browser-context-event-page-load */}



Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched in any page belonging to this context. See also [Page.Load](/api/class-page.mdx#page-event-load) to receive events about a specific page.

**Usage**

```csharp
BrowserContext.PageLoad += async (_, page) => {};
```

**Event data**
- Page

---

### event Request {/* #browser-context-event-request */}



Emitted when a request is issued from any pages created through this context. The request object is read-only. To only listen for requests from a particular page, use [Page.Request](/api/class-page.mdx#page-event-request).

In order to intercept and mutate requests, see [BrowserContext.RouteAsync()](/api/class-browsercontext.mdx#browser-context-route) or [Page.RouteAsync()](/api/class-page.mdx#page-route).

**Usage**

```csharp
BrowserContext.Request += async (_, request) => {};
```

**Event data**
- Request

---

### event RequestFailed {/* #browser-context-event-request-failed */}



Emitted when a request fails, for example by timing out. To only listen for failed requests from a particular page, use [Page.RequestFailed](/api/class-page.mdx#page-event-request-failed).

:::note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [BrowserContext.RequestFinished](/api/class-browsercontext.mdx#browser-context-event-request-finished) event and not with [BrowserContext.RequestFailed](/api/class-browsercontext.mdx#browser-context-event-request-failed).
:::

**Usage**

```csharp
BrowserContext.RequestFailed += async (_, request) => {};
```

**Event data**
- Request

---

### event RequestFinished {/* #browser-context-event-request-finished */}



Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for successful requests from a particular page, use [Page.RequestFinished](/api/class-page.mdx#page-event-request-finished).

**Usage**

```csharp
BrowserContext.RequestFinished += async (_, request) => {};
```

**Event data**
- Request

---

### event Response {/* #browser-context-event-response */}



Emitted when response status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for response events from a particular page, use [Page.Response](/api/class-page.mdx#page-event-response).

**Usage**

```csharp
BrowserContext.Response += async (_, response) => {};
```

**Event data**
- Response

---

### event WebError {/* #browser-context-event-web-error */}



Emitted when exception is unhandled in any of the pages in this context. To listen for errors from a particular page, use [Page.PageError](/api/class-page.mdx#page-event-page-error) instead.

**Usage**

```csharp
BrowserContext.WebError += async (_, webError) => {};
```

**Event data**
- WebError

---

## Deprecated

### event BackgroundPage {/* #browser-context-event-background-page */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


This event is not emitted.

**Usage**

```csharp
BrowserContext.BackgroundPage += async (_, page) => {};
```

**Event data**
- Page

---

### BackgroundPages {/* #browser-context-background-pages */}



:::warningDeprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

:::


Returns an empty list.

**Usage**

```csharp
BrowserContext.BackgroundPages
```

**Returns**
- IReadOnlyList<Page>


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
