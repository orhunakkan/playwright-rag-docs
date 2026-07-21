# Temporal.PlainYearMonth.prototype.toPlainDate()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/toPlainDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/toPlainDate)

---

The **`toPlainDate()`** method of `Temporal.PlainYearMonth` instances returns a new `Temporal.PlainDate` object representing this year-month and a supplied day in the same calendar system.

## Syntax

```js-nolint
toPlainDate(dayInfo)
```

### Parameters

- `dayInfo` (optional)
  - : An object representing the day component of the resulting `PlainDate`, containing the following property:
    - `day`
      - : Corresponds to the `day` property.

### Return value

A new `Temporal.PlainDate` object representing the date specified by this year-month and the day in `dayInfo`, interpreted in the calendar system of this year-month.

### Exceptions

- `RangeError`
  - : Thrown if any of the options is invalid.
- `TypeError`
  - : Thrown if `dayInfo` is not an object.

## Examples

### Using toPlainDate()

```js
const ym = Temporal.PlainYearMonth.from("2021-07");
const date = ym.toPlainDate({ day: 1 });
console.log(date.toString()); // 2021-07-01

const ym2 = Temporal.PlainYearMonth.from("2021-07-01[u-ca=chinese]");
const date2 = ym2.toPlainDate({ day: 15 });
console.log(date2.toString()); // 2021-06-24[u-ca=chinese]
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
