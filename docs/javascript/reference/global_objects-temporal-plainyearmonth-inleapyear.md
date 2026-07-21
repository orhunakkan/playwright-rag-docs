# Temporal.PlainYearMonth.prototype.inLeapYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/inLeapYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/inLeapYear)

---

The **`inLeapYear`** accessor property of `Temporal.PlainYearMonth` instances returns a boolean indicating whether this year-month is in a leap year. A leap year is a year that has more days (due to a leap day or leap month) than a common year. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `inLeapYear` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.inLeapYear`.

## Examples

### Using inLeapYear

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
console.log(ym.inLeapYear); // false
console.log(ym.daysInYear); // 365
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
- `Temporal.PlainYearMonth.prototype.daysInYear`
- `Temporal.PlainYearMonth.prototype.monthsInYear`
- `Temporal.PlainDate.prototype.inLeapYear`
