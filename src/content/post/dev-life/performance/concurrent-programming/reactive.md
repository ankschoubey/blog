---
comments: true
excerpt: Multithreading programming has never been easier.
tags:
 - technical
 - microservices
 - experience
 - webflux
publishDate: 2022-07-11T20:52:08.052481
last-modified-purpose:
slug: /software-blog/reactive-programming/
title: Always choose Reactive Programming
toc: false
---

# What is reactive programming?

Reactive programming is not a straight paradigm like empirical or functional. Reactive means that code that is written is non-blocking and asynchronous.

Typically, whenever we have an IO operation, the thread waits for the IO operation to complete before proceeding to the following line. This consumes CPU time while the CPU is ideal.

In reactive programming, during IO operations, the thread is auto-switched. Therefore, the CPU is never ideal.

This means that reactive code has a higher throughput overall depending on the number of IO operations. Reactive code is typically several magnitudes faster and consumes fewer resources overall.

Also, traditional code doesn't work on streaming data. If you fetch a list of records from a database, the entire list has to be loaded before you can act on it. 

In reactive, however, you can work with streams of data. So, you can start performing operations on data you have received till now without waiting for the rest of the data.

Similarly, suppose you have a client-server application that needs to display a list. If you code it to be reactive, the list items can be received as a stream. Each item can be displayed one at a time. No need to wait for the entire list to load. This would significantly reduce initial load time.

# Why choose reactive programming for every project?

Often a con of reactive programming is said to be the initial learning curve. In my experience, the initial learning curve is much less relevant than the return on investment it provides.

Cloud applications need to consume less memory and higher throughput. Before going for vertical or horizontal scaling, the best thing to do is optimize code. Reactive code is one of the directions to look for.

Reactive libraries are available in many programming languages. Especially the flavors of reactivex (RxJs, Rx Java, etc). Spring Webflux is a variant of Spring Boot that supports building reactive backends.

# When should you not use reactive programming?

The only place not to use reactive programming is when everything can be done in memory itself i.e there is no IO operation.

# My experience with reactice

I have used Project Reactor Spring Webflux and RxJS in Angular with both the experience has been this.

A much cleaner coding experience

One of the reason is it seems all reactive libraries are a sort of functional pipeline. One stage with another. 

Each stage is a pure function and ideally doesn't have any side effects. 

You can think of it like a scope.

I very much agree with this video I found on Youtube. With project reactor, everything is just a Flux from start to end. No need to wrap things into different convertor classes. Everything is just Publisher.

Multithreading programming has never been easier. 