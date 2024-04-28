---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - spring-boot
 - message-queue
publishDate: 2022-08-07T20:52:08.052481
last-modified-purpose: added CQRS
slug: /software-blog/what-when-to-publish/
title: What and when to publish on message queue
---

# Publishing Every Business Entity on each update/write. [^1]

Publishing every business entity is especially useful for event-driven systems.

Rather than writing code to publish after each saves manually, we can use event listeners. Event listeners would run a piece of code each time a specific event like database save occurs.

For example: Spring Data Mongo has `AbstractEventListener` and `ReactiveAfterSaveCallback`. 

```java
class SampleEntityDataPublisher implements ReactiveAfterSaveCallback<SampleEntity>{
    Mono<SampleEntity> onAfterSave(SampleEntity entity, org.bson.Document document, String collection){
        return Mono.just(entity)
            .doOnNext(entity-> Mono.just(entity)
                .flatMap(entity-> {
                    // code to publish
                })
                .publishOn(Schedular.elastic())
                .subcribe();
                );
    }
}
```

Above, Spring Webflux code, publishOn and subscribe ensure that publishing will run in a separate thread and doesn't affect the execution of the main thread.

# Publishing Commands

In the CQRS pattern, we publish every command instead of the end state. It's the consumer's responsibility to choose how to interpret that command.

For example, a command could be

1. Movie object "Thor" was created for the USA with Id 1. Actor: "Chris Hemsworth"
2. Movie object was updated. Name = "Thor: Ragnarok" for id 1.

A consumer service would be caring about counting movies by "Chris Hemsworth". It would ignore the second message since it isn't valuable for it.

[^1]: Anadi Misra