# Clock

> **Source:** [playwright.dev/python/docs/api/class-clock](https://playwright.dev/python/docs/api/class-clock)

---

Accurately simulating time-dependent behavior is essential for verifying the correctness of applications. Learn more about [clock emulation](../clock.mdx).

Note that clock is installed for the entire BrowserContext, so the time in all the pages and iframes is controlled by the same clock.


---

## Methods

### fast_forward {/* #clock-fast-forward */}



Advance the clock by jumping forward in time. Only fires due timers at most once. This is equivalent to user closing the laptop lid for a while and reopening it later, after given time.

**Usage**

**sync**

```py
page.clock.fast_forward(1000)
page.clock.fast_forward("30:00")
```

**async**

```py
await page.clock.fast_forward(1000)
await page.clock.fast_forward("30:00")
```

**Arguments**
- `ticks` int | str
  
  Time may be the number of milliseconds to advance the clock by or a human-readable string. Valid string formats are "08" for eight seconds, "01:00" for one minute and "02:34:10" for two hours, 34 minutes and ten seconds.

**Returns**
- NoneType

---

### install {/* #clock-install */}



Install fake implementations for the following time-related functions:
* `Date`
* `setTimeout`
* `clearTimeout`
* `setInterval`
* `clearInterval`
* `requestAnimationFrame`
* `cancelAnimationFrame`
* `requestIdleCallback`
* `cancelIdleCallback`
* `performance`

Fake timers are used to manually control the flow of time in tests. They allow you to advance time, fire timers, and control the behavior of time-dependent functions. See [clock.run_for()](/api/class-clock.mdx#clock-run-for) and [clock.fast_forward()](/api/class-clock.mdx#clock-fast-forward) for more information.

**Usage**

```python
clock.install()
clock.install(**kwargs)
```

**Arguments**
- `time` float | str | datetime *(optional)*
  
  Time to initialize with, current system time by default. Numeric values are Unix time in seconds.

**Returns**
- NoneType

---

### pause_at {/* #clock-pause-at */}



Advance the clock by jumping forward in time and pause the time. Once this method is called, no timers are fired unless [clock.run_for()](/api/class-clock.mdx#clock-run-for), [clock.fast_forward()](/api/class-clock.mdx#clock-fast-forward), [clock.pause_at()](/api/class-clock.mdx#clock-pause-at) or [clock.resume()](/api/class-clock.mdx#clock-resume) is called.

Only fires due timers at most once. This is equivalent to user closing the laptop lid for a while and reopening it at the specified time and pausing.

**Usage**

**sync**

```py
page.clock.pause_at(datetime.datetime(2020, 2, 2))
page.clock.pause_at("2020-02-02")
```

**async**

```py
await page.clock.pause_at(datetime.datetime(2020, 2, 2))
await page.clock.pause_at("2020-02-02")
```

For best results, install the clock before navigating the page and set it to a time slightly before the intended test time. This ensures that all timers run normally during page loading, preventing the page from getting stuck. Once the page has fully loaded, you can safely use [clock.pause_at()](/api/class-clock.mdx#clock-pause-at) to pause the clock.

**sync**

```py
# Initialize clock with some time before the test time and let the page load
# naturally. `Date.now` will progress as the timers fire.
page.clock.install(time=datetime.datetime(2024, 12, 10, 8, 0, 0))
page.goto("http://localhost:3333")
page.clock.pause_at(datetime.datetime(2024, 12, 10, 10, 0, 0))
```

**async**

```py
# Initialize clock with some time before the test time and let the page load
# naturally. `Date.now` will progress as the timers fire.
await page.clock.install(time=datetime.datetime(2024, 12, 10, 8, 0, 0))
await page.goto("http://localhost:3333")
await page.clock.pause_at(datetime.datetime(2024, 12, 10, 10, 0, 0))
```

**Arguments**
- `time` float | str | datetime
  
  Time to pause at. Numeric values are Unix time in seconds.

**Returns**
- NoneType

---

### resume {/* #clock-resume */}



Resumes timers. Once this method is called, time resumes flowing, timers are fired as usual.

**Usage**

```python
clock.resume()
```

**Returns**
- NoneType

---

### run_for {/* #clock-run-for */}



Advance the clock, firing all the time-related callbacks.

**Usage**

**sync**

```py
page.clock.run_for(1000);
page.clock.run_for("30:00")
```

**async**

```py
await page.clock.run_for(1000);
await page.clock.run_for("30:00")
```

**Arguments**
- `ticks` int | str
  
  Time may be the number of milliseconds to advance the clock by or a human-readable string. Valid string formats are "08" for eight seconds, "01:00" for one minute and "02:34:10" for two hours, 34 minutes and ten seconds.

**Returns**
- NoneType

---

### set_fixed_time {/* #clock-set-fixed-time */}



Makes `Date.now` and `new Date()` return fixed fake time at all times, keeps all the timers running.

Use this method for simple scenarios where you only need to test with a predefined time. For more advanced scenarios, use [clock.install()](/api/class-clock.mdx#clock-install) instead. Read docs on [clock emulation](../clock.mdx) to learn more.

**Usage**

**sync**

```py
page.clock.set_fixed_time(datetime.datetime.now())
page.clock.set_fixed_time(datetime.datetime(2020, 2, 2))
page.clock.set_fixed_time("2020-02-02")
```

**async**

```py
await page.clock.set_fixed_time(datetime.datetime.now())
await page.clock.set_fixed_time(datetime.datetime(2020, 2, 2))
await page.clock.set_fixed_time("2020-02-02")
```

**Arguments**
- `time` float | str | datetime
  
  Time to be set. Numeric values are Unix time in seconds.

**Returns**
- NoneType

---

### set_system_time {/* #clock-set-system-time */}



Sets system time, but does not trigger any timers. Use this to test how the web page reacts to a time shift, for example switching from summer to winter time, or changing time zones.

**Usage**

**sync**

```py
page.clock.set_system_time(datetime.datetime.now())
page.clock.set_system_time(datetime.datetime(2020, 2, 2))
page.clock.set_system_time("2020-02-02")
```

**async**

```py
await page.clock.set_system_time(datetime.datetime.now())
await page.clock.set_system_time(datetime.datetime(2020, 2, 2))
await page.clock.set_system_time("2020-02-02")
```

**Arguments**
- `time` float | str | datetime
  
  Time to be set. Numeric values are Unix time in seconds.

**Returns**
- NoneType


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
