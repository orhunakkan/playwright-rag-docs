# Temporal.PlainYearMonth.prototype.toJSON()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/toJSON)

---

The **`toJSON()`** method of `Temporal.PlainYearMonth` instances returns a string representing this year-month in the same [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth#rfc_9557_format) as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js-nolint
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date in the [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth#rfc_9557_format), with the calendar annotation included if it is not `"iso8601"`.

## Description

The `toJSON()` method is automatically called by `JSON.stringify()` when a `Temporal.PlainYearMonth` object is stringified. This method is generally intended to, by default, usefully serialize `Temporal.PlainYearMonth` objects during [JSON](/en-US/docs/Glossary/JSON) serialization, which can then be deserialized using the `Temporal.PlainYearMonth.from()` function as the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const ym = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
const ymStr = ym.toJSON(); // '2021-08'
const ym2 = Temporal.PlainYearMonth.from(ymStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainYearMonth` can be serialized as JSON without extra effort, and how to parse it back.

```js
const ym = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
const ymStr = JSON.stringify({ event: ym }); // '{"event":"2021-08"}'
const obj = JSON.parse(ymStr, (key, value) => {
  if (key === "event") {
    return Temporal.PlainYearMonth.from(value);
  }
  return value;
});
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.from()`
- `Temporal.PlainYearMonth.prototype.toString()`
- `Temporal.PlainYearMonth.prototype.toLocaleString()`
