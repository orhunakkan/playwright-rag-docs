# Temporal.Duration.prototype.seconds

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/seconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/seconds)

---

The **`seconds`** accessor property of `Temporal.Duration` instances returns an integer representing the number of seconds in the duration.

Unless the duration is [balanced](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_balancing), you cannot assume the range of this value, but you can know its sign by checking the duration's [`sign`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign) property. If it is balanced to a unit above seconds, the `seconds` absolute value will be between 0 and 59, inclusive.

The set accessor of `seconds` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using seconds

```js
const d1 = Temporal.Duration.from({ minutes: 1, seconds: 30 });
const d2 = Temporal.Duration.from({ minutes: -1, seconds: -30 });
const d3 = Temporal.Duration.from({ minutes: 1 });
const d4 = Temporal.Duration.from({ seconds: 60 });

console.log(d1.seconds); // 30
console.log(d2.seconds); // -30
console.log(d3.seconds); // 0
console.log(d4.seconds); // 60

// Balance d4
const d4Balanced = d4.round({ largestUnit: "minutes" });
console.log(d4Balanced.seconds); // 0
console.log(d4Balanced.minutes); // 1
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
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
