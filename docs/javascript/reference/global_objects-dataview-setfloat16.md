# DataView.prototype.setFloat16()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat16](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat16)

---

The **`setFloat16()`** method of `DataView` instances takes a number and stores it as a 16-bit floating point number in the 2 bytes starting at the specified byte offset of this `DataView`. There is no alignment constraint; multi-byte values may be stored at any offset within bounds.



```js interactive-example
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const view = new DataView(buffer);
view.setFloat16(1, Math.PI);

console.log(view.getFloat16(1));
// Expected output: 3.140625
```

## Syntax

```js-nolint
setFloat16(byteOffset, value)
setFloat16(byteOffset, value, littleEndian)
```

### Parameters

- `byteOffset`
  - : The offset, in bytes, from the start of the view to store the data in.
- `value`
  - : The value to set. For how the value is encoded in bytes, see [Value encoding and normalization](/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#value_encoding_and_normalization).
- `littleEndian` (optional)
  - : Indicates whether the data is stored in [little- or big-endian](/en-US/docs/Glossary/Endianness) format. If `false` or `undefined`, a big-endian value is written.

### Return value

`undefined`.

### Exceptions

- `RangeError`
  - : Thrown if the `byteOffset` is set such that it would store beyond the end of the view.

## Examples

### Using setFloat16()

```js
const buffer = new ArrayBuffer(10);
const dataview = new DataView(buffer);
dataview.setFloat16(0, 3);
dataview.getFloat16(1); // 0
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `DataView.prototype.setFloat16` in `core-js`](https://github.com/zloirock/core-js#float16-methods)
- [JavaScript typed arrays](/en-US/docs/Web/JavaScript/Guide/Typed_arrays) guide
- `DataView`
- `ArrayBuffer`
- `Float16Array`
