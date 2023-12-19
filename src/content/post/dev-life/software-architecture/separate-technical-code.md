---
comments: true
excerpt: Separate out technical code from business/domain logic for extreme reusability for code.
last-modified-purpose: This is just Domain Driven Design and applies to both frontend and backend.
tags:
 - web-development
 - ddd
 - clean-code
publishDate: 2022-10-14T20:52:08.052481
slug: /separate-technical-code/
title: Separate Technical Code From Domain Code in both Frontend and Backend
image: https://docs.google.com/drawings/d/e/2PACX-1vRmJrv9fnB7DanMfjGED-WD8BRd43xERmub5YWCYWTOIejwBuomQzuNYDZK-9Pc6GcyDhu7BfDiv4Md/pub?w=1369&h=1006
---
![](https://docs.google.com/drawings/d/e/2PACX-1vRmJrv9fnB7DanMfjGED-WD8BRd43xERmub5YWCYWTOIejwBuomQzuNYDZK-9Pc6GcyDhu7BfDiv4Md/pub?w=1369&h=1006)

[Original Image](https://docs.google.com/drawings/d/1-57rqBmiUKfTxzPqyj_-VOVJ3q4KF2Wewwg68cjz6I4/edit?usp=sharing)

## Need for Custom UI Library

To be most productive with any front-end technology, I am convinced that a custom component library should be created.

This custom component library should be used for everything. Any new kind of table, any new time of image viewer, etc.

The component library should be completely decoupled from the main application data. Instead, it should have its different namings.

All heavy lifting of business logic is done by the main application. While the component library will deal with all the views.

Even if you already use a UI library like DevExpress, using them from within a custom component library will allow re-enforcing rules and make it easy to change the code later.

This custom UI library can have the following:

- Common UI Elements
- Common UI Layouts
- Reusable scripts

## Some Common UI Library Elements

These are some UI elements that I believe are perfect for including in a custom UI Library. I have compiled this list by looking at third-party UI libraries.

- Tables
- Forms
  - Input
  - Checkbox
  - HTML Editor
  - Buttons
- Charts
- Maps
- Toast
- Progress Bars
- Tooltip
- Popovers
- Popups
- Gallery
- Menus
- Accordion

## In general the rule is

> if you are using a UI Element twice, wrap it in a custom component.

## Implementation Lesson

- 2022 Oct 14: Separate Domain Code From Technical Code
  - This is classic Domain Driven Design. This applies as much to frontend as to backend.