'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsLightningCharge } from "react-icons/bs";
import { api } from "src/trpc/react";
import { uploadFile } from "src/app/upload/action";
import Header from "../header/header"
import { RiHeart2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


export default function DashboardClient() {
  const utils = api.useUtils();
  const { data: session, update } = useSession();
  const { data: posts } = api.post.getUserPosts.useQuery({ userId: session?.user.id ?? '' });

  const [deletingId, setDeletingPostId] = useState<number | null >();

  const [archivingId, setArchivingPostId] = useState<number | null >();

  const [unArchivingId, setUnArchivingPostId] = useState<number | null>();

  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setDeletingPostId(null);
    }
  })

  const handleDeletePost = ( postId: number ) => {
    setDeletingPostId(postId);
    deletePost.mutate({ id : postId });
  };
  
  const archivePost = api.post.archive.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setArchivingPostId(null);
    }
  })

  const handleArchivePost = ( postId: number ) => {
    setArchivingPostId(postId);
    archivePost.mutate({ id : postId });
  }
  
  const unArchivePost = api.post.unarchive.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setUnArchivingPostId(null);
    }
  })

  const handleUnArchivePost = ( postId: number ) => {
    setUnArchivingPostId(postId);
    unArchivePost.mutate({ id : postId });
  }
  //display posts made by user 
  // display post count

  // interactive delete, edit and hide buttons

  return (
    <div>
      <Header />
      <div className="mt-[56px] w-full grid">
        <div className="p-3 sm:p-2 sm:row-start-1 md:p-4">
          <header className="flex flex-col align-middle">
            <div className="flex items-center h-[40px] sm:h-[45px] w-full"> 
              <h1 className="text-2xl sm:text-3xl font-bold align-middle">Dashboard</h1>
            </div>
            <div className="sm:hidden pt-3 w-full h-[52px]">
              <select className="rounded-md border-[1.5px] border-gray-300 py-[6.5px] pl-[6.5px] pr-8 w-full h-full bg-white">
                <option>Posts ({session?.user.posts.length})</option> 
              </select>
            </div>
            <div className="w-full grid grid-cols-2 pt-3 sm:grid-cols-3 gap-2 sm:gap-4">
              <div className="p-3 sm:p-6 sm:h-[109.5px] bg-white rounded-md border-[1px] border-gray-300 h-[78px]">
                <h2 className="text-xl md:text-3xl font-bold">0</h2>
                 <span className="text-sm md:text-base text-gray-500">Total post reactions</span>
              </div>
              <div className="p-3 sm:p-6 sm:h-[109.5px] bg-white rounded-md border-[1px] border-gray-300 h-[78px]">
                <h2 className="text-xl md:text-3xl font-bold">0</h2>
                <span className="text-sm md:text-base text-gray-500">Total post comments</span>
              </div>
              <div className="p-3 sm:p-6 sm:h-[109.5px] bg-white rounded-md border-[1px] border-gray-300 h-[78px]">
                <h2 className="text-xl md:text-3xl font-bold">&lt;500</h2>
                <span className="text-sm md:text-base text-gray-500">Total post views</span>
              </div>
            </div>
          </header>

        </div>
        <div className="sm:grid sm:grid-cols-[2fr,5fr] sm:gap-2 sm:p-2 md:grid-cols-[240px,1fr] md:gap-4 md:px-4 md:py-0">
          <div className="hidden sm:block">
            <nav className="hidden sm:block">
              <ul>
                <div className="flex flex-row w-full">
                  <li className="bg-white rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Posts</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">{session?.user.posts.length}</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Series</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Followers</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Following tags</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Following users</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Following organizations</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Following podcasts</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Analytics</span>
                      {/* <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">2</span> */}
                    </a>
                  </li>
                </div>
                <div className="flex flex-row w-full">
                  <li className="rounded-md p-2 w-full">
                    <a className="flex flex-row">
                      <span>Hidden tags</span>
                      <span className="justify-end text-right ml-auto bg-gray-300 px-1 rounded-md">0</span>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
          <div className="w-full sm:col-span-1 sm:col-start-2">
            <div className="mt-3">
              <div className="flex flex-row px-3 md:pl-0 h-[40px] sm:justify-end items-center">
                <h2 className="hidden sm:block sm:font-bold sm:text-xl sm:mr-auto">Posts</h2>
                <a className="h-full px-[14px] py-[6px] w-min-content whitespace-nowrap text-center bg-white rounded-md border-[1.5px] border-gray-300 mr-2">
                  Show archived
                </a>
                <select className="rounded-md border-[1.5px] border-gray-300 py-[6.5px] pl-[6.5px] pr-8 h-full bg-white w-min-content whitespace-nowrap text-center">
                  <option>Recently Created</option>
                </select>
              </div>
            </div>
            { posts?.map((post) => (
              <div key={post.id} className="mt-3 w-full border-[1px] border-gray-300 bg-white sm:rounded-md">
                <div className="p-4 w-full h-[118px] md:h-[82px] grid grid-cols-2 grid-rows-1 md:grid-cols-[2fr,1fr,1fr]">
                  <div className="w-full h-full">
                    <div className="h-[28px] flex flex-row items-center">
                      { post.archived ? (
                        <span className="bg-red-500 p-1 text-white rounded-md text-xs mr-2">Archived</span>
                      ) : null}
                      <a className="">
                        <h3 className="font-bold text-blue-700 text-xl">{post.name}</h3>
                      </a>
                    </div>
                    <div className="flex flex-row w-full h-[21px] items-center">
                      <p className="text-sm text-gray-500 whitespace-nowrap pr-2">Published: {new Date(post.createdAt).toLocaleDateString('en-US',{month: 'short', day: 'numeric'})}</p>
                      <p className="text-sm text-gray-500 whitespace-nowrap">Language: English</p>
                    </div>
                  </div>
                  <div className="row-span-1 row-start-2 md:row-start-1 md:col-start-2 h-[32px] md:h-full flex items-center text-gray-500 pt-1">
                    <div className="flex flex-row items-center text-gray-500 p-1">
                      <RiHeart2Line className="w-5 h-5 mr-1" />
                      <span className="text-sm flex">0</span>
                    </div>
                    <div className="flex flex-row items-center text-gray-500 p-1 ml-2">
                      <FaRegComment className="w-4 h-4 mr-1" />
                      <span className="text-sm flex">0</span>
                    </div>
                    <div className="flex flex-row items-center text-gray-500 p-1 ml-2">
                      <RiEyeLine className="w-5 h-5 mr-1" />
                      <span className="text-sm flex">&lt;25</span>
                    </div>
                  </div>
                  <div className="row-span-1 row-start-2 md:row-start-1 md:col-start-3 h-[32px] md:h-full flex flex-row items-center text-gray-500 justify-end pt-1">
                    <div className="flex flex-row items-center text-gray-500">
                      <button 
                      onClick={() => handleDeletePost(post.id)}
                      disabled={deletePost.isPending}
                      >
                      <span className="text-sm flex px-3 py-1">{deletingId === post.id && deletePost.isPending ? "Deleting" : "Delete"}</span>
                      </button>
                    </div>
                    <div className="flex flex-row items-center text-gray-500">
                      <a href={`/edit/${post.id}`}>
                        <span className="text-sm flex px-3 py-1">Edit</span>
                      </a>
                    </div>
                    <div className="flex flex-row items-center text-gray-500">
                      { post.archived ? (
                      <button 
                      onClick={() => handleUnArchivePost(post.id)}
                      disabled={unArchivePost.isPending}
                      >
                      <span className="text-sm flex px-3 py-1">{unArchivingId === post.id && unArchivePost.isPending ? "Unhiding" : "Unhide"}</span>
                      </button>
                      ) : null}
                      { !post.archived ? (
                      <button 
                      onClick={() => handleArchivePost(post.id)}
                      disabled={archivePost.isPending}
                      >
                      <span className="text-sm flex px-3 py-1">{archivingId === post.id && archivePost.isPending ? "Hiding" : "Hide"}</span>
                      </button>
                      ) : null}
                      {/* <span className="text-sm flex px-3 py-1">Hide</span> */}
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
