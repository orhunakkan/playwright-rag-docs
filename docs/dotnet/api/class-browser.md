# Browser

> **Source:** [playwright.dev/dotnet/docs/api/class-browser](https://playwright.dev/dotnet/docs/api/class-browser)

---

A Browser is created via [BrowserType.LaunchAsync()](/api/class-browsertype.mdx#browser-type-launch). An example of using a Browser to create a Page:

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var firefox = playwright.Firefox;
var browser = await firefox.LaunchAsync(new() { Headless = false });
var page = await browser.NewPageAsync();
await page.GotoAsync("https://www.bing.com");
await browser.CloseAsync();
```


---

## Methods

### BindAsync {/* #browser-bind */}



Binds the browser to a named pipe or web socket, making it available for other clients to connect to.

**Usage**

```csharp
await Browser.BindAsync(title, options);
```

**Arguments**
- `title` string
  
  Title of the browser server, used for identification.
- `options` `BrowserBindOptions?` *(optional)*
  - `Host` string? *(optional)*
    
    Host to bind the web socket server to. When specified, a web socket server is created instead of a named pipe.
  - `Port` int? *(optional)*
    
    Port to bind the web socket server to. When specified, a web socket server is created instead of a named pipe. Use `0` to let the OS pick an available port.
  - `WorkspaceDir` string? *(optional)*
    
    Working directory associated with this browser server.

**Returns**
- Bind
  - `endpoint` string
    
    
---

### BrowserType {/* #browser-browser-type */}



Get the browser type (chromium, firefox or webkit) that the browser belongs to.

**Usage**

```csharp
Browser.BrowserType
```

**Returns**
- BrowserType

---

### CloseAsync {/* #browser-close */}



In case this browser is obtained using [BrowserType.LaunchAsync()](/api/class-browsertype.mdx#browser-type-launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

:::note

This is similar to force-quitting the browser. To close pages gracefully and ensure you receive page close events, call [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) on any BrowserContext instances you explicitly created earlier using [Browser.NewContextAsync()](/api/class-browser.mdx#browser-new-context) **before** calling [Browser.CloseAsync()](/api/class-browser.mdx#browser-close).
:::

The Browser object itself is considered to be disposed and cannot be used anymore.

**Usage**

```csharp
await Browser.CloseAsync(options);
```

**Arguments**
- `options` `BrowserCloseOptions?` *(optional)*
  - `Reason` string? *(optional)* 
    
    The reason to be reported to the operations interrupted by the browser closure.

**Returns**
- void

---

### Contexts {/* #browser-contexts */}



Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

**Usage**

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Webkit.LaunchAsync();
System.Console.WriteLine(browser.Contexts.Count); // prints "0"
var context = await browser.NewContextAsync();
System.Console.WriteLine(browser.Contexts.Count); // prints "1"
```

**Returns**
- IReadOnlyList<BrowserContext>

---

### IsConnected {/* #browser-is-connected */}



Indicates that the browser is connected.

**Usage**

```csharp
Browser.IsConnected
```

**Returns**
- bool

---

### NewBrowserCDPSessionAsync {/* #browser-new-browser-cdp-session */}



:::note

CDP Sessions are only supported on Chromium-based browsers.
:::

Returns the newly created browser session.

**Usage**

```csharp
await Browser.NewBrowserCDPSessionAsync();
```

**Returns**
- CDPSession

---

### NewContextAsync {/* #browser-new-context */}



Creates a new browser context. It won't share cookies/cache with other browser contexts.

:::note

If directly using this method to create BrowserContexts, it is best practice to explicitly close the returned context via [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) when your code is done with the BrowserContext, and before calling [Browser.CloseAsync()](/api/class-browser.mdx#browser-close). This will ensure the `context` is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved.
:::

**Usage**

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Firefox.LaunchAsync();
// Create a new incognito browser context.
var context = await browser.NewContextAsync();
// Create a new page in a pristine context.
var page = await context.NewPageAsync(); ;
await page.GotoAsync("https://www.bing.com");

// Gracefully close up everything
await context.CloseAsync();
await browser.CloseAsync();
```

**Arguments**
- `options` `BrowserNewContextOptions?` *(optional)*
  - `AcceptDownloads` bool? *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `BaseURL` string? *(optional)*
    
    When using [Page.GotoAsync()](/api/class-page.mdx#page-goto), [Page.RouteAsync()](/api/class-page.mdx#page-route), [Page.WaitForURLAsync()](/api/class-page.mdx#page-wait-for-url), [Page.RunAndWaitForRequestAsync()](/api/class-page.mdx#page-wait-for-request), or [Page.RunAndWaitForResponseAsync()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `BypassCSP` bool? *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `ClientCertificates` IEnumerable?<ClientCertificates> *(optional)* 
    - `Origin` string
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `CertPath` string? *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `Cert` byte&#91;&#93;? *(optional)*
      
      Direct value of the certificate in PEM format.
    - `KeyPath` string? *(optional)*
      
      Path to the file with the private key in PEM format.
    - `Key` byte&#91;&#93;? *(optional)*
      
      Direct value of the private key in PEM format.
    - `PfxPath` string? *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `Pfx` byte&#91;&#93;? *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `Passphrase` string? *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `ColorScheme` `enum ColorScheme { Light, Dark, NoPreference, Null }?` *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.
  - `Contrast` `enum Contrast { NoPreference, More, Null }?` *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `DeviceScaleFactor` float? *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `ExtraHTTPHeaders` IDictionary?<string, string> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `ForcedColors` `enum ForcedColors { Active, None, Null }?` *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.
  - `Geolocation` Geolocation? *(optional)*
    - `Latitude` float
      
      Latitude between -90 and 90.
    - `Longitude` float
      
      Longitude between -180 and 180.
    - `Accuracy` float? *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `HasTouch` bool? *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `HttpCredentials` HttpCredentials? *(optional)*
    - `Username` string
      
      
    - `Password` string
      
      
    - `Origin` string? *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `Send` `enum HttpCredentialsSend { Unauthorized, Always }?` *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `IgnoreHTTPSErrors` bool? *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `IsMobile` bool? *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `JavaScriptEnabled` bool? *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `Locale` string? *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `Offline` bool? *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `Permissions` IEnumerable?<string> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [BrowserContext.GrantPermissionsAsync()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `Proxy` Proxy? *(optional)*
    - `Server` string
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `Bypass` string? *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `Username` string? *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `Password` string? *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `RecordHarContent` `enum HarContentPolicy { Omit, Embed, Attach }?` *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
  - `RecordHarMode` `enum HarMode { Full, Minimal }?` *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `RecordHarOmitContent` bool? *(optional)*
    
    Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
  - `RecordHarPath` string? *(optional)*
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `RecordHarUrlFilter|RecordHarUrlFilterRegex` string? | Regex? *(optional)*
  - `RecordVideoDir` string? *(optional)*
    
    Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `RecordVideoSize` RecordVideoSize? *(optional)*
    - `Width` int
      
      Video frame width.
    - `Height` int
      
      Video frame height.
    
    Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
  - `ReducedMotion` `enum ReducedMotion { Reduce, NoPreference, Null }?` *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `ScreenSize` ScreenSize? *(optional)*
    - `Width` int
      
      page width in pixels.
    - `Height` int
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [ViewportSize](/api/class-browser.mdx#browser-new-context-option-viewport) is set.
  - `ServiceWorkers` `enum ServiceWorkerPolicy { Allow, Block }?` *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `StorageState` string? *(optional)*
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.StorageStateAsync()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `StorageStatePath` string? *(optional)* 
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.StorageStateAsync()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.
  - `StrictSelectors` bool? *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `TimezoneId` string? *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `UserAgent` string? *(optional)*
    
    Specific user agent to use in this context.
  - `ViewportSize` ViewportSize? *(optional)*
    - `Width` int
      
      page width in pixels.
    - `Height` int
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `ViewportSize.NoViewport` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation.mdx#viewport).
    
    :::note
    
    The `ViewportSize.NoViewport` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- BrowserContext

---

### NewPageAsync {/* #browser-new-page */}



Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [Browser.NewContextAsync()](/api/class-browser.mdx#browser-new-context) followed by the [BrowserContext.NewPageAsync()](/api/class-browsercontext.mdx#browser-context-new-page) to control their exact life times.

**Usage**

```csharp
await Browser.NewPageAsync(options);
```

**Arguments**
- `options` `BrowserNewPageOptions?` *(optional)*
  - `AcceptDownloads` bool? *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `BaseURL` string? *(optional)*
    
    When using [Page.GotoAsync()](/api/class-page.mdx#page-goto), [Page.RouteAsync()](/api/class-page.mdx#page-route), [Page.WaitForURLAsync()](/api/class-page.mdx#page-wait-for-url), [Page.RunAndWaitForRequestAsync()](/api/class-page.mdx#page-wait-for-request), or [Page.RunAndWaitForResponseAsync()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `BypassCSP` bool? *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `ClientCertificates` IEnumerable?<ClientCertificates> *(optional)* 
    - `Origin` string
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `CertPath` string? *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `Cert` byte&#91;&#93;? *(optional)*
      
      Direct value of the certificate in PEM format.
    - `KeyPath` string? *(optional)*
      
      Path to the file with the private key in PEM format.
    - `Key` byte&#91;&#93;? *(optional)*
      
      Direct value of the private key in PEM format.
    - `PfxPath` string? *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `Pfx` byte&#91;&#93;? *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `Passphrase` string? *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `ColorScheme` `enum ColorScheme { Light, Dark, NoPreference, Null }?` *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.
  - `Contrast` `enum Contrast { NoPreference, More, Null }?` *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `DeviceScaleFactor` float? *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `ExtraHTTPHeaders` IDictionary?<string, string> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `ForcedColors` `enum ForcedColors { Active, None, Null }?` *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.
  - `Geolocation` Geolocation? *(optional)*
    - `Latitude` float
      
      Latitude between -90 and 90.
    - `Longitude` float
      
      Longitude between -180 and 180.
    - `Accuracy` float? *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `HasTouch` bool? *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `HttpCredentials` HttpCredentials? *(optional)*
    - `Username` string
      
      
    - `Password` string
      
      
    - `Origin` string? *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `Send` `enum HttpCredentialsSend { Unauthorized, Always }?` *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `IgnoreHTTPSErrors` bool? *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `IsMobile` bool? *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `JavaScriptEnabled` bool? *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `Locale` string? *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `Offline` bool? *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `Permissions` IEnumerable?<string> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [BrowserContext.GrantPermissionsAsync()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `Proxy` Proxy? *(optional)*
    - `Server` string
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `Bypass` string? *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `Username` string? *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `Password` string? *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `RecordHarContent` `enum HarContentPolicy { Omit, Embed, Attach }?` *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
  - `RecordHarMode` `enum HarMode { Full, Minimal }?` *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `RecordHarOmitContent` bool? *(optional)*
    
    Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
  - `RecordHarPath` string? *(optional)*
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `RecordHarUrlFilter|RecordHarUrlFilterRegex` string? | Regex? *(optional)*
  - `RecordVideoDir` string? *(optional)*
    
    Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [BrowserContext.CloseAsync()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `RecordVideoSize` RecordVideoSize? *(optional)*
    - `Width` int
      
      Video frame width.
    - `Height` int
      
      Video frame height.
    
    Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
  - `ReducedMotion` `enum ReducedMotion { Reduce, NoPreference, Null }?` *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [Page.EmulateMediaAsync()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `ScreenSize` ScreenSize? *(optional)*
    - `Width` int
      
      page width in pixels.
    - `Height` int
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [ViewportSize](/api/class-browser.mdx#browser-new-page-option-viewport) is set.
  - `ServiceWorkers` `enum ServiceWorkerPolicy { Allow, Block }?` *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `StorageState` string? *(optional)*
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.StorageStateAsync()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `StorageStatePath` string? *(optional)* 
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.StorageStateAsync()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.
  - `StrictSelectors` bool? *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `TimezoneId` string? *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `UserAgent` string? *(optional)*
    
    Specific user agent to use in this context.
  - `ViewportSize` ViewportSize? *(optional)*
    - `Width` int
      
      page width in pixels.
    - `Height` int
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `ViewportSize.NoViewport` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation.mdx#viewport).
    
    :::note
    
    The `ViewportSize.NoViewport` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- Page

---

### UnbindAsync {/* #browser-unbind */}



Unbinds the browser server previously bound with [Browser.BindAsync()](/api/class-browser.mdx#browser-bind).

**Usage**

```csharp
await Browser.UnbindAsync();
```

**Returns**
- void

---

### Version {/* #browser-version */}



Returns the browser version.

**Usage**

```csharp
Browser.Version
```

**Returns**
- string

---

## Events

### event Context {/* #browser-event-context */}



Emitted when a new browser context is created.

**Usage**

```csharp
Browser.Context += async (_, browserContext) => {};
```

**Event data**
- BrowserContext

---

### event Disconnected {/* #browser-event-disconnected */}



Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [Browser.CloseAsync()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```csharp
Browser.Disconnected += async (_, browser) => {};
```

**Event data**
- Browser


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
