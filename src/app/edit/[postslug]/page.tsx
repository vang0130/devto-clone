"use client";
import EditPost from "../../editpost/editpost";
import { api } from "src/trpc/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Header from "src/app/header/header";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
export default function Page({ params }: { params: { postslug: string } }) {
  const postId = Number(params.postslug);
  const { data: post, isLoading } = api.post.getPost.useQuery({ id: postId });

  if (isLoading || !post) {
    return (
      <div className="mx-auto max-w-[1380px]">
        <SkeletonLoader />
      </div>
    );
  }

  return <EditPost post={post} />;
}

function SkeletonLoader() {
  return (
    <div>
      {/* <Header /> */}
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
              <div className="h-[40px] w-[174px] animate-pulse rounded-md bg-gray-200" />
            </div>

            <div className="flex items-center">
              <div className="h-[60px] w-4/5 animate-pulse rounded-md bg-gray-200" />
            </div>

            <div className="relative mt-4 flex h-9 w-full">
              <div className="h-[40px] w-1/2 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="flex w-full flex-col px-3 md:px-12 lg:px-16">
            <div className="relative mb-[24px] ml-[-64px] mr-[-12px] flex h-14 items-center bg-gray-100 py-2 pl-16 md:mr-[-64px] md:pr-16"></div>
          </div>

          <div className="flex w-full flex-grow flex-col px-3 pb-3 md:px-12 md:pb-8 lg:px-16">
            <div className="md:min-h-[189px]" />
          </div>
        </div>

        {/* <div className="col-start-1 flex h-[56px] flex-row items-center justify-start px-2 md:col-span-2 md:h-[72px] lg:h-[88px]">
          <div className="mr-2 h-[40px] w-[150px] animate-pulse bg-gray-200" />
        </div> */}

        <div className="col-start-1 flex h-[56px] flex-row items-center justify-start px-2 md:col-span-2 md:h-[72px] lg:h-[88px]">
          <button className="mr-2 flex h-[40px] min-w-min items-center justify-center whitespace-nowrap rounded-md bg-blue-700 px-4 py-2 text-white">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
