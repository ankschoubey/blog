---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - distributed-systems
 - microservices
publishDate: 2022-06-25T20:52:08.052481
last-modified-purpose:
slug: /rule-of_thumb-distributed-systems/
title: Rules of thumbs for Distributed System
toc: false
---

# Don't distribute. Or atleast don't distribute early.

We have a tendancy to over engineer.

Having distributed system creates complexity. You want to avoid complexity as much as possible. Atleast early on.

If a single codebase can deliver good enough performance and is small/organized enough then there is no need of distributing.

It's easier to have everything very decoupled and in separate packages and then distribute things later if need arises.

# Separate database

Database for each service should be separate. Data can be shared either by having API call or by using message queue.

If the database is not separate, then the tendacy to make it spagati is high.

A potential exception to this is CQRS style services where one service writes the data and the other service reads the data. In this case, both services are highly coupled to each other.

# Prefer Event Driven Services

Message queues are highly decoupled and can scale very efficiently. Prefer having all internal sharing of data using message queue.

Preferable, publish every business object that the microservice handles.

This requires having good naming conventions.

Replication is okay in event driven microservices.

# Keep code and interface quality damn high.

In micro-services, you have to have a very high quality interface. This means Rest APIs, Kafka messages, etc. If quality/standards are not followed, then it effects every other service.

In monoliths, you can almost get away with everything. Specailly if the only consumer is your frontend.