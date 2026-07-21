# Expressions and operators

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

---

This chapter documents all the JavaScript language operators, expressions and keywords.

## Expressions and operators by category

For an alphabetical listing see the sidebar on the left.

### Primary expressions

Basic keywords and general expressions in JavaScript. These expressions have the highest precedence (higher than [operators](/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)).

- `this`
  - : The `this` keyword refers to a special property of an execution context.
- [Literals](/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#literals)
  - : Basic `null`, boolean, number, and string literals.
- `[]`
  - : Array initializer/literal syntax.
- {{jsxref("Operators/Object_initializer", "{}")}}
  - : Object initializer/literal syntax.
- `function`
  - : The `function` keyword defines a function expression.
- `class`
  - : The `class` keyword defines a class expression.
- `function*`
  - : The `function*` keyword defines a generator function expression.
- `async function`
  - : The `async function` defines an async function expression.
- `async function*`
  - : The `async function*` keywords define an async generator function expression.
- `/ab+c/i`
  - : Regular expression literal syntax.
- ``string``
  - : Template literal syntax.
- `( )`
  - : Grouping operator.

### Left-hand-side expressions

Left values are the destination of an assignment.

- `Property accessors`
  - : Member operators provide access to a property or method of an object (`object.property` and `object["property"]`).
- `?.`
  - : The optional chaining operator returns `undefined` instead of causing an error if a reference is [nullish](/en-US/docs/Glossary/Nullish) ([`null`](/en-US/docs/Web/JavaScript/Reference/Operators/null) or [`undefined`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).
- `new`
  - : The `new` operator creates an instance of a constructor.
- `new.target`
  - : In constructors, `new.target` refers to the constructor that was invoked by `new`.
- `import.meta`
  - : An object exposing context-specific metadata to a JavaScript module.
- `super`
  - : The `super` keyword calls the parent constructor or allows accessing properties of the parent object.
- `import()`
  - : The `import()` syntax allows loading a module asynchronously and dynamically into a potentially non-module environment.

### Increment and decrement

Postfix/prefix increment and postfix/prefix decrement operators.

- `A++`
  - : Postfix increment operator.
- `A--`
  - : Postfix decrement operator.
- `++A`
  - : Prefix increment operator.
- `--A`
  - : Prefix decrement operator.

### Unary operators

A unary operation is an operation with only one operand.

- `delete`
  - : The `delete` operator deletes a property from an object.
- `void`
  - : The `void` operator evaluates an expression and discards its return value.
- `typeof`
  - : The `typeof` operator determines the type of a given object.
- `+`
  - : The unary plus operator converts its operand to Number type.
- `-`
  - : The unary negation operator converts its operand to Number type and then negates it.
- `~`
  - : Bitwise NOT operator.
- `!`
  - : Logical NOT operator.
- `await`
  - : Pause and resume an async function and wait for the promise's fulfillment/rejection.

### Arithmetic operators

Arithmetic operators take numerical values (either literals or variables) as their operands and return a single numerical value.

- `**`
  - : Exponentiation operator.
- `*`
  - : Multiplication operator.
- `/`
  - : Division operator.
- `%`
  - : Remainder operator.
- `+` (Plus)
  - : Addition operator.
- `-`
  - : Subtraction operator.

### Relational operators

A comparison operator compares its operands and returns a boolean value based on whether the comparison is true.

- `&lt;` (Less than)
  - : Less than operator.
- `&gt;` (Greater than)
  - : Greater than operator.
- `&lt;=`
  - : Less than or equal operator.
- `&gt;=`
  - : Greater than or equal operator.
- `instanceof`
  - : The `instanceof` operator determines whether an object is an instance of another object.
- `in`
  - : The `in` operator determines whether an object has a given property.

> [!NOTE]
> `=>` is not an operator, but the notation for [Arrow functions](/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

### Equality operators

The result of evaluating an equality operator is always of type boolean based on whether the comparison is true.

- `==`
  - : Equality operator.
- `!=`
  - : Inequality operator.
- `===`
  - : Strict equality operator.
- `!==`
  - : Strict inequality operator.

### Bitwise shift operators

Operations to shift all bits of the operand.

- `&lt;&lt;`
  - : Bitwise left shift operator.
- `&gt;&gt;`
  - : Bitwise right shift operator.
- `&gt;&gt;&gt;`
  - : Bitwise unsigned right shift operator.

### Binary bitwise operators

Bitwise operators treat their operands as a set of 32 bits (zeros and ones) and return standard JavaScript numerical values.

- `&amp;`
  - : Bitwise AND.
- `|`
  - : Bitwise OR.
- `^`
  - : Bitwise XOR.

### Binary logical operators

Logical operators implement boolean (logical) values and have [short-circuiting](/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#short-circuiting) behavior.

- `&amp;&amp;`
  - : Logical AND.
- `||`
  - : Logical OR.
- `??`
  - : Nullish Coalescing Operator.

### Conditional (ternary) operator

- `(condition ? ifTrue : ifFalse)`
  - : The conditional operator returns one of two values based on the logical value of the condition.

### Assignment operators

An assignment operator assigns a value to its left operand based on the value of its right operand.

- `=`
  - : Assignment operator.
- `*=`
  - : Multiplication assignment.
- `/=`
  - : Division assignment.
- `%=`
  - : Remainder assignment.
- `+=`
  - : Addition assignment.
- `-=`
  - : Subtraction assignment
- `&lt;&lt;=`
  - : Left shift assignment.
- `&gt;&gt;=`
  - : Right shift assignment.
- `&gt;&gt;&gt;=`
  - : Unsigned right shift assignment.
- `&amp;=`
  - : Bitwise AND assignment.
- `^=`
  - : Bitwise XOR assignment.
- `|=`
  - : Bitwise OR assignment.
- `**=`
  - : Exponentiation assignment.
- `&amp;&amp;=`
  - : Logical AND assignment.
- `||=`
  - : Logical OR assignment.
- `??=`
  - : Nullish coalescing assignment.
- [`[a, b] = arr`, `{ a, b } = obj`](/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
  - : Destructuring allows you to assign the properties of an array or object to variables using syntax that looks similar to array or object literals.

### Yield operators

- `yield`
  - : Pause and resume a generator function.
- `yield*`
  - : Delegate to another generator function or iterable object.

### Spread syntax

- `...obj`
  - : Spread syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.

### Comma operator

- `,`
  - : The comma operator allows multiple expressions to be evaluated in a single statement and returns the result of the last expression.

## Specifications



## Browser compatibility



## See also

- [Operator precedence](/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
