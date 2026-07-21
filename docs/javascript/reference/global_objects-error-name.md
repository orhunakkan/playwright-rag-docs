# Error.prototype.name

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)

---

The **`name`** data property of `Error.prototype` is shared by all `Error` instances. It represents the name for the type of error. For `Error.prototype.name`, the initial value is `"Error"`. Subclasses like `TypeError` and `SyntaxError` provide their own `name` properties.

## Value

A string. For `Error.prototype.name`, the initial value is `"Error"`.



## Description

By default, `Error` instances are given the name "Error". The `name` property, in addition to the `message` property, is used by the `Error.prototype.toString()` method to create a string representation of the error.

## Examples

### Throwing a custom error

```js
const e = new Error("Malformed input"); // e.name is 'Error'

e.name = "ParseError";
throw e;
// e.toString() would return 'ParseError: Malformed input'
```

## Specifications



## Browser compatibility



## See also

- `Error.prototype.message`
- `Error.prototype.toString()`
