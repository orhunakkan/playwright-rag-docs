# Reflect.isExtensible()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)

---

The **`Reflect.isExtensible()`** static method is like `Object.isExtensible()`. It determines if an object is extensible (whether it can have new properties added to it).



```js interactive-example
const object1 = {};

console.log(Reflect.isExtensible(object1));
// Expected output: true

Reflect.preventExtensions(object1);

console.log(Reflect.isExtensible(object1));
// Expected output: false

const object2 = Object.seal({});

console.log(Reflect.isExtensible(object2));
// Expected output: false
```

## Syntax

```js-nolint
Reflect.isExtensible(target)
```

### Parameters

- `target`
  - : The target object which to check if it is extensible.

### Return value

A `Boolean` indicating whether or not the target is extensible.

### Exceptions

- `TypeError`
  - : Thrown if `target` is not an object.

## Description

`Reflect.isExtensible()` provides the reflective semantic of checking if an object is extensible. The only difference with `Object.isExtensible()` is how non-object targets are handled. `Reflect.isExtensible()` throws a `TypeError` if the target is not an object, while `Object.isExtensible()` always returns `false` for non-object targets.

`Reflect.isExtensible()` invokes the `[[IsExtensible]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods) of `target`.

## Examples

### Using Reflect.isExtensible()

See also `Object.isExtensible()`.

```js
// New objects are extensible.
const empty = {};
Reflect.isExtensible(empty); // true

// … but that can be changed.
Reflect.preventExtensions(empty);
Reflect.isExtensible(empty); // false

// Sealed objects are by definition non-extensible.
const sealed = Object.seal({});
Reflect.isExtensible(sealed); // false

// Frozen objects are also by definition non-extensible.
const frozen = Object.freeze({});
Reflect.isExtensible(frozen); // false
```

### Difference with Object.isExtensible()

If the `target` argument to this method is not an object (a primitive), then it will cause a `TypeError`. With `Object.isExtensible()`, a non-object `target` will return false without any errors.

```js
Reflect.isExtensible(1);
// TypeError: 1 is not an object

Object.isExtensible(1);
// false
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Reflect.isExtensible` in `core-js`](https://github.com/zloirock/core-js#ecmascript-reflect)
- `Reflect`
- `Object.isExtensible()`
- [`handler.isExtensible()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)
