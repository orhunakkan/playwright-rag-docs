# AggregateError() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/AggregateError)

---

The **`AggregateError()`** constructor creates `AggregateError` objects.

## Syntax

```js-nolint
new AggregateError(errors)
new AggregateError(errors, message)
new AggregateError(errors, message, options)

AggregateError(errors)
AggregateError(errors, message)
AggregateError(errors, message, options)
```

> [!NOTE]
> `AggregateError()` can be called with or without [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Both create a new `AggregateError` instance.

### Parameters

- `errors`
  - : An iterable of errors, may not actually be `Error` instances.
- `message` (optional)
  - : An optional human-readable description of the aggregate error.
- `options` (optional)
  - : An object that has the following properties:
    - `cause` (optional)
      - : A property indicating the specific cause of the error.
        When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.

## Examples

### Creating an AggregateError

```js
try {
  throw new AggregateError([new Error("some error")], "Hello");
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "AggregateError"
  console.log(e.errors); // [ Error: "some error" ]
}
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `AggregateError` in `core-js`](https://github.com/zloirock/core-js#ecmascript-error)
- [es-shims polyfill of `AggregateError`](https://www.npmjs.com/package/es-aggregate-error)
- `Promise.any`
