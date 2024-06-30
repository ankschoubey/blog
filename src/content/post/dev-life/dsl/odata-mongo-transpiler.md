---
excerpt:  Implementing OData, Utilizing Specifications, and Enhancing API Flexibility.
title: How we implemented OData for MongoDB and use it in OpenAPI
comments: true
tags:
 - technical
 - clean-code
 - dsl
 - developer-diary
toc: false
use_math: true
publishDate: 2023-07-11T20:42:15.220865
slug: /odata-mongo-transpiler/
image: /images/odata-mongo-transpiler.png
---

<a target="_blank" href="https://bit.ly/mongo-aspnetcore-odata" class="mongo-ad block my-5 p-5 border bg-gray-100 text-center transition-shadow hover:shadow-lg dark:bg-gray-800 dark:border-gray-600 flex justify-center items-center gap-2 flex-col-reverse md:flex-row-reverse no-underline">
    <span class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-0">
<span class="text-blue-700 font-bold dark:text-blue-300">Looking for a .NET/C# Driver?</span><p></p>MongoDB's team developed an OData extension to simplify working with OData in ASP.NET Core for REST APIs.<p></p>Checkout <span class="text-blue-700 font-bold dark:text-blue-300">mongo-aspnetcore-odata</span> GitHub repo!

</span>
    </p>
    <picture class="md:max-w-50">
          <img src="/images/sponsor/mongodb/MongoDB Fores Green.svg" alt="MongoDB OData Extension" class="mx-auto dark:hidden max-w-1/2 w-full md:w-auto" style="box-shadow: none;">
      <img src="/images/sponsor/mongodb/MongoDB Spring Green.svg" alt="MongoDB OData Extension" class="mx-auto hidden dark:block max-w-1/2 w-full md:w-auto" style="box-shadow: none;">
    </picture>
</a>

Previously, I have written about how we created a MongoDB transpiler in the following article: [how we made our custom language that transpiles to MongoDB](/software-blog/creating-an-excel-like-language). This includes creating grammar and using Antlr to generate transpiler code. This article is a the specific OData changes we made.

OData is used a lot in PowerBI, Tableau, and other reporting applications. Microsoft's Graph API might be the biggest implementation of OData.

## Understanding OData?

For APIs, the most important thing is to be flexible enough to cater to clients' needs. If the APIs are flexible, you'll need less number of APIs in total. If APIs are not flexible, you need more numbers or APIs.

For example, suppose an API doesn't allow the ability to get only a certain item. In this case, you'll have to call the API and fetch 100s of items to just find one or two that you need. This increases the load on your API and also increases the load on the client.

But if we add the ability to filter in the same API, the client specifies what data it needs and will only receive that data. This would reduce the load on the client as well as the server.

To address this, we have REST expression languages. There are many expression languages. Microsoft made one called OData.

OData allows a client to filter, sort, compute fields, fetch linked resources, select specific fields, get the count of records, etc, all from one single URL.

For example, here is an OData URL:

`/theater.svc/Movies?$filter=Name eq 'Iron Man' and Year gt 2010 and IsBlockbuster&$compute=Revenue gt 1000000 as IsBlockbuster&$expand=Actors($filter=Gender eq 'Male')`

Translated to English, the URL means.

1. Get all Movies with the Name `Iron Man` and Year after `2010` that are Blockbusters.
2. Blockbusters are movies that have Revenue of more than `1000000`
3. Also, bring the related `Male` Actors

I'll explain this particular URL later.

OData has different system parameters. Here are a few you should know.

- `$filter`: filter data
- `$orderby`: sorting fields
- `$select`: select specific fields
- `$expand`: bring linked resources
- `$compute`: add new fields to the response
- `$count`: return just a count
- `$top`: return top n values only
- `$skip`: skip top n values return the rest
- More is mentioned in [OData specifications](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html "‌")

These allow the client to specify what kind of data it should return.

## Why did we choose to implement OData?

We had built our own custom expression language, and it worked perfectly. It had all the features we needed.

The problem was how do we encourage other developers to use it. We realized OData is something Microsoft folks would understand. And having a specification to point to would be easy for documentation.

## How implementing OData was different?

