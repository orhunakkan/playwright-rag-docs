# handler.preventExtensions()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions)

---

The **`handler.preventExtensions()`** method is a trap for the `[[PreventExtensions]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods), which is used by operations such as `Object.preventExtensions()`.



```js interactive-example
const monster = {
  canEvolve: true,
};

const handler = {
  preventExtensions(target) {
    target.canEvolve = false;
    Object.preventExtensions(target);
    return true;
  },
};

const proxy = new Proxy(monster, handler);

console.log(monster.canEvolve);
// Expected output: true

Object.preventExtensions(proxy);

console.log(monster.canEvolve);
// Expected output: false
```

## Syntax

```js-nolint
new Proxy(target, {
  preventExtensions(target) {
  }
})
```

### Parameters

The following parameter is passed to the `preventExtensions()` method. `this` is bound to the handler.

- `target`
  - : The target object.

### Return value

The `preventExtensions()` method must return a `Boolean` indicating whether or not the operation was successful. Other values are [coerced to booleans](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion).

Many operations, including `Object.preventExtensions()`, throw a `TypeError` if the `[[PreventExtensions]]` internal method returns `false`.

## Description

### Interceptions

This trap can intercept these operations:

- `Object.preventExtensions()`
- `Reflect.preventExtensions()`
- `Object.seal()`
- `Object.freeze()`

Or any other operation that invokes the `[[PreventExtensions]]` [internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods).

### Invariants

The proxy's `[[PreventExtensions]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The result is only `true` if `Reflect.isExtensible()` on the target object returns `false` after calling `handler.preventExtensions()`.

## Examples

### Trapping of preventExtensions

The following code traps `Object.preventExtensions()`.

```js
const p = new Proxy(
  {},
  {
    preventExtensions(target) {
      console.log("called");
      Object.preventExtensions(target);
      return true;
    },
  },
);

console.log(Object.preventExtensions(p));
// "called"
// false
```

The following code violates the invariant.

```js example-bad
const p = new Proxy(
  {},
  {
    preventExtensions(target) {
      return true;
    },
  },
);

Object.preventExtensions(p); // TypeError is thrown
```

## Specifications



## Browser compatibility



## See also

- `Proxy`
- [`Proxy()` constructor](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)
- `Object.preventExtensions()`
- `Reflect.preventExtensions()`
