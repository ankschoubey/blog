---
comments: true
excerpt: "check if the length is the same.<br>
find the difference in the count of letters in both numbers.<br>
since there are only 26 letters, you can count in a single int array of 26. <br>index = char - 'a'"
tags:
 - technical
 - algorithm-problems
 - arrays
publishDate: 2022-10-30T20:52:08.052481
last-modified-purpose:
slug: /v1/valid-anagrams
title: Blind 75 - Valid Anagrams
---

[Link](https://leetcode.com/problems/valid-anagrams/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

Check if two numbers are anagrams or not.

Anagram means one word can be made by re-arranging another word.

## All Approaches and Explanations in English

### O(n) time complexity. O(1) space complexity

check if the length is the same.
find the difference in the count of letters in both numbers.
since there are only 26 letters, you can count in a single int array of 26. index = char - 'a'
### Code, if any

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()){
            return false;
        }
        
        int[] counts = new int[26];
        
        for(int i = 0; i<s.length(); i++){
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for(int i = 0; i<counts.length; i++){
            if(counts[i]!=0){
                return false;
            };
        }
        return true;
    }
}
```