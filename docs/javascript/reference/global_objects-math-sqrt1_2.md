# Math.SQRT1_2

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2)

---

The **`Math.SQRT1_2`** static data property represents the square root of 1/2, which is approximately 0.707.



```js interactive-example
function getRoot1Over2() {
  return Math.SQRT1_2;
}

console.log(getRoot1Over2());
// Expected output: 0.7071067811865476
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝚂𝚀𝚁𝚃𝟷_𝟸</mi><mo>=</mo><msqrt><mfrac><mn>1</mn><mn>2</mn></mfrac></msqrt><mo>≈</mo><mn>0.707</mn></mrow><annotation encoding="TeX">\mathtt{Math.SQRT1_2} = \sqrt{\frac{1}{2}} \approx 0.707</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

`Math.SQRT1_2` is a constant and a more performant equivalent to [`Math.sqrt(0.5)`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt).

Because `SQRT1_2` is a static property of `Math`, you always use it as `Math.SQRT1_2`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.SQRT1_2

The following function calculates the side length of a square given its diagonal length:

```js
function getSquareSideLength(diagonalLength) {
  return diagonalLength * Math.SQRT1_2;
}
```

## Specifications



## Browser compatibility



## See also

- `Math.pow()`
- `Math.sqrt()`
