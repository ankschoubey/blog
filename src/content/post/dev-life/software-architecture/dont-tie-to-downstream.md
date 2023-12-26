---
comments: true
excerpt: "Be careful not to introduce high coupling between microservices." 
tags:
 - technical
 - architecture
 - message-queue
publishDate: 2023-12-26T20:52:08.052481
last-modified-purpose: added CQRS
slug: /dont-tie-micro-service-to-downstream/
title: Thinking Microservices - Don't tie yourself to one or more downstream (consumer)
image: /images/dont-tie-micro-service-to-downstream.jpg

---

## Monolith and The Habits of Coupling

When building monoliths, we have a single code base; when we need to make a change, rather than making a change in one area of the code, we may choose to make a change somewhere else. This leads to called high coupling.

For example, consider you have two modules that talk to each other.

Module A <--> Module B

Module A deals with RestAPI, and Module B deals with Service later.

To make your coding easier, you may add certain features in Module A because implementing the same in Module B is tricky.

This leads to coupling.

## Upstream and Downstream

When working with Microservices, two new concepts come into the picture: Upstream and Downstream.

For a Micro-service,

- Upstream is a microservice or any other service that is sending data.
- The downstream is any service listening to its data.

For example, if you have an ECommerce Application, you may have an `order-microservice.`

For the `order-microservice`.

`cart-microservice` may be upstream because it sends its data.
`shipment-microservice` and `notification-microservice` may be downstream. Because it's sending it data.

When thinking of microservice, this is the main game: upstream sends data. And downstream consumes data.

## Don't tie yourself to a downstream

Like in the Monolithic case, don't couple yourself to an upstream or a downstream.

When you couple to your upstream, whenever the upstream changes slightly, you'll have to change with it, too.

## How to uncouple from upstream?

To uncouple from upstream, keep the functionality you use in a separate class and POJOs. Make sure to use POJO rather than Maps.

For downstream, the task here is non-technical and related to prioritization.

## How to uncouple from downstream?

### Think less of your downstream when they aren't there

While you should think of downstream that consume your data, you don't have to over-engineer. Be okay with some limitations.

### Don't let downstream fully dictate what data to send

For example, suppose you publish 10 different types of Messages on a Message Queue like Kafka. Your microservice has been up for 10 months, and you have 10 downstream applications. One microservice team says it only wants to modify the data format. They want the same data in the message, but the format is different. (You could even think of a REST API if you have one.)

You ask why? They say it's because that's their data model. Modifying it at their upstream location would make it easy for them to avoid preprocessing.

What should you do? Be ready to say NO! But before saying NO, evaluate their request. Is it a significant change or a slight change? What's the impact, and does fulfilling their request make the system better or more complex.

You aren't serving one microservice; you are serving many. For one change for ease of one microservice team, you can't afford breaking changes for everyone else (though it can be avoided by message versions), and you want to introduce extra complexity with major gains. You want to keep your code lean and straightforward to maintain.

Learn to express these design choices well.

When switching to microservices, you are likely to face many such scenarios.

## Conclusion

Coupling is easier in Monoliths as the code is in the same code base.

Coupling is costly in microservices, and changes in one code base impact many (often unknown) microservices.

You should avoid tying/coupling yourself to upstream and downstream.

To not tie yourself to the upstream, separate your upstream-related code from your core code base.

For downstream, the task is more design and non-technical.

***

Photo by <a href="https://unsplash.com/@growtika?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Growtika</a> on <a href="https://unsplash.com/photos/a-group-of-blue-boxes-ZfVyuV8l7WU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
