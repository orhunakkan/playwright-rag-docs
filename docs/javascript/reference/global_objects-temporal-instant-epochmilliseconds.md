# Temporal.Instant.prototype.epochMilliseconds

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/epochMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/epochMilliseconds)

---

The **`epochMilliseconds`** accessor property of `Temporal.Instant` instances returns an integer representing the number of milliseconds elapsed since the Unix epoch (midnight at the beginning of January 1, 1970, UTC) to this instant. It is equivalent to dividing `epochNanoseconds` by `1e6` and flooring the result.

The set accessor of `epochMilliseconds` is `undefined`. You cannot change this property directly. To create a new `Temporal.Instant` object with the desired new `epochMilliseconds` value, use the `Temporal.Instant.fromEpochMilliseconds()` static method instead.

## Examples

### Using epochMilliseconds

```js
const instant = Temporal.Instant.from("2021-08-01T12:34:56.789Z");
console.log(instant.epochMilliseconds); // 1627821296789

const instant2 = Temporal.Instant.from("1969-08-01T12:34:56.789Z");
console.log(instant2.epochMilliseconds); // -13173903211
```

### Changing epochMilliseconds

This is the method that allows you to move by any amount of time:

```js
const instant = Temporal.Instant.from("2021-08-01T12:34:56.789Z");
const instant1hourLater = instant.add({ hours: 1 });
console.log(instant1hourLater.epochMilliseconds); // 1627824896789
```

If you already know the change in milliseconds, you can also directly construct a new `Temporal.Instant` object:

```js
const instant = Temporal.Instant.from("2021-08-01T12:34:56.789Z");
const instant1hourLater = Temporal.Instant.fromEpochMilliseconds(
  instant.epochMilliseconds + 3600000,
);
console.log(instant1hourLater.epochMilliseconds); // 1627824896789
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.epochNanoseconds`
- `Temporal.Instant.fromEpochMilliseconds()`
