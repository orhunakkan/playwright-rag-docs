# BrowserType

> **Source:** [playwright.dev/java/docs/api/class-browsertype](https://playwright.dev/java/docs/api/class-browsertype)

---

BrowserType provides methods to launch a specific browser instance or connect to an existing one. The following is a typical example of using Playwright to drive automation:

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      page.navigate("https://example.com");
      // other actions...
      browser.close();
    }
  }
}
```


---

## Methods

### connect {/* #browser-type-connect */}



This method attaches Playwright to an existing browser instance created via `BrowserType.launchServer` in Node.js.

:::note

The major and minor version of the Playwright instance that connects needs to match the version of Playwright that launches the browser (1.2.3 → is compatible with 1.2.x).
:::

**Usage**

```java
BrowserType.connect(endpoint);
BrowserType.connect(endpoint, options);
```

**Arguments**
- `endpoint` String 
  
  A Playwright browser websocket endpoint to connect to. You obtain this endpoint via `BrowserServer.wsEndpoint`.
- `options` `BrowserType.ConnectOptions` *(optional)*
  - `setExposeNetwork` String *(optional)* 
    
    This option exposes network available on the connecting client to the browser being connected to. Consists of a list of rules separated by comma.
    
    Available rules:
    1. Hostname pattern, for example: `example.com`, `*.org:99`, `x.*.y.com`, `*foo.org`.
    1. IP literal, for example: `127.0.0.1`, `0.0.0.0:99`, `::1`, `0:0::1:99`.
    1. `<loopback>` that matches local loopback interfaces: `localhost`, `*.localhost`, `127.0.0.1`, `::1`.
    
    Some common examples:
    1. `"*"` to expose all network.
    1. `"<loopback>"` to expose localhost network.
    1. `"*.test.internal-domain,*.staging.internal-domain,<loopback>"` to expose test/staging deployments and localhost.
  - `setHeaders` Map<String, String> *(optional)* 
    
    Additional HTTP headers to be sent with web socket connect request. Optional.
  - `setSlowMo` double *(optional)* 
    
    Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
  - `setTimeout` double *(optional)* 
    
    Maximum time in milliseconds to wait for the connection to be established. Defaults to `0` (no timeout).

**Returns**
- Browser

---

### connectOverCDP {/* #browser-type-connect-over-cdp */}



This method attaches Playwright to an existing browser instance using the Chrome DevTools Protocol.

The default browser context is accessible via [Browser.contexts()](/api/class-browser.mdx#browser-contexts).

:::note

Connecting over the Chrome DevTools Protocol is only supported for Chromium-based browsers.
:::

:::note
This connection is significantly lower fidelity than the Playwright protocol connection via [BrowserType.connect()](/api/class-browsertype.mdx#browser-type-connect). If you are experiencing issues or attempting to use advanced functionality, you probably want to use [BrowserType.connect()](/api/class-browsertype.mdx#browser-type-connect).
:::

:::warning
Playwright maintains a curated list of arguments for launching the browser. If you launch the browser without Playwright and do not pass the exact same arguments, some of Playwright functionality may be broken upon connecting to the browser.
:::

**Usage**

```java
Browser browser = playwright.chromium().connectOverCDP("http://localhost:9222");
BrowserContext defaultContext = browser.contexts().get(0);
Page page = defaultContext.pages().get(0);
```

**Arguments**
- `endpointURL` String 
  
  A CDP websocket endpoint or http url to connect to. For example `http://localhost:9222/` or `ws://127.0.0.1:9222/devtools/browser/387adf4c-243f-4051-a181-46798f4a46f4`.
