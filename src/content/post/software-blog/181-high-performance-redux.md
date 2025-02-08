---
comments: true
excerpt: 'Learn how to optimize your Redux store for peak performance with clear steps and practical tips.'
tags:
  - technical
  - web-development
publishDate: 2024-04-21T20:52:08.052481
slug: /software-blog/high-performance-redux
title: Blueprint for a High-Performance Redux Store
image: https://chriscourses.com/blog/redux.jpg
---

In the previous blog post, we saw two ways to [handle the global state in a UI application: singleton and Redux](/software-blog/navigating-global-state-management/).

## Why Optimizing Your Redux Store Schema is Crucial?

Since our UI application will depend on the Redux store, making it as high-performance and maintainable as possible makes sense.

We should architect Redux with the same effort as we do for our backend databases.

Luckily, the things you'd do on the backend to make your database fast are the same things you'd do for your frontend redux store to make it fast.

## How to Create a High-Performance Redux Store

Here are the five steps to create a High-Performance Redux Store Schema

- Step 1: Distinguish carefully what you want to put into Redux and what should be local state.

- Step 2: Normalize data within Redux. Access Data in O(1) time.

- Step 3: Create custom Indexes in your Redux Store.

- Step 4: Use createSelector to cache value but sparingly.

- Step 5: Connect Tip: connect as many components to Redux directly as possible.

### Step 1: Distinguish carefully what you want to put into Redux and what the local state should be

Don't put unnecessary data in Redux. The component should manage the local state.

Note that changes to the global redux store trigger rerendering in all the components; therefore, we should be careful about what data to put.

The right kind of candidate for data is entities and certain shared UI states. I'll discuss it more in my next blog post on Maintainable Redux. TODO.

Here are a few examples of data that should be saved in the local state:

#### Example 1: A simple popover element

If you have a popover element that shows simple info on hover, the fact that the popover should be shown may not be useful to other Components. Therefore, it should be kept in the component's local state and not in the global store.

#### Example 2: Editing a complex UI Table

This is from real experience. Suppose you have a complex table application; the table data is kept inside the global redux state. A table cell can be edited.

If we update the redux store after each cell is edited, it'll trigger rerender. So after each key press, the components rerender.

Tables are costly to rerender, especially if sorting, filtering and other features are enabled.

Therefore, while the user is editing the data, it's best to keep data in a local state useState and then dispatch the update once the user moves away from the input box (blur)

#### Concluding Step 1: #DoNotPutUnnecessaryDataInYourStore

Look at your Redux store and move any data that should be local into the local state.

Only put data within redux that are needed by multiple components not within one another.

### Step 2: Normalize data within Redux to access them in O(1) time

Normalization is the process of removing replication with data (via nesting) and instead adding references to the repeated data.

Consider this data,

```typescript
{
  movies: [
    {
      movieId: 1
      authors: [
        {authorId: 1, name: 'JK Rolling'}
      ]
    },
    {
      movieId: 2
      authors: [
        {authorId: 1, name: 'JK Rolling'}
      ]
    },
  ]
}
```

Here we have two movies, both written by authorId: 1. Suppose you want to update the name of the author; you'd have to iterate through the movies and integrate through the authors within them, find authorId: 1 and then update; this is costly.

However, consider this normalized form where entities (items with ID) are moved to the root and references are added.

```typescript
{
  movies: {
    byId: {
      1: {
        authors: ['author-1']
      },
      2: {
        authors: ['author-1']
      }
    },
    allMovies: [1, 2]
  },
  authors: {
    byId: {
      'author-1': {
        name: 'JK Rowling',
        movieIds: [1,2] // this is optional and depends on your access pattern. Added to show reverse reference is possible.
      }
    }
  }
}
```

Updating the above would be really easy, as we only need to update in one place.

Here's a concrete example of a pattern I have regularly seen and a better form.

#### Example 3: Bad and Good Redux Schemas

##### Bad Redux Store: Replicating UI and it's nesting

Suppose you have a UI application for Notes. Users can add notes and create nested folders.

