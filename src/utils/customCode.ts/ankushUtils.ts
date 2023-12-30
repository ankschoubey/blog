import type { Item, Post } from "~/types";
import { findPostsBySlugs } from "../blog";

export const postToItemConverter = (post: Post, index: number | undefined): Item =>  {
    return {
        title: post.title,
        description: post.excerpt,
        href: "/"+ post.slug,
        image: {
            src: post.image,
            alt: post.title
        },
        icon: index ? `tabler:number-${index}-small`: undefined
    }
}


export const getItemFromSlug = async (slug: string, index: number | undefined) => {
    const post  = await findPostsBySlugs([slug]);
    if(!post){
        throw new Error(`Slug not found : {slug: '${slug}'}`)
    }
    const item = postToItemConverter(post[0], index);

    return item
}

export interface SeriesItems {
    title: string,
    subtitle: string,
    posts: string[],
    items?: Item[]
}