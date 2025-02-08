---
comments: true
excerpt: 'The Naming convention is more important than any other part of clean code. Once you nail the name, everything else fits precisely!'
tags:
  - technical
  - clean-code
publishDate: 2024-02-10T20:52:08.052481
last-modified-purpose:
slug: /software-blog/benefits-of-good-naming/
title: 3 Important Benefits of Good Naming in Programming / Software
image: https://i.imgur.com/tMB2Nj4.png
---

Naming things is an art. It can help with easy identification and recall of things you want to do, and in a codebase where good naming conventions are followed, it helps to understand the code and find the code that you want to modify quickly. And especially within teams, these benefits come in handy to understand other people’s codebase.

The Naming convention is more important than any other part of clean code. **Once you nail the name, everything else fits precisely**!

[Personally: I have found good naming things in real life to make them easy to understand. It’s just good communication. Todo: add a link to labelling blog post here]

In this series of posts blog posts, I’ll explain the following:

- Some benefits of Good Naming Convention.
- [How to start creating good variable names.](/software-blog/good-variable-names)
- [How to create and enforce naming conventions in teams to reap maximum benefit.](/software-blog/naming-conventions-within-teams)

This post will cover the benefits of good naming conventions.

---

## 3 Benefits of good naming

### 3rd Benefit: Easily understanding the code does quickly

Descriptive naming helps us understand the code we want without getting into the details.

Instead of naming things like `list`, the name is `movies` or `moviesList`. This is especially important in dynamic programming languages like JavaScript and Python, as type information is missing.

But type information is not enough even in static languages like Java and C. Having the object's intent is also important. For example, suppose you have a code such as:

```java
Map<String, Movie> compile(Date date){
   List<Movie> list = repo.findAll();
   List<Movie> list1 = new ArrayList<>();
   List<Movie> list2 = new ArrayList<>();
   for(Movie m: list){
     if(m.getDate().getTime() > date.getTime()){
        list1.push(m);
     }else{
        list2.push(m);
     }
   }
   return Map.of(
    "list1": list1,
    "list2": list2,
   )
}
```

The above code is small, but one must read it to understand what it’s doing. Here are some changes we can make to improve

- Rename the method from `compile` to `segregatePastAndFutureMovies` (suggest an excellent variable name if you have one).
- Instead of returning a map, we could return a POJO: `PastAndFutureMovies`
- Instead of the `date` variable being passed as an argument, we can rename it as `selectedDate`.
- Instead of `list`, we can name it `allMovies`.
- Instead of using `getTime` to make comparisons, we could use the `after` or `before` method, which is `Date`, to make comparisons.

Here are all the changes

```java
PastAndFutureMovies segregatePastAndFutureMovies(Date selectedDate){
   List<Movie> allMovies = repo.findAll();
   PastAndFutureMovies pastAndFutureMovies = new PastAndFutureMovies();
   for(Movie movie: allMovies){
     if(selectedDate.after(movie.getDate())){
        pastAndFutureMovies.appendPastMovie(movie);
     }else{
        pastAndFutureMovies.appendFutureMovie(movie);
     }
   }
   return pastAndFutureMovies;
}
```

The above code is much more straightforward. To come to this point, we used the following concepts:

- naming things according to usage in the domain. This is a big part of domain-driven design.
- using helper methods provided library functions.
- creating #elegant objects and methods like the `PastAndFutureMovies` class and `appendPastMovie` method.

Without good variable names, we’d have to go through all the code to understand what it does. Or put debug points everywhere to see the variable data, which would consume a lot of time.

### Second Benefit: Easily finding the code we need

For example, I have a naming convention to always name Controllers/Handlers like this:

- `{HttpMethod}{UrlDescription}`

So, if I would name

- The POST `/movies` method would be named `PostMovies().`
- PUT `/movies/{movieId}` method would be named `PutMoviesByMovieId()`

When I am coding and I want to make modifications in REST APIs, I can quickly jump to particular controllers with a simple search. This reduces a lot of time and prevents me from reading.

Other developers in my team also follow the same naming convention, so if I want to find their code, I follow the same steps.

For example, while working on the UI, I found an error while saving the movie in the backend. I know the error would be in the `PostMovies` controller, and I can quickly jump to it.

### 3rd Benefit: It makes the code base beautiful, exciting and expressive

We developers spend more time reading code than writing new code. Reading code is like reading a book. If the book is exciting and expressive, we can read it much faster and feel satisfied. If the book isn’t dull or confusing or repeats the same things repeatedly, we get bored and might even keep the book in favour of another.

We developers can’t keep the code and pick something else to read. We are forced to read the code we wrote or someone else wrote. And the worst thing is when we open the code, and it’s awful.

- What the fuck is this variable?
- Why do you have two lists?
- Let me put a debug point and see.

All these would lead to an awful #DX: Developer Experience.

Naming things well is the first step to having an incredible developer experience and writing fantastic code to help us generate something creative and beautiful that we and others love to read.

![Meme From Silcon Valley where a programmer Gilfoyl calls another programmer Dinesh code gay](https://i.imgur.com/tMB2Nj4.png)

## Conclusion

There are several benefits to naming things correctly. They help us:

- Understand fast
- Find fast
- Lead to beautiful code that we or our teams would love to read through.

In the upcoming posts, I will explain how you can get to the point of having cleaner code. It would include examples and ways how to enforce naming conventions in teams.

**What are some other benefits of clean code you have observed?**
