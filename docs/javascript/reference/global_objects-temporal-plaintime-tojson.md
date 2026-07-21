# Temporal.PlainTime.prototype.toJSON()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/toJSON)

---

The **`toJSON()`** method of `Temporal.PlainTime` instances returns a string representing this time in the same [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime#rfc_9557_format) as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js-nolint
toJSON()
```

### Parameters

None.

### Return value

A string representing the given time in the [RFC 9557 format](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime#rfc_9557_format).

## Description

The `toJSON()` method is automatically called by `JSON.stringify()` when a `Temporal.PlainTime` object is stringified. This method is generally intended to, by default, usefully serialize `Temporal.PlainTime` objects during [JSON](/en-US/docs/Glossary/JSON) serialization, which can then be deserialized using the `Temporal.PlainTime.from()` function as the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const time = Temporal.PlainTime.from({ hour: 12, minute: 34, second: 56 });
const timeStr = time.toJSON(); // '12:34:56'
const t2 = Temporal.PlainTime.from(timeStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainTime` can be serialized as JSON without extra effort, and how to parse it back.

```js
const time = Temporal.PlainTime.from({ hour: 12, minute: 34, second: 56 });
const jsonStr = JSON.stringify({ time }); // '{"time":"12:34:56"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "time") {
    return Temporal.PlainTime.from(value);
  }
  return value;
});
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.from()`
- `Temporal.PlainTime.prototype.toString()`
- `Temporal.PlainTime.prototype.toLocaleString()`
