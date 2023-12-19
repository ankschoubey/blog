---
comments: true
excerpt: Data validation at various stages minimizes bugs and unnecessary overhead, ensuring consistent and accurate information flow.
tags:
 - technical
 - data
 - clean-code
publishDate: 2022-12-27T20:52:08.052481
last-modified-purpose: added "Validate on the database"
slug: /pre-save-data-validation/
title: Pre-save Data Validation
toc: false
---

It's imperative to have good data validations in place. Because often, data leads to more bugs even when logic works correctly.

Data errors can be:
1. null values in the database or from an external system
2. expecting values to be positive by getting negative ones.
3. expecting a field to have a specific format but getting something else

The only solution to a data error is running data migrations which is an unnecessary overhead.

Therefore, we should ensure that data is validated before it reaches DB.

# Only allows certain data

You minimize data problems by only allowing it for specific fields. 

On a UI, it could be dropdowns, date fields with range, and auto-completion options.

# Validate on frontend

Libraries like [formik](https://formik.org/) and [yup](https://github.com/jquense/yup) can help perform object and user input validation.

Typescript is only helpful in knowing the exact names of the variable, its type or keys within an object. Since it gets converted to javascript, typescript can't be used to validate data types.

# Validate on the backend

In Java specifically, you have JSR Validators.

Use in all POJOs, especially for incoming request objects and entity objects.

You can also [create custom validators](https://www.baeldung.com/spring-mvc-custom-validator).

Using enums is also an option.

# Validate on the database

This is as important as validating on backend.

SQL already provides a good schema structure that makes it easy for validation. Contraints can be provided in many NoSQLs too.

I faced an issue where mongodb's upsert operation inserted multiple records instead of updating one. This was a common mongodb issue.

To fix this I used, added `unique=true` for compound index I had made. 

For DB validation, make sure that you mark things as unique wherever they need to be unique. Similarly, other key related contraints should be used.
