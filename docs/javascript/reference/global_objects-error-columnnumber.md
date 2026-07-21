# Error: columnNumber

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber)

---

The **`columnNumber`** data property of an `Error` instance contains the column number in the line of the file that raised this error.

## Value

A positive integer.



## Examples

### Using columnNumber

```js
try {
  throw new Error("Could not parse input");
} catch (err) {
  console.log(err.columnNumber); // 9
}
```

## Specifications

Not part of any standard.

## Browser compatibility



## See also

- `Error.prototype.stack`
- `Error.prototype.lineNumber`
- `Error.prototype.fileName`
