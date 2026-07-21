# DisposableStack.prototype[Symbol.dispose]()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/Symbol.dispose](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/Symbol.dispose)

---

The **`[Symbol.dispose]()`** method of `DisposableStack` instances implements the _disposable protocol_ and allows it to be disposed when used with `using` or `await using`. It is an alias for the `dispose()` method.

## Syntax

```js-nolint
disposableStack[Symbol.dispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring a stack with `using`

The `Symbol.dispose` method is intended to be automatically called in a `using` declaration.

```js
{
  using disposer = new DisposableStack();
  const resource = disposer.use(new Resource());
  resource.doSomething();
  // stack is disposed here immediately before the function exits
  // which causes the resource to be disposed
}
```

## Specifications



## Browser compatibility



## See also

- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
- `DisposableStack`
- `DisposableStack.prototype.dispose()`
