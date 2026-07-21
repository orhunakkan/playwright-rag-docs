# AsyncDisposableStack.prototype.disposed

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/disposed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/disposed)

---

The **`disposed`** accessor property of `AsyncDisposableStack` instances returns a boolean indicating whether or not this `AsyncDisposableStack` has been disposed or moved by doing any of the following:

- Calling its `disposeAsync()` method
- Calling its `move()` method
- Declaring it with `await using` and letting the variable go out of scope, which automatically calls the [`[Symbol.asyncDispose]()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/Symbol.asyncDispose) method.

## Examples

### Checking if a stack is disposed

```js
const disposer = new AsyncDisposableStack();
console.log(disposer.disposed); // false
await disposer.disposeAsync();
console.log(disposer.disposed); // true
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
