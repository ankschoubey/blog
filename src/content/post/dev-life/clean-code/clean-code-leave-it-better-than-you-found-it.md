---
toc: false
comments: true
description: Atomic Habits applied to code. Thanks James Clear.
tags:
 - clean-code
 - business
publishDate: 2020-01-06T20:42:15.137147
title: Leave it better than you found it
permalink: /leave_it_better/
---

Code is much more like a work of art/craft that people consider it.

Knowing the benefits and tips for writing good code will take you only so far. It requires a mindset shift. Looking at the code through an artist’s eye.

![The clean version of the image from the source: Leave it a little better than you found it]({{ site.baseurl }}/images/2020-01-06-clean-code-leave-it-better-than-you-found-it/1.png)

# Incremental Improvements

> If we all checked-in our code a little cleaner than when we checked it out, the code simply could not rot. The **cleanup doesn’t have to be something big**. Change **one variable name** for the **better**, **break up one function** that’s a little too large, **eliminate one small bit of duplication**, **clean up one composite if statement**.

> Can you imagine working on a project where the **code _simply got better_ as time passed**?

~ Rober C. Martin ([Author of Clean Code](http://www.informit.com/articles/article.aspx?p=1235624&seqNum=6))

- Maybe, improve one microservice.

## Tip: Leave TODO as comments for your future self. These could include how you want to improve the code but don’t have time right now to do it. Hopefully your future self will handle it.

# Upgrading Fast (get rid of Legacy)

Newer languages and frameworks provide many more features, provide security upgrades and are easier to use. The longer you wait to upgrade, the harder the upgrading becomes.

You will also find that **clean code is much easier to upgrade**.

## Do it one step at a time.

### Making a big bang change is never feasible.

Upgrading can come in a variety of sizes.

#### Simple upgrades such as — Custom SQL executors in code to using an ORM.

- Get rid of prepared statements and replace them with Spring Data JPA

#### Or they can be a little bigger such as — Going from AngularJs to Angular.

Developers of the code to provide guides and tools to make upgrading frameworks easier

**Like**: [Official guide for upgrading from AngularJS to **Angular**](https://angular.io/guide/upgrade).

The above guide mentions some things that are worth mentioning here:

> **Some** applications will be **easier to upgrade** than others, and there are many **ways to make it easier for yourself**. It is possible to **prepare** and **align** AngularJS **applications** with Angular **even before beginning the upgrade** **process**. These preparation steps are all about **making the code more decoupled**, more **maintainable**, and **better aligned with modern development tools**. That means in addition to making the upgrade easier, you **will also improve the existing AngularJS applications**.

#### Or a much bigger one like — Going from Java to Kotlin.

Choosing a programming language is a hard process.

Ideally, you would want to choose something which is:

- Non-proprietary

- In-expensive or FREE

- Easy to code in

- Flexible enough

#### Java to Kotlin

Enterprises seem to have got stuck with Java 8 (released in 2017) because it is free. The newer versions of Java offer much better and easy to use features but enterprises won’t upgrade.

Kotlin might be a much better choice because:

- It is completely interoperable with Java. You can import your Java code and any other built by anyone within Kotlin.

- Spring Boot and Android officially support Kotlin.

- Kotlin is much more modern than Java offering things like default parameters and null checks.

A smaller way to check if Kotlin might be right for you is to migrate or create one microservice in/to Kotlin.

#### Python 2 to Python 3

The support for Python 2 ended (2019) after 20 years of development. Its code is frozen and won’t even receive security upgrades. Time to upgrade to Python 3.

# Code Reviews

![No code review discussion is relevant without mentioning this.]({{ site.baseurl }}/images/2020-01-06-clean-code-leave-it-better-than-you-found-it/2.png)

## Benefits of Code Review

> **Code reviews share knowledge**

> As code reviews expose developers to new ideas and technologies, they write better and better code.

> **Nobody wants to dive into a critical piece of code they didn’t write**–**especially during a production emergency**. Code reviews share knowledge across the team so that any team member can take up the reins and continue steering the ship.

> **Code reviews make for better estimates**

> Any code reviewer is also exposed to the complexity, known issues, and concerns of that area of the code base

> Keep in mind, **code review is not just a senior team member reviewing a junior team member’s code**. Code review should happen across the team in every direction. Knowledge knows no bounds! Yes, code review can help newer engineers, but by no means should it be used solely as a mentoring exercise.

Source: [Why code reviews matter (and actually save time!)](https://www.atlassian.com/agile/software-development/code-reviews)

The article also mentions ways to make code reviews much more productive.

## When done right, code reviews actually save time in the long run.

- Share the load

- Review before merging

- Use peer pressure to your advantage

**Previous**: [Always know why you are catching an exception]({{ site.baseurl }}/clean%20code/2020/01/06/clean-code-exception-handling.html)

**Index**: [Tips on writing Clean Code]({{ site.baseurl }}/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)
