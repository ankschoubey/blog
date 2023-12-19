---
comments: true
description: 'Placeholder' 
tags:
 - clean-code
 - continuous-integration
 - commits
 - code-review
publishDate: 2022-05-17T20:52:08.052481
last-modified-purpose:
permalink: /conventional-commits/
title: Writing better commit with conventional commits
---

### Why commit messages are important?
Whenever we code, we save the state of the code with a commit. And the commit message becomes description of what exactly happened. 

Having good commit message leads to better communication and understanding. People can use commits to learn the code. It is an invaluable peace of documentation when done well.

### What happened when we don’t follow a convention?
Like with anything else, When we don’t follow a convention for commit messages everything is messed up. Everyone has their own rules. Some are too descriptive. Some are less.

We can’t get important insights 

### Why we should follow conventional commits?
Conventional commits forces us to have atomic commits. Aka to include only change that has been done.

This can also help with git bisect

It also has plugins that make it easier to perform other actions. 

Semantic Versioning
Change log generation

### What are some ways for making it easy to implement conventional commits?

Commit lint website : https://commitlint.io/
IDE plugins
Git pre-commit hooks