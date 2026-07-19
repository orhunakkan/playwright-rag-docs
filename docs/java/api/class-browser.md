# Browser

> **Source:** [playwright.dev/java/docs/api/class-browser](https://playwright.dev/java/docs/api/class-browser)

---

A Browser is created via [BrowserType.launch()](/api/class-browsertype.mdx#browser-type-launch). An example of using a Browser to create a Page:

```java
import com.microsoft.playwright.*;

public class Example {
 public static void main(String[] args) {
   try (Playwright playwright = Playwright.create()) {
     BrowserType firefox = playwright.firefox();
     Browser browser = firefox.launch();
     Page page = browser.newPage();
     page.navigate("https://example.com");
     browser.close();
   }
 }
}
```


---

## Methods

### bind {/* #browser-bind */}



Binds the browser to a named pipe or web socket, making it available for other clients to connect to.

**Usage**

```java
Browser.bind(title);
Browser.bind(title, options);
```

**Arguments**
- `title` String
  
  Title of the browser server, used for identification.
- `options` `Browser.BindOptions` *(optional)*
  - `setHost` String *(optional)*
    
    Host to bind the web socket server to. When specified, a web socket server is created instead of a named pipe.
  - `setPort` int *(optional)*
    
    Port to bind the web socket server to. When specified, a web socket server is created instead of a named pipe. Use `0` to let the OS pick an available port.
  - `setWorkspaceDir` String *(optional)*
    
    Working directory associated with this browser server.

**Returns**
- Bind
  - `endpoint` String
    
    
---

### browserType {/* #browser-browser-type */}



Get the browser type (chromium, firefox or webkit) that the browser belongs to.

**Usage**

```java
Browser.browserType();
```

**Returns**
- BrowserType

---

### close {/* #browser-close */}



In case this browser is obtained using [BrowserType.launch()](/api/class-browsertype.mdx#browser-type-launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

:::note

This is similar to force-quitting the browser. To close pages gracefully and ensure you receive page close events, call [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) on any BrowserContext instances you explicitly created earlier using [Browser.newContext()](/api/class-browser.mdx#browser-new-context) **before** calling [Browser.close()](/api/class-browser.mdx#browser-close).
:::

The Browser object itself is considered to be disposed and cannot be used anymore.

**Usage**

```java
Browser.close();
Browser.close(options);
```

**Arguments**
- `options` `Browser.CloseOptions` *(optional)*
  - `setReason` String *(optional)* 
    
    The reason to be reported to the operations interrupted by the browser closure.

**Returns**
- void

---

### contexts {/* #browser-contexts */}



Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

**Usage**

```java
Browser browser = pw.webkit().launch();
System.out.println(browser.contexts().size()); // prints "0"
BrowserContext context = browser.newContext();
System.out.println(browser.contexts().size()); // prints "1"
```

**Returns**
- List<BrowserContext>

---

### isConnected {/* #browser-is-connected */}



Indicates that the browser is connected.

**Usage**

```java
Browser.isConnected();
```

**Returns**
- boolean

---

### newBrowserCDPSession {/* #browser-new-browser-cdp-session */}



:::note

CDP Sessions are only supported on Chromium-based browsers.
:::

Returns the newly created browser session.

**Usage**

```java
Browser.newBrowserCDPSession();
```

**Returns**
- CDPSession

---

### newContext {/* #browser-new-context */}



Creates a new browser context. It won't share cookies/cache with other browser contexts.

:::note

If directly using this method to create BrowserContexts, it is best practice to explicitly close the returned context via [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) when your code is done with the BrowserContext, and before calling [Browser.close()](/api/class-browser.mdx#browser-close). This will ensure the `context` is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved.
:::

**Usage**

```java
Browser browser = playwright.firefox().launch();  // Or 'chromium' or 'webkit'.
// Create a new incognito browser context.
BrowserContext context = browser.newContext();
// Create a new page in a pristine context.
Page page = context.newPage();
page.navigate("https://example.com");

// Graceful close up everything
context.close();
browser.close();
```

**Arguments**
- `options` `Browser.NewContextOptions` *(optional)*
  - `setAcceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `setBaseURL` String *(optional)*
    
    When using [Page.navigate()](/api/class-page.mdx#page-goto), [Page.route()](/api/class-page.mdx#page-route), [Page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [Page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [Page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `setBypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `setClientCertificates` List<ClientCertificates> *(optional)* 
    - `setOrigin` String
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `setCertPath` Path *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `setCert` byte&#91;&#93; *(optional)*
      
      Direct value of the certificate in PEM format.
    - `setKeyPath` Path *(optional)*
      
      Path to the file with the private key in PEM format.
    - `setKey` byte&#91;&#93; *(optional)*
      
      Direct value of the private key in PEM format.
    - `setPfxPath` Path *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `setPfx` byte&#91;&#93; *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `setPassphrase` String *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `setColorScheme` null | `enum ColorScheme { LIGHT, DARK, NO_PREFERENCE }` *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.
  - `setContrast` null | `enum Contrast { NO_PREFERENCE, MORE }` *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `setDeviceScaleFactor` double *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `setExtraHTTPHeaders` Map<String, String> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `setForcedColors` null | `enum ForcedColors { ACTIVE, NONE }` *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.
  - `setGeolocation` Geolocation *(optional)*
    - `setLatitude` double
      
      Latitude between -90 and 90.
    - `setLongitude` double
      
      Longitude between -180 and 180.
    - `setAccuracy` double *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `setHasTouch` boolean *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `setHttpCredentials` HttpCredentials *(optional)*
    - `setUsername` String
      
      
    - `setPassword` String
      
      
    - `setOrigin` String *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `setSend` `enum HttpCredentialsSend { UNAUTHORIZED, ALWAYS }` *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `setIgnoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `setIsMobile` boolean *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `setJavaScriptEnabled` boolean *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `setLocale` String *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `setOffline` boolean *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `setPermissions` List<String> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [BrowserContext.grantPermissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `setProxy` Proxy *(optional)*
    - `setServer` String
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `setBypass` String *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `setUsername` String *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `setPassword` String *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `setRecordHarContent` `enum HarContentPolicy { OMIT, EMBED, ATTACH }` *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
  - `setRecordHarMode` `enum HarMode { FULL, MINIMAL }` *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `setRecordHarOmitContent` boolean *(optional)*
    
    Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
  - `setRecordHarPath` Path *(optional)*
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `setRecordHarUrlFilter` String | Pattern *(optional)*
  - `setRecordVideoDir` Path *(optional)*
    
    Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `setRecordVideoSize` RecordVideoSize *(optional)*
    - `setWidth` int
      
      Video frame width.
    - `setHeight` int
      
      Video frame height.
    
    Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
  - `setReducedMotion` null | `enum ReducedMotion { REDUCE, NO_PREFERENCE }` *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `setScreenSize` ScreenSize *(optional)*
    - `setWidth` int
      
      page width in pixels.
    - `setHeight` int
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [setViewportSize](/api/class-browser.mdx#browser-new-context-option-viewport) is set.
  - `setServiceWorkers` `enum ServiceWorkerPolicy { ALLOW, BLOCK }` *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `setStorageState` String *(optional)*
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `setStorageStatePath` Path *(optional)* 
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.
  - `setStrictSelectors` boolean *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `setTimezoneId` String *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `setUserAgent` String *(optional)*
    
    Specific user agent to use in this context.
  - `setViewportSize` null | ViewportSize *(optional)*
    - `setWidth` int
      
      page width in pixels.
    - `setHeight` int
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation#viewport).
    
    :::note
    
    The `null` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- BrowserContext

---

### newPage {/* #browser-new-page */}



Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [Browser.newContext()](/api/class-browser.mdx#browser-new-context) followed by the [BrowserContext.newPage()](/api/class-browsercontext.mdx#browser-context-new-page) to control their exact life times.

**Usage**

```java
Browser.newPage();
Browser.newPage(options);
```

**Arguments**
- `options` `Browser.NewPageOptions` *(optional)*
  - `setAcceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `setBaseURL` String *(optional)*
    
    When using [Page.navigate()](/api/class-page.mdx#page-goto), [Page.route()](/api/class-page.mdx#page-route), [Page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [Page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [Page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `setBypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `setClientCertificates` List<ClientCertificates> *(optional)* 
    - `setOrigin` String
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `setCertPath` Path *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `setCert` byte&#91;&#93; *(optional)*
      
      Direct value of the certificate in PEM format.
    - `setKeyPath` Path *(optional)*
      
      Path to the file with the private key in PEM format.
    - `setKey` byte&#91;&#93; *(optional)*
      
      Direct value of the private key in PEM format.
    - `setPfxPath` Path *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `setPfx` byte&#91;&#93; *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `setPassphrase` String *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `setColorScheme` null | `enum ColorScheme { LIGHT, DARK, NO_PREFERENCE }` *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.
  - `setContrast` null | `enum Contrast { NO_PREFERENCE, MORE }` *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `setDeviceScaleFactor` double *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `setExtraHTTPHeaders` Map<String, String> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `setForcedColors` null | `enum ForcedColors { ACTIVE, NONE }` *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.
  - `setGeolocation` Geolocation *(optional)*
    - `setLatitude` double
      
      Latitude between -90 and 90.
    - `setLongitude` double
      
      Longitude between -180 and 180.
    - `setAccuracy` double *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `setHasTouch` boolean *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `setHttpCredentials` HttpCredentials *(optional)*
    - `setUsername` String
      
      
    - `setPassword` String
      
      
    - `setOrigin` String *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `setSend` `enum HttpCredentialsSend { UNAUTHORIZED, ALWAYS }` *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `setIgnoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `setIsMobile` boolean *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `setJavaScriptEnabled` boolean *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `setLocale` String *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `setOffline` boolean *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `setPermissions` List<String> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [BrowserContext.grantPermissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `setProxy` Proxy *(optional)*
    - `setServer` String
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `setBypass` String *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `setUsername` String *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `setPassword` String *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `setRecordHarContent` `enum HarContentPolicy { OMIT, EMBED, ATTACH }` *(optional)*
    
    Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
  - `setRecordHarMode` `enum HarMode { FULL, MINIMAL }` *(optional)*
    
    When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `setRecordHarOmitContent` boolean *(optional)*
    
    Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
  - `setRecordHarPath` Path *(optional)*
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `setRecordHarUrlFilter` String | Pattern *(optional)*
  - `setRecordVideoDir` Path *(optional)*
    
    Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [BrowserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `setRecordVideoSize` RecordVideoSize *(optional)*
    - `setWidth` int
      
      Video frame width.
    - `setHeight` int
      
      Video frame height.
    
    Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
  - `setReducedMotion` null | `enum ReducedMotion { REDUCE, NO_PREFERENCE }` *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `setScreenSize` ScreenSize *(optional)*
    - `setWidth` int
      
      page width in pixels.
    - `setHeight` int
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [setViewportSize](/api/class-browser.mdx#browser-new-page-option-viewport) is set.
  - `setServiceWorkers` `enum ServiceWorkerPolicy { ALLOW, BLOCK }` *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `setStorageState` String *(optional)*
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `setStorageStatePath` Path *(optional)* 
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [BrowserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state). Path to the file with saved storage state.
  - `setStrictSelectors` boolean *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `setTimezoneId` String *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `setUserAgent` String *(optional)*
    
    Specific user agent to use in this context.
  - `setViewportSize` null | ViewportSize *(optional)*
    - `setWidth` int
      
      page width in pixels.
    - `setHeight` int
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation#viewport).
    
    :::note
    
    The `null` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- Page

---

### startTracing {/* #browser-start-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

You can use [Browser.startTracing()](/api/class-browser.mdx#browser-start-tracing) and [Browser.stopTracing()](/api/class-browser.mdx#browser-stop-tracing) to create a trace file that can be opened in Chrome DevTools performance panel.

**Usage**

```java
browser.startTracing(page, new Browser.StartTracingOptions()
  .setPath(Paths.get("trace.json")));
page.navigate("https://www.google.com");
browser.stopTracing();
```

**Arguments**
- `page` Page *(optional)*
  
  Optional, if specified, tracing includes screenshots of the given page.
- `options` `Browser.StartTracingOptions` *(optional)*
  - `setCategories` List<String> *(optional)*
    
    specify custom categories to use instead of default.
  - `setPath` Path *(optional)*
    
    A path to write the trace file to.
  - `setScreenshots` boolean *(optional)*
    
    captures screenshots in the trace.

**Returns**
- void

---

### stopTracing {/* #browser-stop-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

Returns the buffer with trace data.

**Usage**

```java
Browser.stopTracing();
```

**Returns**
- byte&#91;&#93;

---

### unbind {/* #browser-unbind */}



Unbinds the browser server previously bound with [Browser.bind()](/api/class-browser.mdx#browser-bind).

**Usage**

```java
Browser.unbind();
```

**Returns**
- void

---

### version {/* #browser-version */}



Returns the browser version.

**Usage**

```java
Browser.version();
```

**Returns**
- String

---

## Events

### onContext(handler) {/* #browser-event-context */}



Emitted when a new browser context is created.

**Usage**

```java
Browser.onContext(handler)
```

**Event data**
- BrowserContext

---

### onDisconnected(handler) {/* #browser-event-disconnected */}



Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [Browser.close()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```java
Browser.onDisconnected(handler)
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
