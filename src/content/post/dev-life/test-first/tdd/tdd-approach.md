---
comments: true
description: A step by step algorithm
categories: [testing, tdd]
publishDate: 2022-03-04T20:52:08.052481
last-modified-purpose:
permalink: /current-tdd-approach/
title: My current approach to TDD
---

This is my current approach to TDD. 

## For new development:

1. I have a rough idea of what I am going to implement. This is optional: If I don't or I am implementing something too big, I make a simple diagram with diagram.net.
2. I make a class file
3. I hit Ctrl+Shift+T in IntelliJ to quickly create a corresponding test file. I will using the same keyboard pattern to to quickly switch between test and code while doing TDD.
4. I go Ctrl+Shift+T into the class and write the name of method and arguments it may return. The actual return value is set to null.
5. I Ctrl+Shift+T into the test and write the name of method as follows and mention the "WHEN" and "SHOULD" blocks. I don't know all "WHEN"/"SHOULD" blocks so I'll write them as time goes.
- "WHEN" blocks define conditions
- "SHOULD" blocks are atomic and assertable. 

```java
class MainTestClass{
...
    @Nested
    @DisplayName("upsert method")
    class UpsertMethodTests{

        @Nested
        @DisplayName("WHEN value IS-NOT in DB")
        class ValueNotInDBTest{
            @Test
            @DisplayName("SHOULD insert value")
            void shouldInsertValue(){
                //empty for now
            }
        }

        @Nested
        @DisplayName("WHEN value IS in DB")
        class ValueInDBTest{
            @Test
            @DisplayName("SHOULD replace value")
            void shouldReplaceValue(){
                //empty for now
            }
        }
    }
...
}
```

6. After any change after this to code or test, I'll run the wrote test file.
7. I start writing the tests to specify conditions in one "SHOULD" block. Each test is as accurate as possible and any needed behaviour is either asserted or verified.
8. I Ctrl+Shift+T into class and implement code to pass that particular should.
9. The process of writing "WHEN""SHOULD" blocks, writing the test, CTRL+SHIFT+T and coding in class, running the test again is repeated.

## For extending existing functionality:

1. I go the the implementation class and understand it.
2. I Ctrl+Shift+T/switch to the test.
3. I add or a new "WHEN" or "SHOULD" or "x method" class
4. And then repeat the cycle again.

***

*Relevant Further Reading*:

- [TDD](/tdd)
- [Writing Clean and Fast Unit Tests](/clean-fast-unit-tests)