# Temporal.Duration.prototype.blank

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/blank](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/blank)

---

The **`blank`** accessor property of `Temporal.Duration` instances returns a boolean that is `true` if this duration represents a zero duration, and `false` otherwise. It is equivalent to `duration.sign === 0`.

## Examples

### Using blank

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });
const d3 = Temporal.Duration.from({ hours: 0 });

console.log(d1.blank); // false
console.log(d2.blank); // false
console.log(d3.blank); // true
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.sign`
