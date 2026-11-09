// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';

vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => []),
}));

import { findRelatedPosts, findPrevNextPosts } from '~/utils/blog';

const makePost = (overrides = {}) => ({
  id: '1',
  slug: 'post-a',
  permalink: 'post-a',
  publishDate: new Date('2024-01-01'),
  title: 'Post A',
  excerpt: 'Excerpt',
  tags: ['technical'],
  category: 'software',
  ...overrides,
});

describe('findRelatedPosts', () => {
  it('returns array without self', async () => {
    const post = makePost({ slug: 'a' });
    const related = await findRelatedPosts(post, 3);
    expect(Array.isArray(related)).toBe(true);
    expect(related.find((p) => p.slug === 'a')).toBeUndefined();
  });
});

describe('findPrevNextPosts', () => {
  it('returns empty for unknown slug when collection empty', async () => {
    const post = makePost({ slug: '__no-such-slug__' });
    const { prev, next } = await findPrevNextPosts(post);
    expect(prev).toBeUndefined();
    expect(next).toBeUndefined();
  });
});
