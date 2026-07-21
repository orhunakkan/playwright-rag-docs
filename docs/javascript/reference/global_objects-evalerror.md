# EvalError

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)

---

The **`EvalError`** object indicates an error regarding the global `eval()` function. This exception is not thrown by JavaScript anymore, however the `EvalError` object remains for compatibility.

`EvalError` is a `serializable object`, so it can be cloned with `structuredClone()` or copied between [Workers](/en-US/docs/Web/API/Worker) using `postMessage()`.

`EvalError` is a subclass of `Error`.

## Constructor

- `EvalError()`
  - : Creates a new `EvalError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `EvalError.prototype` and shared by all `EvalError` instances.

- `EvalError.prototype.constructor`
  - : The constructor function that created the instance object. For `EvalError` instances, the initial value is the `EvalError` constructor.
- `EvalError.prototype.name`
  - : Represents the name for the type of error. For `EvalError.prototype.name`, the initial value is `"EvalError"`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Creating an EvalError

```js
try {
  throw new EvalError("Hello");
} catch (e) {
  console.log(e instanceof EvalError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "EvalError"
  console.log(e.stack); // Stack of the error
}
```

## Specifications



## Browser compatibility



## See also

- `Error`
- `eval()`
