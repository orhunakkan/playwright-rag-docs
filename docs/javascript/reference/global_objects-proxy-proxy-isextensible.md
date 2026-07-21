# handler.isExtensible()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)

---

The **`handler.isExtensible()`** method is a trap for the `[[IsExtensible]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods), which is used by operations such as `Object.isExtensible()`.



```js interactive-example
const monster = {
  canEvolve: true,
};

const handler = {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
  preventExtensions(target) {
    target.canEvolve = false;
    return Reflect.preventExtensions(target);
  },
};

const proxy = new Proxy(monster, handler);

console.log(Object.isExtensible(proxy));
// Expected output: true

console.log(monster.canEvolve);
// Expected output: true

Object.preventExtensions(proxy);

console.log(Object.isExtensible(proxy));
// Expected output: false

console.log(monster.canEvolve);
// Expected output: false
```

## Syntax

```js-nolint
new Proxy(target, {
  isExtensible(target) {
  }
})
```

### Parameters

The following parameter is passed to the `isExtensible()` method. `this` is bound to the handler.

- `target`
  - : The target object.

### Return value

The `isExtensible()` method must return a `Boolean` indicating whether or not the target object is extensible. Other values are [coerced to booleans](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion).

## Description

### Interceptions

This trap can intercept these operations:

- `Object.isExtensible()`
- `Reflect.isExtensible()`

Or any other operation that invokes the `[[IsExtensible]]` [internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods).

### Invariants

The proxy's `[[IsExtensible]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The result must be the same as `Reflect.isExtensible()` on the target object.

## Examples

### Trapping of isExtensible

The following code traps `Object.isExtensible()`.

```js
const p = new Proxy(
  {},
  {
    isExtensible(target) {
      console.log("called");
      return true;
    },
  },
);

console.log(Object.isExtensible(p));
// "called"
// true
```

The following code violates the invariant.

```js example-bad
const p = new Proxy(
  {},
  {
    isExtensible(target) {
      return false;
    },
  },
);

Object.isExtensible(p); // TypeError is thrown
```

## Specifications



## Browser compatibility



## See also

- `Proxy`
- [`Proxy()` constructor](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)
- `Object.isExtensible()`
- `Reflect.isExtensible()`
- `Reflect.preventExtensions()`
