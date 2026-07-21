# Temporal.PlainDate.prototype.yearOfWeek

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/yearOfWeek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/yearOfWeek)

---

The **`yearOfWeek`** accessor property of `Temporal.PlainDate` instances returns an integer representing the year to be paired with the `weekOfYear` of this date, or `undefined` if the calendar does not have a well-defined week system. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

Usually this is the year of the date, but for ISO 8601, the first and last few days of the year may be attributed to the last week of the previous year or the first week of the next year, causing the `yearOfWeek` to differ by 1. See `weekOfYear` for more details.

The set accessor of `yearOfWeek` is `undefined`. You cannot change this property directly.

## Examples

See the examples in the `weekOfYear` page.

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
- `Temporal.PlainDate.prototype.year`
- `Temporal.PlainDate.prototype.weekOfYear`
- `Temporal.PlainDate.prototype.dayOfWeek`
- `Temporal.PlainDate.prototype.daysInWeek`
- `Temporal.PlainDate.prototype.daysInYear`
