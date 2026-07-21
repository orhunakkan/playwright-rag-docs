# TypedArray.of()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

---

The **`TypedArray.of()`** static method creates a new
[typed array](/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#typedarray_objects) from a variable number of arguments. This method is nearly the same as
`Array.of()`.



```js interactive-example
const int16array = Int16Array.of("10", "20", "30", "40", "50");

console.log(int16array);
// Expected output: Int16Array [10, 20, 30, 40, 50]
```

## Syntax

```js-nolint
TypedArray.of()
TypedArray.of(element1)
TypedArray.of(element1, element2)
TypedArray.of(element1, element2, /* …, */ elementN)
```

Where `TypedArray` is one of:

- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float16Array`
- `Float32Array`
- `Float64Array`
- `BigInt64Array`
- `BigUint64Array`

### Parameters

- `element1`, …, `elementN`
  - : Elements used to create the typed array.

### Return value

A new `TypedArray` instance.

## Description

See `Array.of()` for more details. There are some subtle distinctions between `Array.of()` and
`TypedArray.of()`:

- If the `this` value passed to `TypedArray.of()` is not a constructor, `TypedArray.of()` will throw a `TypeError`, while `Array.of()` defaults to creating a new `Array`.
- `TypedArray.of()` uses `[[Set]]` while `Array.of()` uses `[[DefineOwnProperty]]`. Hence, when working with `Proxy` objects, it calls [`handler.set()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) to create new elements rather than [`handler.defineProperty()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty).

## Examples

### Using of()

```js
Uint8Array.of(1); // Uint8Array [ 1 ]
Int8Array.of("1", "2", "3"); // Int8Array [ 1, 2, 3 ]
Float32Array.of(1, 2, 3); // Float32Array [ 1, 2, 3 ]
Int16Array.of(undefined); // Int16Array [ 0 ]
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `TypedArray.of` in `core-js`](https://github.com/zloirock/core-js#ecmascript-typed-arrays)
- [JavaScript typed arrays](/en-US/docs/Web/JavaScript/Guide/Typed_arrays) guide
- `TypedArray`
- `TypedArray.from()`
- `Array.of()`
