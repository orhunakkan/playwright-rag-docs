# Error: fileName

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName)

---

The **`fileName`** data property of an `Error` instance contains the path to the file that raised this error.

## Value

A string.



## Description

This non-standard property contains the path to the file that raised this error. If called from a debugger context, the Firefox Developer Tools for example, "debugger eval code" is returned.

## Examples

### Using fileName

```js
const e = new Error("Could not parse input");
throw e;
// e.fileName could look like "file:///C:/example.html"
```

## Specifications

Not part of any standard.

## Browser compatibility



## See also

- `Error.prototype.stack`
- `Error.prototype.columnNumber`
- `Error.prototype.lineNumber`
