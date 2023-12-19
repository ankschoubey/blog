---
comments: true
excerpt: Practical Chaos Engineering Part 1
tags:
 - chaos-engineering
publishDate: 2022-09-08T20:52:08.052481
last-modified-purpose:
slug: /response-type-field/
title:  A responseType field for all response classes
toc: false
image: /images/response-type-field.png
---

The inspiration for this blog post is [API response in a video by Chaos Monkey for Spring Boot](https://youtu.be/7sQiIR9qCdA?t=690)

A typical pattern for handling network assaults is Circuit Breaker.

A circuit breaker would replace a network delay or failure code with a fallback code, making the code resilient. 

Ideally, the user is indicated when fallback data is used.

This can be as simple as adding a `responseMetadata` field within HTTP Response.

```json
{
    content: {
        actualData
    },
    responseMetadata: {
        type: "STALE", // STALE, LATEST, FALLBACK
        updatedDate: "{dateObject}"
    } 
    ...
}
```

`type` could be 
- `STALE` for old data
- `LATEST` to indicate the data is current
- `FALLBACK` indicates neither `LATEST` nor `STATE`.

an `updatedDate` field 
- date of when something is updated

The frontend or client could read the `responseMetadata` and show a message to the user indicating that old data.

The client could also take further action on `responseMetadata`, like polling, after a little while until the response is `CURRENT`.

`responseMetadata` can be part of a parent class for all response classes. An ArchUnit test canenforce this behaviour.