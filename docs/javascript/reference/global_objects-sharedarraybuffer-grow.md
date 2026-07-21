# SharedArrayBuffer.prototype.grow()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/grow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/grow)

---

The **`grow()`** method of `SharedArrayBuffer` instances grows the `SharedArrayBuffer` to the specified size, in bytes.

## Syntax

```js-nolint
grow(newLength)
```

### Parameters

- `newLength`
  - : The new length, in bytes, to resize the `SharedArrayBuffer` to.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
  - : Thrown if the `SharedArrayBuffer` is not growable.
- `RangeError`
  - : Thrown if `newLength` is larger than the `maxByteLength` of the `SharedArrayBuffer` or smaller than the `byteLength`.

## Description

The `grow()` method grows a `SharedArrayBuffer` to the size specified by the `newLength` parameter, provided that the `SharedArrayBuffer` is [growable](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/growable) and the new size is less than or equal to the `maxByteLength` of the `SharedArrayBuffer`. New bytes are initialized to 0.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its [security requirements](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) are met.

### Using grow()

In this example, we create a 8-byte buffer that is growable to a max length of 16 bytes, then check its `growable` property, growing it if `growable` returns `true`:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

if (buffer.growable) {
  console.log("SAB is growable!");
  buffer.grow(12);
}
```

## Specifications



## Browser compatibility



## See also

- `SharedArrayBuffer`
- `SharedArrayBuffer.prototype.growable`
- `SharedArrayBuffer.prototype.maxByteLength`
