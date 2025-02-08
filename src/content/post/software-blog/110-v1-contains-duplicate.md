---
comments: true
excerpt: Create a set and put items in one by one while checking if `num` is already there.
tags:
  - technical
  - algorithm-problems
  - arrays
  - easy
publishDate: 2022-10-30T20:52:08.052481
last-modified-purpose:
slug: /v1/contains-duplicate
title: Blind 75 - Contains Duplicate
---

[Link](https://leetcode.com/problems/contains-duplicate/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

If the array contains any duplicate, return true. Else false.

## All Approaches and Explanations in English

### O(n^2) solution. O(1) space complexity

Double loop. And check if the elements are equals.

Bad. Solution.

### O(n) time complexity. O(n) space complexity

Create a set and put items in one by one while checking if `num` is already there.

### Code, if any

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> visited = new HashSet<>();
        for(int num: nums){
            if(visited.contains(num)){
                return true;
            }
            visited.add(num);
        }
        return false;
    }
}
```
