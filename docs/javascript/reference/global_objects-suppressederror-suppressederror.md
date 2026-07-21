# SuppressedError() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/SuppressedError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/SuppressedError)

---

The **`SuppressedError()`** constructor creates `SuppressedError` objects.

## Syntax

```js-nolint
new SuppressedError(error, suppressed)
new SuppressedError(error, suppressed, message)

SuppressedError(error, suppressed)
SuppressedError(error, suppressed, message)
```

> [!NOTE]
> `SuppressedError()` can be called with or without [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Both create a new `SuppressedError` instance.

### Parameters

- `error`
  - : The new error that results in the suppression of `suppressed`.
- `suppressed`
  - : The error that was originally thrown and is now suppressed.
- `message` (optional)
  - : An optional human-readable description of the aggregate error.

> [!NOTE]
> `SuppressedError()` does not accept `options` like `Error()` and other subclasses do, because the semantics of `cause` overlaps with `suppressed`.

## Examples

### Creating a SuppressedError

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e.suppressed); // Error: "Original error"
  console.log(e.error); // Error: "New error"
}
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `SuppressedError` in `core-js`](https://github.com/zloirock/core-js#explicit-resource-management)
