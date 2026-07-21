# Temporal.PlainYearMonth.prototype.era

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/era](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/era)

---

The **`era`** accessor property of `Temporal.PlainYearMonth` instances returns a calendar-specific lowercase string representing the era of this year-month, or `undefined` if the calendar does not use eras (e.g., ISO 8601). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `era` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainYearMonth` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.era`.

## Examples

### Using era

```js
const ym = Temporal.PlainYearMonth.from("2021-07"); // ISO 8601 calendar
console.log(ym.era); // undefined

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=gregory]");
console.log(ym2.era); // ce
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.with()`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.year`
- `Temporal.PlainYearMonth.prototype.eraYear`
- `Temporal.PlainDate.prototype.era`
