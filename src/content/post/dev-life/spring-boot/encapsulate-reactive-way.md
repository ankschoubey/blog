---
comments: true
excerpt: Notes from Avoiding Reactor Meltdown
tags:
 - technical
 - reactive
 - spring-boot
publishDate: 2022-08-15T20:52:08.052481
last-modified-purpose:
slug: /encapsulate-blocking-reactive-way/
title: Encapsulate Blocking Call the Reactor Way
toc: false
---

The one rule you aren't allowed to break with project reactor is this: Don't Block over Event Loop!

Event loops are main threads that shouldn’t be blocked. 

If there is a blocking code, they should be run on a separate thread.

Here are some ways to fix these issues that I have noted down while watching Avoiding Reactor Meldown video. I have added an additional tip at the end.

## Use BlockHound to find blocking calls during testing

BlockHound is a plugin provided by Project Reactor that helps find blocking calls.

If you are doing TDD, use junit version. If you aren't doing TDD, use the normal version but remove it in prod.

https://github.com/reactor/BlockHound

Remember that blockhound will only detect blocks on main thread. This means that if you are writing junit tests, if blocking call is not made on event loop, then it won’t be detected.

## Avoid Significant Work Before Subscribe

## Always look for async implementations

Completable futures can be converted to mono. Many java libraries have completable future implementations.

## Encapsulate blocking calls

![Screenshot_2022-07-17_at_12.23.22_PM.png](/images/encapsulate-blocking-reactive-way/1.png) 

![Screenshot_2022-07-17_at_12.23.22_PM.png](/images/encapsulate-blocking-reactive-way/2.png) 

## Find if a method is reactive

![Screenshot_2022-07-17_at_12.23.22_PM.png](/images/encapsulate-blocking-reactive-way/3.png) 