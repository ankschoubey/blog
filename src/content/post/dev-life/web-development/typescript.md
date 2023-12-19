---
comments: true
excerpt: A much better alternative to Javascript
tags:
 - web-development
publishDate: 2021-12-01T20:52:08.052481
slug: /typescript
title: Typescript
image: /images/typescript.svg
last-modified-purpose: More details added
---
![](/images/typescript.svg)

Typescript is probably my favorite programming language. Switching from typescript to javascript should save around 60% of a developers time.

There are many reasons for it which I'll try to present in this post.

## Typescript

Typescript is a super set of Javascript which means everything which is available in Javascript is automatically available in Typescript.

Typescript only adds a few extra features which are convenient for developers.

## Typechecks

Probably the main reason to use typescript is this.

Having typechecks remove unneccesary errors. Types makes code more predictable. 

Dynamically typed programming language have bad IDE support.

VS Code has fantastic support for Typescript with typeaheads which are and will probably always be missing with Javascript.

## Everything is configurable.

Every typescript project has a "tsconfig.json" file which can be used to control everything typescript can do.

These include but are not limited to:
- Where to put the final output
- Ability to choose how strict the language is aka enable/disable following
    - null checks
    - any assignments
    - etc
- Shortcut paths

## Typescript compiles to JS

You don't miss anything with typescript because in the end it compiles down to javascript. 

You can choose which version of javascript to compile into from `tsconfig.json` file.

## Typescript works fantastically with many libraries are framework.

Both major web libraries (React and Angular) support typescript.

## How to transition from js to ts.

When you have a large application with lots of connected pieces, it makes sense to have connections between them standard.

So that as the application grows, the connections stay strong. And if parameters in a connection changes, it can be detected and changed at all places that use the connection.

This is missing in Dynamically typed languages like Javascript. But is available with a static checker like typescript.

------

Typescript does only a few things:

1. Applies types and checks them
2. Checks code quality to a level desired
3. Compiles to JS version of your choice.
