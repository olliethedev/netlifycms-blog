---
title: "Clean Code : Objects and Data Structures"
date: 2021-04-23T00:52:11.456Z
---
# Objects and Data Structures

To create code that is highly reusable we want to write it in such a way that would not make the dependant code care about implementation and the details. This allows us to modify the logic in one place and not affect the dependants.

## Data Abstraction

* Hides implementation
* Abstract interfaces allow the users to manipulate the essence of the data, without having to know implementation.
* Serious thought needs to be but into the best way to represent the data an object contains. 

## Data/Object Anti-Symmetry

**Objects**: hide their data behind abstractions and expose functions that operate on that data.

**Data structures**: expose data and have no meaningful functions.

Procedural code (code using data structures) makes it easy to add new functions without changing the existing data structures. Object oriented code makes it easy to add new classes without changing existing functions.

Procedural code makes it hard to add new data structures because all the functions must change. Object oriented code makes it hard to add new functions because all the classes must change.

## The Law of Demeter

Module should not know about the innards of the objects it manipulates.

Method *f* of class C should only call:

* C
* An object created by *f*
* An object passed as argument to *f*
* An object held in an instance variable of C

## Conclusion

In any given system we will sometimes want the flexibility to add new data types, and so we prefer objects for that part of the system. Other times we will want the flexibility to add new behaviours, and so in that part of the system we prefer data types and procedures.














