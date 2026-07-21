# Number.isNaN()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

---

The **`Number.isNaN()`** static method determines whether the passed value is the number value `NaN`, and returns `false` if the input is not of the Number type. It is a more robust version of the original, global `isNaN()` function.



```js interactive-example
function typeOfNaN(x) {
  if (Number.isNaN(x)) {
    return "Number NaN";
  }
  if (isNaN(x)) {
    return "NaN";
  }
}

console.log(typeOfNaN("100F"));
// Expected output: "NaN"

console.log(typeOfNaN(NaN));
// Expected output: "Number NaN"
```

## Syntax

```js-nolint
Number.isNaN(value)
```

### Parameters

- `value`
  - : The value to be tested for `NaN`.

### Return value

The boolean value `true` if the given value is a number with value `NaN`. Otherwise, `false`.

## Description

The function `Number.isNaN()` provides a convenient way to check for equality with `NaN`. Note that you cannot test for equality with `NaN` using either the [`==`](/en-US/docs/Web/JavaScript/Reference/Operators/Equality) or [`===`](/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) operators, because unlike all other value comparisons in JavaScript, these evaluate to `false` whenever one operand is `NaN`, even if the other operand is also `NaN`.

Since `x !== x` is only true for `NaN` among all possible JavaScript values, `Number.isNaN(x)` can also be replaced with a test for `x !== x`, despite the latter being less readable.

As opposed to the global `isNaN()` function, the `Number.isNaN()` method doesn't force-convert the parameter to a number. This makes it safe to pass values that would normally convert to `NaN` but aren't actually the same value as `NaN`. This also means that only values of the Number type that are also `NaN` return `true`.

## Examples

### Using isNaN()

```js
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true
Number.isNaN(37); // false
```

### Difference between Number.isNaN() and global isNaN()

`Number.isNaN()` doesn't attempt to convert the parameter to a number, so non-numbers always return `false`. The following are all `false`:

```js
Number.isNaN("NaN");
Number.isNaN(undefined);
Number.isNaN({});
Number.isNaN("blabla");
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

The global `isNaN()` coerces its parameter to a number:

```js
isNaN("NaN"); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN("blabla"); // true
isNaN(true); // false, this is coerced to 1
isNaN(null); // false, this is coerced to 0
isNaN("37"); // false, this is coerced to 37
isNaN("37.37"); // false, this is coerced to 37.37
isNaN(""); // false, this is coerced to 0
isNaN(" "); // false, this is coerced to 0
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Number.isNaN` in `core-js`](https://github.com/zloirock/core-js#ecmascript-number)
- [es-shims polyfill of `Number.isNaN`](https://www.npmjs.com/package/number.isnan)
- `Number`
- `isNaN()`
