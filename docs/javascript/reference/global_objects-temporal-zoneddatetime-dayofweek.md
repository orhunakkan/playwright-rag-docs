# Temporal.ZonedDateTime.prototype.dayOfWeek

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/dayOfWeek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/dayOfWeek)

---

The **`dayOfWeek`** accessor property of `Temporal.ZonedDateTime` instances returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `dayOfWeek` is `undefined`. You cannot change this property directly. To create a new `Temporal.ZonedDateTime` object with the desired new `dayOfWeek` value, use the `add()` or `subtract()` method with the appropriate number of `days`.

For general information and more examples, see `Temporal.PlainDate.prototype.dayOfWeek`.

## Examples

### Using dayOfWeek

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]");
console.log(dt.dayOfWeek); // 4; Thursday
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.day`
- `Temporal.ZonedDateTime.prototype.dayOfYear`
- `Temporal.ZonedDateTime.prototype.daysInWeek`
- `Temporal.ZonedDateTime.prototype.weekOfYear`
- `Temporal.ZonedDateTime.prototype.yearOfWeek`
- `Temporal.PlainDate.prototype.dayOfWeek`
