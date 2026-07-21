# Temporal.PlainMonthDay.prototype.toPlainDate()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainMonthDay/toPlainDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainMonthDay/toPlainDate)

---

The **`toPlainDate()`** method of `Temporal.PlainMonthDay` instances returns a new `Temporal.PlainDate` object representing this month-day and a supplied year in the same calendar system.

## Syntax

```js-nolint
toPlainDate(yearInfo)
```

### Parameters

- `yearInfo`
  - : An object representing the year component of the resulting `PlainDate`, containing the following properties (in the order they are retrieved and validated):
    - `era` and `eraYear`
      - : A string and an integer that correspond to the `era` and `eraYear` properties. Are only used if the calendar system has eras. `era` and `eraYear` must be provided simultaneously. If they are not provided, then `year` must be provided. If all of `era`, `eraYear`, and `year` are provided, they must be consistent.
    - `year`
      - : Corresponds to the `year` property.

### Return value

A new `Temporal.PlainDate` object representing the date specified by this month-day and the year in `yearInfo`, interpreted in the calendar system of this month-day.

### Exceptions

- `RangeError`
  - : Thrown if any of the options is invalid.
- `TypeError`
  - : Thrown if `yearInfo` is not an object.

## Examples

### Using toPlainDate()

```js
const md = Temporal.PlainMonthDay.from("07-01");
const date = md.toPlainDate({ year: 2021 });
console.log(date.toString()); // 2021-07-01

const md2 = Temporal.PlainMonthDay.from("2021-07-01[u-ca=japanese]");
const date2 = md2.toPlainDate({ era: "reiwa", eraYear: 1 });
console.log(date2.toString()); // 2019-07-01[u-ca=japanese]
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
