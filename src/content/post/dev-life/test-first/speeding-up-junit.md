---
comments: true
excerpt: From 8 minutes to less than 3 minutes.
tags:
 - spring-boot
 - tdd
 - testing
publishDate: 2022-07-30T20:52:08.052481
last-modified-purpose:
slug: /spring-boot-junit-faster/
title: Speeding Up Spring Boot/JUnit tests
image: /images/spring-boot-junit-faster/header.png
---
![JUnit Logo](/images/spring-boot-junit-faster/header.png)

{% include note.html content="For beginners: Tests provide fast feedback to your code and ensure everything works as you intended. Rapid tests help get feedback and ensure your integration and deployment pipelines work faster." %}

There are several ways I recently discovered that increase speed on Spring Boot + JUnit tests substantially. From 8 minutes to 3 minutes.

Some of these are

1. Use Right Test Slice (Saved 25% running time)
2. Speeding up @SpringBootTest and avoiding @DirtiesContext (Saved 25% running time)
2. Run tests in parallel (Saved 37% running time)

***

# **Use Right Test Slice** (Saved 25% running time)

Several runners come with Spring Boot. 

`@SpringBootTest` is the most general of them. Primarily this is used in combination with `@DirtiesContent`, which will restart spring boot after every test class by default which isn't ideal.

Using `@SpringBootTest` is Integration Tests. We don't want every test to use this.

We want to load the minimum spring-boot infrastructure as possible and still ensure accurate tests. There are a few things that can help:

1. If tests are related to a DB. Use `@DataMongoTest` or equivalent JPA runner with `@Import` annotation.
2. If tests are related to Web/Controller. Use `@WebFluxTest` or equivalent Spring MVC runner. If you want to use embedded MongoDB with it, use `@AutoConfigureDataMongo`. Most other systems also have annotations starting with `@AutoConfigure{systemName}`
3. **Important**: If tests require initializing a single bean. Use `@ExtendWith(SpringRunner.class)` with `@Import` to specify the bean to initialize.
4. The best case: Aim for Tests that are purely java based and do not involve spring boot, but it isn't possible in every scenario.

# **Speeding up @SpringBootTest and avoiding @DirtiesContext** (Saved 25% running time)

`@DirtiesContext` is an annotation that recreated the Spring Context after each test or each test class. To avoid using `@DirtiesContext`, ensure all your tests don't depend on the same data. For this, you can wrap your data creation in a [test data factory](/test-data-factories) and ensure the data produced is random.

As previously mentioned, one should avoid using `@SpringBootTest`, but if you can't do without it, ensure you use `WebEnvironment.MOCK`  without `@DirtiesContext`.

`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)`

Try to use it with `@Import` or `@ContextConfiguration` to limit the creation of beans.

***

# **Run tests in parallel** (Saved 37% running time)

Create a `junit-platform.properties` file in `test/resource/junit-platform.properties` and add the following minimum. [^1]

`junit.jupiter.execution.parallel.enabled = true`

Now you can either use one of these,

1. add the following to every class you want to run parallel. `@Execution(CONCURRENT)`
2. add more to `junit-platform.properties`

```
junit.jupiter.execution.parallel.mode.default = same_thread|concurrent
junit.jupiter.execution.parallel.mode.classes.default =  same_thread|concurrent
```

![](/images/junit-execution-mode.svg)
[^1]

Some tests can't run parallelly, so I prefer manually adding  `@Execution(CONCURRENT)`.

I found data tests with `@DataMongoTest` by asserting over different data.

Another positive side effect of having `@Execution(CONCURRENT)` is that these tests run first. And since these tests are faster than the SAME_THREAD mode, they lead to instant feedback.

***

What are some other ways to speed up JUnit performance?

[^1]: [Parallel Execution - JUnit Documentation](https://junit.org/junit5/docs/current/user-guide/#writing-tests-parallel-execution)