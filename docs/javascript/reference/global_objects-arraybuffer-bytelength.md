# ArrayBuffer.prototype.byteLength

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength)

---

The **`byteLength`** accessor property of `ArrayBuffer` instances returns the length (in bytes) of this array buffer.



```js interactive-example
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(8);

// Use byteLength to check the size
const bytes = buffer.byteLength;

console.log(bytes);
// Expected output: 8
```

## Description

The `byteLength` property is an accessor property whose set accessor function is `undefined`, meaning that you can only read this property. The value is established when the array is constructed and cannot be changed. This property returns 0 if this `ArrayBuffer` has been detached.

## Examples

### Using byteLength

```js
const buffer = new ArrayBuffer(8);
buffer.byteLength; // 8
```

## Specifications



## Browser compatibility



## See also

- `ArrayBuffer`
