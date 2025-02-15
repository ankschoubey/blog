import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

const includedTags = new Set(['technical']);

const sitemapMaker = (posts) => {

    var header = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`
    var end = `</urlset>`

    var urls = posts.map((post) => {
        let url = SITE.site + getPermalink(post.permalink, 'post');
        // replace double // by single
        url = url.replace(/([^:]\/)\/+/g, "$1");
        return `<url>
        <loc>${url}</loc>
        <lastmod>${post.publishDate.toISOString().split("T")[0]}</lastmod>
        <changefreq>${post.changefreq ||'yearly'}</changefreq>
        <priority>${post.priority || 0.3}</priority>
    </url>`
    })
    return header + urls.join('') + end;
}

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  const postsFiltered = posts
  .filter((post) => post.tags?.findIndex((tag) => includedTags.has(tag)) != -1);

  const sitemap = sitemapMaker(postsFiltered);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
