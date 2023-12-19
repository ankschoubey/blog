---
comments: true
excerpt: 'Placeholder' 
tags:
 - testing
 - tdd
publishDate: 2022-03-26T20:52:08.052481
last-modified-purpose:
slug: /encounter-a-bug/
title: Whenever you encounter a bug
---

# Write a test first

Encountering a bug after development means your tests aren't good enough. (or you weren't doing TDD 😉)

To make sure the bug doesn't repeat, write a test for it.

By writing a test, you'd have simulated the exact situation where the bug arose. 

When you fix the code, you know the bug is perfectly fixed. And anyone modifying the code in the future won't miss it.

# Make sure right things are logged

Logs should provide accurate enough description of the state of the system.

If it takes you too long to find the cause of the bug, it maybe that your logs aren't good enough.

