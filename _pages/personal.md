---
layout: page
title: 
permalink: /personal/
---

{% include replace_nav_with_icons.html %}

{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
<ul class="post-list">
{% for post in site.categories['personal'] %}
      <li>
    {%- include custom_post_list_image_card.html -%}
    </li>
{% endfor %}
</ul>
