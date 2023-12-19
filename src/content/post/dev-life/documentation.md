---
comments: true
description: 'Placeholder' 
categories: [clean-code]
publishDate: 2022-01-25T20:52:08.052481
last-modified-purpose:
permalink: /documentation/
title: Maintaining Documentation
image: https://docs.google.com/drawings/d/e/2PACX-1vS1EYND3yzq_zmJEZ1rEJogTD9tbXucE2k33rcUYIVTcA2ZQZlYfPf_MSVk8kvHZhjcKo7fByRiXFpy/pub?w=453&amp;h=723
---

We ideally want to write code so well that someone reading the code can understand it in one go.

But the ideal isn't always practical in the real world because people come from different backgrounds and experiences.

So, you want to make sure your documentation is as perfect as possible given the project scope.

If the API/Library is going to be used by the public, it needs to be perfect.

![]({{ site.baseurl }}/images/2022-01-25-documentation/shared-between-single-team-multiple.png)

***

The biggest problem is maintaining up-to-date documentation. These are a few things I have learned recently about this:

<img style="float: left; width: 300px;" src="https://docs.google.com/drawings/d/e/2PACX-1vS1EYND3yzq_zmJEZ1rEJogTD9tbXucE2k33rcUYIVTcA2ZQZlYfPf_MSVk8kvHZhjcKo7fByRiXFpy/pub?w=453&amp;h=723">



## 1. The best way to document is to automate

Tools like Swagger for APIs and storybook from UI components make it very easy to auto-document code in most cases.

## 2. Encourage use of your own documentation

Using your own documentation would help you find and fix bugs in it. 

For example, You could encourage your team to use Swagger UI instead of Post Man for testing APIs.

## 3. For within the team: Have a shared wiki

Wiki helps keep everyone in sync and like the previous point, encourages updations wherever necessary.

## 4. Tests are also documentation of sorts but for the internal team only.

Tests capture what the code would do. So for a new dev on a team, going and reading through tests can give him an idea of what the code does.