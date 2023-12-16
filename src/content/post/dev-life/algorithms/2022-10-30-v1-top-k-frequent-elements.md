---
comments: true
description: count all numbers. sort. and return top k. Use streams to make it cleaner. or use bucket sort.
categories: [algorithm-problems, arrays, medium, heap, bucket-sort]
publishDate: 2022-10-30T20:52:08.052481
last-modified-purpose:
permalink: /v1/top-k-frequent-elements
title: Blind 75 - Top K Frequent Elements - IMP
---

[Link](https://leetcode.com/problems/top-k-frequent-elements/)

## Learning From

[NeetCode](https://neetcode.io/practice)

## Asked at

Amazon Facebook Oracle Apple Microsoft Google Uber Adobe Snapchat Cisco Shopee Bloomberg Indeed ByteDance Tesla Arcesium Twitter Dropbox eBay VMware Netflix tiktok Deloitte

[Source](https://seanprashad.com/leetcode-patterns/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

Get k numbers repeated most often.

## All Approaches and Explanations in English

### O(n*log n)

count all numbers. sort. and return top k. Use streams to make it cleaner.

### Code, if any

## Normal Solution

```java
class Solution {
    private int[] bruteforce(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for(int num: nums){ // O(n)
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }
        return counts.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue()) // // O(n * log(n))
                .skip(counts.size() - k)
                .map(Map.Entry::getKey)
                .mapToInt(Integer::intValue)
                .toArray();
    }
    public int[] topKFrequent(int[] nums, int k) {
        return bruteforce(nums, k);
    }
}
```
## Heap Solution O(k*log(n)

## Bucket Sort