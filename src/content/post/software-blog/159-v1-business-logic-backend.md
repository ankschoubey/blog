---
comments: true
excerpt: Making your application secure, high performance and maintanable.
tags:
  - technical
  - web-development
  - software-architecture
publishDate: 2023-07-06T20:52:08.052481
last-modified-purpose:
slug: /software-blog/business-logic-backend/
title: Keep your business logic in the backend. Not frontend.
---

Your business logic should be at the backend, not the front end.

Here are some of the reasons why having business logic in the frontend is bad:

1. **Security**: It exposes your business logic. It is making your application vulnerable.
2. **Performance**: It makes the front end heavy. It is making your front end slower.
3. **Single Responsibility**: It’s a violation of the single responsibility principle. It is making your code unmaintainable.

## **Security**: It exposes your business logic. Making your application vulnerable

Having your business logic in the front end is bad for security since anyone can view javascript and change it.

Your backend is secure; no one can look into your backend (ideally).

This is especially important for applications exposed on the internet.

Your backend is more secure than your front end, and you don't want to expose your business logic to the front end. It should reside at the backend only.

### Example 1: Exposing a paid service

For example, you connect to a paid service to fetch images. Fetching each image costs you $ 0.001. You have decided to limit fetching them to 10 at a time. This would cost $ 0.01. This way, you keep the cost low.

The developer who coded the feature decided that maybe I should add a parameter in the front end. If I want to fetch more images, I’ll just modify the front end and be able to fetch more. He/She adds the code in the frontend that specifies the number of images to be fetched.

Since the code was in javascript, any hacker could easily change the value of the parameter and fetch more images. Suppose a hacker opened the javascript and changed the value from 10 to 100,000. The cost changes from $0.001 to $100.

The solution would be for the developer to keep the code in the backend so that no one can change it.

### Example 2: Exposing user details

Suppose you need data for the logged-in user instead of creating an API that just gets data of the logged-in user from the backend. Your backend API exposes a query param allowing the frontend to pass any userId.

For example,

```
/users?userId=123
```

This makes your application very vulnerable. First of all, you shouldn’t have exposed `/users` endpoint because this is highly sensitive data.

Second of all, being able to change the query param `userId` of a non-logged-in user would return the data of a non-logged-in user.

Again, the solution is to keep the logic in your backend. Check which user is logged in and return only its data.

## **Performance**: It makes the frontend heavy. Making your frontend slower

People leave a website if it doesn’t provide a response time of about 200ms. This is why your frontend should be as small as possible so that it loads faster and is extremely interactive. Therefore, your frontend should be as dumb as possible.

The more code your write to your frontend, the slower your frontend becomes.

The frontend should just get data from the backend and display it. Get inputs from the user and set it to the backend.

No fancy algorithms should be required at the frontend. Apart from input validation and a bit of list sorting, unless you are building a pure frontend application that doesn’t have a backend, you don’t need any fancy algorithm.

## **Single Responsibility**: It’s a violation of the single responsibility principle. Making your code unmaintainable

Having your business logic distributed half at frontend and half at the backend means that you don't have a single place to manage your business logic. You can't independently think about frontend and backend without thinking of others.

As discussed in the previous point on performance, for better use of interaction and UX, validations on frontend should be introduced. But they should replicate validations on the backend exactly.

## Conclusion

By having your business logic in your backend, you ensure your application is secure, that your frontend is faster, and that backend is the only place where you have the business logic, making it more maintainable.

Make your frontend as dumb as possible, and keep all your business logic in the backend.
