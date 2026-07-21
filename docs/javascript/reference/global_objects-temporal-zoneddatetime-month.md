# Temporal.ZonedDateTime.prototype.month

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/month)

---

The **`month`** accessor property of `Temporal.ZonedDateTime` instances returns a positive integer representing the 1-based month index in the year of this date. The first month of this year is `1`, and the last month is the `monthsInYear`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `month` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.month`.

## Examples

### Using month

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]"); // ISO 8601 calendar
console.log(dt.monthCode); // "M07"
console.log(dt.month); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.year`
- `Temporal.ZonedDateTime.prototype.day`
- `Temporal.ZonedDateTime.prototype.monthCode`
- `Temporal.ZonedDateTime.prototype.daysInMonth`
- `Temporal.ZonedDateTime.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.month`
