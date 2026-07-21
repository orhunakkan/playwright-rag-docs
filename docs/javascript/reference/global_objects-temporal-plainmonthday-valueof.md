# Temporal.PlainMonthDay.prototype.valueOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainMonthDay/valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainMonthDay/valueOf)

---

The **`valueOf()`** method of `Temporal.PlainMonthDay` instances throws a `TypeError`, which prevents `Temporal.PlainMonthDay` instances from being [implicitly converted to primitives](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) when used in arithmetic or comparison operations.

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

Because both [primitive conversion](/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion) and [number conversion](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) call `valueOf()` before `toString()`, if `valueOf()` is absent, then an expression like `monthDay1 > monthDay2` would implicitly compare them as strings, which may have unexpected results. By throwing a `TypeError`, `Temporal.PlainMonthDay` instances prevent such implicit conversions. You need to explicitly convert them to strings using `Temporal.PlainMonthDay.prototype.toString()`.

## Examples

### Arithmetic and comparison operations on Temporal.PlainMonthDay

All arithmetic and comparison operations on `Temporal.PlainMonthDay` instances should use the dedicated methods or convert them to primitives explicitly.

```js
const md1 = Temporal.PlainMonthDay.from("01-01");
const md2 = Temporal.PlainMonthDay.from("07-01");
md1 > md2; // TypeError: can't convert PlainMonthDay to primitive type
Temporal.PlainDate.compare(
  md1.toPlainDate({ year: 2021 }),
  md2.toPlainDate({ year: 2021 }),
); // -1

md2 - md1; // TypeError: can't convert PlainMonthDay to primitive type
md2
  .toPlainDate({ year: 2021 })
  .since(md1.toPlainDate({ year: 2021 }))
  .toString(); // "P181D"
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainMonthDay.prototype.toString()`
- `Temporal.PlainMonthDay.prototype.toJSON()`
- `Temporal.PlainMonthDay.prototype.toLocaleString()`
