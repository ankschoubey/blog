---
comments: true
excerpt: 'Implementing event sourcing in Spring Boot from scratch is easy. You just need to understand some core concepts.' 
tags:
 - technical
 - event-sourcing
 - architecture
publishDate: 2024-03-24T20:52:08.052481
slug: /software-blog/event-sourcing-spring-boot-implementation
image: https://mermaid.ink/img/pako:eNptUslu6jAU_RXLKyKRCDIwZPEWr4NaqYNU2k0JC7_4AlFjO3IcWor493ooU16uFMk-PjnnHl_vcC4o4BQvS_GZr4lU6OEl40jXW0WJgkexKeCJMLgSjBFOe7027nnI99HQ9_-gqlG_NCdRN_9WklRrZNkzkJsiB3dkqk03tQL1zOFWCjZTQsIBdgQ4ME9_Gu8QGfMNKQvT2YXk_0S_bdFFXAEHqbUs_xjVJac3G-BqPu-EFwvbi11b9XnP8uozyFs4y3ZU40WqqtxeJOhgnes7Uiu7Jl2tIf9A90vXPbqn6Eko9AIlkBqo9eq8sOPIusd_p78S5GletJCQq0Jw9Pf1hHZKmzrPp5tgRj6oQR19erk7DFbnoOd1X45-ELiPGUhGCqpf8c7AGVZrYJDhVC8pkR8Zzvhe80ijxGzLc5wq2UAfNzbidUF0YnYAK8LfhdDbJSlrt8fpDn_hNA6ieDqOh1EySsIkHA_7eIvT4WgSjEZxmMRRNB3EURjt-_jbKgyCqavJYJyMwzCa7H8AGEscsw?type=png
title: 5 Step Implementation of Custom Event Sourcing in Spring Boot
---

<style>
  img {
    background: white;
    margin: auto
  }
</style>

In the [last post](/software-blog/what-is-event-sourcing), I described what event sourcing is and what the benefits of doing it are. Event Sourcing helps you:

- Be prepared for the future by creating excellent analytics that are out of the box.
- Leads to multiple smaller pieces of code over one large piece.
- It's easier overall compared to regular code.
- It's cleaner, much more precise, and infinitely reduces the chances of bugs.

Event sourcing is one of the best pieces of code I have written, something I have been very proud of. I learnt ES from YouTube and implementing a well-architected redux on the front end (which is also message-based). (TODO: Add an article here).

## Implementing Event Sourcing From Scratch

ES's core is small, but there are pieces to understand precisely. Below, I'll attempt my best to describe ES. Here's what I'll explain:

1. Understanding Basic Flow of the application
2. Creating an Event Store
3. Creation of main Event Sourcing Service
4. Creation of Commands
5. Creation of Command Handler

Note that I did not use existing Spring Related Frameworks and instead created something of my own.

The following is inspired by Axon Framework and multiple YouTube videos.

### Step 1: Understand the basic flow of the Event Sourcing

The basic flow of Event sourcing is this.

1. You have a command you want to run.
   - This could be Create, Update, or Delete of some kind.
2. You validate if the Command can be run
3. If the Command can be executed, you save it as an event in the Event Store.
4. After storing it in the Event Store, apply that Command over the domain object.
   - Here, we do not validate since ES includes validated events.

For example, suppose you have a `Movie` Domain Object and a command to `UpdateMovieName`. Here's the flow.

