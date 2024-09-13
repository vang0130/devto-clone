"use client";

import { api } from "src/trpc/react";
import React from "react";

import { HiOutlineBookmark } from "react-icons/hi2";
import { TfiComment } from "react-icons/tfi";

export default function AllPosts() {
  const { data: allPosts } = api.post.findMany.useQuery(); // Destructure to get data
  // display all posts in div
  return (
    // <div>
    //   {allPosts?.map((post) => (
    //     <div key={post.id}>
    //       <div>{post.name}</div>
    //       <div>{post.content}</div>
    //     </div>
    //   ))}
    // </div>
    <div className="mb-2 flex flex-col space-y-4">
      {/* display all posts here */}
      {/* number of divs dependent on number of posts in database */}
      {allPosts?.map((post) => (
        <div key={post.id} className="rounded-md border-[1.5px] bg-white p-5">
          <div className="mb-2 mr-2 flex max-h-[35px] items-center">
            <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
              <img
                src="/images/winter.png"
                alt="logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex max-h-[17.5px] items-center text-sm">
                {post.createdById}
              </div>
              <div className="flex max-h-[15px] items-center text-xs">
                {/* {post.createdAt.toLocaleDateString()} */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center pl-[10px] md:pl-[20px] lg:pl-[40px]">
            <h2 className="mb-1 text-2xl font-bold justify-start w-full">
              <a>{post.name}</a>
            </h2>
            <div className="mb-2 flex w-full text-gray-500">
              <a className="px-[7px] py-[4px] text-sm" href="/t/react">
                #react
              </a>
              <a className="px-[7px] py-[4px] text-sm" href="/t/javascript">
                #javascript
              </a>
              <a className="px-[7px] py-[4px] text-sm" href="/t/webdev">
                #webdev
              </a>
              <a className="px-[7px] py-[4px] text-sm" href="/t/programming">
                #programming
              </a>
            </div>
            <div className="flex w-full flex-row items-center">
              <div className="flex flex-row items-center">
                <a className="items-center py-1 pl-2 pr-3 text-sm">
                  <span>💖🦄🤯👏🔥</span>
                  <span className="ml-[14px] text-gray-500">190 reactions</span>
                </a>
                <a className="flex flex-row items-center py-1 pl-2 pr-3 text-sm">
                  <div className="mr-1 flex h-6 w-6 flex-row items-center">
                    <TfiComment className="h-4 w-4" />
                  </div>
                  <span className="text-gray-500">19 comments</span>
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
      ))}
    </div>
  );
  // console.table(allPosts);
  // const countPosts = allPosts?.length;
  // console.log(countPosts);
}
