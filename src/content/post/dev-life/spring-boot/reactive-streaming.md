---
comments: true
excerpt: Placeholder 
tags:
 - technical
 - clean-code
 - reactive
publishDate: 2022-07-24T20:52:08.052481
last-modified-purpose:
slug: /reactive-streaming/
title: When doing reactive programming, 'aim' to have streaming end-to-end
toc: false
---

A streaming microservice works on streams of data rather than waiting for entire data to load before performing operations.

This means by definition streaming is much high performance and therefore a good aim to have.

# Example of Streaming and Non-Streaming Reactive Implementation

Suppose you have an application that shows a list of movies to users. The application comprises a frontend user view and a backend that talks to a database.

You have chosen Spring Webflux for the backend and Angular for the frontend since both provide reactive programming support. Webflux provides it with Project Reactor. Angular provides it with RxJs.

A non-reactive non-streaming way would have been something like this

1. Create an API endpoint that fetches all movies from the database to the backend service.
2 Once all the data is fetched, then create a payload to send to the browser. (Backend has to wait for fetching to be complete)
3. Once the complete payload is received by the browser, it will start rendering the details. (Browser has to wait for fetching to be complete)

**Spring Webflux backend**:

```java
return moviesRepository.findAll()
    .collectList() // this makes it non-streaming
    .flatMap(movies-> ServerResponse.ok().bodyValue(movies));
```
**Angular Frontend**: 

Typescript:
```typescript
this.httpClient.get("/movies")
    .subscribe( // this line makes it non-streaming
        movies=> this.movies = movies;
    );
```
HTML:
```html
<li *ngFor="let movie of movies">
    \{\{ movie.name }}
</li>
```

A reactive streaming implementation would be like this:

1. Start fetching movies from the database to the backend.
2. As movies are being fetched, start creating the payload and send that payload to the browser without waiting for other movies. (Backend does not wait for fetching to be complete)
3. Browser will receive a record and display it. When it receives another record, it will display that as well. (Browser does not have to wait for fetching to be complete).

This means that both your backend and your frontend have to be reactive-streaming.

**Spring Webflux backend**:

```java
    return ServerResponse.ok().body(moviesRepository.findAll(), Movies.class);
```

**Angular Frontend**: 

Typescript:
```typescript
    this.movies = this.httpClient.get("/movies");
```

HTML:
```html
<li *ngFor="let movie of movies | async; index as i">
    \{\{ movie.name }}
</li>
```

# When is streaming not-efficient

There are some cases where streaming isn't effective or can be used like:
1. Amount of data is too small.
2. Certain operations/transformations that require the entire data to be loaded. For example, HAL Format isn't possible with streaming.
3. Sometimes batch operations are more effective than streaming.

For example, while fetching movies, you have to also fetch data about movie stars from a separate table. Since many movies might have the same movie star, it may be more effective to fetch them once in bulk rather than in a streaming fashion for each movie.

These nuances depend on what you are trying to build. Therefore it is a good "aim" to have streaming end-to-end for true reactivity. But it isn't always applicable.