# Temporal.ZonedDateTime.prototype.epochMilliseconds

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/epochMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/epochMilliseconds)

---

The **`epochMilliseconds`** accessor property of `Temporal.ZonedDateTime` instances returns an integer representing the number of milliseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant. It is equivalent to dividing `epochNanoseconds` by `1e6` and flooring the result.

The set accessor of `epochMilliseconds` is `undefined`. You cannot change this property directly. To create a new `Temporal.ZonedDateTime` object with the desired new `epochMilliseconds` value, see below.

## Examples

### Using epochMilliseconds

```js
const zdt = Temporal.ZonedDateTime.from("2021-08-01T12:34:56.789Z[UTC]");
console.log(zdt.epochMilliseconds); // 1627821296789

const zdt2 = Temporal.ZonedDateTime.from("1969-08-01T12:34:56.789Z[UTC]");
console.log(zdt2.epochMilliseconds); // -13173903211
```

### Creating a ZonedDateTime object from an epochMilliseconds value

You can create a `Temporal.ZonedDateTime` object from an `epochMilliseconds` value by first constructing a `Temporal.Instant` object using `Temporal.Instant.fromEpochMilliseconds()`, and then converting it to a `Temporal.ZonedDateTime` object using `Temporal.Instant.prototype.toZonedDateTimeISO()`:

```js
const epochMilliseconds = 1627821296789;
const instant = Temporal.Instant.fromEpochMilliseconds(epochMilliseconds);
const zdt = instant.toZonedDateTimeISO("UTC");
console.log(zdt.toString()); // 2021-08-01T12:34:56.789+00:00[UTC]
```

Alternatively, use the `Temporal.ZonedDateTime()` constructor, but convert the milliseconds to nanoseconds first:

```js
const epochMilliseconds = 1627821296789;
const epochNanoseconds = BigInt(epochMilliseconds) * 1_000_000n;
const zdt = new Temporal.ZonedDateTime(epochNanoseconds, "UTC");
console.log(zdt.toString()); // 2021-08-01T12:34:56.789+00:00[UTC]
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.epochNanoseconds`
