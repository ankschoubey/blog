---
comments: true
excerpt: Find out a naming convention and package structure to generate clean event sourcing code.
tags:
 - Technical
 - event-sourcing
 - architecture
 - arch-unit-example
publishDate: 2024-03-27T20:52:08.052481
slug: /software-blog/event-sourcing-naming-convention
title: Event Sourcing - Good Naming Convention, File Organization and Enforcing with ArchUnit tests
image: /images/software-blog/event-sourcing/event-sourcing-naming-conventions.png
---

<style>
  img {
    background: white;
    margin: auto
  }
</style>

I find naming conventions and general software organization to be the most important thing more than I like well-tested code. This is because if everything has a good naming convention and is organized, it's easier to maintain and add new features.

This post explains

- How SOLID applies to my implementation of Event Sourcing.
- Challenges of naming convention and organization in Event Sourcing
- Naming conventions and organizations, I created
- How I used Arch Unit Tests to enforce the architecture.

Throughout this post, I'll explain the thought process I had to come up with.

This post builds over the ideas of my previous one: "[5 Step Implementation of Custom Clean Event Sourcing in Spring Boot (without AggregateRoot)](/software-blog/event-sourcing-spring-boot-implementation)".

## How SOLID applies to my implementation of Event Sourcing

When doing Event Sourcing, your service methods are tiny. At least the way I implemented it, without creating a specific aggregate root class, I made a lot of smaller `CommandHandler` classes that could be added with time. (Open to Extension. Closed to Modification).

Each `CommandHandler` would be created and modified for only that purpose. This ensured Single Responsibility.

Instead of `@Autowiring` specific `CommandHandlers`, I managed to get the `CommandHandlers` at run time. Also, Spring helps here. So, I autochecked the Dependency Injection Box. (This has been [described in the previous blog post](/software-blog/event-sourcing-spring-boot-implementation))

Lucky for me, all the `CommandHandler` Interface has things that were needed. No class was forced to use an interface they didn't need. Therefore, I auto-checked Interface Segregation.

Since I didn't have a major Parent Class child class thing, I auto-checked Liskov's Substitution.

Even with all these sorted, I had a few challenges to take care of.

## Challenges of naming convention and general organization

Without Event Sourcing, you'd have a single Service class with all the service logic. The likelihood of this service class being too large is high.

With Event Sourcing, the business logic inside the service class was distributed to smaller Commands and `CommandHandlers`. This made the service class much smaller.

But this made the number of Command and `CommandHandler` too be too large. Enough that:

- I had to look through the package to find out what classes existed.

My package looked something like this

- events package

- `MovieCreateCommand`
- `MovieCreateCommandHandler`
- `UpdateMovieNameCommand`
- `UpdateMovieNameCommandHandler`
- `MovieReleaseDateChangeCommand`
- `MovieReleaseNameChangeCommandHandler`
- `MovieActorAddCommand`
- `MovieActorAddCommandHandler`
- `ActorRemoveFromMovieCommand`
- `ActorRemoveFromMovieCommandHandler`
- `DeleteActorFromMovieCommand`
- `DeleteActorFromMovieCommandHandler`
- ...

As you can see, looking at these many classes is an eye soar. Mainly because they are flat.

I needed to organize this in a way that.

- I don't have to guess which Command to use.
- If I have a good naming convention, I can quickly type a name, and IDE autocomplete could suggest the appropriate one.
- If I need to go and see the file and package, it would be in a way that makes sense.
- I needed to reduce the file names. They had started becoming too big.

## Package Structure

I thought about what kind of Commands I have.

I have and will always have 3.

- `Create`
- `Update`
- `Delete`

Therefore, I created three packages.

- commands (renaming events to commands)
  - `creation`
  - `updation`
  - `deletion`

I found it helpful to consider the domain structure for packages inside updation.

For example, if the movie's JSON response looks something like

```json
{
  "movieId": "",
  "movieName": "",
  "shootingLocations": [],
  "mainRoles": {
    "director": "",
    "leadActor": ""
  }
}
```

It's better to model the nested keys inside the updation.

- `commands`
  - `creation`
  - `updation`
    - `shootinglocations`
      - `...commands related to shooting locations...`
  - `mainroles`
    - `...commands related to main roles ...`
  - `deletion`

