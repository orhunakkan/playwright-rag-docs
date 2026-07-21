# Temporal.Duration.prototype.sign

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign)

---

The **`sign`** accessor property of `Temporal.Duration` instances returns `1` if this duration is positive, `-1` if negative, and `0` if zero. Because [a duration never has mixed signs](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_sign), the sign of a duration is determined by the sign of any of its non-zero fields.

## Examples

### Using sign

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });
const d3 = Temporal.Duration.from({ hours: 0 });

console.log(d1.sign); // 1
console.log(d2.sign); // -1
console.log(d3.sign); // 0

console.log(d1.abs().sign); // 1
console.log(d2.abs().sign); // 1
console.log(d3.abs().sign); // 0

console.log(d1.negated().sign); // -1
console.log(d2.negated().sign); // 1
console.log(d3.negated().sign); // 0
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.abs()`
- `Temporal.Duration.prototype.negated()`
- `Temporal.Duration.prototype.blank`
