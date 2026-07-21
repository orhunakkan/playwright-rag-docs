# Temporal.ZonedDateTime.prototype.toJSON()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/toJSON)

---

The **`toJSON()`** method of `Temporal.ZonedDateTime` instances returns a string representing this date-time in the same [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime#rfc_9557_format) as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js-nolint
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date-time in the [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime#rfc_9557_format), with the calendar annotation included if it is not `"iso8601"`, and the offset and time zone annotation always included.

## Description

The `toJSON()` method is automatically called by `JSON.stringify()` when a `Temporal.ZonedDateTime` object is stringified. This method is generally intended to, by default, usefully serialize `Temporal.ZonedDateTime` objects during [JSON](/en-US/docs/Glossary/JSON) serialization, which can then be deserialized using the `Temporal.ZonedDateTime.from()` function as the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const zdt = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 8,
  day: 1,
  timeZone: "America/New_York",
});
const zdtStr = zdt.toJSON(); // '2021-08-01T00:00:00-04:00[America/New_York]'
const zdt2 = Temporal.ZonedDateTime.from(zdtStr);
```

### JSON serialization and parsing

This example shows how `Temporal.ZonedDateTime` can be serialized as JSON without extra effort, and how to parse it back.

```js
const zdt = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 8,
  day: 1,
  timeZone: "America/New_York",
});
const jsonStr = JSON.stringify({ meeting: zdt }); // '{"meeting":"2021-08-01T00:00:00-04:00[America/New_York]"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "meeting") {
    return Temporal.ZonedDateTime.from(value);
  }
  return value;
});
```

## Specifications



## Browser compatibility



## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.from()`
- `Temporal.ZonedDateTime.prototype.toString()`
- `Temporal.ZonedDateTime.prototype.toLocaleString()`
