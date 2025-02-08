---
toc: false
comments: true
excerpt: Placeholder
tags:
  - technical
  - devops
  - information-system
publishDate: 2021-08-01T20:42:15.672411
title: Gist of DevOps
slug: /software-blog/devops/
---

<div style='display: none'>

My dear younger self,

You believed DevOps is bs and a buzzword. It kind of is. But it is highly valuable and important too.

Though you won’t always build something awesome from scratch and instead configure an existing tool to do the job, without DevOps you won’t be free to code.

You’ll spend all your time maintaining and deploying your code manually.

In this post, I’ll try to convince you why upper management likes DevOps so much.

</div>

## Where did DevOps come from?

There are 2 separate engineers.

- One who made the product -> Developer
- The other who made sure the product is running properly -> Operations Engineer

Operations Engineer's role included:

- Deploying application to server
- Making sure it is operating properly

Increasingly, some of the roles of Operation Engineers became so repeatable that it could be automated. Also, certain problems that operation engineer might face was much more easily handles if softwares were developed a certain way.

These gave rise to DevOps.

## What is DevOps?

DevOps is a mixture if tools and practices that make it efficient to build and maintain code.

Agile is what to do. DevOps is how to do.

DevOps practices occupies different stages of product development and beyond.

DevOps is such a broad term with loose definition that many other concepts are plugged into DevOps as a “best practice”. For example: Pair Programming.

DevOps also get’s merged with security and called DevSecOps. Security is usually an afterthought. But DevSecOps aims to fix security problems in the phase that created it making it much less costly to fix it.

You cannot copy another organizations DevOps structure as it is. Your organization and products are unique. Make your own style. Don’t copy everything that google or facebook do, though you can learn a lot from them.

Since DevOps relies so much on automation tools, some things can be achieved faster.

- Increase compliance
- Streamlining of processes
- Automating repeatable tasks

All the tools and practices results to:

- Increasing speed of deployments
  - Very important to stay ahead of competition even if core of business is not software.
- Increasing quality of software
  - Allowing making changes easily and reducing bugs
- Reducing cost of discovery and fixing issues
  - Bugs discovered faster can be fixed early
  - All this reduces downtime.

Some DevOps practices and accompanying tool that are very helpful are.

- Build Automation: Jenkins
- DB Automation: Liquibase, Flyway
- Code Linting: Sonar, CAST
- Continuous Integration (CI)
- Continuous Delivery (CD)
- Continuous Deployment (CD)
- Continuous Monitoring: ELK, Databriks
- API Management: Mulesoft
- Test Driven Development (TDD)
- Behavious Driven Development (BDD)

I'll be writing posts on these when I have enough experience working with each.
