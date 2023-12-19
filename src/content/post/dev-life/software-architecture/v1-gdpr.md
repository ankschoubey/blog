---
comments: true
excerpt: Placeholder 
tags:
 - security
 - compliance
 - system-design
publishDate: 2022-12-08T20:52:08.052481
last-modified-purpose:
slug: /v1/gdpr
title: Implementation GDPR - Download and Delete A Users Data in Microservice World
image: /images/v1-gdpr.png
---

Implementing GDPR-compliant microservices to get all user data and delete a user's data can seem very hard.

But now I think it’s way too easy to implement.

The approach described below can work at the enterprise level for enterprise apps. Just replace `user` with `enterprise` and `{userId}` with `{enterpriseId}`

![GDPR Implementation](/images/v1-gdpr.png)

Essentially, we can it in 4 steps.

1. Every data record should have `{userId}` indexed. Even messaging services like Kafka with a database backup should be indexed. Even storage services like S3 be segregated as `{userId}`.
2. Have all microservices have a DELETE `/gdpr/user/{userId}` endpoint: This endpoint hard deletes all user's data
3. Have all microservices have a GET `/gdpr/user/{userId}` endpoint: This endpoint returns all data from a user
4. Have an orchestrator GDPR microservice: This will call all other microservices for `/gdpr/user/{userId}`.

In case of getting data, it will collect all the data, upload it at some location for a certain number of days and notify the user about it.

The exact same interface is needed to hard delete data from backend ups as well.

<div style="display: none">
```mermaid!
graph LR
    a[fa:fa-server GDPR \n *Orchestrator* \n Microservice] --> |"DELETE /gdpr/users/{userId} \n GET /gdpr/users/{userId}"| M1[fa:fa-server Microservice A] 
    M1 --> |"Partition on {userId}"| M1 
    a --> |"DELETE /gdpr/users/{userId} \n GET /gdpr/users/{userId}"| M2[fa:fa-server Microservice B]
    M2 --> |"Partition on {userId}"| M2
    a --> |Delete data| C[fa:fa-database Backups]
    C --> |"Partition on {userId}"| C
```
</div>