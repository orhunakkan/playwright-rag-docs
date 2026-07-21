# Error: lineNumber

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber)

---

The **`lineNumber`** data property of an `Error` instance contains the line number in the file that raised this error.

## Value

A positive integer.



## Examples

### Using lineNumber

```js
try {
  throw new Error("Could not parse input");
} catch (err) {
  console.log(err.lineNumber); // 2
}
```

### Alternative example using error event

```js
window.addEventListener("error", (e) => {
  console.log(e.lineNumber); // 5
});
const e = new Error("Could not parse input");
throw e;
```

This is not a standard feature and lacks widespread support. See the browser compatibility table below.

## Specifications

Not part of any standard.

## Browser compatibility



## See also

- `Error.prototype.stack`
- `Error.prototype.columnNumber`
- `Error.prototype.fileName`
