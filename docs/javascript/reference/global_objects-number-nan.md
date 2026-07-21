# Number.NaN

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)

---

The **`Number.NaN`** static data property represents Not-A-Number, which is equivalent to `NaN`. For more information about the behaviors of `NaN`, see the [description for the global property](/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN).



```js interactive-example
function clean(x) {
  if (x === Number.NaN) {
    // Can never be true
    return null;
  }
  if (isNaN(x)) {
    return 0;
  }
}

console.log(clean(Number.NaN));
// Expected output: 0
```

## Value

The number value `NaN`.



## Description

Because `NaN` is a static property of `Number`, you always use it as `Number.NaN`, rather than as a property of a number value.

## Examples

### Checking whether values are numeric

```js
function sanitize(x) {
  if (isNaN(x)) {
    return Number.NaN;
  }
  return x;
}
```

## Specifications



## Browser compatibility



## See also

- `NaN`
- `Number.isNaN()`
