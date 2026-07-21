# SharedArrayBuffer.prototype.maxByteLength

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/maxByteLength](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/maxByteLength)

---

The **`maxByteLength`** accessor property of `SharedArrayBuffer` instances returns the maximum length (in bytes) that this `SharedArrayBuffer` can be grown to.

## Description

The `maxByteLength` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the shared array is constructed, set via the `maxByteLength` option of the `SharedArrayBuffer()` constructor, and cannot be changed.

If this `SharedArrayBuffer` was constructed without specifying a `maxByteLength` value, this property returns a value equal to the value of the `SharedArrayBuffer`'s `byteLength`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its [security requirements](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) are met.

### Using maxByteLength

In this example, we create a 8-byte buffer that is resizable to a max length of 16 bytes, then return its `maxByteLength`:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

buffer.maxByteLength; // 16
```

## Specifications



## Browser compatibility



## See also

- `SharedArrayBuffer`