![](https://mermaid.ink/img/pako:eNpNkLFuwjAQhl_l5IlIhAfwwAIdGMoApUMxw9U-iEtsR84lCCHevXFMKZ7O_3369OtuQgdDQopjHS66wsjwsVQehrdrDDK9h97SGh0tgnPoDZQlfGJt085IWFSkz7A6wsjBysA6MGyoJmwpwXN4GrLQvPXkGZKnxZ5GZIy2HCLtJyPevkTFIbHYNPUVdC4hwSVq1hI_7ZPHbnZ6DYviv8M-dwzfP6QZSrhYrqDLpcAP9EFMhaPo0JrhIrd0BiW4IkdKyGE0GM9KKH8fOOw4bK9eC8mxo6nInqXFU0T3Fzbov0J4fO-_NQx8oA?type=png)

<!-- [Original](https://mermaid.live/edit#pako:eNpNkLFuwjAQhl_l5IlIhAfwwAIdGMoApUMxw9U-iEtsR84lCCHevXFMKZ7O_3369OtuQgdDQopjHS66wsjwsVQehrdrDDK9h97SGh0tgnPoDZQlfGJt085IWFSkz7A6wsjBysA6MGyoJmwpwXN4GrLQvPXkGZKnxZ5GZIy2HCLtJyPevkTFIbHYNPUVdC4hwSVq1hI_7ZPHbnZ6DYviv8M-dwzfP6QZSrhYrqDLpcAP9EFMhaPo0JrhIrd0BiW4IkdKyGE0GM9KKH8fOOw4bK9eC8mxo6nInqXFU0T3Fzbov0J4fO-_NQx8oA) -->

These are typical parts of the above flow.

For any command, if the Command is valid,

- we'd validate
- we'd store it in the event store
- we'd apply

I shifted these common concerns to an `EventSourcingService`. This would include the main framework for facilitating the flow of ES and talking to the Event Store.

What's different for each Command is how validation would be carried out and how it'd be applied.

I abstract this into a common. The `CommandHandler` interface deals with validation and applying commands. Each `Command` would have a corresponding `CommandHandler`

When a `Command` comes to `EventStoreService.`

- it'd first call the corresponding `CommandHandler` to get the Command validated.
- If valid, save it in the event store.
- Then, `CommandHandler` would apply the Command again.

![](https://mermaid.ink/img/pako:eNptUslu6jAU_RXLKyKRCDIwZPEWr4NaqYNU2k0JC7_4AlFjO3IcWor493ooU16uFMk-PjnnHl_vcC4o4BQvS_GZr4lU6OEl40jXW0WJgkexKeCJMLgSjBFOe7027nnI99HQ9_-gqlG_NCdRN_9WklRrZNkzkJsiB3dkqk03tQL1zOFWCjZTQsIBdgQ4ME9_Gu8QGfMNKQvT2YXk_0S_bdFFXAEHqbUs_xjVJac3G-BqPu-EFwvbi11b9XnP8uozyFs4y3ZU40WqqtxeJOhgnes7Uiu7Jl2tIf9A90vXPbqn6Eko9AIlkBqo9eq8sOPIusd_p78S5GletJCQq0Jw9Pf1hHZKmzrPp5tgRj6oQR19erk7DFbnoOd1X45-ELiPGUhGCqpf8c7AGVZrYJDhVC8pkR8Zzvhe80ijxGzLc5wq2UAfNzbidUF0YnYAK8LfhdDbJSlrt8fpDn_hNA6ieDqOh1EySsIkHA_7eIvT4WgSjEZxmMRRNB3EURjt-_jbKgyCqavJYJyMwzCa7H8AGEscsw?type=png)

<!-- [Original](https://mermaid.live/edit#pako:eNptUslu6jAU_RXLKyKRCDIwZPEWr4NaqYNU2k0JC7_4AlFjO3IcWor493ooU16uFMk-PjnnHl_vcC4o4BQvS_GZr4lU6OEl40jXW0WJgkexKeCJMLgSjBFOe7027nnI99HQ9_-gqlG_NCdRN_9WklRrZNkzkJsiB3dkqk03tQL1zOFWCjZTQsIBdgQ4ME9_Gu8QGfMNKQvT2YXk_0S_bdFFXAEHqbUs_xjVJac3G-BqPu-EFwvbi11b9XnP8uozyFs4y3ZU40WqqtxeJOhgnes7Uiu7Jl2tIf9A90vXPbqn6Eko9AIlkBqo9eq8sOPIusd_p78S5GletJCQq0Jw9Pf1hHZKmzrPp5tgRj6oQR19erk7DFbnoOd1X45-ELiPGUhGCqpf8c7AGVZrYJDhVC8pkR8Zzvhe80ijxGzLc5wq2UAfNzbidUF0YnYAK8LfhdDbJSlrt8fpDn_hNA6ieDqOh1EySsIkHA_7eIvT4WgSjEZxmMRRNB3EURjt-_jbKgyCqavJYJyMwzCa7H8AGEscsw) -->

### Step 2: Making a simple event store

Consider the table below as an event store.

| UserId | StreamId | StreamVersion | EntityType | EventName               | Command                                 |
|--------|----------|---------------|------------|-------------------------|-----------------------------------------|
| 1      | 1        | 1             | Movie      | MovieCreated            | {movieName: "James Bond", movieId: "7"} |
| 1      | 1        | 2             | Movie      | MovieNameUpdated        | {movieName: "Skyfall"}                  |
| 1      | 2        | 1             | Movie      | MovieCreated            | {movieName: "Top Gun", movieId: "8"}    |
| 2      | 1        | 3             | Movie      | MovieReleaseDateUpdated | {releaseDate: 2012}                     |

This includes all the information we need related to the MovieObject.

We also track which user is updating. We also keep different Entity types. For example, in a movie booking system, we may have entities such as `Movie`, `Theatre`, `Booking`, etc.

The `EventName` can be used to show a rich activity log or in analytics.

I'll describe how we could enhance data in the event store for better analytics and debugging.

:todo: link to an article related to the event store.

Next, I will describe how I built the `CommandHandler`.

### Step 3: Building CommandHandler interface and implementations

I created two things that would help me.

Command: This would be an interface for every Command

CommandHandler: This would be an interface for CommandHandlers.

CommandHandler has two roles: validation and applying.

This is how `CommandHandler` looked.

```java
interface <T extends Command, Entity extends EventSourcingEntity> CommandHandler{
  void validateCommand(ESDetails esDetails, Optional<Entity> entity, T command);
  Entity applyCommand(Event event, Optional<Entity> entity);
}
```

Note: As described in the naming convention article: todo add link: initially, the methods had different names. `isValid` and `generate`. Over the iterations of coming up with good variable names and discussion with a colleague, I came to the above as it describes the best intent, `validateCommand` and `applyCommand`.

For example, consider a `UpdateMovieNameCommand`

```java
@AllArgsContructor
@Data
class UpdateMovieNameCommand extends Command {
  private final String movieName;
}
```

**UpdateMovieNameCommandHandler**.java

```java
class UpdateMovieNameHandler extends CommandHandler<UpdateMovieNameCommand, Movie> {
  void validateCommand(ESDetails esDetails, Optional<Movie> movie, UpdateMovieNameCommand command){
    Movie movie = movie.getOrThrow();
    if(!movie.isReleased()){
      throw new CommandException("A Released Movie's Name cannot be updated");
    }
    if(StringUtils.isBlank(command.getMovieName())){
      throw new CommandException("Movie Name cannot be blank");
    }
  }
  Movie applyCommand(Event event, Optional<Movie> movie, UpdateMovieNameCommand command){
    movie.get().setMovieName(command.getMovieName())
  }
}
```

Note that all validations use the `validateCommand` method, and none use the `applyCommand` method. The Rules of Event Sourcing blog post will discuss this in detail. :todo: attach

Here's how the Command would run

```java
@Autowired
MovieService movieService;

void updateMovieCommandTest(){
  // given: a movie in the event store
  CreateMovieCommand createMovieCommand = new CreateMovieCommand(
    7, "James Bond"
  );
  EventSourcingDetails eventSourcingDetails = EventSourcingDetails.builder()
    .userId("thor-odinson")
  .build();
  Event event = movieService.put(createMovieCommand); // put movie in store
  // when
  UpdateMovieNameCommand updateMovieNameCommand = new UpdateMovieNameCommand("Skyfall");
  movieService.put(updateMovieNameCommand);
  // then
  Movie movie = movieService.getOneFromStore(event.getStreamId());
  assertThat(movie.getMovieName())
    .isEqualTo(updateMovieNameCommand.getMovieName())
}
```

### Step 4: Building EventSourcingService

The EventSourcingService is the one which manages the event store and calls the appropriate CommandHandler.

Here's my implementation of the event store.

```java
abstract <Entity extends EventSourcingEntity, T extends Command> class EventStore<Entity> {
  Event putCommand(EventSourcingDetails eventSourcingDetails, T command);
  Event canPutCommand(EventSourcingDetails eventSourcingDetails, T command)
  Entity getOneFromStore(String streamId);
  Entity getAllFromStore(String parentId);
  Entity generateSnapshot(String streamId);
  Entity generateAllSnapshot(String parentId);
}
```

Note: I have a `parentId` in `getAllFromStore` and `generateAllSnapshot`. This is because I had an embedded object relationship in the code, which was mapped using parentId. For this event, the store would have one more column, `parentId`, along with `streamId`

Here's a description of what each method does.

- `putCommand`
  - Call the appropriate command handler and call it the `validateCommand` method.
  - If it's valid, generate an event and save it in the event store table.
  - Creation commands like `CreateMovieCommand` will not require data from the Event Store because the Movie hasn't been added yet.
  - Updation commands like `UpdateMovieNameCommand` might require the `Movie` entity to perform validation. Even `DeleteMovieCommand` would require a `Movie` entity. For this, `putCommand` can use the `getOneFromStore` method to get an entity from the store.
- `canPutCommand`
  - call the appropriate `CommandHandler` and call its `validateCommand.`
  - This is just used to check if Command can be put. This is useful when providing validations on the front end.
- `getOneFromStore`
  - iterate through event store events for the particular `streamId` and call the Command's `applyCommand` method.
  - The output of each `applyCommand` method is an entity. This output entity is passed as input to the next event's CommandHandler in a chain fashion.
  - To save time, check Snapshot to see if the entity exists; if it does, check its streamVersion and get events where streamVersion is greater than the snapshot streamVersion from the event store.
- `getAllFromStore`
  - get all streamIds for a particular parentId from the event store.
  - repeatedly call `getOneFromStore`
- `generateSnapshot`
  - `getOneFromStore` and save it into the Snapshot repo.
- `generateSnapshots`
  - `gellAllFromStore` and then bulk save into the Snapshot repo.

### Step 5: Calling the appropriate handler

In the `putCommand` and `getOneFromStore` sections, we must find a command's appropriate `CommandHandler`. This can be quickly done in Spring Boot by finding a bean for a generic type.

Source [https://stackoverflow.com/a/69813143](https://stackoverflow.com/a/69813143 "smartCard-inline")

```java
@Autowired
ApplicationContext applicationContext;

public static <T> CommandHandler<T> getCommandHandler(Class<Entity> entityClass, Class<T> commandHandlerClass){
    ResolvableType type = ResolvableType.forClassWithGenerics(CommandHandler.class, entityClass.getClass(), commandHandlerClass.getClass());
    return (CommandHandler<T>) context.getBeanProvider(type).getObject();
}
```

## Conclusion

Like any design pattern, it may take time first to understand all the pieces of Event Sourcing. But once you get a mental picture of it. You can create it fast!

Once the framework has been created, it rarely gets modified as much. The framework remains the same, and the functionality of what you want to do gets extended via the Command and Command Handlers you create. (Open Close Principle).

Once you have created a framework like the above, you only need to create a bunch of Commands and CommandHandlers to handle them. There is no need ever to touch the Event Sourcing base code. It'll just work. I'll be writing a guide on how you can decide what commands to create.b (TODO)

Also, there are specific rules to follow when developing event sourcing. Which I'll share in an upcoming post. (TODO)

**How did you implement your Event Sourcing?**

## Next

There are certain parts of ES that I'd describe later in different blogposts (TODO)

- Read Rules of Event Sourcing  (TODO)
- Why I love event sourcing. (TODO)
- Unit Testing Event Sourcing  (TODO)
- Chained Commands (Similar to the concept of Redux Thunks)
- Combine Commands
- Enhancing data in the event store
- Resourcing for learning Event Soucing and Message Driven Architecture.
- How do we implement REST over Event Store? (Including Benefits)
