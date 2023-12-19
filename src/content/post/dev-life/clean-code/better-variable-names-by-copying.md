---
comments: true
excerpt: 'Placeholder' 
tags:
 - clean-code
publishDate: 2023-03-18T20:52:08.052481
last-modified-purpose:
slug: /v1/better-var-name-by-copying/
title: Have better variable and method names for technical layer by copying others
---

Writing good variable names clarifies your thinking. But it can be really really hard coming up with your own variable names.

If you are in a domain, you could pick up domain specific names.

For example, a common school software may have Students, Teacher, etc.

This maybe classic domain driven designs.

But in technical layers it can be harder to come up with variable names.

I started working with NodeJs Mongoose framework. I created my Model and was thinking of what method names should I use for common operations like `save` and `find` . There were multiple `find` operations and they were getting messy because it was hard to understand what is what.

In javascript, we don’t get an error if we are passing less number of parameters. For each `find` I made it was hard to understand what to pass.

Then I remembered how `Spring Data`

handles the same problem.

They use `findBy{Attribute}And{AnotherAttribute}`.

Now my code became much much better. And I followed `Spring Data` 's entire method naming style.

---

If you are writing a custom library or working in a language that doesn’t have good variable/method names. You can adopt naming conventions of other projects.

[Pytorch](https://pytorch.org/)

[Tensorflow](https://www.tensorflow.org/)

Spring Boot

UI: DevExpress Extreme