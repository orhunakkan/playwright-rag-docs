# Temporal.PlainTime.prototype.hour

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/hour](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/hour)

---

The **`hour`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 23 representing the hour component of this time.

The set accessor of `hour` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using hour

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.hour); // 12
```

### Changing hour

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ hour: 15 });
console.log(newTime.toString()); // 15:34:56
```

You can also use `add()` or `subtract()` to move a certain number of hours from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ hours: 3 });
console.log(newTime.toString()); // 15:34:56
```

## Specifications



## Browser compatibility



## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
