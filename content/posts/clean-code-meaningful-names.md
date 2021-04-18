---
title: "Clean Code: Meaningful Names"
date: 2021-04-18T21:37:14.544Z
---
### Clean Code: Meaningful Names

![hero](/img/codenames_1.png "hero")

Names are everything! Files, classes, functions, variables all need a name, therefore we should cate about good names. Good names save more time than they take. Coming up with good descriptive names that don't confuse the developer who has to read the code in the future may come with no effort to some, but for others it may feel like a constant struggle. Readable, and intuitive names are a foundation of clean code. Let's take a look at some key principles that will help you come up with good names in your code.

### Intention Revealing

The name of a variable, function or class must answer questions. Why does it exist? What it does? How is it used? A variable named *instance* or *number* is not descriptive enough and requires the user (developer) to figure out the context and the type of the variable in order to know what it does, a better approach would be changing the names to *userAccount* and *balance* respectively. Naming should be explicit and explain the context and operations. Code can be simple but good naming can make it even more simpler and easier to understand.

    

### Avoid Disinformation

Knowing what to do is just as important as knowing what not to do. Do not refer to a grouping of objects as a *objectList* unless it's a list, use *accountGroup* instead. Avoid similar sounding names as they will result in confusion from the user.

### Make Meaningful Distinctions

Be mindful of the logical context or the name. Be mindful of others reading your code as they will be using the context to figure out what your code does. Avoid *productInfo* and *productData* in the same context, as they are too similar. On the other hand if names are different they must mean different things. 

    Avoid redundancy, such as having variable in the variable name. Avoid nuances in the same context, ex: *customer* vs *customerObject*, or *getAccount()* vs *getAccountInfo()* vs *getAccounts()*. Reader must easily understand the difference between names. Avoid confusing the reader.

### Use Pronounceable Names

Avoid extreme abbreviation. The reader of the code must not spend too much time trying to decode your abbreviations, so keep them to the minimum. When reader encounters variable called *blkLst* they might read it as black list or bulk list or block listener or any other possible decoding of that variable. Avoid confusing the reader.

### Use Searchable Names

Modern software development tools allow for code completion, where you type part of the variable name and the tool will give you suggestions that you can pick from. Hence saving you time trying to lookup the class, function or field name. To let the tools help you, you should avoid using single character names. 

### Avoid Encodings

Adding type or scope into the name adds extra burned to the reader. Instead of naming your function *userAccount.getAccountBalance()* you can simply name it *userAccount.getBalance()* since the user understand that the balance amount is part of the *userAccount* class.

### Hungarian Notation

In the older days when languages were old and tooling was primitive, developers often had to encode both the type and context into the variable name. That is no longer needed as modern developer tools in combination with strongly typed languages help the reader know the type and context of the variable. So the Hungarian notation is no longer useful.

### Member Prefixes

Similar to other older conventions, modern tooling has made member prefixes obsolete. Developer IDE will often highlight and color code member variables.  

### Interface and Implementations

Most often we actually don't want the user of our code to know that they are using an interface. That information is not explicitly needed, so calling our interface *IShapeFactory* might be giving too much information to the reader. A better approach would be to name the interface implementing callas *ShapeFactoryImp* and keep the interface name clean *ShapeFactory*. 

### Avoid Mental Mapping

When writing code we want to make it as easy as possible for the reader to understand what exactly the code is trying to achieve. Therefore we want to avoid making the reader perform translation in their head. Single letters should only be used for loop counters (i, j, k) and nothing else. Clarity is king. Every reader should understand the code with no extra effort. 

### Class Names

Good class name should answer the question "WHO"? They should be nouns, noun phrases or adjective. For example *Customer*, *Page*, *Address*, *Parser*. Avoid verbs as much as possible because they best used to describe methods.

### Method Names

Good method names should answer the question "What does it do?". Should be verbs ex: *postPayment()*, *deletePage()*, *save()*. Use get/set for accessors and mutators. Don't overload constructors, prefer factory methods instead.

### Don't Be Cute

Avoid jokes, puns, slang or emojis. Say what you mean, mean what you say. Code professionalism, joke with coworkers at the water cooler.  

### One word Concepts

Don't mix *fetch*, *retrieve*, *get* in the same context. Pick one word to describe a concept and be consistent. Don't mix *Controller*, *Manager*, *Driver* in the same context. However, be careful not to use same word for different purposes. 

### Solution Domain Names

Solution domain is the part of your code that is highly technical and handles solution of technical problems, like graphics pipelines, or binary decoding of a file. It is ok to use technical names for technical actions. Readers are programmers who have good understanding of common data structures and algorithms. Avoid vague business terms in the solution domain.

### Problem Domain Names

Problem domain defines the problem at an abstract level, to later be solved in the solution domain. Always cleanly separate solution and problem domains. When name is not related to technical area solution domain, use name from problem domain. Code working with problem domain should have names from problem domain.

### Add Meaningful Context

If a variable needs more meaningful context, move it to the right context, or create the context. Ex: *addressState* vs *Address.state()*. Break long functions into smaller functions, this helps manage the context of each function.

### Conclusion

Focus on descriptive skills. Rename and refactor often. DON'T BE LAZY! Leverage code completion in the IDE and developer tools, avoid memorization. Your code should be as smooth of a read as Lord of The Rings.