---
comments: true
excerpt: Placeholder 
tags:
 - devops
publishDate: 2022-08-20T20:52:08.052481
last-modified-purpose:
slug: /speeding-up-pipelines/
title: Speed up Pipelines
toc: false
image: /images/speeding-up-pipelines.svg
---
![](/images/speeding-up-pipelines.svg)

Disclaimer: I have primarily worked on Jenkins. But the tips mentioned aren’t Jenkins specific. It seems though that pipelines tools that come with SCM services like Gitlab are better.

# Why we should have a speedy pipeline?

Pipelines such as CI and deployment are used very frequently. We don’t want these pipelines to be slow because we can’t push changes faster. And sometimes developers have to wait for a pipeline to finish before doing something else. #developerMoneyHoney

# How can we speedup our pipelines?

- Eliminate unnecessary steps: Look at each step in your pipeline and eliminate unnecessary ones.

- Optimize each step: After elimination, look at each step and optimize.

- Run steps in parallel: this is specially true for tests/sonar things. Run them in parallel.

# For example: a problem I faced was with pipeline for java.

there were 3 steps

mvn install
mvn release:prepare
mvn release:perform

After analyzing it, I realized mvn install was unnecessary. Since release perform would do the same thing.

Removing mvn install saved 33%time.

now, i saw tests been run thrice. One with mvn install so removing that eliminated it. But also during prepare and perform.

So I decided to skip tests in releas:perform.

This saved 30%time.

Overall the pipeline time was reduced by 63%.

In some cases, 28 min became 10 min.