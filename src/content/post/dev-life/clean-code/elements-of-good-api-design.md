---
comments: true
excerpt: 'Placeholder' 
tags:
 - middleware
publishDate: 2022-02-19T20:52:08.052481
last-modified-purpose:
slug: /good-rest-api-design/
title: Elements of Good REST API Design
---

Here are somethings about API design that I recently learn’t.

An HTTP Rest endpoint is divided into following.

- API name and Method
- Request
- Resposne

# Naming

A good API design has good naming. 

You want to always have API that refer t some “items”/”entity” nouns

so this is better

`/ducks` → get all ducks

`/ducks/{id}` → get duck by duck id

rather than

`/getAllDucks`

`/getDuckById`

Any good API has upper format rather than lower.

Always have plural names

# Request
## Request Methods

Now that name is sorted, how to we call these, let’s say we want to delete duck, in the bad way we could have had an API like /deleteDuckById

But even better is to use HTTP Methods. HTTP Methods provide intend to your API and reduce the number of API endpoints to remember at least from point of view of consumer.

to read it you read it something like this,

`Intend` → `API Name`

`GET` → `/ducks`

`GET` → `/ducks/{id}`

`DELETE` → `/ducks/{id}`

`POST` → `/ducks`

Ideally, POST isn’t supposed to be bulk insert.

## Request Headers

Some common onces are 

`content-length`

# Response

## Response Status Code

There are many standard response codes available.

200 → OK

201 → Created (Supposed to not have response body)

## Response Body:

HAL Format

## Response Headers

There are standard respose headers available.

Location: Location of newly created resources.

# Customizing the protocol

HTTP does not reenforce a lot of rules. Even though it it recommended ways are set,

I though Google would follow protocol to the bone but they too don’t. Looking at google drive through Chrome's network tab, I found they have their own way of doing things.