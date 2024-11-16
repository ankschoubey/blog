---
comments: true
excerpt: Make a map of item and index. Check if target - currentItem exists.
tags:
 - technical
 - algorithm-problems
 - arrays
publishDate: 2022-10-29T20:52:08.052481
last-modified-purpose:
slug: /v1/two-sums
title: Blind 75 Two Sums
---

[Link](https://leetcode.com/problems/two-sum/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

Given an array, find two numbers that add up to a target.

Make sure not to use the same index twice.

## All Approaches and Explanations in English

### O(n^2) solution. O(1) space complexity

Have two loops. 
One at the first element. Others will check other elements to the right of the first index.

Repeat until the index is found.

### O(n) time complexity. O(n) space complexity

Create a map and store the elements in it along with an index.

While storing, check if the target-current number exists in the map.

If it exists, then you have found the element.

### Code, if any

```java
class Solution {
    
    public int[] bruteForceOn2(int[] nums, int target){ 
        // Time Complexity: O(n^2)
        // Space Complexity: O(1)
        /*
        Runtime: 89 ms, faster than 27.47% of Java online submissions for Two Sum.
        Memory Usage: 42.5 MB, less than 90.67% of Java online submissions for Two Sum.
        */
        for(int i = 0; i< nums.length; i++){
            for(int j = i+1; j< nums.length; j++){
                if(nums[i] + nums[j] == target){
                    return new int[]{i, j};
                }
            }
        }
        return null;
    }
    
    public int[] optimized(int[] nums, int target){
         // Time Complexity: O(n)
        // Space Complexity: O(n)
        /*
        Runtime: 4 ms, faster than 89.24% of Java online submissions for Two Sum.
        Memory Usage: 45.7 MB, less than 31.53% of Java online submissions for Two Sum
        */
        Map<Integer, Integer> indexes = new HashMap<>();
        
        for(int i = 0; i< nums.length; i++){
            int currentNumber = nums[i];
            int neededNumber = target - currentNumber;
            if(indexes.containsKey(neededNumber)){
                return new int[]{indexes.get(neededNumber), i};
            }
            indexes.put(currentNumber, i);
        }
        
        return null;
    }
    
    public int[] twoSum(int[] nums, int target) {
        //return bruteForceOn2(nums, target);
        return optimized(nums, target);
    }
}
```