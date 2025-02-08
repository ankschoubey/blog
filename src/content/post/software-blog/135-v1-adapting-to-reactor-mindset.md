---
comments: true
excerpt: Placeholder
tags:
  - technical
  - concurrency
publishDate: 2022-12-15T20:52:08.052481
last-modified-purpose:
slug: /v1/webflux-mindset
title: Adapting to Project Reactor / Webflux Mindset
---

## No using .block() the event loop

## If you are going to block, block it the reactive way

## Methods should always return a Mono or Flux

Until something is part of the return chain tree, it won't be executed.

## Use Mono.error() instead of throwing

Mono methods should not throw anything

Instead of:

```java
.flatmap(pojo-> {
    throw new RunTimeException();
})
```

use:

```java
.flatMap(pojo-> {
    return Mono.error(new RuntimeException());
}
```

## Use Mono.fromFuture to convert from CompletableFuture to Mono

## use .collectList() only when needed

## Always keep things within mono flux chain

The way to hold on to a previous mono flatMap return is nested mono, flux call.

But try to keep things as flat as possible.
