# Temporal.PlainDate.prototype.withCalendar()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/withCalendar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/withCalendar)

---

The **`withCalendar()`** method of `Temporal.PlainDate` instances returns a new `Temporal.PlainDate` object representing this date interpreted in the new calendar system. Because all `Temporal` objects are designed to be immutable, this method essentially functions as the setter for the date's `calendarId` property.

To replace the date component properties, use the `with()` method instead.

## Syntax

```js-nolint
withCalendar(calendar)
```

### Parameters

- `calendar`
  - : A string that corresponds to the `calendarId` property. See [`Intl.supportedValuesOf()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#supported_calendar_types) for a list of commonly supported calendar types.

### Return value

A new `Temporal.PlainDate` object, representing the date specified by the original `PlainDate`, interpreted in the new calendar system.

### Exceptions

- `TypeError`
  - : Thrown if `calendar` is not a string.
- `RangeError`
  - : Thrown if `calendar` is not a valid calendar identifier.

## Examples

### Using withCalendar()

```js
const date = Temporal.PlainDate.from("2021-07-01");
const newDate = date.withCalendar("islamic-umalqura");
console.log(newDate.toLocaleString("en-US", { calendar: "islamic-umalqura" }));
// 11/21/1442 AH
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.prototype.with()`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDate.prototype.calendarId`
