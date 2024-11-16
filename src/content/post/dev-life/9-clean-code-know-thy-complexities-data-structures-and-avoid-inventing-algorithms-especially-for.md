---
toc: false
excerpt: especially for maths
tags:
 - technical
 - clean-code
publishDate: 2019-12-25T20:42:15.097026
title: Avoid inventing algorithms and data structures
slug: /software-blog/complexity/
---

> **If** you are **inventing new algorithms**, you either **don’t know** the right algorithm **or** are working on your **PhD** thesis.

> **Eliminating** as much of this **accidental complexity** as possible.

Source: [Why Your Code Is So Hard to Understand](https://www.codeproject.com/Articles/838973/Why-Your-Code-Is-So-Hard-to-Understand)

## Keep your implementation as simple as possible

> If the implementation is hard to explain, it’s a bad idea.
> If the implementation is easy to explain, it may be a good idea.

~ The Zen of Python, by Tim Peters

## Knowing the basics of time and space complexity goes a long way.

Going through each is beyond the scope of this. Here is a link if you want to go in-depth: [Cracking the Coding Interview YouTube](https://www.youtube.com/playlist?list=PLX6IKgS15Ue02WDPRCmYKuZicQHit9kFt)

**The concept of List, Sets, and Maps is universal though this particular post is going to look at it through the lens of Java**. In the case of Python map is called a dictionary.

## Additional Tip: Always use parent interface for the type

Be as general as you can be.

This allows you to swap in any form of implementation of parent interface in a single line.

![[Collections in Java](https://www.javatpoint.com/collections-in-java)](https://cdn-images-1.medium.com/max/2808/1*M2J_YiubLnrId8k23GiNyA.png)

## When trying to find duplicates

### Use Set instead of Lists

Set always contain unique values.

Finding an element in the set is much faster O(1) than compared to a list O(n)

![](https://cdn-images-1.medium.com/max/2880/1*HVkmS59kcy7lkvkWSoZNhg.png)

## Java: If you know the size of the list

> … if the required maximum capacity of the ArrayList is known, we can get the optimal performance (both average latency and throughput) by specifying the initial capacity to the required capacity.

> In doing so, we can get 24% to 34% improvement in average latency and 30% to 50% improvement in throughput.

Source: [Performance Evaluation of Java ArrayLists](https://dzone.com/articles/performance-evaluation-of-java-arraylist)

## Always have your algorithmic logic in a separate function

This just makes it much easier to debug. Your function will be doing just one this.

Making it general enough will be even helpful so that you can easily use it.

**Example:** [_Separate loop and operation section: Clean Code #1_](/clean%20code/2019/12/20/clean-code-1-flat-is-better-than-nested-leave-when-not-okay.html)

## Rather than implementing own logic, take 5 minutes to see if your modules already provide the implementation

### Example: Sorting in Javascript/Typescript

![](https://cdn-images-1.medium.com/max/2668/1*UoB_nYYPlLWGY14bNEs2IQ.png)

![](https://cdn-images-1.medium.com/max/2704/1*BS7jYfKY4DhpY-cLuGULHw.png)

A library in java which you can find is [Apache Common Lang 3](https://www.baeldung.com/java-commons-lang-3) which does provide a lot of utilities.

Python has much more abundance. Just google a solution for python and you will probably find a pip package.

**Previous**: [Remove unnecessary code](https://medium.com/p/c477707e5be1)

**Next**: [Always know why you are catching an exception](https://medium.com/p/a7bca1e66d9e)

**Index**: [Tips on writing Clean Code](/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)