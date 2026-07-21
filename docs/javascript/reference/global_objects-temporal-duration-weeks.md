# Temporal.Duration.prototype.weeks

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/weeks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/weeks)

---

The **`weeks`** accessor property of `Temporal.Duration` instances returns an integer representing the number of weeks in the duration.

Unless the duration is [balanced](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_balancing), you cannot assume the range of this value, but you can know its sign by checking the duration's [`sign`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign) property. If it is balanced to a unit above weeks, the `weeks` absolute value's range depends on the calendar (how many weeks are in a month or year).

The set accessor of `weeks` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using weeks

```js
const d1 = Temporal.Duration.from({ weeks: 1, days: 1 });
const d2 = Temporal.Duration.from({ weeks: -1, days: -1 });
const d3 = Temporal.Duration.from({ weeks: 1 });
const d4 = Temporal.Duration.from({ days: 7 });

console.log(d1.weeks); // 1
console.log(d2.weeks); // -1
console.log(d3.weeks); // 1
console.log(d4.weeks); // 0

// Balance d4
const d4Balanced = d4.round({
  largestUnit: "weeks",
  relativeTo: Temporal.PlainDate.from("2021-01-01"), // ISO 8601 calendar
});
console.log(d4Balanced.weeks); // 1
console.log(d4Balanced.days); // 0
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.months`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.hours`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.seconds`
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
