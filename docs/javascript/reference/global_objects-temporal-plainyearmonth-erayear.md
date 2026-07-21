# Temporal.PlainYearMonth.prototype.eraYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/eraYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/eraYear)

---

The **`eraYear`** accessor property of `Temporal.PlainYearMonth` instances returns a non-negative integer representing the year of this year-month within the era, or `undefined` if the calendar does not use eras (e.g., ISO 8601). The year index usually starts from 1 (more common) or 0, and years in an era can decrease with time (e.g., Gregorian BCE). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `eraYear` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainYearMonth` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.eraYear`.

## Examples

### Using eraYear

```js
const ym = Temporal.PlainYearMonth.from("2021-07"); // ISO 8601 calendar
console.log(ym.eraYear); // undefined

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=gregory]");
console.log(ym2.eraYear); // 2021

const ym3 = Temporal.PlainYearMonth.from("-002021-07-01[u-ca=gregory]");
console.log(ym3.eraYear); // 2022; 0000 is used for the year 1 BC

const ym4 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=japanese]");
console.log(ym4.eraYear); // 3
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.prototype.with()`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.subtract()`
- `Temporal.PlainYearMonth.prototype.year`
- `Temporal.PlainYearMonth.prototype.era`
- `Temporal.PlainDate.prototype.eraYear`
