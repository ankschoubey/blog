---
comments: true
description: Iterate over both and store minimum one in current; Increment in the list from where minimum came. Once one of the lists is empty, empty the other one.
categories: [algorithm-problems, linked-list, easy]
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/merge-two-sorted-lists
title: Blind 75 - Merge Two-Sorted Lists
---

[Video]

Given two linked lists merge them into one sorted list.

[Link](https://leetcode.com/problems/merge-two-sorted-lists/)

## Approaches

### Unoptimized Solution: O(n) time complexity: Space: O(1)

Lines of code 38

Iterate over both and store minimum one in current; Increment in the list from where minimum came. Once one of the lists is empty, empty the other one.

This solution is highly unoptimized.

```java
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode head = null;
        ListNode current = null;
        
        while(list1!=null && list2!=null){
            ListNode minimum = null;
            
            if(list1.val < list2.val){
                minimum = list1;
                list1 = list1.next;
            } else{
                minimum = list2;
                list2 = list2.next;
            }
            
            if(head == null){
                head = minimum;
                current = minimum;
                continue;
            }
            current.next = minimum;
            current = current.next;
        }
        
        ListNode remaining = list1!=null? list1: list2; 
        while(remaining!=null){ // this iteration is unneccessary
            if(current == null){
                current = remaining;
                head = remaining;
            } else {
                current.next = remaining;
                current = current.next;
            }
            remaining = remaining.next;
        }
        
        return head;
    }
```

### Optimized solution

[Java - LeetCode Discuss](https://leetcode.com/problems/merge-two-sorted-lists/discuss/2809815/Java)

Lines of code: 16

```java
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode preHead = new ListNode(-1);
        ListNode current = preHead;
        while(list1!=null && list2!=null){            
            if(list1.val < list2.val){
                current.next = list1;
                list1 = list1.next;
            } else{
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        current.next = list1!=null? list1: list2;
        return preHead.next;
    }
```
