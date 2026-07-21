# Temporal.PlainDate.prototype.calendarId

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/calendarId](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/calendarId)

---

The **`calendarId`** accessor property of `Temporal.PlainDate` instances returns a string representing the [calendar](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#calendars) used to interpret the internal ISO 8601 date.

See [`Intl.supportedValuesOf()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#supported_calendar_types) for a list of commonly supported calendar types.

The set accessor of `calendarId` is `undefined`. You cannot change this property directly. Use the `withCalendar()` method to create a new `Temporal.PlainDate` object with the desired new value.

## Examples

### Using calendarId

```js
const date = Temporal.PlainDate.from("2021-07-01");
console.log(date.calendarId); // "iso8601"; default

const date2 = Temporal.PlainDate.from("2021-07-01[u-ca=chinese]");
console.log(date2.calendarId); // "chinese"

const date3 = date2.withCalendar("hebrew");
console.log(date3.calendarId); // "hebrew"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
