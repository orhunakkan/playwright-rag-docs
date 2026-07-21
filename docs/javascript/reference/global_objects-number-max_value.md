# Number.MAX_VALUE

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)

---

The **`Number.MAX_VALUE`** static data property represents the maximum numeric value representable in JavaScript.



```js interactive-example
function multiply(x, y) {
  if (x * y > Number.MAX_VALUE) {
    return "Process as Infinity";
  }
  return x * y;
}

console.log(multiply(1.7976931348623157e308, 1));
// Expected output: 1.7976931348623157e+308

console.log(multiply(1.7976931348623157e308, 2));
// Expected output: "Process as Infinity"
```

## Value

2<sup>1024</sup> - 2<sup>971</sup>, or approximately `1.7976931348623157E+308`.



## Description

Values larger than `MAX_VALUE` are represented as `Infinity` and will lose their actual value. As mentioned in `Number.EPSILON`, the precision of numbers depends on their magnitude. Integers can only be represented precisely up to `Number.MAX_SAFE_INTEGER`, which is 2<sup>53</sup> - 1.

Because `MAX_VALUE` is a static property of `Number`, you always use it as `Number.MAX_VALUE`, rather than as a property of a number value.

## Examples

### Using MAX_VALUE

The following code multiplies two numeric values. If the result is less than or equal to `MAX_VALUE`, the `func1` function is called; otherwise, the `func2` function is called.

```js
if (num1 * num2 <= Number.MAX_VALUE) {
  func1();
} else {
  func2();
}
```

## Specifications



## Browser compatibility



## See also

- `Number.MIN_VALUE`
- `Number.MAX_SAFE_INTEGER`
- `Number`
