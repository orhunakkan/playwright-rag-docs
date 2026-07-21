# Math.LN2

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2)

---

The **`Math.LN2`** static data property represents the natural logarithm of 2, approximately 0.693:



```js interactive-example
function getNatLog2() {
  return Math.LN2;
}

console.log(getNatLog2());
// Expected output: 0.6931471805599453
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙽𝟸</mi><mo>=</mo><mo lspace="0em" rspace="0em">ln</mo><mo stretchy="false">(</mo><mn>2</mn><mo stretchy="false">)</mo><mo>≈</mo><mn>0.693</mn></mrow><annotation encoding="TeX">\mathtt{Math.LN2} = \ln(2) \approx 0.693</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

Because `LN2` is a static property of `Math`, you always use it as `Math.LN2`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LN2

The following function returns the natural log of 2:

```js
function getNatLog2() {
  return Math.LN2;
}

getNatLog2(); // 0.6931471805599453
```

## Specifications



## Browser compatibility



## See also

- `Math.exp()`
- `Math.log()`
- `Math.log2()`
