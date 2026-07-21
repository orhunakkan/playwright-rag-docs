# Temporal.PlainYearMonth.prototype.month

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/month)

---

The **`month`** accessor property of `Temporal.PlainYearMonth` instances returns a positive integer representing the 1-based month index in the year of this year-month. The first month of this year is `1`, and the last month is the `monthsInYear`. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `month` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainYearMonth` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.month`.

## Examples

### Using month

```js
const ym = Temporal.PlainYearMonth.from("2021-07"); // ISO 8601 calendar
console.log(ym.monthCode); // "M07"
console.log(ym.month); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.with()`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.year`
- `Temporal.PlainYearMonth.prototype.monthCode`
- `Temporal.PlainYearMonth.prototype.daysInMonth`
- `Temporal.PlainYearMonth.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.month`
