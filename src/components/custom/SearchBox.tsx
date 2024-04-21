import { useState } from "react";
// import Item from '~/components/blog/GridItem.astro';

function searchPosts(allPosts, query) {
  const lowerQuery = query.toLowerCase();
  const temp = Object.values(allPosts)
  .filter(post => {
    const { title, excerpt } = post.frontmatter || post;
    return (
      title?.toLowerCase().includes(lowerQuery) ||
      excerpt?.toLowerCase().includes(lowerQuery)
    );
  }).sort((a,b)=>{
    return new Date(b.frontmatter.publishDate) - new Date(a.frontmatter.publishDate)
  });

  console.log(temp.length)

  return temp;
}

const SearchBox = ({allPosts}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(()=>{
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.get("q");
    if(!searchParams.get("q")){
      return [];
    }
    return searchPosts(allPosts||[], searchParams.get("q"))
  });

  return <div className="container flex justify-center flex-col" >
    <form>
  <input type="text" value={searchQuery} placeholder="Search posts..." onInput={(e) => {
    setSearchQuery(e.target.value)
    setFilteredPosts(searchPosts(allPosts, searchQuery));
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", e.target.value);
  }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </form>

<section className="p-4">
  {filteredPosts.length > 0 ? (
    <div>
      {filteredPosts.map(post => (
        <article class="mb-6 transition flex gap-2 flex-row">
            <div class="relative max-h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg flex justify-center w-px-350"
            style={{
              width: post.frontmatter.image? "350px": "0px"
        
            }}
            >
    {
      post.frontmatter.image && (
        <a href={post.frontmatter.slug} className="w-fit">
          <img  src={post.frontmatter.image}
            class="rounded shadow-lg bg-gray-400 dark:bg-slate-700"
            style={{
              height: "256px",
              objectFit: "contain"
            }}
            alt={post.title}
            loading="lazy"
            decoding="async"></img>
        </a>
      )
    }
  </div>
  <div>
  <div class="mb-2 text-xl font-bold leading-tight sm:text-2xl">
    {
        <a
          href={post.frontmatter.slug}
          class="hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200"
        >
          {post.frontmatter.title}
        </a>
    }
  </div>
  <p class="text-muted dark:text-slate-400 text-md">{post.frontmatter.excerpt}</p>
  </div>
</article>
      ))}
    </div>
  ) : (
    <p>No results found.</p>
  )}
</section>
    </div>
}

export default SearchBox;