# AsyncDisposableStack.prototype[Symbol.asyncDispose]()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/Symbol.asyncDispose](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/Symbol.asyncDispose)

---

The **`[Symbol.asyncDispose]()`** method of `AsyncDisposableStack` instances implements the _async disposable protocol_ and allows it to be disposed when used with `await using`. It is an alias for the `disposeAsync()` method.

## Syntax

```js-nolint
asyncDisposableStack[Symbol.asyncDispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring a stack with `await using`

The `Symbol.asyncDispose` method is intended to be automatically called in an `await using` declaration.

```js
async function doSomething() {
  await using disposer = new AsyncDisposableStack();
  const resource = disposer.use(new Resource());
  resource.doSomething();
  // disposer is disposed here immediately before the function exits
  // which causes the resource to be disposed
}
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.disposeAsync()`
