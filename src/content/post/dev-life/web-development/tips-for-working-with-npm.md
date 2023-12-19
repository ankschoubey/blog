---
toc: false
comments: true
excerpt: Placeholder 
tags:
 - web-development
publishDate: 2021-08-11T20:52:08.052481
slug: /package-json/
title: Tips for working with `package.json`
---

## Create and use scripts

There are some common names of scripts you can create like postinstall start, etc.

For example: for Ivy enabled Angular versions, one can avoid repetitive recompilation by running `ngcc`. We can add a script in package.json to run ngcc after every `npm install`

```
    "scripts" : {
        "postinstall" : "ngcc"
    }
```

It's better to manage npm related activities using package.json than manage it using something like Jenkins.

## npm outdated

This shows you all the packages which are not the latest.

`npm outdated` can be also used in your deployment pipeline. This can service as an important monitoring metric for maintainance of the application and ensuring longer life.

## Clear cache before `npm install` on every environment

Cache can be cleared by using

`npm cache clear`

Clearing cache before installation on your dev/QA/prod env will ensure it will run the same on any environment.

## Use custom registry

Even when installing on local, make sure to use custom registry.

If you are going to use a registry like Nexus to manage packages, it makes sense to use the same registry for installation local. The closer you can replicate your prod on local, the fewer bugs you are going to face.

This can be done in 2 ways:

- Using `--registry`
`npm install --registry <link-to-repository>`

- Creating a project level `.npmrc` file

Inside the file write:
`registry=<link-to-repository>`

## Managing `node_modules`

### use yarn instead of NPM

yarn is a package manager just like npm but it provides a few features that make it better.

- multi-threaded download. This makes yarn much faster than npm which only supports single-threaded downloads.
- offline mode. Once a package is downloaded, it can be downloaded again. even if the node_modules folder is deleted. This is because yarn stores a backup of everything.

### If you are not using yarn, zip `node_modules` before making dependency upgrades

Often things don't go smoothly when upgrading changes dependencies. Since, node_modules are ignore in git, the only way to revert or switch between branches with dependencies is a clean npm install.

Yarn supports offline line mode which means nothing is downloaded if dependencies had been updated once. If you are not using yarn, zip `node_modules` before making dependency upgrades. You can unzip it easily if you need to revert.

### Skip above `node_modules` tips and use `pnpm`

Installations: `npm i -g pnpm`

Usage: `pnpm install`

`pnpm` is a disk efficient package manager which stored all node_module packages in one place and used  sim links for installing within projects. If you have a same package in multiple project, `pnpm` will make sure to download and store it only once. 