# Temporal.Duration.prototype.hours

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/hours](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/hours)

---

The **`hours`** accessor property of `Temporal.Duration` instances returns an integer representing the number of hours in the duration.

Unless the duration is [balanced](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_balancing), you cannot assume the range of this value, but you can know its sign by checking the duration's [`sign`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign) property. If it is balanced to a unit above hours, the `hours` absolute value will be between 0 and 23, inclusive.

The set accessor of `hours` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using hours

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });
const d3 = Temporal.Duration.from({ days: 1 });
const d4 = Temporal.Duration.from({ hours: 24 });

console.log(d1.hours); // 1
console.log(d2.hours); // -1
console.log(d3.hours); // 0
console.log(d4.hours); // 24

// Balance d4
const d4Balanced = d4.round({ largestUnit: "days" });
console.log(d4Balanced.hours); // 0
console.log(d4Balanced.days); // 1
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.months`
- `Temporal.Duration.prototype.weeks`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.seconds`
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
