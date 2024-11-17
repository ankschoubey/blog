---
comments: true
excerpt: 'Guidelines for generating clean, unique ID fields from composite attributes to enhance application maintainability and scalability, using encapsulated functions and semantically meaningful IDs.' 
tags:
 - technical
 - clean-code
 - indexes
publishDate: 2024-03-28T20:52:08.052481
last-modified-purpose:
slug: /software-blog/map-index-guideline/
title: Crafting Unique ID from Composite Attributes for Key-Value Pairs (Redis, Map, and even Droppable-Id in React Beautiful DnD)
image: /images/software-blog/data/indexes/map-index-guideline-droppable-id-example.png
---

In a previous post, I talked about [what the name of the ID field should be](/software-blog/naming-contention-database-redux-indexes/). This post talks about generating unique values for the ID field, where you have to represent multiple attributes as a single string.

When generating such unique index values, developers often hard-code values and/or fill ID fields within random numbers or dates. This makes them hard to understand and hard to scale. Not to mention, each ID field is not uniform.

This post will guide you on generating and maintaining clean, unique ID fields from Composite Attributes.

_Disclaimer: This blog post focuses on generating composite ID fields from multiple other fields within an application's context. This discussion does not delve into primary key generation strategies, such as UUIDs, running numbers, or other globally unique identifiers. In case you are looking for that, refer:_ [How to Generate Unique IDs in Distributed Systems: 6 Key Strategies](https://blog.devtrovert.com/p/how-to-generate-unique-ids-in-distributed)

## The Necessity of Unique Values ID values

I have encountered various times where I had to generate a unique key to identify similar-looking objects. For example,

- **Correlation and Tracking**: When [performing sequential activity on Kafka, I had to create a unique key in Redis correlationing request and response](/v1/kafka-request-response-redis/).
- **UI Element Identification**: in a complex React application, I had to set a `droppableId` unique enough to identify many elements in the React structure and allow for easy identification of what is dragged along with source and destination.
- **Data Structure Efficiency**: Sometimes, creating a unique key can help with a simple search. For example, suppose you have a list and want to filter it and set values to a POJO. You may convert the list to a map and easily filter it.

For all these cases, creating a unique ID is important.

### Here are our constraints

1. You have to create a single key to identify uniquely.
2. This key has to be a String.
3. The string cannot be arbitrary. You want to get information from the string.

**Note**: Keys in maps cannot be objects as objects can't be used for lookup. In many programming languages, like JavaScript, we can't set the key to an object because the shallow comparison between two similar objects returns false.

## Guidelines

### Create a separate function for creating the key

You'll have two places where you'd have to generate the key.

- Before saving data to the Key-Value Map
- Before fetching data from the Key-Value Map.

While working, you'd often have to extend this key value map and add more fields rather than manually generating the key in multiple places. Create a simple function that returns the generated key and uses it everywhere.

**Bad**

```typescript
const movies = {}
const saveMovie = (movie: Movie)=>{
 const key = movie.year + ":" + movie.name;
 movies[key] = movie;
 return movie;
}
const findMovieByYearAndName = (year: string, name: string) => {
 const key = year + ":" + name;
 return movie[key]
}
```

In the above code, if the key generation is changed, we'd have to change it everywhere manually.

**Good**

```typescript
const movies = {}
const movieKeyGen = (year: string, name: string) =>{
 return year + ":" + name;
}
const saveMovie = (movie: Movie)=>{
 movies[movieKeyGen(movie.year, movie.name)] = movie;
 return movie;
}
const findMovieByYearAndName = (year: string, name: string) => {
 return movies[movieKeyGen(year, name)]
}
```

In the above code, we'll get an instant compile time error when new arguments are added to `movieKeyGen`.

### Add all meta-data information in an ordered fashion

You should add all the meta-data that you may need. This metadata can be used to identify and get data from the map quickly.

For React Beautiful DnD, I had to add a lot of essential attributes to the `droppableId`.

Here's an example illustrating what has been built.

![Droppable Id Movie Example](/images/software-blog/data/indexes/map-index-guideline-droppable-id-example.png)

Assume you have a movie planning application where a list of `Movie` entities is shown on the UI. In the planning application, you can drag a `Movie` to watch from one month to another, or you can arrange

I ended up adding the following.

`{typeOfComponent}:{locationWithinTheComponent}:{idToUniquelyIdentifyAnEntity}`

Using the above DOM, I can come up with the following `droppableIds.`

- UnplannedMovies component
  - `unplanned:movie-1`
  - `unplanned:movie-2`
  - `unplanned:movie-3`
- MoviesPlannedComponent
  - MonthComponent
    - `MoviesPlanned:Month:January-2023`
    - `MoviesPlanned:Month:Feb-2023`
    - `MoviesPlanned:Month:March-2023`

The `droppableId` field for ReactBeautifulDnD would be `table:footer:name`.

## Ending

By following the above guidelines, such as encapsulating ID generation logic within dedicated functions and incorporating semantic meaning into the IDs, developers can significantly improve the maintainability and scalability of their applications.

Also, read [Naming Convention for Indexes](/software-blog/naming-contention-database-redux-indexes/).

**What strategy for UniqueId field generation do you use?**
