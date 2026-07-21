# Math.SQRT2

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2)

---

The **`Math.SQRT2`** static data property represents the square root of 2, approximately 1.414.



```js interactive-example
function getRoot2() {
  return Math.SQRT2;
}

console.log(getRoot2());
// Expected output: 1.4142135623730951
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝚂𝚀𝚁𝚃𝟸</mi><mo>=</mo><msqrt><mn>2</mn></msqrt><mo>≈</mo><mn>1.414</mn></mrow><annotation encoding="TeX">\mathtt{Math.SQRT2} = \sqrt{2} \approx 1.414</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

`Math.SQRT2` is a constant and a more performant equivalent to [`Math.sqrt(2)`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt).

Because `SQRT2` is a static property of `Math`, you always use it as `Math.SQRT2`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.SQRT2

The following function returns the square root of 2:

```js
function getRoot2() {
  return Math.SQRT2;
}

getRoot2(); // 1.4142135623730951
```

## Specifications



## Browser compatibility



## See also

- `Math.pow()`
- `Math.sqrt()`
