---
toc: false
comments: true
excerpt: You cannot compete with SQL
tags:
  - technical
  - clean-code
publishDate: 2019-12-22T20:42:15.091119
title: Make the database do the heavy lifting
slug: /sql_is_fast/
---

## Rule of thumb: Avoid filtering loops

SQL/Databases are good at 2 jobs: storing data. filtering data as fast as possible. **You're for loop cannot compete with SQL.**

The performance of your program will be much faster if you let SQL manage the filtering of data. Plus it will also result in a smaller line of code.

Try to filter with smaller queries with a smaller number of columns before fetching all the columns. Smaller the data, the faster will be the data transfer. You will find a better example of this in the section of Complex Queries bellow.

## **Use ORM**

For Spring (Java), ideally, use JPA method query things.**\*\*\***

![Source: JPA Repositories Spring.io](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/1.png)

\_Tips: Use tools to make Entities POJO

> youtube: https://www.youtube.com/watch?v=LrbaDRcu3Y0

For Python, SQLAlchemy is popular and preferred or Django ORM for Django. (I have less experience with this)

## Complex queries

Native queries are faster than usual ones but use the sparingly.

In the case of Java, you can also JPA specific things like Specifications or Criteria API.

Honestly, I haven’t tried them I know they exist. I have seen them and found that the code looked really ugly

I do find Django ORM to be easier than Spring JPA (you can pass arguments rather than always create a separate function).

### Break down big-bang (complex) queries into multiple simpler queries

> note: This might be very controversial and I have not seen this talked about anywhere or used in other people’s code. **You are not likely to use this unless you are like me (bad at ORMs)**.

Many times you have a complex feature like search and you want to filter by multiple parameters.

What usually ends up happening you end up with a custom query generator or Criteria API (Java) or a query which is too long. Especially if this query requires additional features like ordering and pagination.

I think a simpler solution is to break it into smaller queries. I give a simplified example below.

Note that this is a much simpler version of what you would encounter but I think it will make the point.

There are 3 tables:

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/2.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/3.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/4.png)

**_Suppose you want to find who are male grandparents of children whose name start with ‘A’_**

You can go for some complex query like

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/5.png)

![Output](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/6.png)

These 33 lines can quickly increase in size when you have too many tables. Multiple shorter queries are always much better than one **big bang query**.

I’ve seen queries which go beyond 100 lines 😖

**Making changes in such large 100+ line queries is a pain.**

(Even when writing the 33 line query above, I introduced bug by not writing join on lines 30 and 31. writing smaller queries helped me debug.)

You could break into something simpler queries like:

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/7.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/8.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/9.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/10.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/11.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/12.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/13.png)

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/14.png)

Then code the method yourself to call these in a certain sequence:

![](/images/2019-12-22-clean-code-4-make-the-database-do-the-heavy-lifting/15.png)

You will find that even though your line of code has increased, the modularity of code has also increased and these functions can be arranged in any way you like.

---

**Previous**: [Avoid creating god classes and long methods](/clean%20code/2019/12/25/clean-code-3-avoid-creating-god-classes-and-long-methods.html)

**Next**: [Remove unnecessary code](https://medium.com/p/c477707e5be1)

**Index**: [Tips on writing Clean Code](/software%20development/clean%20code/2019/12/19/series-tips-on-writing-clean-code.html)
