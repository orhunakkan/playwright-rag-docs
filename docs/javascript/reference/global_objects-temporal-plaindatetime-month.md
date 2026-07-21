# Temporal.PlainDateTime.prototype.month

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/month)

---

The **`month`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the 1-based month index in the year of this date. The first month of this year is `1`, and the last month is the `monthsInYear`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `month` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.month`.

## Examples

### Using month

```js
const dt = Temporal.PlainDateTime.from("2021-07-01"); // ISO 8601 calendar
console.log(dt.monthCode); // "M07"
console.log(dt.month); // 7
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
- `Temporal.PlainDateTime.prototype.monthCode`
- `Temporal.PlainDateTime.prototype.daysInMonth`
- `Temporal.PlainDateTime.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.month`
