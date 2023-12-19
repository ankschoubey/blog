---
comments: true
description: Separating connectors from business logic in a service-oriented architecture promotes reusability and single responsibility.
tags:
 - web-development
 - ddd
 - clean-code
publishDate: 2023-03-10T20:52:08.052481
last-modified-purpose:
permalink: /v1/separate-service/
title: Separating Connectors and Service (Business Logic) - A Key Principle for Service Reusability
image: https://docs.google.com/drawings/d/e/2PACX-1vT3KH3qfLmMQ0DDGtQL8uyol8YhCWqBEc1DJxuGJ5vS9gdNxYKf7vkIgb2ETVHrZOocCTJv4kAFDUtU/pub?w=1300&amp;h=740
---

## Introduction

In a previous post, I talked about [why and how we should separate Domain Layer from Technical code](/separate-technical-code). Here's another version of the same concerning service.

A Service that handles the tasks of a RestController isn’t very different from a rest controller.

We should separate the Service from the Rest Controllers because we want to be able to re-use the service.

But if Service handles rest controller responses, it isn’t very different.

## An ideal service

![https://docs.google.com/drawings/d/e/2PACX-1vT3KH3qfLmMQ0DDGtQL8uyol8YhCWqBEc1DJxuGJ5vS9gdNxYKf7vkIgb2ETVHrZOocCTJv4kAFDUtU/pub?w=1300&amp;h=740](https://docs.google.com/drawings/d/e/2PACX-1vT3KH3qfLmMQ0DDGtQL8uyol8YhCWqBEc1DJxuGJ5vS9gdNxYKf7vkIgb2ETVHrZOocCTJv4kAFDUtU/pub?w=1300&amp;h=740)

Here’s how you separate connectors from the business logic.

- **Connectors** are mediums we use to communicate with the outside world. Examples of connectors are Rest API connector (like RestController or RouterFunction+it’s Handler), and Kafka Connector.

- **Services** are codes that implement business logic.

All conversions from Entity to DTO or DTO to an entity (i.e. handle the request event and provide a response in the format needed by the client) should be handled at Rest API Connector.

The Rest API Connector is responsible for calling the service method between the request and the response.

For the service method, the REST API connector is downstream. So, it does not care about what format of data it sends. It’s just responsible for executing the business logic and sending the data in whatever its format.

## Example - Identifying Bad and Good Practices

Let's examine two examples to illustrate the difference between poorly designed and well-structured code. Although the examples are based on Spring Boot, the principles apply to any project.

### Bad Practice: Violation of Single Responsibility

```java
// @Controller Code
@PostMapping("/users")
ResponseEntity<UserResponse> postUsers(UserRequest userRequest){
    return userService.saveUser(userRequest); // 1
}

// @Service Code
ResponseEntity<UserResponse> saveUser(UserRequest userRequest){ // 2
    UserEntity unsaved = objectMapper.convertValue(userRequest, UserEntity.class); // 3
    unsavedUser.setUserId(sequenceService.getNextId()); // 4
    UserEntity savedUser = userRepo.save(unsaved); // 5
    UserResponse userResponse = objectMapper.convertValue(savedUser, UserResponse.class); // 6
    return ResponseEntity.ok().body(userResponse); // 7
}
```

Here is why the above code is bad:

- **1**: `@Controller` is just calling the `@Service` and returning its value. It isn't doing anything except `@PostMapping`. If that's the case what's the purpose of a `@Controller`, just mapping?
- **2**: The `@Service` is handling receiving the `UserRequest` and returns a `ResponseEntity` of `UserResponse`.
  - The problem both `UserRequest` and `ResponseEntity<UserResponse>` are mapped to REST API. I can't reuse the method save mechanism for other connections or from within other services.
  - For example, let's say I have to save a user from another `@Service`. To use the same `saveUser` method, I'll have to create a `UserRequest` object and the parse the `ResponseEntity<UserResponse>`.
  - This is a highly inconvenient conversion.
- **3 to 7**: Here the `@Service` isn't singularly responsibly.
  - While the name of the method is `saveUser`, it is also handling the conversion of request to entity and entity to the response.
  - **`@Service` isn't just handling business logic**.

### Good Practice: Preserving Single Responsibility

```java
// @Controller Code
@PostMapping("/users")
ResponseEntity<UserResponse> postUsers(UserRequest userRequest){
    UserEntity unsavedUser = objectMapper.convertValue(userRequest, UserEntity.class); // 1
    UserEntity savedUser = userService.saveUser(unsavedUser); // 2
    UserResponse userResponse = objectMapper.convertValue(savedUser, UserResponse.class); // 3
    return ResponseEntity.ok().body(userResponse); // 4
}

// @Service Code
UserEntity saveUser(UserEntity unsavedUser){ // 5
    unsavedUser.setUserId(sequenceService.getNextId()); // 6
    return userRepo.save(unsaved); // 7
}
```

The above code is good because:

- The `@Controller` handles the conversion from Request object to Entity and Entity to Response.
- The `@Service` handles the business logic
- The `@Service` only deals with entities and not request, response objects and therefore can be used at many places easily.

## Conclusion

- A service method should only deal with business logical.
- The connectors like `@Controller` or other channels should deal with conversion from request object to response object.
- This way the service remains open to be used in mutiple channels or in multiple other services.
