---
title: "Clean Code: Comments"
date: 2021-04-21T12:26:16.954Z
---
# Comments

![Comments Hero](/img/6a00d834515c5f69e201901ecb168f970b-800wi.jpeg "Comments Hero")



Comments are a necessary evil. If programming languages were expressive enough, or our code perfectly descriptive, we would not need comments. Alas, we still need to write comments to explain just what our code meant to do.

## The Good

* Comments do not make up for bad code.
* Explain yourself in code.
* Make comments informative as in providing more detail to the reader of the code.
* Explaining intent in the comment can prove to be useful.
* Clarify ambiguous code, like the one using a library.
* Todo comments are a temporary comment used to inform the programmer of remaining work.
* Comments can be used to warn of side effects or importance of specific details.
* Javadocs for public APIs are extremely helpful.

## The bad

* Avoid confusing comments and redundant comments.
* Avoid misleading the reader.
* Avoid noise comments such as labeling things that are obvious from simply reading the code.
* Avoid commented out code!
* Avoid comments that provide too much information.

## Example:

**Bad:**

```javascript
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**Good:**

```javascript
function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```
## Example:
**Bad:**

```javascript
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

**Good:**

```javascript
doStuff();
```