---
toc: false
comments: true
excerpt: Placeholder 
tags:
 - deep-learning
title: Easy Jupyter Notebook Tips
publishDate: 2019-07-29T20:42:15.063562
slug: /jupyter_notebook/
image: /images/2019-07-29-easy-jupyter-notebook-tips/2.png
---

In case you are not familiar with Jupyter Notebook, I recommend watching the following videos:

> youtube: https://youtu.be/2eCHD6f_phE

## Use Wild Card Import

`import *`

> In Jupyter Notebook where **you want to be able to quickly interactively** **try stuff out,** you don’t want to constantly going back up to the top and importing more stuff. You want to be able to use lots of tab complete and be very experimental, so `import *` is great.

> When you are building stuff in production, you can do the normal PEP8 style proper software engineering practices.

> This is a different style of coding. It’s not that there are no rules in data science programming, the rules are different.

> ~ Jeremy Howard ([Source: FastAI v3 Lesson 1](https://github.com/hiromis/notes/blob/master/Lesson1.md))

## Types of Notebooks

It is best to consider 2 types of notebooks for your projects

1. Lab Notebooks

1. Delivery Notebooks

Lab Notebooks help in **trying stuff out** _without worrying_ **about making things every reproducible**. The goal is just to refer back to what was done in the past.

Delivery Notebooks are **‘production’ grade**, well **documented** and **reproducible** which can be shared with the entire team/client.

For Lab Notebook naming convention can be something like:

_date_initialsOfAuthor_actualName.ipynb_

Source: [IPython Notebook best practices for data science](https://www.youtube.com/watch?v=JI1HWUAyJHE) by Jonathan Whitmore ([Blog Post](http://jonathanwhitmore.com/2015/07/jupyter-notebook-best-practices-for-data-science))

## Split code into multiple cells to get better code-completion

This is a no-brainer but I struggled with this for a long time.

Weakly typed programming languages like Python do not work well with code completions provided by IDEs because the type of value return by a function is defined at run-time. IDEs have a hard time figuring out what the return type is.

![]({{ site.baseurl }}/images/2019-07-29-easy-jupyter-notebook-tips/1.png)

But when running Jupyter Notebook you can avoid this by splitting your code into multiple cells instead of one, running them one by one and then hitting `Tab`.

![]({{ site.baseurl }}/images/2019-07-29-easy-jupyter-notebook-tips/2.png)

## Use _%time_ for measuring the rough speed of cell’s execution

![]({{ site.baseurl }}/images/2019-07-29-easy-jupyter-notebook-tips/3.png)

---

This is an ‘always-updated’ blog post. You won’t find all Jupyter Notebooks tips. These are just the once I find the most helper. For a much more comprehensive list check out these links:

- [Python for Data Science — Getting More out of Jupyter (Video #4)](https://www.youtube.com/watch?v=N56I0TRnRX0)

- [28 Jupyter Notebook Tips, Tricks, and Shortcuts](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/)

If there are any other useful tips/link/suggestion you would like to share, please put in the comment section below. I respond to all my comments. Thank you for reading so far. Have a good day.

Edit: 01 August 2019: Video Version

> youtube: https://youtu.be/wnhHz3eFNMc