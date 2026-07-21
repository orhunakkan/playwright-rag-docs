# Temporal.PlainTime.prototype.microsecond

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/microsecond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/microsecond)

---

The **`microsecond`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 999 representing the microsecond (10<sup>-6</sup> second) component of this time.

The set accessor of `microsecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using microsecond

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.microsecond); // 0

const time2 = Temporal.PlainTime.from("12:34:56.123456789");
console.log(time2.microsecond); // 456
```

### Changing microsecond

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ microsecond: 100 });
console.log(newTime.toString()); // 12:34:56.0001
```

You can also use `add()` or `subtract()` to move a certain number of microseconds from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ microseconds: 100 });
console.log(newTime.toString()); // 12:34:56.0001
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.second`
- `Temporal.PlainTime.prototype.millisecond`
- `Temporal.PlainTime.prototype.nanosecond`
