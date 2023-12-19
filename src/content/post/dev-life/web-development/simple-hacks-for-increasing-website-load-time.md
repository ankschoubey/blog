---
toc: false
comments: true
excerpt: For those who don’t require Google level optimization
tags:
 - technical
 - web-development
publishDate: 2020-02-22T20:42:15.140795
title: Simple Hacks for increasing website load time
slug: /load_time/
---

# Reduce bundle size

## [Always use compression: at least `gzip`](https://twitter.com/ankschoubey/status/1229795313994461187?ref_src=twsrc%5Etfw)


Always compress. The configuration is set in the webserver.

`gzip` is good enough in most cases in terms of both performance and speed.

My application went from 4 MB to 800 kb. Fewer data faster speed.

<sup>Source 1: [Enabling gzip](https://varvy.com/pagespeed/enable-compression.html)</sup><br>
<sup>Source 2: [Verify gzip on Chrome](https://stackoverflow.com/a/18834602)</sup>

# Make less number of requests

## Always cache static content: `js`, `css` and static images.

This can be configured in your web server or your application. Just google “ “how to cache in <your framework or web server>“.

Of course: **_be sure to not cache dynamic content._**

**For `js` and `css` files, make sure it has a name that is unique if the file is modified.**

Example: in angular after creating a `--prod` build, the filename is in following format `<filename>.<md5 checksum>.js`.

This ensures that if the content of the file changes, the `md5` checksum will change and a new request will be sent but if the file does not change then it will have the same checksum so it can be pulled from the cache.

## Always load images lazily

{% include twitter.html content="https://twitter.com/ankschoubey/status/1219613362239049728?ref_src=twsrc%5Etfw" %}

<sup>Advanced tips: [Lazy Loading Images and Video](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video)</sup>

# Do it fast

## [Fetch `js` and `css` asynchronously](https://twitter.com/ankschoubey/status/1229793732418920449?s=20) <sup>[*Source*](https://flaviocopes.com/javascript-async-defer/#the-position-matters)</sup>


When fetching ``js`` add `async defer` to `script` tag. This will fetch multiple `js` files in parallel. 

Keep `script` tag in the header for this.

---

**Are there more such easy tips?**

Please mention them in the comments and I will add the tip to the list and mention your name.