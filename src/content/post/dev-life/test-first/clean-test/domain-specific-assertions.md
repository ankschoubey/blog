---
comments: true
excerpt: "Domain-specific assertions can help create an extremely clean test base. Learn how to create your own manually or with LLM."
tags:
 - technical
 - clean-code
 - testing
 - LLM-prompt
publishDate: 2024-09-28T20:52:08.052481
slug: /software-blog/domain-specific-assertions/
title: Writing Cleaner Test with Domain-Specific Assertions
image: /images/software-blog/domain-specific-assertions.png
---

Tests need to be as clean as the code we write. A clean test is faster to write, easier to understand, debug, maintainable, and extensible. i.e. a clean test has similar qualities as clean code.

Personally, I see more care applied to code than tests. When I write new tests in a Test file that lacks specific encapsulations, I mostly spend 3-4 times more time writing tests and still being under-confident about the tests.

Like clean code, writing clean tests requires an initial investment in setting up the test infrastructure. Some of these techniques I have talked about before:

- [method/when/then pattern](/method-when-should/)
- encapsulated [tests data creation with factory methods](/test-data-factories) or builder (I prefer builders now)
- [in-memory database for faster test](in-memory-repositories-unit-test/)

Apart from these, there are some patterns I have implemented which I'll talk about in the upcoming blog posts:

- Custom Mocks and Custom Bean Decorators for Tests (⛓️‍💥 TODO)
- Encapsulating WireMock / Mock Server (⛓️‍💥 TODO)
- Easy Random for Quick Data Generator (⛓️‍💥 TODO)
- Custom Extensions for JUnit (⛓️‍💥 TODO)
- Testing Red Flag: Too many acts. Too Many Assertions. (⛓️‍💥 TODO)

This blog post will talk about Domain Specific Assertions which will extend the blogpost on [Fluent Assertions](/software-blog/fluent-assertions) I wrote a while back.

```java
blog DomainSpecifAssertions extends FluentAssertions 🙃
```

## Introducing Domain Specific Assertions

When using assertJ or any other testing library we typically get something some value from expected and get some value from actual and try to match them.

**Example**:

```java
// 64 characters
assertThat(movie.getName()).isEqualTo(expectedMovie.getName());
```

We may have some assertions which are repeated often.

For **example**, suppose we always assert the actor names something like this.

```java
var actors = movie.getActor().stream().map(a -> a.getName()).toList();
assertThat(actors).contains(”Tom Cruize”);
// 113 characters
```

Typically we create a helper method to help us assert. However, the typical way of making a helper method makes it complicated.

Luckily, AssertJ provides an [AbstractAssert](https://joel-costigliola.github.io/assertj/core/api/org/assertj/core/api/AbstractAssert.html) class that can be extended to create Domain Specific Assertions that can look something like this:

```java
assertThat(movie)
 .hasName(expectedMovie.getName())
 .hasActorWithName(”Tom Cruize”);
// 86 characters 
```

## Implementation

Use this implementation or use the LLM prompt I have provided in the next section.

### Step 1. Create a class that extends AbstractAssert

```java
class MovieAssert extends AbstractAssert<MovieAssert, Movie> {
   public MovieAssert(Movie actual){
    super(actual, MovieAssert.class);
 }

 public MovieAssert hasName(String expectedName){
  if(!expectedName.equals(actual.getName())){
   failWithMessage("Expected movie anme to be %s but was %s", name, actual.getName());
 }
  return this;
 }

 public MovieAssert hasActorWithName(String actorName){
  var actors = movie.getActor().stream().map(a -> a.getName()).toList();
  assertThat(actors).contains(”Tom Cruize”);
  if(!actors.contains(actorName)){
   failWithMessage("Expected movie anme to be %s but was %s", name, actual.getName());
 }
 }

 ... more methods here...

 ... the more complex your assertions are, the better it is to encapsulate it within a method here ...
}
```

Note: Even though it feels like we are writing more code, it's actually the same amount of code we would have written with a typical assertion helper method. The beauty of AssertJ extension is how clean and domain-specific assertions become.

## Step 2. Create a base class and add an assertThat method

```java
class BaseAssertions extends Assertions {
 
 public MovieAssert assertThat(Movie movie){
  return new MovieAssert(movie)
 }

 ... add other Domain Specific Assertions here ...
}
```

## Step 3. Extend base class

```java
class MovieTest extends BaseAssertions{

 @Test
 void addActor_shouldAddActorToMovie(){
  // given
  Movie movie = new TestMovieBuilder().build();
  
  // when
  movie.addActor("NTR Jr");
  
  // then
  assertThat(movie)
 .hasActorWithName("NTR Jr")
 ... other methods ...
 }
}
```

Something to think about: I think such a thing is also easy to create in typescript. You just need to extend check the type and return the right value.

## What to generate Domain Specific Assertions

You can generate these domain-specific assertions for all things you assert which typically include:

- entities
- response classes
- value objects

## Autogenerating Domain-Specific Assertions

There are two ways to auto-generate these domain-specific assertions.

1. Using LLMs like GitHub Copilot
2. Using [AssertJ Assertions generator](<https://joel-costigliola.github.io/assertj/assertj-assertions-generator.html>)

- currently does not work with Java 17. They plan to launch a newer version soon.

For generating with LLM you can use the following prompt. Add more details to it as needed.

```java
## Task

Generate Domain Specific Assertions

## Details: 

Generate a domain-specific assertion for this class for AssertJ. Extend AbstractAssert.

For each field in the source ensure these methods exist in the assertion class.

has{fieldName}() - if this method is present
notHas{fieldname} - fieldName not present
has{fieldName}(value) -> compare value

For fields that are other tables add another method that takes UUID.

has{fieldName}(UUID id) then compare by field.getId() with the id passed

Make sure to use String formatting.
```

This can help you create a skeleton. But you'll need to add the custom methods if your assertions are complex.

## Recap

- Writing a clean test is as important as writing clean code.
- We can write cleaner assertions by creating our own domain-specific assertion
- To create domain-specific assertion for AssertJ

 1. Create a class that extends AbstractAssert
 2. Create a base class with the assertThat method which will create our Domain Specific assertion class
 3. Extend your test class with the base class and use

- Instead of writing the code yourself, use an LLM to generate the code for you.
  - Or look out for the release of a newer version of [AssertJ assertions generator](https://joel-costigliola.github.io/assertj/assertj-assertions-generator.html)

Look out for more blog posts coming in the future.

## Resources

 I stand on the shoulders of experts

- Petri Kainulainen - [Writing Clean Tests - Replace Assertions with a Domain-Specific Language](https://www.petrikainulainen.net/programming/testing/writing-clean-tests-replace-assertions-with-a-domain-specific-language/)
- [AssertJ Assertions Generator](https://joel-costigliola.github.io/assertj/assertj-assertions-generator.html)
- [Custom Assertions section of AssertJ - fluent assertions java library](https://assertj.github.io/doc/#assertj-core-custom-assertions)

**🙋‍♂️ Question: How do you ensure your tests are clean?**
