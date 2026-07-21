# DataView.prototype.getBigUint64()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigUint64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigUint64)

---

The **`getBigUint64()`** method of `DataView` instances reads 8 bytes starting at the specified byte offset of this `DataView` and interprets them as a 64-bit unsigned integer. There is no alignment constraint; multi-byte values may be fetched from any offset within bounds.



```js interactive-example
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

// Highest possible BigInt value that fits in an unsigned 64-bit integer
const max = 2n ** 64n - 1n;

const view = new DataView(buffer);
view.setBigUint64(1, max);

console.log(view.getBigUint64(1));
// Expected output: 18446744073709551615n
```

## Syntax

```js-nolint
getBigUint64(byteOffset)
getBigUint64(byteOffset, littleEndian)
```

### Parameters

- `byteOffset`
  - : The offset, in bytes, from the start of the view to read the data from.
- `littleEndian` (optional)
  - : Indicates whether the data is stored in [little- or big-endian](/en-US/docs/Glossary/Endianness) format. If `false` or `undefined`, a big-endian value is read.

### Return value

A `BigInt` from 0 to 2<sup>64</sup>-1, inclusive.

### Exceptions

- `RangeError`
  - : Thrown if the `byteOffset` is set such that it would read beyond the end of the view.

## Examples

### Using getBigUint64()

```js
const { buffer } = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const dataview = new DataView(buffer);
console.log(dataview.getBigUint64(1)); // 72623859790382856n
```

## Specifications



## Browser compatibility



## See also

- [JavaScript typed arrays](/en-US/docs/Web/JavaScript/Guide/Typed_arrays) guide
- `DataView`
- `ArrayBuffer`
- `BigUint64Array`
