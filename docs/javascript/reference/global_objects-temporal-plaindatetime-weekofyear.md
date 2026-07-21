# Temporal.PlainDateTime.prototype.weekOfYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/weekOfYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/weekOfYear)

---

The **`weekOfYear`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the 1-based week index in the `yearOfWeek` of this date, or `undefined` if the calendar does not have a well-defined week system. The first week of the year is `1`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `weekOfYear` is `undefined`. You cannot change this property directly. To create a new `Temporal.PlainDateTime` object with the desired new `weekOfYear` value, use the `add()` or `subtract()` method with the appropriate number of `weeks`.

For general information and more examples, see `Temporal.PlainDate.prototype.weekOfYear`.

## Examples

### Using weekOfYear

```js
const dt = Temporal.PlainDateTime.from("2021-07-01");
console.log(dt.weekOfYear); // 26
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.yearOfWeek`
- `Temporal.PlainDateTime.prototype.dayOfWeek`
- `Temporal.PlainDateTime.prototype.daysInWeek`
- `Temporal.PlainDateTime.prototype.daysInYear`
- `Temporal.PlainDate.prototype.weekOfYear`
