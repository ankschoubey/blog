---
comments: true
excerpt: go to each depth, incrementing a depth counter by 1. return max of it.
tags:
 - algorithm-problems
 - binary-tree
 - easy
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
slug: /v1/maximum-depth-of-binary-tree
title: Blind 75 - Maximum Depth of Binary Tree
---

[Video]

Find the maximum depth of the binary tree.

[Link](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

# Approaches
# O(n) time. O(1) space. 10 lines.

go to each depth, incrementing a depth counter by 1. return max of it.

```java
    public int maxDepth(TreeNode root, int depth){
        if(root == null){
            return depth;
        }
        int nextDepth = depth+1;
        return Math.max(maxDepth(root.left, nextDepth), maxDepth(root.right,nextDepth));
        
    }
    public int maxDepth(TreeNode root) {
        return maxDepth(root, 0);
    }
```

Code optimization: No need to create a separate function;

# Optimized: 5 lines

Source: [Java 100% Faster Very Simple - LeetCode Discuss](https://leetcode.com/problems/maximum-depth-of-binary-tree/discuss/2803516/Java-100-Faster-Very-Simple)

```java
    public int maxDepth(TreeNode root) {
        if(root == null){
            return 0;
        }
        return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
    }
```