---
comments: true
description: A template for thinking and creating understandable uniform tests
categories: [testing, clean-code, favorite, tdd]
publishDate: 2022-03-19T20:52:08.052481
last-modified-purpose:
permalink: /method-when-should/
title: Thinking and writing cleaner tests with method/when/should blocks
image: /images/method-when-should.png
---

# Problem Description

Often tests code style is ignored. Having different test writing styles makes it harder to write quality tests. Tests quality is as important as code. This post explores a effective template I developed to help write cleaner tests and keep them uniform.

# method/when/should blocks

there are 3 main blocks. each block in nested within parent block.

- **method** block
  - **WHEN** block
    - **SHOULD** block
      - given/when/then mini-blocks

**method block**: is name of method. all tests related to a particular method will be within this block.abstract

**WHEN block**: describes the condition over a method.

**SHOULD block**: describes the assertion.

**GIVEN/WHEN/THEN mini-blocks**: helps keep tests clean

You may have noticed **WHEN**, **SHOULD** and **AND** are capitalized. This is by design. This helps highlight logic.

# Examples

1 - **We are creating a method which inserts new value if id does not exists in database else updates existing value.class**

- **upsert** method
  - **WHEN** value exists
    - **SHOULD** update value
  - **WHEN** does not exists
    - **SHOULD** insert new value

2 - **We have a UI components which should message "No Content" if data items is not present. Else it shows a list of item names**

- **displayItems** method
  - **WHEN** data is not present
    - **SHOULD** display "No Content"
  - **WHEN** data exists
    - **SHOULD** display list of item names

# Benefits

method/when/should block is perfect companion for TDD, is language agnostic and can be easily used with templating features like IntelliJ's live template.

Having specific blocks means that test descriptions are always written a certain way. This clarifies thinking and makes sharing and understanding easier.

Blocks group tests together, making them easier to find.

Also, when tests run in IDE like IntelliJ, the output is much cleaner. The example section above is a good representation of this. 

# Template for JUnit

```java
class {NameOfClass}Tests{

    @Nested
    @DisplayName("{methodName} method")
    class {MethodName}Tests{
     
        @Nested
        @DisplayName("WHEN {condition description}")
        class {ConditionDescription}Tests{
        
            @Nested
            @DisplayName("SHOULD {assertion description}")
            void {AssertionDescription}Test(){
                // GIVEN
                    {code for setting conditions describe in WHEN block}
          
                // WHEN
                    {code for running actions}
                
                // THEN
                    {code for assertions}
            }
        }
    }
}
```

Given, When and Then are mini-blocks. The code will be written after an tab intend.

<!-- <script src="https://gist.github.com/ankschoubey/ea3cb41308c19f56c69eb40d7e05cec1.js"></script> -->

# More extentions

**AND block**: Describes more conditions for **WHEN** block.

Usage:

- **WHEN** a condition
  - **AND** another conditions

**More SHOULD Blocks**:

- SHOULD-NOT
- SHOULD THROW
- SHOULD-NOT THROW
- SHOULD CALL
- SHOULD-NOT CALL