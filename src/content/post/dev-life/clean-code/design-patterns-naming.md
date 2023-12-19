---
comments: true
excerpt: Making it easy for future-code readers to understand
tags:
 - clean-code
publishDate: 2022-03-12T20:52:08.052481
last-modified-purpose:
slug: /naming-design-patterns/
title: Clean code - Naming convension for design patterns
image: /images/naming-design-patterns.jpg
---
![](/images/naming-design-patterns.jpg)

[^1]

I have been learning design patterns recently. And as a result, implementing them in places that seem fit.

Usually, these patterns are nice. They make code concise and understandable.

This is given that the person reading it knows what the design pattern is.

So to mitigate this problem my current approach is.

To prefix name of class with the design pattern.

For example:

1. Strategy: `<ClassName>Stratergy`
2. Observer: `<ClassName>Observer`, `<ClassName>Listener`, `<ClassName>Callback`
3. Factory: `<ClassName>Factory`. (In case of simple factory: `{methodName}SimpleFactory`)
4. Decorator: `<ClassName>Decorator`
5. Chain of Responsibility: `<ClassName>Chain`. Method name: `{methodName}Handle`

You get the point.

Hopefully, this would make it easy for person reading the code to understand how to use it in future.

***

If there are more tthat can be done, please mention in the comments below. I'll be happy to know more approaches.

***

[^1]: Photo by <a href="https://unsplash.com/@glencarrie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Glen Carrie</a> on <a href="https://unsplash.com/s/photos/lego?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  