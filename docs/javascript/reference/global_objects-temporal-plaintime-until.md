# Temporal.PlainTime.prototype.until()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/until](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/until)

---

The **`until()`** method of `Temporal.PlainTime` instances returns a new `Temporal.Duration` object representing the duration from this time to another time (in a form convertible by `Temporal.PlainTime.from()`). The duration is positive if the other time is after this time, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js-nolint
until(other)
until(other, options)
```

### Parameters

- `other`
  - : A string, an object, or a `Temporal.PlainTime` instance representing a time to subtract this time from. It is converted to a `Temporal.PlainTime` object using the same algorithm as `Temporal.PlainTime.from()`. It must have the same calendar as `this`.
- `options` (optional)
  - : The same options as [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/since#options).

### Return value

A new `Temporal.Duration` object representing the duration from this time _until_ `other`. The duration is positive if `other` is after this time, and negative if before.

### Exceptions

- `RangeError`
  - : Thrown if any of the options is invalid.

## Examples

### Using until()

```js
const lunchTime = Temporal.PlainTime.from("12:30:00");
const now = Temporal.Now.plainTimeISO();
const duration = now.until(lunchTime);
console.log(`It will be ${duration.toLocaleString("en-US")} until lunch`);
// Example output: "It will be 3 hr, 42 min, 21 sec, 343 ms, 131 μs, 718 ns until lunch"
```

For more examples, see [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/since).

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.Duration`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.since()`
