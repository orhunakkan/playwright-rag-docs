# Math.sin()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)

---

The **`Math.sin()`** static method returns the sine of a number in radians.



```js interactive-example
function getCircleY(radians, radius) {
  return Math.sin(radians) * radius;
}

console.log(getCircleY(1, 10));
// Expected output: 8.414709848078965

console.log(getCircleY(2, 10));
// Expected output: 9.092974268256818

console.log(getCircleY(Math.PI, 10));
// Expected output: 1.2246467991473533e-15
```

## Syntax

```js-nolint
Math.sin(x)
```

### Parameters

- `x`
  - : A number representing an angle in radians.

### Return value

The sine of `x`, between -1 and 1, inclusive. If `x` is `Infinity`, `-Infinity`, or `NaN`, returns `NaN`.

## Description

Because `sin()` is a static method of `Math`, you always use it as `Math.sin()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.sin()

```js
Math.sin(-Infinity); // NaN
Math.sin(-0); // -0
Math.sin(0); // 0
Math.sin(1); // 0.8414709848078965
Math.sin(Math.PI / 2); // 1
Math.sin(Infinity); // NaN
```

## Specifications



## Browser compatibility



## See also

- `Math.acos()`
- `Math.asin()`
- `Math.atan()`
- `Math.atan2()`
- `Math.cos()`
- `Math.tan()`
- CSS `sin()` function
