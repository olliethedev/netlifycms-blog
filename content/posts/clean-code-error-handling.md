---
title: "Clean Code: Error Handling"
date: 2021-05-02T13:55:15.838Z
---
# Error Handling

Depending on the problem we are trying to solve, a large part of our code can be related to error handling. If the error handling code obscures logic, it's wrong. So let's explore some of the ways we can keep our error handling clean.

![error hero](/img/1_zvwdiqkolj2z1milfrqjoq.jpeg "error hero")

## Use Exception instead of Return Codes

Exception handling with ```try-catch-finally``` block is much cleaner than series of nested ```if-else``` statements handling error codes.

## Write your ```try-catch-finally``` block first 

By writing your ```try-catch-finally``` block first you help define what the user of that code should expect, no matter what goes wrong with the code that is executed in the ```try```.

## Provide context with exceptions

Create informative error messages and pass them along with your exceptions. Mention the operation that failed and the type of failure.

## Don't return Null

Avoid returning null as this will minimize ```if``` statements in the users code, and will prevent null pointer exceptions.

## Don't pass Null

In most programming languages there is no good way to deal with a null that is passed by a caller accidentally. Because this is the case, the rational approach is to forbid passing null by default.

## Don't ignore the exception

Exceptions exist for a reason and therefore should always be handled.

**Bad:**

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

**Good:**

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}