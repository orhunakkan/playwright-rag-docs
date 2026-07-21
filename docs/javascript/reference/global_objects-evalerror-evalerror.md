# EvalError() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError/EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError/EvalError)

---

The **`EvalError()`** constructor creates `EvalError` objects.

## Syntax

```js-nolint
new EvalError()
new EvalError(message)
new EvalError(message, options)
new EvalError(message, fileName)
new EvalError(message, fileName, lineNumber)

EvalError()
EvalError(message)
EvalError(message, options)
EvalError(message, fileName)
EvalError(message, fileName, lineNumber)
```

> [!NOTE]
> `EvalError()` can be called with or without [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Both create a new `EvalError` instance.

### Parameters

- `message` (optional)
  - : Human-readable description of the error.
- `options` (optional)
  - : An object that has the following properties:
    - `cause` (optional)
      - : A property indicating the specific cause of the error.
        When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.
- `fileName` (optional) **Non-standard.**
  - : The name of the file containing the code that caused the exception
- `lineNumber` (optional) **Non-standard.**
  - : The line number of the code that caused the exception

## Examples

`EvalError` is not used in the current ECMAScript specification and will
thus not be thrown by the runtime. However, the object itself remains for backwards
compatibility with earlier versions of the specification.

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
