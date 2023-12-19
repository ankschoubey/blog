---
excerpt: beyond algorithms and data structures
title: Programming is now Configuring
comments: true
tags:
 - technical
 - configuration-management
publishDate: 2020-06-29T20:42:15.233506
use_math: true
slug: /config/
---

## What we learned when starting out
The programming initially included these:
- variables
- operators
- conditionals
- loops
- functions
- classes

Along with these were concepts such as Algorithms and Data Structures. All these in effort to make original programs.

## What we do
Increasingly I have realized that most of what we do is not creating functionality from scratch.

These are the kind of things I do regularly:
- Wanted to add zoom in zoom out on images: **OpenSeaDragon module**
- Wanted to generate PDF on the client-side: **jsPDF module**
- Wanted trailer videos: **TheMovieDB API**
- Idle session timeout alert: **ng-idle**
- Want to talk to a DB: **Spring Data JPA**
- Wanna have a table on a page: **I don't write my HTML tables. I use DevExpress**.
- Want my website to be installable on Mobile/Desktop: **@angular/pwa** module

Programming role for the most part is to configure other's code/modules/APIs so that it works well along with other modules and our tiny code.

And whatever tiny code that we do write is rarely even unique. For the most part, it is either the same functionality as something built before or copy/pasted from StackOverflow or Github.

Also for a good amount of things, one can easily skip backend coding by using something like Firebase.

## Code Generators and Configuration Files
I wanted to contribute to PyTorch so I read their code and understood nothing.

I thought I had enough Python & DL skills but that was not the problem.

The point was they have ATEN: a kind of configuration language that allows them to generate programs in their target language on the Fly.

A topic similar to code generators are configuration files such a .properties or .yaml

I love these. The behavior of the application can be changed entirely using configuration files. For these to be most effective the entire application has to be built with configurability in mind.

## 80/20 split
I used to despise DevOps earlier because I never wanted to leave programming behind. After all, a major part of DevOps is configuring tools. But I realize now that ROI is huge.

I still believe that learning the principles are more important than learning a specific technology.

Learning a principle such as Deep Learning means that underlying technological tools such as PyTorch, Tensorflow, or even AutoML matter very little.

These principles (20%) apply to a small by very important parts (80%):
- deciding what to do
- connecting different modules
- debugging

Similar: [Make your code configurable](/code_configurable/)