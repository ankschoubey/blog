---
comments: true
description: 'Placeholder' 
tags:
 - clean-code
publishDate: 2022-12-16T20:52:08.052481
last-modified-purpose:
permalink: /writing-log-messages/
title: Writing Meaningful Log Messages
---

Logs are every important when trying to debug an application. With proper logs, not only will it take less time to debug, it will make your code more understandable.

This post covers server side logs.

***

## **When to Log**

There aren't any good guidelines for when to log.

Logging too much can make your code ugly and slow. Logging to little makes it hard to debug.

These are some places where you may consider logging. 4th is non-compromisable though it is autoset by most programming languages.

There are 4 main places to log:
1. Conditionals -> Log level DEBUG
2. Loops -> Log level DEBUG
3. Major Processes -> Log level INFO
4. Exceptions -> Log level ERROR

After writing a piece a code, look at it and add logs wherever needed.

***

## **How to log**

Log messages should include the details of variables involved.

For example:

**Bad**: Does not mention variable details

Log message: `User does not exists`

```java
String id = "1";
String name= "Elon Musk";
if (repository.existsByIdAndName(id, name)){
    throw new UserDoesNotExistException("User does not exists")
}
```

**Good**: Includes variable details

Log message: `User does not exists with id=1 name= Elon Musk`

```java
String id = "1";
String name= "Elon Musk";
if (repository.existsByIdAndName(id, name)){
    throw new UserDoesNotExistException("User does not exists with id="+id + " name= "+ name);
}
```

**Even Better**: Includes variable details as map leading to cleaner log

I find it's even cleaner to print a map with key as variable name and value as actual value;

Format: `${human readable message}: {data1: value1, data2: value2}`

Log message: `User does not exists: {id: 1, name: Elon Musk}`

```java
String id = "1";
String name= "Elon Musk";
if (repository.existsByIdAndName(id, name)){
    throw new UserDoesNotExistException("User does not exists: {id: " + id +  ", name: " + name + "}");
}
```

Java also has `Map.of` that can allow writing maps in a single line. The only reason not to use it is that it doesn't allow null values.

You can also create your own Logger which prints a map of everything including null values.

## Quote your arguments

I find it better when arguments are quoted because it can show if items have empty spaces in them.

Bad: `User does not exists: {id: 1, name: Elon Musk }`

Good: `User does not exists: {id: '1', name: 'Elon Musk '}`

We can take a look at the second log and see we have an extra space in the end.

## More resources

- [Enterprise Application Logging Best Practices (A Support Engineer’s Perspective)](https://betterprogramming.pub/application-logging-best-practices-a-support-engineers-perspective-b17d0ef1c5df)