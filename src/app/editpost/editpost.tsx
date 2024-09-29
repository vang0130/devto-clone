"use client";

import { useState, useRef } from "react";
import { api } from "src/trpc/react";
import React from "react";
import { IoIosClose } from "react-icons/io";
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
import Image from "next/image";
import { uploadFile } from "../upload/action";
import type { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

type UploadState = {
  status: "success" | "error";
  message: string;
};

const initialState: UploadState = { status: "success", message: "" };

export default function EditPost({ post }: { post: Post }) {
  const utils = api.useUtils();
  const [content, setContent] = useState(post.content);
  const [name, setName] = useState(post.name);
  const [tags, setTags] = useState<string[]>(post.tags);

  // image upload
  const [image, setImageUrl] = useState(post.image ?? null);
  const [state, setState] = useState<UploadState>(initialState);

  // handle preview mode
  const [isPreview, setPreview] = useState(false);

  // set new value of content whenever user types
  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  useEffect(() => {
    setName(post.name);
  }, [post.name]);

  useEffect(() => {
    setTags(post.tags);
  }, [post.tags]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (selectedFile) {
      // if file exists
      const formData = new FormData();
      formData.append("file", selectedFile);

      // upload file to S3
      const result = await uploadFile(formData, state);
      if (typeof result === "string") {
        // if successful, we get URL
        setImageUrl(result);
      } else {
      }
    }
  };

  const router = useRouter();
  // create post, set create post page to empty after done
  const editPost = api.post.edit.useMutation({
    onSuccess: async (data) => {
      await utils.post.invalidate();
      const postSlug = data.id;
      router.push(`/post/${postSlug}`);
    },
  });

  const handleEditPost = (postId: number) => {
    editPost.mutate({
      id: postId,
      name,
      content,
      tags,
      image: image ?? undefined,
    });
  };

  // useRef - persists across re-renders
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // instead markdown at cursor
  const insertMarkdown = (syntax: string, surroundSelected = false) => {
    // get current text in textarea element
    const textarea = textareaRef.current;
    if (!textarea) return;

    // cursor positions
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.slice(start, end);

    let newText: string;
    let newCursorPosition: number;

    // if true
    if (surroundSelected) {
      // add new syntax
      newText = `${textarea.value.slice(0, start)}${syntax}${selectedText}${syntax}${textarea.value.slice(end)}`;
      // new cursor position
      newCursorPosition = end + syntax.length;
    } else {
      newText = `${textarea.value.slice(0, start)}${syntax}${textarea.value.slice(end)}`;
      newCursorPosition = start + syntax.length;
    }

    setContent(newText);

    // reposition cursor
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      textarea.focus();
    }, 0);
  };

  return (
    <div>
      <div className="mx-auto grid h-screen max-w-[1380px] grid-cols-1 grid-rows-[min-content,1fr,min-content] flex-col sm:gap-x-2 sm:px-2 md:grid-cols-[64px,7fr,3fr] lg:gap-x-4 lg:px-4">
        <div className="col-span-1 col-start-1 row-start-1 flex h-[56px] flex-row items-center sm:col-span-2">
          <div className="hidden h-[56px] items-center md:flex">
            <a href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                className="mr-4"
                width={50}
                height={50}
              />
            </a>
          </div>
          <div className="hidden h-[56px] items-center justify-start md:flex">
            <span className="text-md text-center">Create Post</span>
          </div>
          <button
            className="ml-auto mr-1 flex h-[56px] flex-row items-center justify-end p-2"
            onClick={() => setPreview(false)}
          >
            Edit
          </button>
          <button
            className="mx-1 flex h-[56px] flex-row items-center justify-end p-2"
            onClick={() => setPreview(true)}
          >
            Preview
          </button>
          <a className="h-[40px] w-[40px] items-center" href="/dashboard">
            <IoIosClose size={40} />
          </a>
        </div>
        {isPreview ? (
          <div className="col-span-1 col-start-1 row-start-2 flex flex-grow flex-col items-center overflow-y-auto bg-white sm:col-span-3 md:col-span-2 md:rounded-md md:border-[1.5px] lg:col-span-1 lg:col-start-2">
            {image && (
              <div className="aspect-[2/1] w-full sm:rounded-t-md">
                <img
                  src={image}
                  alt="Post image"
                  className="h-full w-full object-cover sm:rounded-t-md"
                />
              </div>
            )}
            <div className="flex w-full flex-grow flex-col bg-white p-8 px-3 py-3 sm:px-12 sm:py-8">
              <h1 className="h-[60px] w-full resize-none border-gray-300 text-3xl font-bold leading-[60px] focus:outline-none md:text-4xl lg:text-5xl">
                {name}
              </h1>
              <div className="mr-auto mt-2 flex">
                {tags.map((tag, index) => (
                  <span key={index} className="text-l mx-1 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex w-full flex-grow flex-col">
                <div className="markdown-body markdown-content">
                  <ReactMarkdown className="markdown-content mt-4">
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-1 col-start-1 row-start-2 flex flex-grow flex-col items-center bg-white sm:col-span-3 md:col-span-2 md:rounded-md md:border-[1.5px] lg:col-span-1 lg:col-start-2">
            <div className="flex w-full flex-col px-3 py-8 md:px-12 lg:px-16">
              <div className="mb-[20px] flex flex-col">
                <label className="w-fit justify-start rounded-md border-[2px] border-gray-300 px-[14px] py-[6px]">
                  Add a cover image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden focus:outline-none"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex flex-row items-center align-middle">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="my-auto flex h-[60px] items-center justify-center border-gray-300 align-middle text-3xl font-bold leading-[60px] focus:outline-none md:text-4xl lg:text-5xl"
                />
              </div>
              <div className="relative flex h-9 w-full">
                <ul>
                  <li>
                    <input
                      className="h-9 w-full focus:outline-none"
                      placeholder="Add up to 4 tags..."
                      type="text"
                      value={tags.join(" ")}
                      onChange={(e) => setTags(e.target.value.split(" "))}
                      onKeyDown={(e) => {
                        if (e.key === "Space") {
                          e.preventDefault();
                          const newTag = tags.join(" ").trim();
                          setTags([...tags, newTag]);
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex w-full flex-col px-3 md:px-12 lg:px-16">
              <div className="relative mb-[24px] ml-[-64px] mr-[-12px] flex h-14 items-center bg-gray-100 py-2 pl-16 md:mr-[-64px] md:pr-16">
                <div className="flex w-full flex-row items-center">
                  <button
                    onClick={() => insertMarkdown("**", true)}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiBold size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("_", true)}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiItalic size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("[text](url)")}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiLink size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("1. ", false)}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiListOrdered size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("- ", false)}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiListUnordered size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("# ", false)}
                    className="mr-1 w-fit justify-start rounded-md p-2"
                  >
                    <RiHeading size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("> ", false)}
                    className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block"
                  >
                    <RiDoubleQuotesL size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("`", true)}
                    className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block"
                  >
                    <RiCodeFill size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("```", true)}
                    className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block"
                  >
                    <RiCodeBlock size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("{% embed  %}")}
                    className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block"
                  >
                    <RxLightningBolt size={24} />
                  </button>
                  <button
                    onClick={() => insertMarkdown("![alt text](image_url)")}
                    className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block"
                  >
                    <RiImageFill size={24} />
                  </button>
                  <button className="ml-auto mr-1 w-fit justify-end rounded-md p-2">
                    <BsThreeDotsVertical size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-grow flex-col px-3 pb-3 md:px-12 md:pb-8 lg:px-16">
              <textarea
                placeholder="Write your post content here..."
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none items-start whitespace-pre-wrap break-words font-mono focus:outline-none md:min-h-[189px]"
              ></textarea>
            </div>
          </div>
        )}

        <div className="col-start-1 flex h-[56px] flex-row items-center justify-start px-2 md:col-span-2 md:h-[72px] lg:h-[88px]">
          <button
            onClick={() => handleEditPost(post.id)}
            className="mr-2 flex h-[40px] min-w-min items-center justify-center whitespace-nowrap rounded-md bg-blue-700 px-4 py-2 text-white"
            type="submit"
            disabled={editPost.isPending}
          >
            {editPost.isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
