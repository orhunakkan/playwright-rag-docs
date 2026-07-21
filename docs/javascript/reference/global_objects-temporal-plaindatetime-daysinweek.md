# Temporal.PlainDateTime.prototype.daysInWeek

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/daysInWeek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/daysInWeek)

---

The **`daysInWeek`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the number of days in the week of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `daysInWeek` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.daysInWeek`.

## Examples

### Using daysInWeek

```js
const dt = Temporal.PlainDateTime.from("2021-07-01");
console.log(dt.daysInWeek); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.yearOfWeek`
- `Temporal.PlainDateTime.prototype.weekOfYear`
- `Temporal.PlainDateTime.prototype.dayOfWeek`
- `Temporal.PlainDateTime.prototype.daysInMonth`
- `Temporal.PlainDateTime.prototype.daysInYear`
- `Temporal.PlainDate.prototype.daysInWeek`
