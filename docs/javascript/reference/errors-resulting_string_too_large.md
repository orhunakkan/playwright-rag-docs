# RangeError: repeat count must be less than infinity

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Resulting_string_too_large](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Resulting_string_too_large)

---

The JavaScript exception "repeat count must be less than infinity" occurs when the
`String.prototype.repeat()` method is used with a `count`
argument that is infinity.

## Message

```plain
RangeError: Invalid string length (V8-based)
RangeError: Invalid count value: Infinity (V8-based)
RangeError: repeat count must be less than infinity and not overflow maximum string size (Firefox)
RangeError: Out of memory (Safari)
RangeError: String.prototype.repeat argument must be greater than or equal to 0 and not be Infinity (Safari)
```

## Error type

`RangeError`

## What went wrong?

The `String.prototype.repeat()` method has been used. It has a
`count` parameter indicating the number of times to repeat the string. It
must be between 0 and less than positive `Infinity` and cannot be a negative
number. The range of allowed values can be described like this: \[0, +∞).

The resulting string can also not be larger than the maximum string size, which can
differ in JavaScript engines. In Firefox (SpiderMonkey) the maximum string size is
2<sup>30</sup> - 2 (\~2GiB).

## Examples

### Invalid cases

```js example-bad
"abc".repeat(Infinity); // RangeError
"a".repeat(2 ** 30); // RangeError
```

### Valid cases

```js example-good
"abc".repeat(0); // ''
"abc".repeat(1); // 'abc'
"abc".repeat(2); // 'abcabc'
"abc".repeat(3.5); // 'abcabcabc' (count will be converted to integer)
```

## See also

- `String.prototype.repeat()`
