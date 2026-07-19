# JSHandle

> **Source:** [playwright.dev/python/docs/api/class-jshandle](https://playwright.dev/python/docs/api/class-jshandle)

---

JSHandle represents an in-page JavaScript object. JSHandles can be created with the [page.evaluate_handle()](/api/class-page.mdx#page-evaluate-handle) method.

**sync**

```py
window_handle = page.evaluate_handle("window")
# ...
```

**async**

```py
window_handle = await page.evaluate_handle("window")
# ...
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is exposed with [js_handle.dispose()](/api/class-jshandle.mdx#js-handle-dispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as an argument in [page.eval_on_selector()](/api/class-page.mdx#page-eval-on-selector), [page.evaluate()](/api/class-page.mdx#page-evaluate) and [page.evaluate_handle()](/api/class-page.mdx#page-evaluate-handle) methods.


---

## Methods

### dispose {/* #js-handle-dispose */}



The `jsHandle.dispose` method stops referencing the element handle.

**Usage**

```python
js_handle.dispose()
```

**Returns**
- NoneType

---

### evaluate {/* #js-handle-evaluate */}



Returns the return value of [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

This method passes this handle as the first argument to [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

If [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression) returns a Promise, then `handle.evaluate` would wait for the promise to resolve and return its value.

**Usage**

**sync**

```py
tweet_handle = page.query_selector(".tweet .retweets")
assert tweet_handle.evaluate("node => node.innerText") == "10 retweets"
```

**async**

```py
tweet_handle = await page.query_selector(".tweet .retweets")
assert await tweet_handle.evaluate("node => node.innerText") == "10 retweets"
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-jshandle.mdx#js-handle-evaluate-option-expression).

**Returns**
- Dict

---

### evaluate_handle {/* #js-handle-evaluate-handle */}



Returns the return value of [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression) as a JSHandle.

This method passes this handle as the first argument to [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression).

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle` returns JSHandle.

If the function passed to the `jsHandle.evaluateHandle` returns a Promise, then `jsHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [page.evaluate_handle()](/api/class-page.mdx#page-evaluate-handle) for more details.

**Usage**

```python
js_handle.evaluate_handle(expression)
js_handle.evaluate_handle(expression, **kwargs)
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-jshandle.mdx#js-handle-evaluate-handle-option-expression).

**Returns**
- JSHandle

---

### get_properties {/* #js-handle-get-properties */}



The method returns a map with **own property names** as keys and JSHandle instances for the property values.

**Usage**

**sync**

```py
handle = page.evaluate_handle("({ window, document })")
properties = handle.get_properties()
window_handle = properties.get("window")
document_handle = properties.get("document")
handle.dispose()
```

**async**

```py
handle = await page.evaluate_handle("({ window, document })")
properties = await handle.get_properties()
window_handle = properties.get("window")
document_handle = properties.get("document")
await handle.dispose()
```

**Returns**
- Map\[str, JSHandle\]

---

### get_property {/* #js-handle-get-property */}



Fetches a single property from the referenced object.

**Usage**

```python
js_handle.get_property(property_name)
```

**Arguments**
- `property_name` str
  
  property to get

**Returns**
- JSHandle

---

### json_value {/* #js-handle-json-value */}



Returns a JSON representation of the object. If the object has a `toJSON` function, it **will not be called**.

:::note

The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.
:::

**Usage**

```python
js_handle.json_value()
```

**Returns**
- Dict

---

## Properties

### as_element {/* #js-handle-as-element */}



Returns either `null` or the object handle itself, if the object handle is an instance of ElementHandle.

**Usage**

```python
js_handle.as_element()
```

**Returns**
- NoneType | ElementHandle


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
