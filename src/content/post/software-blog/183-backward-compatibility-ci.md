---
comments: true
excerpt: Ensuring backward compatibility through structured deprecation processes and automated testing minimizes disruptions during system updates and migrations.
tags:
  - technical
  - api
  - backward-compatibility
  - ci
  - tdd
publishDate: 2024-07-28T20:52:08.052481
last-modified-purpose:
slug: /software-blog/backward-compatibility-ci
title: Automated Backward Compatibility Testing for APIs, Libraries and Databases
image: /images/software-blog/backward-compatibility-ci/oas-diff-header.png
---

Extensive testing is crucial when you have live users, especially during system migrations. Also, following a careful deprecation process is essential for rolling updates to avoid API disruptions.

This blog post shares my experience with backward compatibility issues and covers essential tools for managing API and database compatibility.

## Understanding Backward Compatibility

From a developer's perspective, backward compatibility means ensuring that new software versions can operate smoothly with older and existing versions without causing disruptions.

When you introduce a new mandatory parameter to an API, clients are unaware of this change. They'll face client errors when they send the request using the old format. Similarly, removing a field that clients use will result in errors. Here, the client is anyone who is using your API.

However, backward compatibility can also occur if you are interfacing with the old version of your code. For example, certain database changes can also cause issues.

Consider a rolling deployment with ten microservice pods, which means that when a new version of your software is deployed, the old version is removed. If you have ten instances, you may have some running with older versions and some with newer ones. Suppose you perform schema changes on your database, like renaming fields, removing columns, and changing data types. In that case, these can cause breaking changes because your old application version still uses the old format. This is one of the things that personally happened to me.

To avoid such scenarios, a deprecation/migration process is necessary. This involves deploying updates in multiple steps, ensuring smooth client and server transitions without downtime.

![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u7cjw8py4c629xmexxrt.jpg)

