"use client";

import "t3/styles/globals.css";
import Header from "../header/header";

import { RiHeartAddLine } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import type { PostExport } from "src/type";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import { api } from "src/trpc/react";
import { useState } from "react";

export default function PostPage({ post }: { post: PostExport }) {
  const { data: session } = useSession();

  const utils = api.useUtils();

  const [content, setContent] = useState("");

  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      setContent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    createComment.mutate(
      { content, name: content, postId: post.id },
      // {
      //   onSuccess: (data) => {
      //     const postSlug = data.id;
      //     router.push(`/post/${postSlug}`);
      // },
      // },
    );
  };

  return (
    <div className="mx-auto max-w-[1380px]">
      <Header />
      <div className="mt-[56px] sm:grid sm:grid-cols-[64px,1fr] sm:gap-2 sm:px-2 sm:pt-2 lg:grid lg:grid-cols-[64px,7fr,3fr] lg:gap-4 lg:p-4">
        <div className="hidden sm:col-start-1 sm:flex sm:flex-col">
          <div className="h-[277px] w-full text-sm sm:mt-12 lg:mt-8">
            <div className="h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiHeartAddLine className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">67</span>
              </div>
            </div>
            <div className="mt-3 h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiChat1Line className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">6</span>
              </div>
            </div>
            <div className="mt-3 h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiBookmarkLine className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">100</span>
              </div>
            </div>
            <div className="mt-3 h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <BsThreeDots className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white sm:col-start-2 sm:rounded-md">
          {post.image && (
            <div className="h-[157.5px] sm:h-[304px]">
              <img
                src={post.image}
                alt="Post image"
                className="h-full w-full object-cover sm:rounded-t-md"
              />
            </div>
          )}
          <div className="mb-5 bg-white p-3 sm:rounded-md sm:px-12 sm:pt-8">
            <div className="flex flex-row items-center">
              <div className="mr-2 h-10 w-10 overflow-hidden rounded-full">
                <a href={`/user/${post.createdBy.id}`}>
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
                  <div key={tag} className="px-2 py-1">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="m-0 flex h-full flex-col bg-white text-black">
              <div className="markdown-body markdown-content m-0 h-full bg-white">
                <ReactMarkdown className="markdown-content">
                  {post.content}
                </ReactMarkdown>
              </div>
              <div className="w-full border-t-[1px] border-gray-300 p-3">
                <div className="mb-6 flex w-full text-xl font-bold">
                  Top Comments (0)
                </div>
                <div className="mb-4 flex flex-row">
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <a href={`/user/${post.createdBy.id}`}>
                      <img
                        src={session?.user?.image ?? "/images/avatar.png"}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="ml-2 h-[64px] w-full rounded-md border-[1px] border-gray-300 bg-white p-2">
                      <input
                        className="h-full w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></input>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="ml-auto mr-[-8px] mt-2 items-center justify-center rounded-md bg-blue-700 px-6 py-2 text-center text-sm text-white"
                      disabled={createComment.isPending}
                    >
                      {createComment.isPending ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:col-start-3 lg:flex">
          <div className="z-0 col-start-3 h-[32px] w-full rounded-t-md bg-black">
            <div className="h-content mt-[32px] rounded-b-md border-gray-300 bg-white">
              <div className="absolute z-10 mt-[-16px] flex flex-row overflow-hidden px-4">
                <a href={`/user/${post.createdBy.id}`}>
                  <img
                    src={post.createdBy.image ?? "images/avatar.png"}
                    alt="profile"
                    className="h-[48px] w-[48px] rounded-full object-cover"
                  />
                </a>
                <div className="ml-2 mt-[20px] text-xl font-bold">
                  {post.createdBy.name}
                </div>
              </div>
              <div className="h-[50px]"></div>
              <div className="relative col-span-1 col-start-3 h-[40px] px-4">
                <button className="h-full w-full rounded-md bg-blue-600 text-white">
                  Follow
                </button>
              </div>
              <div className="mt-4 px-4 text-gray-500">
                {post.createdBy.bio && post.createdBy.bio.length > 0
                  ? post.createdBy.bio
                  : "404 bio not found"}
              </div>
              <div className="mt-4 flex w-full flex-col px-4 pb-4">
                <div className="h-[18px] text-xs font-bold text-gray-500">
                  JOINED
                </div>
                <div className="h-[24px] text-gray-500">
                  {new Date(post.createdBy.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
