# Map.prototype.keys()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)

---

The **`keys()`** method of `Map` instances returns a new _[map iterator](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)_ object that contains the keys for each element in this map in insertion order.



```js interactive-example
const map = new Map();

map.set("0", "foo");
map.set(1, "bar");

const iterator = map.keys();

console.log(iterator.next().value);
// Expected output: "0"

console.log(iterator.next().value);
// Expected output: 1
```

## Syntax

```js-nolint
keys()
```

### Parameters

None.

### Return value

A new [iterable iterator object](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator).

## Examples

### Using keys()

```js
const myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

const mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // {}
```

## Specifications



## Browser compatibility



## See also

- `Map.prototype.entries()`
- `Map.prototype.values()`
