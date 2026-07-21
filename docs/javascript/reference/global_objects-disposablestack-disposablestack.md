# DisposableStack() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/DisposableStack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/DisposableStack)

---

The **`DisposableStack()`** constructor creates `DisposableStack` objects.

## Syntax

```js-nolint
new DisposableStack()
```

> [!NOTE]
> `DisposableStack()` can only be constructed with [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Attempting to call it without `new` throws a `TypeError`.

### Parameters

None.

### Return value

A new `DisposableStack` object.

## Examples

### Creating a DisposableStack

```js
const disposer = new DisposableStack();
disposer.defer(() => console.log("Disposed!"));
disposer.dispose();
// Logs: Disposed!
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
