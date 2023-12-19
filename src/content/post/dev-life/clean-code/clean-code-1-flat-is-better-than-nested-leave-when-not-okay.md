---
toc: false
comments: true
excerpt: Leave when not okay
tags:
 - clean-code
publishDate: 2019-12-20T20:42:15.088154
title: Flat is better than nested
slug: /flat_is_better/
---

This might be the most important tip of all the tips covered which applies mainly to if-else statements.

## Nesting clutters your code.

### Where does the block end

It becomes hard to find where a particular block ends easily (especially if someone writes 8 or more nests 😖)

### Unnecessary horizontal scrolling

Also, you might have to scroll horizontally to see what the complete code is since it does not fit your screen.

### Nesting makes your code hard to understand.

While you are reading your nested block, you have to remember what all conditions preceded it.

The below guideline should counter that:

> Max indent should be 2, in case of exceptions 3

## Avoid the use of else.

### Return/throw when not okay

- By returning early you make sure that in each of your functions the last line of your function returns what it is actually supposed to return. This will make your code consistent.

- Also, you would find that you avoid unnecessary nesting (which will calm your eyes 👁 and your linter). Thus, making your code easy to understand.

![]({{ site.baseurl }}/images/2019-12-20-clean-code-1-flat-is-better-than-nested-leave-when-not-okay/1.png)

### Bubble vs Gateway

Bad (left): Bubble-Style

Good (right): Gateway-Style

## If deep nests exist? Separate loop and operation

Extract the logic to other readable methods or use streams (Java)/lambda or something equivalent in your programming language of choice.

Usually, there is a problem where you have to perform a bunch of operations on an array of objects.

I tend to create at-least** 2 functions** for this:

1. One that performs an operation on a single object.

1. Other calls the first function in a loop.

In case if something goes wrong, it is easier to debug it since I know what function has what responsibility.

### Simplified Example: [Link to Code](https://gist.github.com/ankschoubey/c9785400ce2c1aee8271485b15dafd6d)

![]({{ site.baseurl }}/images/2019-12-20-clean-code-1-flat-is-better-than-nested-leave-when-not-okay/2.png)

You have a bunch of students for which you calculate the average grade.

![]({{ site.baseurl }}/images/2019-12-20-clean-code-1-flat-is-better-than-nested-leave-when-not-okay/3.png)

In the above BadGrader, you can see than the code of calculating the grades is within the loop. This is bad as we cannot use the same piece of code elsewhere in the program.

![]({{ site.baseurl }}/images/2019-12-20-clean-code-1-flat-is-better-than-nested-leave-when-not-okay/4.png)

The BetterGrader separates the calculation part from the printing part.

![]({{ site.baseurl }}/images/2019-12-20-clean-code-1-flat-is-better-than-nested-leave-when-not-okay/5.png)

GoodGrader removes the naive logic that was used to calculate average and replaces it with a much shorter code that makes use of inbuilt functions.

This is an example of chunking which will be explained more in the next post.

**Next**: [Leave clues (Naming convention)]({{ site.baseurl }}/clean%20code/2019/12/20/clean-code-2-leave-clues-naming-convention.html)

**Index**: [Tips on writing Clean Code]({{ site.baseurl }}/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)

# Resource:

- [Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)