# Temporal.ZonedDateTime.prototype.weekOfYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/weekOfYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/weekOfYear)

---

The **`weekOfYear`** accessor property of `Temporal.ZonedDateTime` instances returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `weekOfYear` is `undefined`. You cannot change this property directly. To create a new `Temporal.ZonedDateTime` object with the desired new `weekOfYear` value, use the `add()` or `subtract()` method with the appropriate number of `weeks`.

For general information and more examples, see `Temporal.PlainDate.prototype.weekOfYear`.

## Examples

### Using weekOfYear

```js
const dt = Temporal.ZonedDateTime.from("2021-07-01[America/New_York]");
console.log(dt.weekOfYear); // 26
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.yearOfWeek`
- `Temporal.ZonedDateTime.prototype.dayOfWeek`
- `Temporal.ZonedDateTime.prototype.daysInWeek`
- `Temporal.ZonedDateTime.prototype.daysInYear`
- `Temporal.PlainDate.prototype.weekOfYear`
