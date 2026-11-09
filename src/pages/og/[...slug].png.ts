import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { cleanSlug } from '~/utils/permalinks';

const posts = await getCollection('post');

const pages = Object.fromEntries(
  posts.map(({ slug, data }) => [
    cleanSlug(slug),
    { title: data.title, description: data.excerpt || '' },
  ])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages,
  getSlug: (slug) => slug,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[16, 16, 16]],
    border: { color: [0, 124, 220], width: 12, side: 'block-end' },
  }),
});
