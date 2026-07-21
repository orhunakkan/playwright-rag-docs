# RegExp.prototype.flags

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)

---

The **`flags`** accessor property of `RegExp` instances returns the [flags](/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags) of this regular expression.



```js interactive-example
// Outputs RegExp flags in alphabetical order

console.log(/foo/gi.flags);
// Expected output: "gi"

console.log(/^bar/muy.flags);
// Expected output: "muy"
```

## Description

`RegExp.prototype.flags` has a string as its value. Flags in the `flags` property are sorted alphabetically (from left to right, e.g., `"dgimsuvy"`). It actually invokes the other flag accessors ([`hasIndices`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices), [`global`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global), etc.) one-by-one and concatenates the results.

All built-in functions read the `flags` property instead of reading individual flag accessors.

The set accessor of `flags` is `undefined`. You cannot change this property directly.

## Examples

### Using flags

```js-nolint
/foo/ig.flags; // "gi"
/^bar/myu.flags; // "muy"
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `RegExp.prototype.flags` in `core-js`](https://github.com/zloirock/core-js#ecmascript-string-and-regexp)
- [es-shims polyfill of `RegExp.prototype.flags`](https://www.npmjs.com/package/regexp.prototype.flags)
- [Advanced searching with flags](/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags) in the Regular expressions guide
- `RegExp.prototype.source`