- Folder 1
  - Sub Folder 1
    - Note 1
  - Sub Folder 2
    - Note 2

A poorly done Redux store would replicate the UI and its nested structure.

```typescript
{
  'notes': [
    {
    'folder1': [
      {
        id: "subfolder1",
        notes: [
          {id: "note1", data: "data for note 1"}
        ]
      },
      {
        id: "subfolder2",
        notes: [
          {id: "note2", data: "data for note 2"}
        ]
      }
    ]
    }
  ]
}
```

As you can notice, items are nested one inside the other, similarly to the UI.

Suppose you want to update a note, and your reducer will look like this:

```typescript
  // Redux Toolkit Format
  updateNotes: (payload) => {
    const {noteId, data} = payload;
    for(const {folderId, folder}: Object.entries(state)){
      for(const subfolder: folder){
        for(cost note: subfolder.notes){
          if(note.id === noteId){
            note.data = data;
          }
        }
      }
    }
  }
```

Note: The above is a Redux Tool Kit and does not use vanilla Redux. In vanilla redux, I'll have to use the spread operator.

Thus, we had multiple loops over our data to update it. We'll have to go over numerous loops wherever we want to access the data.

For example,

```typescript
const selectNote = (noteId) => state => {
  for(const {folderId, folder}: Object.entries(state)){
      for(const subfolder: folder){
        for(cost note: subfolder.notes){
          if(note.id === noteId){
            return note;
          }
        }
      }
    }
}
```

This is highly inefficient, and there is a better way to do it in O(1) type. That's by making use of maps.

##### Good Redux Store: Normalized

Normalizing the Redux store allows us to get and update the data in O(1) time.

We take each entity and make it a root value. Here's an example,

```typescript
{
  notes: {
    byId: {
      note1: {
        data: '...data for note 1 ...'
      },
      note2: {
        data: '...data for note 2 ...'
      }
    }
  },
  folder: {
    byId: {
      folder1: {
        subfolder: ['subfolder1', 'subfolder2']
      },
      subfolder1: {
        notes: ['note1']
      },
      subfolder2: {
        notes: ['note2']
      }
    },
    rootFolders: ['folder1']
  },
}
```

Here, instead of having nested values inside arrays, we have values in maps. Each entity (items with ID) has a separate map. To related items, we use IDs.

Here's how the same update function from above would work:

```typescript
// Redux Toolkit Format
updateNotes: (payload) => {
  const { noteId, data } = payload;
  state.notes.byId[noteId] = data;
};
```

As you can see, we accessed the data and updated it in O(1) complexity.

Similarly, we'd access data in O(1) complexity.

```typescript
const selectNote = (noteId) => (state) => {
  return state.notes.byId[noteId];
};
```

#### Concluding Step 2

Always normalize your redux store.

- Make sure all entities (this with ID) are at the root and can be accessed easily.
- Avoid nesting of objects.
- Avoid replicating the UI DOM Structure within the Redux store.

### Step 3: Create Custom Indexes

The schema of your Redux store (like any Database) depends on your access patterns and write patterns.

Creating a custom index within Redux is a great way to ensure high read speed when needed.

We have already seen byId index that maps items by ids. But there are custom indexes we can create.

I will opt for the by-convention for naming for the indexes below, which I have described in a different blog post.

#### Example 4: When accessing movies by year

Suppose you wanted to access movies by release year, and this is a highly used feature in your application.

Instead of iterating the redux store, you could create a custom index to map a year with a list of movieIds.

```typescript
movies: {
    byId: {
      1: {
        year: 2001,
        authors: ['author-1']
      },
      2: {
        year: 2003,
        authors: ['author-1']
      },
      3: {
        year: 2003,
        authors: ['author-3']
      },
    },
    allMovies: [1, 2],
    byYear: {
      2001: [1],
      2003: [2, 3]
    }
  },
```

If you want to select a movie by year, it would be in O(1).

```typescript
const selectMovieIdsByYear = (year) => (state) => {
  return state.movies.byYear[year];
};
```

This way, you avoided O(n) for O(1) time complexity.

