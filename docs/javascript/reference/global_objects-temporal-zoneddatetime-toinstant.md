# Temporal.ZonedDateTime.prototype.toInstant()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toInstant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toInstant)

---

The **`toInstant()`** method of `Temporal.ZonedDateTime` instances returns a new `Temporal.Instant` object representing the instant of this date-time.

## Syntax

```js-nolint
toInstant()
```

### Parameters

None.

### Return value

A new `Temporal.Instant` object representing the instant of this date-time.

## Examples

### Using toInstant()

```js
const zdt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.987654321-04:00[America/New_York]",
);
const instant = zdt.toInstant();
console.log(instant.toString()); // 2021-07-01T16:34:56.987654321Z
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.Instant`
- `Temporal.ZonedDateTime.prototype.toPlainDate()`
- `Temporal.ZonedDateTime.prototype.toPlainTime()`
- `Temporal.ZonedDateTime.prototype.toPlainDateTime()`
- `Temporal.Instant.prototype.toZonedDateTimeISO()`
