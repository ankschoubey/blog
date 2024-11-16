---
comments: true
excerpt: I believe walking the board is an important step towards facilitating Continuous Delivery. The standup format facilitates perfection in updates, focused on one card at a time which is closer to completion and takes less time to complete.
tags:
 - technical
 - business
 - agile
publishDate: 2023-07-02T20:52:08.052481
last-modified-purpose: 
slug: /v1/walk-the-board/
title: Efficient Standups - Achieving Clarity through Walk-The-Board Standups
image: /images/v1-walk-the-board.jpg
---

![](/images/v1-walk-the-board.jpg)

Photo by <a href="https://unsplash.com/@sebastien_bonneval?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sebastien Bonneval</a> on <a href="https://unsplash.com/s/photos/kanban?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

I believe walking the board is an important step towards facilitating Continuous Delivery. The standup format facilitates perfection in updates, focused on one card at a time which is closer to completion and takes less time to complete.

I first learned about Walk-The-Board from a [video posted by Development that Pays](https://www.youtube.com/watch?v=316qdj10j9M).

In this blog post, I talk about the Walk-The-Board approach and what we learned from it.

## Importance of Daily Stand up

Daily Standup (also called Daily Scrum) is a 15-minute event with the Scrum framework where the team meets at the same time and place to discuss the progress of work.

Scrum events are for inspecting and adapting, and the daily standup is a chance to do that every day.

It keeps team members in sync and increases focus toward the sprint goal. Any impediments are discussed and resolved post the scrum.

## How typically Daily Stand up is?

A typical Daily Stand up involves each team member taking turns and answering 3 questions.

1. What did I do yesterday?
2. What did I do today?
3. Do I have any impediments or blockers?

### Problem 1: Individual update rather than work progress.

While good in its intent, typically, Daily Standup becomes an update on the person rather than the progress of the work that was decided.

For example, a team member may answer it like this;

1. Yesterday, I had a call with.. blah blah blah. And then I connected with blah blah blah. No impediments.
2. Yesterday, I was on leave. Today, I'll connect with the team to pick up a card.

The Daily Stand-up update becomes an individual update rather than a work-related update.

It doesn't matter if you were on leave yesterday. Or that you had the call with someone. If the work that we decided on was X, the progress should be about the work, not the individual.

While we can try to focus the team on focusing on work updates instead of individual updates, it's really hard to do as the format of the daily standup requires everyone to speak something.

### Problem 2: Repeatation the same things over and over again.

In Problem 1, we saw how the 3 questions led to individual updates rather than a team update.

When multiple people are working on the same card, you'll hear the same people speaking the same things over and over again.
For example, Thor, Tony, and Steve worked on the same card, Defeating Thanos. All of them say the same updates.

1. **Thor**: Yesterday, I worked on defeating Thanos. Today I'll work on defeating Thanos. No impediments.
2. **Tony**: Yesterday, I worked on defeating Thanos. Today I'll work on defeating Thanos. No impediments.
3. **Steve**: Yesterday, I worked on defeating Thanos. Today I'll work on defeating Thanos. No impediments.

Tony and Steve can also shorten their updates.
If **Thor** says,  yesterday, I worked on defeating Thanos. Today I'll work on defeating Thanos. No impediments.

Tony and Steve could say, I have the same updates as Thor.

But still, this is a repetition. Ideally, one update by Thor would have been enough to judge the progress of work. Tony and Steve have nothing new to offer.

### Problem 3: Remembering. And prepping, and then relaxing.

The 3 questions format is such that it requires extensive preparation and makes people relax after they have said their points.

#### Preparatory Thought Process.

> What did I do yesterday? Hmm. I did some things... I remember a few points. Okay, it's my turn next.

(I say my script. Did this. Will do this. No impediments.)

#### Relaxation

> Now it's someone else's turn; I can relax since the boss knows what I did. I don't have to listen to someone else.

This is school. People are only attentive when they have to answer. After they have answered, they stop paying attention. Social slacking takes over.

## How Walk-The-Board approach is different from Daily Stand-up?

The 3 problems described before are because of the design of the 3 questions approach to the daily standup.

The best way to do the standup is not to get better at an inefficient 3 questions approach but to adopt an alternative approach that's efficient by design.
The walk-the-board approach of daily standup fixes all three problems that come with 3 questions approach.

1. It fixed problem 1 by turning individual updates into work update
2. It does not repeat what has already been said
3. It does not require any preparation or extensive remembering. And people keep people attentive throughout the standup.

### What's the walk-the-board approach?

In Walk the Board, instead of going through one person at a time, you start with the board and talk about the items on the board.

To discuss, you start with the rightmost card; the person who has an update about the rightmost card gives updates about that card and **that card only**.

Then the focus is on the next card, which is rightmost. And this way, you talk about all the items on the board.

This solves the following problems:

#### Solving Problem 1: Individual updates get replaced by work updates.

Instead of talking about what the person did yesterday that may or may not be related to the work at all, in walk-the-board, you are focused on the work only.

#### Solving Problem 2: Repetition gets removed, and you talk about the update only once.

The updates in Walk the Board are not jumbled; you only talk about and hear about one card at a time. Once that card has been discussed, someone else won't likely come up and talk about the same card.

#### Solving Problem 3: Remove Remembering, prepping, and keeping everyone attentive.

The order in which the work updates happen is not fixed since one day; you can have someone's cards on the right. The other day you might have someone else's card on the right.

Since it's not a fixed order, everyone stays attentive!

### Extra benefits of walking the board

#### Focusing on the card closest to done.

If you deliver the task, your users will get to use the implemented feature faster.

If your users get value faster, they'll give more money.

The card closest to done can be delivered faster since it's close to do.

Walk the Board starts with the rightmost card. Therefore, the right-most case becomes. And if the card is not moved, it'll be talked about every day first!

Tip: It's helpful to enforce picking just one card and pulling it to completion.

## How we adopted the Walk-The-Board Approach?

Walk the Board took a few weeks for us to adopt. We started by practicing Walk the Board one day before the standup.

We polished each update to be in the following format, 

```
Regarding, {cardname}, {update}
```

This way, our updates were much sharper.

We restricted telling about our days and focused on talking about the work itself.

It took us around 4 weeks to perfect walk the board.


## What was the impact of the Walk-The-Board approach?

When I first saw the video of the Walk the Board method. I was instantly in love with it because it addressed the problem I always faced. Preparing to talk about what I am going to say next is overhead. I have to remember everything that I did yesterday, and there are fewer props.
 
Here are some other effects I observed:

### Consolidated Updates
- Each person might be working on different swim lanes (i.e., Different Parts of the value stream), and by default, we hear updates about all of them. While doing walk the board, we went swim-line by swim-lane.  
- This meant all topics were discussed together in a swim lane regardless of how many different teams the members belonged to.  

### Team Update

It felt like a team update rather than a status update. It doesn’t matter what you did the day before. What matters is how much progress you have made.

### Shorter time for updates
Updates with walk-the-board are much shorter than the traditional 3 question update. These updates were must shorter and on point.

### Finishing a card.
We started focusing on getting cards done over picking up new cards. Though this also involved a lot of deliberate effort.