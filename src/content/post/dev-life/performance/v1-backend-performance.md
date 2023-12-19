---
comments: true
excerpt: Placeholder 
tags:
 - backend
publishDate: 2022-09-18T20:52:08.052481
last-modified-purpose:
slug: /v1/backend-performance/
title: 5 Simple Things to Improve Backend and Frontend Performance
toc: false
---

## Return early. Don’t create objects that are not in use

**Bad**

```java
//bad

User user = dbCallToCallUsers(); //DB Call Count 1
UserHomepageSettings userhomePageSettings = dbcalltoCalluserSettings(); //DB Call Count 2

if(validate(users) && validate(userSettings)){
  // business logic
}
```

**Good**:

```java
User user = dbCallToCallUsers(); //DB Call Count 1
if(!validate(users)){
  return or throw Exception();
}
UserHomepageSettings userhomePageSettings = dbcalltoCalluserSettings(); //DB Call Count 2
if(!validate(userhomePageSettings)){
  return or throw Exception();
}
```

## Count the number of network calls in a flow and keep it at minimum

This is similar to previous point. I try to make sure I have max 3 DB calls per operation. 1 is ideal.

## Use Maps and Sets

Instead of using List prefer Sets and Maps. Searching a list of map is almost instant.

## Reduce copying of objects from one form to another

Instead of converting from one object to another, to another, to another. Try to make sure you don’t have to convert the same object from one form to another multiple times.

## For response classes reduce copying by using a delegate class

We often use “mapper” classes and methods to convert from one object to another. For example, from entity to DTO.

These usually copy the data from one object to another.

This has problems because suppose your original object is 10Mb in memory, when you copy it, you have to copy 10Mb object. Your RAM get’s filled and copying is generally slow.

Here’s a better way to do it with Delegate.

```java
class UserResponse{

  @JsonIgnore //We want to ignore the source class
  private UserEntity user;

  public String getId(){
    return user.getId();
  }

  ... other getters that are similar

  public String getName(){
    return user.getFirstName() + " " + user.getLastName();
    // Here we are converting from one form to another without copying.
  }
}
```

Using delegate we reduce the amount of copying needed in the application.

If you are using `java` you can use `Lombok` library which provide a `@Delegate` to do the same task as above without even writing your own getters. This will make your code very precise and fast.
