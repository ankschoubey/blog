---
comments: true
excerpt: 'Placeholder' 
tags:
 - technical
 - devops
 - configuration-management
publishDate: 2021-09-23T20:52:08.052481
slug: /software-blog/configuration-within-application/
title: Keep most of your configuration within application not Jenkins
---

If you have a separate DevOps teams, Jenkins will usually be configured by them.

Developer will have an easier life if they have as less dependency on external team as possible.

Sometimes, Jenkinsfile includes every minor detail. For example:

- In a node project, Jenkinsfile could include things like running an application in production mode along with certain parameters.

This can be okay if the paramaters are configured via Jenkins UI. But if same configuration is going to be used, it is easier to maintain and adapt by keeping them inside application and using Jenkins to only trigger script within application.

In node applications, you can use following to configure default behaviors.

- scripts in `package.json`
- `.npmrc` file for npm
- `tsconfig.json` for Typescript

In Maven projects, you can have operations such as:

- Ignoring File during build
- Coping certain files
- To disable test cases for certain builds etc.
