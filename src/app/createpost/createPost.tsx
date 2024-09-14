"use client";

import { useState } from "react";
import { api } from "src/trpc/react";
import React from "react";
// import { LatestPost } from "src/app/_components/post";
import { IoIosClose } from "react-icons/io";
import { RiListOrdered } from "react-icons/ri";
import { RiBold } from "react-icons/ri";
import { RiItalic } from "react-icons/ri";
import { RiLink } from "react-icons/ri";
import { RiListUnordered } from "react-icons/ri";
import { RiHeading } from "react-icons/ri";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiCodeFill } from "react-icons/ri";
import { RiCodeBlock } from "react-icons/ri";
import { RxLightningBolt } from "react-icons/rx";
import { RiImageFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

// export const AllPosts = () => {
//   const { data: allPosts } = api.post.findMany.useQuery(); // Destructure to get data
//   // display all posts in div
//   return (
//     <div>
//       {allPosts?.map((post) => (
//         <div key={post.id}>
//           <div>{post.name}</div>
//           <div>{post.content}</div>
//         </div>
//       ))}
//     </div>
//   );
//   // console.table(allPosts);
//   // const countPosts = allPosts?.length;
//   // console.log(countPosts);
// }


const CreatePost = () => {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [id] = useState(0);
  
  // const savePost = api.post.create.useMutation({
  //   onSuccess: async () => {
  //     await utils.post.invalidate();
  //   },
  // });

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      setContent("");
      setTags([]);
    },
  });

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
          <a className="h-[40px] w-[40px] items-center" href="/">
            <IoIosClose size={40} />
          </a>
        </div>
        <div className="col-span-1 col-start-1 row-start-2 flex flex-grow flex-col items-center bg-white sm:col-span-3 md:col-span-2 md:rounded-md md:border-[1.5px] lg:col-span-1 lg:col-start-2">
          <div className="flex w-full flex-col px-3 py-8 md:px-12 lg:px-16">
            <div className="mb-[20px] flex flex-col">
              <button className="w-fit justify-start rounded-md border-[2px] border-gray-300 px-[14px] py-[6px]">
                Add a cover image
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="New post title here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[60px] w-full resize-none border-gray-300 text-3xl font-bold leading-[60px] focus:outline-none md:text-4xl lg:text-5xl"
              ></input>
            </div>
            <div className="relative flex h-9 w-full">
              <ul>
                <li>
                  <input
                    className="h-9 w-full focus:outline-none"
                    placeholder="Add up to 4 tags..."
                    type="text"
                    value={tags.join(' ')}
                    onChange={(e) => setTags(e.target.value.split(' '))}
                    onKeyDown={(e) => {
                      if (e.key === 'Space') {
                        e.preventDefault();
                        const newTag = tags.join(' ').trim();
                        if (!tags.includes(newTag)) {
                          setTags([...tags, newTag]);
                        }
                        setTags([...tags, ]);
                      }
                    }}
                  >
                  </input>
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
              className="w-full resize-none items-start font-mono focus:outline-none md:min-h-[189px] break-words whitespace-pre-wrap"
            ></textarea>
          </div>
        </div>
        <div className="row-start-2 hidden h-full flex-col justify-between sm:col-span-1 sm:col-start-3 md:flex">
          <div className="flex-grow"></div>
          <div className="items-end">
            <h4 className="mb-2 text-lg font-bold">Publishing Tips</h4>
            <ul className="mb-2 list-disc items-end pl-6 text-sm text-gray-500">
              <li>
                Ensure your post has a cover image set to make the most of the
                home feed and social media platforms.
              </li>
              <li>
                Share your post on social media platforms or with your
                co-workers or local communities.
              </li>
              <li>
                Ask people to leave questions for you in the comments. It&apos;s
                a great way to spark additional discussion describing personally
                why you wrote it or why people might find it helpful.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-start-1 flex h-[56px] flex-row items-center justify-start px-2 md:col-span-2 md:h-[72px] lg:h-[88px]">
          <button
            onClick={(e) => {
              e.preventDefault();
              createPost.mutate({ name, content, tags, id});
            }}
            className="mr-2 flex h-[40px] min-w-min items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-white"
            type="submit"
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Publishing..." : "Publish"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              createPost.mutate({ name, content, tags, id });
            }}
            className="mr-2 flex h-[40px] items-center justify-center whitespace-nowrap rounded-md px-4 py-2"
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Saving..." : "Save draft"}
          </button>
        </div>
      </div>
      {/* {latestPost ? (
        <p className="truncate">
          Your most recent post: {latestPost.name}. Your content is{" "}
          {latestPost.content}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )} */}
    </div>
  );
};

export default CreatePost;
