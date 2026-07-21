# Temporal.Instant.fromEpochMilliseconds()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/fromEpochMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/fromEpochMilliseconds)

---

The **`Temporal.Instant.fromEpochMilliseconds()`** static method creates a new `Temporal.Instant` object from the number of milliseconds since the Unix epoch (midnight at the beginning of January 1, 1970, UTC).

To convert a `Date` object to a `Temporal.Instant` object, use `Date.prototype.toTemporalInstant()` instead.

## Syntax

```js-nolint
Temporal.Instant.fromEpochMilliseconds(epochMilliseconds)
```

### Parameters

- `epochMilliseconds`
  - : A number representing the number of milliseconds since the Unix epoch. Internally, it is converted to a BigInt and multiplied by `1e6` to get the number of nanoseconds.

### Return value

A new `Temporal.Instant` object representing the instant in time specified by `epochMilliseconds`.

### Exceptions

- `RangeError`
  - : Thrown in one of the following cases:
    - `epochMilliseconds` cannot be converted to a BigInt (e.g., not an integer).
    - `epochMilliseconds` is not in the [representable range](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#representable_dates), which is ±10<sup>8</sup> days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Using Temporal.Instant.fromEpochMilliseconds()

```js
const instant = Temporal.Instant.fromEpochMilliseconds(0);
console.log(instant.toString()); // 1970-01-01T00:00:00Z
const vostok1Liftoff = Temporal.Instant.fromEpochMilliseconds(-275248380000);
console.log(vostok1Liftoff.toString()); // 1961-04-12T06:07:00Z
const sts1Liftoff = Temporal.Instant.fromEpochMilliseconds(355924804000);
console.log(sts1Liftoff.toString()); // 1981-04-12T12:00:04Z
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.epochMilliseconds`
- `Temporal.Instant.from()`
- `Temporal.Instant.fromEpochNanoseconds()`
- `Date.prototype.toTemporalInstant()`
