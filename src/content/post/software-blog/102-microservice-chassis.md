---
comments: true
excerpt: Placeholder
tags:
  - technical
  - dev-productivity
publishDate: 2022-10-02T20:52:08.052481
last-modified-purpose:
slug: /software-blog/microservice-chassis/
title: Microservice Chassis
---

There is no speed without a microservice chassis.

In any kind of program, you want your technical concerns to be as separate as possible from business logic.

This can be a separate package or a separate library.

Having the technical concerns separated, keeps the code clean and easier to maintain in the long run.

One of the most important aspect of developing microservice environment is the microservice chassis.

The chassis deals with the technical concerns such as, logging, connecting to observability platform, security like mTLS for Zero Trust, etc.

Since all the microservices in the company's universe use the chassis, if something needs to be upgraded, the chassis library will be upgraded and the business implementation will remain the same.

This allows for a very high development speed.

Also, for most projects, setting up the project is the most painful part of the process. Chassis library makes it super convenient to set everything up.

Most DevOps concerns, can be handles from within chassis, without touching individual code.

# Resources

[Microservice chassis](https://microservices.io/patterns/software-blog/microservice-chassis.html)
