---
toc: false
comments: true
description: Placeholder 
tags:
 - information-system
title: Keeping Web Dev Code proper
publishDate: 2021-08-01T20:42:15.593554
permalink: /web-dev-clean/
image: /images/web-dev-clean.jpg
---
![](/images/web-dev-clean.jpg)

Photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/web-development?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
## Choose a stable framework. 

If less modification is required, your code will last longer.

## Make very small modular pieces.
In Angular/React, create components even for small things like `img` or `video` tag. You’ll find that there are certain attributes you assign to every `img` tag that can be taken care of from one place

Separate app logic from business logic. You should be able to copy-paste these modules into another code base and use it without changes.

In angular, make use of everything: components, service, directives, pipes, interceptors, etc/

## Make layout components

These are common layouts you use throughout the application. Coding them in one place reduces unnecessary duplications.

## CSS

The best way to deal with CSS is to write less of it.

CSS gets messy fast. By keeping your components small. You are halfway there to a good CSS. 

Also make good use of `display: flex`. It gets most of the job done.

## HTML

The best way to keep HTML clutter-free is to not write javascript/typescript logic in it

Angular provides a `ts` file, use it for everything. Even for ngStyle or ngClass. 

This will keep your HTML very clean

Create a `get` method to keep things clean.

## Have very few utility classes.

It’s stupid to have too many utility classes spread throughout your codebase. Have only a few at a single place.

Only keep a utility class or method if it is used. Remove unnecessary code.

## Resources

- [YouTube channel: Fireship](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA)
- [How to Properly Structure Angular Code](https://www.youtube.com/watch?v=WA95EJGhbLc)