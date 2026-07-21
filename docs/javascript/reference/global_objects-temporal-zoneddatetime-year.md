# Temporal.ZonedDateTime.prototype.year

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/year](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/year)

---

The **`year`** accessor property of `Temporal.ZonedDateTime` instances returns an integer representing the number of years of this date relative to the start of a calendar-specific epoch year. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `year` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.year`.

## Examples

### Using year

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]"); // ISO 8601 calendar
console.log(dt.year); // 2021
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.era`
- `Temporal.ZonedDateTime.prototype.eraYear`
- `Temporal.ZonedDateTime.prototype.yearOfWeek`
- `Temporal.ZonedDateTime.prototype.month`
- `Temporal.ZonedDateTime.prototype.day`
- `Temporal.PlainDate.prototype.year`
