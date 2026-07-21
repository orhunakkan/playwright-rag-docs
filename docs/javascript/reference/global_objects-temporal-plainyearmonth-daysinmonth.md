# Temporal.PlainYearMonth.prototype.daysInMonth

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/daysInMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/daysInMonth)

---

The **`daysInMonth`** accessor property of `Temporal.PlainYearMonth` instances returns a positive integer representing the number of days in the month of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `daysInMonth` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.daysInMonth`.

## Examples

### Using daysInMonth

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
console.log(ym.daysInMonth); // 31
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
- `Temporal.PlainYearMonth.prototype.daysInYear`
- `Temporal.PlainDate.prototype.daysInMonth`
