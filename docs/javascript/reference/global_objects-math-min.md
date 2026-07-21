# Math.min()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)

---

The **`Math.min()`** static method returns the smallest of the numbers given as input parameters, or `Infinity` if there are no parameters.



```js interactive-example
console.log(Math.min(2, 3, 1));
// Expected output: 1

console.log(Math.min(-2, -3, -1));
// Expected output: -3

const array = [2, 3, 1];

console.log(Math.min(...array));
// Expected output: 1
```

## Syntax

```js-nolint
Math.min()
Math.min(value1)
Math.min(value1, value2)
Math.min(value1, value2, /* …, */ valueN)
```

### Parameters

- `value1`, …, `valueN`
  - : Zero or more numbers among which the lowest value will be selected and returned.

### Return value

The smallest of the given numbers. Returns `NaN` if any of the parameters is or is converted into `NaN`. Returns `Infinity` if no parameters are provided.

## Description

Because `min()` is a static method of `Math`, you always use it as `Math.min()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

[`Math.min.length`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length) is 2, which weakly signals that it's designed to handle at least two parameters.

## Examples

### Using Math.min()

This finds the min of `x` and `y` and assigns it to `z`:

```js
const x = 10;
const y = -20;
const z = Math.min(x, y); // -20
```

### Clipping a value with Math.min()

`Math.min()` is often used to clip a value so that it is always less than or
equal to a boundary. For instance, this

```js
let x = f(foo);

if (x > boundary) {
  x = boundary;
}
```

may be written as this

```js
const x = Math.min(f(foo), boundary);
```

`Math.max()` can be used in a similar way to clip a value at the other end.

## Specifications



## Browser compatibility



## See also

- `Math.max()`
