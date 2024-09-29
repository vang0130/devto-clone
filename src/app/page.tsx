"use client";
import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsCameraReels } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineTrophy } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaDev } from "react-icons/fa";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { SiPostgresql } from "react-icons/si";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { PiEyesFill } from "react-icons/pi";
import { PiEyeglasses } from "react-icons/pi";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { RiTwitterXFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiGithubFill } from "react-icons/ri";
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiTwitchFill } from "react-icons/ri";
import { SiMcdonalds } from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { api } from "src/trpc/react";
import Header from "src/app/header/header";
// import type { Post } from "@prisma/client";
// type Post = {
//   id: number;
//   name: string;
//   content: string;
//   image: string | null;
//   createdAt: Date;
//   tags: string[];
//   createdBy: {
//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     bio: string | null;
//     location: string | null;
//     website: string | null;
//     createdAt: Date;
//   };
//   Comment: {
//     id: number;
//     content: string;
//     createdAt: Date;
//     createdBy: {
//       id: string;
//       name: string | null;
//       email: string | null;
//       image: string | null;
//     };
//   }[];
// };

// type Post = {
//   id: number;
//   name: string;
//   content: string;
//   image: string | null;
//   createdAt: Date;
//   tags: string[];
//   createdBy: {
//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     bio: string | null;
//     location: string | null;
//     website: string | null;
//     createdAt: Date;
//   };
//   comments: {
//     id: number;
//     content: string;
//     createdAt: Date;
//     createdBy: {
//       id: string;
//       name: string | null;
//       email: string | null;
//       image: string | null;
//     };
//   }[];
// };

// type PostWithComments = {
//   id: number;
//   name: string;
//   content: string;
//   image: string | null;
//   createdAt: Date;
//   tags: string[];
//   createdBy: {
//     id: string;
//     name: string | null;
//     email: string | null;
//     emailVerified: Date | null;
//     image: string | null;
//     bio: string | null;
//     location: string | null;
//     website: string | null;
//     createdAt: Date;
//   };
//   Comment: {
//     id: number;
//     content: string;
//     createdAt: Date;
//     createdBy: {
//       id: string;
//       name: string | null;
//       email: string | null;
//       image: string | null;
//     };
//   }[];
// };

