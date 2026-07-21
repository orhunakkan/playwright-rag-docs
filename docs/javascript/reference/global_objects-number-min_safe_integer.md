# Number.MIN_SAFE_INTEGER

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER)

---

The **`Number.MIN_SAFE_INTEGER`** static data property represents the minimum safe integer in JavaScript, or -(2<sup>53</sup> - 1).

To represent integers smaller than this, consider using `BigInt`.



```js interactive-example
const x = Number.MIN_SAFE_INTEGER - 1;
const y = Number.MIN_SAFE_INTEGER - 2;

console.log(Number.MIN_SAFE_INTEGER);
// Expected output: -9007199254740991

console.log(x);
// Expected output: -9007199254740992

console.log(x === y);
// Expected output: true
```

## Value

`-9007199254740991` (-9,007,199,254,740,991, or about -9 quadrillion).



## Description

[Double precision floating point format](https://en.wikipedia.org/wiki/Double_precision_floating-point_format) only has 52 bits to represent the [mantissa](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_encoding), so it can only safely represent integers between -(2<sup>53</sup> – 1) and 2<sup>53</sup> – 1. Safe in this context refers to the ability to represent integers exactly and to correctly compare them. For example, `Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2` will evaluate to true, which is mathematically incorrect. See `Number.isSafeInteger()` for more information.

As mentioned in `Number.EPSILON`, the precision of numbers depends on their magnitude. `Number.MIN_SAFE_INTEGER` represents the smallest value at which integer-level operations can be performed precisely, but you can still perform meaningful arithmetic on numbers more negative than that, just without integer-level precision. The largest representable number in JavaScript is actually `Number.MAX_VALUE`, which is approximately 1.7976931348623157 × 10<sup>308</sup>.

Because `MIN_SAFE_INTEGER` is a static property of `Number`, you always use it as `Number.MIN_SAFE_INTEGER`, rather than as a property of a number value.

## Examples

### Using MIN_SAFE_INTEGER

```js
Number.MIN_SAFE_INTEGER; // -9007199254740991
-(2 ** 53 - 1); // -9007199254740991
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Number.MIN_SAFE_INTEGER` in `core-js`](https://github.com/zloirock/core-js#ecmascript-number)
- [es-shims polyfill of `Number.MIN_SAFE_INTEGER`](https://www.npmjs.com/package/es-constants)
- `Number.MAX_SAFE_INTEGER`
- `Number.isSafeInteger()`
- `BigInt`
