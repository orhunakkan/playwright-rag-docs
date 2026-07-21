# Math.LOG2E

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E)

---

The **`Math.LOG2E`** static data property represents the base 2 logarithm of [e](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E), approximately 1.443.



```js interactive-example
function getLog2e() {
  return Math.LOG2E;
}

console.log(getLog2e());
// Expected output: 1.4426950408889634
```

## Value

<!-- prettier-ignore-start -->
<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙾𝙶𝟸𝙴</mi><mo>=</mo><msub><mo lspace="0em" rspace="0em">log</mo><mn>2</mn></msub><mo stretchy="false">(</mo><mi mathvariant="normal">e</mi><mo stretchy="false">)</mo><mo>≈</mo><mn>1.443</mn></mrow><annotation encoding="TeX">\mathtt{Math.LOG2E} = \log_2(\mathrm{e}) \approx 1.443</annotation></semantics>
</math>
<!-- prettier-ignore-end -->



## Description

Because `LOG2E` is a static property of `Math`, you always use it as `Math.LOG2E`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LOG2E

The following function returns the base 2 logarithm of e:

```js
function getLog2e() {
  return Math.LOG2E;
}

getLog2e(); // 1.4426950408889634
```

## Specifications



## Browser compatibility



## See also

- `Math.exp()`
- `Math.log()`
- `Math.log2()`
