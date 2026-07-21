# Intl.DateTimeFormat.prototype.formatRange()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange)

---

The **`formatRange()`** method of `Intl.DateTimeFormat` instances formats a
date range in the most concise way based on the locales and
options provided when instantiating this
`Intl.DateTimeFormat` object.



```js interactive-example
const options1 = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const options2 = { year: "2-digit", month: "numeric", day: "numeric" };

const startDate = new Date(Date.UTC(2007, 0, 10, 10, 0, 0));
const endDate = new Date(Date.UTC(2008, 0, 10, 11, 0, 0));

const dateTimeFormat = new Intl.DateTimeFormat("en", options1);
console.log(dateTimeFormat.formatRange(startDate, endDate));
// Expected output: "Wednesday, January 10, 2007 – Thursday, January 10, 2008"

const dateTimeFormat2 = new Intl.DateTimeFormat("en", options2);
console.log(dateTimeFormat2.formatRange(startDate, endDate));
// Expected output: "1/10/07 – 1/10/08"
```

## Syntax

```js-nolint
formatRange(startDate, endDate)
```

### Parameters

- `startDate`
  - : The start of the date range. Can be a `Date` or `Temporal.PlainDateTime` object. Additionally can be a `Temporal.PlainTime`, `Temporal.PlainDate`, `Temporal.PlainYearMonth`, or `Temporal.PlainMonthDay` object if the `DateTimeFormat` object was configured to print at least one relevant part of the date.
    > [!NOTE]
    > A `Temporal.ZonedDateTime` object will always throw a `TypeError`; use `Temporal.ZonedDateTime.prototype.toLocaleString()` or convert it to a `Temporal.PlainDateTime` object instead.
- `endDate`
  - : The end of the date range. Must have the same type as `startDate`.

### Return value

A string representing the given date range formatted according to the locale and formatting options of this `Intl.DateTimeFormat` object. If the start and end dates are equivalent at the precision of the output, the output will only contain a single date.

## Examples

### Basic formatRange usage

This method receives two `Date`s and formats the date range in the most
concise way based on the `locale` and `options` provided when
instantiating `Intl.DateTimeFormat`.

```js
const date1 = new Date(Date.UTC(1906, 0, 10, 10, 0, 0)); // Wed, 10 Jan 1906 10:00:00 GMT
const date2 = new Date(Date.UTC(1906, 0, 10, 11, 0, 0)); // Wed, 10 Jan 1906 11:00:00 GMT
const date3 = new Date(Date.UTC(1906, 0, 20, 10, 0, 0)); // Sat, 20 Jan 1906 10:00:00 GMT

const fmt1 = new Intl.DateTimeFormat("en", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});
console.log(fmt1.format(date1)); // '1/10/06, 10:00 AM'
console.log(fmt1.formatRange(date1, date2)); // '1/10/06, 10:00 – 11:00 AM'
console.log(fmt1.formatRange(date1, date3)); // '1/10/06, 10:00 AM – 1/20/07, 10:00 AM'

const fmt2 = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
console.log(fmt2.format(date1)); // 'Jan 10, 1906'
console.log(fmt2.formatRange(date1, date2)); // 'Jan 10, 1906'
console.log(fmt2.formatRange(date1, date3)); // 'Jan 10 – 20, 1906'
```

## Specifications



## Browser compatibility



## See also

- `Intl.DateTimeFormat`
