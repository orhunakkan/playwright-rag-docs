# Set.prototype.keys()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys)

---

The **`keys()`** method of `Set` instances is an alias for the [`values()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) method.

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

The `keys()` method is exactly equivalent to the `values()` method.

```js
const mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

const setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

## Specifications



## Browser compatibility



## See also

- `Set.prototype.entries()`
- `Set.prototype.values()`
