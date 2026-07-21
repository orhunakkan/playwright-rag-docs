# Temporal.ZonedDateTime.prototype.daysInWeek

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/daysInWeek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/daysInWeek)

---

The **`daysInWeek`** accessor property of `Temporal.ZonedDateTime` instances returns a positive integer representing the number of days in the week of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `daysInWeek` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.daysInWeek`.

## Examples

### Using daysInWeek

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]");
console.log(dt.daysInWeek); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.yearOfWeek`
- `Temporal.ZonedDateTime.prototype.weekOfYear`
- `Temporal.ZonedDateTime.prototype.dayOfWeek`
- `Temporal.ZonedDateTime.prototype.daysInMonth`
- `Temporal.ZonedDateTime.prototype.daysInYear`
- `Temporal.PlainDate.prototype.daysInWeek`
