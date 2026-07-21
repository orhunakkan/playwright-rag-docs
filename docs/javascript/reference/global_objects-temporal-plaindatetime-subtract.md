# Temporal.PlainDateTime.prototype.subtract()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/subtract](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/subtract)

---

The **`subtract()`** method of `Temporal.PlainDateTime` instances returns a new `Temporal.PlainDateTime` object representing this date-time moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).

If you want to subtract two date-times and get a duration, use `since()` or `until()` instead.

## Syntax

```js-nolint
subtract(duration)
subtract(duration, options)
```

### Parameters

- `duration`
  - : A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this date-time. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
  - : An object containing the following property:
    - `overflow` (optional)
      - : A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
          - : The date component is [clamped](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#invalid_date_clamping) to the valid range.
        - `"reject"`
          - : A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainDateTime` object representing the date-time specified by the original `PlainDateTime`, minus the duration.

### Exceptions

- `RangeError`
  - : Thrown if the result is not in the [representable range](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#representable_dates), which is ±(10<sup>8</sup> + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Description

Subtracting a duration is equivalent to [adding](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/add) its [negation](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated), so all the same considerations apply.

## Examples

### Subtracting a duration

```js
const start = Temporal.PlainDateTime.from("2022-01-01T12:34:56");
const end = start.subtract({
  years: 1,
  months: 2,
  weeks: 3,
  days: 4,
  hours: 5,
  minutes: 6,
  seconds: 7,
  milliseconds: 8,
});
console.log(end.toString()); // 2020-10-07T07:28:48.992
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.Duration`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.since()`
- `Temporal.PlainDateTime.prototype.until()`
