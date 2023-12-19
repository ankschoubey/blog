---
comments: true
description: Similar to swapping two numbers. Start with prev as null and current and keep swapping next. Return prev because that's the last value.
categories: [algorithm-problems, arrays]
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/reverse-linked-list
title: Blind 75 - Reverse LinkedList
---

{% include youtube.html content="https://youtu.be/eXIUZmYluM0" %}

Given a LinkedList, reverse it in place.

[Link](https://leetcode.com/problems/reverse-linked-list/)

# Approaches

# O(n) time. O(1) space.

Similar to swapping two numbers. Start with prev as null and current and keep swapping next. Return prev because that's the last value.

[image]

```java
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while(current!=null){
            ListNode tempCurrent = current.next;
            
            current.next = prev;
            prev = current;
            
            current = tempCurrent;
        }
        return prev;        
    }
```