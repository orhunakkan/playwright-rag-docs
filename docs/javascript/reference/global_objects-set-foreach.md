# Set.prototype.forEach()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)

---

The **`forEach()`** method of `Set` instances executes a provided function once
for each value in this set, in insertion order.



```js interactive-example
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}

new Set(["foo", "bar", undefined]).forEach(logSetElements);

// Expected output: "s[foo] = foo"
// Expected output: "s[bar] = bar"
// Expected output: "s[undefined] = undefined"
```

## Syntax

```js-nolint
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callback`
  - : A function to execute for each entry in the set. The function is called with the following arguments:
    - `value`
      - : Value of each iteration.
    - `key`
      - : Key of each iteration. This is always the same as `value`.
    - `set`
      - : The set being iterated.
- `thisArg` (optional)
  - : A value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Description

The `forEach()` method executes the provided
`callback` once for each value which actually exists in the
`Set` object. It is not invoked for values which have been deleted. However,
it is executed for values which are present but have the value `undefined`.

`callback` is invoked with **three arguments**:

- the **element value**
- the **element key**
- the **`Set` object being traversed**

There are no keys in `Set` objects, however, so the first two arguments are
both **values** contained in the `Set`. This is to make it
consistent with other `forEach()` methods for `Map` and `Array`.

If a `thisArg` parameter is provided to `forEach()`,
it will be passed to `callback` when invoked, for use as its
`this` value. Otherwise, the value `undefined` will be passed for
use as its `this` value. The `this` value ultimately observable by
`callback` is determined according to
[the usual rules for determining the `this` seen by a function](/en-US/docs/Web/JavaScript/Reference/Operators/this).

Each value is visited once, except in the case when it was deleted and re-added before
`forEach()` has finished. `callback` is not invoked for
values deleted before being visited. New values added before `forEach()` has
finished will be visited.

`forEach()` executes the `callback` function once for
each element in the `Set` object; it does not return a value.

## Examples

### Logging the contents of a Set object

The following code logs a line for each element in a `Set` object:

```js
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}

new Set(["foo", "bar", undefined]).forEach(logSetElements);

// Logs:
// "s[foo] = foo"
// "s[bar] = bar"
// "s[undefined] = undefined"
```

## Specifications



## Browser compatibility



## See also

- `Array.prototype.forEach()`
- `Map.prototype.forEach()`