export default function Home() {
  const { data: session, update } = useSession();
  const { data: posts, isLoading } = api.post.findMany.useQuery();

  const { data: recentPosts, isLoading: isLoadingRecentPosts } =
    api.post.findRecent.useQuery();

  return (
    <div>
      <Header />
      <div className="mx-auto flex min-h-screen w-full flex-col pt-[72px] sm:max-w-[86.25rem] sm:px-2 lg:px-4">
        <div className="grid flex-grow grid-cols-[1fr] sm:gap-2 md:grid-cols-[15rem,1fr] lg:grid-cols-[15rem,1fr,1fr,1fr] lg:gap-4">
          <div className="hidden items-center md:block lg:max-w-[15rem]">
            {isLoading
              ? null
              : !session && (
                  <div className="mb-4 flex flex-col items-center rounded-md border-[1.5px] bg-white px-4 py-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4">
                    <h2 className="mb-4 text-xl font-bold">
                      DEV Community is a community of 2,027,354 amazing
                      developers
                    </h2>
                    <p className="mb-4 text-sm text-gray-500">
                      We&apos;re a place where coders share, stay up-to-date and
                      grow their careers.
                    </p>
                    <div className="mr-2 w-full max-w-[208px] flex-col items-center justify-center rounded-md sm:max-w-[160px] md:max-w-[160px] lg:max-w-[208px]">
                      <a
                        className="mb-[4px] inline-flex w-full items-center justify-center rounded-md border-[1px] border-blue-700 px-[15px] py-[7px] text-sm"
                        href="/signup"
                      >
                        Create account
                      </a>
                      <a
                        className="inline-flex w-full items-center justify-center px-[15px] py-[7px] text-sm"
                        href="/signin"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                )}
            <nav className="mb-4 flex min-h-[600px] flex-col text-sm">
              <ul className="min-h-[40px]">
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineHome className="h-5 w-5" />
                    </span>
                    Home
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <RiChat1Line className="h-5 w-5" />
                    </span>
                    DEV++
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineMicrophone className="h-5 w-5" />
                    </span>
                    Podcasts
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <BsCameraReels className="h-5 w-5" />
                    </span>
                    Videos
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <IoPricetagsOutline className="h-5 w-5" />
                    </span>
                    Tags
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineLightBulb className="h-5 w-5" />
                    </span>
                    DEV Help
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineShoppingBag className="h-5 w-5" />
                    </span>
                    Forem Shop
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineHeart className="h-5 w-5" />
                    </span>
                    Advertise on DEV
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineTrophy className="h-5 w-5" />
                    </span>
                    DEV Challenges
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineSparkles className="h-5 w-5" />
                    </span>
                    DEV Showcase
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <FaDev className="h-5 w-5" />
                    </span>
                    About
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineMegaphone className="h-5 w-5" />
                    </span>
                    Contact
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <SiPostgresql className="h-5 w-5" />
                    </span>
                    Free Postgres Database
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineBookOpen className="h-5 w-5" />
                    </span>
                    Guides
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineFaceSmile className="h-5 w-5" />
                    </span>
                    Software Comparisons
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="mb-4 flex min-h-[160px] flex-col text-sm">
              <h2 className="pb-2 pl-3 pt-2 text-xl font-bold">Other</h2>
              <ul className="min-h-[40px]">
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <HiOutlineHandThumbUp className="h-5 w-5" />
                    </span>
                    Code of Conduct
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <PiEyeglasses className="h-5 w-5" />
                    </span>
                    Privacy Policy
                  </a>
                </li>
                <li className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2">
                    <span className="mr-2">
                      <PiEyesFill className="h-5 w-5" />
                    </span>
                    Terms of use
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mb-4 grid grid-cols-6 justify-start">
              <a
                className="px-4 py-2"
                href="https://twitter.com/thepracticaldev"
              >
                <RiTwitterXFill className="h-5 w-5" />
              </a>
              <a
                className="px-4 py-2"
                href="https://www.facebook.com/thepracticaldev"
              >
                <RiFacebookBoxFill className="h-5 w-5" />
              </a>
              <a className="px-4 py-2" href="https://www.github.com/forem">
                <RiGithubFill className="h-5 w-5" />
              </a>
              <a
                className="px-4 py-2"
                href="https://www.instagram.com/thepracticaldev"
              >
                <RiInstagramLine className="h-5 w-5" />
              </a>
              <a
                className="px-4 py-2"
                href="https://www.twitch.com/thepracticaldev"
              >
                <RiTwitchFill className="h-5 w-5" />
              </a>
              <a
                className="px-4 py-2"
                href="https://www.fostodon.org/thepracticaldev"
              >
                <SiMcdonalds className="h-5 w-5" />
              </a>
            </div>
            <nav className="mb-6 min-h-[250px]">
              <h3 className="text-l min-h-[40px] px-2 py-2 font-bold">
                Popular Tags
              </h3>
              <div className="max-h-[210px] overflow-y-auto">
                <div className="min-h-[40px]">
                  <a
                    className="font-thin-monospace flex items-center px-4 py-2 text-gray-700"
                    href="/t/webdev"
                  >
                    #webdev
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/javascript"
                  >
                    #javascript
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/beginners"
                  >
                    #beginners
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/programming"
                  >
                    #programming
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/tutorial">
                    #tutorial
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/react">
                    #react
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/python">
                    #python
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/ai">
                    #ai
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/devops">
                    #devops
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/productivity"
                  >
                    #productivity
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/opensource"
                  >
                    #opensource
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/css">
                    #css
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/node">
                    #node
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/aws">
                    #aws
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/learning">
                    #learning
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/news">
                    #news
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/java">
                    #java
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/typescript"
                  >
                    #typescript
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/career">
                    #career
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/database">
                    #database
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/html">
                    #html
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/php">
                    #php
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/machinelearning"
                  >
                    #machinelearning
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/android">
                    #android
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/discuss">
                    #discuss
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/github">
                    #github
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a
                    className="flex items-center px-4 py-2"
                    href="/t/development"
                  >
                    #development
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/api">
                    #api
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/security">
                    #security
                  </a>
                </div>
                <div className="min-h-[40px]">
                  <a className="flex items-center px-4 py-2" href="/t/cloud">
                    #cloud
                  </a>
                </div>
              </div>
            </nav>
            <div className="flex min-h-[320px] flex-col rounded-md border-[1.5px] bg-white px-3 pb-4 pt-3 sm:px-2 sm:py-2 lg:px-4 lg:py-4">
              <div className="flex min-h-[32px] items-center">
                <div className="text-sm">💎 DEV Diamond Sponsors</div>
                <button className="ml-auto">
                  <BsThreeDots className="h-6 w-6 px-1 py-1" />
                </button>
              </div>
              <div className="h-full flex-grow px-1 pb-1 pt-3">
                <h4 className="text-md mb-[10px] font-bold">
                  Thank you to our Diamond Sponsor Neon
                </h4>
                <img
                  src="/images/neon.png"
                  alt="neon"
                  className="mb-[20px] h-full w-full rounded-md"
                />
                <p className="text-md mb-[20px] font-light">
                  <em className="">
                    Neon is the official database partner of DEV
                  </em>
                </p>
                <p>Happy coding ❤️</p>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex max-h-[413px] min-h-[320px] flex-col overflow-y-auto rounded-md border-[1.5px] bg-white px-3 pb-4 pt-3 sm:px-2 sm:py-2 lg:px-4 lg:py-4">
                <div className="flex min-h-[32px] items-center">
                  <div className="text-sm">DEV Community</div>
                  <button className="ml-auto">
                    <BsThreeDots className="h-6 w-6 px-1 py-1" />
                  </button>
                </div>
                <div className="h-full flex-grow px-1 pb-1 pt-3">
                  <h2 className="mb-[10px] text-xl font-bold">
                    Get Your Writing Debut Badge
                  </h2>
                  <p className="text-md mb-[20px] font-light">
                    Share your first DEV post and join a vibrant community of
                    tech enthusiasts!
                  </p>
                  <img
                    src="/images/write.png"
                    alt="write-badge"
                    className="mb-[20px] h-full w-full rounded-md"
                  />
                  <a className="mb-[4px] inline-flex w-full items-center justify-center rounded-md border-[1px] border-black px-[15px] py-[7px] text-sm">
                    Write Your First Post
                  </a>
                </div>
              </div>
            </div>
            <footer className="mt-6 min-h-[221px] text-sm font-light">
              <p>
                <a className="pr-[4px] text-blue-500" href="/">
                  DEV Community
                </a>
                A constructive and inclusive social network for software
                developers. With you every step of your journey.
              </p>
              <p className="mt-[16px]">
                Built on
                <a className="pl-[4px] pr-[4px] text-blue-500" href="/">
                  Forem
                </a>
                — the{" "}
              </p>
              <a className="pr-[4px] text-blue-500" href="/">
                open source
              </a>
              software that powers
              <a className="pl-[4px] pr-[4px] text-blue-500" href="/">
                DEV
              </a>
              and other inclusive communities.
              {/* </p> */}
              <p className="mt-[16px]">
                Made with love and
                <a className="pl-[4px] pr-[4px] text-blue-500" href="/">
                  Ruby on Rails.
                </a>
                DEV Community © 2016 - 2024.
              </p>
            </footer>
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <header className="fs-l mb-2 h-[43px] md:mb-2 md:p-0">
              <nav className="items-center justify-between px-3 sm:flex sm:px-0 md:mx-0">
                <ul className="flex items-center">
                  <li>
                    <a className="flex items-center px-3 py-2 font-bold">
                      Relevant
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center px-3 py-2">Latest</a>
                  </li>
                  <li>
                    <a className="flex items-center px-3 py-2">Top</a>
                  </li>
                </ul>
              </nav>
            </header>
            <div className="mb-2 flex flex-col space-y-4">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                posts?.map((post) => (
                  <div
                    key={post.id}
                    className="w-full border-[1.5px] bg-white sm:rounded-md"
                  >
                    {post.image && (
                      <div className="aspect-[2/1] w-full sm:rounded-t-md">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="h-full w-full object-cover sm:rounded-t-md"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="mb-2 mr-2 flex max-h-[35px] items-center">
                        <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                          <a href={`/user/${post.createdBy.id}`}>
                            <img
                              src={post.createdBy.image ?? "/images/avatar.png"}
                              className="h-full w-full object-cover"
                            />
                          </a>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex max-h-[17.5px] items-center text-sm">
                            {post.createdBy.name}
                          </div>
                          <div className="flex max-h-[15px] items-center text-xs">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:pl-[20px] lg:pl-[40px]">
                        <h2 className="mb-1 w-full justify-start text-2xl font-bold">
                          <a href={`/post/${post.id}`}>{post.name}</a>
                        </h2>
                        <div className="mb-2 flex w-full text-gray-500">
                          {post.tags.map((tag) => (
                            <a
                              key={tag}
                              className="ml-[-7px] px-[7px] py-[4px] text-sm"
                              href={`/t/${tag}`}
                            >
                              {tag}
                            </a>
                          ))}
                        </div>
                        <div className="flex w-full flex-row items-center">
                          <div className="flex flex-row items-center">
                            <a className="flex h-[36px] flex-row items-center py-1 pr-3 text-sm">
                              <div className="flex flex-row items-center">
                                <div className="relative z-40 h-[28px] w-[28px] items-center rounded-full border-[2px] border-white bg-gray-100">
                                  <span
                                    role="img"
                                    aria-label="heart"
                                    className="flex cursor-pointer items-center justify-center text-center align-middle text-lg"
                                  >
                                    💖️
                                  </span>
                                </div>
                                <div className="relative z-30 ml-[-10.5px] h-[28px] w-[28px] items-center rounded-full border-[2px] border-white bg-gray-100">
                                  <span
                                    role="img"
                                    aria-label="heart"
                                    className="flex cursor-pointer items-center justify-center text-center align-middle text-lg"
                                  >
                                    🦄
                                  </span>
                                </div>
                                <div className="relative z-20 ml-[-10.5px] h-[28px] w-[28px] items-center rounded-full border-[2px] border-white bg-gray-100">
                                  <span
                                    role="img"
                                    aria-label="heart"
                                    className="flex cursor-pointer items-center justify-center text-center align-middle text-lg"
                                  >
                                    🔥
                                  </span>
                                </div>
                                <div className="relative z-10 ml-[-10.5px] h-[28px] w-[28px] items-center rounded-full border-[2px] border-white bg-gray-100">
                                  <span
                                    role="img"
                                    aria-label="heart"
                                    className="flex cursor-pointer items-center justify-center text-center align-middle text-lg"
                                  >
                                    👏
                                  </span>
                                </div>
                                <div className="relative ml-[-10.5px] h-[28px] w-[28px] items-center rounded-full border-[2px] border-white bg-gray-100">
                                  <span
                                    role="img"
                                    aria-label="heart"
                                    className="flex cursor-pointer items-center justify-center text-center align-middle text-lg"
                                  >
                                    🤯
                                  </span>
                                </div>
                              </div>
                              <span className="ml-[14px] hidden text-gray-500 sm:inline-block">
                                {post.reactions.length} reactions
                              </span>
                              {/* <span className="ml-[14px] inline-block text-gray-500 sm:hidden">
                                {post.reactions.length}
                              </span> */}
                            </a>
                            <a className="flex flex-row items-center py-1 pl-2 pr-3 text-sm">
                              <div className="mr-1 flex h-6 w-6 flex-row items-center">
                                <RiChat1Line className="h-5 w-5" />
                              </div>
                              <span className="hidden text-gray-500 sm:inline-block">
                                {post.comments.length} comments
                              </span>
                            </a>
                          </div>
                          <div className="ml-auto flex flex-row items-center">
                            <small className="mr-2 items-center text-gray-500">
                              4 min read
                            </small>
                            <button className="p-2">
                              <span className="flex h-6 w-6 items-center justify-center text-center align-middle">
                                <HiOutlineBookmark className="h-[18px] w-[18px]" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="hidden w-full space-y-4 lg:block">
            <section className="rounded-md border-[1.5px] bg-white">
              <header className="border-b-[1px] border-gray-100 px-4 py-3">
                <h3 className="text-xl font-bold text-gray-700">
                  <a href="/t/discuss">Active discussions</a>
                </h3>
              </header>
              {isLoadingRecentPosts ? (
                <RecentSkeletonLoader />
              ) : (
                recentPosts?.map((post) => (
                  <div key={post.id} className="border-b-[1px] border-gray-100">
                    <a href={`/post/${post.id}`} className="flex flex-col p-4">
                      {post.name}
                      <div className="pt-1 text-xs text-gray-500">
                        {Array.isArray(post.comments)
                          ? post.comments.length
                          : 0}{" "}
                        comments
                      </div>
                    </a>
                  </div>
                ))
              )}
            </section>
            <section className="rounded-md border-[1.5px] bg-white">
              <header className="px-4 py-3">
                <h3 className="text-xl font-bold text-gray-700">
                  <a href="/t/discuss">#discuss</a>
                </h3>
                <div className="text-xs text-gray-500">
                  Discussion threads targeting the whole community
                </div>
              </header>
              <div>
                <a className="flex flex-col p-4">
                  ✨ Cursor AI Editor - Is It Actually Useful?
                  <div className="pt-1 text-xs text-gray-500">3 comments</div>
                </a>
              </div>
              <div>
                <a className="flex flex-col p-4">
                  I&apos;m a Developer, But Lately, I&apos;m Just Stuck
                  <div className="pt-1 text-xs text-gray-500">20 comments</div>
                </a>
              </div>
              <div>
                <a className="flex flex-col p-4">
                  Meme Monday
                  <div className="pt-1 text-xs text-gray-500">45 comments</div>
                </a>
              </div>
              <div>
                <a className="flex flex-col p-4">
                  Google @ New Shortcut!
                  <div className="pt-1">
                    <div className="inline-block items-center rounded-md bg-yellow-400 px-1">
                      <span className="items-center text-xs text-orange-800">
                        New
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div>
                <a className="flex flex-col p-4">
                  Why Writing Your Own Tools Is More Important Than You Think
                  <div className="pt-1">
                    <div className="inline-block items-center rounded-md bg-yellow-400 px-1">
                      <span className="items-center text-xs text-orange-800">
                        New
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
            <section className="rounded-md border-[1.5px] bg-white">
              <header className="px-4 py-3">
                <h3 className="text-xl font-bold text-gray-700">
                  <a href="/t/discuss">#watercooler</a>
                </h3>
                <div className="text-xs text-gray-500">
                  Light, and off-topic conversation
                </div>
              </header>
              <div>
                <a className="flex flex-col p-4">
                  Meme Monday
                  <div className="pt-1 text-xs text-gray-500">45 comments</div>
                </a>
              </div>
              <div>
                <a className="flex flex-col p-4">
                  Web Developers, AI, and Development Fundamentals
                  <div className="pt-1">
                    <div className="inline-block items-center rounded-md bg-yellow-400 px-1">
                      <span className="items-center text-xs text-orange-800">
                        New
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
            <section className="mt-2 border-b-[1.5px] px-4 pb-4">
              <header>
                <h4 className="py-2 font-mono text-sm font-bold">
                  trending guides/resources
                </h4>
              </header>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  9 open-source gems to become the ultimate developer
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Global Talent Visa: How to Move to the UK Without an Employer
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Modern API Development with Node.js, Express, and TypeScript
                  using Clean Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  7 Free APIs for Your Next Projects
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  The Future of Web Development: Emerging Trends and
                  Technologies Every Developer Should Know
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Introducing Dev Encyclopedia: A &quot;Wikipedia&quot;, but for
                  developers
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Understanding the Linux Filesystem: An In-Depth Guide for
                  DevOps Engineers
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  How to Make Money From Coding: A Beginner-Friendly Practical
                  Guide
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  DevOps Project - The Ultimate CICD Corporate DevOps PIpeline
                  Project
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Mastering SOLID Principles in React: Elevating Your Code
                  Quality
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  How to implement a Distributed Lock using Redis
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Dear developers...
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  12 Best JavScript Animation Libraries to Supercharge Your Web
                  Projects in 2024
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  How to let ChatGPT call functions in your app
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  End-to-End DevOps Project: Building, Deploying and Monitoring
                  a Full-Stack Application
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10+ More Advanced Project Ideas to Level Up Your Developer
                  Skills: Part 2
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10+ Advanced Project Ideas for Developers: Challenge Your
                  Skills!
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  15 JavaScript Array Functions You Should Master as a Senior
                  Dev
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Frontend Dev + Data Structures & Algorithms: How DSA Can Power
                  Your React App
                </a>
              </div>
            </section>
            <section className="mt-2 border-b-[1.5px] px-4 pb-4">
              <header>
                <h4 className="py-2 font-mono text-sm font-bold">
                  recently queried
                </h4>
              </header>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  JavaScript Playground
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Windows Terminal Customization
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Java Import JSON Library
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">Vscode Vim</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Best VSCode Extensions
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Handwriting Generator
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">Pseudo Code</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Button Animation CSS
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Beginner Python Projects
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  GCC for Windows
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">Node Scheduler</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">SSN Validation</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Readme Template
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">CSS Game</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">Pure OS</a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Peppermint Linux OS
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Letsencrypt Wildcard
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  CSS Text Outline
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  Tic Tac Toe Python
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  VSCode Shortcuts
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full bg-white sm:rounded-md">
          <div className="aspect-[2/1] w-full animate-pulse bg-gray-300 sm:rounded-b-none sm:rounded-t-md" />
          <div className="p-5">
            <div className="mb-2 mr-2 flex max-h-[35px] items-center">
              <div className="mr-2 h-8 w-8 animate-pulse overflow-hidden rounded-full bg-gray-200"></div>
              <div className="flex flex-col">
                <div className="mb-1 h-[15px] w-[80px] animate-pulse rounded-md bg-gray-200" />
                <div className="flex h-[12px] w-[40px] animate-pulse items-center rounded-md bg-gray-200 text-xs" />
              </div>
            </div>
            <div className="flex flex-col items-center pl-[10px] md:pl-[20px] lg:pl-[40px]">
              <div className="mb-2 mr-auto h-[29.5px] w-[250px] animate-pulse justify-start rounded-md bg-gray-200" />
              <div className="mb-2 mr-auto flex h-[27px] w-[200px] animate-pulse justify-start rounded-md bg-gray-200 text-gray-500"></div>
              <div className="flex w-full flex-row items-center">
                <div className="flex flex-row items-center">
                  <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-gray-200" />
                  <a className="hidden flex-row items-center py-1 pl-2 pr-3 text-sm sm:flex">
                    <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-gray-200" />
                  </a>
                </div>
                <div className="ml-auto flex flex-row items-center">
                  <div className="h-[24px] w-[150px] animate-pulse rounded-md bg-gray-200" />
                </div>
              </div>
            </div>{" "}
            {/* <div className="mb-2 mr-2 flex max-h-[35px] items-center">
              <div className="mr-2 h-8 w-8 animate-pulse overflow-hidden rounded-full bg-gray-300"></div>
              <div className="flex flex-col">
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-300"></div>
                <div className="mt-1 h-3 w-16 animate-pulse rounded-md bg-gray-300"></div>
              </div>
            </div>
            <div className="mt-3 h-6 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-gray-300"></div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentSkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border-b-[1px] border-gray-100">
          <div className="flex flex-col p-4">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200" />
            <div className="mt-2 h-4 w-1/4 animate-pulse rounded-md bg-gray-200 text-xs" />
          </div>
        </div>
      ))}
    </div>
  );
}
