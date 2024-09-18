"use client";

import Header from "../header/header";

import { RiHeartAddLine } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { RiChat1Line } from "react-icons/ri";
import { PostExport } from "src/type";

export default function PostPage({ post }: { post: PostExport }) {
  return (
    <div className="">
      <Header />
      <div className="mt-[56px] sm:grid sm:grid-cols-[64px,1fr] sm:gap-2 sm:px-3 sm:pt-3">
        <div className="hidden sm:col-start-1 sm:flex sm:flex-col">
          <div className="mt-20 h-[277px] w-full">
            <div className="h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiHeartAddLine className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">67</span>
              </div>
            </div>
            <div className="h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiChat1Line className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">6</span>
              </div>
            </div>
            <div className="h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiBookmarkLine className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">100</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white sm:col-start-2 sm:rounded-md">
          {post.image && (
            <div className="h-[157.5px] w-full sm:h-[304px]">
              <img
                src={post.image}
                alt="Post image"
                className="h-full w-full object-cover sm:rounded-t-md"
              />
            </div>
          )}
          <div className="mb-5 p-3 sm:px-12 sm:pt-8">
            <div className="flex flex-row items-center">
              <div className="mr-2 h-10 w-10 overflow-hidden rounded-full">
                <a href="/">
                  <img
                    src={post.createdBy.image ?? "/images/avatar.png"}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </a>
              </div>
              <div className="flex h-[42px] flex-col justify-start pl-3 align-middle">
                <div className="mb-1 h-[19px] text-base font-bold">
                  {post.createdBy.name}
                </div>
                <div className="h-[18px] text-xs text-gray-500">
                  Published on{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2 items-center text-3xl font-bold sm:mt-3">
                {post.name}
              </div>
              <div className="flex h-[32px] w-full flex-row items-center justify-start">
                {post.tags.map((tag) => (
                  <div className="px-2 py-1">{tag}</div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full p-3">{post.content}</div>
              <div className="w-full border-t-[1px] border-gray-300 p-3">
                <div className="mb-6 flex w-full text-xl font-bold">
                  Top Comments (0)
                </div>
                <div className="mb-4 flex w-full flex-row">
                  <div className="mr-2 h-6 w-6 overflow-hidden rounded-full">
                    <a href="/">
                      <img
                        src="/images/avatar.png"
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="h-[64px] w-[317px] rounded-md border-[1px] border-gray-300 bg-white p-2 sm:w-full">
                    <input className="h-full w-full"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
