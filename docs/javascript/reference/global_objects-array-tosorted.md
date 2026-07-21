# Array.prototype.toSorted()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

---

The **`toSorted()`** method of `Array` instances is the [copying](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods) version of the `sort()` method. It returns a new array with the elements sorted in ascending order.

## Syntax

```js-nolint
toSorted()
toSorted(compareFn)
```

### Parameters

- `compareFn` (optional)
  - : A function that determines the order of the elements. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. See `sort()` for more information.

### Return value

A new array with the elements sorted in ascending order.

## Description

See `sort()` for more information on the `compareFn` parameter.

When used on [sparse arrays](/en-US/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays), the `toSorted()` method iterates empty slots as if they have the value `undefined`.

The `toSorted()` method is [generic](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#generic_array_methods). It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Sorting an array

```js
const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

For more usage examples, see `sort()`.

### Using toSorted() on sparse arrays

Empty slots are sorted as if they have the value `undefined`. They are always sorted to the end of the array and `compareFn` is not called for them.

```js
console.log(["a", "c", , "b"].toSorted()); // ['a', 'b', 'c', undefined]
console.log([, undefined, "a", "b"].toSorted()); // ["a", "b", undefined, undefined]
```

### Calling toSorted() on non-array objects

The `toSorted()` method reads the `length` property of `this`. It then collects all existing integer-keyed properties in the range of `0` to `length - 1`, sorts them, and writes them into a new array.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
  3: 3, // ignored by toSorted() since length is 3
};
console.log(Array.prototype.toSorted.call(arrayLike));
// [4, 5, undefined]
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Array.prototype.toSorted` in `core-js`](https://github.com/zloirock/core-js#change-array-by-copy)
- [es-shims polyfill of `Array.prototype.toSorted`](https://www.npmjs.com/package/array.prototype.tosorted)
- [Indexed collections](/en-US/docs/Web/JavaScript/Guide/Indexed_collections) guide
- `Array.prototype.sort()`
- `Array.prototype.toReversed()`
- `Array.prototype.toSpliced()`
- `Array.prototype.with()`
- `TypedArray.prototype.toSorted()`