💡 Extra Info: For [breaking change in a library](https://www.linkedin.com/pulse/understanding-semantic-versioning-guide-developers-ajibola-oseni-/) typically requires incrementing the major version of the software.

Below are some of the deprecation steps for APIs and Software Libraries. The most important thing here is that each step is a different deployment/version of the API.

### Step-by-Step Deprecation/Migration of API and Software Libraries

#### For removing a field in an API

1.  Mark the field as deprecated.
2.  Let the clients know that the field is marked as deprecated and will be removed soon. Ideally, provide a date for it.
3.  If the client is internal in the company, ensure the field usage is removed. If the client is external and only a few, provide the same. If you have a lot of clients, keep reminding them and remove the deprecation date decided.

#### A similar process for adding a new mandatory field would be followed

1.  Add field as non-mandatory.
2.  Inform clients they need to provide the value and set date.
3.  Remind them regularly or ensure the field is added.
4.  Mark the field as mandatory.

#### For renaming of field

1.  Add the field without removing the old field. Mark the old field name as deprecated.
2.  Inform clients and ensure they have migrated to use the new field.
3.  Remove the old field when migration is complete.

### Step-by-Step Deprecation/Migration of Database

#### For removing a field

1.  Ensure all clients/server code doesn't use the field.
2.  Clients are often also BI tools that read the data from DB directly.
3.  Once ensured, remove the field.

#### For the addition of new fields or changing data

1.  Add a new field to ensure it's non-mandatory.
2.  Change the server code to write in a new field and read from the new and old fields.
3.  Move data from the old field to a new field.
4.  Change the server code only to use new fields and not old fields
5.  Once ensured, remove the old field.

## Automated Testing for Backward Compatibility

While knowing we are breaking backward compatibility is simple, i.e., be careful removing, renaming, and adding new fields, having a dedicated step in your CI pipeline can be helpful.

If backward compatibility fails, the team can be alerted, and an additional approval could be enforced. This could avoid downtime in production and ensure a smooth deprecation/migration process is followed.

### API Backward Compatibility

If you have OpenAPI docs generated, you could use

- [openapi-diff](https://github.com/OpenAPITools/openapi-diff)
- [oasdiff](https://github.com/Tufin/oasdiff) (my preference)

Both can be run standalone via docker or Maven.

To test `oasdiff`, run the following docker command to get a diff

```bash
docker run --rm -t tufin/oasdiff breaking https://raw.githubusercontent.com/Tufin/oasdiff/main/data/openapi-test1.yaml https://raw.githubusercontent.com/Tufin/oasdiff/main/data/openapi-test5.yaml
```

![](/images/software-blog/backward-compatibility-ci/oas-diff.png)

The above image shows three backward compatibility errors and a few warnings for potential mistakes.

oasdiff website also has a guide for [API change management maturity model](https://www.oasdiff.com/blog/maturity-model) that's worth a read.

💡 **Note**: You can use contract testing to help ensure backward compatibility. But the above method is much more hands-free. Contract testing, as I have experience, involves a lot of work to maintain.

### Database Backward Compatibility

While the example below is SQL, consider modifying your database.

There are paid tools out there to test for database backward compatibility. However, the simplest thing I could come up with was thinking of what queries can cause backward compatibility.

Here's the [brainstorm of all the breaking queries with ChatGPT](https://chatgpt.com/share/e0ee9e90-7849-4921-8eb3-52d6f3a105b1) in the form of a Python script. The keys on the left are all that can cause backward compatibility.

```python
patterns = {
    'DROP COLUMN': re.compile(r'ALTER\s+TABLE\s+\w+\s+DROP\s+COLUMN', re.IGNORECASE),
    'DROP TABLE': re.compile(r'DROP\s+TABLE', re.IGNORECASE),
    'RENAME COLUMN': re.compile(r'ALTER\s+TABLE\s+\w+\s+RENAME\s+COLUMN', re.IGNORECASE),
    'RENAME TABLE': re.compile(r'ALTER\s+TABLE\s+\w+\s+RENAME\s+TO', re.IGNORECASE),
    'MODIFY COLUMN': re.compile(r'ALTER\s+TABLE\s+\w+\s+MODIFY\s+COLUMN', re.IGNORECASE),
    'ALTER COLUMN': re.compile(r'ALTER\s+TABLE\s+\w+\s+ALTER\s+COLUMN', re.IGNORECASE),
    'ADD NOT NULL COLUMN': re.compile(r'ALTER\s+TABLE\s+\w+\s+ADD\s+COLUMN\s+\w+\s+\w+\s+NOT\s+NULL', re.IGNORECASE),
    'DROP CONSTRAINT': re.compile(r'ALTER\s+TABLE\s+\w+\s+DROP\s+CONSTRAINT', re.IGNORECASE),
    'ADD CONSTRAINT': re.compile(r'ALTER\s+TABLE\s+\w+\s+ADD\s+CONSTRAINT', re.IGNORECASE),
    'PRIMARY KEY': re.compile(r'ALTER\s+TABLE\s+\w+\s+ADD\s+PRIMARY\s+KEY', re.IGNORECASE),
    'UNIQUE': re.compile(r'ALTER\s+TABLE\s+\w+\s+ADD\s+UNIQUE', re.IGNORECASE),
    'FOREIGN KEY': re.compile(r'ALTER\s+TABLE\s+\w+\s+ADD\s+FOREIGN\s+KEY', re.IGNORECASE),
    'DROP INDEX': re.compile(r'DROP\s+INDEX', re.IGNORECASE),
    'CREATE INDEX': re.compile(r'CREATE\s+INDEX', re.IGNORECASE),
    'ALTER TYPE': re.compile(r'ALTER\s+TYPE', re.IGNORECASE),
}
```

You could get all SQL files between the current branch and main and run the Python re patterns above to see if they are backwards compatible.

```bash
git diff --name-status master...HEAD | grep '\.sql'
```

For example, if you upload a new SQL file, `deleteColumn.sql` with a script like the one below, the regex pattern can recognize this as a breaking change.

```SQL
ALTER TABLE DROP COLUMN name;
```

### Libraries Backward Compatibility

You'll find tools for testing backward Compatibility on Google. Here's an example of [Java API Compliance Checker](https://lvc.github.io/japi-compliance-checker/)

Run the following command and pass your jars:

```bash
japi-compliance-checker -lib NAME V1.jar V2.jar
```

And you'd get a report like [Guava Diff 18.0 vs 19.0](https://abi-laboratory.pro/?view=compat_report&lang=java&l=guava&v1=18.0&v2=19.0&obj=6b5ea&kind=bin) which could help you be alert of the breaking change.

![](/images/software-blog/backward-compatibility-ci/guava-diff.png)

## Ending Notes

Ensuring backward compatibility is crucial for maintaining a seamless user experience and avoiding disruptions during updates and migrations. Following a well-defined deprecation and migration process and incorporating automated backward compatibility testing into your CI pipeline can significantly reduce the risk of breaking changes. Tools like `oasdiff` for APIs and regex patterns for SQL scripts provide valuable support in identifying potential issues before they reach production. Remember, communication with clients and thorough testing are critical to a successful migration process.

## Resources

- OpenAPI Tools:
  - [openapi-diff](https://github.com/OpenAPITools/openapi-diff)
  - [oasdiff](https://github.com/Tufin/oasdiff)
  - [API Change Management Maturity Model](https://www.oasdiff.com/blog/maturity-model)
- Database compatibility:
  - [SQL Compatibility Patterns](https://chatgpt.com/share/e0ee9e90-7849-4921-8eb3-52d6f3a105b1)
- Java Libraries:
  - [Java API Compliance Checker](https://lvc.github.io/japi-compliance-checker/)
  - [Guava Compatibility Report](https://abi-laboratory.pro/?view=compat_report&lang=java&l=guava&v1=18.0&v2=19.0&obj=6b5ea&kind=bin)
- Articles and Blogs:
  - [Understanding Semantic Versioning](https://www.linkedin.com/pulse/understanding-semantic-versioning-guide-developers-ajibola-oseni-/)
  - [Backwards Compatibility Best Practices](https://example.com/backwards-compatibility-best-practices)
  - [Testing Backward Compatibility for Messages](https://dev.to/kirekov/unit-testing-backward-compatibility-of-message-format-27lj)

Implementing these strategies ensures a smoother transition during updates and maintains a robust, user-friendly system.

**If you are looking for more testing strategies, check out my [TDD and Beyond Series](/tdd), where I dive deep into how we can create bug-free software.**
