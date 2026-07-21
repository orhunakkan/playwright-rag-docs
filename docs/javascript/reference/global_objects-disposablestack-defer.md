# DisposableStack.prototype.defer()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/defer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/defer)

---

The **`defer()`** method of `DisposableStack` instances takes a callback function to be called when the stack is disposed.

## Syntax

```js-nolint
defer(onDispose)
```

### Parameters

- `onDispose`
  - : A function that will be called when the stack is disposed. The function receives no arguments.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
  - : Thrown if `onDispose` is not a function.
- `ReferenceError`
  - : Thrown if the stack is already disposed.

## Description

The primary purpose of `defer()` is to register a cleanup callback that's not specific to the disposal of a particular resource. If the callback is specific to a resource, you should use `use()` or `adopt()` instead. You can also use `defer` when the resource is not claimed within your code:

```js
function consumeReader(reader) {
  using disposer = new DisposableStack();
  disposer.defer(() => reader.releaseLock());
  // Do something with reader
}
```

## Examples

### Using defer()

This function sets a simple lock to prevent multiple async operations from running at the same time. The lock is released when the function completes.

```js
let isLocked = false;

async function requestWithLock(url, options) {
  if (isLocked) {
    return undefined;
  }
  using disposer = new DisposableStack();
  isLocked = true;
  disposer.defer(() => (isLocked = false));
  const data = await fetch(url, options).then((res) => res.json());
  return data;
}
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
- `DisposableStack`
- `DisposableStack.prototype.adopt()`
- `DisposableStack.prototype.use()`
