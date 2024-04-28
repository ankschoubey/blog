---
comments: true
excerpt: Loop twice.<br>first right to left while multiplying.<br>Then second left to right while multiplying.<br>This can be done in a single array and one extra product variable
tags:
 - technical
 - algorithm-problems
 - arrays
publishDate: 2022-11-04T20:52:08.052481
last-modified-purpose:
slug: /software-blog/product-of-array-except-self/
title: Blind 75 - Product of Array Except Self
---

[Link](https://leetcode.com/problems/product-of-array-except-self/)

## Learning From

[NeetCode](https://neetcode.io/practice)

## Asked at

19 times.

AmazonAppleAsanaBloombergMicrosoftAdobeAmerican ExpressLyftOracleFacebookUberWalmart Global TechYahooGoogleSalesforceDE ShawPaypalGoldman SachsGrouponQualtricsTikTokZillowIBM

[Source](https://seanprashad.com/leetcode-patterns/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

## All Approaches and Explanations in English

### O(n) time complexity. O(1) space complexity

loop twice. first right to left while multiplying. then second left to right while multiplying. this can be done in a single array and one extra product variable

### Code, if any

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] outputArray = new int[nums.length];
        int product=1;
        for(int i = 0; i< nums.length; i++){
            outputArray[i]=product;
            product = product * nums[i];
        }
        product=1;
        for(int i = nums.length-1; i>=0; i--){
            outputArray[i]*=product;
            product*=nums[i];
        }
        return outputArray;
    }
}
```