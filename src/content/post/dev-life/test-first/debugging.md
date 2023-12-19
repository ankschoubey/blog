---
comments: true
description: 'Placeholder' 
tags:
 - clean-code
publishDate: 2022-04-19T20:52:08.052481
last-modified-purpose:
permalink: /debugging-effectively/
title: Debugging Effectively
---

Debugging has a standard set of steps.

But we do stupid things like search on stackoverflow without even reading what the error is fully.

This wastes stupid amount of time. Usually, configuration bugs can be mitigated much more easily if one has read Documentation and knows the configuration.

# Know exactly what the error is

- Read the error
- Really understand the error

If you’d like to be more methodical, add it to your bug card.

# Look at logs. 

Set appropriate log level for the packages involved. If it's harder to understand.


# Isolate the code/problem. 

- Does error come on one setting/env/deployment but not other? If yes: why so?

# Learn to use debugger mode and trace. 

Fixing your debugging tool may help.

# Replicate environment

This can be done in several ways:

## Create tests

This could be unit/integration/etc.

## If you can’t write a test, can you replicate it locally?

This could mean connecting UI and backend, upping some docker containers, or Minikube.

# Finding solution

If it’s something that you can’t find,

- Glance through documentation first. (Idealistic)

or

Ask:

- Ask People who may know.
- Teams who may have faced the issue. 

Or read stack overflow or github issues.

If you still can’t find, ask a question on Stack-overflow. And when you do find the solution by yourself, post an answer.
