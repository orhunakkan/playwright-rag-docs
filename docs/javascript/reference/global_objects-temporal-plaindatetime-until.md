# Temporal.PlainDateTime.prototype.until()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/until](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/until)

---

The **`until()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.Duration` object representing the duration from this date-time to another date-time (in a form convertible by `Temporal.PlainDateTime.from()`). The duration is positive if the other date-time is after this date-time, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js-nolint
until(other)
until(other, options)
```

### Parameters

- `other`
  - : A string, an object, or a `Temporal.PlainDateTime` instance representing a date-time to subtract this date-time from. It is converted to a `Temporal.PlainDateTime` object using the same algorithm as `Temporal.PlainDateTime.from()`. It must have the same calendar as `this`.
- `options` (optional)
  - : The same options as [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/since#options).

### Return value

A new `Temporal.Duration` object representing the duration from this date-time _until_ `other`. The duration is positive if `other` is after this date-time, and negative if before.

### Exceptions

- `RangeError`
  - : Thrown in one of the following cases:
    - `other` has a different calendar than `this`.
    - Any of the options is invalid.

## Examples

### Using until()

```js
let nextBilling = Temporal.PlainDateTime.from({
  year: Temporal.Now.plainDateISO().year,
  month: 4,
  day: 1,
});
const now = Temporal.Now.plainDateTimeISO().round("second");
if (Temporal.PlainDateTime.compare(nextBilling, now) < 0) {
  nextBilling = nextBilling.add({ years: 1 });
}
const duration = now.until(nextBilling);
console.log(`${duration.toLocaleString("en-US")} until next billing`);
```

For more examples, see [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/since).

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.Duration`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.since()`
