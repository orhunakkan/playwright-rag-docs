# Browser

> **Source:** [playwright.dev/docs/api/class-browser](https://playwright.dev/docs/api/class-browser)

---

A Browser is created via [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch). An example of using a Browser to create a Page:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();
```


---

## Methods

### bind {/* #browser-bind */}



Binds the browser to a named pipe or web socket, making it available for other clients to connect to.

**Usage**

```js
await browser.bind(title);
await browser.bind(title, options);
```

**Arguments**
- `title` string
  
  Title of the browser server, used for identification.
- `options` Object *(optional)*
  - `host` string *(optional)*
    
    Host to bind the web socket server to. When specified, a web socket server is created instead of a named pipe.
  - `metadata` Object<string, Object> *(optional)*
    
    Additional metadata to associate with the browser server.
  - `port` number *(optional)*
    
    Port to bind the web socket server to. When specified, a web socket server is created instead of a named pipe. Use `0` to let the OS pick an available port.
  - `workspaceDir` string *(optional)*
    
    Working directory associated with this browser server.

**Returns**
- Promise<Object>
  - `endpoint` string
    
    
---

### browserType {/* #browser-browser-type */}



Get the browser type (chromium, firefox or webkit) that the browser belongs to.

**Usage**

```js
browser.browserType();
```

**Returns**
- BrowserType

---

### close {/* #browser-close */}



In case this browser is obtained using [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

:::note

This is similar to force-quitting the browser. To close pages gracefully and ensure you receive page close events, call [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) on any BrowserContext instances you explicitly created earlier using [browser.newContext()](/api/class-browser.mdx#browser-new-context) **before** calling [browser.close()](/api/class-browser.mdx#browser-close).
:::

The Browser object itself is considered to be disposed and cannot be used anymore.

**Usage**

```js
await browser.close();
await browser.close(options);
```

**Arguments**
- `options` Object *(optional)*
  - `reason` string *(optional)* 
    
    The reason to be reported to the operations interrupted by the browser closure.

**Returns**
- Promise<void>

---

### contexts {/* #browser-contexts */}



Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

**Usage**

```js
const browser = await pw.webkit.launch();
console.log(browser.contexts().length); // prints `0`

const context = await browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

**Returns**
- Array<BrowserContext>

---

### isConnected {/* #browser-is-connected */}



Indicates that the browser is connected.

**Usage**

```js
browser.isConnected();
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

```js
await browser.newBrowserCDPSession();
```

**Returns**
- Promise<CDPSession>

---

### newContext {/* #browser-new-context */}



Creates a new browser context. It won't share cookies/cache with other browser contexts.

:::note

If directly using this method to create BrowserContexts, it is best practice to explicitly close the returned context via [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) when your code is done with the BrowserContext, and before calling [browser.close()](/api/class-browser.mdx#browser-close). This will ensure the `context` is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved.
:::

**Usage**

```js
(async () => {
  const browser = await playwright.firefox.launch();  // Or 'chromium' or 'webkit'.
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  await page.goto('https://example.com');

  // Gracefully close up everything
  await context.close();
  await browser.close();
})();
```

**Arguments**
- `options` Object *(optional)*
  - `acceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `baseURL` string *(optional)*
    
    When using [page.goto()](/api/class-page.mdx#page-goto), [page.route()](/api/class-page.mdx#page-route), [page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `bypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `clientCertificates` Array<Object> *(optional)* 
    - `origin` string
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `certPath` string *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `cert` Buffer *(optional)*
      
      Direct value of the certificate in PEM format.
    - `keyPath` string *(optional)*
      
      Path to the file with the private key in PEM format.
    - `key` Buffer *(optional)*
      
      Direct value of the private key in PEM format.
    - `pfxPath` string *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `pfx` Buffer *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `passphrase` string *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `colorScheme` null | "light" | "dark" | "no-preference" *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.
  - `contrast` null | "no-preference" | "more" *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `deviceScaleFactor` number *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `extraHTTPHeaders` Object<string, string> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `forcedColors` null | "active" | "none" *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.
  - `geolocation` Object *(optional)*
    - `latitude` number
      
      Latitude between -90 and 90.
    - `longitude` number
      
      Longitude between -180 and 180.
    - `accuracy` number *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `hasTouch` boolean *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `httpCredentials` Object *(optional)*
    - `username` string
      
      
    - `password` string
      
      
    - `origin` string *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `send` "unauthorized" | "always" *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `isMobile` boolean *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `javaScriptEnabled` boolean *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `locale` string *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `logger` Logger *(optional)*
    
    :::warningDeprecated
    The logs received by the logger are incomplete. Please use tracing instead.
    :::
    
    
    Logger sink for Playwright logging.
  - `offline` boolean *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `permissions` Array<string> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `proxy` Object *(optional)*
    - `server` string
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `bypass` string *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `username` string *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `password` string *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `recordHar` Object *(optional)*
    - `omitContent` boolean *(optional)*
      
      Optional setting to control whether to omit request content from the HAR. Defaults to `false`. Deprecated, use `content` policy instead.
    - `content` "omit" | "embed" | "attach" *(optional)*
      
      Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
    - `path` string
      
      Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, `content: 'attach'` is used by default.
    - `mode` "full" | "minimal" *(optional)*
      
      When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
    - `urlFilter` string | RegExp *(optional)*
      
      A glob or regex pattern to filter requests that are stored in the HAR. When a [baseURL](/api/class-browser.mdx#browser-new-context-option-base-url) via the context options was provided and the passed URL is a path, it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor. Defaults to none.
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `recordVideo` Object *(optional)*
    - `dir` string *(optional)*
      
      Path to the directory to put videos into. If not specified, the videos will be stored in `artifactsDir` (see [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch) options).
    - `size` Object *(optional)*
      - `width` number
        
        Video frame width.
      - `height` number
        
        Video frame height.
      
      Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
    - `showActions` Object *(optional)*
      - `duration` number *(optional)*
        
        How long each annotation is displayed in milliseconds. Defaults to `500`.
      - `position` "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" *(optional)*
        
        Position of the action title overlay. Defaults to `"top-right"`.
      - `fontSize` number *(optional)*
        
        Font size of the action title in pixels. Defaults to `24`.
      - `cursor` "none" | "pointer" *(optional)*
        
        Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
      
      If specified, enables visual annotations on interacted elements during video recording.
    
    Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `reducedMotion` null | "reduce" | "no-preference" *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `screen` Object *(optional)*
    - `width` number
      
      page width in pixels.
    - `height` number
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](/api/class-browser.mdx#browser-new-context-option-viewport) is set.
  - `serviceWorkers` "allow" | "block" *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `storageState` string | Object *(optional)*
    - `cookies` Array<Object>
      - `name` string
        
        
      - `value` string
        
        
      - `domain` string
        
        Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"
      - `path` string
        
        Domain and path are required
      - `expires` number
        
        Unix time in seconds.
      - `httpOnly` boolean
        
        
      - `secure` boolean
        
        
      - `sameSite` "Strict" | "Lax" | "None"
        
        sameSite flag
      
      Cookies to set for context
    - `origins` Array<Object>
      - `origin` string
        
        
      - `localStorage` Array<Object>
        - `name` string
          
          
        - `value` string
          
          
        localStorage to set for context
      
      
    Learn more about [storage state and auth](../auth.mdx).
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [browserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `strictSelectors` boolean *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `timezoneId` string *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `userAgent` string *(optional)*
    
    Specific user agent to use in this context.
  - `viewport` null | Object *(optional)*
    - `width` number
      
      page width in pixels.
    - `height` number
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation#viewport).
    
    :::note
    
    The `null` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- Promise<BrowserContext>

---

### newPage {/* #browser-new-page */}



Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [browser.newContext()](/api/class-browser.mdx#browser-new-context) followed by the [browserContext.newPage()](/api/class-browsercontext.mdx#browser-context-new-page) to control their exact life times.

**Usage**

```js
await browser.newPage();
await browser.newPage(options);
```

**Arguments**
- `options` Object *(optional)*
  - `acceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `baseURL` string *(optional)*
    
    When using [page.goto()](/api/class-page.mdx#page-goto), [page.route()](/api/class-page.mdx#page-route), [page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `bypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `clientCertificates` Array<Object> *(optional)* 
    - `origin` string
      
      Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
    - `certPath` string *(optional)*
      
      Path to the file with the certificate in PEM format.
    - `cert` Buffer *(optional)*
      
      Direct value of the certificate in PEM format.
    - `keyPath` string *(optional)*
      
      Path to the file with the private key in PEM format.
    - `key` Buffer *(optional)*
      
      Direct value of the private key in PEM format.
    - `pfxPath` string *(optional)*
      
      Path to the PFX or PKCS12 encoded private key and certificate chain.
    - `pfx` Buffer *(optional)*
      
      Direct value of the PFX or PKCS12 encoded private key and certificate chain.
    - `passphrase` string *(optional)*
      
      Passphrase for the private key (PEM or PFX).
    
    TLS Client Authentication allows the server to request a client certificate and verify it.
    
    **Details**
    
    An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
    
    Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
    
    :::note
    
    When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
    :::
    
  - `colorScheme` null | "light" | "dark" | "no-preference" *(optional)*
    
    Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.
  - `contrast` null | "no-preference" | "more" *(optional)*
    
    Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `deviceScaleFactor` number *(optional)*
    
    Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
  - `extraHTTPHeaders` Object<string, string> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `forcedColors` null | "active" | "none" *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.
  - `geolocation` Object *(optional)*
    - `latitude` number
      
      Latitude between -90 and 90.
    - `longitude` number
      
      Longitude between -180 and 180.
    - `accuracy` number *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `hasTouch` boolean *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `httpCredentials` Object *(optional)*
    - `username` string
      
      
    - `password` string
      
      
    - `origin` string *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `send` "unauthorized" | "always" *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `isMobile` boolean *(optional)*
    
    Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
  - `javaScriptEnabled` boolean *(optional)*
    
    Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
  - `locale` string *(optional)*
    
    Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
  - `logger` Logger *(optional)*
    
    :::warningDeprecated
    The logs received by the logger are incomplete. Please use tracing instead.
    :::
    
    
    Logger sink for Playwright logging.
  - `offline` boolean *(optional)*
    
    Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
  - `permissions` Array<string> *(optional)*
    
    A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
  - `proxy` Object *(optional)*
    - `server` string
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `bypass` string *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `username` string *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `password` string *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings to use with this context. Defaults to none.
  - `recordHar` Object *(optional)*
    - `omitContent` boolean *(optional)*
      
      Optional setting to control whether to omit request content from the HAR. Defaults to `false`. Deprecated, use `content` policy instead.
    - `content` "omit" | "embed" | "attach" *(optional)*
      
      Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
    - `path` string
      
      Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, `content: 'attach'` is used by default.
    - `mode` "full" | "minimal" *(optional)*
      
      When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
    - `urlFilter` string | RegExp *(optional)*
      
      A glob or regex pattern to filter requests that are stored in the HAR. When a [baseURL](/api/class-browser.mdx#browser-new-context-option-base-url) via the context options was provided and the passed URL is a path, it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor. Defaults to none.
    
    Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
  - `recordVideo` Object *(optional)*
    - `dir` string *(optional)*
      
      Path to the directory to put videos into. If not specified, the videos will be stored in `artifactsDir` (see [browserType.launch()](/api/class-browsertype.mdx#browser-type-launch) options).
    - `size` Object *(optional)*
      - `width` number
        
        Video frame width.
      - `height` number
        
        Video frame height.
      
      Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
    - `showActions` Object *(optional)*
      - `duration` number *(optional)*
        
        How long each annotation is displayed in milliseconds. Defaults to `500`.
      - `position` "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" *(optional)*
        
        Position of the action title overlay. Defaults to `"top-right"`.
      - `fontSize` number *(optional)*
        
        Font size of the action title in pixels. Defaults to `24`.
      - `cursor` "none" | "pointer" *(optional)*
        
        Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
      
      If specified, enables visual annotations on interacted elements during video recording.
    
    Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [browserContext.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
  - `reducedMotion` null | "reduce" | "no-preference" *(optional)*
    
    Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.
  - `screen` Object *(optional)*
    - `width` number
      
      page width in pixels.
    - `height` number
      
      page height in pixels.
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](/api/class-browser.mdx#browser-new-page-option-viewport) is set.
  - `serviceWorkers` "allow" | "block" *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `storageState` string | Object *(optional)*
    - `cookies` Array<Object>
      - `name` string
        
        
      - `value` string
        
        
      - `domain` string
        
        Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"
      - `path` string
        
        Domain and path are required
      - `expires` number
        
        Unix time in seconds.
      - `httpOnly` boolean
        
        
      - `secure` boolean
        
        
      - `sameSite` "Strict" | "Lax" | "None"
        
        sameSite flag
      
      Cookies to set for context
    - `origins` Array<Object>
      - `origin` string
        
        
      - `localStorage` Array<Object>
        - `name` string
          
          
        - `value` string
          
          
        localStorage to set for context
      
      
    Learn more about [storage state and auth](../auth.mdx).
    
    Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [browserContext.storageState()](/api/class-browsercontext.mdx#browser-context-storage-state).
  - `strictSelectors` boolean *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `timezoneId` string *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `userAgent` string *(optional)*
    
    Specific user agent to use in this context.
  - `viewport` null | Object *(optional)*
    - `width` number
      
      page width in pixels.
    - `height` number
      
      page height in pixels.
    
    Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation#viewport).
    
    :::note
    
    The `null` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.
    :::
    
**Returns**
- Promise<Page>

---

### removeAllListeners {/* #browser-remove-all-listeners */}



Removes all the listeners of the given type (or all registered listeners if no type given). Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

**Usage**

```js
await browser.removeAllListeners();
await browser.removeAllListeners(type, options);
```

**Arguments**
- `type` string *(optional)*
- `options` Object *(optional)*
  - `behavior` "wait" | "ignoreErrors" | "default" *(optional)*
    
    Specifies whether to wait for already running listeners and what to do if they throw errors:
    * `'default'` - do not wait for current listener calls (if any) to finish, if the listener throws, it may result in unhandled error
    * `'wait'` - wait for current listener calls (if any) to finish
    * `'ignoreErrors'` - do not wait for current listener calls (if any) to finish, all errors thrown by the listeners after removal are silently caught

**Returns**
- Promise<void>

---

### startTracing {/* #browser-start-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

You can use [browser.startTracing()](/api/class-browser.mdx#browser-start-tracing) and [browser.stopTracing()](/api/class-browser.mdx#browser-stop-tracing) to create a trace file that can be opened in Chrome DevTools performance panel.

**Usage**

```js
await browser.startTracing(page, { path: 'trace.json' });
await page.goto('https://www.google.com');
await browser.stopTracing();
```

**Arguments**
- `page` Page *(optional)*
  
  Optional, if specified, tracing includes screenshots of the given page.
- `options` Object *(optional)*
  - `categories` Array<string> *(optional)*
    
    specify custom categories to use instead of default.
  - `path` string *(optional)*
    
    A path to write the trace file to.
  - `screenshots` boolean *(optional)*
    
    captures screenshots in the trace.

**Returns**
- Promise<void>

---

### stopTracing {/* #browser-stop-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

Returns the buffer with trace data.

**Usage**

```js
await browser.stopTracing();
```

**Returns**
- Promise<Buffer>

---

### unbind {/* #browser-unbind */}



Unbinds the browser server previously bound with [browser.bind()](/api/class-browser.mdx#browser-bind).

**Usage**

```js
await browser.unbind();
```

**Returns**
- Promise<void>

---

### version {/* #browser-version */}



Returns the browser version.

**Usage**

```js
browser.version();
```

**Returns**
- string

---

## Events

### on('context') {/* #browser-event-context */}



Emitted when a new browser context is created.

**Usage**

```js
browser.on('context', data => {});
```

**Event data**
- BrowserContext

---

### on('disconnected') {/* #browser-event-disconnected */}



Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [browser.close()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```js
browser.on('disconnected', data => {});
```

**Event data**
- Browser


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserServer: /api/class-browserserver.mdx "BrowserServer"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Coverage: /api/class-coverage.mdx "Coverage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Disposable: /api/class-disposable.mdx "Disposable"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
FileChooser: /api/class-filechooser.mdx "FileChooser"
Frame: /api/class-frame.mdx "Frame"
FrameLocator: /api/class-framelocator.mdx "FrameLocator"
GenericAssertions: /api/class-genericassertions.mdx "GenericAssertions"
JSHandle: /api/class-jshandle.mdx "JSHandle"
Keyboard: /api/class-keyboard.mdx "Keyboard"
Locator: /api/class-locator.mdx "Locator"
LocatorAssertions: /api/class-locatorassertions.mdx "LocatorAssertions"
Logger: /api/class-logger.mdx "Logger"
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
SnapshotAssertions: /api/class-snapshotassertions.mdx "SnapshotAssertions"
TimeoutError: /api/class-timeouterror.mdx "TimeoutError"
Touchscreen: /api/class-touchscreen.mdx "Touchscreen"
Tracing: /api/class-tracing.mdx "Tracing"
Video: /api/class-video.mdx "Video"
WebError: /api/class-weberror.mdx "WebError"
WebSocket: /api/class-websocket.mdx "WebSocket"
WebSocketRoute: /api/class-websocketroute.mdx "WebSocketRoute"
WebStorage: /api/class-webstorage.mdx "WebStorage"
Worker: /api/class-worker.mdx "Worker"
Electron: /api/class-electron.mdx "Electron"
ElectronApplication: /api/class-electronapplication.mdx "ElectronApplication"
Android: /api/class-android.mdx "Android"
AndroidDevice: /api/class-androiddevice.mdx "AndroidDevice"
AndroidInput: /api/class-androidinput.mdx "AndroidInput"
AndroidSocket: /api/class-androidsocket.mdx "AndroidSocket"
AndroidWebView: /api/class-androidwebview.mdx "AndroidWebView"
Fixtures: /api/class-fixtures.mdx "Fixtures"
FullConfig: /api/class-fullconfig.mdx "FullConfig"
FullProject: /api/class-fullproject.mdx "FullProject"
Location: /api/class-location.mdx "Location"
Test: /api/class-test.mdx "Test"
TestConfig: /api/class-testconfig.mdx "TestConfig"
TestInfo: /api/class-testinfo.mdx "TestInfo"
TestInfoError: /api/class-testinfoerror.mdx "TestInfoError"
TestOptions: /api/class-testoptions.mdx "TestOptions"
TestProject: /api/class-testproject.mdx "TestProject"
TestStepInfo: /api/class-teststepinfo.mdx "TestStepInfo"
WorkerInfo: /api/class-workerinfo.mdx "WorkerInfo"
Reporter: /api/class-reporter.mdx "Reporter"
Suite: /api/class-suite.mdx "Suite"
TestCase: /api/class-testcase.mdx "TestCase"
TestError: /api/class-testerror.mdx "TestError"
TestResult: /api/class-testresult.mdx "TestResult"
TestRun: /api/class-testrun.mdx "TestRun"
TestStep: /api/class-teststep.mdx "TestStep"
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

AbortSignal: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal "AbortSignal"
Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
boolean: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
Buffer: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
ChildProcess: https://nodejs.org/api/child_process.html "ChildProcess"
Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date"
Error: https://nodejs.org/api/errors.html#errors_class_error "Error"
EventEmitter: https://nodejs.org/api/events.html#events_class_eventemitter "EventEmitter"
function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
FormData: https://developer.mozilla.org/en-US/docs/Web/API/FormData "FormData"
Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
Metadata: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object<string, any>"
null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null "null"
number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
Readable: https://nodejs.org/api/stream.html#stream_class_stream_readable "Readable"
ReadStream: https://nodejs.org/api/fs.html#class-fsreadstream "ReadStream"
RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp"
string: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "string"
void: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined "void"
URL: https://nodejs.org/api/url.html "URL"
URLPattern: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern "URLPattern"
URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams "URLSearchParams"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
