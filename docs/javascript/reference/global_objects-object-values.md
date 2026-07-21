# Object.values()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

---

The **`Object.values()`** static method returns an array of a given object's own enumerable string-keyed property values.



```js interactive-example
const object = {
  a: "some string",
  b: 42,
  c: false,
};

console.log(Object.values(object));
// Expected output: Array ["some string", 42, false]
```

## Syntax

```js-nolint
Object.values(obj)
```

### Parameters

- `obj`
  - : An object.

### Return value

An array containing the given object's own enumerable string-keyed property values.

## Description

`Object.values()` returns an array whose elements are values of enumerable string-keyed properties found directly upon `object`. This is the same as iterating with a `for...in` loop, except that a `for...in` loop enumerates properties in the prototype chain as well. The order of the array returned by `Object.values()` is the same as that provided by a `for...in` loop.

If you need the property keys, use `Object.keys()` instead. If you need both the property keys and values, use `Object.entries()` instead.

## Examples

### Using Object.values()

```js
const obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// Array-like object
const arrayLikeObj1 = { 0: "a", 1: "b", 2: "c" };
console.log(Object.values(arrayLikeObj1)); // ['a', 'b', 'c']

// Array-like object with random key ordering
// When using numeric keys, the values are returned in the keys' numerical order
const arrayLikeObj2 = { 100: "a", 2: "b", 7: "c" };
console.log(Object.values(arrayLikeObj2)); // ['b', 'c', 'a']

// getFoo is a non-enumerable property
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = "bar";
console.log(Object.values(myObj)); // ['bar']
```

### Using Object.values() on primitives

Non-object arguments are [coerced to objects](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#object_coercion). [`undefined`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and [`null`](/en-US/docs/Web/JavaScript/Reference/Operators/null) cannot be coerced to objects and throw a `TypeError` upfront. Only strings may have own enumerable properties, while all other primitives return an empty array.

```js
// Strings have indices as enumerable own properties
console.log(Object.values("foo")); // ['f', 'o', 'o']

// Other primitives except undefined and null have no own properties
console.log(Object.values(100)); // []
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Object.values` in `core-js`](https://github.com/zloirock/core-js#ecmascript-object)
- [es-shims polyfill of `Object.values`](https://www.npmjs.com/package/object.values)
- [Enumerability and ownership of properties](/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties)
- `Object.keys()`
- `Object.entries()`
- `Object.prototype.propertyIsEnumerable()`
- `Object.create()`
- `Object.getOwnPropertyNames()`
- `Map.prototype.values()`
