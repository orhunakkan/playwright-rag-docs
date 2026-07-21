# BigInt.prototype.valueOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/valueOf)

---

The **`valueOf()`** method of `BigInt` values returns the wrapped primitive value
of a `BigInt` object.



```js interactive-example
console.log(typeof Object(1n));
// Expected output: "object"

console.log(typeof Object(1n).valueOf());
// Expected output: "bigint"
```

## Syntax

```js-nolint
valueOf()
```

### Parameters

None.

### Return value

A BigInt representing the primitive value of the specified `BigInt` object.

## Examples

### Using `valueOf`

```js
typeof Object(1n); // object
typeof Object(1n).valueOf(); // bigint
```

## Specifications



## Browser compatibility



## See also

- `BigInt.prototype.toString()`
