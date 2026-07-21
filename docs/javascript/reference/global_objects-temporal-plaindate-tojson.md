# Temporal.PlainDate.prototype.toJSON()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toJSON)

---

The **`toJSON()`** method of `Temporal.PlainDate` instances returns a string representing this date in the same [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#rfc_9557_format) as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js-nolint
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date in the [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#rfc_9557_format), with the calendar annotation included if it is not `"iso8601"`.

## Description

The `toJSON()` method is automatically called by `JSON.stringify()` when a `Temporal.PlainDate` object is stringified. This method is generally intended to, by default, usefully serialize `Temporal.PlainDate` objects during [JSON](/en-US/docs/Glossary/JSON) serialization, which can then be deserialized using the `Temporal.PlainDate.from()` function as the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const date = Temporal.PlainDate.from({ year: 2021, month: 8, day: 1 });
const dateStr = date.toJSON(); // '2021-08-01'
const d2 = Temporal.PlainDate.from(dateStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainDate` can be serialized as JSON without extra effort, and how to parse it back.

```js
const date = Temporal.PlainDate.from({ year: 2021, month: 8, day: 1 });
const jsonStr = JSON.stringify({ date }); // '{"date":"2021-08-01"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "date") {
    return Temporal.PlainDate.from(value);
  }
  return value;
});
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDate.prototype.toString()`
- `Temporal.PlainDate.prototype.toLocaleString()`
