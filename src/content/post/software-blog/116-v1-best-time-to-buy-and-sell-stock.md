---
comments: true
excerpt: Make sure the left pointer is always the lowest yet. Keep checking the difference between left and right. And return max.
tags:
 - technical
 - algorithm-problems
 - sliding-window
 - easy
publishDate: 2022-11-13T20:52:08.052481
last-modified-purpose:
slug: /v1/best-time-to-buy-and-sell-stock
title: Blind 75 - Best Time To Buy And Sell Stock
---

[Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Learning From

[NeetCode](https://neetcode.io/practice)

## Asked at

[Source](https://seanprashad.com/leetcode-patterns/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

Given an array of stock prices. What's the maximum profile that one can get?

## All Approaches and Explanations in English

### O(n) time complexity. O(1) space complexity

Make sure the left pointer is always the lowest yet. Keep checking the difference between left and right. And return max.

### Code, if any

```java
class Solution {
    public int maxProfit(int[] prices) {
        int left = 0;
        int right = 1;
        int maxYet = 0;
        while(right < prices.length){
            int leftItem = prices[left];
            int rightItem = prices[right];
            if(rightItem < leftItem){
                left = right;
                right = right+1;
                continue;
            }
            maxYet = Math.max(maxYet, rightItem - leftItem);
            right++;
        }
        return maxYet;
    }
}
```