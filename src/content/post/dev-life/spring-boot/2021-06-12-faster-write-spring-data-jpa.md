---
toc: false
comments: true
description: Placeholder 
categories: [spring-boot, database, information-system]
publishDate: 2021-06-12T20:42:15.674574
title: Faster SQL Batch Save in Spring Data JPA
permalink: /batch-save-spring-jpa/
---

By default in Spring Data JPA, when you save a list of entities a for...loop runs storing each record one at a time.

This would take a lot of time to execute. This is because the value of `@Id` often needs to be fetched from database and set to the `@Entity` before save. Therefore multiple transactions need to me made.

You can check this behavior by using the following `application.properties` and then checking logs.

```
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.properties.hibernate.format_sql=true
```

## Speeding Up Writes

Spring Data JPA allows for storing multiple records at once but multiple things have to be set first.

### 1. Switch to Sequence Generator for primary key
Batch writes does not work with `GenerationType.IDENTITY`.

Make using sequence_generator

```java
  @Id
  @SequenceGenerator(name = "seqName", sequenceName = "seqName", allocationSize = {allocationSize})
  private Long id;
```

The {allocationSize} is how many writes you wish to do at once in case of a large list of entities.

#### 2. Create the sequence in your database 

Make sure that increment size is equal to {allocatedSize} used in `@GenerateValue`

#### 3. Add JPA Property

Add the following property

```
spring.jpa.properties.hibernate.jdbc.batch_size={allocatedSize}
```

#### Within Code

```java
    repository.saveAll(listOfEntities);
```

## How things work under the hood?

Once a list of entities need to be saved, JPA will make request to database for getting the next value of sequence generator.

This value will be set to the `@Id` of the first `@Entity`

Since we already have already provided {allocationSize}, JPA knows can automatically fill in values exist between the current value of sequence generator and the next.

Therefore JPA does not need to ask DB each time for the value to be set as primary key.

## Example:

There is a sequence which increments by 1000.

We want to save a list of 500 entities to the database.

JPA asks database for value of sequence.

Database return value of 1. 

JPA knows that the next increment is at 1000 so, it can fill in values between 1 and 1000.

JPA sets 1 to 500 to `@Id` field to entities. All the entities are together sent to the DB as a single transaction.

Suppose we get around want to save another 100 new entities.

JPA knows the last `@Id` it set was 500 and it was 499 more `@Id` values it can use.

So it for the new 100 entities, it set `@Id` values between 500-600 without asking Database for sequence value.