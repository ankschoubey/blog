---
comments: true
description: Placeholder 
categories: [engineering]
publishDate: 2022-12-31T20:52:08.052481
last-modified-purpose:
permalink: /v1/code-review-checklist
title: Code Review Checklist
---

## Why do we need a code review checklist?

We developers must know a little bit of everything from architecture to low-level code details like HTTP Statuses. Apart from that, we also have non-technical work that needs to be kept up to date.

For this reason, we need checklists.

Checklists are proven to increase quality and compliance. They are used heavily in the medical domain. Medical professionals who use checklists make fewer mistakes and are likelier to get through all the steps properly.

An important goal for us developers is Continous Delivery, where every commit we make reaches production and works properly. To avoid the cycle of making mistakes when we commit, we need accurate processes that help catch our bugs early on.

These processes can be in the automated form of linters, tests, etc. But still we need a human to verify what we have been doing.

We need a code review checklist to make the code review process streamlined and understood by the entire team.

## How can we use a code review checklist?

We can use code-review checklists like doctors do.

Before committing, we can walk through our code review checklist and tick off points. This will ensure we have a good first screening ourselves before submitting to code review.

The code review checklist is mostly a yes or no questionnaire. It need not be super complex. And would take a max of 5 minutes to go through.

If you aim to do 1 Small story in 1 day and 1 medium story in 2.5 days, 5 minutes is nothing to ensure the same story doesn't produce a bug.

## What items can we add to a code review checklist?

### API

1. Are you using the correct method?
2. Are you using a suitable schema?
3. Are you returning the proper error code?
4. Does the return value need to be cached?

### Logging

1. Are log comments proper?
