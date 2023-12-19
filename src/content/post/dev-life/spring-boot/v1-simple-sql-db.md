---
toc: false
comments: true
description: Placeholder 
categories: [database, information-system]
title: Keeping database simple
last-modified-purpose: appended Markdown to "Keep Data within Database Platform Independent"
publishDate: 2022-12-03T20:42:15.673574
permalink: /v1/simple-db
image: /images/v1-simple-db/trello-markdown.svg
---

Around 2 years ago, I wrote a blog post detailing how to keep backend DB Queries simple but it missed a very critical piece which is having a simpler DB.

This post highlights some of my DB preferences. A Database design is highly dependent on the application so there may not apply to every DB.

## Aim for DB with Only Tables. No Stored Procedures, Functions or Views

Your DB for the most part should be such that the only operation you to CRUD and simple lookups.

Therefore a lot of effort should be taken to designing extremely reusable and simple tables.

In one of my projects, I had created an extremely efficient data pipeline.

Their were multiple views in a hierarchical tree calling one another. If you looked up on root view and applied some filters, you would get the data you want. This data needed to be inserted into a separate table so I created stored procedure to do it.

In coming months, new things were added the stored procedure and it became so complex that it is now to risky to tinker with.

Therefore now, I prefer DB which has no DB side functions or procedures, or if possible without views. If there is a complex query I every much prefer storing and triggering the queries from on the backend server.

There shouldn't be multiple tables doing the same job.

## Simple and Reusable Tables

If you have a social media type feature, it is best to have a single table to track likes than have multiple like tables for each type of data.

## **Keep Data within Database Platform Independent**

A common problem that happens when you store something like HTML is what would happen if classes or tags are modified. One would have to write a migration script and image all the scenarious. This is a lot of work.

Therefore, database ideally shouldn't store HTML or a particular DSL.

Instead have a converter at the backend to do the conversion from data within database to HTML or DSL. This would mean that you can swap in and out different DSLs over the same data.

Markdown is a good example. Markdowns are light weight. Use Markdown based WYSWYG editor instead of HTML Based.

This is what trello seems to do:

![](/images/v1-simple-db/trello-markdown.svg)

## Column Names

For primary key `id` is enough.

Many prefer using `<table_name>_id` as primary key but adding `table_name` is unnecessary. We already know what table it is.

In case of joins between, `<table_name>_id` will be same length as selecting column with dot `<table_name>.id`.

Also, if you have just `id` you can quickly identify a foreign key which has column in this format `<table_name>_id`.

## Indexing

I identify the columns which require joins or search.

And then index in the order in which they are called most.

## Liquibase XML Format

Liquibase is a tool for managing DB Deployments.

Using something like Liquibase XML format allows you to be DB independent and makes migration easy.

## For Complex Analytics Operations

For complex analytics use cron jobs to store data in separate table [^1] or use Materialized Views [^2]

[^1]: TechLead
[^2]: Designing Data Intensive Applications by Martin Kleppmann