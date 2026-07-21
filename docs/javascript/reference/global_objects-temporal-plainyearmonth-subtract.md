# Temporal.PlainYearMonth.prototype.subtract()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/subtract](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/subtract)

---

The **`subtract()`** method of `Temporal.PlainYearMonth` instances returns a new `Temporal.PlainYearMonth` object representing this year-month moved backward by a given duration (in a form convertible by `Temporal.Duration.from()`).

If you want to subtract two year-months and get a duration, use `since()` or `until()` instead.

## Syntax

```js-nolint
subtract(duration)
subtract(duration, options)
```

### Parameters

- `duration`
  - : A string, an object, or a `Temporal.Duration` instance representing a duration to subtract from this year-month. It is converted to a `Temporal.Duration` object using the same algorithm as `Temporal.Duration.from()`.
- `options` (optional)
  - : An object containing the following property:
    - `overflow` (optional)
      - : A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
          - : The date component is [clamped](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#invalid_date_clamping) to the valid range.
        - `"reject"`
          - : A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainYearMonth` object representing the year-month specified by the original `PlainYearMonth`, minus the duration.

### Exceptions

- `RangeError`
  - : Thrown if the result is not in the [representable range](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#representable_dates), which is ±(10<sup>8</sup> + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Description

Subtracting a duration is equivalent to [adding](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/add) its [negation](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/negated), so all the same considerations apply. Subtracting a positive duration starts from the end of the year-month and moves backward, so any increment smaller than the month's length is ignored.

## Examples

### Subtracting a duration

```js
const start = Temporal.PlainYearMonth.from("2022-01");
const end = start.subtract({ years: 1, months: 2, weeks: 3, days: 4 });
console.log(end.toString()); // 2020-11
```

For more examples, see `add()`.

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.Duration`
- `Temporal.PlainYearMonth.prototype.add()`
- `Temporal.PlainYearMonth.prototype.since()`
- `Temporal.PlainYearMonth.prototype.until()`
