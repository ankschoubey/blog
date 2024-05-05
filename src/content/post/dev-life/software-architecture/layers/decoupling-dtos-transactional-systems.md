---
comments: true
excerpt: Efficient strategies for managing data transformation within Spring Boot and RDBMS environments, optimizing response handling and maintaining transactional integrity.
tags:
 - technical
 - web-development
 - ddd
 - clean-code
publishDate: 2024-05-05T20:52:08.052481
last-modified-purpose:
slug: /software-blog/decoupling-dtos-transactional-systems/
title: Decoupling DTOs from Service Layers in Transactional Systems
image: https://docs.google.com/drawings/d/e/2PACX-1vT3KH3qfLmMQ0DDGtQL8uyol8YhCWqBEc1DJxuGJ5vS9gdNxYKf7vkIgb2ETVHrZOocCTJv4kAFDUtU/pub?w=1300&amp;h=740
---

In one of the previous blog posts, I explained why the [service layer should be free of dealing with Requests/Responses and DTOs in general](/software-blog/separate-service/).

Back then, I used MongoDB with Spring Boot and NodeJs.

MongoDB didn't have transactions and ACID, so converting was very easy.

## The Challenge of DTO Conversions in Transactional Systems

If you are using Transactional databases, including almost all RDBMS databases like MS SQL, Postgres, etc., you must wrap things in Transactional.

For example, suppose your entity has joins to other tables via @‌ManyToOne, and it's set to FetchType.LAZY. Lazy means the data from the joined table will be fetched only when needed, not before it. This saves your network time. But this can only be done within the context of a @‌Transactional.

Assume your response requires this data.

If you generate the Response class outside transactional, you'll get Hibernate.LAZY_Initialization exception. The only way to work this out

## Exploring How Service Layer Gets Tied to Web Responses

So you'd often see a code like this, where the service has multiple methods for different response types.

**UserController.java**

```java
@GetMapping("/users")
UserResponse getUsers(){
  return userService.getUsers();
}
```

**UserService.java**

```java
@Transactional
List<UserResponse> getUsersResponse(){ // TO BE USED By Controller
  List<Users> users = userRepo.findAll();
  List<UserResponse> userResponses = userMapper.map(users);
  return userResponses;
}

@Transactional
List<User> getUsers(){ // TO BE USED BY OTHER SERVICE METHODS
  return userRepo.findAll();
}
```

**UserMapper.java**

```
class UserMapper{
  UserResponse map(User user){
    // you could also use Jackson or MapStruct
    return new UserResponse(user.getId(), user.getName(), ...);
  }
  List<UserResponse> map(List<User> users){
     return users.stream().map(this::map).toList();
  }
}
```

But as we can see, the service is now tied to the web later. If we want to change the format of the web response, we'll not be making changes at the web layer. Instead, we'll be making the change at the service later.

If we want to return the response in a different format, we'll have to add new methods to both controller and service laters.

You may want to return things in different formats for performance or security purposes:

- Performance: If creating a view requires joining tables, you should split it into different views so that it's high performance.

- Security: You may want to restrict the view to some users.

Here's an example of how you would do it if your service is tied up in response classes.

**UserController.java**

```java
@GetMapping("/users/lite")
UserResponse1 getUsers(){
  return userService.getUsersInResponse1();
}

@GetMapping("/users/particilar-view")
UserResponse2 getUsers(){
  return userService.getUsersInResponse2();
}

@GetMapping("/users/another-view")
UserResponse3 getUsers(){
  return userService.getUsersInResponse3();
}
```

**UserService.java**

```java
@Transactional
List<UserResponse1> getUsersInResponse1(){
  List<Users> users = userRepo.findAll();
  List<UserResponse> userResponses = userMapper.mapToResponse1(users);
  return userResponses;
}
@Transactional
List<UserResponse2> getUsersInResponse2(){
  List<Users> users = userRepo.findAll();
  List<UserResponse> userResponses = userMapper.mapToResponse2(users);
  return userResponses;
}
@Transactional
List<UserResponse3> getUsersInResponse3(){
  List<Users> users = userRepo.findAll();
  List<UserResponse> userResponses = userMapper.mapToResponse3(users);
  return userResponses;
}
```

This is unnecessary. Note that we also need Controller methods.

## Solution: Let the controller pass the transformationFn

The controller layer should be the one handling conversion. But as we say in our case, without Transactional, we are likely to get a `Hibernate.LazyInitialization` exception.

Here's a way to do it.

Let the controller pass a transformation function.

**UserService.java**

```java
@Transactional
List<T> getUsers(Function<User, T> transformationFn){
  List<Users> users = userRepo.findAll();
  return transformationFn.accept(users);
}
```

Now, different controller methods can return different responses.

**UserController.java**

```java
@GetMapping("/users/lite")
UserResponse1 getUsers(){
  return userService.getUsers(userObjectMapper::mapToResponse1);
}

@GetMapping("/users/particilar-view")
UserResponse2 getUsers(){
  return userService.getUsers(userObjectMapper::mapToResponse2);
}

@GetMapping("/users/another-view")
UserResponse3 getUsers(){
  return userService.getUsers(userObjectMapper::mapToResponse3);
}
```

This way, the controller can decide what format is needed. The number of service methods will remain short.

If a service calls the method, it can send transformationFn as `Function.identity()`, which is the same as returning the entity.

This is even easier if you use a [command style pattern as seen in event sourcing](/software-blog/event-sourcing-spring-boot-implementation/). Add a method like this to your EventSourcingService method or whatever runs the command in your case.

```java
@Transactional
Entity putCommand(Command command){
  ...
  return entity;
}

@Transactional
T putCommandAndTransform(Command command, Function<Entity, T> transformaationFn){
    final Entity entity = putCommand(command);
    return transformationFn.accept(entity);
}
```

Other interfaces, such as GRPC, Messaging, etc., can also send their converters. And the service layer can remain small and free of domain objects.

## Ending: Single Responsibility Preserved

The service layer should not be tied to any view and should be general enough to cater to all.

Transactional poses a unique challenge. If an entity has fields with Lazy fetch, they can't be fetched outside transactional, which is why many codebases tie the service layer to the controller layer.

The way to #restoreBalance, reduce the number of service methods, break the tie between the service method and Response DTOs, and let the controller handle conversions is by allowing the controller pass the transformation function so that the service can run within transactional.
