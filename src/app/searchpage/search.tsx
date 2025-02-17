"use client";
// import { useSession } from "next-auth/react";
import { api } from "src/trpc/react";
import Header from "../header/header";
import { RiChat1Line } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type Post = {
  id: number;
  name: string;
  content: string;
  image: string | null;
  createdAt: Date;
  tags: string[];
  createdById: string;
  userId: string;
  userName: string;
  userEmail: string;
  userImage: string;
  // createdBy: {
  //   id: string;
  //   name: string | null;
  //   email: string | null;
  //   emailVerified: Date | null;
  //   image: string | null;
  //   bio: string | null;
  //   location: string | null;
  //   website: string | null;
  //   createdAt: Date;
  // };
};

export default function SearchPage({ searchslug }: { searchslug: string }) {
  const {
    data: posts,
    isLoading,
    // isError,
  } = api.post.searchPosts.useQuery({
    searchslug: searchslug,
  });

  const router = useRouter();
  const pathname = usePathname(); // get url
  const [searchTerm, setSearchTerm] = useState("");

  // keep search term in search bar
  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts[1] === "search" && pathParts[2]) {
      setSearchTerm(decodeURIComponent(pathParts[2])); // get curr search term from class
    }
  }, [pathname]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // set debounced search term when user types something, with 200ms timeout
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    // cleanup if user types again before 200ms passes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // conduct search otherwise (happens whenever debouncedSearchTerm is updated)
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, router]);

  // conduct search if user clicks enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(`/search/${encodeURIComponent(searchTerm)}`);
      }
    }
  };
  // console.table(posts);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading posts.</div>;

  return (
    <div className="mx-auto max-w-[1024px]">
      <Header />
      <div className="mt-[56px] grid w-full">
        <div className="w-screen p-3 sm:row-start-1 sm:w-auto sm:px-2 sm:pt-2">
          <header className="flex flex-col align-middle">
            <div className="h-[40px] w-full sm:hidden">
              <form className="border-grey-900 flex h-[40px] w-full items-center rounded-md border-[1.5px] bg-white">
                <button className="pl-2 pr-1">
                  <RiSearchLine className="h-6 w-6" />
                </button>
                <input
                  type="text"
                  value={searchTerm} // keeps search term in bar
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="h-full w-full rounded-md pl-2 pr-4 focus:outline-none"
                />
              </form>
            </div>
            <div className="flex flex-row items-center">
              <div className="hidden justify-start sm:flex">
                <h1 className="whitespace-nowrap align-middle text-3xl font-bold">
                  Search results for {searchslug}
                </h1>
              </div>
              <div className="flex h-[48px] w-full flex-row py-1 sm:justify-end">
                <div className="py-2 pr-3 text-sm font-bold sm:text-base">
                  Most Relevant
                </div>
                <div className="px-3 py-2 text-sm sm:text-base">Newest</div>
                <div className="px-3 py-2 text-sm sm:text-base">Oldest</div>
              </div>
            </div>
            <div className="flex h-[84px] w-full flex-grow-0 flex-row overflow-x-scroll py-1 sm:hidden">
              <div className="flex min-w-max">
                <div className="whitespace-nowrap py-2 pr-3 text-sm font-bold">
                  Posts
                </div>
                <div className="whitespace-nowrap px-3 py-2 text-sm">
                  People
                </div>
                <div className="whitespace-nowrap px-3 py-2 text-sm">
                  Organizations
                </div>
                <div className="whitespace-nowrap px-3 py-2 text-sm">Tags</div>
                <div className="whitespace-nowrap px-3 py-2 text-sm">
                  Comments
                </div>
                <div className="whitespace-nowrap px-3 py-2 text-sm">
                  My posts only
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="sm:grid sm:grid-cols-[2fr,5fr] sm:gap-2 sm:px-2 md:grid-cols-[240px,1fr]">
          <div className="hidden sm:block">
            <nav className="hidden sm:block">
              <ul>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md bg-white p-2">
                    <a className="flex flex-row">
                      <span className="font-bold">Posts</span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>People</span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Organizations</span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Tags</span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Comments</span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>My posts only</span>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
          <div className="mb-2 flex flex-col space-y-2">
            {isLoading ? (
              <SkeletonLoader />
            ) : Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post: Post) => (
                <div
                  key={post.id}
                  className="w-full border-[1.5px] bg-white sm:rounded-md"
                >
                  <div className="p-5">
                    <div className="mb-2 mr-2 flex max-h-[35px] items-center">
                      <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                        <a href={`/user/${post.createdById}`}>
                          <img
                            src={post.userImage ?? "/images/avatar.png"}
                            alt="logo"
                            className="h-full w-full object-cover"
                          />
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex max-h-[17.5px] items-center text-sm">
                          {post.userName}
                        </div>
                        <div className="flex max-h-[15px] items-center text-xs">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center pl-[10px] md:pl-[20px] lg:pl-[40px]">
                      <h2 className="mb-1 w-full justify-start text-2xl font-bold">
                        <a href={`/post/${post.id}`}>{post.name}</a>
                      </h2>
                      <div className="mb-2 flex w-full text-gray-500">
                        {post.tags.map((tag: string) => (
                          <a
                            key={tag}
                            className="px-[7px] py-[4px] text-sm"
                            href={`/t/${tag}`}
                          >
                            {tag}
                          </a>
                        ))}
                      </div>
                      <div className="flex w-full flex-row items-center">
                        <div className="flex flex-row items-center">
                          <a className="items-center py-1 pl-2 pr-3 text-sm">
                            <span>💖🦄🤯👏🔥</span>
                            <span className="ml-[14px] hidden text-gray-500 sm:inline-block">
                              190 reactions
                            </span>
                          </a>
                          <a className="flex flex-row items-center py-1 pl-2 pr-3 text-sm">
                            <div className="mr-1 flex h-6 w-6 flex-row items-center">
                              <RiChat1Line className="h-4 w-4" />
                            </div>
                            <span className="hidden text-gray-500 sm:inline-block">
                              19 comments
                            </span>
                          </a>
                        </div>
                        <div className="ml-auto flex flex-row items-center">
                          <small className="mr-2 items-center text-gray-500">
                            4 min read
                          </small>
                          <button className="p-2">
                            <span className="flex h-6 w-6 items-center justify-center">
                              <HiOutlineBookmark className="h-5 w-5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No posts found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full border-[1.5px] bg-white sm:rounded-md"
        >
          <div className="p-5">
            <div className="mb-2 mr-2 flex max-h-[35px] items-center">
              <div className="mr-2 h-8 w-8 animate-pulse overflow-hidden rounded-full bg-gray-200"></div>
              <div className="flex flex-col">
                <div className="mb-1 h-[15px] w-[80px] animate-pulse rounded-md bg-gray-200" />
                <div className="flex h-[12px] w-[40px] animate-pulse items-center rounded-md bg-gray-200 text-xs" />
              </div>
            </div>
            <div className="flex flex-col items-center pl-[10px] md:pl-[20px] lg:pl-[40px]">
              <div className="mb-2 mr-auto h-[29.5px] w-[250px] animate-pulse justify-start rounded-md bg-gray-200" />
              <div className="mb-2 mr-auto flex h-[27px] w-[200px] animate-pulse justify-start rounded-md bg-gray-200 text-gray-500"></div>
              <div className="flex w-full flex-row items-center">
                <div className="flex flex-row items-center">
                  <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-gray-200" />
                  <a className="hidden flex-row items-center py-1 pl-2 pr-3 text-sm sm:flex">
                    <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-gray-200" />
                  </a>
                </div>
                <div className="ml-auto flex flex-row items-center">
                  <div className="h-[24px] w-[80px] animate-pulse rounded-md bg-gray-200 sm:w-[150px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
