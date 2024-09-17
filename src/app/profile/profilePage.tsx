'use client'

import { useSession } from 'next-auth/react';
import SideBar from '../sidebar/sideBar';
import Image from 'next/image';
import { RiSearchLine } from 'react-icons/ri';
import { PiBellSimple } from 'react-icons/pi';
import PopUpComponent from '../profileoptions/profileOptions';
import { BsCake } from "react-icons/bs";
import { LuScrollText } from "react-icons/lu";
import { RiChat1Line } from "react-icons/ri";
import { RiHashtag } from "react-icons/ri";
import { TfiComment } from "react-icons/tfi";
import { api } from 'src/trpc/react';
// import { User } from '@prisma/client';
// import { getSession } from 'next-auth/react';
import { UserWithPostsAndComments } from 't3/type';



// export const getServerSideProps = async () => {
//   try {
//     const session = await getSession({ req: ctx.req });
//     if (session) {
//       const userPosts = await api.post.getUserPosts.query();
//       return { props: { userPosts } };
//     }
//     return { props: { userPosts: [] } };
//   } catch (error) {
//     console.error(error);
//     return { props: { userPosts: [] } };
//   }
// }

// type UserProfileProps = {
//   user: {
//     id: string;
//     name?: string;
//     posts: { id: string; name: string; content: string }[]; // Define posts correctly
//     // other properties...
//   };
// };

