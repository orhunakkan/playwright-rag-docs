# Temporal.PlainDateTime.prototype.toPlainDate()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/toPlainDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/toPlainDate)

---

The **`toPlainDate()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainDate` object representing the date part (year, month, day) of this date-time in the same calendar system.

## Syntax

```js-nolint
toPlainDate()
```

### Parameters

None.

### Return value

A new `Temporal.PlainDate` object representing the date part (year, month, day) of this date-time in the same calendar system.

## Examples

### Using toPlainDate()

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56");
const date = dt.toPlainDate();
console.log(date.toString()); // '2021-07-01'
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDate`
- `Temporal.PlainDateTime.prototype.toPlainTime()`
- `Temporal.PlainDate.prototype.toZonedDateTime()`
- `Temporal.PlainDate.prototype.toPlainDateTime()`
