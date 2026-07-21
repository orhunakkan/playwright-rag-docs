# Temporal.PlainYearMonth.prototype.monthCode

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/monthCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/monthCode)

---

The **`monthCode`** accessor property of `Temporal.PlainYearMonth` instances returns a calendar-specific string representing the month of this year-month. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

Usually it is `M` plus a two-digit month number. For leap months, it is the previous month's code followed by `L` (even if it's conceptually a derivative of the following month; for example, in the Hebrew calendar, Adar I has code `M05L` but Adar II has code `M06`). If the leap month is the first month of the year, the code is `M00L`.

The set accessor of `monthCode` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainYearMonth` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.monthCode`.

## Examples

### Using monthCode

```js
const date = Temporal.PlainYearMonth.from("2021-07-01"); // ISO 8601 calendar
console.log(date.monthCode); // "M07"
console.log(date.month); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.with()`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.year`
- `Temporal.PlainYearMonth.prototype.month`
- `Temporal.PlainYearMonth.prototype.daysInMonth`
- `Temporal.PlainYearMonth.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.monthCode`
