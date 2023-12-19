---
comments: true
excerpt: God-level solution - iterate.<br>If an opening bracket is found, put the closing bracket in a stack.<br>If the closing bracket is found, pop and check for equality.
tags:
 - algorithm-problems
 - stack
publishDate: 2022-11-06T20:52:08.052481
last-modified-purpose:
slug: /v1/valid-parentheses
title: Blind 75 - Valid Parentheses
---

[Link](https://leetcode.com/problems/valid-parentheses/)

## Learning From

[NeetCode](https://neetcode.io/practice)

## Asked at

[Source](https://seanprashad.com/leetcode-patterns/)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KHKFqLPMbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>https://youtu.be/7KHKFqLPMbs

## Problem and Constraints

## All Approaches and Explanations in English

### My solution

put if opening bracket put into the stack. If it is the closing bracket pop, check if the bracket on top is the closing bracket of the current. In the end, check if the stack is empty.

### Code, if any

```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for(Character c: s.toCharArray()){
            if(c == '(' || c == '{' || c == '['){
                stack.addLast(c);
                continue;
            }
                        
            if(stack.size()==0){
                return false;
            }
            
            Character top = stack.removeLast();
            if(c == ']' && top!='['){
                return false;
            }
            if(c == ')' && top!='('){
                return false;
            }
            if(c == '}' && top!='{'){
                return false;
            }
        }
            System.out.println(stack);
        return stack.size() == 0;
    }
}
```

## God-Level Solution

iterate. if an opening bracket is found, put the closing bracket in a stack. if the closing bracket is found, pop and check for equality.

[Source](https://leetcode.com/problems/valid-parentheses/discuss/9178/Short-java-solution)

> maybe i am a idiot,i should give up cs

> same 9 years education, why are u outstanding ?

> 
```java
boolean isValid(String s) {
  if ((s.length() & 1) == 1) return false;
  else {
    Deque<Character> p = new ArrayDeque<>(s.length());
    for (int i = 0; i < s.length(); i++)
      switch (s.charAt(i)) {
        case '(': p.push(')'); break;
        case '{': p.push('}'); break;
        case '[': p.push(']'); break;
        case ')': case '}': case ']': if (p.isEmpty() || p.pop() != s.charAt(i)) return false;
      }
    return p.isEmpty();
  }
}
```