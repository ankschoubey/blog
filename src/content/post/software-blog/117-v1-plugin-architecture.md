---
comments: true
excerpt: 'Placeholder'
tags:
  - technical
  - architecture
  - plugin
publishDate: 2022-11-13T20:52:08.052481
last-modified-purpose:
slug: /software-blog/plugin-architecture
title: How to develop a robust plugin architecture?
image: /images/v1-plugin-architecture/header.jpg
---

![](/images/v1-plugin-architecture/header.jpg)

Photo by <a href="https://unsplash.com/@justin_morgan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Justin Morgan</a> on <a href="https://unsplash.com/s/photos/plugin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Disclaimer: I haven't developed an extremely complete plugin architecture myself. What I have developed is a plugin architecture which is robust enough. There are too many points to the discussion. These are all my thoughts.

## Identify places in your application which you want to provide as plugin

![](/images/v1-plugin-architecture/1_identify_where_to_put_plugin.png)

## Identify how plugin is going to share data? And can plugin update in real time? if Yes how?

![](/images/v1-plugin-architecture/2_sharing_data_between_plugin.png)

For example: 1 Plugin can be of 2 parts.

How will P1 and P2 share data?

Ideally, these should be microservices?

Note: This is how slack and teams do it.

## Define interfaces that plugin developers can use

- Zapier allows using CLI to generate a project architecture
- They have specific interfaces that can be used for generating plugin
- They also have a z object that can be used for a limited set of features such as API calls.

## Keep your product as lean as possible

For plugin architecture, the whole product should be made pluggable. That is even first party features should be developed as plugin. Which means there will be almost nothing in the core.

You could have 2 interfaces for this.

1 for publish `pluginInterface`
2 for first hand `interface firstHand extends pluginInterface`

Or you could provide a limited set of components that can be rendered on UI.

The term interface and components are loose here. Many plugins are simply JSON based.

## You'll have to create infrastructure for managing plugins and plugin lifecycle

Something like

- Interfaces for plugins
- Plugin repository
  - How will you manage so many third party plugins?
  - How will plugin versions be managed?
- Approval process
  - This will also include manual approavls.
  - I would also add a virus scanner and other security measures.

## Resources

[Plugin Development for Wordpress](https://developer.wordpress.org/plugins/plugin-basics/best-practices/): They are much more low-level about implementation. Especially go through their best practices section.

[Plugin Architecture: Why and How?](https://dev.to/arcanis/plugin-systems-when-why-58pp): Goes into detail about why to implement plugin architecture. How is plugin architecture better than monoliths? How are predefined hooks used in plugin architecture? And how yarn2 does it.

[Microsoft Adaptive Cards](https://adaptivecards.io/): A very interesting open source UI plugin architecture

Google "plugin architecture java" or "plugin architecture javascript"

[YouTube: The Power Of The Plugin Architecture In Python](https://www.youtube.com/watch?v=iCE1bDoit9Q)

[StackOverflow: The plugin design pattern explained (as described by Martin Fowler)](https://stackoverflow.com/questions/51217271/the-plugin-design-pattern-explained-as-described-by-martin-fowler)

[Trello Plugin - Your First Power-Up](https://developer.atlassian.com/cloud/trello/guides/power-ups/your-first-power-up/)

[How to build a plugin system on the web and also sleep well at night](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)

May come useful: [Sandboxed JavaScript](https://developers.google.com/tag-platform/tag-manager/templates/sandboxed-javascript)
