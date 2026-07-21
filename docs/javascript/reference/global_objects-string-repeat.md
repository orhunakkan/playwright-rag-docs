# String.prototype.repeat()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)

---

The **`repeat()`** method of `String` values constructs and returns a new string
which contains the specified number of copies of this string, concatenated together.



```js interactive-example
const mood = "Happy! ";

console.log(`I feel ${mood.repeat(3)}`);
// Expected output: "I feel Happy! Happy! Happy! "
```

## Syntax

```js-nolint
repeat(count)
```

### Parameters

- `count`
  - : An integer between `0` and `Infinity`, indicating the number of times to repeat the string.

### Return value

A new string containing the specified number of copies of the given string.

### Exceptions

- `RangeError`
  - : Thrown if `count` is negative or if `count` overflows maximum string length.

## Examples

### Using repeat()

```js
"abc".repeat(-1); // RangeError
"abc".repeat(0); // ''
"abc".repeat(1); // 'abc'
"abc".repeat(2); // 'abcabc'
"abc".repeat(3.5); // 'abcabcabc' (count will be converted to integer)
"abc".repeat(1 / 0); // RangeError

({ toString: () => "abc", repeat: String.prototype.repeat }).repeat(2);
// 'abcabc' (repeat() is a generic method)
```

## Specifications



## Browser compatibility



## See also

- [Polyfill of `String.prototype.repeat` in `core-js`](https://github.com/zloirock/core-js#ecmascript-string-and-regexp)
- [es-shims polyfill of `String.prototype.repeat`](https://www.npmjs.com/package/string.prototype.repeat)
- `String.prototype.concat()`
