---
title: "Clean Code: Concurrency"
date: 2021-11-03T00:46:20.588Z
---
![](/img/concurrency.png)
# Concurrency
Concurrency is a decoupling strategy itself, separating what gets done from when it gets done. This post we will look at some common issues with writing and maintaining clean concurrent code, as well as testing approaches for concurrent code.

## Single Responsibility Principle
Any given method, class, component should have a single reason to change. Keep your concurrency related code separate from the other code.

## Limit the Scope of Data
Two threads modifying shared data can interfere with each other, and cause unexpected behaviour. Encapsulate the data to avoid any unexpected shared data between threads. Limit the access of any data that may be shared. 

## Use Copies of Data
Copy objects and treat them as read-only if possible.

## Prioritize Independence 
Write your code such that it exists in its own world, sharing no data with any other thread. Partition data into independent subsets that can be operated on by independent threads, possibly in different processors.

## Producer-Consumer
Producer creates some work and places it into a bound queue. Consumer acquires that work from the queue and completes it.

## Reader-Writer
When you have a shared resource that primary serves as a source of information for readers, but which is occasionally updated by writers, throughput is an issue.

## Synchronization
Avoid using more than one method on a shared object. If you use locks, keep the synchronized code as small as possible.

## Testing
- Get non-threaded code working first. Don't debug both non-threading bugs and threading bugs.
- Treat spurious failures as candidate threading issues.
- Make your thread-based code especially pluggable so that you can run it in various configurations.
- Instrument your code to try and force failures.



