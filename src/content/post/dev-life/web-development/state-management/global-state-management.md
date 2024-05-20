---
comments: true
excerpt: 'Discover the transition from singleton patterns to advanced state management with Redux. Learn why modern libraries offer superior scalability and maintainability for UI applications' 
tags:
 - technical
 - web-development
publishDate: 2024-04-12T20:52:08.052481
slug: /software-blog/navigating-global-state-management
title: Navigating Global State Management - From Singletons to Redux
image: https://docs.google.com/drawings/d/e/2PACX-1vQqQK12IsL_D0vkppL8_GWo14aYnNtUNRE5dgJf7SqRQHqNuYUUx8FCkMwgIlYpWW4klMvbJSGhx3Fo/pub?w=1195&h=671
---

<style>
    img {
       background: #ffffff7a
    }
    </style>

When a UI application is complex, it has one or more components and some shared data between those components.

For example, a separate UI component on the left may share the same data as another UI component on the right. When a change happens in one of them, it should affect the other as they share the same data, i.e., the same State.

![1-ui-having-shared-state](https://docs.google.com/drawings/d/e/2PACX-1vTX8rYXamOU_3huQFnTbaXc4kfN7H-IvLSXACJr7zsIh8PU_-iKw5OWfPLIHUqiBtpykhL5ykVBmUPR/pub?w=1358&h=783)

We can keep the State within a component. If we do that, the state will be available to its children.

![2-ui-where-parent-is-saving data](https://docs.google.com/drawings/d/e/2PACX-1vQIPuKqNT_cHm9aPJ3w2QYgwENNCtm8DMPcxxR0KOP-sltrrCFFn9qK_iH2rNUsTtOEiA6BIOB04B1X/pub?w=1105&h=818)

Or we can make it global so that it's available to everyone.

![3-ui-with-global-state](https://docs.google.com/drawings/d/e/2PACX-1vQqQK12IsL_D0vkppL8_GWo14aYnNtUNRE5dgJf7SqRQHqNuYUUx8FCkMwgIlYpWW4klMvbJSGhx3Fo/pub?w=1195&h=671)

Since this State is shared between multiple services,

**Why the word State?** You can think of stateful vs stateless like microservice. A state means an application has its data within itself, so it's given. stateless means data is provided to it each time.

If you think about it, the global State is just a global variable.

---

## A singleton as a global state

This is one of the patterns I saw in an Angular application. And it was terrible to debug.

We had a singleton class. This singleton class would include all the application's States.

When the application loads up, it saves the data to this global singleton.

This singleton would be imported into all the components, and each component would use it to render data and update it.

### Lack of easy access control

While the singleton is nice, its main problem is the lack of access control.

[Image of me doing one thing, and something else entirely happens]

The problem was updating the global State directly. I might be at one screen and suddenly see something update for which I didn't even initiate.

Angular allows for two-way binding, which means you can read data and update the same data. Compare this to React, which has one-way binding: you can read data, but to update it, you need to call a function, and that function would update the data.

This function creates a barrier to updating—a small access control.

The singleton would have no barriers and change the entire application terribly.

---

### Components need to know how and what to update

Without access control, each component must know precisely how to put data in the shared State.

For example, suppose we always keep the data in sorted order.

If each component updates the data by itself, they must ensure the data is kept in a sorted order.

---

### Harder to Debug And Understand The Sequence Of Operations

If another component updates the singleton data, there is no way to know which did. I could not even use log lines, especially since Angular has data bound directly in an HTML template.

Debug points, at some times, were my best bet. Yet, it was tough and would slow me down.

I would always need help understanding which component updated the data.

---

### Overall, Simple Singletons do not scale well

So overall, singletons are bad for global state management because

- They lack some basic level of access control.
- Each component needs to know how to update the singleton. (While this can be resolved quickly).
- Harder to understand the sequence of operations.

I believe the React Context API would also not scale well as they seem very similar to a singleton. Do let me know if I need to correct something here.

Let's see how Redux and other Messaging-based State Management Libraries work.

---

## Messaging Based State Management Libraries Like Redux

There are many libraries similar to Redux, like Recoil and Zustard. (I like Zustard). Each has a similar concept.

There is a global store.

- The Global State is managed separately from components.
- A component can read data from the global State. But it can't directly update the data in the global State.
- To update, the component can dispatch an event.
- This event is pre-decided in our global state management implementation code.
- The events are mapped to reducer functions, which can update the global State.

![Redux Gif](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

This is just CQRS on the front end. I'll soon write an article on "Redux is just event sourcing on frontend!" TODO

### Access Control

The store designer and the reducer function are responsible for providing a way to update the store.

Since only the reducer function can update data, there is a predictable way the data is updated. Solving both the problems of access control and not needing components to be smarter.

### Components need not know the schema

The reducer function defines how the messages will be processed and what format the messages should have.

The component's job is not to know how the data will be stored in redux.

- During writing, they must `dispatch` the data in a particular format.
- Similarly, during reading, a component can choose to tie itself to the schema, or a better option of creating a `selector` function can be used. The `selector` function is used to untie the component from Redux Schema. Any future change to the schema would only affect the `selector` function.

### Easy Debugging via Logs and Replays

Message-based State Management Libraries provide a better debugging experience via their plugin.

For instance, you can use Redux's Dev Tool to see every `action` that was `dispatched` to the Redux store. What was the `payload` (the data) in the `action`, what was the `state` before, and what is the `state` afterwards?

This serves as a perfect log. Like event sourcing, we can return to a previous `state` in the application. This will allow us to see what the application looks like in an earlier state.

Consider the following sequence of `actions` on a redux store,

- Action 1: `{type: "ADD_ITEM", payload: {id: 1, title: "Groceries"}}`
- Action 2: `{type: "ADD_ITEM", payload: {id: 2, title: "Medicines"}}`
- Action 3: `{type: "RENAME_ITEM", payload: {id: 1, title: "Groceries from Big Bazaar"}}`
- Action 4: `{type: "REMOVE_ITEM", payload: {id: 2}}`

These will be the actions that a component dispatches to the redux store. The reducer function takes each `action` and performs the appropriate update to the redux store.

As you can notice, the sequence of actions themselves serves as logs. Every Message Based System provides something even better for debugging: Replays:

- Suppose, while debugging the application, we notice the rename hasn't worked properly. What we can do using Redux Dev Tools is to go back in time to when `Action 2` or `Action 3` happened. This will change our User Interface to the old State. And then allow us to debug.

### Overall, Redux bring better scalability

Using a Message based State Management Library like Redux bring better scalability to our code by:

- Providing a layer of access control
- Allowing components not to know details of the global State.
- Allowing each debugging via Logs and Replays

## Concluding

Global State is the application data shared by multiple components.

There are many ways to manage global State, including singletons, React Content API (similar to singleton) or a Message Based State Management Library Like Redux.

Singletons and Content API are less scalable than Redux because they lack access control, often require components to know about global state schema and are more challenging to debug.

Redux resolves all of these issues. Over it, Redux, like state management libraries, provides powerful debugging capability via Replays.

**What methods or techniques do you use to manage Global State within your UI Application?**
