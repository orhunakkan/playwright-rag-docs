# TypeError: More arguments needed

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/More_arguments_needed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/More_arguments_needed)

---

The JavaScript exception "more arguments needed" occurs when there is an error with how
a function is called. More arguments need to be provided.

## Message

```plain
TypeError: Object prototype may only be an Object or null: undefined (V8-based)
TypeError: Object.create requires at least 1 argument, but only 0 were passed (Firefox)
TypeError: Object.setPrototypeOf requires at least 2 arguments, but only 0 were passed (Firefox)
TypeError: Object.defineProperties requires at least 1 argument, but only 0 were passed (Firefox)
TypeError: Object prototype may only be an Object or null. (Safari)
```

## Error type

`TypeError`.

## What went wrong?

There is an error with how a function is called. More arguments need to be provided.

## Examples

### Required arguments not provided

The `Object.create()` method requires at least one argument and the
`Object.setPrototypeOf()` method requires at least two arguments:

```js example-bad
const obj = Object.create();
// TypeError: Object.create requires at least 1 argument, but only 0 were passed

const obj2 = Object.setPrototypeOf({});
// TypeError: Object.setPrototypeOf requires at least 2 arguments, but only 1 were passed
```

You can fix this by setting [`null`](/en-US/docs/Web/JavaScript/Reference/Operators/null) as the prototype, for example:

```js example-good
const obj = Object.create(null);

const obj2 = Object.setPrototypeOf({}, null);
```

## See also

- [Functions](/en-US/docs/Web/JavaScript/Guide/Functions) guide
