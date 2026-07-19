# WebSocket

> **Source:** [playwright.dev/java/docs/api/class-websocket](https://playwright.dev/java/docs/api/class-websocket)

---

The WebSocket class represents WebSocket connections within a page. It provides the ability to inspect and manipulate the data being transmitted and received.

If you want to intercept or modify WebSocket frames, consider using WebSocketRoute.


---

## Methods

### isClosed {/* #web-socket-is-closed */}



Indicates that the web socket has been closed.

**Usage**

```java
WebSocket.isClosed();
```

**Returns**
- boolean

---

### url {/* #web-socket-url */}



Contains the URL of the WebSocket.

**Usage**

```java
WebSocket.url();
```

**Returns**
- String

---

### waitForFrameReceived {/* #web-socket-wait-for-frame-received */}



Performs action and waits for a frame to be sent. If predicate is provided, it passes WebSocketFrame value into the `predicate` function and waits for `predicate(webSocketFrame)` to return a truthy value. Will throw an error if the WebSocket or Page is closed before the frame is received.

**Usage**

```java
WebSocket.waitForFrameReceived(callback);
WebSocket.waitForFrameReceived(callback, options);
```

**Arguments**
- `options` `WebSocket.WaitForFrameReceivedOptions` *(optional)*
  - `setPredicate` Predicate<WebSocketFrame> *(optional)* 
    
    Receives the WebSocketFrame object and resolves to truthy value when the waiting should resolve.
  - `setTimeout` double *(optional)* 
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
- `callback` Runnable 
  
  Callback that performs the action triggering the event.

**Returns**
- WebSocketFrame

---

### waitForFrameSent {/* #web-socket-wait-for-frame-sent */}



Performs action and waits for a frame to be sent. If predicate is provided, it passes WebSocketFrame value into the `predicate` function and waits for `predicate(webSocketFrame)` to return a truthy value. Will throw an error if the WebSocket or Page is closed before the frame is sent.

**Usage**

```java
WebSocket.waitForFrameSent(callback);
WebSocket.waitForFrameSent(callback, options);
```

**Arguments**
- `options` `WebSocket.WaitForFrameSentOptions` *(optional)*
  - `setPredicate` Predicate<WebSocketFrame> *(optional)* 
    
    Receives the WebSocketFrame object and resolves to truthy value when the waiting should resolve.
  - `setTimeout` double *(optional)* 
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout).
- `callback` Runnable 
  
  Callback that performs the action triggering the event.

**Returns**
- WebSocketFrame

---

## Events

### onClose(handler) {/* #web-socket-event-close */}



Fired when the websocket closes.

**Usage**

```java
WebSocket.onClose(handler)
```

**Event data**
- WebSocket

---

### onFrameReceived(handler) {/* #web-socket-event-frame-received */}



Fired when the websocket receives a frame.

**Usage**

```java
WebSocket.onFrameReceived(handler)
```

**Event data**
- WebSocketFrame

---

### onFrameSent(handler) {/* #web-socket-event-frame-sent */}



Fired when the websocket sends a frame.

**Usage**

```java
WebSocket.onFrameSent(handler)
```

**Event data**
- WebSocketFrame

---

### onSocketError(handler) {/* #web-socket-event-socket-error */}



Fired when the websocket has an error.

**Usage**

```java
WebSocket.onSocketError(handler)
```

**Event data**
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
