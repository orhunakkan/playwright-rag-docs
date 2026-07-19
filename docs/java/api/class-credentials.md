# Credentials

> **Source:** [playwright.dev/java/docs/api/class-credentials](https://playwright.dev/java/docs/api/class-credentials)

---

`Credentials` is a virtual WebAuthn authenticator scoped to a BrowserContext. It lets tests register passkeys and answer `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies in the page, without a real authenticator or hardware security key.

There are three common ways to use it:

**Usage: seed a known credential**

```java
BrowserContext context = browser.newContext();

// A passkey your backend already provisioned for a test user.
context.credentials().create("example.com", new Credentials.CreateOptions()
    .setId(knownCredentialId) // base64url
    .setUserHandle(knownUserHandle) // base64url
    .setPrivateKey(knownPrivateKey) // base64url PKCS#8 (DER)
    .setPublicKey(knownPublicKey)); // base64url SPKI (DER)
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/login");
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

**Usage: capture a credential, then reuse it**

```java
// setup test: let the app register a passkey, then save it.
BrowserContext context = browser.newContext();
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/register");
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Create a passkey")).click();

// Read back the passkey the page registered — it includes the private key.
VirtualCredential credential = context.credentials().get(
    new Credentials.GetOptions().setRpId("example.com")).get(0);
Files.writeString(Paths.get("playwright/.auth/passkey.json"), new Gson().toJson(credential));
```

```java
// later test: seed the captured passkey so the app starts already enrolled.
VirtualCredential credential = new Gson().fromJson(
    Files.readString(Paths.get("playwright/.auth/passkey.json")), VirtualCredential.class);
BrowserContext context = browser.newContext();
context.credentials().create(credential.rpId, new Credentials.CreateOptions()
    .setId(credential.id)
    .setUserHandle(credential.userHandle)
    .setPrivateKey(credential.privateKey)
    .setPublicKey(credential.publicKey));
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/login");
// navigator.credentials.get() resolves the captured passkey — already signed in.
```

**Usage: save credentials in the storage state, restore later**

See [authentication guide](../auth.mdx) for examples of using saving and resotring the storage state.

**Defaults**


---

## Methods

### create {/* #credentials-create */}



Seeds a virtual WebAuthn credential and returns it.

With only [rpId](/api/class-credentials.mdx#credentials-create-option-rp-id), generates a fresh **ECDSA P-256** keypair, credential id and user handle. The seeded credential is discoverable (resident), so the page can resolve it from both username-then-passkey and usernameless passkey flows. The returned object carries the private and public keys, so it can be persisted to disk and re-seeded in a later test.

To **import a known credential**, supply all four of [setId](/api/class-credentials.mdx#credentials-create-option-id), [setUserHandle](/api/class-credentials.mdx#credentials-create-option-user-handle), [setPrivateKey](/api/class-credentials.mdx#credentials-create-option-private-key) and [setPublicKey](/api/class-credentials.mdx#credentials-create-option-public-key) together.

Call [Credentials.install()](/api/class-credentials.mdx#credentials-install) before navigating to a page that uses WebAuthn.

**Usage**

```java
Credentials.create(rpId);
Credentials.create(rpId, options);
```

**Arguments**
- `rpId` String
  
  Relying party id (typically the site's effective domain).
- `options` `Credentials.CreateOptions` *(optional)*
  - `setId` String *(optional)*
    
    Base64url-encoded credential id. Auto-generated if omitted.
  - `setPrivateKey` String *(optional)*
    
    Base64url-encoded PKCS#8 (DER) private key. Auto-generated if omitted.
  - `setPublicKey` String *(optional)*
    
    Base64url-encoded SPKI (DER) public key. Auto-generated if omitted.
  - `setUserHandle` String *(optional)*
    
    Base64url-encoded user handle. Auto-generated if omitted.

**Returns**
- Create
  - `id` String
    
    Base64url-encoded credential id.
  - `rpId` String
    
    Relying party id.
  - `userHandle` String
    
    Base64url-encoded user handle.
  - `privateKey` String
    
    Base64url-encoded PKCS#8 (DER) private key.
  - `publicKey` String
    
    Base64url-encoded SPKI (DER) public key.

---

### delete {/* #credentials-delete */}



Removes a credential from the authenticator by its id. Works for any credential currently held — both those seeded with [Credentials.create()](/api/class-credentials.mdx#credentials-create) and those the page registered itself by calling `navigator.credentials.create()`.

**Usage**

```java
Credentials.delete(id);
```

**Arguments**
- `id` String
  
  Base64url-encoded credential id.

**Returns**
- void

---

### get {/* #credentials-get */}



Returns every credential currently held by the authenticator, optionally filtered by [setRpId](/api/class-credentials.mdx#credentials-get-option-rp-id) or [setId](/api/class-credentials.mdx#credentials-get-option-id). This includes both credentials seeded with [Credentials.create()](/api/class-credentials.mdx#credentials-create) and credentials the page registered itself by calling `navigator.credentials.create()`.

Each returned credential includes its private and public keys, so a passkey the app just registered can be saved and re-seeded into a later test with [Credentials.create()](/api/class-credentials.mdx#credentials-create) — see the second example in the class overview.

**Usage**

```java
Credentials.get();
Credentials.get(options);
```

**Arguments**
- `options` `Credentials.GetOptions` *(optional)*
  - `setId` String *(optional)*
    
    Only return the credential with this base64url-encoded id.
  - `setRpId` String *(optional)*
    
    Only return credentials for this relying party id.

**Returns**
- List<Get>
  - `id` String
    
    
  - `rpId` String
    
    
  - `userHandle` String
    
    
  - `privateKey` String
    
    
  - `publicKey` String
    
    
---

### install {/* #credentials-install */}



Installs the virtual WebAuthn authenticator into the context, overriding `navigator.credentials.create()` and `navigator.credentials.get()` in all current and future pages. Call this before the page first touches `navigator.credentials`.

Required: until [Credentials.install()](/api/class-credentials.mdx#credentials-install) is called, no interception is in place and the page sees the platform's native (or absent) WebAuthn behaviour. Seeding credentials with [Credentials.create()](/api/class-credentials.mdx#credentials-create) without installing populates the authenticator, but the page will never see those credentials.

**Usage**

```java
Credentials.install();
```

**Returns**
- void


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
