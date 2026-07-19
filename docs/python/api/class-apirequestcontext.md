# APIRequestContext

> **Source:** [playwright.dev/python/docs/api/class-apirequestcontext](https://playwright.dev/python/docs/api/class-apirequestcontext)

---

This API is used for the Web API testing. You can use it to trigger API endpoints, configure micro-services, prepare environment or the service to your e2e test.

Each Playwright browser context has an associated APIRequestContext, accessible via [browser_context.request](/api/class-browsercontext.mdx#browser-context-request) or [page.request](/api/class-page.mdx#page-request) (these return the

**same instance** — `page.request` is a shortcut for `page.context().request`). You can also create a standalone, isolated instance with [api_request.new_context()](/api/class-apirequest.mdx#api-request-new-context).

**Cookie management**

The APIRequestContext returned by [browser_context.request](/api/class-browsercontext.mdx#browser-context-request) and

[page.request](/api/class-page.mdx#page-request) uses the same cookie jar as its BrowserContext:

If you want API requests that do **not** share cookies with the browser, create an isolated context via [api_request.new_context()](/api/class-apirequest.mdx#api-request-new-context). Such `APIRequestContext` object will have its own isolated cookie storage.

**sync**

```py
import os
from playwright.sync_api import sync_playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

with sync_playwright() as p:
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = p.chromium.launch()
    context = browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = p.request.new_context(base_url="https://api.github.com")


    # Create a repository.
    response = api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()"name" == REPO

    # Delete a repository.
    response = api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'
```

**async**

```py
import os
import asyncio
from playwright.async_api import async_playwright, Playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

async def run(playwright: Playwright):
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = await playwright.chromium.launch()
    context = await browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = await context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = await playwright.request.new_context(base_url="https://api.github.com")

    # Create a repository.
    response = await api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()"name" == REPO

    # Delete a repository.
    response = await api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```


---

## Methods

### delete {/* #api-request-context-delete */}



Sends HTTP(S) [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```python
api_request_context.delete(url)
api_request_context.delete(url, **kwargs)
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)* 
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)* 
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)* 
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### dispose {/* #api-request-context-dispose */}



All responses returned by [api_request_context.get()](/api/class-apirequestcontext.mdx#api-request-context-get) and similar methods are stored in the memory, so that you can later call [api_response.body()](/api/class-apiresponse.mdx#api-response-body).This method discards all its resources, calling any method on disposed APIRequestContext will throw an exception.

**Usage**

```python
api_request_context.dispose()
api_request_context.dispose(**kwargs)
```

**Arguments**
- `reason` str *(optional)* 
  
  The reason to be reported to the operations interrupted by the context disposal.

**Returns**
- NoneType

---

### fetch {/* #api-request-context-fetch */}



Sends HTTP(S) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.fetch("https://example.com/api/createBook", method="post", data=data)
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding, by specifiying the `multipart` parameter:

```python
api_request_context.fetch(
  "https://example.com/api/uploadScript",  method="post",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
```

**Arguments**
- `url_or_request` str | Request
  
  Target URL or Request to get all parameters from.
- `data` str | bytes | Dict *(optional)*
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)*
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `method` str *(optional)*
  
  If set changes the fetch method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)). If not specified, GET method is used.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)*
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### get {/* #api-request-context-get */}



Sends HTTP(S) [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

Request parameters can be configured with `params` option, they will be serialized into the URL search parameters:

```python
query_params = {
  "isbn": "1234",
  "page": "23"
}
api_request_context.get("https://example.com/api/getText", params=query_params)
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)* 
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)* 
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)* 
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### head {/* #api-request-context-head */}



Sends HTTP(S) [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```python
api_request_context.head(url)
api_request_context.head(url, **kwargs)
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)* 
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)* 
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)* 
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### patch {/* #api-request-context-patch */}



Sends HTTP(S) [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```python
api_request_context.patch(url)
api_request_context.patch(url, **kwargs)
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)*
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)*
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)*
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### post {/* #api-request-context-post */}



Sends HTTP(S) [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/createBook", data=data)
```

To send form data to the server use `form` option. Its value will be encoded into the request body with `application/x-www-form-urlencoded` encoding (see below how to use `multipart/form-data` form encoding to send files):

```python
formData = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/findBook", form=formData)
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding. Use FormData to construct request body and pass it to the request as `multipart` parameter:

```python
api_request_context.post(
  "https://example.com/api/uploadScript'",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)*
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)*
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)*
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### put {/* #api-request-context-put */}



Sends HTTP(S) [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```python
api_request_context.put(url)
api_request_context.put(url, **kwargs)
```

**Arguments**
- `url` str
  
  Target URL.
- `data` str | bytes | Dict *(optional)*
  
  Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
- `fail_on_status_code` bool *(optional)*
  
  Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
- `form` Dict\[str, str | float | bool\] | FormData *(optional)*
  
  Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided. Use FormData to send multiple values for the same field.
- `headers` Dict\[str, str\] *(optional)*
  
  Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
- `ignore_https_errors` bool *(optional)*
  
  Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
- `max_redirects` int *(optional)* 
  
  Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
- `max_retries` int *(optional)* 
  
  Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
- `multipart` Dict\[str, str | float | bool | ReadStream | Dict\] | FormData *(optional)*
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
  
  Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content. Use FormData to send multiple files in the same field.
- `params` Dict\[str, str | float | bool\] | str *(optional)*
  
  Query parameters to be sent with the URL.
- `timeout` float *(optional)*
  
  Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- APIResponse

---

### storage_state {/* #api-request-context-storage-state */}



Returns storage state for this request context, contains current cookies and local storage snapshot if it was passed to the constructor.

**Usage**

```python
api_request_context.storage_state()
api_request_context.storage_state(**kwargs)
```

**Arguments**
- `indexed_db` bool *(optional)* 
  
  Set to `true` to include IndexedDB in the storage state snapshot.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  The file path to save the storage state to. If [path](/api/class-apirequestcontext.mdx#api-request-context-storage-state-option-path) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.

**Returns**
- Dict
  - `cookies` List\[Dict\]
    - `name` str
      
      
    - `value` str
      
      
    - `domain` str
      
      
    - `path` str
      
      
    - `expires` float
      
      Unix time in seconds.
    - `httpOnly` bool
      
      
    - `secure` bool
      
      
    - `sameSite` "Strict" | "Lax" | "None"
      
      
    
  - `origins` List\[Dict\]
    - `origin` str
      
      
    - `localStorage` List\[Dict\]
      - `name` str
        
        
      - `value` str
        
        
      
    
---

## Properties

### tracing {/* #api-request-context-tracing */}



**Usage**

```python
api_request_context.tracing
```

**Type**
- Tracing


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
