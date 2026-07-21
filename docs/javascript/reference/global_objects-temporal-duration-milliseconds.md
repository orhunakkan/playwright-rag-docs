# Temporal.Duration.prototype.milliseconds

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/milliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/milliseconds)

---

The **`milliseconds`** accessor property of `Temporal.Duration` instances returns an integer representing the number of milliseconds in the duration.

Unless the duration is [balanced](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_balancing), you cannot assume the range of this value, but you can know its sign by checking the duration's [`sign`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign) property. If it is balanced to a unit above milliseconds, the `milliseconds` absolute value will be between 0 and 999, inclusive.

The set accessor of `milliseconds` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using milliseconds

```js
const d1 = Temporal.Duration.from({ seconds: 1, milliseconds: 500 });
const d2 = Temporal.Duration.from({ seconds: -1, milliseconds: -500 });
const d3 = Temporal.Duration.from({ seconds: 1 });
const d4 = Temporal.Duration.from({ milliseconds: 1000 });

console.log(d1.milliseconds); // 500
console.log(d2.milliseconds); // -500
console.log(d3.milliseconds); // 0
console.log(d4.milliseconds); // 1000

// Balance d4
const d4Balanced = d4.round({ largestUnit: "seconds" });
console.log(d4Balanced.milliseconds); // 0
console.log(d4Balanced.seconds); // 1
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.months`
- `Temporal.Duration.prototype.weeks`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.hours`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.seconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
