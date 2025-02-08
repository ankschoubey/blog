---
comments: true
excerpt: Placeholder
tags:
  - technical
  - security
  - oauth
publishDate: 2023-02-01T20:52:08.052481
last-modified-purpose:
slug: /v1/oauth-scopes
title: Defining Scopes for your OAuth Service
toc: false
---

Here’s my thinking on how we should design scopes for OAuth. And how many a proper REST API could simplify the process.

---

In a rest API, we have resources. Our resources are usually accessed with just a noun.

so,

`GET` `/movies` to get all movies

`GET` `/movies/{movieId}` to get a specific movie

`PUT` `/movies` to modify a movie

`POST` `/movies` to add a new movie

`DELETE` `/movies/{movieID}` to delete a movie

---

Our Outh scopes are a restriction on resources

so, we would have scopes for `movies` resource.

We can append this with the kind of method that can be run on the resource.

---

For example:

`read:movies` -> allows `GET` calls on `/movies` REST API resource

`write:movies` → allows `POST` calls on the `/movies` resource.

`read:userinfo` → allows `GET` calls on the `/userinfo` resource

---

When the app is submitted to our "App Store“, the app developer declares an app, they are using a particular scope.

For example, let’s say an App that shows user recommendations has asked for `read:movies`, `write:movies and` read:userinfo` `.

The app developer has declared why they use each of the scopes. While declaring, they decide they aren’t using the `write:movies` scope.

So, they remove it. Or while reviewing the app submission application, the App Store platform rejects the request for accepting `write:movies` and asks for more clarifications.
