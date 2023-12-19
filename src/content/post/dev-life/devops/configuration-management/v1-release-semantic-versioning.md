---
comments: true
description: Placeholder 
tags:
 - configuration-management
 - release-cycle
publishDate: 2023-03-30T20:52:08.052481
last-modified-purpose:
permalink: /v1/release-semantic-versioning
title: Release and Development Snapshot Version Semantic Versioning with Maven
---

Semantic Versioning allows us to understand the nature of a release by comparing the newly released version with the previous version.

Each version number would comprise of 3 numbers. `major.minor.patch`

For example, `3.1.2` means

1. Major version is `3`
2. Minor Version is `1`
3. Patch Version is `2`

Major indicated a Breaking Change, meaning this version is not backward compatible. For example, Major version 3 is not backward compatible with major version 2.

The minor version is for backward-compatible features. For example, version `3.1.2` means there has been `1` feature added over Major version `3`.

The patch version is for bug fixes, non-breaking refactoring, performance improvements, etc. `3.1.2` means there have been `2` patch releases over minor release `1`.

## Upgrading using Semantic Versioning

This way, when we say if we have version `2.1.0` and the newest version is `3.0.0` we’ll be more careful upgrading because this is a major release. And therefore contains breaking changes.

If the new version is `2.2.0` we’ll be okay updating as the version number change indicates it’s a minor release.

If it’s a patch release like `2.1.1` we’ll update it right away.

Note: This version number depends on the programmer. While upgrading from one version to another, make sure to run all your automated tests to verify that nothing breaks.

---

## Using Semantic Versioning in Maven

In maven projects, we have two versions

1. Release version: Released to the public.
2. Development version: Indicating this is the next development. The development version has `-SNAPSHOT` assigned to it.

So, if the release is `2.0.0`, the development snapshot will be `2.0.1-SNAPSHOT`.

The problem here is what you do on the next release.

You can’t have `3.0.1` as the major release. Nor you can have `3.0.2` as the next patch release.

The major should be `3.0.0` and patch should be `3.0.1` with `3.0.2-SNAPSHOT` as dev version.

So here’s what I did,

1. Remove `-SNAPSHOT` from the development snapshot.
2. if the release is `major`, increment `major` and set `minor` and `patch` to `0`.
if the release is minor`, set` patch`to`0`
3. If the release is `patch`, do nothing.

Now, the patch version would just be the same as the snapshot with `-`SNAPSHOT` removed.

The next development version will always be `{major}.{minor}.{patch+1}-SNAPSHOT`.