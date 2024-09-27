"use client";
import PostPage from "../../postpage/post";
import { api } from "src/trpc/react";
import Header from "src/app/header/header";

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

  return <PostPage post={post} />;
}

function SkeletonLoader() {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1380px] p-2">
        <div className="mt-[56px] sm:grid sm:grid-cols-[64px,1fr] sm:gap-2 lg:grid lg:grid-cols-[64px,7fr,3fr] lg:gap-4 lg:p-4">
          <div className="hidden sm:col-start-1 sm:flex sm:flex-col">
            <div className="h-[277px] w-full animate-pulse rounded-md bg-gray-200 text-sm sm:mt-12 lg:mt-8"></div>
          </div>
          <div className="sm:col-start-2 sm:rounded-md">
            <div className="h-[300px] animate-pulse bg-gray-200 sm:rounded-t-md" />

            <div className="mb-5 bg-white p-3 sm:rounded-b-md sm:px-12 sm:pt-8">
              <div className="flex flex-row items-center">
                <div className="mr-3 h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                <div className="flex flex-col pl-3">
                  <div className="mb-1 h-[16px] w-[80px] animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-[12px] w-[100px] animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <div className="h-[40px] w-4/5 animate-pulse rounded-md bg-gray-200" />
              </div>

              <div className="mt-3 flex h-[32px] w-full flex-row items-center justify-start">
                {Array.from({ length: 1 }).map((_, index) => (
                  <div
                    key={index}
                    className="mr-2 h-[20px] w-[100px] animate-pulse rounded-md bg-gray-200"
                  />
                ))}
              </div>

              <div className="markdown-body markdown-content mt-4">
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
              </div>

              <div className="mt-4 w-full border-t-[1px] border-gray-300 p-3">
                <div className="mb-4 h-[20px] w-[150px] animate-pulse rounded-md bg-gray-200"></div>
                <div className="mt-4 flex flex-row">
                  <div className="mr-2 h-[40px] w-[40px] animate-pulse rounded-full bg-gray-200"></div>
                  <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:col-start-3 lg:flex">
            <div className="z-0 col-start-3 h-[32px] w-full rounded-t-md bg-black">
              <div className="h-content mt-[32px] rounded-b-md border-gray-300 bg-white">
                <div className="absolute z-10 mt-[-16px] flex flex-row overflow-hidden px-4">
                  <div className="mr-2 h-[48px] w-[48px] animate-pulse rounded-full bg-gray-200"></div>
                  <div className="mt-2 h-[20px] w-[100px] animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="h-[50px]"></div>
                <div className="relative col-span-1 col-start-3 h-[40px] px-4">
                  <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="mt-4 px-4 text-gray-500">
                  <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                  <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                  <div className="mb-2 h-[20px] animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="mt-4 flex w-full flex-col px-4 pb-4">
                  <div className="mb-2 h-[15px] w-[60px] animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-[15px] w-[100px] animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
