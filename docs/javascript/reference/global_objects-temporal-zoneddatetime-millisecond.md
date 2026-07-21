# Temporal.ZonedDateTime.prototype.millisecond

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/millisecond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/millisecond)

---

The **`millisecond`** accessor property of `Temporal.ZonedDateTime` instances returns an integer from 0 to 999 representing the millisecond (10<sup>-3</sup> second) component of this time.

The set accessor of `millisecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainTime.prototype.millisecond`.

## Examples

### Using millisecond

```js
const dt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.123456789-04:00[America/New_York]",
);
console.log(dt.millisecond); // 123
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.second`
- `Temporal.ZonedDateTime.prototype.microsecond`
- `Temporal.ZonedDateTime.prototype.nanosecond`
- `Temporal.PlainTime.prototype.millisecond`
