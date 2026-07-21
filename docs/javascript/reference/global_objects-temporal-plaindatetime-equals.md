# Temporal.PlainDateTime.prototype.equals()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/equals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/equals)

---

The **`equals()`** method of `Temporal.PlainDateTime` instances returns `true` if this date-time is equivalent in value to another date-time (in a form convertible by `Temporal.PlainDateTime.from()`), and `false` otherwise. They are compared both by their date and time values and their calendars, so two date-times from different calendars may be considered equal by `Temporal.PlainDateTime.compare()` but not by `equals()`.

## Syntax

```js-nolint
equals(other)
```

### Parameters

- `other`
  - : A string, an object, or a `Temporal.PlainDateTime` instance representing the other date-time to compare. It is converted to a `Temporal.PlainDateTime` object using the same algorithm as `Temporal.PlainDateTime.from()`.

### Return value

`true` if this date-time is equal to `other` both in their date/time value and their calendar, `false` otherwise.

## Examples

### Using equals()

```js
const dt1 = Temporal.PlainDateTime.from("2021-08-01");
const dt2 = Temporal.PlainDateTime.from({ year: 2021, month: 8, day: 1 });
console.log(dt1.equals(dt2)); // true

const dt3 = Temporal.PlainDateTime.from("2021-08-01[u-ca=japanese]");
console.log(dt1.equals(dt3)); // false

const dt4 = Temporal.PlainDateTime.from("2021-08-01T01:00:00");
console.log(dt1.equals(dt4)); // false
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.compare()`
