---
comments: true
description: compare the count of letters in each word and put group them in a map
categories: [algorithm-problems, arrays, medium]
publishDate: 2022-10-30T20:52:08.052481
last-modified-purpose:
permalink: /v1/group-anagrams
title: Blind 75 - Group Anagram
---

[Link](https://leetcode.com/problems/group-anagrams/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

Given a set of strings. Return anagrams in group.

## All Approaches and Explanations in English

### O(n) time complexity. O(n) space complexity

O(N*26) time complexity.

compare the count of letters in each word and put group them in a map

### Code, if any

## Works but okay, okay
```java
class Solution {
    
    private String getLetterCount(String str){
        int[] count = new int[26];
        
        for(char c: str.toCharArray()){
            count[c-'a']++;
        }
        return Arrays.toString(count);
    }
    
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        for(String str: strs){
            String letterCount = getLetterCount(str);
            List<String> list = groups.getOrDefault(letterCount, new ArrayList<>());
            list.add(str);
            groups.put(letterCount, list);
        }
        
        return new ArrayList<>(groups.values());   
    }
}
```

Optimizations:
rather than: Arrays.toString(count); 
could have been: new String(count)

rather than:
```java
            List<String> list = groups.getOrDefault(letterCount, new ArrayList<>());
            list.add(str);
            groups.put(letterCount, list);
```
could have been:

```
letterCount could be renamed as hash. #DDD
```

```java
groups.computeIfAbsent(letterCount, k-> new ArrayList<>())
groups.get(letterCount).add(str);
```