---
toc: false
comments: true
excerpt: constructing the simplest possible code that would solve your problem resulting in an increase in productivity by producing higher quality in less time.
tags:
  - technical
  - clean-code
title: Clean Code
publishDate: 2019-12-19T20:42:15.086538
slug: /software-blog/clean_code/
image: /images/2019-12-19-series-tips-on-writing-clean-code/1.png
---

> I’m not a great programmer; I’m just a good programmer with great habits

~Kent Beck (Creator of Extreme Programming)

I started writing this as a single post but the number of paragraphs much so like any good programmer I decided to release in chunks.

These come from a series of notes I took since I was in college.

The attributions are lose. I did not think about writing a post while taking notes.

I will do by best to find the authors and link to their work when I find them any time in the future. Most of these came for searching for keywords like “clean code {language}”.

Some ideas I found while experimenting on my own.

---

# Usually building a software looks like this

You start small. But by the time you reach halfway, it becomes chaotic.

![https://bonkersworld.net/img/2011.11.15_building_software.png](/images/2019-12-19-series-tips-on-writing-clean-code/1.png)

# Reading vs Writing Code

While coding we spend more time reading the existing code than writing the code. We can estimate the ratio to be something like **10:1**.

Most of the time you are more likely to modify and improve your code than to produce a new functionality.

![https://sizovs.net/2019/05/29/quality-is-not-negotiable](/images/2019-12-19-series-tips-on-writing-clean-code/2.png)

For something we spend the most time on, it is very important that we make the process of reading and understanding our code easier for ourselves and other developers.

# Why do we write bad code?

1. Work needed to be done fast

1. Tired of project/work

1. Requirement changed

1. Managers

1. WE — Developers

## Work, for now, will clean up later

If we don’t follow good coding guidelines, we risk initial coding speed for long term code quality and productivity.

Usually, once you start on a path you are more likely to continue on the same path.

![Some YouTube attribution #FA. Also need to find a sharper image](/images/2019-12-19-series-tips-on-writing-clean-code/3.png)

# What is Clean code?

Constructing the simplest possible code that would solve your problem.

## Benefits

- Problems become easier to solve since code is modular.

- Less time is wasted on maintenance since lines of code are less.

- Ideas are more clearly communicated.

- Unit Test cases are much smaller and easier to write.

- Making changes is much faster.

- Pleasing to your eyes 👀.

## More posts in this series

{% for post in site.categories['clean-code'] %}
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

<article class="archive-item">
    <p class="post-meta post-meta-title"><a class="page-meta" href="{{ post.url }}">{{post.title}}</a>  • {{ post.date | date: date_format }}</p>
</article>
{% endfor %}
