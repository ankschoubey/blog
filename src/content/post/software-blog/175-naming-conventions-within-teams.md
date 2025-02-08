---
comments: true
excerpt: 'Creating a good naming convention that can help you and your team maintain a clean codebase'
tags:
  - technical
  - clean-code
publishDate: 2024-02-24T20:52:08.052481
last-modified-purpose:
slug: /software-blog/naming-conventions-within-teams/
title: How to generate and enforce naming conventions for you and your team?
image: https://i.redd.it/pn6292mmqsy31.jpg
---

## Introduction of naming convention

A codebase following a standard naming convention can help you and your team create beautiful code with good semantics fast. It's a code base where it’s [easy to understand a group of related ideas, be it associated methods, related classes, related variables, etc.](/software-blog/benefits-of-good-naming)

The concept from the [previous post](/software-blog/good-variable-names) about coming up with good names is very relevant here. In the last post, we learnt how to make variables descriptive by including more details, domain knowledge, observations, etc. This post expands that concept further and introduces aspects of a team and large projects.

[Read the previous post before this one.](/software-blog/good-variable-names)

This post is for senior developers, team leads, architects and anyone aspiring to these positions. These techniques come from my hands-on experience as a #techLead.

## Benefits of having good naming conventions

A good naming convention standardized the codebase. This standardization has many benefits. Many of which were explained in the first post. But the main benefit is this:

### _No guessing of what names should be._

We developers can have a hard time coming up with names.

