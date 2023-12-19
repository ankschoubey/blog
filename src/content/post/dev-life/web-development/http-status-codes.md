---
comments: true
excerpt: Placeholder 
tags:
 - technical
 - web-development
 - notes
publishDate: 2022-10-15T20:52:08.052481
last-modified-purpose:
slug: /HTTP-status-codes/
title: Understanding & Using HTTP Status Codes
image: https://httpstatusdogs.com/img/100.jpg
---

![Http Status Dogs 200 OK](https://httpstatusdogs.com/img/100.jpg)

Image Source: [HTTP Status Dogs](https://httpstatusdogs.com/)

Browsers can perform different actions based on HTTP Status codes. For example:

If the browser receives a 302 temporary redirect, it'll redirect to the location specified by the server.

Not all status codes are directly browser compatible. You can find the [list of compatible ones here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#browser_compatibility).

HTTP Status Codes are also helpful when you are building a client yourself.

For example: For the retry mechanism, you might retry a few times if there is a 5xx  Server Error but might not retry if it's a 4xx client error

## Types

There are a total of 63 status codes that are grouped into 5 types:

- **1xx** → Info
- **2xx** → Successful
- **3xx** → Some redirect
- **4xx** → Client error: The sender has made some mistake and has to fix it.
- **5xx** → Server error: The server has made some mistake and has to fix it.

## Specific Codes

Now, when coding, you are likely to use these. But if you find another one, google it, and you'll find the reason behind it.

- **200** → OK
- **201** → The server CREATED the resource. The `location` header includes the location of the resource.
- **204** → NO CONTENT, but there is No Content

- **302** → REDIRECT to this URL

- **400** -> BAD REQUEST
- **401** → UNAUTHORIZED: The client isn't authorized and needs to send valid auth credentials.
- **404** → NOT FOUND: The resource isn't available

- **500** → INTERNAL SERVER ERROR
  - Restrict the response because it may reveal the inner workings of the server.

## Notes

People often don't rely on HTTP status codes but instead, use the body to convey information. This approach is especially true in the case of specialized responses since there are very few HTTP status codes.

## When to use 404 over 204?

- In groups, use 204.
- For accessing a single one, use 404.

For example:

- /users - 204
- /users/{id} - 404

## Resources

- [HTTP Status Codes: All 63 explained - including FAQ & Video](https://umbraco.com/knowledge-base/http-status-codes/)
- [HTTP Status Dogs](https://httpstatusdogs.com/)
