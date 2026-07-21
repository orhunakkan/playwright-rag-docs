# Object.fromEntries()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

---

The **`Object.fromEntries()`** static method transforms a list of key-value pairs into an object.



```js interactive-example
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```

## Syntax

```js-nolint
Object.fromEntries(iterable)
```

### Parameters

- `iterable`
  - : An [iterable](/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), such as an `Array` or `Map`, containing a list of objects. Each object should have two properties:
    - `0`
      - : A string or [symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) representing the property key.
    - `1`
      - : The property value.

    Typically, this object is implemented as a two-element array, with the first element being the property key and the second element being the property value.

### Return value

A new object whose properties are given by the entries of the iterable.

## Description

The `Object.fromEntries()` method takes a list of key-value pairs and returns a new object whose properties are given by those entries. The `iterable` argument is expected to be an object that implements a `[Symbol.iterator]()` method. The method returns an iterator object that produces two-element array-like objects. The first element is a value that will be used as a property key, and the second element is the value to associate with that property key.

`Object.fromEntries()` performs the reverse of `Object.entries()`, except that `Object.entries()` only returns string-keyed properties, while `Object.fromEntries()` can also create symbol-keyed properties.

> [!NOTE]
> Unlike `Array.from()`, `Object.fromEntries()` does not use the value of `this`, so calling it on another constructor does not create objects of that type.

## Examples

### Converting a Map to an Object

With `Object.fromEntries`, you can convert from `Map` to `Object`:

```js
const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

### Converting an Array to an Object

With `Object.fromEntries`, you can convert from `Array` to `Object`:

```js
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

### Object transformations

With `Object.fromEntries`, its reverse method `Object.entries()`, and [array manipulation methods](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods), you are able to transform objects like this:

```js
const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1).map(([key, val]) => [key, val * 2]),
);

console.log(object2);
// { a: 2, b: 4, c: 6 }
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Object.fromEntries` in `core-js`](https://github.com/zloirock/core-js#ecmascript-object)
- [es-shims polyfill of `Object.fromEntries`](https://www.npmjs.com/package/object.fromentries)
- `Object.entries()`
- `Object.keys()`
- `Object.values()`
- `Object.prototype.propertyIsEnumerable()`
- `Object.create()`
- `Map.prototype.entries()`
- `Map.prototype.keys()`
- `Map.prototype.values()`