![](https://i.redd.it/pn6292mmqsy31.jpg)

When a naming convention is set, creating new names is easy without much thought.

In my previous post, I discussed how I have a naming convention for controller/handler methods.

```java
{HttpMethod}{UrlWrittenInEnglush}
```

So, if the REST API is this

```http
GET /movies/{movieId}
```

My Controller Code would be

```java
Movie getMovieByMovieId(String movieId)
```

or

```java
Movie getMovie(String movieId) // as you can get only one using id
```

If someday I have to create a controller for

```http
GET /actors/{actorId}
```

Creating a new controller name is easy; it would be,

- My prefix to the method is `get.`
- The URL part would be `actorByActorId.`

This makes the controller method to be

```java
Actor getActorByActorId(String actorId);
```

As you saw, there is no guessing and trying to come up with a descriptive name. Having a naming convention eliminated the waste of time. When a team member writes a code and follows the same naming convention, I can find that code easily, even if I haven’t seen it before.

## How do you create good naming conventions within a team?

### Identify something that’s repeated often

Multiple classes that do similar things. Multiple methods that do similar things. Etc.

Why do you want this convention? Making it easy to remember, standardizing code, etc.

Find such methods and see what is shared between them.

Some familiar places are:

- Common to Both Frontend and Backend
  - Different Types of Pojos
    - Request Pojos
    - Response Pojos
    - Message Pojos
  - Command Classes for Event Sourcing or Command Pattern
- For backend specifically
  - Controllers / Controllers
    - Methods within those controllers or handlers
  - Repository Methods
  - Services and Service Methods
  - Helper/Utility Classes or Methods
- On the frontend, specifically
  - Group of similar Components
  - Hooks
  - Store Selectors etc
  - CSS Classes

Once you have this kind of mental group, notice if they have similar naming conventions.

For example,

- `MovieService` has a method: `deleteMovie`
- `ActorService` has a method: `actorRemove`

When you look at the code, you find both codes are for deletion. Instead of having both different, you can name them similarly. In the above case, I would change to`deleteActor`.

Similarly, you might have created multiple reducers and slices if you are in the front end in Redux or any other state management library. Suppose you have a list of selector functions to select data from the redux store. (todo: put article related to redux). Here’s a sample list

- `selectMovie`
- `getActorByActorId`
- `obtainMovieByMovieName`

Etc. Here, we also see that every line selector function is different. We can make a naming convention always to use `select` when selecting data from the redux store.

So, the above list becomes

- `selectMovie`
- `selectActorsByActorId`
- `selectMovieByMovieName`

This is much cleaner than the one before. I have written a whole article on the Redux naming convention (todo: add article here). `select` is a commonly used naming convention for selector functions in the Redux community.

To summarize tip no. 1, find classes, methods, and variables that do similar things and name them similarly.

#### Some examples of bad naming conventions

This same principle applies to variables, too. For example,

Suppose there are three classes, each declaring the same variable differently.

- class one has `movieId`
- class two has `mId`
- class three has `filmId`

When reading the code, you would be very tricked. How would you know that these refer to the same data type without debugging and finding it out?? #youWon’t. Go ahead and rename them similarly.

- class one has `movieId`
- class two has `movieId`
- class three has `movieId`

Now it’s clean.

Some have a habit of writing either `key` or `id`, for example, `movieKey` or `movieId`. Try to one, `key` or `id`, once that’s most appropriate to your domain.

### Combine {verb}{entity?}{description} and other information to make it descriptive enough

You might have seen the pattern in the previous example: I almost have the verb at the start.

- `select`
- `delete`

I have a habit of always touching the code, renaming things or cleaning the code up. It’s my way of following the Boy Scott rule. I believe I unconsciously came to this approach:

```java
{verb}{entity}{description}
```

For example, instead of having a POJO,

- `MovieCreateRequest` would be `CreateMovieRequest`. I prefer `PostMovieRequest` as this POJO is used during post requests.

I’ll describe a situation where this unconscious behaviour of mine became conscious. I believe understanding this thought process would help you refine your own.

I was writing event sourcing and had many command POJOs to work with.

For example, consider this list. Note how each of them is different.

- `MovieCreateCommand`
- `UpdateMovieNameCommand`
- `AddActorCommand` (this Command actually adds an Actor to a Movie)
- `GenerateActorCommand`

The only thing common between them was the commandCommand. While writing my code, I had to look up which command class to use often. And with around 70-80 command classes, it has too much. So, I decided to come up with a naming convention.

I thought, how should I name these? What would be easy to remember and find? Then, I came up with the following model.

1. Each command class would only do one of these things: `Create`, `Update` or `Delete`
2. And then I would only update these entity classes, `Movie`, `Actor`, `Theatre` etc.
3. In the end, I would add `Command` to it.

Combining these, I got

- `CreateMovieCommand`
- `UpdateMovieNameCommand`
- `UpdateMovieAddActorCommand`
- `CreateActorCommand`

I thought about having an entity before a verb, but I thought it was easier to pronounce if the verb was upfront. For example, when asking yourself a question:

- Question: `What do you want to do?`
- Answers:
  - it’s much easier to say: “I want to `CreateMovie`"
  - Then to say: “I want to `MovieCreate`"

So, I stuck to `Verb` upfront.

These commands were now much, much cleaner.

If I wanted to remove an actor from a movie, I could easily guess the command object.

- Entity → `movie`
- Action I want to do → `update the movie`
- What exactly do I want to do → `remove an actor.`

So my command class would be `UpdateMovieRemoveActorCommand.`

The post-fix of `Command` was making my objects too long. I was using it to identify commands from other types of classes quickly. But since there were so many, I decided to go with an abbreviation, `C`.

Now my command classes looked like this:

- `CreateMovieC`
- `UpdateMovieNameC`
- `UpdateMovieAddActorC`
- `CreateActorC`

I try to follow the verb upfront idea in other parts of the code, too, like method names.

### Discuss and improve override it over

This advice is the same as the previous post: discuss it with the team. Multiple brains can be better than once sometimes.

I advise reading the previous blog post for this.

### Find a naming convention online

Sometimes, you won’t know what names to generate or what naming convention should be created.

CSS was one of the places where I had difficulty coming up with names. How should I name this better? I thought. Then, finally, I had to google it: how people call variables.

That search brought me to BEM.

BEM stands for

```css
{block}__{element}--{modifier}
```

For example, suppose you have a list of movies. I can come up with the following names:

- `.movie-list`
- `.movie-list__item`
- `.movie-list__item--selected`

I no longer have to think about how to name a DOM element and what CSS class should be. While I’d now prefer using tailwind instead of a CSS file, BEM is now my default way of thinking about components and [I find it very helpful when creating a DOM](/tdd/planning-dom '‌').

If you google, you’ll find many naming conventions. You may even find patterns.

## Enforce

### Document the naming convention and communicate with the team

I have a habit of talking about code with my colleagues. I would usually tell them how I have generated a naming convention.

But if you have a huge team, document. Write down what the naming convention is and why you created it. Explain the benefits.

During code reviews, you may have to enforce that naming convention. Explain the reasons again and help them understand and modify the code accordingly.

Explaining why is the most important thing a leader can do for their team. [^1]

If you are creating the naming convention for the first time, depending on how critical it is, set up a meeting and discuss it.

We want to ensure is that everyone in the team speaks the same code language because if they do, everything will be smooth. If they don’t, they’ll be confused all the time.

### Using Architecture tests and linters to enforce the naming convention

Even with communication, there may be instances where the team or even we need to remember what the naming convention was decided. #beingHuman.

To counter this, we require automation via linters and architectural tests.

Linters like sonar can be configured to alert if there are bad variable names.

For example, Creating a constant variable in Java with a camel case would fail. Suggesting you should use all caps and snake case.

- Not Allowed in Java: `final static String firstName = "name"`
- Allowed in Java: `final static String FIRST_NAME = "name"`

Linters can be configured to have many such rules and help enforce naming conventions.

Something similar to linters is Architecture Tests.

Architecture tests using libraries, such as Arch unit, allow you to generate a unit test to check the structure of your code. This has a smaller learning curve if you know how to create unit tests in your favourite language.

Suppose I, as a #techLead, want the names of my controller methods to look like this.

```java
{httpMethod}{url in english}
```

This is something I discussed in my previous post.

Here’s how I can write an arch unit test using the [Arch Unit Library](https://www.archunit.org/ '‌') in Java

```java
@Test
void controllerMethodFormatTest(){
  methods()
    .that()
    .areInClassesEndingWithSimpleName("Controller")
    .should().startWith("Get")
    .or().should().startWith("Post")
    .or().should().startWith("Patch")
    .or().should().startWith("Put")
    .or().should().startWith("Delete")
    .or().should().startWith("Options")
    .check(getAllClasses());
}
```

When the test runs, the assertions will fail for Controllers methods that don’t follow the format.

I found the arch unit very helpful to enforce a naming convention or an architecture permanently. This is especially helpful as team size grows.

## Concluding

Creating and following a good naming convention can help you and your team be maximally productive. Everyone in the team can think similarly about variables, methods and classes. #aSharedMind

There are two stages to the process:

1. Creating a good naming convention
2. Enforcing and following the naming convention

To create a new naming convention:

- Find something that repeats often. This is your candidate.
- Use thinking frameworks such as `{verb}{entity}{description}`. This can be very helpful when sharing within the team.
- Discuss and iterate over the convention with your team over time. We work as a team. Sharing and collaboration can help us reach better outcomes.
- Find naming conventions online, especially if you are building something familiar.

To enforce a naming convention,

- educate the team and have a healthy, continuous discussion.
- Automate using linters and create architectural tests.

With these techniques, you’ll have a very clean, descriptive codebase, which will be a joy to work with.

**What are some naming conventions that you and your teams follow?**

[^1]: Dichotomy of leadership.
