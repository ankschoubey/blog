import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';

const technical = new Set(['technical']);
const nonTechnical = new Set(['non-technical']);


export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  let lifeBlogXml = SITE.site + '/life-blog-sitemap.xml';
  lifeBlogXml = lifeBlogXml.replace(/([^:]\/)\/+/g, "$1");
  let softwareBlogXml = SITE.site + '/software-blog-sitemap.xml';
  softwareBlogXml = softwareBlogXml.replace(/([^:]\/)\/+/g, "$1");

  let oldBlogXml = SITE.site + '/sitemap-0.xml';
  oldBlogXml = oldBlogXml.replace(/([^:]\/)\/+/g, "$1");


    const allPosts = await fetchPosts();
  
    const allTechnicalPosts = allPosts.filter((post) => post.tags?.findIndex((tag) => technical.has(tag)) != -1);
    const lastTechnicalPostLastDate = allTechnicalPosts[0].publishDate.toISOString().split("T")[0];
  
    const allNonTechnicalPosts = allPosts.filter((post) => post.tags?.findIndex((tag) => nonTechnical.has(tag)) != -1);
    const lastNonTechnicalPost = allNonTechnicalPosts[0].publishDate.toISOString().split("T")[0];
    const lastPostLastDate = allPosts[0].publishDate.toISOString().split("T")[0];

    const allPostsLastDate = allPosts[0].publishDate.toISOString().split("T")[0];

  const sitemap = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
    <loc>${lifeBlogXml}</loc>
    <lastmod>${lastNonTechnicalPost}</lastmod>
    </sitemap>
    <sitemap>
    <loc>${softwareBlogXml}</loc>
    <lastmod>${lastTechnicalPostLastDate}</lastmod>
    </sitemap>
    <sitemap>
    <loc>${oldBlogXml}</loc>
    <lastmod>${allPostsLastDate}</lastmod>
    </sitemap>
    </sitemapindex>
  `;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
