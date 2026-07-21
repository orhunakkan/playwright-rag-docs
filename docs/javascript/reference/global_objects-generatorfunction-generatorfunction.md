# GeneratorFunction() constructor

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction/GeneratorFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction/GeneratorFunction)

---

> [!WARNING]
> The arguments passed to this constructor are dynamically parsed and executed as JavaScript.
> APIs like this are known as [injection sinks](/en-US/docs/Web/API/Trusted_Types_API#concepts_and_usage), and are potentially a vector for [cross-site-scripting (XSS)](/en-US/docs/Web/Security/Attacks/XSS) attacks.
>
> You can mitigate this risk by always passing `TrustedScript` objects instead of strings and [enforcing trusted types](/en-US/docs/Web/API/Trusted_Types_API#using_a_csp_to_enforce_trusted_types).
>
> See [Security considerations](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function#security_considerations) in the `Function()` constructor reference for more information.

The **`GeneratorFunction()`** constructor creates `GeneratorFunction` objects.

Note that `GeneratorFunction` is _not_ a global object. It can be obtained with the following code:

```js
const GeneratorFunction = function* () {}.constructor;
```

The `GeneratorFunction()` constructor is not intended to be used directly, and all caveats mentioned in the `Function()` description apply to `GeneratorFunction()`.

## Syntax

```js-nolint
new GeneratorFunction(functionBody)
new GeneratorFunction(arg1, functionBody)
new GeneratorFunction(arg1, arg2, functionBody)
new GeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)

GeneratorFunction(functionBody)
GeneratorFunction(arg1, functionBody)
GeneratorFunction(arg1, arg2, functionBody)
GeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)
```

> [!NOTE]
> `GeneratorFunction()` can be called with or without [`new`](/en-US/docs/Web/JavaScript/Reference/Operators/new). Both create a new `GeneratorFunction` instance.

### Parameters

See `Function()`.

## Examples

Note that these examples omit the use of trusted types for brevity. For code showing the recommended approach, see [Using `TrustedScript`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#using_trustedscript) in `eval()`.

### Creating and using a GeneratorFunction() constructor

```js
const GeneratorFunction = function* () {}.constructor;
const g = new GeneratorFunction("a", "yield a * 2");
const iterator = g(10);
console.log(iterator.next().value); // 20
```

## Specifications



## Browser compatibility



## See also

- [`function*`](/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [`function*` expression](/en-US/docs/Web/JavaScript/Reference/Operators/function*)
- [`Function()` constructor](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)
- [Iterators and generators](/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) guide
- `Functions`
