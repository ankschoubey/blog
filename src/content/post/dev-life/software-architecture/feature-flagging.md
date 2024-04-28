---
comments: true
excerpt: For Chaos Engineering and Continuous Delivery
tags:
 - technical
 - feature-flagging
 - configuration-management
publishDate: 2022-08-28T20:52:08.052481
last-modified-purpose:
slug: /software-blog/feature-flagging/
title: Feature Flagging
toc: false
image: /images/software-blog/feature-flagging.jpg
---

![](/images/software-blog/feature-flagging.jpg)

Photo by <a href="https://unsplash.com/@isaactanlishung?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Isaac Li Shung Tan</a> on <a href="https://unsplash.com/s/photos/on-off?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


# What are feature flags?

The concept of feature flags is simple. You can toggle a feature on or off based on certain conditions. And ideally, this requires zero downtime.

For example, an experiment feature can be turned on for some users but disabled for others.

There are many levels to feature flagging:
- Disable feature for specific users
- Disable the feature completely
- Disable the feature in case of certain conditions

Feature flagging can also help in AB Testing.

# Feature Flagging for CD

Feature flags also help in CD. Rather than feature branching, everyone can work on a single branch, but the features that aren't ready yet can be disabled on prod. This decouples release and feature. Feature flagging is probabilistic because, in practice, it leads to stale branches.

In case of chaos engineering, a feature flag can help reduce blast radius and improve resiliency. Suppose a feature fails; that feature can be disabled at a run time until fixed. 

# Common ways of implementing Feature Flagging

## Storing flags
The simplest implementation of the feature flag is DB based. A list of features is stored along with a flag to enable or disable it. Each time a decision comes, DB is called to fetch the flag's status.

Environment variables can also be used. Configuration management systems like Spring Cloud Config can also be used to store flags.

# Enabling disabling 
The code has an IF else statement that enables or disables the feature.

An even better approach to IF else is dependency injection. If a class can be instantiated conditionally, then we solved the feature flagging problem cleanly.

Having a class per feature and inheriting a common interface is the best approach here. In the planning features section of this blog post, you'll find more ideas on how to reach this.

## End-to-end services
There are also full-blown services that help with feature flagging, like [LaunchDarkly](https://launchdarkly.com/blog/what-are-feature-flags/) and [FlagShip](https://www.flagship.io/)

# Resources

- [Feature Toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html#CategoriesOfToggles)
- [DevOps Concepts: Feature Flags](https://youtu.be/UwrJaOtS4ys): An introductory video that explains feature flagging and branching.
- [Feature Flags with Spring](https://www.baeldung.com/spring-feature-flags)
- [Togglz](https://www.togglz.org/quickstart.html): A java library for feature flagging. It comes with a UI.
- [FF4j](https://ff4j.github.io/): A java library similar to Togglz
- [Unleash](https://github.com/unleash/unleash-client-java): Probably the best open source feature flagging product.
