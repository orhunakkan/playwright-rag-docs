# AsyncDisposableStack() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/AsyncDisposableStack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/AsyncDisposableStack)

---

The **`AsyncDisposableStack()`** constructor creates `AsyncDisposableStack` objects.

## Syntax

```js-nolint
new AsyncDisposableStack()
```

> [!NOTE]
> `AsyncDisposableStack()` can only be constructed with [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Attempting to call it without `new` throws a `TypeError`.

### Parameters

None.

### Return value

A new `AsyncDisposableStack` object.

## Examples

### Creating an AsyncDisposableStack

```js
const disposer = new AsyncDisposableStack();
disposer.defer(() => console.log("Disposed!"));
await disposer.disposeAsync();
// Logs: Disposed!
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
