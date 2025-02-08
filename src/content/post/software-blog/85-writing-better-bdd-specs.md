---
comments: true
excerpt: 'Placeholder'
tags:
  - technical
  - testing
  - software-engineering
  - product-development
  - bdd
  - tdd
publishDate: 2022-08-14T20:52:08.052481
last-modified-purpose:
slug: /software-blog/writing-better-specs/
title: Writing better BDD specifications
---

# What is BDD? Why it is needed?

BDD stands for Behavior Driven Development.

In BDD, we write specs for the features we want to develop. This serves as a contract between developer and other stake holders. Therefore, it must be signed by all parties before the work starts.

If something happens or someone is unsure, we check the BDD document.

To be more precise, these specs are executable specs. Meaning there can be tests written for them to verify if a feature is working as expected.

BDD doesn't always need to be end-to-end flows but it is most commonly that.

# Writing good specifications

It's important to write specifications such that everyone can understand it.

The easier it is to understand. The easier it is to implement.

There are 6 principles for creating good specifications:

1. **Business Language**: BDD documents product-development related document. This document has to be shared and collaborated on by stakeholders. THerefore, it is important to have business language here.
2. Real data
3. Intention revealing
4. **Essential details only**: BDD documents are related to problem faced by the end user and not technical concerns in general. The more high-level it is, the easier it is to use the same document for different technologies.
5. Focused
6. Brief

It's better here to include a link to read more out this than to continue repeating. So posting the link here: [Keep your scenarios BRIEF](https://cucumber.io/blog/gist-of-bdd,/software-blog/bdd,True,True/keep-your-scenarios-brief/)

## Aim for single assertions (Single "Then") [^1]

Having multiple Then blocks means your tests are likely doing too much.

[^1]: [Writing Better BDD Scenarios](https://www.youtube.com/watch?v=awwFfCYoGFQ)
