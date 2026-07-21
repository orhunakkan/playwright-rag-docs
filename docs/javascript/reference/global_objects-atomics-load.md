# Atomics.load()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load)

---

The **`Atomics.load()`** static method returns a value at a given position in the array. This atomic operation guarantees that the read is tear-free, and that all atomic reads are sequentially consistent.

## Syntax

```js-nolint
Atomics.load(typedArray, index)
```

### Parameters

- `typedArray`
  - : An integer typed array. One of `Int8Array`, `Uint8Array`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `BigInt64Array`, or `BigUint64Array`.
- `index`
  - : The position in the `typedArray` to load from.

### Return value

The value at the given position (`typedArray[index]`).

### Exceptions

- `TypeError`
  - : Thrown if `typedArray` is not one of the allowed integer types.
- `RangeError`
  - : Thrown if `index` is out of bounds in the `typedArray`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its [security requirements](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) are met.

### Using Atomics.load()

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
// Create a view and set the value of the 0 index
const ta = new Uint8Array(sab);
ta[0] = 7;

Atomics.add(ta, 0, 12); // Add 12 to index 0
console.log(Atomics.load(ta, 0)); // 19, the new/current value
```

## Specifications



## Browser compatibility



## See also

- `Atomics`
- `Atomics.store()`
