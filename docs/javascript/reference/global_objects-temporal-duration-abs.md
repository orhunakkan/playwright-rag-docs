# Temporal.Duration.prototype.abs()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/abs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/abs)

---

The **`abs()`** method of `Temporal.Duration` instances returns a new `Temporal.Duration` object with the absolute value of this duration (all fields have the same magnitude, but sign becomes positive).

## Syntax

```js-nolint
abs()
```

### Parameters

None.

### Return value

A new `Temporal.Duration` object with the absolute value of this duration, which is either the same as this duration if it is already positive, or its [negation](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated) if it is negative.

## Examples

### Using abs()

```js
const d1 = Temporal.Duration.from({ hours: 1, minutes: 30 });
const d2 = Temporal.Duration.from({ hours: -1, minutes: -30 });

console.log(d1.abs().toString()); // "PT1H30M"
console.log(d2.abs().toString()); // "PT1H30M"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.negated()`
- `Temporal.Duration.prototype.sign`
