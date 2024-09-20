"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "src/trpc/react";
import Header from "../header/header";
import { RiHeart2Line } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { RiChat1Line } from "react-icons/ri";

export default function DashboardClient() {
  const utils = api.useUtils();
  const { data: session, update } = useSession();
  const { data: posts } = api.post.getUserPosts.useQuery({
    userId: session?.user.id ?? "",
  });

  const [deletingId, setDeletingPostId] = useState<number | null>();

  const [archivingId, setArchivingPostId] = useState<number | null>();

  const [unArchivingId, setUnArchivingPostId] = useState<number | null>();

  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setDeletingPostId(null);
    },
  });

  const handleDeletePost = (postId: number) => {
    setDeletingPostId(postId);
    deletePost.mutate({ id: postId });
  };

  const archivePost = api.post.archive.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setArchivingPostId(null);
    },
  });

  const handleArchivePost = (postId: number) => {
    setArchivingPostId(postId);
    archivePost.mutate({ id: postId });
  };

  const unArchivePost = api.post.unarchive.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setUnArchivingPostId(null);
    },
  });

  const handleUnArchivePost = (postId: number) => {
    setUnArchivingPostId(postId);
    unArchivePost.mutate({ id: postId });
  };

  return (
    <div>
      <Header />
      <div className="mt-[56px] grid w-full">
        <div className="p-3 sm:row-start-1 sm:p-4">
          <header className="flex flex-col align-middle">
            <div className="flex h-[40px] w-full items-center sm:h-[45px]">
              <h1 className="align-middle text-2xl font-bold sm:text-3xl">
                Dashboard
              </h1>
            </div>
            <div className="h-[52px] w-full pt-3 sm:hidden">
              <select className="h-full w-full rounded-md border-[1.5px] border-gray-300 bg-white py-[6.5px] pl-[6.5px] pr-8">
                <option>Posts ({session?.user.posts.length})</option>
              </select>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 pt-3 sm:grid-cols-3 sm:gap-4">
              <div className="h-[78px] rounded-md border-[1px] border-gray-300 bg-white p-3 sm:h-[109.5px] sm:p-6">
                <h2 className="text-xl font-bold sm:text-3xl">0</h2>
                <span className="text-sm text-gray-500 sm:text-base">
                  Total post reactions
                </span>
              </div>
              <div className="h-[78px] rounded-md border-[1px] border-gray-300 bg-white p-3 sm:h-[109.5px] sm:p-6">
                <h2 className="text-xl font-bold sm:text-3xl">0</h2>
                <span className="text-sm text-gray-500 sm:text-base">
                  Total post comments
                </span>
              </div>
              <div className="h-[78px] rounded-md border-[1px] border-gray-300 bg-white p-3 sm:h-[109.5px] sm:p-6">
                <h2 className="text-xl font-bold sm:text-3xl">&lt;500</h2>
                <span className="text-sm text-gray-500 sm:text-base">
                  Total post views
                </span>
              </div>
            </div>
          </header>
        </div>
        <div className="sm:grid sm:grid-cols-[240px,1fr] sm:gap-2 sm:p-2 md:grid-cols-[2fr,5fr] md:gap-4 md:px-4 md:py-0">
          <div className="hidden sm:block">
            <nav className="hidden sm:block">
              <ul>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md bg-white p-2">
                    <a className="flex flex-row">
                      <span>Posts</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        {session?.user.posts.length}
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Series</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Followers</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Following tags</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Following users</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Following organizations</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Following podcasts</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Analytics</span>
                      {/* <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">2</span> */}
                    </a>
                  </li>
                </div>
                <div className="flex w-full flex-row">
                  <li className="w-full rounded-md p-2">
                    <a className="flex flex-row">
                      <span>Hidden tags</span>
                      <span className="ml-auto justify-end rounded-md bg-gray-300 px-1 text-right">
                        0
                      </span>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
          <div className="w-full sm:col-span-1 sm:col-start-2">
            <div className="mt-3">
              <div className="flex h-[40px] flex-row items-center px-3 sm:justify-end sm:pl-0">
                <h2 className="hidden sm:mr-auto sm:block sm:text-xl sm:font-bold">
                  Posts
                </h2>
                <a className="w-min-content mr-2 h-full whitespace-nowrap rounded-md border-[1.5px] border-gray-300 bg-white px-[14px] py-[6px] text-center">
                  Show archived
                </a>
                <select className="w-min-content h-full whitespace-nowrap rounded-md border-[1.5px] border-gray-300 bg-white py-[6.5px] pl-[6.5px] pr-8 text-center">
                  <option>Recently Created</option>
                </select>
              </div>
            </div>
            {posts?.map((post) => (
              <div
                key={post.id}
                className="mt-3 w-full border-[1px] border-gray-300 bg-white p-4 sm:rounded-md"
              >
                <div className="flex h-full flex-col align-middle">
                  <div className="flex h-[28px] flex-row items-center">
                    {post.archived ? (
                      <span className="mr-2 flex rounded-md bg-red-500 p-1 text-xs text-white">
                        Archived
                      </span>
                    ) : null}
                    <a href={`/post/${post.id}`} className="flex w-full">
                      <h3 className="w-min whitespace-nowrap text-xl font-bold text-blue-700">
                        {post.name}
                      </h3>
                    </a>
                  </div>
                  <div className="hidden h-full flex-row items-center pt-1 align-middle text-gray-500 sm:flex sm:h-full">
                    <div className="flex h-[21px] w-full flex-row items-center">
                      <p className="whitespace-nowrap pr-2 text-sm text-gray-500">
                        Published:{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="whitespace-nowrap text-sm text-gray-500">
                        Language: English
                      </p>
                    </div>
                    <div className="flex w-min justify-start">
                      <div className="flex flex-row items-center p-1 text-gray-500">
                        <RiHeart2Line className="mr-1 h-5 w-5" />
                        <span className="flex text-sm">0</span>
                      </div>
                      <div className="ml-2 flex flex-row items-center p-1 text-gray-500">
                        <RiChat1Line className="mr-1 h-4 w-4" />
                        <span className="flex text-sm">0</span>
                      </div>
                      <div className="ml-2 flex flex-row items-center p-1 pr-4 text-gray-500">
                        <RiEyeLine className="mr-1 h-5 w-5" />
                        <span className="flex text-sm">&lt;25</span>
                      </div>
                    </div>
                    <div className="ml-auto flex w-min justify-end">
                      <div className="flex flex-row items-center text-gray-500">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletePost.isPending}
                        >
                          <span className="flex px-1 py-1 text-sm">
                            {deletingId === post.id && deletePost.isPending
                              ? "Deleting"
                              : "Delete"}
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-row items-center text-gray-500">
                        <a href={`/edit/${post.id}`}>
                          <span className="flex px-1 py-1 text-sm">Edit</span>
                        </a>
                      </div>
                      {post.archived ? (
                        <button
                          onClick={() => handleUnArchivePost(post.id)}
                          disabled={unArchivePost.isPending}
                        >
                          <span className="px- flex py-1 text-sm">
                            {unArchivingId === post.id &&
                            unArchivePost.isPending
                              ? "Unhiding"
                              : "Unhide"}
                          </span>
                        </button>
                      ) : null}
                      {!post.archived ? (
                        <button
                          onClick={() => handleArchivePost(post.id)}
                          disabled={archivePost.isPending}
                        >
                          <span className="flex px-3 py-1 text-sm">
                            {archivingId === post.id && archivePost.isPending
                              ? "Hiding"
                              : "Hide"}
                          </span>
                        </button>
                      ) : null}
                      {/* <span className="text-sm flex px-3 py-1">Hide</span> */}
                    </div>
                  </div>
                  <div className="flex h-[21px] w-full flex-row items-center sm:hidden">
                    <p className="whitespace-nowrap pr-2 text-sm text-gray-500">
                      Published:{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="whitespace-nowrap text-sm text-gray-500">
                      Language: English
                    </p>
                  </div>
                  <div className="flex h-full flex-row items-center pt-1 align-middle text-gray-500 sm:hidden">
                    <div className="flex w-min justify-start">
                      <div className="flex flex-row items-center p-1 text-gray-500">
                        <RiHeart2Line className="mr-1 h-5 w-5" />
                        <span className="flex text-sm">0</span>
                      </div>
                      <div className="ml-2 flex flex-row items-center p-1 text-gray-500">
                        <RiChat1Line className="mr-1 h-4 w-4" />
                        <span className="flex text-sm">0</span>
                      </div>
                      <div className="ml-2 flex flex-row items-center p-1 text-gray-500">
                        <RiEyeLine className="mr-1 h-5 w-5" />
                        <span className="flex text-sm">&lt;25</span>
                      </div>
                    </div>
                    <div className="ml-auto flex w-min justify-end">
                      <div className="flex flex-row items-center text-gray-500">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletePost.isPending}
                        >
                          <span className="flex px-1 py-1 text-sm">
                            {deletingId === post.id && deletePost.isPending
                              ? "Deleting"
                              : "Delete"}
                          </span>
                        </button>
                      </div>
                      <div className="flex flex-row items-center text-gray-500">
                        <a href={`/edit/${post.id}`}>
                          <span className="flex px-1 py-1 text-sm">Edit</span>
                        </a>
                      </div>
                      <div className="flex flex-row items-center text-gray-500">
                        {post.archived ? (
                          <button
                            onClick={() => handleUnArchivePost(post.id)}
                            disabled={unArchivePost.isPending}
                          >
                            <span className="px- flex py-1 text-sm">
                              {unArchivingId === post.id &&
                              unArchivePost.isPending
                                ? "Unhiding"
                                : "Unhide"}
                            </span>
                          </button>
                        ) : null}
                        {!post.archived ? (
                          <button
                            onClick={() => handleArchivePost(post.id)}
                            disabled={archivePost.isPending}
                          >
                            <span className="flex px-3 py-1 text-sm">
                              {archivingId === post.id && archivePost.isPending
                                ? "Hiding"
                                : "Hide"}
                            </span>
                          </button>
                        ) : null}
                        {/* <span className="text-sm flex px-3 py-1">Hide</span> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                {/* <div className="grid h-[118px] w-full grid-cols-2 p-4 sm:h-[82px] sm:grid-cols-[2fr,1fr,1fr]"> */}
                <div className="flex h-[32px] flex-row items-center justify-end pt-1 text-gray-500 sm:col-start-3 sm:row-start-1 sm:h-full"></div>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
