# JavaScript reference

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

---

The JavaScript reference serves as a repository of facts about the JavaScript language. The entire language is described here in detail. As you write JavaScript code, you'll refer to these pages often (thus the title "JavaScript reference").

The JavaScript language is intended to be used within some larger environment, be it a browser, server-side scripts, or similar. For the most part, this reference attempts to be environment-agnostic and does not target a web browser environment.

If you are new to JavaScript, start with the [guide](/en-US/docs/Web/JavaScript/Guide). Once you have a firm grasp of the fundamentals, you can use the reference to get more details on individual objects and language constructs.

## Built-ins

[JavaScript standard built-in objects](/en-US/docs/Web/JavaScript/Reference/Global_Objects), along with their methods and properties.

### Value properties

- `globalThis`
- `Infinity`
- `NaN`
- `undefined`

### Function properties

- `eval()`
- `isFinite()`
- `isNaN()`
- `parseFloat()`
- `parseInt()`
- `decodeURI()`
- `decodeURIComponent()`
- `encodeURI()`
- `encodeURIComponent()`
- `escape()` **Deprecated.**
- `unescape()` **Deprecated.**

### Fundamental objects

- `Object`
- `Function`
- `Boolean`
- `Symbol`

### Error objects

- `Error`
- `AggregateError`
- `EvalError`
- `RangeError`
- `ReferenceError`
- `SuppressedError`
- `SyntaxError`
- `TypeError`
- `URIError`
- `InternalError` **Non-standard.**

### Numbers and dates

- `Number`
- `BigInt`
- `Math`
- `Date`
- `Temporal`

### Text processing

- `String`
- `RegExp`

### Indexed collections

- `Array`
- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `BigInt64Array`
- `BigUint64Array`
- `Float16Array`
- `Float32Array`
- `Float64Array`

### Keyed collections

- `Map`
- `Set`
- `WeakMap`
- `WeakSet`

### Structured data

- `ArrayBuffer`
- `SharedArrayBuffer`
- `DataView`
- `Atomics`
- `JSON`

### Managing memory

- `WeakRef`
- `FinalizationRegistry`

### Control abstraction objects

- `Iterator`
- `AsyncIterator`
- `Promise`
- `GeneratorFunction`
- `AsyncGeneratorFunction`
- `Generator`
- `AsyncGenerator`
- `AsyncFunction`
- `DisposableStack`
- `AsyncDisposableStack`

### Reflection

- `Reflect`
- `Proxy`

### Internationalization

- `Intl`
- `Intl.Collator`
- `Intl.DateTimeFormat`
- `Intl.DisplayNames`
- `Intl.DurationFormat`
- `Intl.ListFormat`
- `Intl.Locale`
- `Intl.NumberFormat`
- `Intl.PluralRules`
- `Intl.RelativeTimeFormat`
- `Intl.Segmenter`

## Statements

[JavaScript statements and declarations](/en-US/docs/Web/JavaScript/Reference/Statements)

### Control flow

- `return`
- `break`
- `continue`
- `throw`
- `if...else`
- `switch`
- `try...catch`

### Declaring variables

- `var`
- `let`
- `const`
- `using`
- `await using`

### Functions and classes

- `function`
- `function*`
- `async function`
- `async function*`
- `class`

### Iterations

- `do...while`
- `for`
- `for...in`
- `for...of`
- `for await...of`
- `while`

### Others

- `Empty`
- `Block`
- `Expression statement`
- `debugger`
- `export`
- `import`
- `label`
- `with` **Deprecated.**

## Expressions and operators

[JavaScript expressions and operators](/en-US/docs/Web/JavaScript/Reference/Operators).

### Primary expressions

- `this`
- [Literals](/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#literals)
- `[]`
- {{jsxref("Operators/Object_initializer", "{}")}}
- `function`
- `class`
- `function*`
- `async function`
- `async function*`
- `/ab+c/i`
- ``string``
- `( )`

### Left-hand-side expressions

- `Property accessors`
- `?.`
- `new`
- `new.target`
- `import.meta`
- `super`
- `import()`

### Increment and decrement

- `A++`
- `A--`
- `++A`
- `--A`

### Unary operators

- `delete`
- `void`
- `typeof`
- `+`
- `-`
- `~`
- `!`
- `await`

### Arithmetic operators

- `**`
- `*`
- `/`
- `%`
- `+` (Plus)
- `-`

### Relational operators

- `&lt;` (Less than)
- `&gt;` (Greater than)
- `&lt;=`
- `&gt;=`
- `instanceof`
- `in`

### Equality operators

- `==`
- `!=`
- `===`
- `!==`

### Bitwise shift operators

- `&lt;&lt;`
- `&gt;&gt;`
- `&gt;&gt;&gt;`

### Binary bitwise operators

- `&amp;`
- `|`
- `^`

### Binary logical operators

- `&amp;&amp;`
- `||`
- `??`

### Conditional (ternary) operator

- `(condition ? ifTrue : ifFalse)`

### Assignment operators

- `=`
- `*=`
- `/=`
- `%=`
- `+=`
- `-=`
- `&lt;&lt;=`
- `&gt;&gt;=`
- `&gt;&gt;&gt;=`
- `&amp;=`
- `^=`
- `|=`
- `**=`
- `&amp;&amp;=`
- `||=`
- `??=`
- [`[a, b] = arr`, `{ a, b } = obj`](/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)

### Yield operators

- `yield`
- `yield*`

### Spread syntax

- `...obj`

### Comma operator

- `,`

## Functions

[JavaScript functions.](/en-US/docs/Web/JavaScript/Reference/Functions)

- `Arrow Functions`
- `Default parameters`
- `Rest parameters`
- `arguments`
- `Method definitions`
- `getter`
- `setter`

## Classes

[JavaScript classes.](/en-US/docs/Web/JavaScript/Reference/Classes)

- `constructor`
- `extends`
- [Private elements](/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
- [Public class fields](/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
- `static`
- [Static initialization blocks](/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks)

## Regular expressions

[JavaScript regular expressions.](/en-US/docs/Web/JavaScript/Reference/Regular_expressions)

- [Backreference: `\1`, `\2`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference)
- [Capturing group: `(...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group)
- [Character class: `[...]`, `[^...]`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class)
- [Character class escape: `\d`, `\D`, `\w`, `\W`, `\s`, `\S`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape)
- [Character escape: `\n`, `\u{...}`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape)
- [Disjunction: `|`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction)
- [Input boundary assertion: `^`, `$`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion)
- [Literal character: `a`, `b`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character)
- [Lookahead assertion: `(?=...)`, `(?!...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion)
- [Lookbehind assertion: `(?<=...)`, `(?<!...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion)
- [Modifier: `(?ims-ims:...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier)
- [Named backreference: `\k<name>`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_backreference)
- [Named capturing group: `(?<name>...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group)
- [Non-capturing group: `(?:...)`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group)
- [Quantifier: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier)
- [Unicode character class escape: `\p{...}`, `\P{...}`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape)
- [Wildcard: `.`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Wildcard)
- [Word boundary assertion: `\b`, `\B`](/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion)

## Additional reference pages

- [JavaScript technologies overview](/en-US/docs/Web/JavaScript/Reference/JavaScript_technologies_overview)
- [Execution model](/en-US/docs/Web/JavaScript/Reference/Execution_model)
- `Lexical grammar`
- [Data types and data structures](/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [Iteration protocols](/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Trailing commas](/en-US/docs/Web/JavaScript/Reference/Trailing_commas)
- [Errors](/en-US/docs/Web/JavaScript/Reference/Errors)
- `Strict mode`
- `Deprecated features`
