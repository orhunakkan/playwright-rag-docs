# TypedArray.prototype.slice()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice)

---

The **`slice()`** method of `TypedArray` instances returns a copy of a portion of a typed array into a new typed array object selected from `start` to `end` (`end` not included) where `start` and `end` represent the index of items in that typed array. The original typed array will not be modified. This method has the same algorithm as `Array.prototype.slice()`.



```js interactive-example
const bytes = new Uint8Array([10, 20, 30, 40, 50]);
const byteSlice = bytes.slice(1, 3);

console.log(byteSlice);
// Expected output: Uint8Array [20, 30]
```

## Syntax

```js-nolint
slice()
slice(start)
slice(start, end)
```

### Parameters

- `start` (optional)
  - : Zero-based index at which to start extraction, [converted to an integer](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#integer_conversion).
- `end` (optional)
  - : Zero-based index at which to end extraction, [converted to an integer](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#integer_conversion). `slice()` extracts up to but not including `end`.

### Return value

A new typed array containing the extracted elements.

## Description

See `Array.prototype.slice()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Return a portion of an existing typed array

```js
const bytes = new Uint8Array([1, 2, 3]);
bytes.slice(1); // Uint8Array [ 2, 3 ]
bytes.slice(2); // Uint8Array [ 3 ]
bytes.slice(-2); // Uint8Array [ 2, 3 ]
bytes.slice(0, 1); // Uint8Array [ 1 ]
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `TypedArray.prototype.slice` in `core-js`](https://github.com/zloirock/core-js#ecmascript-typed-arrays)
- [es-shims polyfill of `TypedArray.prototype.slice`](https://www.npmjs.com/package/typedarray.prototype.slice)
- [JavaScript typed arrays](/en-US/docs/Web/JavaScript/Guide/Typed_arrays) guide
- `TypedArray`
- `Array.prototype.slice()`
- `String.prototype.slice()`
