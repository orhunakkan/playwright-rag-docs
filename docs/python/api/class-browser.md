# Browser

> **Source:** [playwright.dev/python/docs/api/class-browser](https://playwright.dev/python/docs/api/class-browser)

---

A Browser is created via [browser_type.launch()](/api/class-browsertype.mdx#browser-type-launch). An example of using a Browser to create a Page:

**sync**

```py
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = firefox.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

**async**

```py
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = await firefox.launch()
    page = await browser.new_page()
    await page.goto("https://example.com")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```


---

## Methods

### bind {/* #browser-bind */}



Binds the browser to a named pipe or web socket, making it available for other clients to connect to.

**Usage**

```python
browser.bind(title)
browser.bind(title, **kwargs)
```

**Arguments**
- `title` str
  
  Title of the browser server, used for identification.
- `host` str *(optional)*
  
  Host to bind the web socket server to. When specified, a web socket server is created instead of a named pipe.
- `port` int *(optional)*
  
  Port to bind the web socket server to. When specified, a web socket server is created instead of a named pipe. Use `0` to let the OS pick an available port.
- `workspace_dir` str *(optional)*
  
  Working directory associated with this browser server.

**Returns**
- Dict
  - `endpoint` str
    
    
---

### close {/* #browser-close */}



In case this browser is obtained using [browser_type.launch()](/api/class-browsertype.mdx#browser-type-launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

:::note

This is similar to force-quitting the browser. To close pages gracefully and ensure you receive page close events, call [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) on any BrowserContext instances you explicitly created earlier using [browser.new_context()](/api/class-browser.mdx#browser-new-context) **before** calling [browser.close()](/api/class-browser.mdx#browser-close).
:::

The Browser object itself is considered to be disposed and cannot be used anymore.

**Usage**

```python
browser.close()
browser.close(**kwargs)
```

**Arguments**
- `reason` str *(optional)* 
  
  The reason to be reported to the operations interrupted by the browser closure.

**Returns**
- NoneType

---

### new_browser_cdp_session {/* #browser-new-browser-cdp-session */}



:::note

CDP Sessions are only supported on Chromium-based browsers.
:::

Returns the newly created browser session.

**Usage**

```python
browser.new_browser_cdp_session()
```

**Returns**
- CDPSession

---

### new_context {/* #browser-new-context */}



Creates a new browser context. It won't share cookies/cache with other browser contexts.

:::note

If directly using this method to create BrowserContexts, it is best practice to explicitly close the returned context via [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) when your code is done with the BrowserContext, and before calling [browser.close()](/api/class-browser.mdx#browser-close). This will ensure the `context` is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved.
:::

**Usage**

**sync**

```py
browser = playwright.firefox.launch() # or "chromium" or "webkit".
# create a new incognito browser context.
context = browser.new_context()
# create a new page in a pristine context.
page = context.new_page()
page.goto("https://example.com")

# gracefully close up everything
context.close()
browser.close()
```

**async**

```py
browser = await playwright.firefox.launch() # or "chromium" or "webkit".
# create a new incognito browser context.
context = await browser.new_context()
# create a new page in a pristine context.
page = await context.new_page()
await page.goto("https://example.com")

# gracefully close up everything
await context.close()
await browser.close()
```

**Arguments**
- `accept_downloads` bool *(optional)*
  
  Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
- `base_url` str *(optional)*
  
  When using [page.goto()](/api/class-page.mdx#page-goto), [page.route()](/api/class-page.mdx#page-route), [page.wait_for_url()](/api/class-page.mdx#page-wait-for-url), [page.expect_request()](/api/class-page.mdx#page-wait-for-request), or [page.expect_response()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
  * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
  * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
  * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
- `bypass_csp` bool *(optional)*
  
  Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
- `client_certificates` List\[Dict\] *(optional)* 
  - `origin` str
    
    Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
  - `certPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the file with the certificate in PEM format.
  - `cert` bytes *(optional)*
    
    Direct value of the certificate in PEM format.
  - `keyPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the file with the private key in PEM format.
  - `key` bytes *(optional)*
    
    Direct value of the private key in PEM format.
  - `pfxPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the PFX or PKCS12 encoded private key and certificate chain.
  - `pfx` bytes *(optional)*
    
    Direct value of the PFX or PKCS12 encoded private key and certificate chain.
  - `passphrase` str *(optional)*
    
    Passphrase for the private key (PEM or PFX).
  
  TLS Client Authentication allows the server to request a client certificate and verify it.
  
  **Details**
  
  An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
  
  Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
  
  :::note
  
  When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
  :::
  
- `color_scheme` "light" | "dark" | "no-preference" | "null" *(optional)*
  
  Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.
- `contrast` "no-preference" | "more" | "null" *(optional)*
  
  Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
- `device_scale_factor` float *(optional)*
  
  Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
- `extra_http_headers` Dict\[str, str\] *(optional)*
  
  An object containing additional HTTP headers to be sent with every request. Defaults to none.
- `forced_colors` "active" | "none" | "null" *(optional)*
  
  Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.
- `geolocation` Dict *(optional)*
  - `latitude` float
    
    Latitude between -90 and 90.
  - `longitude` float
    
    Longitude between -180 and 180.
  - `accuracy` float *(optional)*
    
    Non-negative accuracy value. Defaults to `0`.
- `has_touch` bool *(optional)*
  
  Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
- `http_credentials` Dict *(optional)*
  - `username` str
    
    
  - `password` str
    
    
  - `origin` str *(optional)*
    
    Restrain sending http credentials on specific origin (scheme://host:port).
  - `send` "unauthorized" | "always" *(optional)*
    
    This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
  
  Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `is_mobile` bool *(optional)*
  
  Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
- `java_script_enabled` bool *(optional)*
  
  Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
- `locale` str *(optional)*
  
  Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
- `no_viewport` bool *(optional)*
  
  Does not enforce fixed viewport, allows resizing window in the headed mode.
- `offline` bool *(optional)*
  
  Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
- `permissions` List\[str\] *(optional)*
  
  A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
- `proxy` Dict *(optional)*
  - `server` str
    
    Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` str *(optional)*
    
    Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` str *(optional)*
    
    Optional username to use if HTTP proxy requires authentication.
  - `password` str *(optional)*
    
    Optional password to use if HTTP proxy requires authentication.
  
  Network proxy settings to use with this context. Defaults to none.
- `record_har_content` "omit" | "embed" | "attach" *(optional)*
  
  Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
- `record_har_mode` "full" | "minimal" *(optional)*
  
  When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
- `record_har_omit_content` bool *(optional)*
  
  Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
- `record_har_path` Union\[str, pathlib.Path\] *(optional)*
  
  Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
- `record_har_url_filter` str | Pattern *(optional)*
- `record_video_dir` Union\[str, pathlib.Path\] *(optional)*
  
  Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
- `record_video_size` Dict *(optional)*
  - `width` int
    
    Video frame width.
  - `height` int
    
    Video frame height.
  
  Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
- `reduced_motion` "reduce" | "no-preference" | "null" *(optional)*
  
  Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
- `screen` Dict *(optional)*
  - `width` int
    
    page width in pixels.
  - `height` int
    
    page height in pixels.
  
  Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](/api/class-browser.mdx#browser-new-context-option-viewport) is set.
- `service_workers` "allow" | "block" *(optional)*
  
  Whether to allow sites to register Service workers. Defaults to `'allow'`.
  * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
  * `'block'`: Playwright will block all registration of Service Workers.
- `storage_state` Union\[str, pathlib.Path\] | Dict *(optional)*
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
- `strict_selectors` bool *(optional)*
  
  If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
- `timezone_id` str *(optional)*
  
  Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
- `user_agent` str *(optional)*
  
  Specific user agent to use in this context.
- `viewport` NoneType | Dict *(optional)*
  - `width` int
    
    page width in pixels.
  - `height` int
    
    page height in pixels.
  
  Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport. Learn more about [viewport emulation](../emulation.mdx#viewport).

**Returns**
- BrowserContext

---

### new_page {/* #browser-new-page */}



Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and testing frameworks should explicitly create [browser.new_context()](/api/class-browser.mdx#browser-new-context) followed by the [browser_context.new_page()](/api/class-browsercontext.mdx#browser-context-new-page) to control their exact life times.

**Usage**

```python
browser.new_page()
browser.new_page(**kwargs)
```

**Arguments**
- `accept_downloads` bool *(optional)*
  
  Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
- `base_url` str *(optional)*
  
  When using [page.goto()](/api/class-page.mdx#page-goto), [page.route()](/api/class-page.mdx#page-route), [page.wait_for_url()](/api/class-page.mdx#page-wait-for-url), [page.expect_request()](/api/class-page.mdx#page-wait-for-request), or [page.expect_response()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
  * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
  * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
  * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
- `bypass_csp` bool *(optional)*
  
  Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
- `client_certificates` List\[Dict\] *(optional)* 
  - `origin` str
    
    Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
  - `certPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the file with the certificate in PEM format.
  - `cert` bytes *(optional)*
    
    Direct value of the certificate in PEM format.
  - `keyPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the file with the private key in PEM format.
  - `key` bytes *(optional)*
    
    Direct value of the private key in PEM format.
  - `pfxPath` Union\[str, pathlib.Path\] *(optional)*
    
    Path to the PFX or PKCS12 encoded private key and certificate chain.
  - `pfx` bytes *(optional)*
    
    Direct value of the PFX or PKCS12 encoded private key and certificate chain.
  - `passphrase` str *(optional)*
    
    Passphrase for the private key (PEM or PFX).
  
  TLS Client Authentication allows the server to request a client certificate and verify it.
  
  **Details**
  
  An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.
  
  Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.
  
  :::note
  
  When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
  :::
  
- `color_scheme` "light" | "dark" | "no-preference" | "null" *(optional)*
  
  Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.
- `contrast` "no-preference" | "more" | "null" *(optional)*
  
  Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
- `device_scale_factor` float *(optional)*
  
  Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.mdx#devices).
- `extra_http_headers` Dict\[str, str\] *(optional)*
  
  An object containing additional HTTP headers to be sent with every request. Defaults to none.
- `forced_colors` "active" | "none" | "null" *(optional)*
  
  Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.
- `geolocation` Dict *(optional)*
  - `latitude` float
    
    Latitude between -90 and 90.
  - `longitude` float
    
    Longitude between -180 and 180.
  - `accuracy` float *(optional)*
    
    Non-negative accuracy value. Defaults to `0`.
- `has_touch` bool *(optional)*
  
  Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
- `http_credentials` Dict *(optional)*
  - `username` str
    
    
  - `password` str
    
    
  - `origin` str *(optional)*
    
    Restrain sending http credentials on specific origin (scheme://host:port).
  - `send` "unauthorized" | "always" *(optional)*
    
    This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
  
  Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `is_mobile` bool *(optional)*
  
  Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.mdx#ismobile).
- `java_script_enabled` bool *(optional)*
  
  Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.mdx#javascript-enabled).
- `locale` str *(optional)*
  
  Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.mdx#locale--timezone).
- `no_viewport` bool *(optional)*
  
  Does not enforce fixed viewport, allows resizing window in the headed mode.
- `offline` bool *(optional)*
  
  Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.mdx#offline).
- `permissions` List\[str\] *(optional)*
  
  A list of permissions to grant to all pages in this context. See [browser_context.grant_permissions()](/api/class-browsercontext.mdx#browser-context-grant-permissions) for more details. Defaults to none.
- `proxy` Dict *(optional)*
  - `server` str
    
    Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` str *(optional)*
    
    Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` str *(optional)*
    
    Optional username to use if HTTP proxy requires authentication.
  - `password` str *(optional)*
    
    Optional password to use if HTTP proxy requires authentication.
  
  Network proxy settings to use with this context. Defaults to none.
- `record_har_content` "omit" | "embed" | "attach" *(optional)*
  
  Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.
- `record_har_mode` "full" | "minimal" *(optional)*
  
  When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
- `record_har_omit_content` bool *(optional)*
  
  Optional setting to control whether to omit request content from the HAR. Defaults to `false`.
- `record_har_path` Union\[str, pathlib.Path\] *(optional)*
  
  Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to call [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) for the HAR to be saved.
- `record_har_url_filter` str | Pattern *(optional)*
- `record_video_dir` Union\[str, pathlib.Path\] *(optional)*
  
  Enables video recording for all pages into the specified directory. If not specified videos are not recorded. Make sure to call [browser_context.close()](/api/class-browsercontext.mdx#browser-context-close) for videos to be saved.
- `record_video_size` Dict *(optional)*
  - `width` int
    
    Video frame width.
  - `height` int
    
    Video frame height.
  
  Dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.
- `reduced_motion` "reduce" | "no-preference" | "null" *(optional)*
  
  Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [page.emulate_media()](/api/class-page.mdx#page-emulate-media) for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.
- `screen` Dict *(optional)*
  - `width` int
    
    page width in pixels.
  - `height` int
    
    page height in pixels.
  
  Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](/api/class-browser.mdx#browser-new-page-option-viewport) is set.
- `service_workers` "allow" | "block" *(optional)*
  
  Whether to allow sites to register Service workers. Defaults to `'allow'`.
  * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
  * `'block'`: Playwright will block all registration of Service Workers.
- `storage_state` Union\[str, pathlib.Path\] | Dict *(optional)*
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
- `strict_selectors` bool *(optional)*
  
  If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
- `timezone_id` str *(optional)*
  
  Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
- `user_agent` str *(optional)*
  
  Specific user agent to use in this context.
- `viewport` NoneType | Dict *(optional)*
  - `width` int
    
    page width in pixels.
  - `height` int
    
    page height in pixels.
  
  Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport. Learn more about [viewport emulation](../emulation.mdx#viewport).

**Returns**
- Page

---

### start_tracing {/* #browser-start-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

You can use [browser.start_tracing()](/api/class-browser.mdx#browser-start-tracing) and [browser.stop_tracing()](/api/class-browser.mdx#browser-stop-tracing) to create a trace file that can be opened in Chrome DevTools performance panel.

**Usage**

**sync**

```py
browser.start_tracing(page, path="trace.json")
page.goto("https://www.google.com")
browser.stop_tracing()
```

**async**

```py
await browser.start_tracing(page, path="trace.json")
await page.goto("https://www.google.com")
await browser.stop_tracing()
```

**Arguments**
- `page` Page *(optional)*
  
  Optional, if specified, tracing includes screenshots of the given page.
- `categories` List\[str\] *(optional)*
  
  specify custom categories to use instead of default.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  A path to write the trace file to.
- `screenshots` bool *(optional)*
  
  captures screenshots in the trace.

**Returns**
- NoneType

---

### stop_tracing {/* #browser-stop-tracing */}



:::note

This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

Returns the buffer with trace data.

**Usage**

```python
browser.stop_tracing()
```

**Returns**
- bytes

---

### unbind {/* #browser-unbind */}



Unbinds the browser server previously bound with [browser.bind()](/api/class-browser.mdx#browser-bind).

**Usage**

```python
browser.unbind()
```

**Returns**
- NoneType

---

## Properties

### browser_type {/* #browser-browser-type */}



Get the browser type (chromium, firefox or webkit) that the browser belongs to.

**Usage**

```python
browser.browser_type
```

**Returns**
- BrowserType

---

### contexts {/* #browser-contexts */}



Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

**Usage**

**sync**

```py
browser = pw.webkit.launch()
print(len(browser.contexts)) # prints `0`
context = browser.new_context()
print(len(browser.contexts)) # prints `1`
```

**async**

```py
browser = await pw.webkit.launch()
print(len(browser.contexts)) # prints `0`
context = await browser.new_context()
print(len(browser.contexts)) # prints `1`
```

**Returns**
- List\[BrowserContext\]

---

### is_connected {/* #browser-is-connected */}



Indicates that the browser is connected.

**Usage**

```python
browser.is_connected()
```

**Returns**
- bool

---

### version {/* #browser-version */}



Returns the browser version.

**Usage**

```python
browser.version
```

**Returns**
- str

---

## Events

### on("context") {/* #browser-event-context */}



Emitted when a new browser context is created.

**Usage**

```python
browser.on("context", handler)
```

**Event data**
- BrowserContext

---

### on("disconnected") {/* #browser-event-disconnected */}



Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [browser.close()](/api/class-browser.mdx#browser-close) method was called.

**Usage**

```python
browser.on("disconnected", handler)
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
