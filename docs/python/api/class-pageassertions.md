# PageAssertions

> **Source:** [playwright.dev/python/docs/api/class-pageassertions](https://playwright.dev/python/docs/api/class-pageassertions)

---

The PageAssertions class provides assertion methods that can be used to make assertions about the Page state in the tests.

**sync**

```py
import re
from playwright.sync_api import Page, expect

def test_navigates_to_login_page(page: Page) -> None:
    # ..
    page.get_by_text("Sign in").click()
    expect(page).to_have_url(re.compile(r".*/login"))
```

**async**

```py
import re
from playwright.async_api import Page, expect

async def test_navigates_to_login_page(page: Page) -> None:
    # ..
    await page.get_by_text("Sign in").click()
    await expect(page).to_have_url(re.compile(r".*/login"))
```


---

## Methods

### not_to_have_title {/* #page-assertions-not-to-have-title */}



The opposite of [expect(page).to_have_title()](/api/class-pageassertions.mdx#page-assertions-to-have-title).

**Usage**

```python
expect(page).not_to_have_title(title_or_reg_exp)
expect(page).not_to_have_title(title_or_reg_exp, **kwargs)
```

**Arguments**
- `title_or_reg_exp` str | Pattern 
  
  Expected title or RegExp.
- `timeout` float *(optional)* 
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- NoneType

---

### not_to_have_url {/* #page-assertions-not-to-have-url */}



The opposite of [expect(page).to_have_url()](/api/class-pageassertions.mdx#page-assertions-to-have-url).

**Usage**

```python
expect(page).not_to_have_url(url_or_reg_exp)
expect(page).not_to_have_url(url_or_reg_exp, **kwargs)
```

**Arguments**
- `url_or_reg_exp` str | Pattern 
  
  Expected URL string or RegExp.
- `ignore_case` bool *(optional)* 
  
  Whether to perform case-insensitive match. [ignore_case](/api/class-pageassertions.mdx#page-assertions-not-to-have-url-option-ignore-case) option takes precedence over the corresponding regular expression flag if specified.
- `timeout` float *(optional)* 
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- NoneType

---

### not_to_match_aria_snapshot {/* #page-assertions-not-to-match-aria-snapshot */}



The opposite of [expect(page).to_match_aria_snapshot()](/api/class-pageassertions.mdx#page-assertions-to-match-aria-snapshot).

**Usage**

```python
expect(page).not_to_match_aria_snapshot(expected)
expect(page).not_to_match_aria_snapshot(expected, **kwargs)
```

**Arguments**
- `expected` str
- `timeout` float *(optional)*
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- NoneType

---

### to_have_title {/* #page-assertions-to-have-title */}



Ensures the page has the given title.

**Usage**

**sync**

```py
import re
from playwright.sync_api import expect

# ...
expect(page).to_have_title(re.compile(r".*checkout"))
```

**async**

```py
import re
from playwright.async_api import expect

# ...
await expect(page).to_have_title(re.compile(r".*checkout"))
```

**Arguments**
- `title_or_reg_exp` str | Pattern 
  
  Expected title or RegExp.
- `timeout` float *(optional)* 
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- NoneType

---

### to_have_url {/* #page-assertions-to-have-url */}



Ensures the page is navigated to the given URL.

**Usage**

**sync**

```py
import re
from playwright.sync_api import expect

# ...
expect(page).to_have_url(re.compile(".*checkout"))
```

**async**

```py
import re
from playwright.async_api import expect

# ...
await expect(page).to_have_url(re.compile(".*checkout"))
```

**Arguments**
- `url_or_reg_exp` str | Pattern 
  
  Expected URL string or RegExp.
- `ignore_case` bool *(optional)* 
  
  Whether to perform case-insensitive match. [ignore_case](/api/class-pageassertions.mdx#page-assertions-to-have-url-option-ignore-case) option takes precedence over the corresponding regular expression parameter if specified. A provided predicate ignores this flag.
- `timeout` float *(optional)* 
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

**Returns**
- NoneType

---

### to_match_aria_snapshot {/* #page-assertions-to-match-aria-snapshot */}



Asserts that the page body matches the given [accessibility snapshot](../aria-snapshots.mdx).

**Usage**

**sync**

```py
page.goto("https://demo.playwright.dev/todomvc/")
expect(page).to_match_aria_snapshot('''
  - heading "todos"
  - textbox "What needs to be done?"
''')
```

**async**

```py
await page.goto("https://demo.playwright.dev/todomvc/")
await expect(page).to_match_aria_snapshot('''
  - heading "todos"
  - textbox "What needs to be done?"
''')
```

**Arguments**
- `expected` str
- `timeout` float *(optional)*
  
  Time to retry the assertion for in milliseconds. Defaults to `5000`.

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
