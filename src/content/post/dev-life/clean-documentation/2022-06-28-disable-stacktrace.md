---
comments: true
description: Placeholder 
categories: [logging, spring-boot, clean-code]
publishDate: 2022-06-28T20:52:08.052481
last-modified-purpose:
permalink: /disable-stacktrace/
title: Writing cleaner logs by Disabling Stack Trace for Expected Response Exceptions
toc: false
---

In spring boot, you can add @ResponseStatus annotation to an exception. By adding it, whenever the exception is thrown, the response will be according to the annotation properties.

For example: Whevener `UserNotFoundException` is thrown, the return value is 404 not found.

```java
@ResponseStatus(HttpStatus.NOT_FOUND, reason="user could not be found")
class UserNotFoundException extends RuntimeException{
    UserNotFoundException(String message){
        super(message);
    }
}
```

We often create many such exception classes to make code cleaner. Throwing an exception is cleaner than multiple try-catch blocks.

The problem here is logs. Whenever exception is thrown, the log contains entire stack trace.

But these kind of exceptions are expected exceptions, in some sense they aren't exceptions at all.

So, we can instead disable stack trace by adding the following to our exception class [Source: StackOverflow](https://stackoverflow.com/questions/2317983/how-to-disable-stack-trace-generation-in-a-java-program). 

```java
    @Override
    public Throwable fillInStackTrace() {
        return this;
    }     
```

To make things better, we can create a custom exception class as follows

```java
abstract class ExpectedResponseException extends RuntimeException{
    @Override
    public Throwable fillInStackTrace() {
        return this;
    }   
}
```