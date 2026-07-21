# Map.prototype.has()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

---

The **`has()`** method of `Map` instances returns a boolean indicating whether an entry with the specified key exists in this `Map` or not.



```js interactive-example
const map = new Map();
map.set("bar", "foo");

console.log(map.has("bar"));
// Expected output: true

console.log(map.has("baz"));
// Expected output: false
```

## Syntax

```js-nolint
has(key)
```

### Parameters

- `key`
  - : The key of the entry to test for presence in the `Map` object. Object keys are compared by [reference](/en-US/docs/Glossary/Object_reference), not by value.

### Return value

Returns `true` if an entry with the specified key exists in the `Map` object; otherwise `false`.

## Examples

### Using has()

```js
const myMap = new Map();
myMap.set("bar", "foo");

console.log(myMap.has("bar")); // true
console.log(myMap.has("baz")); // false
```

## Specifications



## Browser compatibility



## See also

- `Map`
- `Map.prototype.delete()`
- `Map.prototype.get()`
- `Map.prototype.set()`
