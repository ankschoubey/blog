---
comments: true
description: Placeholder 
tags:
 - configuration-management
publishDate: 2023-03-26T20:52:08.052481
last-modified-purpose:
permalink: /v1/avoid-or-mitigate-deleting
title: Manage Configuration Better By Avoiding Deleting or Making it Last Step
---

I have tried this in the past.

I wanted to restart something on Kubernetes.

I wrote a nice script. Which goes and deletes a prod.

Here was the problem. I forgot to add grep to filter out which pod to delete.

Thankfully, this was the dev environment and not production. And thankfully I don’t have access to run non-read commands on PROD.

And ended up deleting every pod.

My **wrong script**:

```bash
kubectl apply -f config.yaml
kubectl get pods| awk '{print $1}' | kubectl delete pod -n {namespace}
```

The **right script** would have been to grep first:

```bash
kubectl apply -f config.yaml
kubectl get pods| awk '{print $1}' | grep {searchTerm} | kubectl delete pod -n {namespace}
```

There was a **better solution**:

rolling restart. I could have used rolling restart here to just restart one deployment.

**This way only when the new is ready we delete the old.**

***

I found a parallel of this principle in git. 

I "proud" myself for not learning git well. Instead of resolving a complex merge between the dev and the upper branch. I would delete the upper branch.

The better approach would be to create a branch and rename branches. Test and delete the old main branch.

This is what I would try to follow.

Avoid deleting. Or if deleting can’t be avoided. Create a backup and move deleting to an end state after testing everything.