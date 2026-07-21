# Reflect.get()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)

---

The **`Reflect.get()`** static method is like the [property accessor](/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) syntax, but as a function.



```js interactive-example
const object = {
  x: 1,
  y: 2,
};

console.log(Reflect.get(object, "x"));
// Expected output: 1

const array = ["zero", "one"];

console.log(Reflect.get(array, 1));
// Expected output: "one"
```

## Syntax

```js-nolint
Reflect.get(target, propertyKey)
Reflect.get(target, propertyKey, receiver)
```

### Parameters

- `target`
  - : The target object on which to get the property.
- `propertyKey`
  - : The name of the property to get.
- `receiver` (optional)
  - : The value of `this` provided for the call to `target` if a getter is encountered. Defaults to `target`.

### Return value

The value of the property.

### Exceptions

- `TypeError`
  - : Thrown if `target` is not an object.

## Description

`Reflect.get()` provides the reflective semantic of a [property access](/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors). That is, `Reflect.get(target, propertyKey, receiver)` is semantically equivalent to:

```js
target[propertyKey];
```

Note that in a normal property access, `target` and `receiver` would observably be the same object.

`Reflect.get()` invokes the `[[Get]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods) of `target`.

## Examples

### Using Reflect.get()

```js
// Object
const obj1 = { x: 1, y: 2 };
Reflect.get(obj1, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1); // "one"

// Proxy with a get handler
const obj2 = new Proxy(
  { p: 1 },
  {
    get(t, k, r) {
      return `${k}bar`;
    },
  },
);
Reflect.get(obj2, "foo"); // "foobar"

// Proxy with get handler and receiver
const obj3 = new Proxy(
  { p: 1, foo: 2 },
  {
    get(t, prop, receiver) {
      return `${receiver[prop]}bar`;
    },
  },
);
Reflect.get(obj3, "foo", { foo: 3 }); // "3bar"
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Reflect.get` in `core-js`](https://github.com/zloirock/core-js#ecmascript-reflect)
- `Reflect`
- [Property accessors](/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
- [`handler.get()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
