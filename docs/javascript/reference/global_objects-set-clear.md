# Set.prototype.clear()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)

---

The **`clear()`** method of `Set` instances removes all elements from this set.



```js interactive-example
const set = new Set();
set.add(1);
set.add("foo");

console.log(set.size);
// Expected output: 2

set.clear();

console.log(set.size);
// Expected output: 0
```

## Syntax

```js-nolint
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using the clear() method

```js
const mySet = new Set();
mySet.add(1);
mySet.add("foo");

console.log(mySet.size); // 2
console.log(mySet.has("foo")); // true

mySet.clear();

console.log(mySet.size); // 0
console.log(mySet.has("foo")); // false
```

## Specifications



## Browser compatibility



## See also

- `Set`
- `Set.prototype.delete()`
