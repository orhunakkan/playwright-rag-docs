# Temporal.Instant.prototype.valueOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/valueOf)

---

The **`valueOf()`** method of `Temporal.Instant` instances throws a `TypeError`, which prevents `Temporal.Instant` instances from being [implicitly converted to primitives](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) when used in arithmetic or comparison operations.

## Syntax

```js-nolint
valueOf()
```

### Parameters

None.

### Return value

None.

### Exceptions

- `TypeError`
  - : Always thrown.

## Description

Because both [primitive conversion](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) and [number conversion](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `instant1 > instant2` would implicitly compare them as strings, which may have unexpected results. By throwing a `TypeError`, `Temporal.Instant` instances prevent such implicit conversions. You need to explicitly convert them to numbers using `Temporal.Instant.prototype.epochNanoseconds`, or use the `Temporal.Instant.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.Instant

All arithmetic and comparison operations on `Temporal.Instant` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const instant1 = Temporal.Instant.fromEpochMilliseconds(0);
const instant2 = Temporal.Instant.fromEpochMilliseconds(1000);
instant1 > instant2; // TypeError: can't convert Instant to primitive type
instant1.epochNanoseconds > instant2.epochNanoseconds; // false
Temporal.Instant.compare(instant1, instant2); // -1

instant2 - instant1; // TypeError: can't convert Instant to primitive type
instant2.since(instant1).toString(); // "PT1S"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Instant`
- `Temporal.Instant.prototype.toString()`
- `Temporal.Instant.prototype.toJSON()`
- `Temporal.Instant.prototype.toLocaleString()`
