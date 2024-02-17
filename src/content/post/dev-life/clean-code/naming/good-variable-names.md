---
comments: true
excerpt: 'Easy approaches to help you come up with descriptive clean names' 
tags:
 - technical
 - clean-code
publishDate: 2024-02-17T20:52:08.052481
last-modified-purpose:
slug: /software-blog/good-variable-names/
title: 6 Approaches to come up with good variables, methods, and class names to create a fluent codebase
image: https://i.redd.it/78grcr5vf8h11.jpg
---

Initially, it can take a lot of work to come up with good names for your variables, methods, classes and components. But with some pointers and a little bit of practice, observation and listening, you can come up with straightforward, easy-to-understand names. And that would improve overall productivity for you and your team.

As I discussed in my previous post, you would [experience the three benefits of naming things](/software-blog/benefits-of-good-naming) well:

1. Making it easy and fast to understand code written by yourself and others
2. Finding the code you are looking for faster.
3. Reading an elegant and beautiful-looking code.

Take each of these and think them through carefully in your code.

![](https://i.redd.it/78grcr5vf8h11.jpg)

## How to name better?

### 1 - Look for non-descriptive names

Bad names don’t help you understand what a piece of code does by just looking at it without seeing its types. **We want to find all such names to give them better names**.

When writing and reading **our code, we want it to be as English-like as possible**. A fluent codebase.

For example,

- simple letter words: `d` instead of `date` or, even better, a descriptive `currentDate`
- methods such as: `process` instead of something more descriptive as `sendEmail`.

The first thing I do when I understand a piece of code is start renaming things to what’s appropriate. I begin with variable names.

Usually, naming variables with the same name as the class is helpful.

E.g., I would rename

```java
List<Movie> m = repo.findAll();
```

to

```java
List<Movie> movieList = repo.findAll();
```

or

```java
List<Movie> movies = repo.findAll();
```

Look for any variable that’s not a suitable abbreviation, and at a minimum, try to name them according to their type.

Usually, for me, `movies` is not descriptive enough. I would usually name it as

```java
List<Movie> allMovies = repo.findAll();
```

This is descriptive enough to me.

As time passes, more code will be added around this one. And knowing exactly what data is contained in this variable can help.

I would follow a similar system for naming methods.

For example, consider this method `process`. I have set good variable names on purpose.

```java
void process(Movie choosenMovie, Date selectedDate, User user){
  Booking booking = new Booking(choosenMovie.movieId(), selectedDate, user.userId());
  bookingRepo.save(booking);
}
```

If you have a code where you see the method `process`, it is hard to understand what the method does until you get into the code.

Here, the code seems to book a movie.

A better name for the variable would be `bookMovie`or `bookAMovieTicket`

```java
void bookMovie(Movie choosenMovie, Date selectedDate, User user){
  Booking booking = new Booking(choosenMovie.movieId(), selectedDate, user.userId());
  bookingRepo.save(booking);
}
```

### 2 - See how you are thinking

To implement the last point, I described two scenarios. Naming of the variable `allMovies` and `bookMovie` method. We found an appropriate name for both by seeing how we were thinking about the code.

We can use the same approach in other places.

For example, algorithmic codes are often more complicated to understand. Given that academia mostly prefers non-descriptive variables such as `v` or `x`.

Suppose you have a graph and are doing a depth-first search (DFS) on it; how would you name such a method? Instead of a method such as

```java
‌User findUser(String userId)
```

It can be better to name the method as

```java
User findUserUsingDFS(String userId)
```

I find naming the method better than adding a comment because method names can be read from anywhere in the codebase, even when we are not in the same file.

It’s hard to come up with bad examples. So here’s my attempt at a bad one.

Suppose you have a social media application and have the following method.

```java
List<String> getRelatedUsers(String userId1, String userId2){
  List<String> users1 = userRepo.findOne(userId1).getConnections();
  List<String> users2 = userRepo.findOne(userId2).getConnections();
  return Arrays.stream(users1)
                   .filter(new HashSet<>(Arrays.asList(users2))::contains)
                   .toList();
}
```

The method seems to bring commoniss between users. For example, if user1 has a connection to “user3” and user2 also has a connection to “user3”, then user3 will be returned.

Here’s what we can do to make this more readable.

- From using social media all day, we know related users have a better term, mutual connections.
- Also, we noticed that argument names could be better.

Here is how we can modify the method and all names within it.

```java
List<String> getMutualConnections(String firstUser, String secondUser){
  List<String> connectionsOfFirstUser = userRepo.findOne(firstUser).getConnections();
  List<String> connectionsOfSecondUser = userRepo.findOne(secondUser).getConnections();
  return Arrays.stream(connectionsOfFirstUser)
                   .filter(new HashSet<>(Arrays.asList(connectionsOfSecondUser))::contains)
                   .toList();
}
```

### 3 - Observe and listen to people for #ubiquotous language

Subject Matter Expert / Business People have a specific way of describing problems. These can be easily modelled into our names.

This is called ubiquitous language in domain-driven design.

Our code should reflect the domain to have easy conversations with our stakeholders.

- Suppose you are in a movie domain; you could use the same terms as in the domain, such as:
  - Movie
  - Actor
  - Booking
  - Theatre
  - Release
- If you are in ECommerce Domain, you could use the same terms as the domain, such as:
  - Shipping
  - Purchase Order
  - SKU (stock-keeping unit)
  - Cart

For this, start by observing your business domain and come up with the same names as those domains. What words do stakeholders use?

You could also study the domain at a high level to understand what names to use.

DDD suggests we unify all names within the code to communicate with the developer easily.

As a practitioner of ubiquitous language, it eases communication between developers and businesses. I no longer have to translate a technical name to a business term because all my code reflects business terms.

### 4 - Look at the names that other frameworks and libraries use

Sometimes, you may not know what names to use for highly technical code. In such cases, you may search for a framework or library and set the same name.

Here are some places I have bad variable names, which I later changed to really good ones.

When implementing CRUD on a NodeJs application, I had difficulty naming the repository later. Instead of having a repository separately, my code base had `Model`, for example `, UserModel`. And it included almost every code from DB calls to HTTP request-response handling. A #serious violation of the single responsibility principle.

I had created a separate file for the repository. Still, as my methods grew, it took a lot of workunderstand what each method was doing without looking at the repository file.

I had method names such as `getUser`. Now, getting a user can be done by `userId`, and it can be done by email. So I had `getUserWithEmail`. As more code was added, it was getting tough. (I know I cannot develop a good example. But you probably get the point). I slowly had many methods that looked similar but did very different things.

It had started to annoy me. A few days later, it clicked. I could use the same method names I am familiar with in Spring Boot. [https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html "smartCard-inline")   . It included a very standard naming convention for creating a method. I went and renamed all my methods to the JPA convention.

- `getUser` to `findOneByUserId`.
- `getUserWithEmail` to `findOneByEmail`
- `getUsers(country, state, ageMax)` to `findAllByCountryAndStateAndAgeGte`

I now had distinct and descriptive variable names that I instantly loved and enjoyed.

I have used a similar approach in other parts:

- I took naming tip libraries such as DevExpress Js while creating custom UI components.
- Taking tips from Axon Framework for Event Sourcing while implementing my event sourcing framework (todo link here).

### 5 - Follow an existing naming convention

In the previous tip, I gave an example of the JPA query naming convention and how I used it in my code.

There are also other naming conventions, such as BEM for CSS. That one can be used. I’d be dedicated to a whole separate blog post on naming conventions and enforcing them within a team. So, I won’t describe much of it here. (todo: link to post).

### 6 - Update and iterate over time

Programming is often considered a lonely #sport. It need not be. When connecting with colleagues or doing code reviews, express that you don’t like this variable and have been thinking of a better name.

If they have one, they’ll suggest it.

I usually iterate over my method, variable and class names multiple times over days and weeks. Once I have a good name in place, everything else in my mental model fits easily, and the team's mental model fits easily, too.

There have been a lot of places where I needed to seek help from my colleagues.

For instance, when coding up event sourcing, I had method names like

```java
Boolean isValid(Command command);
Boolean genenerate(Entity entity, Command command)
```

`isValid` would check if the command is allowed. And `generate` would modify the entity. The problem here was I wanted people to understand precisely what the code was doing. And these variable names didn’t seem to convey it. Over multiple iterations of my own and while discussing with colleagues, we ended up with this.

```java
Boolean validateCommand(Command command);
Boolean applyCommand(Entity entity, Command command)
```

These were much cleaner names:

- `validateCommand`: validated a command
- `applyCommand`: applies a common over an entity.

Connect with colleagues. And if you are shy, connect with them during core reviews and handovers and seek #names. You’d come up with a name that you and the other person understand.

## Conclusion

Naming things can be challenging at first. But it’s important with a bit of observation and constant tweaking. One can easily find or create good names for their methods, variables, classes, CSS classes, etc.

By:

- Renaming non-descriptive names to descriptive ones
- Naming things as you talk about them
- Observing what name stakeholders use.
- Looking at names in other languages or frameworks.
- Finding a naming convention.
- Talking to fellow developers.

All these would lead to a much better, readable and enjoyable coding experience.

**What other naming strategies have you found useful?**
