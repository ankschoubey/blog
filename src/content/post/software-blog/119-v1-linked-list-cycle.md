---
comments: true
excerpt: Have a fast pointer and a slow pointer. fast increases by 2. slow increases by 1. if both become the same then the cycle exists. if fast one reaches end then no cycle exists.
tags:
  - technical
  - algorithm-problems
  - linked-list
publishDate: 2022-11-16T20:52:08.052481
last-modified-purpose:
slug: /v1/linked-list-cycle
title: Blind 75 - Linked List Cycle
---

[Video]

Check if the given LinkedList is cyclic.

[Link](https://leetcode.com/problems/linked-list-cycle/)

# Approaches

## O(n) time complexity; O(1) space complexity

Have a fast pointer and a slow pointer. fast increases by 2. slow increases by 1. if both become the same, then the cycle exists. if fast one reaches the end then no cycle exists.

Lines of code: 16

```java
    public boolean hasCycle(ListNode head) {
        if(head == null) { return false;}
        ListNode slow = head;
        ListNode fast = head;
        while(fast !=null){
            slow = slow.next;
            fast = fast.next;
            if(fast==null){ break;}
            else {fast=fast.next;}
            if(slow == fast){ return true; }
        }
        return false;
    }
```

Line 1: head null check is unnecessary;
Line 18: can be removed by adding the fast.next, check in while loop itself.

Optimized solution below

## Optimized solution

Source: [Java: Fast-Slow Pointer Method - LeetCode Discuss](https://leetcode.com/problems/linked-list-cycle/discuss/2791622/Java%3A-Fast-Slow-Pointer-Method)

Lines of code 8:

```java
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while(fast !=null && fast.next !=null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast){ return true; }
        }
        return false;
    }
```

## Without 2 pointers solution

Source: [Java O(1) Memory solution - LeetCode Discuss](<https://leetcode.com/problems/linked-list-cycle/discuss/2810093/Java-O(1)-Memory-solution>)

Modify the value in the list to something that can't occur. Check if the current value is that value.

```java
    public boolean hasCycle(ListNode head) {
        while (head != null) {
            if (head.val == 1_000_000) return true;
            head.val = 1_000_000;
            head = head.next;
        }
        return false;
    }
```
