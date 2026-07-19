# FormData

> **Source:** [playwright.dev/java/docs/api/class-formdata](https://playwright.dev/java/docs/api/class-formdata)

---

The FormData is used create form data that is sent via APIRequestContext.

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    .set("firstName", "John")
    .set("lastName", "Doe")
    .set("age", 30);
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```


---

## Methods

### append {/* #form-data-append */}



Appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist. File values can be passed either as `Path` or as `FilePayload`. Multiple fields with the same name can be added.

The difference between [FormData.set()](/api/class-formdata.mdx#form-data-set) and [FormData.append()](/api/class-formdata.mdx#form-data-append) is that if the specified key already exists, [FormData.set()](/api/class-formdata.mdx#form-data-set) will overwrite all existing values with the new one, whereas [FormData.append()](/api/class-formdata.mdx#form-data-append) will append the new value onto the end of the existing set of values.

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    // Only name and value are set.
    .append("firstName", "John")
    // Name and value are set, filename and Content-Type are inferred from the file path.
    .append("attachment", Paths.get("pic.jpg"))
    // Name, value, filename and Content-Type are set.
    .append("attachment", new FilePayload("table.csv", "text/csv", Files.readAllBytes(Paths.get("my-tble.csv"))));
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```

**Usage**

```java
FormData.append(name, value);
```

**Arguments**
- `name` String
  
  Field name.
- `value` String | boolean | int | Path | Value
  - `setName` String
    
    File name
  - `setMimeType` String
    
    File type
  - `setBuffer` byte&#91;&#93;
    
    File content
  
  Field value.

**Returns**
- FormData

---

### create {/* #form-data-create */}



Creates new instance of FormData.

**Usage**

```java
FormData.create();
```

**Returns**
- FormData

---

### set {/* #form-data-set */}



Sets a field on the form. File values can be passed either as `Path` or as `FilePayload`.

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    // Only name and value are set.
    .set("firstName", "John")
    // Name and value are set, filename and Content-Type are inferred from the file path.
    .set("profilePicture1", Paths.get("john.jpg"))
    // Name, value, filename and Content-Type are set.
    .set("profilePicture2", new FilePayload("john.jpg", "image/jpeg", Files.readAllBytes(Paths.get("john.jpg"))))
    .set("age", 30);
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```

**Usage**

```java
FormData.set(name, value);
```

**Arguments**
- `name` String
  
  Field name.
- `value` String | boolean | int | Path | Value
  - `setName` String
    
    File name
  - `setMimeType` String
    
    File type
  - `setBuffer` byte&#91;&#93;
    
    File content
  
  Field value.

**Returns**
- FormData


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
