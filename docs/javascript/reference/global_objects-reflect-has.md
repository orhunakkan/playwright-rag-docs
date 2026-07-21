# Reflect.has()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)

---

The **`Reflect.has()`** static method is like the [`in`](/en-US/docs/Web/JavaScript/Reference/Operators/in) operator, but
as a function.



```js interactive-example
const object = {
  property1: 42,
};

console.log(Reflect.has(object, "property1"));
// Expected output: true

console.log(Reflect.has(object, "property2"));
// Expected output: false

console.log(Reflect.has(object, "toString"));
// Expected output: true
```

## Syntax

```js-nolint
Reflect.has(target, propertyKey)
```

### Parameters

- `target`
  - : The target object in which to look for the property.
- `propertyKey`
  - : The name of the property to check.

### Return value

A `Boolean` indicating whether or not the `target` has the property.

### Exceptions

- `TypeError`
  - : Thrown if `target` is not an object.

## Description

`Reflect.has()` provides the reflective semantic of checking if a property is in an object. That is, `Reflect.has(target, propertyKey)` is semantically equivalent to:

```js
propertyKey in target;
```

`Reflect.has()` invokes the `[[HasProperty]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods) of `target`.

## Examples

### Using Reflect.has()

```js
Reflect.has({ x: 0 }, "x"); // true
Reflect.has({ x: 0 }, "y"); // false

// returns true for properties in the prototype chain
Reflect.has({ x: 0 }, "toString");

// Proxy with .has() handler method
obj = new Proxy(
  {},
  {
    has(t, k) {
      return k.startsWith("door");
    },
  },
);
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false
```

`Reflect.has` returns `true` for any inherited properties, like the [`in`](/en-US/docs/Web/JavaScript/Reference/Operators/in) operator:

```js
const a = { foo: 123 };
const b = { __proto__: a };
const c = { __proto__: b };
// The prototype chain is: c -> b -> a
Reflect.has(c, "foo"); // true
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Reflect.has` in `core-js`](https://github.com/zloirock/core-js#ecmascript-reflect)
- `Reflect`
- [`in`](/en-US/docs/Web/JavaScript/Reference/Operators/in)
- [`handler.has()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
