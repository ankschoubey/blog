---
comments: true
description: Placeholder 
categories: [200-500 words, tdd, testing, clean-code]
publishDate: 2022-11-6T20:52:08.052481
last-modified-purpose:
permalink: /v1/junit-bug-tracking
title: JUnit Template For Tracking Bugs in Unit Tests
image: /images/junit-bug-tracking.png
---

It's important to track bugs in tests.

1. Reproducing bugs in tests means the exact scenario gets clear
2. Once the bug is fixed, we know it will be fixed for life if the test is also part of the build.

This is the template I use to track bugs in tests.

```java
    @Nested
    @DisplayName("$BugCardId$: Bug Description")
    class BugBugNameTest{

        static final String validInput = """

        """;

        @Test
        @DisplayName("SHOULD {assertion description}")
        void {AssertionDescription}Test(){
            // GIVEN
                {code for setting conditions described in WHEN block}
    
            // WHEN
                {code for running actions}
            
            // THEN
                {code for assertions}
        }
    }
```

BugCardId - The Work Item created for the bug.
Bug Description - A short one-liner which describes the bug. This should be as clear as possible and focus on the bug rather than something wage.

For example:

- Message consumer failing on valid input

is better than

- some problems on dev.
