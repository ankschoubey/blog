---
comments: true
description: Placeholder 
categories: [database, culture, ideas]
publishDate: 2020-10-31T20:52:08.052481
last-modified-purpose:
permalink: /v1/adoption-of-db-migration
title: Easing the process of DB versioning & migration tool adoption
---

Likely reasons for Liquibase non-adoption
- Multistep step process
- Experimentation while creating statements
- Creating rollback
- Copying the statements
- Saving into git
- Running Liquibase in QA
- Fixing problems that come while running Liquibase.
- Lack of GUI

These make Liquibase slower and unappealing bottleneck compared to the alternative of just putting the script in a CR.

## Solution 1:

Providing an alternative to Liquibase

or

## Making Liquibase Easier

A simple web tool can be created which only developers would use to automatically generate output in Liquibase or another format which can be executed on a DB.

### Features:
- Generation of Liquibase script

As described above
- Execution of DDL scripts on DB
- DDL commands can only be executed via the tool.

Along with a message for why the change was made along with the developer id. Optionally, if DDL is associated with a story or a git branch then that info can also be added.

### Logs
- Like Kibana: An easy way to track all the DDL changes in a DB.

Similar to logs easily available and searchable.

#### Solution 2: DB Deployment Manager

In each team a person can be made responsible for all DB DDL changes. Similar to CAST Quality Manager.

### Change the focus to process (Automated DB Deployment) instead of tool (Liquibase)

Developers don’t seem to know the goal of Automating DB Deployment.

I don’t believe anyone would disagree with Automated DB Deployment. The problem is likely the tool: Liquibase.