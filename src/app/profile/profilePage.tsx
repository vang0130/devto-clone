"use client";

import { useSession } from "next-auth/react";
import { BsCake } from "react-icons/bs";
import { LuScrollText } from "react-icons/lu";
import { RiChat1Line } from "react-icons/ri";
import { RiHashtag } from "react-icons/ri";
import { TfiComment } from "react-icons/tfi";
import { api } from "src/trpc/react";
import { UserWithPostsAndComments } from "t3/type";
import Header from "../header/header";

export default function ProfilePage({
  user,
}: {
  user: UserWithPostsAndComments;
}) {
  const { data: session } = useSession();
  const { data: posts } = api.post.getUserPosts.useQuery({ userId: user?.id });

  return (
    <div>
      <Header />
      <div className="absolute z-0 h-[40px] w-full bg-black sm:h-[128px] sm:border-0 lg:h-[128px] lg:px-2"></div>
      <div className="mt-[56px] h-[336px] border-b-[1px] border-gray-300 sm:h-[319px] sm:w-full sm:rounded-md sm:border-0 md:px-2 lg:mx-auto lg:h-[343px] lg:w-[1024px] lg:px-4 lg:pb-3">
        <div className="relative h-[40px] w-full sm:h-[128px]">
          <div className="absolute z-10 w-full overflow-hidden px-3 py-2">
            <img
              src={user?.image ?? "images/avatar.png"}
              alt="profile"
              className="h-[60px] w-[60px] rounded-full border-[4px] border-black object-cover sm:mx-auto sm:h-[128px] sm:w-[128px] sm:border-8"
            />
          </div>
        </div>
        <div className="relative h-[52px] bg-white pr-4 pt-4 sm:mx-2 sm:mt-[-56px] sm:h-[56px] sm:rounded-t-lg sm:border-x-[1px] sm:border-gray-300 sm:pb-5 md:mx-auto">
          <button className="ml-auto flex items-center rounded-md bg-blue-500 px-4 py-2 text-white">
            Edit Profile
          </button>
        </div>
        <div className="flex h-[156px] flex-col bg-white px-3 pb-3 pt-3 sm:mx-2 sm:h-[186px] sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-300 sm:p-4 sm:pt-9 md:mx-auto lg:h-[200px] lg:px-6 lg:pb-10 lg:pt-11">
          <div className="mb-2 flex justify-start sm:justify-center">
            <h1 className="text-2xl font-bold sm:text-3xl">{user?.name}</h1>
          </div>
          <div className="mb-4 flex justify-start sm:justify-center">
            <p defaultValue="404 bio not found">
              {user?.bio ?? "404 bio not found"}
            </p>
          </div>
          <div className="mb-2 flex h-[40px] flex-row items-center justify-start p-2 text-xs text-gray-500 sm:justify-center">
            <BsCake className="mr-2 h-5 w-5" />
            <p>
              Joined on{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex bg-white p-3 sm:hidden">
          <button className="my-3 w-full rounded-md border-[2px] border-gray-300 px-[14px] py-[6px]">
            <a href={`/profile/${user?.id}`}>More info about @{user?.id}</a>
          </button>
        </div>
      </div>
      <div className="p-1 sm:p-0"></div>
      <div className="sm:grid sm:w-full sm:grid-cols-[2fr,5fr] lg:mx-auto lg:w-[1024px] lg:px-2">
        <div className="hidden bg-white sm:col-span-1 sm:col-start-1 sm:ml-2 sm:mt-1 sm:block sm:h-[136px] sm:flex-col sm:rounded-md sm:border-[1px] sm:border-gray-300 sm:px-3 sm:py-4 md:mt-0">
          <div className="mb-5 flex flex-row">
            <LuScrollText className="mr-3 h-5 w-5" />
            <p className="text-sm">
              {user?.posts?.length ?? 0} posts published
            </p>
          </div>
          <div className="mb-5 flex flex-row">
            <RiChat1Line className="mr-3 h-5 w-5" />
            <p className="text-sm">
              {session?.user?.comments?.length ?? 0} comments written
            </p>
          </div>
          <div className="mb-5 flex flex-row">
            <RiHashtag className="mr-3 h-5 w-5" />
            <p className="text-sm">0 tags followed</p>
          </div>
        </div>
        <div className="flex flex-col pt-4 sm:col-start-2 sm:mx-2 sm:pt-0 lg:mt-0">
          <div className="mb-2 flex flex-col">
            {posts
              ?.filter((post) => !post.archived)
              .map((post) => (
                <div
                  key={post.id}
                  className="mb-2 w-full border-[1px] border-gray-300 bg-white px-4 pb-3 pt-4 sm:rounded-md"
                >
                  <div className="mb-3 flex max-h-[35px] items-center">
                    <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                      <img
                        src={user.image ?? "/images/avatar.png"}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex max-h-[17.5px] items-center text-sm">
                        {post.createdBy.name}
                      </div>
                      <div className="flex max-h-[15px] items-center text-xs">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:pl-[20px] lg:pl-[40px]">
                    <h2 className="mb-2 w-full justify-start text-xl font-bold">
                      <a href={`/post/${post.id}`}>{post.name}</a>
                    </h2>
                    <div className="flex w-full flex-row items-center">
                      <div className="flex flex-row items-center">
                        <a className="flex flex-row items-center py-1 pl-1 pr-3 text-sm">
                          <div className="mr-1 flex h-6 w-6 flex-row items-center">
                            <TfiComment className="h-4 w-4" />
                          </div>
                          <span className="hidden text-gray-500 sm:inline-block">
                            19 comments
                          </span>
                        </a>
                      </div>
                      <div className="ml-auto flex flex-row items-center">
                        <small className="mr-2 items-center text-gray-500">
                          4 min read
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
