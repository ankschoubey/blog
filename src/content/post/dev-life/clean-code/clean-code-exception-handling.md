---
toc: false
comments: true
excerpt: and Logging with style
tags:
 - clean-code
publishDate: 2020-01-06T20:42:15.128460
title: Exception handling
slug: /exception_handing/
---

> Errors should never pass silently.
> Unless explicitly silenced.

~The Zen of Python, by Tim Peters

## Create custom exception classes

Your exceptions should say exactly what went wrong. While those provided by programming languages are good, they are too general and are not specific to your codebase.

Oversimplified example:

- **Bad**: Exception(“number is smaller than 0”)

- **Better**: SpeedException(“Speed should not be smaller than 0”)

The reason you want to do this is that you can handle different types of exceptions in different ways and it is much easy to know exactly what went wrong from the logs.

In most programming languages creating exception is easy. Just inherit from the main Exception class which should be enough for most cases.

Custom Exception class also makes your logs easier to read.

## Always know why you are catching an exception…

![TODO: Find and Add YouTube video attribution]({{ site.baseurl }}/images/2020-01-06-clean-code-exception-handling/1.png)

## … or just don’t catch it (throws to the caller)

if you are not going to do anything with the exception don’t catch it just throw it.

Don’t add throw exception in the catch block. Use **throws while declaring the function instead**.

## For Unsupported Operations

In if-else statements or switch cases, it is always good to have a default case which will execute if no other condition is true.

If something is not possible or not supported then:

- throw (Java): **UnsupportedOperationException**

- raise (Python): **NotImplementedError**

![]({{ site.baseurl }}/images/2020-01-06-clean-code-exception-handling/2.png)

## Global exception handling

These allow you to have the same exception handling mechanism in case you have not explicitly handled the exception.

The most basic thing to do here is logging the exception.

### Spring (Java): @ControllerAdvice

<iframe
                width="854"
                height="480"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FyIr5iNIXJjo%3Ffeature%3Doembed&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DyIr5iNIXJjo&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FyIr5iNIXJjo%2Fhqdefault.jpg&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=youtube"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

**Previous**: [Avoid inventing algorithms and data structures]({{ site.baseurl }}/clean%20code/2019/12/25/clean-code-know-thy-complexities-data-structures-and-avoid-inventing-algorithms-especially-for.html)

**Next**: [Leave code better than you found it.]({{ site.baseurl }}/clean%20code/2020/01/06/clean-code-leave-it-better-than-you-found-it.html)

**Index**: [Tips on writing Clean Code]({{ site.baseurl }}/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)