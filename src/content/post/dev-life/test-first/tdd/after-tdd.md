---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - testing
 - tdd
publishDate: 2022-04-27T20:52:08.052481
last-modified-purpose:
slug: /software-blog/after-tdd/
title: What to test to write after functional TDD
---

More than half of what you would write a test for would get decided by TDD. These would cover basic functionality.

Essentially all tests fix the input and check the output or internal state of the applicaiton.

There are some other things that are worth paying attention to:

# Boundary Values and Equivalence Partitioning

Decide what input data are valid and which ones are not. How would the code react to invalid input? Specially if data is coming from an external system.

For example: If something depends on a Integer or long, can that be negative?

# Concurrent Transactions

What would happen if 100/500/1000 requests come concurrently?

It's better to think in terms on logarithmic scale here.

I faced this problem [when a record had to be updated concurrenly](/software-blog/optimistic-locking-exception-mongodb).

# Mutation Testing

<sub>What is mutation testing?</sub>

Mutation Testing is a technique where random lines are code are changed (mutated) and checked against the written test. Since the code is mutated, the test should ideally not pass. If the test passes, we say that mutant survived.

Our aim is to reduce as many mutants as possible.

Mutation testing assumes that among the mutants being generated, there may be scenarios that can come up in real world too.

<sub>What benefits does it bring?</sub>

<sub>How to use mutation testing?</sub>

Mutation testing usually takes more time to execute than usual. 

https://software-blog/testing.googleblog.com/2021/04/software-blog/mutation-testing.html

# Chaos Engineering

<sub>What is Chaos Engineering?</sub>

Chaos engineering tries to simulate real world failure conditions. These could be at level of Database, Cache, Network, Hardware, etc.

<sub>What benefits does Chaos Engineering bring?</sub>

https://codecentric.github.io/chaos-monkey-spring-boot/