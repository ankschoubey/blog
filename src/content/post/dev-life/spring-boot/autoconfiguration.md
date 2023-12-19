---
comments: true
excerpt: Understanding and extending spring boot with custom AutoConfiguration
tags:
 - technical
 - spring-boot
 - configuration-management
publishDate: 2022-09-11T20:52:08.052481
last-modified-purpose:
slug: /autoconfiguration/
title: How AutoConfiguration works in Spring Boot
toc: false
image: /images/autoconfiguration.svg
---
![](/images/autoconfiguration.svg)

Everything in Spring Boot is configurable. This was very hard to understand, but here are some pointers that could help.

It was hard for me to extend and/or customize the core functionalities of Spring Boot. These are a few pointers that could help.

# `@Bean` s

Beans can be thought of as singleton classes. i.e. classes where only one instance can exist.

`@Beans` are created and managed by BeanFactory. And there is a Bean injector which injects beans where they are needed.

So, for example, you have a class A and a class B. 

class B is composed of class A, and you have added `@Autowired` to it.

When the class B bean is generated, the class A bean will be injected into it.

All @Component, @Service and `@Repository` are of type bean.

# `@Conditional` s

Beans can be generated on conditions.

For example, suppose a particular library exists only then can a bean be generated.

For example, in `spring-cloud` stream, Kafka beans would be generated if there is Kafka set.

# Everything would finally plugin to some lifecycle

All of spring, is a plugin architecture. The core of spring boot exists and everything else is a plugin that plugs into a spring boot lifecycle extending its core functionality.

Everything plugs into some spring boot lifecycle.

# Extending spring boot

Suppose you want to extend spring boots to your liking here is how you'd do it.

## Find all beans `@Bean` `AutoConfiguration`, `@ConfigurationProperties` and/or `@Value`

In IntelliJ, you can search usage for all Beans easily. These are the beans you can override.

Overriding these beans allows you to customize them.

Usually, Autoconfiguration classes end with the name `AutoConfiguration`, which makes them super easy to find.

Find ConfigurationProperties. Many beans depend on these or depend on `@Value`.

Configuration Properties and @Value are what is set by the properties file.

## Read the documentation.

In the documentation, you will likely find info on some beans you could modify or extend.