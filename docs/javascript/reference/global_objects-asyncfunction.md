# AsyncFunction

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

---

The **`AsyncFunction`** object provides methods for [async functions](/en-US/docs/Web/JavaScript/Reference/Statements/async_function). In JavaScript, every async function is actually an `AsyncFunction` object.

Note that `AsyncFunction` is _not_ a global object. It can be obtained with the following code:

```js
const AsyncFunction = async function () {}.constructor;
```

`AsyncFunction` is a subclass of `Function`.

## Constructor

- `AsyncFunction()`
  - : Creates a new `AsyncFunction` object.

## Instance properties

_Also inherits instance properties from its parent `Function`_.

These properties are defined on `AsyncFunction.prototype` and shared by all `AsyncFunction` instances.

- `AsyncFunction.prototype.constructor`
  - : The constructor function that created the instance object. For `AsyncFunction` instances, the initial value is the `AsyncFunction` constructor.
- `AsyncFunction.prototype[Symbol.toStringTag]`
  - : The initial value of the [`[Symbol.toStringTag]`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property is the string `"AsyncFunction"`. This property is used in `Object.prototype.toString()`.

> [!NOTE]
> `AsyncFunction` instances do not have the [`prototype`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype) property.

## Instance methods

_Inherits instance methods from its parent `Function`_.

## Specifications



## Browser compatibility



## See also

- [`async function`](/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [`async function` expression](/en-US/docs/Web/JavaScript/Reference/Operators/async_function)
- `Function`
- `AsyncGeneratorFunction`
- `GeneratorFunction`
- `Functions`
