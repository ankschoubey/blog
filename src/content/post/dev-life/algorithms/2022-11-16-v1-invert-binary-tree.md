---
comments: true
description: Swap left and right. Then repeat for those nodes.
categories: [algorithm-problems, binary-tree, east]
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/invert-binary-tree
title: Blind 75 - Invert Binary Tree
---

[Video]

[Problem explanation in English]

[Link](https://leetcode.com/problems/invert-binary-tree/)

**Intuition**: Swap left and right. Then repeat for those nodes.

2 lines can be saved by using a single temporary variable instead of `left` & `right`, but this is clean.

# O(n) time. O(1) space

```java
    public TreeNode invertTree(TreeNode root) {
        if(root == null){
            return root;
        }
        TreeNode left = root.right;
        TreeNode right = root.left;
        root.right = right;
        root.left = left;
        invertTree(left);
        invertTree(right);
        return root;
    }
```