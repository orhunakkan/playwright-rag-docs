# TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Deprecated_caller_or_arguments_usage](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Deprecated_caller_or_arguments_usage)

---

The JavaScript [strict mode](/en-US/docs/Web/JavaScript/Reference/Strict_mode)-only exception
"'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them" occurs when the
deprecated `arguments.callee`, `Function.prototype.caller`, or `Function.prototype.arguments` properties
are used.

## Message

```plain
TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them (V8-based & Firefox)
TypeError: 'arguments', 'callee', and 'caller' cannot be accessed in this context. (Safari)
```

## Error type

`TypeError` in [strict mode](/en-US/docs/Web/JavaScript/Reference/Strict_mode) only.

## What went wrong?

In [strict mode](/en-US/docs/Web/JavaScript/Reference/Strict_mode), the `arguments.callee`,
`Function.prototype.caller`, or `Function.prototype.arguments` properties are used
and shouldn't be. They are deprecated, because they leak the function caller, are
non-standard, hard to optimize and potentially a performance-harmful feature.

## Examples

### Deprecated function.caller or arguments.callee

`Function.prototype.caller` and
[`arguments.callee`](/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee)
are deprecated (see the reference articles for more information).

```js example-bad
"use strict";

function myFunc() {
  if (myFunc.caller === null) {
    return "The function was called from the top!";
  }
  return `This function's caller was ${myFunc.caller}`;
}

myFunc();
// TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

### Function.prototype.arguments

`Function.prototype.arguments` is deprecated (see the reference article for more
information).

```js example-bad
"use strict";

function f(n) {
  g(n - 1);
}

function g(n) {
  console.log(`before: ${g.arguments[0]}`);
  if (n > 0) {
    f(n);
  }
  console.log(`after: ${g.arguments[0]}`);
}

f(2);

console.log(`returned: ${g.arguments}`);
// TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

## See also

- [Deprecated and obsolete features](/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features)
- [Strict mode](/en-US/docs/Web/JavaScript/Reference/Strict_mode)
- `Function.prototype.arguments`
- `Function.prototype.caller`
- [`arguments.callee`](/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee)