- `options` `BrowserType.ConnectOverCDPOptions` *(optional)*
  - `setArtifactsDir` Path *(optional)* 
    
    If specified, browser artifacts (such as traces and downloads) are saved into this directory.
  - `setHeaders` Map<String, String> *(optional)* 
    
    Additional HTTP headers to be sent with connect request. Optional.
  - `setIsLocal` boolean *(optional)* 
    
    Tells Playwright that it runs on the same host as the CDP server. It will enable certain optimizations that rely upon the file system being the same between Playwright and the Browser.
  - `setNoDefaults` boolean *(optional)* 
    
    When true, Playwright will not apply its default overrides to the existing default browser context. Specifically, [setAcceptDownloads](/api/class-browser.mdx#browser-new-context-option-accept-downloads) is left at the browser's setting, focus emulation is not enabled, and media emulation options (such as [setColorScheme](/api/class-browser.mdx#browser-new-context-option-color-scheme), [setReducedMotion](/api/class-browser.mdx#browser-new-context-option-reduced-motion), [setForcedColors](/api/class-browser.mdx#browser-new-context-option-forced-colors), and [setContrast](/api/class-browser.mdx#browser-new-context-option-contrast)) are not applied. Useful when attaching to a user's daily-driver browser where these overrides would interfere with existing browser state. New contexts created via [Browser.newContext()](/api/class-browser.mdx#browser-new-context) are not affected. Defaults to `false`.
  - `setSlowMo` double *(optional)* 
    
    Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on. Defaults to 0.
  - `setTimeout` double *(optional)* 
    
    Maximum time in milliseconds to wait for the connection to be established. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Browser

---

### executablePath {/* #browser-type-executable-path */}



A path where Playwright expects to find a bundled browser executable.

**Usage**

```java
BrowserType.executablePath();
```

**Returns**
- String

---

### launch {/* #browser-type-launch */}



Returns the browser instance.

**Usage**

You can use [setIgnoreDefaultArgs](/api/class-browsertype.mdx#browser-type-launch-option-ignore-default-args) to filter out `--mute-audio` from default arguments:

```java
// Or "firefox" or "webkit".
Browser browser = chromium.launch(new BrowserType.LaunchOptions()
  .setIgnoreDefaultArgs(Arrays.asList("--mute-audio")));
```

> **Chromium-only** Playwright can also be used to control the Google Chrome or Microsoft Edge browsers, but it works best with the version of Chromium it is bundled with. There is no guarantee it will work with any other version. Use [setExecutablePath](/api/class-browsertype.mdx#browser-type-launch-option-executable-path) option with extreme caution.
>
> If Google Chrome (rather than Chromium) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
> Stock browsers like Google Chrome and Microsoft Edge are suitable for tests that require proprietary media codecs for video playback. See [this article](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for other differences between Chromium and Chrome. [This article](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.

**Arguments**
- `options` `BrowserType.LaunchOptions` *(optional)*
  - `setArgs` List<String> *(optional)*
    
    :::warning
    
    Use custom browser args at your own risk, as some of them may break Playwright functionality.
    :::
    
    Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](https://peter.sh/experiments/chromium-command-line-switches/).
  - `setArtifactsDir` Path *(optional)*
    
    If specified, artifacts (traces, videos, downloads, HAR files, etc.) are saved into this directory. The directory is not cleaned up when the browser closes. If not specified, a temporary directory is used and cleaned up when the browser closes.
  - `setChannel` String *(optional)*
    
    Browser distribution channel.
    
    Use "chromium" to [opt in to new headless mode](../browsers.mdx#chromium-new-headless-mode).
    
    Use "chrome", "chrome-beta", "chrome-dev", "chrome-canary", "msedge", "msedge-beta", "msedge-dev", or "msedge-canary" to use branded [Google Chrome and Microsoft Edge](../browsers.mdx#google-chrome--microsoft-edge).
  - `setChromiumSandbox` boolean *(optional)*
    
    Enable Chromium sandboxing. Defaults to `false`.
  - `setDownloadsPath` Path *(optional)*
    
    If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed. In either case, the downloads are deleted when the browser context they were created in is closed.
  - `setEnv` Map<String, String> *(optional)*
    
    Specify environment variables that will be visible to the browser. Defaults to `process.env`.
  - `setExecutablePath` Path *(optional)*
    
    Path to a browser executable to run instead of the bundled one. If [setExecutablePath](/api/class-browsertype.mdx#browser-type-launch-option-executable-path) is a relative path, then it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
  - `setFirefoxUserPrefs` Map<String, Object> *(optional)*
    
    Firefox user preferences. Learn more about the Firefox user preferences at [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
    
    You can also provide a path to a custom [`policies.json` file](https://mozilla.github.io/policy-templates/) via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.
  - `setHandleSIGHUP` boolean *(optional)*
    
    Close the browser process on SIGHUP. Defaults to `true`.
  - `setHandleSIGINT` boolean *(optional)*
    
    Close the browser process on Ctrl-C. Defaults to `true`.
  - `setHandleSIGTERM` boolean *(optional)*
    
    Close the browser process on SIGTERM. Defaults to `true`.
  - `setHeadless` boolean *(optional)*
    
    Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://hacks.mozilla.org/2017/12/using-headless-mode-in-firefox/). Defaults to `true`.
  - `setIgnoreAllDefaultArgs` boolean *(optional)* 
    
    If `true`, Playwright does not pass its own configurations args and only uses the ones from [setArgs](/api/class-browsertype.mdx#browser-type-launch-option-args). Dangerous option; use with care. Defaults to `false`.
  - `setIgnoreDefaultArgs` List<String> *(optional)*
    
    If `true`, Playwright does not pass its own configurations args and only uses the ones from [setArgs](/api/class-browsertype.mdx#browser-type-launch-option-args). Dangerous option; use with care.
  - `setProxy` Proxy *(optional)*
    - `setServer` String
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `setBypass` String *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `setUsername` String *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `setPassword` String *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings.
  - `setSlowMo` double *(optional)*
    
    Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `setTracesDir` Path *(optional)*
    
    If specified, traces are saved into this directory.

**Returns**
- Browser

---

### launchPersistentContext {/* #browser-type-launch-persistent-context */}



Returns the persistent browser context instance.

Launches browser that uses persistent storage located at [userDataDir](/api/class-browsertype.mdx#browser-type-launch-persistent-context-option-user-data-dir) and returns the only context. Closing this context will automatically close the browser.

**Usage**

```java
BrowserType.launchPersistentContext(userDataDir);
BrowserType.launchPersistentContext(userDataDir, options);
```

**Arguments**
- `userDataDir` Path
  
  Path to a User Data Directory, which stores browser session data like cookies and local storage. Pass an empty string to create a temporary directory.
  
  More details for [Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md#introduction) and [Firefox](https://wiki.mozilla.org/Firefox/CommandLineOptions#User_profile). Chromium's user data directory is the **parent** directory of the "Profile Path" seen at `chrome://version`.
  
  Note that browsers do not allow launching multiple instances with the same User Data Directory.
  
  :::warning
  
  Chromium/Chrome: Due to recent Chrome policy changes, automating the default Chrome user profile is not supported. Pointing `userDataDir` to Chrome's main "User Data" directory (the profile used for your regular browsing) may result in pages not loading or the browser exiting. Create and use a separate directory (for example, an empty folder) as your automation profile instead. See https://developer.chrome.com/blog/remote-debugging-port for details.
  :::
  
- `options` `BrowserType.LaunchPersistentContextOptions` *(optional)*
  - `setAcceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `setArgs` List<String> *(optional)*
    
    :::warning
    
    Use custom browser args at your own risk, as some of them may break Playwright functionality.
    :::
    
    Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](https://peter.sh/experiments/chromium-command-line-switches/).
  - `setArtifactsDir` Path *(optional)*
    
    If specified, artifacts (traces, videos, downloads, HAR files, etc.) are saved into this directory. The directory is not cleaned up when the browser closes. If not specified, a temporary directory is used and cleaned up when the browser closes.
  - `setBaseURL` String *(optional)*
    
    When using [Page.navigate()](/api/class-page.mdx#page-goto), [Page.route()](/api/class-page.mdx#page-route), [Page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [Page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [Page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `setBypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
  - `setChannel` String *(optional)*
    
    Browser distribution channel.
    
    Use "chromium" to [opt in to new headless mode](../browsers.mdx#chromium-new-headless-mode).
    
    Use "chrome", "chrome-beta", "chrome-dev", "chrome-canary", "msedge", "msedge-beta", "msedge-dev", or "msedge-canary" to use branded [Google Chrome and Microsoft Edge](../browsers.mdx#google-chrome--microsoft-edge).
  - `setChromiumSandbox` boolean *(optional)*
    
    Enable Chromium sandboxing. Defaults to `false`.
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
  - `setDownloadsPath` Path *(optional)*
    
    If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is deleted when browser is closed. In either case, the downloads are deleted when the browser context they were created in is closed.
  - `setEnv` Map<String, String> *(optional)*
    
    Specify environment variables that will be visible to the browser. Defaults to `process.env`.
  - `setExecutablePath` Path *(optional)*
    
    Path to a browser executable to run instead of the bundled one. If [setExecutablePath](/api/class-browsertype.mdx#browser-type-launch-persistent-context-option-executable-path) is a relative path, then it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
  - `setExtraHTTPHeaders` Map<String, String> *(optional)*
    
    An object containing additional HTTP headers to be sent with every request. Defaults to none.
  - `setFirefoxUserPrefs` Map<String, Object> *(optional)* 
    
    Firefox user preferences. Learn more about the Firefox user preferences at [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
    
    You can also provide a path to a custom [`policies.json` file](https://mozilla.github.io/policy-templates/) via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.
  - `setForcedColors` null | `enum ForcedColors { ACTIVE, NONE }` *(optional)*
    
    Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [Page.emulateMedia()](/api/class-page.mdx#page-emulate-media) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.
  - `setGeolocation` Geolocation *(optional)*
    - `setLatitude` double
      
      Latitude between -90 and 90.
    - `setLongitude` double
      
      Longitude between -180 and 180.
    - `setAccuracy` double *(optional)*
      
      Non-negative accuracy value. Defaults to `0`.
  - `setHandleSIGHUP` boolean *(optional)*
    
    Close the browser process on SIGHUP. Defaults to `true`.
  - `setHandleSIGINT` boolean *(optional)*
    
    Close the browser process on Ctrl-C. Defaults to `true`.
  - `setHandleSIGTERM` boolean *(optional)*
    
    Close the browser process on SIGTERM. Defaults to `true`.
  - `setHasTouch` boolean *(optional)*
    
    Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.mdx#devices).
  - `setHeadless` boolean *(optional)*
    
    Whether to run browser in headless mode. More details for [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and [Firefox](https://hacks.mozilla.org/2017/12/using-headless-mode-in-firefox/). Defaults to `true`.
  - `setHttpCredentials` HttpCredentials *(optional)*
    - `setUsername` String
      
      
    - `setPassword` String
      
      
    - `setOrigin` String *(optional)*
      
      Restrain sending http credentials on specific origin (scheme://host:port).
    - `setSend` `enum HttpCredentialsSend { UNAUTHORIZED, ALWAYS }` *(optional)*
      
      This option only applies to the requests sent from corresponding APIRequestContext and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
    
    Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.
  - `setIgnoreAllDefaultArgs` boolean *(optional)* 
    
    If `true`, Playwright does not pass its own configurations args and only uses the ones from [setArgs](/api/class-browsertype.mdx#browser-type-launch-persistent-context-option-args). Dangerous option; use with care. Defaults to `false`.
  - `setIgnoreDefaultArgs` List<String> *(optional)*
    
    If `true`, Playwright does not pass its own configurations args and only uses the ones from [setArgs](/api/class-browsertype.mdx#browser-type-launch-persistent-context-option-args). Dangerous option; use with care.
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
    
    Network proxy settings.
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
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [setViewportSize](/api/class-browsertype.mdx#browser-type-launch-persistent-context-option-viewport) is set.
  - `setServiceWorkers` `enum ServiceWorkerPolicy { ALLOW, BLOCK }` *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
  - `setSlowMo` double *(optional)*
    
    Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
  - `setStrictSelectors` boolean *(optional)*
    
    If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See Locator to learn more about the strict mode.
  - `setTimeout` double *(optional)*
    
    Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
  - `setTimezoneId` String *(optional)*
    
    Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Defaults to the system timezone.
  - `setTracesDir` Path *(optional)*
    
    If specified, traces are saved into this directory.
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

### name {/* #browser-type-name */}



Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.

**Usage**

```java
BrowserType.name();
```

**Returns**
- String


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
