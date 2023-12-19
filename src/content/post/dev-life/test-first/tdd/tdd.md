---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - testing
 - clean-code
 - tdd
publishDate: 2022-06-19T20:52:08.052481
last-modified-purpose: added section on "Don't start the application. Verify everything by writing tests."
slug: /making-tdd-easy/
title: Making TDD and Testing easier
image: /images/tdd.jpeg
---
![](/images/tdd.jpeg)

Software engineering isn't only about code. It's engineering

TDD need not be a big deal. It can seem cubersome but there are mindsets and tools that can make transition smoother.

TDD is shown to reduce defectsby a large margin. Tests will save you time in the long run.

{% assign q1_text = "Doing TDD is faster than traditional development?" %}
{% assign q1_choices = "True, False" | split: ', ' %}
{% assign q1_feedbacks = "Correct! This might seem counter intuitive at first., Over a long time scale and after the initial learning curve, TDD increases quality of the code so much that less bug come., Also, TDD creates concise tests." | split: ', ' %}
{% assign q1_correct = 0 %}
{% include mc-quiz.html text=q1_text choices=q1_choices answer=q1_correct feedback=q1_feedbacks %}

## Why TDD?

By writing your tests first, you are defining expections you have with your code early on. This leads to cleaner code.

The opposite is you write code and then you try to create tests. It's hard to decide what to test when you are writing tests later. If you write tests later, you do it for what is working.

Both tests and code written with TDD is cleaner and precise.

TDD leads to extremely fast feedback.

## The Three Laws of TDD
1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

## How to TDD?

1. Assume the test will work properly, what is the minimum test? Write that test.
2. Fix compilation errors if any. [^1]
3. Write minimum code required to pass the test.
4. Run all the tests
5. Iterate

I have written a [detailed blogpost on how I do TDD](/current-tdd-approach).

# Making TDD easier

## Usually TDD can be cumbersome because:

1. Testing is extra code
2. You have to switch between current code and tests
3. you have to rerun tests
4. No one does it

## Mitigrations

### 1. TDD is a todo list of feature to do

By writing test first, you get clear on what you want to implement. This leads to better design.

Also, initially it's hard to think about what to do. All tests essentially fix the inputs/external conditions to the method and verify either the output or internal state change caused by the method.

[method/when/should](/method-when-should) can also be helpful here.

TDD only that much functionality and nothing more. Only test what's within the class. not outside it.

Also, when deciding to learn a piece of code, read both code and the tests.

### 2. Switch between testing and code easily

In intellij press Ctrl + Shift + T
for vs code : https://marketplace.visualstudio.com/items?itemName=Acino.jump-source

### 3. Rerun tests automatically

On local: have tests run automatically after each save

Given when tehn
Search for libraries that make easier to test

### 4. No one does it

Yeah. It takes times to learn. TDD/any development practice is easier when whole company is aiming at it or enforcing it.

# More tips

## 1. Don't start the application. Verify everything by writing tests.

This works for test after code too. But specially works for TDD.

Instead of verifying by starting the application then going to browser or database, verify by writing and running the test.

Starting the application and testing is usually a longer process than writing a test. Plus, their is a compounding time saving when rerunning the test instead of manual verification.

[^1]: [Anadi Misra](https://www.linkedin.com/in/ACoAAAGmNOsBErk1_7cbjUHllOPVUE5M-NvcOKc/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bd5ZjyftfQoKiUju1OpMyEA%3D%3D) 

# More Resources:

[The Practical Testing Book](https://damorimrg.github.io/practical_testing_book/intro.html)