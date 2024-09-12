"use client";

import React from "react";
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

const createPost = () => {
  return (
    <div>
      <div className="mx-auto grid h-screen max-w-[1380px] grid-cols-1 grid-rows-[min-content,1fr,min-content] flex-col sm:grid-cols-[64px,7fr,3fr] md:px-2 sm:gap-x-2 lg:gap-x-4 lg:px-4">
        <div className="row-start-1 col-start-1 flex h-[56px] flex-row sm:col-end-3 items-center">
          <div className="hidden h-[56px] items-center md:flex">
            <img src="/images/logo.png" alt="logo" className="mr-4 w-[50px]" />
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
          <button className="h-[40px] w-[40px] items-center">
            <IoIosClose size={40} />
          </button>
        </div>
        <div className="row-start-2 col-start-1 col-span-1 sm:col-span-2 flex flex-grow flex-col items-center bg-white md:rounded-md md:border-[1.5px] lg:col-start-2 lg:col-span-1">
          <div className="flex w-full flex-col px-3 py-8 md:px-12 lg:px-16">
            <div className="mb-[20px] flex flex-col">
              <button className="w-fit justify-start border-gray-300 px-[14px] py-[6px] rounded-md border-[2px]">
                Add a cover image
              </button>
            </div>
            <div className="flex items-center">
              <textarea
                className="h-[60px] w-full border-gray-300 text-3xl font-bold leading-[60px] md:text-4xl lg:text-5xl"
                placeholder="New post title here..."
              ></textarea>
            </div>
            <div className="relative flex h-9 w-full">
              <input
                className="h-9 w-full"
                placeholder="Add up to 4 tags..."
              ></input>
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
                <button className="mr-1 hidden w-fit justify-start rounded-md p-2 md:block">
                  <RiImageFill size={24} />
                </button>
                <button className="ml-auto mr-1 w-fit justify-end rounded-md p-2">
                  <BsThreeDotsVertical size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-grow flex-col px-3 md:px-12 lg:px-16 items-start">
            <textarea
              className="md:min-h-[189px] w-full font-mono items-start"
              placeholder="Write your post content here..."
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
                Ask people to leave questions for you in the comments. It's a
                great way to spark additional discussion describing personally
                why you wrote it or why people might find it helpful.
              </li>
            </ul>
          </div>
        </div>
        <div className="px-2 col-span-1 col-start-1 flex h-[56px] md:h-[72px] lg:h-[88px] flex-row items-center justify-start md:col-start-1 md:col-span-2">
          <button className="mr-2 flex h-[40px] min-w-min items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white">
            Publish
          </button>
          <button className="mr-2 flex h-[40px] min-w-min items-center justify-center rounded-md px-4 py-2">
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default createPost;
