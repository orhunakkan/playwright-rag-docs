# Number.parseFloat()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)

---

The **`Number.parseFloat()`** static method parses an argument and returns a floating point number. If a number cannot be parsed from the argument, it returns `NaN`.



```js interactive-example
function circumference(r) {
  if (Number.isNaN(Number.parseFloat(r))) {
    return 0;
  }
  return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference("4.567abcdefgh"));
// Expected output: 28.695307297889173

console.log(circumference("abcdefgh"));
// Expected output: 0
```

## Syntax

```js-nolint
Number.parseFloat(string)
```

### Parameters

- `string`
  - : The value to parse, [coerced to a string](/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion). Leading `whitespace` in this argument is ignored.

### Return value

A floating point number parsed from the given `string`.

Or `NaN` when the first non-whitespace character cannot be converted to a number.

## Examples

### Number.parseFloat vs. parseFloat

This method has the same functionality as the global `parseFloat()` function:

```js
Number.parseFloat === parseFloat; // true
```

Its purpose is modularization of globals.

See `parseFloat()` for more detail and examples.

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Number.parseFloat` in `core-js`](https://github.com/zloirock/core-js#ecmascript-number)
- [es-shims polyfill of `Number.parseFloat`](https://www.npmjs.com/package/number.parsefloat)
- `Number`
- `parseFloat()`
