---
comments: true
excerpt: Check if root is same as subtree or root.left is same or root.right is same;
tags:
 - technical
 - algorithm-problems
 - tree
 - easy
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
slug: /v1/subtree-of-another-tree
title: Blind 75 - Subtree of Another Tree
---

[Video]

Check if one tree is a subtree of another.

[Link](https://leetcode.com/problems/subtree-of-another-tree/)

## Approaches

### O(n*2) time; O(1) space; 12 lines

Check if root is same as subtree or root.left is same or root.right is same;

Half the solution is from [Same Tree](/v1/same-tree)

```java
    public boolean isSame(TreeNode one, TreeNode two){
        if(one == null && two == null){
            return true;
        }
        if(one == null || two == null){
            return false;
        }   
        return one.val == two.val && isSame(one.left, two.left) && isSame(one.right, two.right);
    }
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if(root == null){
            return false;
        }
        if(isSame(root, subRoot)){
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
```
