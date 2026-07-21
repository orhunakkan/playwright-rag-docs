# Temporal.PlainDateTime.prototype.monthsInYear

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/monthsInYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/monthsInYear)

---

The **`monthsInYear`** accessor property of `Temporal.PlainDateTime` instances returns a positive integer representing the number of months in the year of this date. It is [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars)-dependent.

The set accessor of `monthsInYear` is `undefined`. You cannot change this property directly.

For general information and more examples, see `Temporal.PlainDate.prototype.monthsInYear`.

## Examples

### Using monthsInYear

```js
const dt = Temporal.PlainDateTime.from("2021-07-01");
console.log(dt.monthsInYear); // 12
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
- `Temporal.PlainDateTime.prototype.monthCode`
- `Temporal.PlainDateTime.prototype.daysInMonth`
- `Temporal.PlainDate.prototype.monthsInYear`
