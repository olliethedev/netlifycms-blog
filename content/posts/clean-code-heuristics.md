---
title: "Clean Code: Heuristics"
date: 2021-11-03T21:25:40.621Z
---
![](/img/unnamed.gif)

# Heuristics
This post is all about things to avoid, and heuristics on how to avoid these pitfalls.

## Environment
- Build Requires More Than One Step: You should be able to check out the system with one simple command and then issue one other simple command to build it.
- Tests Require More Than One Step: You should be able to quickly and easily run all the tests.

## Functions
- Too many arguments: More than three arguments functions can probably be split into multiple functions.
- Output Arguments: Avoid using output arguments as they are counterintuitive. 
- Flag Arguments: Boolean arguments mean that your function does more than one thing.
- Dead Functions: Don't be afraid to delete the function. Methods that are never called should be discarded. 

## General
- Multiple Languages in One Source File: The ideal is for a source file to contain one, and only one, language. 
- Obvious Behaviour Unimplemented: When an obvious behaviour is not implemented, readers and users of the code can no longer depend on their intuition. 
- Incorrect Behaviour at the Boundaries: Don't rely on your intuition. Look for every boundary condition and write a test for it.
- Overridden Safeties: Don't override safeties, they exist for a reason.
- Duplication: Don't repeat yourself! Duplicate code is an opportunity for abstraction.
- Code at Wrong Level of Abstraction: All the lower level concepts should be in the derivatives and all the higher level concepts should be in the base class. Constants, variables, or utility functions that pertain only to the detailed implementation should not be present in the base class.
- Base Classes Depending on Their Derivatives: When we see base classes mentioning the names of their derivatives, this violates independence of the lower level classes from their derivatives.
- Too Much Information: The more functions in a single class or interface, the more coupling there is. Class should have few methods and instance variables. The fewer variables a function has the better. 
- Dead Code: Delete it.
- Vertical Separation: Variables and functions should be defined close to there they are used. Local variables should be declared just above their first usage and should have a small vertical scope. Limit vertical distance between the invocation and definition.
- Inconsistency: Be careful which convention you choose, and once chose, be careful to continue to follow it.
- Clutter: Keep your source files clean, well organized, and free of clutter.
- Artificial Coupling: Avoid creating coupling between two modules that serves no direct purpose.
- Feature Envy: When a method uses accessors and mutators of some other object to manipulate the data within that object, then it envies the scope of the class of that other object.
- Misplaced Responsibility: Use principle of least surprise to place code where reader would naturally expect to find it.
- Inappropriate Static: Don't make a function static if there is a possibility of having polymorphic implementations.
- Use Explanatory Variables: I think this point is self-explanatory.
- Function Names Should be Descriptive: Name should be enough to explain what the function does without looking at the implementation.
- Understand the Algorithm: Often best way to gain knowledge is to refactor the function into something that is so clean and expressive that it is obvious how it works. 
- Make Logical Dependencies Physical: The dependant module should not make assumptions about the module it depends upon.
- Prefer Polymorphism to Control Statements
- Follow Conventions
- Replace Magic Numbers with Constants
- Be Precise: You can add precision though restriction. Ex. Making a type non-nullable to avoid null pointer exceptions. 
- Structure over Convention: Enforce design decisions with structure over convention.
- Encapsulate Conditionals: Make boolean conditions into separate functions.
- Avoid Negative Conditionals: They make the code hard to understand.
- Functions Should Do One Thing: No exceptions.
- Hidden Temporal Couplings: When order of function calls matters, make that order explicit. 
- Don't Be Arbitrary: Don't do it!
- Encapsulate Boundary Conditions: Boundary conditions are hard to track. Put the processing of them in one place.
- Functions Should Only Descend One Level of Abstraction: Statements within a function should be one level bellow the operation described by the name of the function.
- Keep Configurable Data at High Levels: Configuration should reside at higher levels and should be easy to change.
- Avoid Transitive Navigation: Immediate collaborators should offer all the services we need.

## Names
- Choose Descriptive Names
- Choose Names at Appropriate Level of Abstraction
- Use Standard Nomenclature
- Unambiguous Names
- Use Long Names for Long Scopes
- Avoid Encodings
- Names Should Describe Side-Effects

## Tests
- Insufficient Tests
- Use a Coverage Tools
- Don't Skip Trivial Tests
- An Ignored Test Is a Question about an Ambiguity
- Test Boundary Conditions
- Exhaustively Test near Bugs
- Patters of Failure Are Revealing
- Tests Should be Fast