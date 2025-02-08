---
comments: true
excerpt: A powerful way to increase resilence of a system
tags:
  - technical
  - chaos-engineering
  - tdd
publishDate: 2022-09-11T20:52:08.052481
last-modified-purpose:
slug: /software-blog/chaos-engineering/
title: Chaos Engineering
toc: false
image: https://upload.wikimedia.org/wikipedia/commons/3/39/LogoChaosMonkeysNetflix.png
---

![](https://upload.wikimedia.org/wikipedia/commons/3/39/LogoChaosMonkeysNetflix.png)

# What is Chaos Engineering?

When we do TDD, we reduce logical bugs. With Chaos Engineering, we'll improve resilience.

Example: If something fails for an end user, how should it be handled with minimal impact on user experience?

You might have experienced this when an error occurs on Netflix. Rather than failing, it gives a proper response to the user.

It's hard to anticipate failure scenarios in the real world. But there are some common ones. In chaos engineering terms: assaults.

Full-size services like Gremlin with 30+ assault types are interesting to look through.
There are some Kube-specific services too.

Chaos Engineering for Spring Boot includes three assaults (latency, exception, kill app) that directly attack @service @controller @repository.

# How would this help?

- It will make sure we are handling more failures #gracefully.

- In no case should user experience be impacted.

- Many times, when an error happens, the user doesn't get an indication that something went wrong.

# Handling chaos

There are usually common patterns to handle many assaults like CircuitBreaker, which many java libraries provide. Thus, it would require some thought to handle failures on UI too.

![ByteByteGo](/images/software-blog/chaos-engineering.jpeg)

Source: [ByteByteGo](https://bytebytego.com/newsletter)

Chaos Engineering helps us understand and improve observability.

- If there is any chaos in our system, we should be able to identify it via observability quickly. If we cannot determine, we'll have to improve observability.

- People also play Chaos Engineering Game Day, where they try to cause chaos and validate resiliency and observability.

- Chaos engineering would replicate testing in production.

- Having a library that automates some aspects of Chaos Engineering can proactively improve resiliency (and reduce the cognitive overload of having everyone learn and follow chaos engineering)

# Resources

- [Chaos Engineering for Spring Boot](https://codecentric.github.io/chaos-monkey-spring-boot/)
- [Gremlin](https://www.gremlin.com/)
