---
title: "Clean Code: Classes"
date: 2021-10-27T15:48:30.589Z
---
# Classes

![](/img/clipart1408362.png)

Creating a Class in any language should probably follow Java convention unless there are language specific conventions. The Java convention is as follows: public static constants come first, then private static variables, followed by private instance variables, followed by public functions, followed by private functions. The Class should read like a newspaper, remember the step down rule.

## Encapsulation 
Keep variables and utility functions private. If granular tests are needed declare the functions as protected so that it can be accessed by a test.

## Keep Classes small
The measure of Class size is the responsibilities it has. Make sure the class is responsible for only doing one thing.

## Single Responsibility Principle
A class or module should have one reason to change. Trying to identify responsibilities often helps create better abstractions in our code.

## Cohesion
Classes should have a small number of instance variables. Each of the methods of a class should manipulate one or more of those variables. The more instance variables a method manipulates the more cohesive that method is to its class. Minimize cohesion! If cohesion is high that means the methods and variables of the class are co-dependant and hang together as a logical whole. Breaking a large function into many smaller functions often gives us the opportunity to split several smaller classes out as well.

## Organizing for Change
Change is continual, therefore we must organize our classes to reduce the risks of constant evolution of the system. Modifying an existing class introduces risk that might break the code and it must be fully retested. Classes should be open for extension but closed for modification. Instead of modifying existing class consider extending base class that encapsulates base functionality. New features should be added by extending.

## Isolating from Change

Classes should depend of abstraction and not concrete details. Hide concrete details behind interfaces. This makes the testing and modification of the system much simpler. Because, a class that is depending upon concrete details is at risk when those details change.
