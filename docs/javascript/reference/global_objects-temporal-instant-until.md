# Temporal.Instant.prototype.until()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/until](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/until)

---

The **`until()`** method of `Temporal.Instant` instances returns a new `Temporal.Duration` object representing the duration from this instant to another instant (in a form convertible by `Temporal.Instant.from()`). The duration is positive if the other instant is after this instant, and negative if before.

This method does `other - this`. To do `this - other`, use the `since()` method.

## Syntax

```js-nolint
until(other)
until(other, options)
```

### Parameters

- `other`
  - : A string or a `Temporal.Instant` instance representing an instant to subtract this instant from. It is converted to a `Temporal.Instant` object using the same algorithm as `Temporal.Instant.from()`.
- `options` (optional)
  - : The same options as [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/since#options).

### Return value

A new `Temporal.Duration` object representing the duration from this instant _until_ `other`. The duration is positive if `other` is after this instant, and negative if before.

### Exceptions

- `RangeError`
  - : Thrown if any of the options is invalid.

## Examples

### Using until()

```js
const launch = Temporal.Instant.fromEpochMilliseconds(2051222400000);
const now = Temporal.Now.instant();
const duration = now.until(launch, { smallestUnit: "minutes" });
console.log(`It will be ${duration.toLocaleString("en-US")} until the launch`);
```

For more examples, see [`since()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/since).

## Specifications



## Browser compatibility



## See also

- `Temporal.Instant`
- `Temporal.Duration`
- `Temporal.Instant.prototype.add()`
- `Temporal.Instant.prototype.subtract()`
- `Temporal.Instant.prototype.since()`
