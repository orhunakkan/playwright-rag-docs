# AndroidDevice

> **Source:** [playwright.dev/docs/api/class-androiddevice](https://playwright.dev/docs/api/class-androiddevice)

---

AndroidDevice represents a connected device, either real hardware or emulated. Devices can be obtained using [android.devices()](/api/class-android.mdx#android-devices).


---

## Methods

### close {/* #android-device-close */}



Disconnects from the device.

**Usage**

```js
await androidDevice.close();
```

**Returns**
- Promise<void>

---

### drag {/* #android-device-drag */}



Drags the widget defined by [selector](/api/class-androiddevice.mdx#android-device-drag-option-selector) towards [dest](/api/class-androiddevice.mdx#android-device-drag-option-dest) point.

**Usage**

```js
await androidDevice.drag(selector, dest);
await androidDevice.drag(selector, dest, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to drag.
- `dest` Object
  - `x` number
    
    
  - `y` number
    
    
  Point to drag to.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the drag in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### fill {/* #android-device-fill */}



Fills the specific [selector](/api/class-androiddevice.mdx#android-device-fill-option-selector) input box with [text](/api/class-androiddevice.mdx#android-device-fill-option-text).

**Usage**

```js
await androidDevice.fill(selector, text);
await androidDevice.fill(selector, text, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to fill.
- `text` string
  
  Text to be filled in the input box.
- `options` Object *(optional)*
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### fling {/* #android-device-fling */}



Flings the widget defined by [selector](/api/class-androiddevice.mdx#android-device-fling-option-selector) in  the specified [direction](/api/class-androiddevice.mdx#android-device-fling-option-direction).

**Usage**

```js
await androidDevice.fling(selector, direction);
await androidDevice.fling(selector, direction, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to fling.
- `direction` "down" | "up" | "left" | "right"
  
  Fling direction.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the fling in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### info {/* #android-device-info */}



Returns information about a widget defined by [selector](/api/class-androiddevice.mdx#android-device-info-option-selector).

**Usage**

```js
await androidDevice.info(selector);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to return information about.

**Returns**
- Promise<AndroidElementInfo>

---

### installApk {/* #android-device-install-apk */}



Installs an apk on the device.

**Usage**

```js
await androidDevice.installApk(file);
await androidDevice.installApk(file, options);
```

**Arguments**
- `file` string | Buffer
  
  Either a path to the apk file, or apk file content.
- `options` Object *(optional)*
  - `args` Array<string> *(optional)*
    
    Optional arguments to pass to the `shell:cmd package install` call. Defaults to `-r -t -S`.

**Returns**
- Promise<void>

---

### launchBrowser {/* #android-device-launch-browser */}



Launches Chrome browser on the device, and returns its persistent context.

**Usage**

```js
await androidDevice.launchBrowser();
await androidDevice.launchBrowser(options);
```

**Arguments**
- `options` Object *(optional)*
  - `acceptDownloads` boolean *(optional)*
    
    Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
  - `args` Array<string> *(optional)* 
    
    :::warning
    
    Use custom browser args at your own risk, as some of them may break Playwright functionality.
    :::
    
    Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](https://peter.sh/experiments/chromium-command-line-switches/).
  - `baseURL` string *(optional)*
    
    When using [page.goto()](/api/class-page.mdx#page-goto), [page.route()](/api/class-page.mdx#page-route), [page.waitForURL()](/api/class-page.mdx#page-wait-for-url), [page.waitForRequest()](/api/class-page.mdx#page-wait-for-request), or [page.waitForResponse()](/api/class-page.mdx#page-wait-for-response) it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
    * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
    * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
    * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
  - `bypassCSP` boolean *(optional)*
    
    Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
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
  - `pkg` string *(optional)*
    
    Optional package name to launch instead of default Chrome for Android.
  - `proxy` Object *(optional)* 
    - `server` string
      
      Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
    - `bypass` string *(optional)*
      
      Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
    - `username` string *(optional)*
      
      Optional username to use if HTTP proxy requires authentication.
    - `password` string *(optional)*
      
      Optional password to use if HTTP proxy requires authentication.
    
    Network proxy settings.
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
    
    Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](/api/class-androiddevice.mdx#android-device-launch-browser-option-viewport) is set.
  - `serviceWorkers` "allow" | "block" *(optional)*
    
    Whether to allow sites to register Service workers. Defaults to `'allow'`.
    * `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
    * `'block'`: Playwright will block all registration of Service Workers.
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

### longTap {/* #android-device-long-tap */}



Performs a long tap on the widget defined by [selector](/api/class-androiddevice.mdx#android-device-long-tap-option-selector).

**Usage**

```js
await androidDevice.longTap(selector);
await androidDevice.longTap(selector, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to tap on.
- `options` Object *(optional)*
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### model {/* #android-device-model */}



Device model.

**Usage**

```js
androidDevice.model();
```

**Returns**
- string

---

### open {/* #android-device-open */}



Launches a process in the shell on the device and returns a socket to communicate with the launched process.

**Usage**

```js
await androidDevice.open(command);
```

**Arguments**
- `command` string
  
  Shell command to execute.

**Returns**
- Promise<AndroidSocket>

---

### pinchClose {/* #android-device-pinch-close */}



Pinches the widget defined by [selector](/api/class-androiddevice.mdx#android-device-pinch-close-option-selector) in the closing direction.

**Usage**

```js
await androidDevice.pinchClose(selector, percent);
await androidDevice.pinchClose(selector, percent, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to pinch close.
- `percent` number
  
  The size of the pinch as a percentage of the widget's size.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the pinch in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### pinchOpen {/* #android-device-pinch-open */}



Pinches the widget defined by [selector](/api/class-androiddevice.mdx#android-device-pinch-open-option-selector) in the open direction.

**Usage**

```js
await androidDevice.pinchOpen(selector, percent);
await androidDevice.pinchOpen(selector, percent, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to pinch open.
- `percent` number
  
  The size of the pinch as a percentage of the widget's size.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the pinch in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### press {/* #android-device-press */}



Presses the specific [key](/api/class-androiddevice.mdx#android-device-press-option-key) in the widget defined by [selector](/api/class-androiddevice.mdx#android-device-press-option-selector).

**Usage**

```js
await androidDevice.press(selector, key);
await androidDevice.press(selector, key, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to press the key in.
- `key` AndroidKey
  
  The key to press.
- `options` Object *(optional)*
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### push {/* #android-device-push */}



Copies a file to the device.

**Usage**

```js
await androidDevice.push(file, path);
await androidDevice.push(file, path, options);
```

**Arguments**
- `file` string | Buffer
  
  Either a path to the file, or file content.
- `path` string
  
  Path to the file on the device.
- `options` Object *(optional)*
  - `mode` number *(optional)*
    
    Optional file mode, defaults to `644` (`rw-r--r--`).

**Returns**
- Promise<void>

---

### screenshot {/* #android-device-screenshot */}



Returns the buffer with the captured screenshot of the device.

**Usage**

```js
await androidDevice.screenshot();
await androidDevice.screenshot(options);
```

**Arguments**
- `options` Object *(optional)*
  - `path` string *(optional)*
    
    The file path to save the image to. If [path](/api/class-androiddevice.mdx#android-device-screenshot-option-path) is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.

**Returns**
- Promise<Buffer>

---

### scroll {/* #android-device-scroll */}



Scrolls the widget defined by [selector](/api/class-androiddevice.mdx#android-device-scroll-option-selector) in  the specified [direction](/api/class-androiddevice.mdx#android-device-scroll-option-direction).

**Usage**

```js
await androidDevice.scroll(selector, direction, percent);
await androidDevice.scroll(selector, direction, percent, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to scroll.
- `direction` "down" | "up" | "left" | "right"
  
  Scroll direction.
- `percent` number
  
  Distance to scroll as a percentage of the widget's size.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the scroll in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### serial {/* #android-device-serial */}



Device serial number.

**Usage**

```js
androidDevice.serial();
```

**Returns**
- string

---

### setDefaultTimeout {/* #android-device-set-default-timeout */}



This setting will change the default maximum time for all the methods accepting [timeout](/api/class-androiddevice.mdx#android-device-set-default-timeout-option-timeout) option.

**Usage**

```js
androidDevice.setDefaultTimeout(timeout);
```

**Arguments**
- `timeout` number
  
  Maximum time in milliseconds

---

### shell {/* #android-device-shell */}



Executes a shell command on the device and returns its output.

**Usage**

```js
await androidDevice.shell(command);
```

**Arguments**
- `command` string
  
  Shell command to execute.

**Returns**
- Promise<Buffer>

---

### swipe {/* #android-device-swipe */}



Swipes the widget defined by [selector](/api/class-androiddevice.mdx#android-device-swipe-option-selector) in  the specified [direction](/api/class-androiddevice.mdx#android-device-swipe-option-direction).

**Usage**

```js
await androidDevice.swipe(selector, direction, percent);
await androidDevice.swipe(selector, direction, percent, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to swipe.
- `direction` "down" | "up" | "left" | "right"
  
  Swipe direction.
- `percent` number
  
  Distance to swipe as a percentage of the widget's size.
- `options` Object *(optional)*
  - `speed` number *(optional)*
    
    Optional speed of the swipe in pixels per second.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### tap {/* #android-device-tap */}



Taps on the widget defined by [selector](/api/class-androiddevice.mdx#android-device-tap-option-selector).

**Usage**

```js
await androidDevice.tap(selector);
await androidDevice.tap(selector, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to tap on.
- `options` Object *(optional)*
  - `duration` number *(optional)*
    
    Optional duration of the tap in milliseconds.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### wait {/* #android-device-wait */}



Waits for the specific [selector](/api/class-androiddevice.mdx#android-device-wait-option-selector) to either appear or disappear, depending on the [state](/api/class-androiddevice.mdx#android-device-wait-option-state).

**Usage**

```js
await androidDevice.wait(selector);
await androidDevice.wait(selector, options);
```

**Arguments**
- `selector` AndroidSelector
  
  Selector to wait for.
- `options` Object *(optional)*
  - `state` "gone" *(optional)*
    
    Optional state. Can be either:
    * default - wait for element to be present.
    * `'gone'` - wait for element to not be present.
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<void>

---

### waitForEvent {/* #android-device-wait-for-event */}



Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value.

**Usage**

```js
await androidDevice.waitForEvent(event);
await androidDevice.waitForEvent(event, optionsOrPredicate);
```

**Arguments**
- `event` string
  
  Event name, same one typically passed into `*.on(event)`.
- `optionsOrPredicate` function | Object *(optional)*
  - `predicate` function
    
    receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` number *(optional)*
    
    maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout).
  
  Either a predicate that receives an event or an options object. Optional.

**Returns**
- Promise<Object>

---

### webView {/* #android-device-web-view */}



This method waits until AndroidWebView matching the [selector](/api/class-androiddevice.mdx#android-device-web-view-option-selector) is opened and returns it. If there is already an open AndroidWebView matching the [selector](/api/class-androiddevice.mdx#android-device-web-view-option-selector), returns immediately.

**Usage**

```js
await androidDevice.webView(selector);
await androidDevice.webView(selector, options);
```

**Arguments**
- `selector` Object
  - `pkg` string *(optional)*
    
    Optional Package identifier.
  - `socketName` string *(optional)*
    
    Optional webview socket name.
- `options` Object *(optional)*
  - `timeout` number *(optional)*
    
    Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](/api/class-androiddevice.mdx#android-device-set-default-timeout) method.

**Returns**
- Promise<AndroidWebView>

---

### webViews {/* #android-device-web-views */}



Currently open WebViews.

**Usage**

```js
androidDevice.webViews();
```

**Returns**
- Array<AndroidWebView>

---

## Properties

### input {/* #android-device-input */}



**Usage**

```js
androidDevice.input
```

**Type**
- AndroidInput

---

## Events

### on('close') {/* #android-device-event-close */}



Emitted when the device connection gets closed.

**Usage**

```js
androidDevice.on('close', data => {});
```

**Event data**
- AndroidDevice

---

### on('webview') {/* #android-device-event-web-view */}



Emitted when a new WebView instance is detected.

**Usage**

```js
androidDevice.on('webview', data => {});
```

**Event data**
- AndroidWebView


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
