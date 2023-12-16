---
comments: true
description: 'Placeholder' 
categories: [algorithm-problems, arrays]
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/same-tree
title: Blind 75 - Same Tree
---

[Video]

Check if two trees have the same elements in the same positions.

[Link](https://leetcode.com/problems/same-tree/)

# Approaches

# O(n) time; O(1) space; 8 lines

This is a preferred solution.

I was originally trying the iterative approach, which was too complex.

Source: [Java Solution better than 100% - LeetCode Discuss](https://leetcode.com/problems/same-tree/discuss/2790731/Java-Solution-better-than-100)

```java
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p==null && q==null){
            return true;
        }
        if(p== null || q == null){
            return false;
        }
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
```

Code optimization: null checks can become a single block

# Optimized

```java
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p==null || q==null){
            return p==q;
        }
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
```
