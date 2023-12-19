---
toc: false
comments: true
description: Speed up fetching of child entities
tags:
 - spring-boot
 - database
title: Solving N+1 Problem in Hibernate
publishDate: 2021-08-01T20:52:08.052481
permalink: /n-plus-one-hibernate/
image: /images/n-plus-one.svg
---

## N+1 Problem

If you are working with JPA entities and you have joins. Then you might have faced this problem.

If you have something like `@OneToMany` mapping between a parent and a child and fetch parent. All the child entities will be fetch one by one is a kind of a loop.

You can check this behavior by using the following `application.properties` and then checking logs.

```
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.properties.hibernate.format_sql=true
```

So if you have 2 records for parent and 4 corresponding child records.

A total of 2*8 separate queries wil be run.

![](/images/n-plus-one.svg)

| Query Number | Purpose                                       |
|--------------|-----------------------------------------------|
| 1            | Fetch Parent Entity: id_1                     |
| 2            | Fetch Child Associated with parent id_1: id_a |
| 3            | Fetch Child Associated with parent id_1: id_b |
| 4            | Fetch Child Associated with parent id_1: id_c |
| 5            | Fetch Parent Entity: id_2                     |
| 6            | Fetch Child Associated with parent id_1: id_d |
| 7            | Fetch Child Associated with parent id_1: id_e |
| 8            | Fetch Child Associated with parent id_1: id_f |

If similarly you have a 1000 records and 10 corresponding child records.

Then 1000*10 = 10,000 queries will be run.

This is inefficient.

We need some way to reduce the number of query calls. Even if the amount of data is the same, the cost of running more queries is much higher that getting the same amout of work done with less number of queries.

## FetchModes

FetchModes allow you to say to Hibernate to fetch all childrens at once instead of fetching them one at the time.

FetchMode is different from FetchType.EAGER or LAZY. The former is used to decides where to fetch children along with parent or later when needed.

### FetchMode.JOIN

```java
    @Fetch(FetchMode.JOIN)
    List<EntityType> entityName;
```

One a single query will be run.

If you are using this, all data will be fetch at once using join but the payload size will be huge.

### FetchMode.SUBSELECT

```java
    @Fetch(FetchMode.SUBSELECT)
    List<EntityType> entityName;
```

If used a minimum of 2 queries will be run.

- One for parent @Entity
- One for for each child @Entity type will be run. After the query is run all chilren of particular type will be fetched.

FetchMode.SUBSELECT is also seems to better when used to FetchType.LAZY. Here, all parent entities will be fetched first. When child entities are needed, all child entities will be fetched at once instead of multiple queries.
