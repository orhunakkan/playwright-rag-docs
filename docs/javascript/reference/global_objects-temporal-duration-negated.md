# Temporal.Duration.prototype.negated()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated)

---

The **`negated()`** method of `Temporal.Duration` instances returns a new `Temporal.Duration` object with the negated value of this duration (all fields keep the same magnitude, but sign becomes reversed).

## Syntax

```js-nolint
negated()
```

### Parameters

None.

### Return value

A new `Temporal.Duration` object, where all fields have the same magnitude as this duration, but the sign is reversed (positive fields become negative, and vice versa).

## Examples

### Using negated()

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });

console.log(d1.negated().toString()); // "-PT1H30M"
console.log(d2.negated().toString()); // "PT1H30M"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.abs()`
- `Temporal.Duration.prototype.sign`
