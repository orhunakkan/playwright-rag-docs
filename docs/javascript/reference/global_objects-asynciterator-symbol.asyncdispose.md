# AsyncIterator.prototype[Symbol.asyncDispose]()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/Symbol.asyncDispose](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/Symbol.asyncDispose)

---

The **`[Symbol.asyncDispose]()`** method of `AsyncIterator` instances implements the _async disposable protocol_ and allows it to be disposed when used with `await using`. It calls and awaits the `return()` method of `this`, if it exists.

## Syntax

```js-nolint
asyncIterator[Symbol.asyncDispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring an async iterator with `await using`

The `Symbol.asyncDispose` method is intended to be automatically called in an `await using` declaration. This is useful if you have an async iterator that you manually iterate over by calling its `next()` method; if you iterate it with `for await...of` or something similar, then error handling and cleanup is done automatically.

```js
async function* generateNumbers() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("Cleaning up");
  }
}

async function doSomething() {
  await using numbers = generateNumbers();
  const res1 = await numbers.next();
  // Not iterating the rest of the numbers
  // Before the function exits, the async iterator is disposed
  // Logs "Cleaning up"
}

doSomething();
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `AsyncIterator.prototype[Symbol.asyncDispose]` in `core-js`](https://github.com/zloirock/core-js#explicit-resource-management)
- [JavaScript resource management](/en-US/docs/Web/JavaScript/Guide/Resource_management)
- `Symbol.asyncDispose`
- `await using`