#### Example 5: Compound Indexes

If you regularly filter by multiple values, you could also opt for a compound index.

For example, suppose you want to search for a movie by authorId and year. And this is a typical access pattern. We can add an index to authors or movies.

```typescript
byAuthorIdAndYear: {
  '1:2001': [1],
  '1:2002': [2],
  '2:2005': [5,4,6],
  ...
}
```

This way, you can access things in O(1) time.

#### Note: As the main data updates, the indexes are updated

- When inserting or updating data, make sure to update indexes.

- When removing data, make sure the indexes are also cleared.

The next blog post on clean redux architecture will cover this in more detail. TODO

#### Concluding Step 3

**RuleOfThumb**: If it's always accessed in a pattern index. If you need even more performance cache, I'll talk about it in the next step

It can also be helpful to read a blog post on custom map creation thingies. Link here.

### Step 4: Use createSelector to cache value, but use it sparingly

Ideally, the data in our Redux store should be such that it can be accessed as a lookup in O(1) time. Therefore, we store things byIds and by custom indexes.

But sometimes, you may want to compute some data based on the values in the redux store.

If multiple components use it, you might compute and store it in the store itself.

You ideally want your Redux store to be light, so if only a few components rely on the computed value, it doesn't make sense to store them in Redux. In this case, you may opt into createSelector.

createSelector allows you to cache the values when selecting data from the redux store and transform it into a custom object. Since the computed values are cached, they won't be computed again, leading to performance gains.

[Link to Create Selector Documentation](https://redux-toolkit.js.org/api/createSelector)

**Note:** createSelector **should be your last option.**

#### Example 6: Find the sum of the costs of certain books

Consider the following Redux State

```typescript
{
  books: {
    byId: {
      1: { cost: 100 },
      2: { cost: 200 },
      3: { cost: 300 }
    },
    allIds: [1, 2, 3]
  }
}
```

Here is the primary selector

```typescript
const selectBookById = (bookId) => (state) => state.books.byId[bookId];
```

Create a cached selector with useSelector

```typescript
import { createSelector } from '@reduxjs/toolkit';

const computeCostOfBooks = createSelector(
  (state, bookIds) => bookIds.map((bookId) => selectBookById(bookId)(state)),
  (books) => books.reduce((sum, book) => sum + book.cost, 0)
);
```

Usage

```typescript
// Assuming the Redux state is available as `state`
const selectedBookIds = [1, 3]; // Example: IDs of books to sum costs for
const totalCost = getBooksCostSum(state, selectedBookIds);
console.log(totalCost); // Output will be 400 (100 + 300)
```

#### Concluding Step 4

createSelector allows you to cache computed values from the state, keeping your redux store light and high performance.

At the same time, one should opt for it as a last resort. Ideally, opting for:

- Optimizing the Redux schema with Normalization
- Introducing custom indexes.

### Step 5: Connect as many components to Redux directly as possible

Rather than prop-drilling, connect as many components as possible directly to Redux.

This way, the update to the component will be directly managed by the Redux store and won't trigger rerendering unnecessarily. If you pass data as props, you must write custom logic to reduce retendering.

Connect all your components within your project to take/update data directly from/to the Redux store.

Take a look at my article "[Efficiently Connect Components with Redux and Other Stores](/software-blog/optimizing-react-connect-components-redux/)" to understand the details and a way to start connecting all your components to the Redux store efficiently.

## Ending

In the above blog post, we saw the six steps to creating a high-performance Redux Schema.

1. First, we should be careful about what we put in the Redux store and not put any unwanted local state in the global store.

2. We should normalize the data within Redux, allowing us to CRUD the data within the store in O(1) time for most cases.

3. We should also consider creating indexes in cases where we aren't easily able to access data in O(1)

4. In case we aren't able to create indexes or in the case where we are generated derived values, we should consider caching using createSelector

5. Finally, connect all your components to Redux directly, which can significantly reduce the rerendering of your Redux application.

I hope the above blog post helped you refine your strategy. **Let me know about your experience in the comments below**
