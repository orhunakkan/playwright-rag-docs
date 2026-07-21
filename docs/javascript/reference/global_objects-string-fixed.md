# String.prototype.fixed()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fixed)

---

The **`fixed()`** method of `String` values creates a string that embeds this string in a `tt` element (`<tt>str</tt>`), which causes this string to be displayed in a fixed-width font.

> [!NOTE]
> All [HTML wrapper methods](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#html_wrapper_methods) are deprecated and only standardized for compatibility purposes. For the case of `fixed()`, the `<tt>` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use [CSS](/en-US/docs/Web/CSS) properties instead.

## Syntax

```js-nolint
fixed()
```

### Parameters

None.

### Return value

A string beginning with a `<tt>` start tag, then the text `str`, and then a `</tt>` end tag.

## Examples

### Using fixed()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.fixed();
```

This will create the following HTML:

```html
<tt>Hello, world</tt>
```

> [!WARNING]
> This markup is invalid, because `tt` is no longer a valid element.

Instead of using `fixed()` and creating HTML text directly, you should use CSS to manipulate fonts. For example, you can manipulate `font-family` through the `element.style` attribute:

```js
document.getElementById("yourElemId").style.fontFamily = "monospace";
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `String.prototype.fixed` in `core-js`](https://github.com/zloirock/core-js#ecmascript-string-and-regexp)
- [es-shims polyfill of `String.prototype.fixed`](https://www.npmjs.com/package/es-string-html-methods)
- [HTML wrapper methods](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#html_wrapper_methods)
- `tt`
