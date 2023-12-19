---
toc: false
comments: true
description: Placeholder 
tags:
 - clean-code
 - spring-boot
 - database
publishDate: 2021-06-12T20:42:15.692681
title: Art of Reducing Lines of Code in Java/Spring Boot
permalink: /clean-code-spring-boot/
---

While there are many techniques which are language agnostic, these are some of my favorites with Spring Boot.

# [Project Lombok](https://projectlombok.org/features/all)

Use this if you don't use Spring Boot with Kotlin. This will module will reduce side of code by around 15-25%.

Lombok allows you to generate java boilerplate at runtime by using Annotations such as: @ToString, @EqualsAndHashCode, @Getter/@Setter, etc.

My favorite onces are
- **@Data**: A shortcut for @ToString, @EqualsAndHashCode, @Getter on all fields, and @Setter on all non-final fields, and @RequiredArgsConstructor.
- **@Cleanup**: Automatically calls close() method in case of Streams and Connections.

# @RequestParam without Arguments

If the name of variable is same as value in @RequestParam, remove @Request Param.

# Remove @Column on @Entity

In a @Entity, if the name of variable is same name of column writing @Column is unnecessary.

By doing this, not only remove a line from every variable, the quality of code is better as there is naming is consistent between DB and backend.

# Use JPA @Repository Methods instead of Hibernate EntityManager/JdbcTemplate

Ideally your queries should be so simple such that the only type of read operation you do is simple CRUD.

Such simple queries are easier to understand and are a good sign of a well designed database.

Such operations are available out of the box with @Repository.