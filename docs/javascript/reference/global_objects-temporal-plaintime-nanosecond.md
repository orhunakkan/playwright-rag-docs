# Temporal.PlainTime.prototype.nanosecond

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/nanosecond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/nanosecond)

---

The **`nanosecond`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 999 representing the nanosecond (10<sup>-9</sup> second) component of this time.

The set accessor of `nanosecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using nanosecond

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.nanosecond); // 0

const time2 = Temporal.PlainTime.from("12:34:56.123456789");
console.log(time2.nanosecond); // 789
```

### Changing nanosecond

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ nanosecond: 100 });
console.log(newTime.toString()); // 12:34:56.0000001
```

You can also use `add()` or `subtract()` to move a certain number of nanoseconds from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ nanoseconds: 100 });
console.log(newTime.toString()); // 12:34:56.0000001
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
- `Temporal.PlainTime.prototype.microsecond`
