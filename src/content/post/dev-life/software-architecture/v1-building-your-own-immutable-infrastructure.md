---
comments: true
description: Placeholder 
tags:
 - web-development
 - software-architecture
 - configuration-management
publishDate: 2023-04-07T20:52:08.052481
last-modified-purpose:
permalink: /v1/building-your-own-immutable-infrastructure/
title: Immutable Configuration and Infrastructure - What they are and Where Can You Build Your Own
---

In a previous post, I talked about why [immutability is so important](https://www.ankushchoubey.com/immutable-objects/ "‌"). After writing that post, I came to see immutability in different forms at many places. One such place is Configuration and Immutable Infrastructure.

Immutable Configuration means, your configuration will not change once deployed. It’ll remain the same. It’s a combination of two things:

1. Your application does not maintain a state and neither maintains a database.
2. If you need to make changes, you don’t make changes to the existing deployment. You’ll instead create a new deployment with the changes.
3. The configuration is usually via JSON.

---

## Advantages

This has a few advantages:

1. Your deployments are clear: You know the if you have deployed something, they are exact. For example, if you are deploying with new changes and it fails. You still have the previous perfectly running deployment state.
2. Immutable means this is fast. Immutable infrastructures don’t have to provision for changes.

One of the most common places to use immutable infrastucture is Gateways. You set up the gateway once by providing config in form of `json` or `yaml`. Once that config is provided, there is no way to make changes to it.

## Considerations when building your own immutable infra

### Finding Good Use case

If you have a functionality where:

1. You have a set of configurations that are less likely to change.
2. The functionality does not need to maintain state.

You can choose to use immutable configuration.

For example, you have a list of items to be displayed that do not change regularly. You can save these as JSON configuration instead of DB. This way when you want to read that data, you don’t have to make a network call to the DB. This makes your config fast.

There is always a tradeoff associated.

### Tool

If you are using Spring Boot, you can use `properties` or `yaml` files to load up configuration at run time. For `javascript`, you can use `.ENV` files.

You can also create separate `json` files for your configuration.

Try to make these configurations modular.

# Validate your configuration

Run a script when the application starts to make sure all your configurations are loaded properly. The application should fail to start if the configuration provided isn’t provided well.

If you are using Spring Boot `@ConfigurationProperties` with `@Validated` would work.

In `javascript` you may have to write your own validator.

For `json`, you can create JSON Schema annotations.