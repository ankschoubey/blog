---
toc: false
comments: true
excerpt: Comments and Naming Conventions
tags:
  - technical
  - clean-code
publishDate: 2022-08-06T20:42:15.089636
title: Leave Clues
slug: /software-blog/naming_conventions/
last-modified-purpose: 'added detail about javadocs'
---

These apply to name everything: variables, class names, methods, packages, etc.

> **When** **you** **have** the **semantic model** **fresh** in your mind **it’s easy to** **map** your **code** **onto** **it**

> It’s **not hard** to **remember** that a **variable** named “**x**” is the **date a record** was **created** and “**y**” the **date it was deleted**.

> Leave clues that will **allow you to rebuild** the semantic **model** **when** **you** **come** **back** at a **later** time.

_Source: [Why your code is so hard to understand](https://medium.com/on-coding/why-your-code-is-so-hard-to-understand-83057c115a2b)_

## Comments

**Comments can lie**. The code does not.

Ideally, your code should be **so good that you do not require comments**.

This might not be true in one case which is when you code something weird and required **domain-specific explanation**.

When something is non-obvious put a comment.

Like in Machine Learning, a choice of certain parameters or a certain step can be understood better by putting the link to the explanation/research paper in the comment. While reading just the code, it might not be obvious for the reader to understand what to make of it. (_Source: Jeremy Howard fast.ai_).

Similarly, if you are using an external API, you can mention it in the comments.

Sometimes, you might want to link to a specific piece of code, in that case, you might use the javadoc format

```java
/**
 * @see String#toLowerCase() convertToLowerCase
 */
```

javadocs are interesting if you want to write good comments.

## Intent giving names

Use **pronounceable names**

> Variables should be named so that they make it clear what it contains.

> Variable names should always be **easy-to-read**, be **short yet meaningful**, mixed case with a lower-case first letter English words.

> **b)**Use **plural names for arrays/collections** of **objects**.

> **c)** **Constant** (static final) variable names should be in **all capital letters** and **separate words** in the name with the **underscore**, i.e., PRIORITY_NORMAL,

Source:[ java coding-convention and cleancode](https://www.techie-knowledge.co.in/2013/12/java-coding-convention-and-cleancode.html)

![](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/1.png)

For matrix operations use row columns instead of y and x because in some languages matrix is treated as [y,x]

![](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/2.png)

Source: [Gayle Laakmann McDowell (Cracking the Coding Interview Book)](http://www.crackingthecodinginterview.com/)

# Abbreviations and short forms

Many people try to optimize for the vertical space of the screen but forget horizontal space.

This is kind of an exception to the above rule: for things that are very very common, short forms are better. (You also type less).

Just don’t short everything to be a single letter. Be small but descriptive.

Also, having a list of abbreviations used in your project readme/documentation can be helpful.

Examples,

1. **repo** for repository

1. **util** for utility.

1. **serv** for service

1. **len** for length

1. **dto** for Data Transfer Object (pretty common)

![Example based on Spring Boot (Java)](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/3.png)

Make sure you use the same abbreviations everywhere in your code aka **one word per concept** **in all classes.**

_(Below examples are for method names)_

- get/fetch/find

- set/update

In case you are trying machine learning, I guess this article is much better suited: [Jeremy’s notes on fastai coding style](https://docs.fast.ai/dev/style.html)

## Magic numbers and strings

> Any **number** or string in your code **that isn’t immediately obvious** to someone with very little knowledge.

Source: [StackOverflow](https://stackoverflow.com/questions/3518938/what-are-magic-numbers-in-computer-programming/3518945#3518945)

Better to declare them in a separate constants file.

Constants should be snake_case and CAPITAL.

![List of HTTP status codes](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/4.png)

In the case of Java, enums can also be used to achieve something similar but they will contain a lot of java boilerplate.

![](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/5.png)

There are also language-specific naming conventions involved like:

1. Java and Typescript prefer camelCase

1. Python and SQL prefer snake_case

## For Unit test cases

My aim is not so much about reducing the lines of code. Tests are usually small. (In case your tests are huge and complex then you must have written a bad code)

I prefer to keep the end of each method the same. Like:

![Code was taken and modified from Unit tests with Mockito — Tutorial](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/6.png)

I use Mockito so I skip the first line. The start of the function then is with all stub actions.

The last 3 lines are usually similar.

1. A variable **expected**: expected value

1. A variable **actual**: calls the function/method

1. assertion

I find that for most tasks it is easier to make changes to expected and actual variables rather than put everything into assertions. The assertion is always clean.

An alternative to the above assertion is to write like below which I find to be messy.

![Code was taken and modified from Unit tests with Mockito — Tutorial](/images/2019-12-20-clean-code-2-leave-clues-naming-convention/7.png)

**Previous**: [Flat is better than nested](clean-code-1-flat-is-better-than-nested-leave-when-not-okay.html)

**Next**: [Avoid creating god classes and long methods](https://medium.com/p/f3d76b1b622a) #NotEnoughChunks

**Index**: [Tips on writing Clean Code](/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)
