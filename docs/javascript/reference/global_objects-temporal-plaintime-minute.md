# Temporal.PlainTime.prototype.minute

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/minute](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/minute)

---

The **`minute`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 59 representing the minute component of this time.

The set accessor of `minute` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using minute

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.minute); // 34
```

### Changing minute

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ minute: 58 });
console.log(newTime.toString()); // 12:58:56
```

You can also use `add()` or `subtract()` to move a certain number of minutes from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ minutes: 24 });
console.log(newTime.toString()); // 12:58:56
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
