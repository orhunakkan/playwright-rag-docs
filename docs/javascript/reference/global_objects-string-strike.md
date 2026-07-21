# String.prototype.strike()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/strike](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/strike)

---

The **`strike()`** method of `String` values creates a string that embeds this string in a `strike` element (`<strike>str</strike>`), which causes this string to be displayed as struck-out text.

> [!NOTE]
> All [HTML wrapper methods](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#html_wrapper_methods) are deprecated and only standardized for compatibility purposes. For the case of `strike()`, the `<strike>` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use the `del` for deleted content or the `s` for content that is no longer accurate or no longer relevant instead.

## Syntax

```js-nolint
strike()
```

### Parameters

None.

### Return value

A string beginning with a `<strike>` start tag, then the text `str`, and then a `</strike>` end tag.

## Examples

### Using strike()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.strike();
```

This will create the following HTML:

```html
<strike>Hello, world</strike>
```

> [!WARNING]
> This markup is invalid, because `strike` is no longer a valid element.

Instead of using `strike()` and creating HTML text directly, you should use DOM APIs such as [`document.createElement()`](/en-US/docs/Web/API/Document/createElement). For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("s");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `String.prototype.strike` in `core-js`](https://github.com/zloirock/core-js#ecmascript-string-and-regexp)
- [es-shims polyfill of `String.prototype.strike`](https://www.npmjs.com/package/es-string-html-methods)
- [HTML wrapper methods](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#html_wrapper_methods)
- `strike`
