---
title: "Clean Code: Functions"
date: 2021-04-20T23:28:10.818Z
---
# Functions

![Functions](/img/220px-function_machine2.svg.png "Functions")

Functions are a fundamental block of any software. You can get by without Classes but you can not create anything more than a script without functions. This is why its important to know how to write clean and readable functions.

## Make functions Small

* Functions should be very small, ideally less than 20 lines.
* Each function should tell a story, or better part of a story.
* Short functions are easier to read and understand.
* Keep the blocks inside control structures small. Aim for 1 line, and ideally a function call.

## Do one thing

* And do it well.
* One thing is one level of abstraction.
* Decompile large concept into set of steps of next level of abstraction.
* Conceptual template for creating functions is: To (function name), we (verb) and/or (variables).
* Function should be simple enough that it cannot be divided further.

**Bad:**

```javascript
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good:**

```javascript
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

## One level of abstraction

Mixing levels of abstraction makes it hard for the reader to understand if an expression is an essential concept or detail.

**Bad:**

```javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
```

**Good:**

```javascript
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

## The step down rule

* Code must be read top down, like a book.
* Every function is followed by lower level of abstraction functions.
* Read program as a set of "To" paragraphs each describing the current level of abstraction and referencing subsequent "To" paragraphs.

## Switch Statements

* Hide switch statements in a factory pattern or behind inheritance relationship.
* Switch statements are usually problematic because they don't do one thing.

## Descriptive names

* Long names are ok.
* Prefer long names over long comments.
* Name should explain what a function does.
* Be consistent with which phrases, nouns and verbs you use.

**Bad:**

```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Good:**

```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```

## Arguments

* The less arguments the better. Ideally no arguments.
* Arguments take conceptual power, and readers attention.
* The more arguments a function takes the more difficult writing tests for it becomes.

## Monadic forms

* Single argument functions
* Question: `boolean fileExists("MyFile");`
* Transformation: `InputStream fileOpen("MyFile");`
* The distinction between a transformation and a question should be clear and consistent.
* And finally, there is also and Event, where a function takes input but does not return a value `void passwordFailed(times);`

**Bad:**

```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu("Foo", "Bar", "Baz", true);

```

**Good:**

```javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true
});
```

## Flag Arguments

* Hard to read, bloats the function.
* Better split into two functions.

## Dyadic and Triad functions

* Complicate code.
* No natural order of arguments.
* Can be converted into monads.

  * Make function member of class instead.
  * Abstract arguments into object.

## Argument objects

When function needs more than one or two arguments, they should be wrapped into a class.

## Verbs and keywords

* Functions should be written as verb noun pairs `write(name);`
* Can include keywords `assertArrayContains(object);`

## Nave no side effects

* Functions must never behave in nonintuitive manner.
* Avoid making unexpected modification to state, class fields, or global variables.
* Readers will miss the side effects and be baffled by the unexpected behaviour of the code.

## Command query seperation

* Functions should de something of answer something.
* Always separate command from query as distinct functions.

## Don not return error codes

* Prefer throwing exceptions instead.
* Exceptions instead of error codes, makes the handling of errors much cleaner.

## Do not repeat yourself

* This will result in bloated code.
* And will require more maintenance.

## Conclusion

* Just like any writing, fist you get your thoughts down, then you massage it until it reads well.
* At first your functions are messy but then you refine the code, splitting functions, changing names, eliminating duplication, shrinking, and reordering.
* Functions are verbs and Classed are nouns in the language programmers describe a system.