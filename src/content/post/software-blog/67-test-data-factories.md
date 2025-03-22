---
comments: true
excerpt: Consolidating object creation, mock of methods and more.
tags:
  - technical
  - testing
  - clean-code
  - tdd
publishDate: 2022-05-03T20:52:08.052481
last-modified-purpose:
slug: /software-blog/test-data-factories
title: Writing cleaner tests with Test Data Factories
image: /images/test-data-factories.png
---

## **Problem**

A typical information-system application goes like this:

- Create a data object
- Create a repository/DTO to sync it with Database
- Create a service
- Create a REST API endpoint

So, when we write tests, we tend to initialize the data object and multiple places.

For me it has happened before that a single change to constructor has lead to changes are 100s of places. This manually change could avoided if I knew IntelliJ properly.

But without IDE features too, initializing a data class in multiple tests makes tests bulkier.

We can abstract away all these into a single class that can provide all the test data for a data-object. #encapsulation

For example:

You have a data-class `SampleDataClass`

```java
@Data
@RequiredArgsConstructor
class SampleDataClass{
    @NonNull
    private String name;

    @NonNull
    private String field2;

    ...
}
```

In tests you initialize each field manually,

```java
@Test //TEST 1
@DisplayName("SHOULD {someAssertion}")
void should{SomeAssertion}(){
    SampleDataClass sampleData = new SampleDataClass("name", "field2", "field3", ...);

    // calls and assertions
}

@Test //TEST 2
@DisplayName("SHOULD {second Assertions}")
void should{second Assertions}(){
    SampleDataClass sampleData = new SampleDataClass("anotherName", "field2", "field3", ...);

    // calls and assertions
}

//... more tests which declare data object
```

Here if you have to modify of add a new field, you'll have a hard time.

## **Solution**: Simple Test Data Factory

Instead, you can create a Test Data Factory. Something like

```java
class SampleDataTestFactory{
    class Given{
        public static aSampleDataClass(){ // Note here name doesn't matter
            return aSampleDataClass("aRandomName");
        }

        public static aSampleDataClass(String name){ // this is the only place where class is initialized
            return new SampleDataClass("name", "field2", "field3", ...);
        }
    }
}
```

Note the stucture of the classes. This is intentional.

When calling the method it would look something like this: `SampleDataTestFactory.Given.aSampleDataClass()`

This is a much fluent (english like) statement.

So now your tests can look something like this:

```java
@Test //TEST 1
@DisplayName("SHOULD {someAssertion}")
void should{SomeAssertion}(){
    SampleDataClass sampleData = SampleDataTestFactory.Given.aSampleDataClass();

    // calls and assertions
}

@Test //TEST 2
@DisplayName("SHOULD {second Assertions}")
void should{second Assertions}(){
    SampleDataClass sampleData = SampleDataTestFactory.Given.aSampleDataClass("anotherName");

    // calls and assertions
}

//... more tests which declare data object
```

Note that both Tests use a different simple factory method. One doesn't care what the name field is but other does.

Most of my test factories would initialize data randomly unless explicit value is needed which is very rare.

## **Extending Further**

Intially, I started with the just creating test data but then I realized I could club more common things in the Test Factory.

These include:

1. `APICalls` - Each method passes the parameters and return the result
2. `MockRepository`/`DTO` - returns an `OnGoingStub` for methods of repository
3. `MockService` - Similar to MockRepository but for service
4. `Helpers` - Special helpers methods for dealing with Data Object

All of these methods are `public static` and using them has the same fluency as above `SampleDataTestFactory.Given.aSampleDataClass()`
