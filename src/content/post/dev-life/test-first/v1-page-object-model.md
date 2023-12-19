---
comments: true
description: Page Object Model can be used with any testing framework to write cleaner and simpler tests that are fast to write.
tags:
 - testing
 - tdd
publishDate: 2023-08-28T20:52:08.052481
last-modified-purpose:
permalink: /tdd/page-object-model
title: Write Cleaner UI Tests with Page Object Model Pattern
image: /images/tdd/page-object-model.png
cover-img-style: "position: relative; height:100%"
---

I have covered many testing patterns. Some of them are [Test Data Factories](https://www.ankushchoubey.com/test-data-factories/), [the when/should way](https://www.ankushchoubey.com/method-when-should/) and more. The Page Object Model complements all those patterns.

The Page Object Model is a great way to write clean tests for UI-related code. The POM Pattern is usable with any UI testing, selenium, react tests with enzyme or react testing library, TestCafe, Cypress or other test framework.

## A test without Page Object Model

To write UI tests without a Page Object Model, follow these steps. The below example assumes React with Enzyme but can apply to any framework.

```typescript
// given:
 const {columns, data} = getSomeProps();
 const wrapper = mount(<MovieListComponent columns={columns} data={data} />)
// when:
 wrapper.find("div .random-css-selector:first tr th span[data-value='some data value']").click();
// then:
 expect(wrapper.find("div .random-css-selector:first tr th span[data-value='some data value']").prop("name")).toEqual("someValue")
```

The above test is miswritten on purpose to illustrate some important points.

The CSS selectors like `div .random-css-selector:first td tr span[data-value='some data value']` make it hard to understand what the test is for.

Suppose you have five things to check, meaning you'll write five different such CSS selectors.

Tests repeat, resulting in encountering multiple repetitions of these similar blocks. If there are widespread changes in the UI DOM, you will need to modify them.

In addition, the above test could be more fluent. Fluent tests are English-like, and they make it very easy to read the test.

## A test with Page Object Model

Here's how the Page Object Model can avoid all these things.

The Page Object Model encapsulated everything related to a component or a page in a specific class.

To illustrate the POM, we can create a separate `MovieListPageObject`.

```typescript
class MovieListPageObject{
 constructor(wrapper){
  this.wrapper = wrapper;
 }
 getColumnHeader(index: number){
  const selector = this.wrapper.find("div .random-css-selector")
       .at(index);
  return selector.find("tr th span[data-value='some data value']");
 }
 clickColumnHeader(index: number){
  return this.getColumnHeader(index).click();
 }
 expectColumnHeaderName(index: number, expectedValue: string){
  expect(this.getColumnHeader().text()).toEqual(value);
 }
}
```

In the test, we can write:

```typescript
// given:
 const {columns, data} = getSomeProps();
 const wrapper = mount(<MovieListComponent columns={columns} data={data} />)
 const movieListPO = new MovieListPageObject(wrapper);
// when:
 const firstColumn = 0;
 movieListPO.clickColumnHeader(firstColumn);
// then:
 movieListPO.expectColumnHeaderName(firstColumn, "someValue");
```

Here are the benefits seen with the above PageObjectModel.

1. The above test is much more English-like
2. The POM encapsulates all the hard-to-read CSS selectors. Therefore, in case of modification, we can modify it in one place.
3. POM can be reused in multiple tests.
4. The POM makes tests shorter.

## A small optimization

In the above test, I'd also create a `mount{Component}` method to return the Page Object.

**Before**:

```typescript
 const wrapper = mount(<MovieListComponent columns={columns} data={data} />)
 const movieListPO = new MovieListPageObject(wrapper);
```

**Before**:

```typescript
 const movieListPO = mountMovieList(<MovieListComponent columns={columns} data={data} />)
```

Declare the `mountMovieList` somewhere.

```typescript
const mountMovieList = (reactElement:ReactElement)=> {
 const wrapper = mount(reactElement)
 return new MovieListPageObject(wrapper);
}
```

{%- include tip.html content="A good rule of thumb is to make sure tests do not contain any CSS DOM Element Selectors. All selectors should be within the page object." -%}
