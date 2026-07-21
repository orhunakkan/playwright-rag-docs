# Temporal.Duration.prototype.months

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/months](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/months)

---

The **`months`** accessor property of `Temporal.Duration` instances returns an integer representing the number of months in the duration.

Unless the duration is [balanced](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#duration_balancing), you cannot assume the range of this value, but you can know its sign by checking the duration's [`sign`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/sign) property. If it is balanced to a unit above months, the `months` absolute value's range depends on the calendar (how many months are in a year).

The set accessor of `months` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.Duration` object with the desired new value.

## Examples

### Using months

```js
const d1 = Temporal.Duration.from({ years: 1, months: 1 });
const d2 = Temporal.Duration.from({ years: -1, months: -1 });
const d3 = Temporal.Duration.from({ years: 1 });
const d4 = Temporal.Duration.from({ months: 12 });

console.log(d1.months); // 1
console.log(d2.months); // -1
console.log(d3.months); // 0
console.log(d4.months); // 12

// Balance d4
const d4Balanced = d4.round({
  largestUnit: "years",
  relativeTo: Temporal.PlainDate.from("2021-01-01"), // ISO 8601 calendar
});
console.log(d4Balanced.months); // 0
console.log(d4Balanced.years); // 1
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.years`
- `Temporal.Duration.prototype.weeks`
- `Temporal.Duration.prototype.days`
- `Temporal.Duration.prototype.hours`
- `Temporal.Duration.prototype.minutes`
- `Temporal.Duration.prototype.seconds`
- `Temporal.Duration.prototype.milliseconds`
- `Temporal.Duration.prototype.microseconds`
- `Temporal.Duration.prototype.nanoseconds`
