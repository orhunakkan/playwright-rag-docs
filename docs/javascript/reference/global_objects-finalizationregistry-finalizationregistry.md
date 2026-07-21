# FinalizationRegistry() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry/FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry/FinalizationRegistry)

---

The **`FinalizationRegistry()`** constructor creates `FinalizationRegistry` objects.

## Syntax

```js-nolint
new FinalizationRegistry(callbackFn)
```

> [!NOTE]
> `FinalizationRegistry()` can only be constructed with [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `callback`
  - : A function to be invoked each time a registered target value is garbage collected. Its return value is ignored. The function is called with the following arguments:
    - `heldValue`
      - : The value that was passed to the second parameter of the `register()` method when the `target` object was registered.

## Examples

### Creating a new registry

You create the registry passing in the callback:

```js
const registry = new FinalizationRegistry((heldValue) => {
  // …
});
```

## Specifications



## Browser compatibility



## See also

- `FinalizationRegistry`
