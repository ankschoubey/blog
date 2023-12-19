---
comments: true
description: Placeholder 
categories: [database, no-sql]
publishDate: 2022-12-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/sql-and-no-sql
title: My experience working with MongoDB
image: /images/v1-sql-and-no-sql/header.png
image-fit: contain
---

![Header](/images/v1-sql-and-no-sql/header.png)

I used to work with SQL in the past. Nowadays I have been working with MongoDB. Here has been my experience.

## NoSQL is simple

NoSQL is much much more simpler than SQL. There are no need for multiple table. You can just nexts documents into one.

Unless something is an actual needs to be treated like Entity, you don't need a separate table/collection.

There is no need to go write a separate create query. Just push something to the DB and it gets saved.

The difference here is:

- SQL works on concept of schema on write. The data needs to have a particular schema.
- NoSQL works on Schema on read. The data can be with any format, but it's job of reader to intepret it the way it wants.

It's like working with file.

## What about integrities and foreign keys?

These maybe important for certain applications. But for most the simplicity of NoSQL is worth it.

For NoSQL, the backend-application which is responsible doing operations on the DB is the one than maintains the DB state. If you really need foreign key like constraint, you can just code it up.

## Browsing Data

Browing a JSON document store is painful in tree view. This is because you have to expand out each row to see what's in it. If you are using a NoSQL database, still use the table view.

**The painful tree view**

![Tree View](/images/v1-sql-and-no-sql/tree-view.png)

**Table view**

![Table View](/images/v1-sql-and-no-sql/table-view.gif)

[Image source](https://studio3t.com/knowledge-base/articles/table-view/#restore-default-view)