// const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
export default function ProfilePage({ user }: { user: UserWithPostsAndComments }) {
    const { data: session } = useSession();
    // get all posts made by user
    const { data: posts } = api.post.getUserPosts.useQuery({ userId: user?.id });
    // const { data: user } = api.post.getUser.useQuery();
    // console.table(session?.user);
    // console.table(session?.user?.posts);
    return (
      <div>
        <header className="z-50 fixed left-0 right-0 top-0 h-[56px] border-gray-300 border-b-[1px] bg-white">
          <div className="mx-auto flex h-full w-full max-w-[1380px] items-center justify-start md:px-2 sm:px-1 lg:px-4">
            <SideBar />
            <a className="flex items-center" href="/">
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </a>
            <div className="mx-4 hidden flex-grow max-w-2xl sm:block lg:w-[680px]">
              <form className="border-gray-300 flex h-[40px] items-center rounded-md border">
                <button className="pl-2 pr-1">
                  <RiSearchLine className="h-6 w-6" />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="h-full w-full rounded-md pl-2 pr-4"
                />
              </form>
            </div>
            {session ?
            <div className="ml-auto flex items-center">
              <div className="">
                <a href="/createpost">
                  <div className="hidden sm:flex w-[116.5px] mr-2 items-center justify-center rounded-md border border-black px-3 py-2 text-center text-sm">
                    Create Post
                  </div>
                </a>
              </div>
              <div className="p-2 sm:hidden">
                <a href="/">  
                  <RiSearchLine className="h-6 w-6" />
                </a>
              </div>
              <div className="p-2 mx-1">
                <a href="">
                  <PiBellSimple className="h-6 w-6" />
                </a>
              </div>
              <div className="p-2 mx-1">
                <PopUpComponent />
              </div>
            </div>
            : null}
            {!session ?
            <div className="ml-auto flex items-center">
              <div className="hidden flex-col lg:block">
                <a href="/signin">
                  <div className="mr-2 min-w-[100px] rounded-md px-4 py-2 text-center text-sm sm:px-3 sm:py-1 sm:text-base lg:px-4">
                    Log In
                  </div>
                </a>
              </div>
              <div className="">
                <a href="/signup">
                  <div className="flex w-[140px] items-center justify-center rounded-md border border-black px-3 py-2 text-center text-sm mr-2">
                    Create Account
                  </div>
                </a>
              </div>
            </div>
            : null}
          </div>
        </header>
        <div className="absolute w-full h-[40px] sm:h-[128px] sm:border-0 lg:px-2 bg-black lg:h-[128px]">
        </div>
        <div className="mt-[56px] h-[336px] sm:w-full sm:h-[319px] lg:h-[343px] md:px-2 lg:px-4 lg:pb-3 border-b-[1px] border-gray-300 sm:rounded-md sm:border-0 lg:w-[1024px] lg:mx-auto">
          <div className="h-[40px] sm:h-[128px] w-full relative">
            <div className="absolute w-full overflow-hidden px-3 py-2 z-10">
              <img src={user?.image || "images/avatar.png"} alt="profile" className="rounded-full h-[60px] w-[60px] sm:h-[128px] sm:w-[128px] sm:mx-auto object-cover border-[4px] sm:border-8 border-black" />
            </div>
          </div>
          <div className="pt-4 pr-4 h-[52px] sm:mt-[-56px] sm:h-[56px] bg-white sm:mx-2 sm:rounded-t-lg sm:pb-5 relative sm:border-x-[1px] sm:border-gray-300 md:mx-auto">
            <button className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white ml-auto">
              Edit Profile
            </button>
          </div>
          <div className="flex flex-col pb-3 px-3 pt-3 h-[156px] sm:h-[186px] sm:p-4 sm:mx-2 sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-300 sm:pt-9 md:mx-auto bg-white lg:pt-11 lg:px-6 lg:pb-10 lg:h-[200px]">
            <div className="mb-2 flex justify-start sm:justify-center">
              <h1 className="text-2xl sm:text-3xl font-bold">{user?.name}</h1>
            </div>
            <div className="mb-4 flex justify-start sm:justify-center">
              <p defaultValue="404 bio not found">{user?.bio || "404 bio not found"}</p>
            </div>
            <div className="flex flex-row justify-start sm:justify-center mb-2 p-2 text-xs text-gray-500 items-center h-[40px]">
              <BsCake className="mr-2 w-5 h-5" />
              <p>Joined on {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex p-3 sm:hidden bg-white">
            <button className="my-3 py-[6px] px-[14px] rounded-md border-[2px] border-gray-300 w-full">
              <a href={`/profile/${user?.id}`}>
                More info about @{user?.id}
              </a>
            </button>
          </div>
        </div>
        <div className="p-1 sm:p-0"></div>
        <div className="sm:grid sm:grid-cols-[2fr,5fr] sm:w-full lg:w-[1024px] lg:mx-auto lg:px-2">
          <div className="hidden sm:block sm:col-start-1 sm:col-span-1 sm:h-[136px] sm:rounded-md sm:border-[1px] sm:border-gray-300 bg-white sm:ml-2 sm:mt-1 sm:py-4 sm:px-3 sm:flex-col md:mt-0">
              <div className="flex flex-row mb-5">
                <LuScrollText className="mr-3 w-5 h-5" />
                <p className="text-sm">{user?.posts?.length ?? 0} posts published</p>
              </div>
              <div className="flex flex-row mb-5">
                <RiChat1Line className="mr-3 w-5 h-5" />
                <p className="text-sm">{session?.user?.comments?.length ?? 0} comments written</p>
              </div>
              <div className="flex flex-row mb-5">
                <RiHashtag className="mr-3 w-5 h-5" />
                <p className="text-sm">0 tags followed</p>
            </div>
          </div>
        <div className="pt-4 sm:pt-0 sm:mx-2 lg:mt-0 flex flex-col sm:col-start-2">
          <div className="mb-2 flex flex-col">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="border-gray-300 border-[1px] sm:rounded-md bg-white pt-4 px-4 pb-3 w-full mb-2"
              >
                <div className="mb-3 flex max-h-[35px] items-center">
                  <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src={user.image ||"/images/avatar.png"}
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex max-h-[17.5px] items-center text-sm">
                      {post.createdBy.name}
                    </div>
                    <div className="flex max-h-[15px] items-center text-xs">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:pl-[20px] lg:pl-[40px]">
                  <h2 className="mb-2 w-full justify-start text-xl font-bold">
                    <a>{post.name}</a>
                  </h2>
                  <div className="flex w-full flex-row items-center">
                    <div className="flex flex-row items-center">
                      <a className="flex flex-row items-center py-1 pl-1 pr-3 text-sm">
                        <div className="mr-1 flex h-6 w-6 flex-row items-center">
                          <TfiComment className="h-4 w-4" />
                        </div>
                        <span className="hidden sm:inline-block text-gray-500">19 comments</span>
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
          {/* <div className="mb-2 flex flex-col">
              <div
                className="border-gray-300 border-[1px] sm:rounded-md bg-white pt-4 px-4 pb-3 w-full"
              >
                <div className="mb-3 flex max-h-[35px] items-center">
                  <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src="/images/winter.png"
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex max-h-[17.5px] items-center text-sm">
                      {session?.user?.name}
                    </div>
                    <div className="flex max-h-[15px] items-center text-xs">
                      Sep 9
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:pl-[20px] lg:pl-[40px]">
                  <h2 className="mb-2 w-full justify-start text-xl font-bold">
                    Hello
                  </h2>
                  <div className="flex w-full flex-row items-center">
                    <div className="flex flex-row items-center">
                      <a className="flex flex-row items-center py-1 pl-1 pr-3 text-sm">
                        <div className="mr-1 flex h-6 w-6 flex-row items-center">
                          <TfiComment className="h-4 w-4" />
                        </div>
                        <span className="hidden sm:inline-block text-gray-500">19 comments</span>
                      </a>
                    </div>
                    <div className="ml-auto flex flex-row items-center">
                      <small className="mr-2 items-center text-gray-500">
                        4 min read
                      </small>
                    </div>
                  </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      </div>
    );
}

