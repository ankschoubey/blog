---
comments: true
excerpt: Fix bugs before your user reports
tags:
 - technical
 - observability
publishDate: 2023-01-01T20:52:08.052481
last-modified-purpose:
slug: /v1/observability-for-developers
title: Observability For Developers
---

# What is observability, and why is it needed?

Observability are tools that help understand how an application is running.

Typically, one an application is deployed, it is treated like a black box. We don't know what is happening inside the application except logs.

These logs aren't good enough specially when considering the complex distributed applications we have.

The solution is to implement good observability.

Observability is also sometimes called testing-in-production. It allows for clearer insight into the application.

For example, let's say you operate an e-commerce store and allow for multiple payment vendors like Google Pay, Amazon Pay, Apple Pay, etc. The code has been tested and working properly. Now, after an year, you went to buy something yourself. And you decided to use Apple Pay, but the payment fail. You debug and you find a critical configuration property was not added. Now you went ahead and fixed it. But when you check the database logs you realize, there wasn't a single payment via Apple Pay for the last 1 year. You missed a lot of potential business there.

With observability, your flow to catch the bug would have looked something like this. You get alerts that the number of payment request failing is too high. You want into you dashboard and checked what is happening. It indeed seems too high. You check the logs and find the issue and fix it. You just saved yourself half and year.

With observability, you can be proactive about the bugs and about the optimizations you can make to your application before your customer reports it. This makes you a continuous improvement machine.

For a real life example, you can see Slack's status which shows if slack is up or down. This provides an easy way for customers to know what is happening.

<https://status.slack.com/>

# What are the pillars of observability, and why do they make sense?

There are three main pillars of observability.

1. Metrics
2. Logs
3. Traces

Metrics are numerical values related to the application in a moment. Like, CPU utilization, Number of HTTP Requests success or failures, and RAM Utilization.

Logs are the application logs. One must ensure that logs are properly added to the right log level. I wrote an article about the topic here: [Link to logs post]

Traces are the visualization of request flows between multiple microservices (MS). For example, MS1 triggered MS2, MS2 triggered MS3 and MS4.

# What are the different observability tools?

There are different pieces involved in observability.

**Prometheus**: [Link to Prometheus Article]

- Tool for metrics.
- Application release logs in prometheus format.
- Prometheus will poll data every 15 minutes.
- It also allows to run queries against the data with use of PromQL language.
- **It's important for developers to learn PromQL Language for debugging.**.
- Developers can also add custom metrics via Prometheus.

**OpenTelemetry**:

- A tool that adds traceId to requests and helps to track it across microservices.

**Jaegar**: A wrapper for open telemetry.

**Graphana**: An active-development open-source tool for visualizing logs, metrics, traces and more.

**Kibana**: Another popular tool for visualization. It's part of a popular ELK stack.

**DataDog**: A paid tool similar to Graphana.

# What's the architecture of Graphana?

# What are the basic Graphana features one should utilise?

At the basic, one should be able to read logs. This is where most developers stop.

[Graphana Logs]

# How to set up dashboards in the best way?

The dashboard is where you'll see all your metrics visualized.
You want to visualize it in such a way that you can get to the problems faster.

Make sure you segregate the most important metrics dashboard has only useful information

# How to set up alerts in the best way?

Assume that most people don't know what to do.

Your alert should provide:
Context: What happened exactly?
Next Step: What to do next?

# How to use Graphana to debug a scenario?

Here is what's a typical flow:

1. You'll get an alert
2. You go to the dashboard and check it out.
3. You try to explore more, you write custom queries to find more details.
4. You combine the metrics with logs and traces.
5. You find the problem and you take steps to fix it.

Learn PromQL.

# How can Chaos Engineering help
