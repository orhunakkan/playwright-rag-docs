# RegExp.prototype.multiline

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline)

---

The **`multiline`** accessor property of `RegExp` instances returns whether or not the `m` flag is used with this regular expression.



```js interactive-example
const regex1 = /^football/;
const regex2 = /^football/m;

console.log(regex1.multiline);
// Expected output: false

console.log(regex2.multiline);
// Expected output: true

console.log(regex1.test("rugby\nfootball"));
// Expected output: false

console.log(regex2.test("rugby\nfootball"));
// Expected output: true
```

## Description

`RegExp.prototype.multiline` has the value `true` if the `m` flag was used; otherwise, `false`. The `m` flag indicates that a multiline input string should be treated as multiple lines. For example, if `m` is used, `^` and `$` change from matching at only the start or end of the entire string to the start or end of any line within the string.

The set accessor of `multiline` is `undefined`. You cannot change this property directly.

## Examples

### Using multiline

```js
const regex = /^foo/m;

console.log(regex.multiline); // true
```

## Specifications



## Browser compatibility



## See also

- `RegExp.prototype.lastIndex`
- `RegExp.prototype.dotAll`
- `RegExp.prototype.global`
- `RegExp.prototype.hasIndices`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.source`
- `RegExp.prototype.sticky`
- `RegExp.prototype.unicode`