### OData is different from OpenAPI

Our previous language and grammar included only `filtering`.

For example, suppose you wanted to search a list of movies and get movies that have the name "Iron". You would write a filter like: `contains($name, 'Iron')`. The OpenAPI URL would be like this.

```
/movies?filter="contains($name, 'Iron')"
```

This could also include multiple and `&` and or `|` conditions.

We would extract out the `filter` query param manually and only pass the value to the grammar. So, in the above case, only `contains($name, 'Iron')` would be passed.

OData was different. OData has a different URL Entirely. Here's a sample OData URL from above.

`/theater.svc/Movies?$filter=Name eq 'Iron Man' and Year gt 2010 and IsBlockbuster&$compute=Revenue gt 1000000 as IsBlockbuster&$expand=Actors($filter=Gender eq 'Male')`

The technical description is as follows:
The above OData Url is for the resource `Movie`. It has 3 parameters: `$filter` and `$compute`.

- `$filter` is used to filter out data that match a specific condition.
- `$compute` is used to add an extra field, `IsBlockbuster`. The same field is also used in `$filter`.
- `$expand` is used to get foreign keyed data. In the above example, `Movies` resource includes a foreign key for `Actors`.

Along with `$expand,` you can also see `$filter` within it.

To handle these use cases of embedded params (one param within another). We had to build our grammar in such a way that it took the entire URL rather than just one `filter` query param.

Luckily, we were able to find OData grammar on GitHub. We were able to modify it to implement only the cases we wanted to implement.

[OData Grammar Github](https://github.com/luca-vercelli/odata-jpa-mini/blob/master/odata-jpa-mini/src/main/antlr4/odata/antlr/ODataLexer.g4 "‌")

### OData Specifications

In our previous expression language, the syntax was similar to Excel and Google Sheets, but we didn't have a specification. So, we almost built things on the fly.

With OData, we had a well-documented specification which we knew was perfected over time. We had to worry less about the design of the grammar.

[Link to OData Documentation](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html "‌")

## Not implementing the complete spec

OData is vast, and we decided not to implement the complete spec. A complete implementation would take 2+ years, given a team of 5 devs.

Here are some features we chose to ignore because **they didn't fit our usage patterns**:

- `$expand`
- `$format`
- Datatype checking. We have dynamic fields.
- parameters within parameters like `Movies/$expand=Actors($filter=Gender eq 'Male')`

## Implementing the same query params in OpenAPI

We started building the OData transpiler with the hopes of using it in OpenAPI, which is the majority of our use case. To implement this, we did the following cheat.

Our open API endpoints looked like this.

`/{resource}?filter={filter}`

We decided to add all OData params but without `$`

Here is the syntactic way of looking at the OpenAPI version: `/{resource}?filter={filter}&compute={}&top={}&orderby={}`

Our Grammar strictly worked with OData and `$`. We couldn't just put the OpenAPI query in, as it would break the grammar.

To solve this problem, we used a cheat.

We got out all the query parameters from OpenAPI and constructed a fake OData url to pass the grammar.

`/fakeResource?$filter={fitler}&$compute={}&$top={}&$orderby={}`

This way, we were able to use the same grammar and cater to OData and OpenAPI.

## Critiques of OData

While implementing OData, we came across a few critiques, and it's mainly from this article. [GraphQL is not OData](https://jeffhandley.com/2018-09-13/graphql-is-not-odata "‌")

- OData has too many things open by default.
- You need to restrict it. There are security problems, especially with OData being able to run functions. And operations like Sorting on a non-indexed field can bring down the whole system's DoS.
- OData makes many endpoints harder for Backwards compatibility. And Microsoft tried to pump OData into all its APIs.
- GraphQL is good for sitting between RestAPIs and UI. It complements REST and doesn’t remove the need for it. In GraphQL, when API changes, there are changes to GraphQL Resolvers but rarely to UI, which is calling the GraphQL.

## Resources

- [How we created a query and evaluation language similar to Google Sheets and Excel formulas](/software-blog/creating-an-excel-like-language/)
- [OData Specification](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html)
- [GraphQL is not OData](https://jeffhandley.com/2018-09-13/graphql-is-not-odata)
