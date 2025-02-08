---
comments: true
excerpt: Creative variable names in tests can make them fun and interesting to read.
tags:
  - technical
  - testing
  - tdd
  - clean-code
publishDate: 2022-06-25T20:52:08.052481
last-modified-purpose:
slug: /creative-variable-names/
title: Writing cleaner tests with creative variable names
image: /images/creative-variable-names.png
toc: false
---

Variable and method names provide a context that makes it easy to understand a piece of code.

Typically in code, it's enough to have the same variable name as the class name.

So for example, if you have a `User` class, the object name could be `user`.

```java
User user = new User(request.getFirstName(), request.getLastName());
```

This looks good in code but gets messy in tests especially when there are multiple instances of the same object.

```java
User user1 = new User("user 1 first name", "user 1 last name", ...10 other fields...);
.
.
.
User user2 = new User("user 2 first name", "user 1 last name", ...10 other fields...);
.
.
.
// someAssertionThatUses user1 And user2
```

A better approach is to use a [TestData class](/test-data-factories) which I have described in a separate blogpost

```java
User user1 = UserTestData.Given.aUser("user 1 first name", "user 1 last name");
.
.
.
User user2 = UserTestData.Given.aUser("user 2 first name", "user 1 last name");
.
.
.
// someAssertionThatUses user1 And user2
```

In the above statement, having the factory `UserTestData.Given.aUser` encapsulates creation making the test a bit cleaner.

But still, at the end of the test in the assertions section, the coder will have to remember what the data in `user1` and `user2`

A better way is to have creative variable names here.

```java
User tonyStark = UserTestData.Given.aUser("Tony", "Stark");
.
.
.
User steveRoggers = UserTestData.Given.aUser("Steve", "Roggers");
.
.
.
// someAssertionThatUses tonyStark And steveRogers
```

Now within assertion, the developer will know the exact data in both the `User` objects.

This not only makes tests cleaner but also makes them funny and exciting to read.
