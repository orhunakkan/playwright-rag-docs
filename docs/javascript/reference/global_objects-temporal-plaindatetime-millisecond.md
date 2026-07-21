# Temporal.PlainDateTime.prototype.millisecond

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/millisecond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/millisecond)

---

The **`millisecond`** accessor property of `Temporal.PlainDateTime` instances returns an integer from 0 to 999 representing the millisecond (10<sup>-3</sup> second) component of this time.

The set accessor of `millisecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainTime.prototype.millisecond`.

## Examples

### Using millisecond

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56.123456789");
console.log(dt.millisecond); // 123
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.second`
- `Temporal.PlainDateTime.prototype.microsecond`
- `Temporal.PlainDateTime.prototype.nanosecond`
- `Temporal.PlainTime.prototype.millisecond`
