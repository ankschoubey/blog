import type { APIRoute } from 'astro';
import { getRssString } from '@astrojs/rss';
import { SITE, METADATA } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export async function getStaticPaths() {
  const posts = await fetchPosts();
  const tags = new Set<string>();
  posts.forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
  return [...tags].map((tag) => ({ params: { tag } }));
}

export const GET: APIRoute = async ({ params }) => {
  const tag = String(params.tag || '');
  const posts = (await fetchPosts()).filter((p) => (p.tags || []).includes(tag));
  if (!posts.length) return new Response('Not found', { status: 404 });
  const rss = await getRssString({
    title: `${SITE.name} — ${tag}`,
    description: `${METADATA?.description || ''} (tag: ${tag})`,
    site: SITE.site || import.meta.env.SITE,
    trailingSlash: SITE.trailingSlash,
    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt,
      publishDate: post.updateDate || post.publishDate,
      pubDate: post.updateDate || post.publishDate,
      categories: post.tags || [],
    })),
  });
  return new Response(rss, { headers: { 'Content-Type': 'application/xml' } });
};
