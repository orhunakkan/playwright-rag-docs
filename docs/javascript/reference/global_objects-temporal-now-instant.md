# Temporal.Now.instant()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now/instant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now/instant)

---

The **`Temporal.Now.instant()`** static method returns the current time as a `Temporal.Instant` object.

## Syntax

```js-nolint
Temporal.Now.instant()
```

### Parameters

None.

### Return value

A `Temporal.Instant` object representing the current time, with potentially [reduced precision](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now#reduced_time_precision).

## Examples

### Measuring time elapsed

The following example measures two instants in time and calculates the [duration](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration) between them, and gets the total duration in milliseconds:

```js
const start = Temporal.Now.instant();
// Do something that takes time
const end = Temporal.Now.instant();
const duration = end.since(start);
console.log(duration.total("milliseconds"));
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Now`
- `Temporal.Instant`
