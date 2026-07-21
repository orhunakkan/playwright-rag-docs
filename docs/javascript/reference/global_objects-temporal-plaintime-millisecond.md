# Temporal.PlainTime.prototype.millisecond

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/millisecond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/millisecond)

---

The **`millisecond`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 999 representing the millisecond (10<sup>-3</sup> second) component of this time.

The set accessor of `millisecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using millisecond

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.millisecond); // 0

const time2 = Temporal.PlainTime.from("12:34:56.123456789");
console.log(time2.millisecond); // 123
```

### Changing millisecond

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ millisecond: 100 });
console.log(newTime.toString()); // 12:34:56.1
```

You can also use `add()` or `subtract()` to move a certain number of milliseconds from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ milliseconds: 100 });
console.log(newTime.toString()); // 12:34:56.1
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.second`
- `Temporal.PlainTime.prototype.microsecond`
- `Temporal.PlainTime.prototype.nanosecond`
