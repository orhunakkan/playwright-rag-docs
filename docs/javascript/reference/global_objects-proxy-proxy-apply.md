# handler.apply()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)

---

The **`handler.apply()`** method is a trap for the `[[Call]]` [object internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods), which is used by operations such as function calls.



```js interactive-example
function sum(a, b) {
  return a + b;
}

const handler = {
  apply(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // Expected output: "Calculate sum: 1,2"

    return target(argumentsList[0], argumentsList[1]) * 10;
  },
};

const proxy = new Proxy(sum, handler);

console.log(sum(1, 2));
// Expected output: 3
console.log(proxy(1, 2));
// Expected output: 30
```

## Syntax

```js-nolint
new Proxy(target, {
  apply(target, thisArg, argumentsList) {
  }
})
```

### Parameters

The following parameters are passed to the `apply()` method. `this` is bound to the handler.

- `target`
  - : The target callable object.
- `thisArg`
  - : The `this` argument for the call.
- `argumentsList`
  - : An `Array` containing the arguments passed to the function.

### Return value

The `apply()` method can return any value, representing the return value of the function call.

## Description

### Interceptions

This trap can intercept these operations:

- Function call: `proxy(...args)`
- `Function.prototype.apply()` and `Function.prototype.call()`
- `Reflect.apply()`

Or any other operation that invokes the `[[Call]]` [internal method](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#object_internal_methods).

### Invariants

The proxy's `[[Call]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The `target` must be a callable itself. That is, it must be a function object.

## Examples

### Trapping a function call

The following code traps a function call.

```js
const p = new Proxy(function () {}, {
  apply(target, thisArg, argumentsList) {
    console.log(`called: ${argumentsList}`);
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  },
});

console.log(p(1, 2, 3)); // "called: 1,2,3"
// 6
```

## Specifications



## Browser compatibility



## See also

- `Proxy`
- [`Proxy()` constructor](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)
- `Function.prototype.apply()`
- `Function.prototype.call()`
- `Reflect.apply()`
