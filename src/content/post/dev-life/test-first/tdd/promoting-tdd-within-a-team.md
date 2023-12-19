---
comments: true
excerpt: Promoting TDD within a team requires patience, consistent effort, and a focus on creating a positive and supportive environment for learning and improvement.
tags:
 - testing
 - tdd
publishDate: 2023-08-09T20:52:08.052481
last-modified-purpose:
slug: /promote-tdd-in-a-team/
image: /images/promote-tdd-in-a-team.jpg
title: How to promote the habit of TDD within a Team
---

When you do TDD yourself, you'd have improved your code quality, reduced the number of bugs you produce, and become faster at development.

At the same time, it's likely that developers that don't code with TDD, are doing less than they could.

(And finally, what's good for all is good for us) So #weShouldShare our knowledge!

Doing things alone is nice. But having the whole team do TDD is something else. You can pick anyone's code and any piece of code and know that it was done to the best.

Promoting TDD within the team takes time. And your patience and consistent effort is needed.

![](/images/promote-tdd-in-a-team.jpg)

## TDD is a skill that you develop and a choice that you make [^1]

We'll explore TDD through the lens of habit change. The Atomic Habits is the best book on habit change. Below are the 4 Laws of Behavior Change as outlined in the book The Atomic Habits.

1. Make it obvious.
2. Make it attractive.
3. Make it easy.
4. Make it satisfying.

We'll explore the 4 Laws in a different order, starting with **Make it Attractive**.

## Making it Attractive

### Lead by Example

I have found that no matter how much I try to motivate others, they only get motivated when they see an example. When I tried to tell people to do X, they didn't believe me that it works. And then I did X and did so publically, and they brought questions for people. What was your thought process? How did you do? Didn't you think? Etc etc.

So start by being someone who does TDD, and does it well. This series of posts may have taught you valuable insights into TDD.

Practice them to their best.

- Produce good and clean tests
- Product good and clean code
- Be able to demonstrate that you can code easily.

When they see you do TDD and see the quality of your code and tests and your change in productivity, They'll find it inspiring to adopt.

### Start using tests and explaining what the Code Does

When you show your code, start with the tests. Collapse all the code blocks so that developers can only see the test names.

For example, collapsing the upsert method tests would look something like this:

```
upsert method
 - WHEN data is present
  - SHOULD update values
 - WHEN data is not present
  - SHOULD insert new values
```

Now you can speak the tests easily.

## Make it satisfying

### Find the early adopters and help them through the journey

Some people are more open to trying new ideas than others. This group also includes those developers who are new and those developers who want to improve their coding skills.

Start with them. Teach them TDD. You could always refer to this series.

When one person becomes an evangelist of the process, more people will start adopting.

![Highres](https://omniplexlearning.com/wp-content/uploads/Highres-scaled.jpg.webp)

Source: <https://omniplexlearning.com/blog/technology-adoption-curve-stages/>

### Take sessions on TDD and continuously coach

The first reaction of people who hear TDD is that they think they know what TDD is or that they say they have practiced it but it didn't work.

This is why, try to start by teaching developers and the organization what TDD is and how it can benefit everyone.

Explain the 3 benefits highlighted in this TDD series:

1. TDD leads to fewer bugs.
2. TDD increases code quality.
3. TDD is faster overall.

TDD has subtle nuances which is why most developers don't learn it well. Use the git repo and the cheatsheet mentioned in the series to help them.

After the session and as time goes on keep coaching the team on improving their TDD practice. Find impediments and solve them. Identify the signals that you need better tests and continue refining.

### Provide time and support to developers while they learn

TDD requires a mind shift and isn't as easy to grasp. Give your developers time. Initially, they may take time to ship the feature.

It's important to help the developers focus on delivering with quality - with tests rather than forcing them to deliver something that's not finished.

Expect some slowness when the team adopts TDD. But remember to continuously inspect and adapt so that you can solve their impediments. At the same time, don't let developers drag on their "learning" phase, TDD takes some iterations to learn but overall it will reduce time. If developer productivity doesn't improve after 20-30 days of iterating, there are problems with the way TDD is practiced.

## Make it easy

### Provide templates

Many developers won't know where to start. Therefore, they can start with a template. This would make it easy for them to think in terms of TDD.

The method/when/then style of writing is fantastic by default. You can modify and generate your templates.

You can refer to and use the following template for Java and Javascript and Typescript.

For react, you can use the following template which was first mentioned in <todo-react-post-link>

![](/images/method-when-should.png)

## Make it obvious

### Anytime a developer comes to you, ask them to show the test

This is the simplest thing you can do. When someone comes to you with a doubt, ask them to show it in a test.

If they haven't written a test, you can walk them through the TDD process.

### Automate Checking

Before and while adding the automation, explain to the team the benefits of adding these checks.

There are two automations that you can do:

1. Code Coverage
2. Test Format

For Code Coverage, keep your minimum code coverage for your build pipeline to 85%. When you do TDD, your code coverage would be as close to 90-95%. If it's less, maybe you or your team haven't done good TDD.

Test Format verification would help generate cleaner and more consistent tests. Add the equivalent of the ArchUnit test in your Java code. When someone doesn't follow the test format, this test should fail.

You can find the ArchTest for verifying the given/when/then pattern in the blog post on [method/when/then style](https://www.ankushchoubey.com/method-when-should/).

[^1]: Rewording Naval Ravikant "Happiness is the skill that you develop and the choice that you make"

Photo by <a href="https://unsplash.com/@austindistel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Austin Distel</a> on <a href="https://unsplash.com/photos/wD1LRb9OeEo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  