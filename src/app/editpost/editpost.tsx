"use client";

import { useState } from "react";
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
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type UploadState = {
  status: "success" | "error";
  message: string;
};

const initialState: UploadState = { status: "success", message: "" };

export default function EditPost({ post }: { post: Post }) {
  const utils = api.useUtils();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImageUrl] = useState(post.image ?? null);
  const [state, setState] = useState<UploadState>(initialState);

  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  const [name, setName] = useState(post.name);

  useEffect(() => {
    setName(post.name);
  }, [post.name]);

  const [tags, setTags] = useState<string[]>(post.tags);
  useEffect(() => {
    setTags(post.tags);
  }, [post.tags]);

  // Handle file input change in HTML
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile); // set file

    if (selectedFile) {
      // if file exists
      const formData = new FormData();
      formData.append("file", selectedFile);

      // upload file to S3
      const result = await uploadFile(formData, state);
      if (typeof result === "string") {
        // if successful, we get URL
        setImageUrl(result);
        // setState({ status: "success", message: "Image uploaded successfully." });
      } else {
        // setState({ status: "error", message: result.message ?? "Failed to upload image." });
      }
    }
  };

  const router = useRouter();
  // create post, set create post page to empty after done
  const editPost = api.post.edit.useMutation({
    onSuccess: async (data) => {
      await utils.post.invalidate();
      //   setName("");
      //   setContent("");
      //   setTags([]);
      //   setImageUrl("");
      // setState({ status: "success", message: "Post created successfully." });
      const postSlug = data.id;
      await router.push(`/post/${postSlug}`);
    },
    // onError: (error) => {
    // setState({ status: "error", message: error.message ?? "Failed to create post." });
    // },
  });

  const handleEditPost = (postId: number) => {
    editPost.mutate({
      id: postId,
      name,
      content,
      tags,
      image: image ?? undefined,
    });

    // void editPost.mutate(
    //   { id: postId, name, content, tags, image: image ?? undefined },
    //   {
    // onSuccess: (data) => {
    //   const postSlug = data.id;
    //   router.push(`/post/${postSlug}`);
    // },
    //   },
    // );
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
          <button className="ml-auto mr-1 flex h-[56px] flex-row items-center justify-end p-2">
            Edit
          </button>
          <button className="mx-1 flex h-[56px] flex-row items-center justify-end p-2">
            Preview
          </button>
          <a className="h-[40px] w-[40px] items-center" href="/dashboard">
            <IoIosClose size={40} />
          </a>
        </div>

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
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                // placeholder="New post title here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[60px] w-full resize-none border-gray-300 text-3xl font-bold leading-[60px] focus:outline-none md:text-4xl lg:text-5xl"
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
                <button className="mr-1 w-fit justify-start rounded-md p-2">
                  <RiHeading size={24} />
                </button>
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block">
                  <RiDoubleQuotesL size={24} />
                </button>
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block">
                  <RiCodeFill size={24} />
                </button>
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block">
                  <RiCodeBlock size={24} />
                </button>
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block">
                  <RxLightningBolt size={24} />
                </button>
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 sm:block">
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none items-start whitespace-pre-wrap break-words font-mono focus:outline-none md:min-h-[189px]"
            ></textarea>
          </div>
        </div>

        <div className="col-start-1 flex h-[56px] flex-row items-center justify-start px-2 md:col-span-2 md:h-[72px] lg:h-[88px]">
          <button
            onClick={(e) => handleEditPost(post.id)}
            className="mr-2 flex h-[40px] min-w-min items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-white"
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
