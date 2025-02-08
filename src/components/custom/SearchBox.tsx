import { useEffect, useState } from 'react';

const noOfLetters = 100;

function searchPosts(allPosts, query: string) {
  query = query.trim();
  if (query.length == 0) {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  const temp = Object.values(allPosts)
    .map((post) => {
      const indexOf = post.searchableContent?.toLowerCase().indexOf(lowerQuery);
      if (indexOf == -1) {
        post.found = false;
        return post;
      }
      post.found = true;
      const searchLowerBound = Math.max(0, indexOf - noOfLetters);
      const containsWordsBefore = searchLowerBound > 0;
      const searchUpperBound = Math.min(post.searchableContent.length, indexOf + noOfLetters);
      const containsWordsAfter = searchUpperBound < post.searchableContent.length;

      post.searchSection = post.displayContent.substring(searchLowerBound, searchUpperBound);
      const leftSection = post.searchSection.substring(0, noOfLetters) + '<mark>';
      const rightSection =
        post.searchSection.substring(noOfLetters, noOfLetters + query.length) +
        '</mark>' +
        post.searchSection.substring(noOfLetters + query.length);
      post.searchSection = leftSection + rightSection;
      // window.location.hash = "#:~:text=" + query
      if (containsWordsBefore) {
        post.searchSection = '...' + post.searchSection;
      }
      if (containsWordsAfter) {
        post.searchSection = post.searchSection + '...';
      }
      post.searchSection = `"${post.searchSection}"`;
      post.searchSlug = post.frontmatter.slug + '#:~:text=' + query;
      return post;
    })
    .filter((post) => post.found)
    .sort((a, b) => {
      return new Date(b.frontmatter.publishDate) - new Date(a.frontmatter.publishDate);
    });

  console.log(temp.length);

  return temp;
}

const SearchBox = ({ allPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(() => {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.get('q');
    if (!searchParams.get('q')) {
      return [];
    }
    return searchPosts(allPosts || [], searchParams.get('q'));
  });

  const noSearch = searchQuery.trim().length == 0;
  const searchButNotFound = !noSearch && filteredPosts.length == 0;
  const found = !noSearch && filteredPosts.length > 0;

  useEffect(() => {
    setTimeout(() => {
      const input = document.querySelector('input');
      input.focus();
    }, 80);
  }, []);

  return (
    <div className="container flex flex-col justify-center">
      <form>
        <input
          autofocus
          type="text"
          value={searchQuery}
          placeholder="Start typing to search"
          onInput={(e) => {
            setSearchQuery(e.target.value);
            setFilteredPosts(searchPosts(allPosts, e.target.value));
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set('q', e.target.value);
          }}
          className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 p-4 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </form>

      <section className="sm:p-2 md:p-4">
        {noSearch && <p className="text-center font-bold">🔎 Search {allPosts.length} articles from this blog</p>}
        {searchButNotFound && <p className="text-center font-bold">🔎 No articles found</p>}

        {found && (
          <>
            <div className="sm:p-2 md:p-3">
              {filteredPosts.map((post) => (
                <a href={post.searchSlug}>
                  <article class="mb-6 flex flex-col gap-2 transition md:flex-row  ">
                    <div class="w-px-350 relative flex max-h-64 justify-center rounded bg-gray-400 shadow-lg dark:bg-slate-700">
                      {post.frontmatter.image && (
                        <a className="min-w-80 flex items-center justify-center md:w-40 lg:w-80">
                          <img
                            src={post.frontmatter.image}
                            class="h-full rounded bg-gray-400 shadow-lg dark:bg-slate-500"
                            style={{
                              objectFit: 'contain',
                            }}
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                          ></img>
                        </a>
                      )}
                    </div>
                    <div>
                      <div className="p-2">
                        <div class="mb-2 text-xl font-bold leading-tight sm:text-2xl">
                          {
                            <a class="transition duration-200  ease-in hover:text-primary dark:hover:text-blue-700">
                              {post.frontmatter.title}
                            </a>
                          }
                        </div>

                        <p class="text-md text-muted dark:text-slate-300">{post.frontmatter.excerpt}</p>
                        <p
                          class="py-7px text-md text-muted dark:text-slate-400"
                          dangerouslySetInnerHTML={{ __html: post.searchSection }}
                        ></p>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
            <div className="text-center font-bold">You've reached the end! 👋</div>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchBox;
