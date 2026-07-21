# Temporal.PlainDate.prototype.toPlainMonthDay()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toPlainMonthDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toPlainMonthDay)

---

The **`toPlainMonthDay()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainMonthDay` object representing the `monthCode` and `day` of this date in the same calendar system.

Note that `PlainMonthDay` objects do not have a `month` component, because months with the same name can have different `month` indexes in different years due to leap months.

## Syntax

```js-nolint
toPlainMonthDay()
```

### Parameters

None.

### Return value

A new `Temporal.PlainMonthDay` object representing the `monthCode` and `day` of this date in the same calendar system.

## Examples

### Using toPlainMonthDay()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const monthDay = date.toPlainMonthDay();
console.log(monthDay.toString()); // 07-01
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainMonthDay`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
- `Temporal.PlainDate.prototype.toPlainYearMonth()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainMonthDay.prototype.toPlainDate()`
