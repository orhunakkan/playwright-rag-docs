# Temporal.PlainDateTime.prototype.second

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/second](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/second)

---

The **`second`** accessor property of `Temporal.PlainDateTime` instances returns an integer from 0 to 59 representing the second component of this time.

The set accessor of `second` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainTime.prototype.second`.

## Examples

### Using second

```js
const dt = Temporal.PlainDateTime.from("2021-07-01T12:34:56.123456789");
console.log(dt.second); // 56
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.prototype.with()`
- `Temporal.PlainDateTime.prototype.add()`
- `Temporal.PlainDateTime.prototype.subtract()`
- `Temporal.PlainDateTime.prototype.millisecond`
- `Temporal.PlainDateTime.prototype.microsecond`
- `Temporal.PlainDateTime.prototype.nanosecond`
- `Temporal.PlainTime.prototype.second`
