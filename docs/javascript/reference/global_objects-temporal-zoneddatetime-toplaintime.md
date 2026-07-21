# Temporal.ZonedDateTime.prototype.toPlainTime()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toPlainTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toPlainTime)

---

The **`toPlainTime()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.PlainTime` object representing the time portion of this date-time.

> [!WARNING]
> After a `Temporal.ZonedDateTime` is converted to `Temporal.PlainTime`, it's no longer time-zone-aware. Subsequent operations like arithmetic or `with()` operations will not adjust for DST and may not yield the same results as equivalent operations with the original `Temporal.ZonedDateTime`. However, unless you perform those operations across a time zone offset transition, it's impossible to notice the difference. Therefore, be very careful when performing this conversion because subsequent results may be correct most of the time, but only turn out incorrect when moving across offset transitions like when DST starts or ends.

## Syntax

```js-nolint
toPlainTime()
```

### Parameters

None.

### Return value

A new `Temporal.PlainTime` object representing the time portion of this date-time.

## Examples

### Using toPlainTime()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.987654321-04:00[America/New_York]",
);
const plainTime = zdt.toPlainTime();
console.log(plainTime.toString()); // 12:34:56.987654321
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.PlainTime`
- `Temporal.ZonedDateTime.prototype.toPlainDate()`
- `Temporal.ZonedDateTime.prototype.toPlainDateTime()`
- `Temporal.ZonedDateTime.prototype.toInstant()`
