import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

const exludeThoughtTags = new Set(['technical-thoughts', 'life-thoughts', 'thoughts']);
export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,

    items: posts
      .filter((post) => post.tags?.findIndex((tag) => exludeThoughtTags.has(tag)) === -1)
      .map((post) => ({
        link: getPermalink(post.permalink, 'post'),
        title: post.title,
        description: post.excerpt,
        publishDate: post.publishDate,
        pubDate: post.publishDate,
      })),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
