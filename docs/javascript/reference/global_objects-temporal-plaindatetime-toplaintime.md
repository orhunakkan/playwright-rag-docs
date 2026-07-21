# Temporal.PlainDateTime.prototype.toPlainTime()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/toPlainTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/toPlainTime)

---

The **`toPlainTime()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainTime` object representing the time part (hour, minute, second, and subsecond components) of this date-time.

## Syntax

```js-nolint
toPlainTime()
```

### Parameters

None.

### Return value

A new `Temporal.PlainTime` object representing the time part (hour, minute, second, and subsecond components) of this date-time.

## Examples

### Using toPlainTime()

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56");
const time = dt.toPlainTime();
console.log(time.toString()); // '12:34:56'
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainTime`
- `Temporal.PlainDateTime.prototype.toPlainDate()`
- `Temporal.PlainDateTime.prototype.toZonedDateTime()`
