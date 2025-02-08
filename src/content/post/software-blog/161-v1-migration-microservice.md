---
comments: true
excerpt: Placeholder
tags:
  - technical
  - backend
publishDate: 2023-08-05T20:52:08.052481
last-modified-purpose:
slug: /software-blog/data-migration-microservice/
title: 7 Tips to Optimize a Microservice for Data Migration Job
toc: false
image: /images/software-blog/data-migration-microservice/data-migration-microservice.png
---

I published a post in [March 2023 about how typically DB migrations](/software-blog/db-migration-script/) take place. The post is considered a direct migration from one DB to the other.

But sometimes, you need to do a lot of things that can only be done by the microservice that would use this data.

For example, you need to structure data in a very particular format which would be a very heavy code to remake as DB Scripts.

Or you also need to communicate with special third parties like saving data to a storage bucket which might be something microservice does already.

In such cases, you need to use your existing microservice for the migration.

This post highlights some techniques I thought of when performing such a migration. The data had lakhs of records.

## Tip 1: Create a separate endpoint for bulk

Instead of saving one record at a time, save a bunch of records at once.

This increases performance for two reasons a large part of communication is establishing a connection, sending similar metadata, and waiting for a response on a thread. When you do bulk save, you establish 1 connection instead of multiple, you send similar metadata only once instead of individually and you have only one thread waiting for a response instead of everything waiting for a response.

