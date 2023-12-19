---
toc: false
comments: true
excerpt: Things that should take 0 coding effort
tags:
 - technical
 - clean-code
 - spring-boot
 - configuration-management
publishDate: 2022-04-27T20:42:15.360789
title: Make your code configurable.
slug: /code_configurable/
---

In one of the posts, I wrote previously I explain how [programming has become configuration](/config/).

Once you have made your software that might be part of it that might need change. Most changes are simple such as:
- Increasing the font
- Changing colors
- Somethings that work should work on specific environments or domains
- Features such as storage location

Rather than hard coding everything, make these things configurable.

Something that can be changed with just a click of a button or by changing properties or via Database.

Small things such as these should not take any time.

Also, if there is something that some thing which requires user preference, then give them the option to choose it themselves by making the configuration available to them via UI.

One of the easiest ways to do it is make all constants have default value but be configurable.

For example in Spring Boot you could use `@Value` with default value.

**Bad:**

```java
public static final String successMessage = "SUCCESSFUL";
```

**Good:**

```java
@Value("${success.message:SUCCESSFULL}")
public String successMessage;
```

Similar: [Programming is now Configuring](/config/)