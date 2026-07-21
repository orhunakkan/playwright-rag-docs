# Math.LOG10E

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E)

---

The **`Math.LOG10E`** static data property represents the base 10 logarithm of [e](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E), approximately 0.434.



```js interactive-example
function getLog10e() {
  return Math.LOG10E;
}

console.log(getLog10e());
// Expected output: 0.4342944819032518
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙾𝙶𝟷𝟶𝙴</mi><mo>=</mo><msub><mo lspace="0em" rspace="0em">log</mo><mn>10</mn></msub><mo stretchy="false">(</mo><mi mathvariant="normal">e</mi><mo stretchy="false">)</mo><mo>≈</mo><mn>0.434</mn></mrow><annotation encoding="TeX">\mathtt{Math.LOG10E} = \log_{10}(\mathrm{e}) \approx 0.434</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

Because `LOG10E` is a static property of `Math`, you always use it as `Math.LOG10E`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LOG10E

The following function returns the base 10 logarithm of e:

```js
function getLog10e() {
  return Math.LOG10E;
}

getLog10e(); // 0.4342944819032518
```

## Specifications



## Browser compatibility



## See also

- `Math.exp()`
- `Math.log()`
- `Math.log10()`
