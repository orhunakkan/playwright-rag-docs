# Symbol.search

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/search](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/search)

---

The **`Symbol.search`** static data property represents the [well-known symbol](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols) `Symbol.search`. The `String.prototype.search()` method looks up this symbol on its first argument for the method that returns the index within a string that matches the current object.

For more information, see [`RegExp.prototype[Symbol.search]()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.search) and `String.prototype.search()`.



```js interactive-example
class Search1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}

console.log("foobar".search(new Search1("bar")));
// Expected output: 3
```

## Value

The well-known symbol `Symbol.search`.



## Examples

### Custom string search

```js
class CaseInsensitiveSearch {
  constructor(value) {
    this.value = value.toLowerCase();
  }
  [Symbol.search](string) {
    return string.toLowerCase().indexOf(this.value);
  }
}

console.log("foobar".search(new CaseInsensitiveSearch("BaR"))); // 3
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `Symbol.search` in `core-js`](https://github.com/zloirock/core-js#ecmascript-symbol)
- `Symbol.match`
- `Symbol.matchAll`
- `Symbol.replace`
- `Symbol.split`
- `String.prototype.search()`
- [`RegExp.prototype[Symbol.search]()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.search)
