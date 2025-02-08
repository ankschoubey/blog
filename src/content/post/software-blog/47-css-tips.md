---
comments: true
excerpt: 'Placeholder'
tags:
  - technical
  - web-development
publishDate: 2021-09-13T20:52:08.052481
slug: /software-blog/css-tips/
title: CSS Tips
---

## Keep CSS and HTML to a minimum

- CSS and HTML are every dependent. Remove unnecessary tags and CSS classes.
- Lesser the CSS and HTML, easier it is to modify.

## Use flex and grid for adjusting positions

- These are much more dynamic than using position absolute.
- Resource:
  - Flex: <https://www.youtube.com/watch?v=K74l26pE4YA>
  - Grid: <https://www.youtube.com/watch?v=uuOXPWCh-6o>

## Don't use absolute lengths, use relative lengths

- absolute lengths include cm, px, etc. relative lengths include em, cm, rem etc.
- if a width or height need to be a certain character length use "ch". This cannot be used for font-size
- "vh" and "vw" can also be used but they are not perfect. instead use em or rem. rem is more preferred.
- Resource: <https://www.w3schools.com/CSSref/css_units.asp>

## Use CSS variables

- CSS variables allow for easily changing CSS on the fly.
- Resource: <https://www.youtube.com/watch?v=NtRmIp4eMjs>

## For DevExpress, modify dx-widget property

- .dx-widget class is applied to all DevExpress component so modifying it for changing something like font-size will effect every dx component.
- For responsiveness, rely on CSS not JS.
- Unless absolutely needed, JS should not be used to re-enforce responsiveness.

## Media Queries

- Assuming you are used most of the tips above, your CSS should be fairly small.
- Now you can use media queries for modifying elements on specific screen sizes.
- Before using media queries decide on the size of displays you want to support. This will make sure media query parameters is same across application.
- Resource: <https://www.youtube.com/watch?v=yU7jJ3NbPdA>
