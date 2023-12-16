---
comments: true
description: Placeholder 
categories: []
publishDate: 2022-09-24T20:52:08.052481
last-modified-purpose:
permalink: /integrate-external-services/
title: Pointers while integrating an external service
image: /images/integrate-external-services.jpg
---
![](/images/integrate-external-services.jpg)

Photo by <a href="https://unsplash.com/@alexbemore?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Shatov</a> on <a href="https://unsplash.com/s/photos/apps?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Have you worked with that external service before?

If not, then expect yourself to make many mistakes. To reduce mistakes, make sure you do good research and at the same time will adapt to a plan.

Discuss with other people who have already done it before. They may know something you don't.

# Are you integrating one service or are you integrating multiple similar services?

If you are integrating multiple services, your code would have to be modular enough.

In any case, try to make your code modular enough so that if suddenly a similar app has to be integrated, there are minimal changes to your code.

Take a look at factory and strategy design patterns.

# Does it provide an SDK in your language?

If yes, half your life's problems are now solved.

# How do you connect to the external service?

There likely is some kind of clientId, clientSecret, and OAuth flow at play.
You'll have to save the token somewhere if it's an OAuth flow.

OAuth flow sounds fancy but it's really easy. You might also find the SDK or an open source libary makes it easy to implement.

![](/images/integrate-external-services/oauth.png)

Image Source: [Slack OAuth Flow](https://api.slack.com/legacy/oauth)

# In case there isn't a library? How do you verify if something is really from that system?

You need some kind of token validation.

If that request is sent again, how would you verify that you received it only once?

# Are there rate limits in place on the external system?

If yes, how would you handle it?

# Are there special conditions in place?

For example, if it's a request/response scenario for a messaging app, it may request a response within a quick 3-5 seconds.

# Would you have to release the app on that particular platform?

If yes, you'll have to work with the Product and Doc team to make sure everything is polished.

# Resources

{% include image.html file='/images/integrate-external-services/ibm.png' caption='Overview of Application Integration' %}

Source: [What is Application Integration? - YouTube](https://www.youtube.com/watch?v=rcuu-O02xqE)
