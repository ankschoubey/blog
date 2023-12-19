---
comments: true
excerpt: BDD focuses on solving customer problems, not implementation details like UI. Those are addressed in other activities like wireframing and TDD.
tags:
 - technical
 - bdd
 - tdd
publishDate: 2023-03-22T20:52:08.052481
last-modified-purpose:
slug: /v1/bdd-vs-tdd
title: BDD vs UI/UX/TDD - Understanding the Key Differences for Customer-Centric Problem Solving
image: https://docs.google.com/drawings/d/e/2PACX-1vRONWHyF6MDLxwYnnUeZHvg9jPjWjKoxTOfaJdu_roqlYPvS2LA3FLhGp-h2xM2iUAF3I76yylz4pFd/pub?w=1232&amp;h=875
---

We are often confused about what constitutes BDD.

This makes us add un-necessarily details to BDD spec file.

Here’s how one should think about this

> Stop thinking about how the product would look or feel. And focus on the customer’s interaction with the product.

> Does your product behaviors actually solve the customer’s problem.

If yes, find the best way to implement and represent those behaviours. This means UI design in wireframes and UI functionality covered by UI TDD and backend implementation covered by BackendTDD are not relevant here.

Therefore, **BDD drives your UI/UX and TDD**.

![](https://docs.google.com/drawings/d/e/2PACX-1vRONWHyF6MDLxwYnnUeZHvg9jPjWjKoxTOfaJdu_roqlYPvS2LA3FLhGp-h2xM2iUAF3I76yylz4pFd/pub?w=1232&amp;h=875)

## Example

You believe the customer would often forget his/her password. So, how should you solve this problem.
Doing some brainstorming you come up with an example map.

User comes and logges in. He leaves the tab and comes back. He is shown an prompt to enter his 4 digit pin.

This leads to another example where he sets his 4 digit ping.

When user selects a password, he is allowed to set a shorter 4 digit pin.

Now you convert this into Gherkin.

> Given a user has logged in
> When they leave the tab untouched for 10 minutes
> Then they should be prompted to enter their 4 digit pin.

> Given user is prompted 4 digit pin
> When pin is valid
> Then user’s session should resume

> Given user is prompted to enter 4 digit pin
> When pin in invalid for 4 times
> Then user should be logged out

Now for each of the steps, you can decide the best wireframe, frontend, and backend implementation strategies.

Note: The above gherkins don’t define how something should look. They just define behavior that would solve the user’s problem.