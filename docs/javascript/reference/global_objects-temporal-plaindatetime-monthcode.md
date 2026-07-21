# Temporal.PlainDateTime.prototype.monthCode

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/monthCode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/monthCode)

---

The **`monthCode`** accessor property of `Temporal.PlainDateTime` instances returns a calendar-specific string representing the month of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

Usually it is `M` plus a two-digit month number. For leap months, it is the previous month's code followed by `L` (even if it's conceptually a derivative of the following month; for example, in the Hebrew calendar, Adar I has code `M05L` but Adar II has code `M06`). If the leap month is the first month of the year, the code is `M00L`.

The set accessor of `monthCode` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.monthCode`.

## Examples

### Using monthCode

```js
const date = Temporal.PlainDateTime.from("2021-07-01"); // ISO 8601 calendar
console.log(date.monthCode); // "M07"
console.log(date.month); // 7
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.year`
- `Temporal.PlainDateTime.prototype.month`
- `Temporal.PlainDateTime.prototype.daysInMonth`
- `Temporal.PlainDateTime.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.monthCode`
