# SuppressedError: error

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/error)

---

The **`error`** data property of a `SuppressedError` instance contains a reference to the error that results in the suppression.

## Value

Any value. Like `cause`, you cannot assume it's an `Error` instance, although it usually is the case.



## Examples

### Using error

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e.error); // Error: "New error"
}
```

## Specifications



## Browser compatibility



## See also

- [Control flow and error handling](/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) guide
- `SuppressedError`
- [`Error`: `cause`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
