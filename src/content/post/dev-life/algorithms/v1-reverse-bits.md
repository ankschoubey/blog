---
comments: true
description: Get the last bit of value from the original. append to the reverse one. shift reverse one to the left. instead of adding, you can do `or` because after the shift last value will be 0. Imp - iterate 32 times only.
tags:
 - algorithm-problems
 - blind-75
 - bit-manipulation
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/reverse-bits
title: Blind 75 - Reverse Bits
---

[Video]

Reverse the binary int

Read this for java instruction: [Link](https://leetcode.com/problems/reverse-bits/)

## Approaches

### O(1) time; O(1) space; 7 lines

Get the last bit of value from the original. append to the reverse one. shift reverse one to the left. instead of adding, you can do `or` because after the shift last value will be 0. Imp - iterate 32 times only.

```java
    public int reverseBits(int n) {
        int rev = 0;
        for (int i = 0; i < 32; i++) {
            rev = (rev << 1) + (n&1);            
            n = n>>1;
        }
        return rev;
    }
```