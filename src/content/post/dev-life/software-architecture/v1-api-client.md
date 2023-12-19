---
comments: true
description: Placeholder 
tags:
 - microservices
 - distributed-systems
publishDate: 2022-12-03T20:52:08.052481
last-modified-purpose:
permalink: /v1/api-client-sdk
title: Why do microservices need an API client sdk for HTTP and Messaging?
image: /images/v1-api-client/header.png
---

![Amazon SDK](/images/v1-api-client/header.png)
<pre>Amazon SDK</pre>

## How does microservice usage ramp up?

Microservice usage scales very fast. At first, a single service is the APIs. Suddenly there is a bunch.

Each implements the same methods to access the same rest APIs. Each one of them would implement contract testing.

This is a wasted effort.

![Without API Client](/images/v1-api-client/without-api-client.png)

## API Client SDK

We can, as an alternative, create one client code and let everyone use it. Or one client in each programming language that uses it.

This gives us the following advantage:

1. Only the client code deals with the format of the API.
2. Only the client code needs to be contract tested.
3. If the endpoints of the API change, only the client code needs to be changed.
4. We can create a single @Value for the base URL for the client and inject it via a config server for all applications.
5. If we need to add micrometer-prometheus usage metrics for an API, we have one destination.
6. If we need to retire an API, we just add @deprecated and release the client.

The client would also include:

1. Request validation: To avoid unnecessary network calls.
2. Request Body POJOs: So that everyone uses the same format.
3. Response Body POJOs.
4. Standard Exception handling

![Without API Client](/images/v1-api-client/api-client.png)

## Message client

The same can be used for messaging like Kafka, where the client can include POJOs format and methods to publish messages in case of incoming webhooks.

## Conclusion

In conclusion, an API client would help reduce the efforts of all developers in developing and using an API. The developers using the client need not be concerned with how the API works internally, weather it works on REST, Graph QL, gRPC, etc. They just need to send and receive data in using the right client provided POJOs.
