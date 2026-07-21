# Atomics.exchange()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/exchange](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/exchange)

---

The **`Atomics.exchange()`** static method exchanges a given value at a given position in the array, and returns the old value at that position. This atomic operation guarantees that no other write happens between the read of the old value and the write of the new value.

## Syntax

```js-nolint
Atomics.exchange(typedArray, index, value)
```

### Parameters

- `typedArray`
  - : An integer typed array. One of `Int8Array`, `Uint8Array`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `BigInt64Array`, or `BigUint64Array`.
- `index`
  - : The position in the `typedArray` to exchange a `value`.
- `value`
  - : The number to exchange.

### Return value

The old value at the given position (`typedArray[index]`).

### Exceptions

- `TypeError`
  - : Thrown if `typedArray` is not one of the allowed integer types.
- `RangeError`
  - : Thrown if `index` is out of bounds in the `typedArray`.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its [security requirements](/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) are met.

### Using Atomics.exchange()

```js
// Create a SharedArrayBuffer with a size in bytes
const sab = new SharedArrayBuffer(1024);
// Create a view and set the value of the 0 index
const ta = new Uint8Array(sab);
ta[0] = 7;

console.log(Atomics.exchange(ta, 0, 12)); // 7, the old value
console.log(Atomics.load(ta, 0)); // 12, the new/current value
```

## Specifications



## Browser compatibility



## See also

- `Atomics`
- `Atomics.compareExchange()`
- `Atomics.store()`