[**Diagram of Single Request at a time**](https://mermaid.live/edit#pako:eNqdkj1vgzAQhv8KurWAbAOGeMiUvVLZKhY3XAgK2NSYqhTx32uaRlVbRfnwZJ-fe_XodBNsdYkgoMfXAdUWN7WsjGwL5bnzaOqqVrLx8rG32Abr9UOO5g2N8J4WvrcePZLH8gJspJUvssd_yOkjcFTwE9M1o6d3Z_IW9I_E-Z4rjdllY3aLMbvDmF09X3XZVt1iq-6wVeBDi6aVdek2ZVoSCrB7bLEA4a6lNIcCCjU7Tg5W56PagrBmQB-GrpT2tFUgdrLpXbWT6lnrX28QE7yDCDIW8ijjqySjURaTlPswgqAxD5OYcMoZIQnnEZt9-PiKoGFEonSVppzQlFFKXYfRQ7X_Tp8_AYBo7U0)

![](/images/software-blog/data-migration-microservice/Diagram-of-Single-Request-at-a-time.png)

Even multiple single requests are passed in parallel, they won't be as fast as bulk because of the number of connections that are needed to manage.

[**Diagram of Bulk Request with batch of 1000**](https://mermaid.live/edit#pako:eNp9kMFugzAMQH8l8mnTACVQAo0mDlN3nlRuE5cUXIoKhIUwjaH--8JaDp3a-RRbfs-xJ8hVgSCgx48B2xw3lSy1bLKW2HjTVVm1sibp2Bts3CR5SlF_ohbkZaiPZDtDvXne6eThtRSEUUptMVe66B_PinP_TG6kkTvZ4x32FrwgruXdZfIWu3okan-lIf96Lp-YLX9WuqO7vRE40KBuZFXYg02zOgNzwAYzEPZZSH3MIGtPtk8ORqVjm4MwekAHhq6QZjkuiL2se1vtZPuu1FUOYoIvEG7sezyI-TqMWRCvaMQdGEGwFffCFeWM-5SGnAf-yYHvXwXzAhpE6yjilEU-Y8wSWg3l4WI__QDIKpjF)

![](/images/software-blog/data-migration-microservice/Diagram-of-Bulk-Request-with-batch-of-1000.png)

Apart from this, databases are optimized for bulk operations, and therefore bulk operations are faster.

## Tip 2: In terms of IO, make sure everything is in bulk all processes

When doing bulk operations, you need to ensure everything in the pipeline is in bulk.

If you have twenty steps in your pipeline and 19 of them are bulk and one is sequential, then the sequential step would be a bottleneck to the whole system.

[Diagram of Bulk Processing](https://mermaid.live/edit#pako:eNqVkstugzAQRX8FzbYQ2TwM8SKLquoHlF3FxoJJQAGb2qYqRfx7nZK0SR8LvPHM6J57FzMTlKpC4GDwZUBZ4kMjDlp0hfTcux_aoxfsdndL9YQlNq-o-dKqvUcJOU2VrswVcdEtaL44N6L18tFY7Lj32Ghjz-DC_RIFjg1-pF5j7uvbcU1o7jhZrU-94dbHSluvz_yG_g38wrgbmV5Jg55Vf20GfOhQd6Kp3J6nk1UBtsYOC-CurIQ-FlDI2enEYFU-yhK41QP6MPSVsJebAL4XrXHTXshnpW564BO8AQ-ycMOijG2TjEZZTFLmwwicxmyTxIRRFhKSMBaFsw_vnxZ0E5Eo3aYpIzQNKaWO0Go41Gf3-QMvO9nR)

![]/images/software-blog/data-migration-microservice/Diagram-of-Bulk-Processing.png)

So, try to make sure every step is bulk, if you need to fetch data from the database, fetch them all at once.

If you need to save them to the database save them all at once.

Make sure all IO operations are in bulk.

## Tip 3: Make use of message queues/buffers like Kafka and leverage autoscaling of instances

If you have a large number of things to transfer, rather than migrating synchronously, you can bring a message queue in between.

The message queue will sit between the source system and the destination system. The data from the source system would be migrated to the buffer. The destination system can independently pick up resources from the buffer when it's ready and can process them.

[Diagram](https://mermaid.live/edit#pako:eNqtkk1PwzAMhv-K5fM2Ne2Wjh6QkLgggQTsBt3Ba921om2mfGyUbf-dbCsCDkgDESWS4zf2kzfKFjOVMyZY1GqTlaQt3D6mLfgxU05nPOuM5ea5oKSgoWG9Zt0rcJLmMBxe7k76qqYO7p0pd3DHxtCSHxw77qtzsrQgwx8aHEVIPe6wrjJrgPyEhSsKj7El2YNirNJsoHG1rVY1Q3MqN0cyfEX3ITkPuVd1DZuSW9BMebeDR864Wlftsr_OwfhnsncDNx5HrXcn5qdn-Grkj8DwPGL4A_H3wOg8YPR_FsfnEds5DrBh3VCV-0-3PfBTtCU3nGLiw5z0S4ppu_fnyFk169oME6sdD9Ct_A_i64qWmhr0tNr47IraJ6W-7THZ4ismw2k4ktFUXkymIpqOg1gOsMNEjOVoMg6kkGEQTKSMwv0A344txCgKovgijmUg4lAI4Su0csuy775_B9TAFHU)

![](/images/software-blog/data-migration-microservice/buffer.png)

This has the following advantage: The receiving system can autoscale.

If there are too many items in the buffer remaining to be processed, you can increase the number of instances to accommodate. Similarly, when the number of items in the buffer is less, you can scale down to a fewer number of instances.

This way multiple instances can work in parallel and only process messages when they are ready.

## Tip 4: Use feature flagging to disable features that are not needed

Hotstar is an Indian OTT platform that streams IPL, the country's most-watched sporting event. They get peak traffic of around 2.2Cr. What do they do when they are suddenly hit with all this traffic?

They do two things:

One, they increase the number of instances.

Two, they temporarily disable the number of features on the website to a minimum necessary. They call it "Panic mode".

While migrating, we can use the same principle, only enable features that are needed for the migration and disable everything else.

1. List down all the features your microservice provides
2. Go through the list and check the essential features needed.
3. Add a feature flag to disable the features.

In Spring Boot, you could use \@‌ConditionalOnProperty to declare beans when the system is not in migration.mode=true.

You may need to pair this tip up with the last tip in this post.

## Tip 5: Increase resources temporarily

Increasing the number of instances is called horizontal scaling. Increasing number the of CPU, RAM, and other resources is called vertical scaling.

In most cases, horizontal scaling would be good. But in case you need, go for vertical scaling. This would require a certain level of experimentation monitoring to decide. Monitor your microservice while performing the actions in a lower environment (dev/qa/uat).

## Tip 6: Create a temporary separate deployment of your microservice

Since you are doing feature flagging, increasing resources, having extra replicas, etc. it’s easier to manage this all by creating a separate deployment.

So, if you had a movies microservice deployment, you’ll create something like a movies-migration deployment.

The new movies-migration all the migration-specific configurations in it.

## Final Tip 7 and conclusion: Monitor your application to find bottlenecks. And do experiments to mitigate them

All the strategies above shouldn’t be used blindly, they should be used with experimentation.

Monitor your microservice while performing the migration and see, what’s the bottleneck. And try to resolve it.

If the bottleneck is the database, optimize query performance or use bulk like Tip 1.

If it’s because the service is doing extra things, feature flag it.

If it’s because there is heavy processing, increase resources.

Having an observability platform can be very useful for this sort of experimentation as you can find the bottlenecks really fast through graphs and visualizations.
