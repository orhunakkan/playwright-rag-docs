# Temporal.Duration.prototype.valueOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/valueOf)

---

The **`valueOf()`** method of `Temporal.Duration` instances throws a `TypeError`, which prevents `Temporal.Duration` instances from being [implicitly converted to primitives](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) when used in arithmetic or comparison operations.

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

Because both [primitive conversion](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) and [number conversion](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `duration1 > duration2` would implicitly compare them as strings, which may have unexpected results such as `"PT3S" > "PT1M"`. By throwing a `TypeError`, `Temporal.Duration` instances prevent such implicit conversions. You need to explicitly convert them to numbers using `Temporal.Duration.prototype.total()`, or use the `Temporal.Duration.compare()` static method to compare them.

## Examples

### Arithmetic and comparison operations on Temporal.Duration

All arithmetic and comparison operations on `Temporal.Duration` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const duration1 = Temporal.Duration.from({ seconds: 3 });
const duration2 = Temporal.Duration.from({ minutes: 1 });
duration1 > duration2; // TypeError: can't convert Duration to primitive type
duration1.total("seconds") > duration2.total("seconds"); // false
Temporal.Duration.compare(duration1, duration2); // -1

duration1 + duration2; // TypeError: can't convert Duration to primitive type
duration1.total("seconds") + duration2.total("seconds"); // 63
duration1.add(duration2).toString(); // "PT1M3S"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.Duration`
- `Temporal.Duration.prototype.toString()`
- `Temporal.Duration.prototype.toJSON()`
- `Temporal.Duration.prototype.toLocaleString()`
