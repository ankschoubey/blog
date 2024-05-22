import { useEffect, useMemo, useState } from "react";
import { frontmatter } from "../../../dist/chunks/1-month-microservice_7Hyrkh-j.mjs";
// import Item from '~/components/blog/GridItem.astro';

const noOfLetters = 100;
function searchPosts(allPosts, query: string) {
  console.log(allPosts)
  if(query.trim().length == 0){
    return []
  }
  console.log(query)
  const lowerQuery = query.toLowerCase();
  const temp = Object.values(allPosts)
  .map(post => {
    const indexOf = post.searchableContent?.toLowerCase().indexOf(lowerQuery)
    if(indexOf == -1){
      post.found = false;
      return post;
    }
    post.found = true
    const searchLowerBound = Math.max(0,indexOf-noOfLetters);
    const containsWordsBefore = searchLowerBound > 0;
    const searchUpperBound = Math.min(post.searchableContent.length, indexOf + noOfLetters);
    const containsWordsAfter = searchUpperBound < post.searchableContent.length;

    post.searchSection = post.displayContent.substring(searchLowerBound, searchUpperBound)
    const leftSection = post.searchSection.substring(0, noOfLetters) + "<mark>"
    const rightSection = post.searchSection.substring(noOfLetters,noOfLetters+query.length) + "</mark>"+post.searchSection.substring(noOfLetters+query.length) 
    post.searchSection = leftSection + rightSection;
    if(containsWordsBefore) {
      post.searchSection = "..."+post.searchSection
    }
    if(containsWordsAfter){
      post.searchSection =post.searchSection +  "..."
    }
    post.searchSlug = post.frontmatter.slug + "#:~:text=" + query
    return post;
  })
  .filter(post => post.found)
  .sort((a,b)=>{
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

  const noSearch = searchQuery.trim().length == 0;
  const searchButNotFound = !noSearch && filteredPosts.length == 0;
  const found = !noSearch && filteredPosts.length > 0

  useEffect(()=>{
    setTimeout(()=> {
      const input = document.querySelector("input");
      input.focus();
    }, 80)

  }, [])

  return <div className="container flex justify-center flex-col" >
    <form>
  <input autofocus type="text" value={searchQuery} placeholder="Start typing to search" onInput={(e) => {
    setSearchQuery(e.target.value)
    setFilteredPosts(searchPosts(allPosts, e.target.value));
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", e.target.value);
  }} className="bg-gray-50 border border-gray-300 p-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </form>

<section className="p-4">
  {noSearch && <p className="text-center font-bold">🔎  Search {allPosts.length} articles from this blog</p>}
  {searchButNotFound && <p className="text-center font-bold">🔎 No articles found</p>}

  {found && (<>
    <div className="p-3">
      {filteredPosts.map(post => (
        <a href={post.searchSlug}>
        <article class="mb-6 transition flex gap-2 flex-row">
            <div class="relative max-h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg flex justify-center w-px-350"

            >
    {
      post.frontmatter.image && (
        <a className="w-80 min-w-80">
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
  <div className="p-2">
  <div class="mb-2 text-xl font-bold leading-tight sm:text-2xl">
    {
        <a
          class="hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200"
        >
          {post.frontmatter.title}
        </a>
    }
  </div>
    
  <p class="text-muted dark:text-slate-400 text-md">{post.frontmatter.excerpt}</p>
  <p class="text-muted dark:text-slate-700 text-md" dangerouslySetInnerHTML={{ __html: post.searchSection }}></p>
  </div>

  </div>
</article>
</a>
      ))}
    </div>
    <div className="text-center font-bold">
    You've reached the end! 👋
    </div>
    </>
  )}
</section>
    </div>
}

export default SearchBox;