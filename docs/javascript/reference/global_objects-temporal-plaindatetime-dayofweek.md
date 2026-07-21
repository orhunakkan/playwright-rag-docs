# Temporal.PlainDateTime.prototype.dayOfWeek

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/dayOfWeek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/dayOfWeek)

---

The **`dayOfWeek`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the 1-based day index in the week of this date. Days in a week are numbered sequentially from `1` to `daysInWeek`, with each number mapping to its name. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `dayOfWeek` is `undefined`. You cannot change this property directly. To create a new `Temporal.PlainDateTime` object with the desired new `dayOfWeek` value, use the `add()` or `subtract()` method with the appropriate number of `days`.

For general information and more examples, see `Temporal.PlainDate.prototype.dayOfWeek`.

## Examples

### Using dayOfWeek

```js
const dt = Temporal.PlainDateTime.from("2021-07-01");
console.log(dt.dayOfWeek); // 4; Thursday
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.day`
- `Temporal.PlainDateTime.prototype.dayOfYear`
- `Temporal.PlainDateTime.prototype.daysInWeek`
- `Temporal.PlainDateTime.prototype.weekOfYear`
- `Temporal.PlainDateTime.prototype.yearOfWeek`
- `Temporal.PlainDate.prototype.dayOfWeek`
