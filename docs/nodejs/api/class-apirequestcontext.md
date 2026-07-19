# APIRequestContext

> **Source:** [playwright.dev/docs/api/class-apirequestcontext](https://playwright.dev/docs/api/class-apirequestcontext)

---

This API is used for the Web API testing. You can use it to trigger API endpoints, configure micro-services, prepare environment or the service to your e2e test.

Each Playwright browser context has an associated APIRequestContext, accessible via [browserContext.request](/api/class-browsercontext.mdx#browser-context-request) or [page.request](/api/class-page.mdx#page-request) (these return the

**same instance** — `page.request` is a shortcut for `page.context().request`). You can also create a standalone, isolated instance with [apiRequest.newContext()](/api/class-apirequest.mdx#api-request-new-context).

**Cookie management**

The APIRequestContext returned by [browserContext.request](/api/class-browsercontext.mdx#browser-context-request) and

[page.request](/api/class-page.mdx#page-request) uses the same cookie jar as its BrowserContext:

If you want API requests that do **not** share cookies with the browser, create an isolated context via [apiRequest.newContext()](/api/class-apirequest.mdx#api-request-new-context). Such `APIRequestContext` object will have its own isolated cookie storage.


---

## Methods

### delete {/* #api-request-context-delete */}



Sends HTTP(S) [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```js
await apiRequestContext.delete(url);
await apiRequestContext.delete(url, options);
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)* 
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)* 
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)* 
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### dispose {/* #api-request-context-dispose */}



All responses returned by [apiRequestContext.get()](/api/class-apirequestcontext.mdx#api-request-context-get) and similar methods are stored in the memory, so that you can later call [apiResponse.body()](/api/class-apiresponse.mdx#api-response-body).This method discards all its resources, calling any method on disposed APIRequestContext will throw an exception.

**Usage**

```js
await apiRequestContext.dispose();
await apiRequestContext.dispose(options);
```

**Arguments**
- `options` Object *(optional)*
  - `reason` string *(optional)* 
    
    The reason to be reported to the operations interrupted by the context disposal.

**Returns**
- Promise<void>

---

### fetch {/* #api-request-context-fetch */}



Sends HTTP(S) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.fetch('https://example.com/api/createBook', {
  method: 'post',
  data: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding, by specifiying the `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File('console.log(2024);', 'f1.js', { type: 'text/javascript' }));
form.append('file', new File('hello', 'f2.txt', { type: 'text/plain' }));
await request.fetch('https://example.com/api/uploadForm', {
  multipart: form
});
```

**Arguments**
- `urlOrRequest` string | Request
  
  Target URL or Request to get all parameters from.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)*
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)*
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `method` string *(optional)*
    
    If set changes the fetch method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)). If not specified, GET method is used.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)*
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### get {/* #api-request-context-get */}



Sends HTTP(S) [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

Request parameters can be configured with `params` option, they will be serialized into the URL search parameters:

```js
// Passing params as object
await request.get('https://example.com/api/getText', {
  params: {
    'isbn': '1234',
    'page': 23,
  }
});

// Passing params as URLSearchParams
const searchParams = new URLSearchParams();
searchParams.set('isbn', '1234');
searchParams.append('page', 23);
searchParams.append('page', 24);
await request.get('https://example.com/api/getText', { params: searchParams });

// Passing params as string
const queryString = 'isbn=1234&page=23&page=24';
await request.get('https://example.com/api/getText', { params: queryString });
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)* 
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)* 
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)* 
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### head {/* #api-request-context-head */}



Sends HTTP(S) [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```js
await apiRequestContext.head(url);
await apiRequestContext.head(url, options);
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)* 
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)* 
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)* 
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### patch {/* #api-request-context-patch */}



Sends HTTP(S) [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```js
await apiRequestContext.patch(url);
await apiRequestContext.patch(url, options);
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)*
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)*
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)*
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### post {/* #api-request-context-post */}



Sends HTTP(S) [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.post('https://example.com/api/createBook', {
  data: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

To send form data to the server use `form` option. Its value will be encoded into the request body with `application/x-www-form-urlencoded` encoding (see below how to use `multipart/form-data` form encoding to send files):

```js
await request.post('https://example.com/api/findBook', {
  form: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding. Use FormData to construct request body and pass it to the request as `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File('console.log(2024);', 'f1.js', { type: 'text/javascript' }));
form.append('file', new File('hello', 'f2.txt', { type: 'text/plain' }));
await request.post('https://example.com/api/uploadForm', {
  multipart: form
});
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)*
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)*
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)*
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### put {/* #api-request-context-put */}



Sends HTTP(S) [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request and returns its response. The method will populate request cookies from the context and update context cookies from the response. The method will automatically follow redirects.

**Usage**

```js
await apiRequestContext.put(url);
await apiRequestContext.put(url, options);
```

**Arguments**
- `url` string
  
  Target URL.
- `options` Object *(optional)*
  - `data` string | Buffer | Serializable *(optional)*
    
    Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be set to `application/octet-stream` if not explicitly set.
  - `failOnStatusCode` boolean *(optional)*
    
    Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status codes.
  - `form` Object<string, string | number | boolean> | FormData *(optional)*
    
    Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded` unless explicitly provided.
  - `headers` Object<string, string> *(optional)*
    
    Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.
  - `ignoreHTTPSErrors` boolean *(optional)*
    
    Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
  - `maxRedirects` number *(optional)* 
    
    Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded. Defaults to `20`. Pass `0` to not follow redirects.
  - `maxRetries` number *(optional)* 
    
    Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
  - `multipart` FormData | Object<string, string | number | boolean | ReadStream | Object> *(optional)*
    - `name` string
      
      File name
    - `mimeType` string
      
      File type
    - `buffer` Buffer
      
      File content
    
    Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file name, mime-type and its content.
  - `params` Object<string, string | number | boolean> | URLSearchParams | string *(optional)*
    
    Query parameters to be sent with the URL.
  - `signal` AbortSignal *(optional)* 
    
    Allows to cancel the operation using an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). If the signal is aborted, the operation will be aborted and throw an error. Note that providing a signal does not disable the default timeout, which can be changed using [browserContext.setDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.setDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout); pass `timeout: 0` to disable the timeout entirely.
  - `timeout` number *(optional)*
    
    Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Promise<APIResponse>

---

### storageState {/* #api-request-context-storage-state */}



Returns storage state for this request context, contains current cookies and local storage snapshot if it was passed to the constructor.

**Usage**

```js
await apiRequestContext.storageState();
await apiRequestContext.storageState(options);
```

**Arguments**
- `options` Object *(optional)*
  - `indexedDB` boolean *(optional)* 
    
    Set to `true` to include IndexedDB in the storage state snapshot.
  - `path` string *(optional)*
    
    The file path to save the storage state to. If [path](/api/class-apirequestcontext.mdx#api-request-context-storage-state-option-path) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.

**Returns**
- Promise<Object>
  - `cookies` Array<Object>
    - `name` string
      
      
    - `value` string
      
      
    - `domain` string
      
      
    - `path` string
      
      
    - `expires` number
      
      Unix time in seconds.
    - `httpOnly` boolean
      
      
    - `secure` boolean
      
      
    - `sameSite` "Strict" | "Lax" | "None"
      
      
    
  - `origins` Array<Object>
    - `origin` string
      
      
    - `localStorage` Array<Object>
      - `name` string
        
        
      - `value` string
        
        
      
    
---

## Properties

### tracing {/* #api-request-context-tracing */}



**Usage**

```js
apiRequestContext.tracing
```

**Type**
- Tracing


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
