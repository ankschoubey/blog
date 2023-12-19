---
comments: true
description: The distinction between unit and integration tests blurs with embedded implementations, combining accuracy from both while overcoming limitations of traditional mocks and infra-heavy integration tests.
categories: [tdd, testing]
publishDate: 2022-04-03T20:52:08.052481
last-modified-purpose:
permalink: /bluring-line-between-unit-integration-test/
title: Avoid Mocks and understand the blurry lines between Unit and Integration Tests
---

## Problem with Mocks in Unit Testing

Typically, unit tests includes testing a certain class/method without involving other methods. The other methods are simulated with Mocks.

Mocking frameworks like Mockito provide functionality like: verifying how many times a mock method was called or if there were no interaction.

While mocks do provide make tests faster to run, they aren't very accurate since they are built by hand.

## Problem with typical Integration Testing

Typically, integration tests include creating a separate environment all together and running tests from middleware to database aka everything backend.

These tests are bulkier, require a lot of infra-setup and take longer to run.

## Bluring line

Java has many "embedded" implementation of common external systems like database, kafka, mockservers, etc. These allow for writing tests without having to create a separate infrastructure.

Thus they are integration tests but not in integration fashion.

Also, tests written this way are more accurate than using mocks but do lack certain good features of mock as described in first section. Though the benefits outway the loss. Though we can mix and match using Mockito's `@SpyBean`.

One can write accurate "unit" tests and still use "embedded" database. This has become harder to distinquish between unit and integration tests. Because this is a hybrid of both the overall effect is more accurate tests.