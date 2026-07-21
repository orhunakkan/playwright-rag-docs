# Symbol.replace

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace)

---

The **`Symbol.replace`** static data property represents the [well-known symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols) `Symbol.replace`. The `String.prototype.replace()` and `String.prototype.replaceAll()` methods look up this symbol on their first argument for the method that replaces substrings matched by the current object.

For more information, see [`RegExp.prototype[Symbol.replace]()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.replace), `String.prototype.replace()`, and `String.prototype.replaceAll()`.



```js interactive-example
class Replace1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return `s/${string}/${this.value}/g`;
  }
}

console.log("foo".replace(new Replace1("bar")));
// Expected output: "s/foo/bar/g"
```

## Value

The well-known symbol `Symbol.replace`.



## Examples

### Using Symbol.replace

<!-- cSpell:ignore tball -->

```js
class CustomReplacer {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return string.replace(this.value, "#!@?");
  }
}

console.log("football".replace(new CustomReplacer("foo"))); // "#!@?tball"
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Symbol.replace` in `core-js`](https://github.com/zloirock/core-js#ecmascript-symbol)
- `Symbol.match`
- `Symbol.matchAll`
- `Symbol.search`
- `Symbol.split`
- `String.prototype.replace()`
- `String.prototype.replaceAll()`
- [`RegExp.prototype[Symbol.replace]()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.replace)
