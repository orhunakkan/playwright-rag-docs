# SuppressedError: suppressed

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/suppressed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/suppressed)

---

The **`suppressed`** data property of a `SuppressedError` instance contains a reference to the original error that got suppressed because a new error was generated while handling it.

## Value

Any value. Like `cause`, you cannot assume it's an `Error` instance, although it usually is the case.



## Examples

### Using suppressed

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e.suppressed); // Error: "Original error"
}
```

## Specifications



## Browser compatibility



## See also

- [Control flow and error handling](/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) guide
- `SuppressedError`
- [`Error`: `cause`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
