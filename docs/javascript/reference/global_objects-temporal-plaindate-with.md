# Temporal.PlainDate.prototype.with()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/with](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/with)

---

The **`with()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainDate` object representing this date with some fields replaced by new values. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the date's fields.

To replace the `calendarId` property, use the `withCalendar()` method instead.

## Syntax

```js-nolint
with(info)
with(info, options)
```

### Parameters

- `info`
  - : An object containing at least one of the properties recognized by `Temporal.PlainDate.from()` (except `calendar`): `day`, `era` and `eraYear`, `month`, `monthCode`, `year`. Unspecified properties use the values from the original date. You only need to provide one of `month` or `monthCode`, and one of `era` and `eraYear` or `year`, and the other will be updated accordingly.
- `options` (optional)
  - : An object containing the following property:
    - `overflow` (optional)
      - : A string specifying the behavior when a date component is out of range. Possible values are:
        - `"constrain"` (default)
          - : The date component is [clamped](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#invalid_date_clamping) to the valid range.
        - `"reject"`
          - : A `RangeError` is thrown if the date component is out of range.

### Return value

A new `Temporal.PlainDate` object, where the fields specified in `info` that are not `undefined` are replaced by the corresponding values, and the rest of the fields are copied from the original date.

### Exceptions

- `TypeError`
  - : Thrown in one of the following cases:
    - `info` is not an object.
    - `options` is not an object or `undefined`.
- `RangeError`
  - : Thrown in one of the following cases:
    - The provided properties that specify the same component are inconsistent.
    - The provided non-numerical properties are not valid; for example, if `monthCode` is never a valid month code in this calendar.
    - The provided numerical properties are out of range, and `options.overflow` is set to `"reject"`.
    - The result is not in the [representable range](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#representable_dates), which is ±(10<sup>8</sup> + 1) days, or about ±273,972.6 years, from the Unix epoch.

## Examples

### Using with()

```js
const date = Temporal.PlainDate.from("2021-07-06");
const newDate = date.with({ day: date.daysInMonth });
console.log(newDate.toString()); // 2021-07-31
const nextDecade = date.with({ year: date.year + 10 });
console.log(nextDecade.toString()); // 2031-07-06
```

For more examples, see the documentation for the individual properties that can be set using `with()`.

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.withCalendar()`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDate.prototype.add()`
- `Temporal.PlainDate.prototype.subtract()`
