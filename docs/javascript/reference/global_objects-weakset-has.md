# WeakSet.prototype.has()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has)

---

The **`has()`** method of `WeakSet` instances returns a boolean indicating whether the specified value exists in this `WeakSet` or not.



```js interactive-example
const weakset = new WeakSet();
const object1 = {};
const object2 = {};

weakset.add(object1);

console.log(weakset.has(object1));
// Expected output: true

console.log(weakset.has(object2));
// Expected output: false
```

## Syntax

```js-nolint
has(value)
```

### Parameters

- `value`
  - : The value to test for presence in the `WeakSet` object. Objects are compared by [reference](/en-US/docs/Glossary/Object_reference), not by value.

### Return value

Returns `true` if the specified value exists in the `WeakSet` object; otherwise `false`. Always returns `false` if `value` is not an object or a [non-registered symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry).

## Examples

### Using has()

```js
const ws = new WeakSet();
const obj = {};
ws.add(window);

ws.has(window); // returns true
ws.has(obj); // returns false

// Storing a non-registered symbol
const sym = Symbol("foo");
ws.add(sym);
ws.add(Symbol.iterator);
```

## Specifications



## Browser compatibility



## See also

- `WeakSet`
- `WeakSet.prototype.add()`
- `WeakSet.prototype.delete()`
