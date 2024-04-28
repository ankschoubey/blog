---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - database
 - mongodb
 - spring-boot
 - tdd
 - tdd-example
publishDate: 2022-04-16T20:52:08.052481
last-modified-purpose:
slug: /software-blog/optimistic-locking-exception-mongodb/
title: Solving a OptimisticLockingException During Upsert in MongoDB-Spring Webflux
---

I faced a unique problem and it is worth writing about. The cause was parallel access and saving of a single document that caused `OptimisticLockingException`.

# **Problem**

I had a `@Document` which had to be manupilated. 

The `@Document` had a repository which extended `ReactiveMongoRepository`.

So it was something like this

**SampleDocument.java**
``` java
@Document("sample_document")
class SampleDocument{
    @Version
    Long version;

    @Indexed(backgroud=true)
    String customId;

    String fieldToBeModified;
}
```

Notice `@Version` annotation

**SampleRepository.java**

```java
interface SampleRepository extends ReactiveMongoRepository <SampleDocument>{
    Mono<SampleDocument> findByCustomId(String customId);
}
```

To update the document I had webflux code written like this:

```java
repository.findByCustomId(someString)   // Step 1
.flatmap(sampleDocument->{
    // manipulation of document         // Step 2
    return Mono.just(sampleDocument)
})
.flatmap(sampleDocument -> 
    repository.save(sampleDocument)     // Step 3
); 
```

As you can see, the code to fetch the document (Step 1) and to save (Step 3) back are two separate lines. Between the lines are steps to manipulate the document (Step 2).

This was what caused the problem.

MongoDB uses version field in a document to maintain Locking. If the current `version` is `10` and you try to save `8` then this would lead to `OptimisticLockingException`.

In a concurrent environment like webflux when multiple thread are reading from the same data, it's highly likely that the order the record is updated by some other thread before the current thread saves the data again.

This would specially be true where there are lots of upsert/update queries.

# **Solution**

To fix this I switched to manually writing an update query and executing with `MongoOperation`. 


```java
Update updateQuery = new Update(). // code to update document

return mongoOperation.findAndModify(query(where("custom_id").is(someString)), updateQuery, options().returnNew(true).upsert(true), SampleDocument.class)
```

Instead of 2 different DB actions. It became one DB Action.

The update query does not need to bring data back to Webflux server to manipulate the document. The document is manipulated at Database only. The database is therefore responsible for ordering the updates which was fine in my case.

# **Extra**: Finding root cause and fixing with TDD

I'm gonna try to provide examples of TDD wherever possible.

To find the cause, I suspected the data was being saved parallelly.

So I created a unit test as follows.

1. Manipulate documents parallel. This was done with `@RepeatableTest` and `@Execution(CONCURENT)`
2. Assertion wasn't straight forward with `@RepeatableTest` so I instead collected all version in a static list.
3. After all `@RepeatableTests` were over I asserted if version was as expected. 
4. I ran the code and saw `OptimisticLockingException` occuring and assertion failing.
5. I replaced `repository` `find` and `save` with `MongoOperation` `update` as described above.
6. The test passed.

```java
@Nested
@DisplayName("WHEN upsert is called parallely")
class WhenUpsertIsCalledParallelyTest{
    
    static final Long repeatTimes = 100;

    static final List<Long> allVersions = new ArrayList<>();

    @RepeatableTest(repeatTimes)                           // Part of Step 1
    @Execution(CONCURRENT)                                 // Part of Step 1
    @DisplayName("SHOULD manipulate a single record")
    void shouldManipulateASingleRecord(){
        // when:
            SampleDocument document = myService.upsert(someString).block(); // Part of Step 1
        // data collection:
            allVersions.add(document.getVersion());         // Part of Step 2
    }

    @AfterAll
    static void assertVersionIsRepeatTimes(){
        assertThat(Collections.max(version))                // Part of Step 3
            .isEqualTo(repeatTimes);
    }
}
```
