# Temporal.PlainDate.prototype.toPlainYearMonth()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toPlainYearMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toPlainYearMonth)

---

The **`toPlainYearMonth()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainYearMonth` object representing the `year` and `month` of this date in the same calendar system.

## Syntax

```js-nolint
toPlainYearMonth()
```

### Parameters

None.

### Return value

A new `Temporal.PlainYearMonth` object representing the `year` and `month` of this date in the same calendar system.

## Examples

### Using toPlainYearMonth()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const yearMonth = date.toPlainYearMonth();
console.log(yearMonth.toString()); // 2021-07
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainYearMonth`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
- `Temporal.PlainDate.prototype.toPlainMonthDay()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainYearMonth.prototype.toPlainDate()`
