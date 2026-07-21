# ArrayBuffer.prototype.maxByteLength

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength)

---

The **`maxByteLength`** accessor property of `ArrayBuffer` instances returns the maximum length (in bytes) that this array buffer can be resized to.



```js interactive-example
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(buffer.byteLength);
// Expected output: 8

console.log(buffer.maxByteLength);
// Expected output: 16
```

## Description

The `maxByteLength` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the array is constructed, set via the `maxByteLength` option of the `ArrayBuffer()` constructor, and cannot be changed.

This property returns 0 if this `ArrayBuffer` has been detached. If this `ArrayBuffer` was constructed without specifying a `maxByteLength` value, this property returns a value equal to the value of the `ArrayBuffer`'s `byteLength`.

## Examples

### Using maxByteLength

In this example, we create an 8-byte buffer that is resizable to a max length of 16 bytes, then return its `maxByteLength`:

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

buffer.maxByteLength; // 16
```

## Specifications



## Browser compatibility



## See also

- `ArrayBuffer`
- `ArrayBuffer.prototype.byteLength`
- `ArrayBuffer.prototype.resize()`
