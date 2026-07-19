# WebSocketRoute

> **Source:** [playwright.dev/python/docs/api/class-websocketroute](https://playwright.dev/python/docs/api/class-websocketroute)

---

Whenever a [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) route is set up with [page.route_web_socket()](/api/class-page.mdx#page-route-web-socket) or [browser_context.route_web_socket()](/api/class-browsercontext.mdx#browser-context-route-web-socket), the `WebSocketRoute` object allows to handle the WebSocket, like an actual server would do.

**Mocking**

By default, the routed WebSocket will not connect to the server. This way, you can mock entire communication over the WebSocket. Here is an example that responds to a `"request"` with a `"response"`.

**sync**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message == "request":
    ws.send("response")

page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

**async**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message == "request":
    ws.send("response")

await page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

Since we do not call [web_socket_route.connect_to_server](/api/class-websocketroute.mdx#web-socket-route-connect-to-server) inside the WebSocket route handler, Playwright assumes that WebSocket will be mocked, and opens the WebSocket inside the page automatically.

Here is another example that handles JSON messages:

**sync**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  json_message = json.loads(message)
  if json_message"request" == "question":
    ws.send(json.dumps({ "response": "answer" }))

page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

**async**

```py
def message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  json_message = json.loads(message)
  if json_message"request" == "question":
    ws.send(json.dumps({ "response": "answer" }))

await page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

**Intercepting**

Alternatively, you may want to connect to the actual server, but intercept messages in-between and modify or block them. Calling [web_socket_route.connect_to_server](/api/class-websocketroute.mdx#web-socket-route-connect-to-server) returns a server-side `WebSocketRoute` instance that you can send messages to, or handle incoming messages.

Below is an example that modifies some messages sent by the page to the server. Messages sent from the server to the page are left intact, relying on the default forwarding.

**sync**

```py
def message_handler(server: WebSocketRoute, message: Unionstr, bytes):
  if message == "request":
    server.send("request2")
  else:
    server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

page.route_web_socket("/ws", handler)
```

**async**

```py
def message_handler(server: WebSocketRoute, message: Unionstr, bytes):
  if message == "request":
    server.send("request2")
  else:
    server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

await page.route_web_socket("/ws", handler)
```

After connecting to the server, all **messages are forwarded** between the page and the server by default.

However, if you call [web_socket_route.on_message()](/api/class-websocketroute.mdx#web-socket-route-on-message) on the original route, messages from the page to the server **will not be forwarded** anymore, but should instead be handled by the [handler](/api/class-websocketroute.mdx#web-socket-route-on-message-option-handler).

Similarly, calling [web_socket_route.on_message()](/api/class-websocketroute.mdx#web-socket-route-on-message) on the server-side WebSocket will **stop forwarding messages** from the server to the page, and [handler](/api/class-websocketroute.mdx#web-socket-route-on-message-option-handler) should take care of them.

The following example blocks some messages in both directions. Since it calls [web_socket_route.on_message()](/api/class-websocketroute.mdx#web-socket-route-on-message) in both directions, there is no automatic forwarding at all.

**sync**

```py
def ws_message_handler(server: WebSocketRoute, message: Unionstr, bytes):
  if message != "blocked-from-the-page":
    server.send(message)

def server_message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message != "blocked-from-the-server":
    ws.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: ws_message_handler(server, message))
  server.on_message(lambda message: server_message_handler(ws, message))

page.route_web_socket("/ws", handler)
```

**async**

```py
def ws_message_handler(server: WebSocketRoute, message: Unionstr, bytes):
  if message != "blocked-from-the-page":
    server.send(message)

def server_message_handler(ws: WebSocketRoute, message: Unionstr, bytes):
  if message != "blocked-from-the-server":
    ws.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: ws_message_handler(server, message))
  server.on_message(lambda message: server_message_handler(ws, message))

await page.route_web_socket("/ws", handler)
```


---

## Methods

### close {/* #web-socket-route-close */}



Closes one side of the WebSocket connection.

**Usage**

```python
web_socket_route.close()
web_socket_route.close(**kwargs)
```

**Arguments**
- `code` int *(optional)*
  
  Optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code).
- `reason` str *(optional)*
  
  Optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).

**Returns**
- NoneType

---

### on_close {/* #web-socket-route-on-close */}



Allows to handle [`WebSocket.close`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close).

By default, closing one side of the connection, either in the page or on the server, will close the other side. However, when [web_socket_route.on_close()](/api/class-websocketroute.mdx#web-socket-route-on-close) handler is set up, the default forwarding of closure is disabled, and handler should take care of it.

**Usage**

```python
web_socket_route.on_close(handler)
```

**Arguments**
- `handler` Callable\[int | undefined\]:Promise\[Any\] | Any
  
  Function that will handle WebSocket closure. Received an optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code) and an optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).

---

### on_message {/* #web-socket-route-on-message */}



This method allows to handle messages that are sent by the WebSocket, either from the page or from the server.

When called on the original WebSocket route, this method handles messages sent from the page. You can handle this messages by responding to them with [web_socket_route.send()](/api/class-websocketroute.mdx#web-socket-route-send), forwarding them to the server-side connection returned by [web_socket_route.connect_to_server](/api/class-websocketroute.mdx#web-socket-route-connect-to-server) or do something else.

Once this method is called, messages are not automatically forwarded to the server or to the page - you should do that manually by calling [web_socket_route.send()](/api/class-websocketroute.mdx#web-socket-route-send). See examples at the top for more details.

Calling this method again will override the handler with a new one.

**Usage**

```python
web_socket_route.on_message(handler)
```

**Arguments**
- `handler` Callable\[str\]:Promise\[Any\] | Any
  
  Function that will handle messages.

---

### send {/* #web-socket-route-send */}



Sends a message to the WebSocket. When called on the original WebSocket, sends the message to the page. When called on the result of [web_socket_route.connect_to_server](/api/class-websocketroute.mdx#web-socket-route-connect-to-server), sends the message to the server. See examples at the top for more details.

**Usage**

```python
web_socket_route.send(message)
```

**Arguments**
- `message` str | bytes
  
  Message to send.

---

## Properties

### connect_to_server {/* #web-socket-route-connect-to-server */}



By default, routed WebSocket does not connect to the server, so you can mock entire WebSocket communication. This method connects to the actual WebSocket server, and returns the server-side WebSocketRoute instance, giving the ability to send and receive messages from the server.

Once connected to the server:
* Messages received from the server will be **automatically forwarded** to the WebSocket in the page, unless [web_socket_route.on_message()](/api/class-websocketroute.mdx#web-socket-route-on-message) is called on the server-side `WebSocketRoute`.
* Messages sent by the [`WebSocket.send()`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) call in the page will be **automatically forwarded** to the server, unless [web_socket_route.on_message()](/api/class-websocketroute.mdx#web-socket-route-on-message) is called on the original `WebSocketRoute`.

See examples at the top for more details.

**Usage**

```python
web_socket_route.connect_to_server
```

**Returns**
- WebSocketRoute

---

### protocols {/* #web-socket-route-protocols */}



The list of WebSocket subprotocols requested by the page, as passed via the second argument to the [`WebSocket` constructor](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket). Corresponds to the `Sec-WebSocket-Protocol` request header.

Returns an empty array if no protocols were specified.

**Usage**

**sync**

```py
def handler(ws: WebSocketRoute):
  if "chat.v2" in ws.protocols:
    ws.on_message(lambda message: ws.send(f"v2:{message}"))
  else:
    ws.close(code=1002, reason="Unsupported protocol")

page.route_web_socket("wss://example.com/ws", handler)
```

**async**

```py
async def handler(ws: WebSocketRoute):
  if "chat.v2" in ws.protocols:
    ws.on_message(lambda message: ws.send(f"v2:{message}"))
  else:
    await ws.close(code=1002, reason="Unsupported protocol")

await page.route_web_socket("wss://example.com/ws", handler)
```

**Returns**
- List\[str\]

---

### url {/* #web-socket-route-url */}



URL of the WebSocket created in the page.

**Usage**

```python
web_socket_route.url
```

**Returns**
- str


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
