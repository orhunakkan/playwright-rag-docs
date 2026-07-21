# Symbol.prototype.valueOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/valueOf)

---

The **`valueOf()`** method of `Symbol` values returns this symbol value.



```js interactive-example
const symbol = Symbol("foo");

console.log(typeof Object(symbol));
// Expected output: "object"

console.log(typeof Object(symbol).valueOf());
// Expected output: "symbol"
```

## Syntax

```js-nolint
valueOf()
```

### Parameters

None.

### Return value

The primitive value of the specified `Symbol` object.

## Description

The `valueOf()` method of `Symbol` returns the primitive value of a Symbol object as a Symbol data type.

JavaScript calls the `valueOf()` method to convert an object to a primitive value. You rarely need to invoke the `valueOf()` method yourself; JavaScript automatically invokes it when encountering an object where a primitive value is expected.

## Examples

### Using valueOf()

```js
const sym = Symbol("example");
sym === sym.valueOf(); // true
```

## Specifications



## Browser compatibility



## See also

- `Object.prototype.valueOf()`
