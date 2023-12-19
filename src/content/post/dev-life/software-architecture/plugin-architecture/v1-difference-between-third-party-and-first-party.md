---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - architecture
 - plugin
publishDate: 2023-03-03T20:52:08.052481
last-modified-purpose:
slug: /v1/internal-vs-external-plugin
title: The only differences between external_apps and internal_features in a plugin architecture
---

## From A User’s Perspective

First Party **Default** Apps are just product features.

First Party **Installable** Apps are apps that can be installed by the user.

- These apps are not enabled by default
- These are provided by default.
- A user won’t even know that these are treated as an app by the platform company.

**Third-party** apps are created by third-party developers and can extend the core functionality of the first-party app.

- These apps are not enabled by default.

---

## Code Perspective

**These two types of apps are the same**, except the first-party app doesn’t need Authentication to access Platform data, while the third-party app does.

A third-party app may utilize all capabilities that the plugin platform provides unless some capabilities are reserved for first-party apps.

In the previous post, I explained how we could define scopes for our resource would work.

I took the example of movies where an app is using 2 scopes: "**read:movies**" and "**read:userinfo**"

Let’s call this app, an external_app.

Now suppose we have an internal feature, which uses the same endpoints that "read:movies" and "read:userinfo" uses.

The only difference between external_app and the internal feature would be that the external_app will use OAuth and scopes to get access to the resource. While the internal_feature would not have to ask for permission to access the resource.

This means, once you create a scope, it’s fixed.

And this simplifies your development a lot.



---

So, therefore, we need not treat internal features and external apps very differently.

At the platform level, both internal_feature and the external_app are just apps.
