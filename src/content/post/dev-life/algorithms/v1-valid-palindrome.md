---
comments: true
excerpt: Have 2 pointers. One at the start other at the end. Skip if `!Character.isLetterOrDigit` and compare with `Character.toLowerCase`
tags:
 - technical
 - algorithm-problems
 - two-pointers
 - easy
publishDate: 2022-11-6T20:52:08.052481
last-modified-purpose:
slug: /v1/valid-palindrome
title: Blind 75 - Valid Palindrome
---

[Link](https://leetcode.com/problems/valid-palindrome/)

## Learning From

[NeetCode](https://neetcode.io/practice)

## Asked at

No where

[Source](https://seanprashad.com/leetcode-patterns/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

## All Approaches and Explanations in English

### O(n) solution. O(1) space complexity

Have 2 pointers. One at the start other at the end. Skip if `!Character.isLetterOrDigit` and compare with `Character.toLowerCase`

### Code, if any

```java
class Solution {
    public boolean isPalindrome(String s) {
        int l = 0;
        int r = s.length() -1;
        while(l<r){
            char left = s.charAt(l);
            if(!Character.isLetterOrDigit(left)){
                l++;
                continue;
            }
            char right= s.charAt(r);
            if(!Character.isLetterOrDigit(right)){
                r--;
                continue;
            }
            if(Character.toLowerCase(left) != Character.toLowerCase(right)){
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```