---
comments: true
excerpt: Check if the last bit is 1 by (n&1). Do the right unsigned shift (logical shift >>>). Loop.
tags:
  - technical
  - algorithm-problems
  - blind-75
  - bit-manipulation
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
slug: /v1/number-of-1-bits
title: Blind 75 - Number of 1 Bits
---

[Video]

[Problem explanation in English]

Return the number of binary ones. also known as hamming weight.

[Link](https://leetcode.com/problems/number-of-1-bits/)

## Approaches

### O(time) time; O(space) space; n lines

Check if the last bit is 1 by (n&1). Do the right unsigned shift (logical shift). Loop.

```java
    public int hammingWeight(int n) {
        int count = 0;

        while(n!=0){
            count+=(n&1);
            n=n>>>1;
        }

        return count;
    }
```
