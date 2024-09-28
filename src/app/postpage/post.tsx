"use client";

import "t3/styles/globals.css";
import Header from "../header/header";

import { RiHeartAddLine } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
// import type { PostExport } from "src/type";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import { api } from "src/trpc/react";
import { useState } from "react";
import { RiHeart2Line } from "react-icons/ri";
import {
  RiListOrdered,
  RiBold,
  RiItalic,
  RiLink,
  RiListUnordered,
  RiHeading,
  RiDoubleQuotesL,
  RiCodeFill,
  RiCodeBlock,
  RiImageFill,
} from "react-icons/ri";
import { RxLightningBolt } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Comment, Post, User } from "next-auth";

export default function PostPage({ post }: { post: Post }) {
  const { data: session } = useSession();

  const utils = api.useUtils();

  const [content, setContent] = useState("");

  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const [replyFocus, setReplyFocus] = useState(false);
  const [activeReplyParentId, setActiveReplyParentId] = useState<number | null>(
    null,
  );

  const handleReplyFocus = (parentId: number) => {
    setActiveReplyParentId(parentId);
    setReplyFocus(replyFocus ? false : true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate({ content, name: content, postId: post.id });
  };
  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      setContent("");
      setFocused(false);
    },
  });

  const [replyContent, setReplyContent] = useState("");

  const createReply = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.invalidate();
      setReplyContent("");
      setReplyFocus(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    createReply.mutate({
      content: replyContent,
      name: replyContent,
      postId: post.id,
      parentId,
    });
  };

  const { data: comments, isLoading: isLoadingComments } =
    api.comment.getPostComments.useQuery({
      postId: post.id,
    });

  // console.table(comments);

  const { data: reactions } = api.reaction.getPostReactions.useQuery({
    postId: post.id,
  });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const createReaction = api.reaction.create.useMutation({
    onSuccess: async () => {
      await utils.reaction.invalidate();
    },
  });

  const deleteReaction = api.reaction.delete.useMutation({
    onSuccess: async () => {
      await utils.reaction.invalidate();
    },
  });
  const { data: existingReactions, isLoading } =
    api.reaction.getUserReactions.useQuery({
      postId: post.id,
    });

  const handleToggleReaction = (
    emoji: "HEART" | "UNICORN" | "SURPRISE" | "CLAP" | "FIRE",
  ) => {
    if (isLoading) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const reactionExists = existingReactions?.length
      ? existingReactions.some((reaction) => reaction.emoji === emoji)
      : false;
    if (reactionExists) {
      deleteReaction.mutate({ postId: post.id, emoji });
    } else {
      createReaction.mutate({ postId: post.id, emoji });
    }
  };

  const renderComments = (commentsRendered: Comment[]) => {
    return commentsRendered.map((comment) => (
      <div key={comment.id} className="flex flex-col">
        <div className="mb-4 flex flex-row">
          <div className="mt-4 h-6 w-6 overflow-hidden rounded-full">
            <a href={`/user/${comment.createdBy?.id}`}>
              <img
                src={comment.createdBy?.image ?? "/images/avatar.png"}
                className="h-full w-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-grow flex-col">
            <div className="ml-2 flex flex-grow flex-col rounded-md border-[1px] border-gray-300 p-1">
              <div className="flex h-[40px] flex-row items-center px-3 pt-2 text-center align-middle">
                <div className="h-[21px] text-sm text-gray-500">
                  {comment.createdBy?.name}
                </div>
                <div className="flex h-[21px] justify-center px-2 text-center align-middle text-base text-gray-500">
                  ·
                </div>
                <div className="h-[21px] text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="mb-4 mt-2 bg-white px-3">
                <p className="min-h-[24px] w-full resize-none text-start align-top focus:outline-none">
                  {comment.content}
                </p>
              </div>
            </div>
            {replyFocus && activeReplyParentId === comment.id ? (
              <div className="mb-4 flex flex-grow flex-col pt-4">
                <div className="h-[171.5px]">
                  <div className="ml-2 h-[130.5px] rounded-t-md border-[1px] border-gray-300 bg-white p-2">
                    <textarea
                      className="h-full w-full resize-none text-start align-top focus:outline-none"
                      value={replyContent}
                      placeholder="Reply..."
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                  </div>
                  <div className="ml-2 h-[41px] rounded-b-md border-b-[1px] border-l-[1px] border-r-[1px] border-gray-300">
                    <div className="flex w-full flex-row items-center">
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiBold size={24} />
                      </button>
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiItalic size={24} />
                      </button>
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiLink size={24} />
                      </button>
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiListOrdered size={24} />
                      </button>
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiListUnordered size={24} />
                      </button>
                      <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                        <RiHeading size={24} />
                      </button>
                      <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                        <RiDoubleQuotesL size={24} />
                      </button>
                      <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                        <RiCodeFill size={24} />
                      </button>
                      <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                        <RiCodeBlock size={24} />
                      </button>
                      <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                        <RxLightningBolt size={24} />
                      </button>
                      <button className="mr-1 w-fit justify-start rounded-md p-2">
                        <RiImageFill size={24} />
                      </button>
                      <button className="ml-auto mr-1 w-fit justify-end rounded-md p-2">
                        <BsThreeDotsVertical size={24} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <button
                    type="submit"
                    onClick={(e) => handleReplySubmit(e, comment.id)}
                    className="ml-2 mr-2 mt-3 items-center justify-start rounded-md bg-blue-700 px-4 py-2 text-center text-base text-white"
                    disabled={createReply.isPending}
                  >
                    {createReply.isPending ? "Submitting..." : "Submit"}
                  </button>
                  <button className="mt-3 items-center justify-start rounded-md bg-gray-300 px-4 py-2 text-center text-base text-gray-600">
                    Preview
                  </button>
                  <button
                    className="ml-2 mt-3 items-center justify-start rounded-md px-4 py-2 text-center text-base"
                    onClick={() => handleReplyFocus(comment.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-1 flex flex-row items-center pt-1 text-center">
                <div className="mr-1 flex h-[24px] flex-row items-center justify-center py-1 pl-2 pr-3 align-middle">
                  <RiHeart2Line className="my-auto mr-1 flex h-5 w-5 justify-center text-center align-middle" />
                  <div className="my-auto flex h-[24px] justify-center text-center align-middle text-sm md:hidden">
                    1
                  </div>
                  <div className="my-auto hidden h-[24px] justify-center text-center align-middle text-sm md:flex">
                    0 likes
                  </div>
                </div>
                <div className="mr-1 flex h-[24px] flex-row items-center justify-center py-1 pl-2 pr-3 align-middle">
                  <button onClick={() => handleReplyFocus(comment.id)}>
                    <RiChat1Line className="my-auto mr-1 flex h-5 w-5 justify-center text-center align-middle" />
                  </button>
                  <div className="my-auto hidden h-[24px] justify-center text-center align-middle text-sm md:flex">
                    Reply
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {comment.children && comment.children.length > 0 && (
          <div className="ml-10 mt-2">{renderComments(comment.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="mx-auto max-w-[1380px]">
      <Header />
      <div className="mt-[56px] md:grid md:grid-cols-[64px,1fr] md:gap-2 md:px-2 md:pt-2 lg:grid lg:grid-cols-[64px,7fr,3fr] lg:gap-4 lg:p-4">
        <div className="hidden md:col-start-1 md:flex md:flex-col">
          <div className="h-[277px] w-full text-sm md:mt-12 lg:mt-8">
            <div className="h-[70px] w-full">
              <div className="relative inline-block w-full items-center justify-center align-middle">
                <div
                  className="flex items-center justify-center p-2 align-middle"
                  onMouseEnter={() => setIsDrawerVisible(true)}
                  onMouseLeave={() => setIsDrawerVisible(false)}
                >
                  <RiHeartAddLine className="h-6 w-6" />
                </div>
                {isDrawerVisible && (
                  <div
                    className="absolute left-[55px] top-[-5px] z-10 flex h-[97px] w-[322px] items-center justify-around rounded-[32px] bg-white p-3 shadow-md"
                    onMouseEnter={() => setIsDrawerVisible(true)}
                    onMouseLeave={() => setIsDrawerVisible(false)}
                  >
                    <button
                      type="submit"
                      onClick={() => handleToggleReaction("HEART")}
                    >
                      <div className="h-[73px] w-[50px] cursor-pointer rounded-[20px] px-2 pb-1 pt-2 hover:bg-gray-100">
                        <span
                          role="img"
                          aria-label="heart"
                          className="flex cursor-pointer items-center justify-center text-center align-middle text-3xl"
                        >
                          💖️
                        </span>
                        <p className="flex items-center justify-center text-center align-middle text-base">
                          {reactions?.filter(
                            (reaction) => reaction.emoji === "HEART",
                          ).length ?? 0}
                        </p>
                      </div>
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleToggleReaction("UNICORN")}
                    >
                      <div className="h-[73px] w-[50px] cursor-pointer rounded-[20px] px-2 pb-1 pt-2 hover:bg-gray-100">
                        <span
                          role="img"
                          aria-label="heart"
                          className="flex cursor-pointer items-center justify-center text-center align-middle text-3xl"
                        >
                          🦄
                        </span>
                        <p className="flex items-center justify-center text-center align-middle text-base">
                          {reactions?.filter(
                            (reaction) => reaction.emoji === "UNICORN",
                          ).length ?? 0}
                        </p>
                      </div>
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleToggleReaction("FIRE")}
                    >
                      <div className="h-[73px] w-[50px] cursor-pointer rounded-[20px] px-2 pb-1 pt-2 hover:bg-gray-100">
                        <span
                          role="img"
                          aria-label="heart"
                          className="flex cursor-pointer items-center justify-center text-center align-middle text-3xl"
                        >
                          🔥
                        </span>
                        <p className="flex items-center justify-center text-center align-middle text-base">
                          {reactions?.filter(
                            (reaction) => reaction.emoji === "FIRE",
                          ).length ?? 0}
                        </p>
                      </div>
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleToggleReaction("CLAP")}
                    >
                      <div className="h-[73px] w-[50px] cursor-pointer rounded-[20px] px-2 pb-1 pt-2 hover:bg-gray-100">
                        <span
                          role="img"
                          aria-label="heart"
                          className="flex cursor-pointer items-center justify-center text-center align-middle text-3xl"
                        >
                          👏
                        </span>
                        <p className="flex items-center justify-center text-center align-middle text-base">
                          {reactions?.filter(
                            (reaction) => reaction.emoji === "CLAP",
                          ).length ?? 0}
                        </p>
                      </div>
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleToggleReaction("SURPRISE")}
                    >
                      <div className="h-[73px] w-[50px] cursor-pointer rounded-[20px] px-2 pb-1 pt-2 hover:bg-gray-100">
                        <span
                          role="img"
                          aria-label="heart"
                          className="flex cursor-pointer items-center justify-center text-center align-middle text-3xl"
                        >
                          🤯
                        </span>
                        <p className="flex items-center justify-center text-center align-middle text-base">
                          {reactions?.filter(
                            (reaction) => reaction.emoji === "SURPRISE",
                          ).length ?? 0}
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">
                  {reactions?.length ?? 0}
                </span>
              </div>
            </div>
            <div className="mt-3 h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiChat1Line className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">
                  {comments?.length ?? 0}
                </span>
              </div>
            </div>
            <div className="mt-3 h-[70px] w-full">
              <div className="flex items-center justify-center p-2 align-middle">
                <RiBookmarkLine className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center align-middle">
                <span className="text-s text-gray-500">0</span>
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
            <div className="flex h-[62px] flex-row">
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
            <div className="flex h-[40px] w-full max-w-[375px] flex-row justify-between py-2">
              <div className="flex h-[24px] items-center pr-4 text-start align-middle">
                <span
                  role="img"
                  aria-label="heart"
                  className="flex cursor-pointer items-center justify-center pr-[6px] text-center align-middle text-2xl"
                >
                  💖️
                </span>
                <p className="flex items-center justify-center text-center align-middle text-lg">
                  {
                    reactions?.filter((reaction) => reaction.emoji === "HEART")
                      .length
                  }
                </p>
              </div>
              <div className="flex h-[24px] items-center pr-4 text-center align-middle">
                <span
                  role="img"
                  aria-label="heart"
                  className="flex cursor-pointer items-center justify-center pr-[6px] text-center align-middle text-2xl"
                >
                  🦄
                </span>
                <p className="flex items-center justify-center text-center align-middle text-lg">
                  {
                    reactions?.filter(
                      (reaction) => reaction.emoji === "UNICORN",
                    ).length
                  }
                </p>
              </div>
              <div className="flex h-[24px] items-center pr-4 text-center align-middle">
                <span
                  role="img"
                  aria-label="heart"
                  className="flex cursor-pointer items-center justify-center pr-[6px] text-center align-middle text-2xl"
                >
                  🔥
                </span>
                <p className="flex items-center justify-center text-center align-middle text-lg">
                  {
                    reactions?.filter((reaction) => reaction.emoji === "FIRE")
                      .length
                  }
                </p>
              </div>
              <div className="flex h-[24px] items-center pr-4 text-center align-middle">
                <span
                  role="img"
                  aria-label="heart"
                  className="flex cursor-pointer items-center justify-center pr-[6px] text-center align-middle text-2xl"
                >
                  👏
                </span>
                <p className="flex items-center justify-center text-center align-middle text-lg">
                  {
                    reactions?.filter((reaction) => reaction.emoji === "CLAP")
                      .length
                  }
                </p>
              </div>
              <div className="flex h-[24px] items-center justify-center pr-4 text-center align-middle">
                <span
                  role="img"
                  aria-label="heart"
                  className="flex cursor-pointer items-center justify-center pr-[6px] text-center align-middle text-2xl"
                >
                  🤯
                </span>
                <p className="flex items-center justify-center text-center align-middle text-lg">
                  {
                    reactions?.filter(
                      (reaction) => reaction.emoji === "SURPRISE",
                    ).length
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2 items-center text-3xl font-bold">
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
              <div className="w-full border-t-[1px] border-gray-300">
                <div className="mb-6 flex h-[54px] w-full flex-row text-center align-middle">
                  <div className="my-auto flex text-xl font-bold">
                    Top Comments (0)
                  </div>
                </div>
                {isFocused ? (
                  <div className="mb-4 flex flex-row">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <a href={`/user/${session?.user?.id}`}>
                        <img
                          src={session?.user?.image ?? "/images/avatar.png"}
                          alt="logo"
                          className="h-full w-full object-cover"
                        />
                      </a>
                    </div>
                    <div className="flex flex-grow flex-col">
                      <div className="h-[171.5px]">
                        <div className="ml-2 h-[130.5px] rounded-t-md border-[1px] border-gray-300 bg-white p-2">
                          <textarea
                            className="h-full w-full resize-none text-start align-top focus:outline-none"
                            value={content}
                            placeholder="Add to the discussion"
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={handleFocus}
                          />
                        </div>
                        <div className="ml-2 h-[41px] rounded-b-md border-b-[1px] border-l-[1px] border-r-[1px] border-gray-300">
                          <div className="flex w-full flex-row items-center">
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiBold size={24} />
                            </button>
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiItalic size={24} />
                            </button>
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiLink size={24} />
                            </button>
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiListOrdered size={24} />
                            </button>
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiListUnordered size={24} />
                            </button>
                            <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                              <RiHeading size={24} />
                            </button>
                            <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                              <RiDoubleQuotesL size={24} />
                            </button>
                            <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                              <RiCodeFill size={24} />
                            </button>
                            <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                              <RiCodeBlock size={24} />
                            </button>
                            <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                              <RxLightningBolt size={24} />
                            </button>
                            <button className="mr-1 w-fit justify-start rounded-md p-2">
                              <RiImageFill size={24} />
                            </button>
                            <button className="ml-auto mr-1 w-fit justify-end rounded-md p-2">
                              <BsThreeDotsVertical size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="ml-2 mr-2 mt-3 items-center justify-start rounded-md bg-blue-700 px-4 py-2 text-center text-base text-white"
                          disabled={createComment.isPending}
                        >
                          {createComment.isPending ? "Submitting..." : "Submit"}
                        </button>
                        <button className="mt-3 items-center justify-start rounded-md bg-gray-300 px-4 py-2 text-center text-base text-gray-600">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex flex-row">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <a href={`/user/${session?.user?.id}`}>
                        <img
                          src={session?.user?.image ?? "/images/avatar.png"}
                          alt="logo"
                          className="h-full w-full object-cover"
                        />
                      </a>
                    </div>
                    <div className="flex flex-grow flex-col">
                      <div className="ml-2 h-[64px] rounded-md border-[1px] border-gray-300 bg-white p-2">
                        <textarea
                          className="h-full w-full resize-none text-start align-top focus:outline-none"
                          value={content}
                          placeholder="Add to the discussion"
                          onChange={(e) => setContent(e.target.value)}
                          onFocus={handleFocus}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isLoadingComments ? (
              <SkeletonLoader />
            ) : (
              <div>
                {comments ? (
                  renderComments(
                    comments.filter(
                      (comment) => comment.parentId === null,
                    ) as Comment[],
                  )
                ) : (
                  <div />
                )}
              </div>
            )}
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

function SkeletonLoader() {
  return (
    <div className="">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-4 flex flex-row">
          <div className="mt-4 h-6 w-6 animate-pulse overflow-hidden rounded-full bg-gray-200"></div>
          <div className="flex flex-grow flex-col">
            <div className="ml-2 flex flex-grow flex-col rounded-md border-[1px] border-gray-300 p-1">
              <div className="flex h-[40px] flex-row items-center px-3 pt-2 text-center align-middle">
                <div className="h-[21px] w-[80px] animate-pulse rounded-md bg-gray-200 text-sm text-gray-500">
                  {/* {comment.createdBy.name} */}
                </div>
                <div className="flex h-[21px] justify-center px-2 text-center align-middle text-base text-gray-500">
                  ·
                </div>
                <div className="h-[21px] w-[80px] animate-pulse rounded-md bg-gray-200 text-sm text-gray-500">
                  {/* {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })} */}
                </div>
              </div>
              <div className="mb-4 mt-2 bg-white px-3">
                <p className="min-h-[24px] w-full animate-pulse resize-none rounded-md bg-gray-200 text-start align-top focus:outline-none">
                  {/* {comment.content} */}
                </p>
              </div>
            </div>
            <div className="ml-1 flex flex-row items-center pt-1 text-center">
              <div className="mr-4 flex h-[24px] w-[60px] animate-pulse flex-row items-center justify-center rounded-md bg-gray-200 py-1 pl-2 pr-3 align-middle"></div>
              <div className="mr-1 flex h-[24px] w-[60px] animate-pulse flex-row items-center justify-center rounded-md bg-gray-200 py-1 pl-2 pr-3 align-middle"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
