# Map() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map)

---

The **`Map()`** constructor creates `Map` objects.

## Syntax

```js-nolint
new Map()
new Map(iterable)
```

> [!NOTE]
> `Map()` can only be constructed with [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `iterable` (optional)
  - : If an [iterable object](/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) (such as an array) is passed, all of its elements will be added to the new `Map`. Each element must be an object with two properties: `0` and `1`, which correspond to the key and value (for example, `[[1, "one"],[2, "two"]]`). If you don't specify this parameter, or its value is `null` or `undefined`, the new `Map` is empty.

## Examples

### Creating a new Map

```js
const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
```

## Specifications



## Browser compatibility



## See also

- [Polyfill for `Map` in `core-js`](https://github.com/zloirock/core-js#map)
- [es-shims polyfill of `Map`](https://www.npmjs.com/package/es-map)
- `Set`
- `WeakMap`
- `WeakSet`
