---
toc: false
comments: true
excerpt: Minimalism
tags:
 - technical
 - clean-code
publishDate: 2019-12-25T20:42:15.093981
title: Avoid creating god classes and long methods
slug: /god_classes/
---

As you gain **experience** as a developer you **start to see repeating patterns** that crop up over and over again in your solutions.

> When you use **chunking** (design patterns, algorithms and standard functions) appropriately, it **allows** you to **stop thinking** about **how the code** you write does something and **instead** think about **what it does**

Source: [Why Your Code Is So Hard to Understand](https://www.codeproject.com/Articles/838973/Why-Your-Code-Is-So-Hard-to-Understand)

## Classes

> One class should do one thing not everything like **StatusChanger** or **StatusManager**, **not StatusGod**

> Keep classes small, a 1000 line class is a pain

## Methods

### Name

> Avoid using **and** in method names like **validateAndSave**, one method needs to do one thing and one thing well

### Don’t Repeat Yourself

> There should be one — and preferably only one — obvious way to do it.

~The Zen of Python, by Tim Peters

### Lines of Code

> Keep methods small, a 50 line method is a problem.

My rule of thumb is: **The method should not be more than the size of my screen**. (_Source: Jeremy Howard fast.ai_)

### Passing variables

> Keep the instance variables as low. If you are passing 4,5 variables you are probably doing more than one thing

Pass an object instead of multiple methods

Don’t pass the variables that you don’t need.

### If creating an object requires multiple steps

Convert it into a factory method

**Previous**: [Leave clues (Naming convention)]({{ site.baseurl }}/clean%20code/2019/12/20/clean-code-2-leave-clues-naming-convention.html)

**Next**: [Make database do the heavy lifting]({{ site.baseurl }}/clean%20code/2019/12/22/clean-code-4-make-the-database-do-the-heavy-lifting.html)

**Index**: [Tips on writing Clean Code]({{ site.baseurl }}/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)