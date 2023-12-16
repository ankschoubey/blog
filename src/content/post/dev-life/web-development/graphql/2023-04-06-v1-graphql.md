---
toc: false
comments: true
description: Placeholder 
categories: [web-development, graphql]
publishDate: 2023-04-06T20:42:15.140795
title: GraphQL - Understanding its Advantages, Query Types, and Technical Functioning
permalink: /v1/what-is-graphql/
image: /images/v1-graphql.png
---

![GraphQL Logo](/images/v1-graphql.png)

I recently consume GraphQL queries. Here’s what I learned:

## What is GraphQL?

GraphQL is a way of getting data over HTTP in the form of JSON where the client has control over what data it receives.

While there are other JSON + HTTP standards, like Rest (for resources), OData (especially for higher complexity), etc.

GraphQL is what I believe is easier to implement for both client and server.

## Advantages of GraphQL for Consumer/Client

### The client gets only the fields it wants

Suppose you have a `User` record with the following schema,

```java
class User{
  String userId;
  String name;
  String address;
  String education;
  ...thousand other fields
}
```

You can define a GraphQL schema like this. This is the format the server can give data in:

```graphql
type query {
  user: [User]
}

type User{
  userId,
  name,
  address,
  education,
  ...thousand other fields
}
```

Now the client can decide what data it actually needs.

The client will write the query as follows

```graphql
query{
  user: {
    id,
    name
  }
}
```

Here the client will receive only the list of `{id, name}` and not other fields like `{address, education}`. Therefore, ideally,

- The payload size is less. So network transmission is ideally fast.
- Processing of data is fast, as certain fields that are not to be fetched can be ignored. For example, suppose some field like `image` takes a lot of processing to generate. If the client isn’t asking for `image`, we don’t need to process that field.

This also includes nested items

```
query{
  user{
    name: {
      firstName
    }
  }
}
```

### The client can ask for different types of data within the same request

GraphQL allows for fetching multiple requests at once. For example, you can have a query like below where both User data and Jobs data are being fetched

```graphql
query{
  users: {
    id,
    name,
    education
  }
  jobs: {
    name,
    publishedDate,
    educationQualificationRequired
  }
}
```

‌

This would mean multiple records would be fetched in a single request.

## Types of GraphQL queries

There are two main types of GraphQL Queries:

1. **Query**: retrieves data from the server.
2. **Mutation**: modifies data on the server.

I have explained the query above. So here I’ll explain Mutation.

Suppose you want to add a new user

You can create a GraphQL schema like this

```graphql
type mutation{
  createUser($username): User
}
```

The above schema means that `createUser` when called with a username will return the `User` object.

The client mutation query would involve two parts.

1. The query
2. Variables

### The mutation query

```graphql
mutate{
  createUser($username){
    id
  }
}
```

### Variables

```graphql
{
  username: "Tony Stark"
}
```

Here, `createUser` would be called with the `username` as "Tony Stark" and only the `id` would be returned. The client can choose to return other values like `name` as `createUser` supports them too.

## How does a Graph QL work technically?

GraphQL operates on a single endpoint, typically `/graphql`, that receives `POST` requests with a `JSON` body containing a `query` field, which specifies the data to be retrieved or modified, and an optional `variables` field for passing in arguments. 

```json
{
  "query": "schema which the client wants",
  "variables": {
    "in case your GraphQL": "has multiple queries"
  }
}
```

The server then returns a JSON response with a data field containing the requested data.

```json
{
  "data": {
    "whatever": "was defined in your schema"
  }
}
```

Ideally, you would have very limited headers like `authorization`.

Overall, GraphQL provides a more efficient and flexible way to query and modify data, making it a popular choice for modern API development.