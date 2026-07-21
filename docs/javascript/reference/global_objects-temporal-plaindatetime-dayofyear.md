# Temporal.PlainDateTime.prototype.dayOfYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/dayOfYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/dayOfYear)

---

The **`dayOfYear`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the 1-based day index in the year of this date. The first day of this year is `1`, and the last day is the `daysInYear`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `dayOfYear` is `undefined`. You cannot change this property directly. To create a new `Temporal.PlainDateTime` object with the desired new `dayOfYear` value, use the `add()` or `subtract()` method with the appropriate number of `days`.

For general information and more examples, see `Temporal.PlainDate.prototype.dayOfYear`.

## Examples

### Using dayOfYear

```js
const dt = Temporal.PlainDateTime.from("2021-07-01");
console.log(dt.dayOfYear); // 182
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.year`
- `Temporal.PlainDateTime.prototype.day`
- `Temporal.PlainDateTime.prototype.dayOfWeek`
- `Temporal.PlainDateTime.prototype.daysInYear`
- `Temporal.PlainDate.prototype.dayOfYear`
