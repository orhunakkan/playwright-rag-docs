# Math.LN10

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10)

---

The **`Math.LN10`** static data property represents the natural logarithm of 10, approximately 2.303.



```js interactive-example
function getNatLog10() {
  return Math.LN10;
}

console.log(getNatLog10());
// Expected output: 2.302585092994046
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙽𝟷𝟶</mi><mo>=</mo><mo lspace="0em" rspace="0em">ln</mo><mo stretchy="false">(</mo><mn>10</mn><mo stretchy="false">)</mo><mo>≈</mo><mn>2.303</mn></mrow><annotation encoding="TeX">\mathtt{Math.LN10} = \ln(10) \approx 2.303</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

Because `LN10` is a static property of `Math`, you always use it as `Math.LN10`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LN10

The following function returns the natural log of 10:

```js
function getNatLog10() {
  return Math.LN10;
}

getNatLog10(); // 2.302585092994046
```

## Specifications



## Browser compatibility



## See also

- `Math.exp()`
- `Math.log()`
- `Math.log10()`
