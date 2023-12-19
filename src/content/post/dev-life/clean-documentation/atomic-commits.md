---
comments: true
excerpt: Why small frequent commits leads to higher productivity
tags:
 - technical
 - clean-code
 - continuous-integration
 - commits
 - code-review
publishDate: 2022-07-14T20:52:08.052481
last-modified-purpose:
slug: /atomic-commits/
title: Writing better commits with Atomic Commits
image: /images/atomic-commits.svg
toc: false
---

# What is the problem with larger commits?

Many developers complete all their features before committing and merging. When they commit and merge, 
- their commit is often bulky i.e it is too big
- since it is too big, it often causes merge conflicts
- since it is too big, the commit message is often not the best indicator of what the code does.
- since it is too big, there were too many changes, and the confidence to merge and expect everything to work fine reduces.
- since it took so long to merge, other developers might have built the same features again.

Often the reason is, that we are afraid to merge and want to get everything perfect the first time. But this is counterintuitive.

# Why we should do atomic commits?

Atomic commits are frequent commits. 

1. Allows for easily reversing changes
2. Leads to a more accurate commit history that can be easily understood by developers.
    - and therefore is easier to review.
3. Small changes are easier to revert than bulky changes.
4. Developers are much more in sync when small commits are merged non-stop.
5. Small commits lead to a better sense of progress.

Suppose you are working on two features related to upload and download of files to and from AWS S3. Instead of a single commit for both, you can break it down into multiple commits.

```conventional-commits
// bad
added support for file upload and download

// better 
feat(s3-service): configuration for AWS S3
feat(s3-service): add streaming upload file to S3
feat(api): add endpoint for streaming upload /uploads 
feat(53-service): streaming download from s3
feat(api): add endpoint for streaming download /downloads
```

# How to implement atomic commits in practice?

1. Commit and push to `dev` after every completing method/feature.
2. This push should involve both test and code.
3. The commit message should be accurate.
- Each commit should only include a small number of changes.
- Use a commit format like [conventional commits](/conventional-commits) that separates different types of commits: 
    - `feat`: feature
    - `refactor`: refactoring
    - `fix`: bug fix
    - `doc`: documentation
    - `ci`: continuous integration changes
    - `build`: related to build

In practice, you can assume committing `feat` at least once per hour. Other commit types especially `refactor`, `fix` and `doc` might be even more frequent.
