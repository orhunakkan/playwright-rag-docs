# Temporal.PlainDateTime.prototype.era

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/era](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/era)

---

The **`era`** accessor property of `Temporal.PlainDateTime` instances returns a calendar-specific lowercase string representing the era of this date, or `undefined` if the calendar does not use eras (e.g., ISO 8601). `era` and `eraYear` together uniquely identify a year in a calendar, in the same way that `year` does. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `era` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainDate.prototype.era`.

## Examples

### Using era

```js
const dt = Temporal.PlainDateTime.from("2021-07-01"); // ISO 8601 calendar
console.log(dt.era); // undefined

const dt2 = Temporal.PlainDateTime.from("2021-07-01[u-ca=gregory]");
console.log(dt2.era); // ce
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.year`
- `Temporal.PlainDateTime.prototype.eraYear`
- `Temporal.PlainDate.prototype.era`
