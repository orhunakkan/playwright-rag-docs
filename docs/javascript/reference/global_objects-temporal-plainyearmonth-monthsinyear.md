# Temporal.PlainYearMonth.prototype.monthsInYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/monthsInYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/monthsInYear)

---

The **`monthsInYear`** accessor property of `Temporal.PlainYearMonth` instances returns a positive integer representing the number of months in the year of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `monthsInYear` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.monthsInYear`.

## Examples

### Using monthsInYear

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
console.log(ym.monthsInYear); // 12
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
- `Temporal.PlainYearMonth.prototype.monthCode`
- `Temporal.PlainYearMonth.prototype.daysInMonth`
- `Temporal.PlainDate.prototype.monthsInYear`