## Standardizing naming convention

Knowing a `Command` and `CommandHandler` from its name was important to distinguish it from other classes. Therefore, I initially added the postfix `Command` and `CommandHandler`.

Since `Command` and `CommandHandler` make file names really long, they'd be used repeatedly; I came up with the following abbreviations.

- `C` = `Command`
- `CH` = `CommandHandler`

Commands can be of Three Types: `Create, Update, Delete. So Therefore

- Naming a Command: `{Type}{NameThatIncludes}C`
- Naming a Command Handler: `{Command}H`

For example,

- `CreateMovieC`, `CreateMovieCH`

Update Commands should include entity name: `Update{Entity}{Attribute}C`

Example:

- `UpdateMovieNameC`, `UpdateMovieNameCH`
- `UpdateMovieReleaseDateC`, `UpdateMovieReleaseDateCH`

This made it easy to develop a new name and guess existing names. I could be at a specific part of the code with a particular movieId, and I wanted to update its attribute. All I have to do is guess it.

For example, If I want to add a new actor to a movie, I can guess the name like this.

- `UpdateMovieAppendActorC`

And the probability is high that such a command exists since everyone uses the same convention.

Note: I created a command that focused on updating attributes. You could also create `Command`s that focus on the domain. For example, consider a banking command.

- Instead of `UpdateAccountRemainingC`, which focuses on attributes, you could create `UpdateAccountCreditC` or simply `CreditAccountC`. This depends on what's right for your domain. I'll be writing a separate blog post on what commands to create [Todo]

## Combining Package Name and New Naming Convention

So, I have two entities: `movie`s and `actor`s.

For movies, the output is like this. Note how the actor is a nested key inside the movie.

```json
{
  "movieId": "007"
  "movieName": "Skyfall"
  "actors": [
    {
      "actorId": "1",
      "name": "Daniel Craig"
    }
  ]
}
```

**Note:** The actor is a separate entity and can be returned separately.

Using the above naming convention and package structure, you'd get something like this

- `movie`
  - `command` - Package that includes all the commands
    - `creation`
      - `CreateMovieC`
      - `CreateMovieCH`
    - `updation`
      - `UpdateMovieNameC`
      - `UpdateMovieNameCH`
      - `actors` - nesting
        - `UpdateMovieAppendActorC`
        - `UpdateMovieAppendActorCH`
        - ...
    - deletion
      - `DeleteMovieC`
      - `DeleteMovieCH`
      - ... other packages related to the movie...
- `actor`
  - `command`
    - `creation`
      - `CreateActorC`
      - `CreateActorCH`
    - `updation`
      - `UpdateActorAgeC`
      - `UpdateActorAgeCH`
      - ...
    - `deletion`
      - `DeleteActorC`
      - `DeleteActorCH`

## Arch Unit Tests

[ArchUnit Tests](https://www.archunit.org/) allow you to enforce architectural decisions such as certain fields in certain classes should always be final. I use ArchUnit all the time to enforce architecture.

I'm going to provide the pseudocode as they are a one-to-one translation to arch units fluent API. These are the ArchUnit tests are wrote for ES.

- Classes that are end with `C` should extend `Command` class.
- Classes that extend `Command` class should end with `C`
- Classes that extend `Command` class should have corresponding `CH` class.
- Classes that end with `CH` should extend `CommandHandler` class.
- Classes that extend `Command` should start with `Create` or `Update` or `Delete`.
- Classes that extend `Command` and that start with `Create` should be declared in `*.command.creation.*` package.
- Classes that extend `Command` and that start with `Update` should be declared in `*.command.updation.*` package.
- Classes that extend `Command` and that start with `Delete` should be declared in `*.command.deletion.*` package.

There are many more ArchUnit tests you can think of.

## Concluding

Event sourcing is generally cleaner than typical architecture. But there are some things to keep in mind.

The number of `Command`s and `CommandHandler`s will explode, so you need some way to organize it.

Organize it such that you know precisely where each code will go. This will help you and your team be highly productive when creating an event-driven system.

Use ArchUnit tests which can help you structure and provide better maintainability to your code base. 
