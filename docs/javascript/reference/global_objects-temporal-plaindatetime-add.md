# Temporal.PlainDateTime.prototype.add()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/add](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/add)

---

The **`add()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainDateTime` object representing this date-time moved forward by a given duration (in a form convertible by `Temporal.Duration.from()`).

## Syntax

```js-nolint
add(duration)
add(duration, options)
```

### Parameters

- `duration`
  - : A string, an object, or a `Temporal.Duration` instance representing a duration to add to this date-time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
  - : An object containing the following property:
    - `overflow` (optional)
      - : A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
          - : The date component is [clamped](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#invalid_date_clamping) to the valid range.
        - `"reject"`
          - : A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainDateTime` object representing the date-time specified by the original `PlainDateTime`, plus the duration.

### Exceptions

- `RangeError`
  - : Thrown if the result is not in the [representable range](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#representable_dates), which is ±(10<sup>8</sup> + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Description

For how [calendar durations](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration#calendar_durations) are added, see `Temporal.PlainDate.prototype.add()`.

Adding a duration is equivalent to [subtracting](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/subtract) its [negation](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated).

## Examples

### Adding a duration

```js
const start = Temporal.PlainDateTime.from("2021-01-01T12:34:56");
const end = start.add({
  years: 1,
  months: 2,
  weeks: 3,
  days: 4,
  hours: 5,
  minutes: 6,
  seconds: 7,
  milliseconds: 8,
});
console.log(end.toString()); // 2022-03-26T17:41:03.008
```

For more examples, especially with how different calendars and the `overflow` option interact with calendar durations, see `Temporal.PlainDate.prototype.add()`.

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.Duration`
- `Temporal.PlainDateTime.prototype.subtract()`
