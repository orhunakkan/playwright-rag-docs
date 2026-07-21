# WeakMap.prototype.delete()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)

---

The **`delete()`** method of `WeakMap` instances removes the entry specified by the key from this `WeakMap`.



```js interactive-example
const weakmap = new WeakMap();
const object = {};

weakmap.set(object, 42);

console.log(weakmap.delete(object));
// Expected output: true

console.log(weakmap.has(object));
// Expected output: false
```

## Syntax

```js-nolint
weakMapInstance.delete(key)
```

### Parameters

- `key`
  - : The key of the entry to remove from the `WeakMap` object. Object keys are compared by [reference](/en-US/docs/Glossary/Object_reference), not by value.

### Return value

`true` if an entry in the `WeakMap` object has been removed successfully. `false` if the key is not found in the `WeakMap`. Always returns `false` if `key` is not an object or a [non-registered symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry).

## Examples

### Using delete()

```js
const wm = new WeakMap();
wm.set(window, "foo");

wm.delete(window); // Returns true. Successfully removed.

wm.has(window); // Returns false. The window object is no longer in the WeakMap.
```

## Specifications



## Browser compatibility



## See also

- `WeakMap`
- `WeakMap.prototype.get()`
- `WeakMap.prototype.set()`
- `WeakMap.prototype.has()`
