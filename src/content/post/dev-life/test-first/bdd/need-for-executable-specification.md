---
comments: true
excerpt: Ideas shape development; specs sync teams; Gherkin tests ensure precision.
tags:
 - technical
 - bdd
 - product-development
publishDate: 2022-05-21T20:52:08.052481
last-modified-purpose:
slug: /need-for-executable-specification/
title: The need for executable specifications
---

### How typically software is developed?

Typically when we start developing we either have a rough idea about what has to be developed or we have a story.

If the story is detailed, it’s better but if it’s not then we code up something and then hope it’s the right thing. 

If it’s not the right thing, we have to go back to all stakeholders (management, QA, Doc team, product team), show them a working demo and then change code accordingly. The cost of changing code is too high. And cost of keeping everyone in sync is high as well.

### How specification file clarify thinking about feature?

A functional specification file can help up avoid being foggy with our approach. It can help clarify requirements at a level not possible with most other methods.

A specification file includes all details about features and scenarios that are going to be built. The scenarios are detailed and include everything that developer will have to build, no less no more.


### How specification file can help everyone is sync?

Whenever anyone within organization has to discuss over features, the spec file can be shared. This will keep everyone in sync.


### What problem is faced with traditional specification file?

Spec files are updated constantly. Traditional ways of building spec doesn’t help know if spec file and product being built are actually in sync. 

It may happen that some features are added or removed but spec file or the product don’t paint an accurate picture.


### How Gherkin feature files solves problem faced by traditional specification?

Automated test files, feature files solve this problem by allowing plugins can Cucumber to write automated tests. If the test passes, the scenario was implemented perfectly.

If test doesn’t pass, then scenarios is failed.