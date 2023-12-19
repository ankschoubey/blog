---
comments: true
excerpt: "Architecture is a crucial pillar of accelerating product delivery. It's hard to keep a team in sync with architecture over time.<br><br>
Architectural testing can enforce architectural decisions as simple tests, dramatically reducing code review effort and extending code maintainability."
tags:
 - clean-code
 - testing
 - tdd
 - tdd-example
publishDate: 2022-08-20T20:52:08.052481
last-modified-purpose: added details about how I implement ArchUnit tests
slug: /architecture-testing/
title: Enforcing Architecture with Architecture Testing
image: /images/architecture-testing.png
---
![](/images/architecture-testing.png)


## Introduction

SW Architecture is one of the most important pillars of an SW project. Following Engineering and Agile practices are part of the equation too. But having a clean extensible architecture facilitates a much faster development.

When working with a group of people, it is significantly time-consuming to enforce rules for maintainability. For example, it's common to find different classes that do the same thing named differently. Some team member names it controllers. Some name it "handler".

Similarly, some places need special care. For example, the API Requests body needs to be validated.

There are a few ways to enforce architecture:
1. Strong Linter
2. Creating Helper Libraries
3. Architecture Testing

This particular post will focus on Architectural Testing. 

# What are Architecture Tests?

Architecture tests help enforce rules that are otherwise missed by linters. Linters provide some coding standards but usually aren't sophisticated enough for the capabilities architecture testing can provide.

For example, if you have a java `@Entity` and want to ensure all of it has certain `javax` validation whenever someone creates a new `@Entity`.

# Libraries for Architecture Testing

I found two libraries:
1. [ArchUnit](https://www.archunit.org/): For Java
2. [TsArch](https://github.com/ts-arch/ts-arch): Typescript version of ArchUnit

# ArchUnit

ArchUnit provides Architecture Testing for Java and works well with JUnit.

Example: If you want to ensure all String fields for Request Objects have @Size annotation, you could write it with ArchUnit.

```java
    fields()
    .that()
    .haveRawType(String.class)
    .should()
    .beAnnotatedWith(Size.class)
```

Since I started using ArchUnit, the quality of code has improved by a huge margin.

# Implement Architecture Testing as TDD

With architecture testing, the work of an architect now expands and can live long after the architect is gone from the project since every architectural decision is written as a test.

I try to implement this the same way.

For example, I want all tests to be really fast. [I had written an article about it](spring-boot-junit-faster/). And one of the ways is that it requires avoiding `@DirtiesContext` in Spring Boot. And forcing the developer to choose between parallel execution and non-parallel execution.

I can share it with the team and hope everyone follows it. 

But we developers have too many things on our plate, and we juggle a lot. And mostly, it's the code reviewer who'll asses these decisions.

So, I instead write these are ArchTests.

Also, ArchTests can be thought of as TDD. Before starting, the architect decides how everything should look and grow. 

## Formatting ArchUnit Tests

I like the [method/when/then](/method-when-should) format. I have a format that makes it easier to write arch unit tests.

classes/methods/fields
- that: have
- should

## Here are some ideas for arch tests

- If something is mocked, its name should start with mock

# More Resources

I have read many resources while trying to learn about ArchUnit. Here are a few:

- [Using ArchUnit To Enforce Architecture Best Practices](https://shekhargulati.com/2020/05/04/using-archunit-to-enforce-architecture-best-practices/)
- [Archunit: Validate the architecture of our projects](https://dev.to/andressacco/archunit-validate-the-architecture-of-our-projects-3hc9)
- [TsArch](https://github.com/ts-arch/ts-arch): Typescript version of ArchUnit