import Link from "next/link";
import Image from "next/image";

import { getServerAuthSession } from "t3/server/auth";
import { api, HydrateClient } from "t3/trpc/server";
import { HiOutlineBookmark } from "react-icons/hi2";
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
import { TfiComment } from "react-icons/tfi";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <header className="fixed left-0 right-0 top-0 h-[56px] bg-white border-b-[1.5px]">
        <div className="justify-left mx-auto flex h-full w-full max-w-[1380px] items-center px-4 sm:px-2 lg:px-4">
          <a className="flex items-center">
            <img src="/images/logo.png" alt="logo" className="w-[40px] sm:w-[50px]" />
          </a>

          <div className="mx-4 hidden max-w-2xl flex-grow sm:block">
            <form className="border-grey-900 flex h-[40px] items-center rounded-md border">
              <button className="pl-2 pr-1">
                <Image src="/images/search.svg" alt="search" width={20} height={20} />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="h-full w-full rounded-md pl-2 pr-4"
              />
            </form>
          </div>
          <div className="ml-auto flex items-center">
            <a className="rounded-md px-4 py-2 mr-2 text-sm lg:px-4 py-2 sm:px-3 sm:py-1 sm:text-base">
              Log In
            </a>
            <a className="rounded-md border border-black px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base">
              Create Account
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto flex min-h-screen w-full max-w-[86.25rem] flex-col px-4 pt-[72px] sm:px-2 lg:px-4">
        {/* <div className="flex flex-grow"> */}
        <div className="grid flex-grow grid-cols-[15rem,1fr,1fr,1fr] gap-4">
          <div className="w-full max-w-[10rem] sm:max-w-[6rem] md:max-w-[10rem] lg:max-w-[15rem]">
            <div className="min-h-[320px] rounded-md bg-white px-4 py-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4 border-[1.5px]">
              <h2 className="mb-4 text-xl font-bold">
                DEV Community is a community of 2,027,354 amazing developers
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                We&apos;re a place where coders share, stay up-to-date and grow
                their careers.
              </p>
              <div className="h-[84px] w-full max-w-[208px] flex-col items-center justify-center rounded-md sm:max-w-[160px] md:max-w-[160px] lg:max-w-[208px]">
                <a className="mb-[4px] inline-flex w-full items-center justify-center rounded-md border-[1px] border-black px-[15px] py-[7px] text-sm">
                  Create account
                </a>
                <a className="inline-flex w-full items-center justify-center px-[15px] py-[7px] text-sm">
                  Log in
                </a>
              </div>
            </div>
            <nav className="mb-4 mt-4 flex min-h-[600px] flex-col text-sm">
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
                      <TfiComment className="h-5 w-5" />
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
            <div className="flex min-h-[320px] flex-col rounded-md bg-white px-3 pb-4 pt-3 sm:px-2 sm:py-2 lg:px-4 lg:py-4 border-[1.5px]">
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
              <div className="flex max-h-[413px] min-h-[320px] flex-col overflow-y-auto rounded-md bg-white px-3 pb-4 pt-3 sm:px-2 sm:py-2 lg:px-4 lg:py-4 border-[1.5px]">
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
          <div className="col-span-2">
            <header className="m:p-0 m:px-0 m:mb-2 fs-l mb-2 h-[43px]">
              <nav className="m:mx-0 s:flex -mx-3 items-center justify-between">
                <ul className="flex items-center">
                  <li>
                    <a className="flex items-center px-3 py-2 font-bold">Relevant</a>
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
              <div className="rounded-md bg-white p-5 border-[1.5px]">
                <div className="mb-2 mr-2 flex max-h-[35px] items-center">
                  <div className="mr-2 w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/images/winter.png"
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex max-h-[17.5px] items-center text-sm">
                      John Doe
                    </div>
                    <div className="flex max-h-[15px] items-center text-xs">
                      Sep 9
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:pl-[40px] md:pl-[20px] pl-[10px]">
                  <h2 className="mb-1 text-2xl font-bold">
                    <a>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                    </a>
                  </h2>
                  <div className="mb-2 flex w-full text-gray-500">
                    <a className="text-sm px-[7px] py-[4px]" href="/t/react">
                    #react
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/javascript">
                    #javascript
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/webdev">
                    #webdev
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/programming">
                    #programming
                    </a>
                  </div>
                  <div className="flex flex-row w-full items-center">
                    <div className="flex flex-row items-center">
                      <a className="text-sm pl-2 pr-3 py-1 items-center">
                        <span>💖🦄🤯👏🔥</span>
                        <span className="text-gray-500 ml-[14px]">190 reactions</span>
                      </a>
                      <a className="text-sm pl-2 pr-3 py-1 flex-row flex items-center">
                        <div className="h-6 w-6 mr-1 flex flex-row items-center">
                          <TfiComment className="h-4 w-4" />
                        </div>
                        <span className="text-gray-500">19 comments</span>
                      </a>
                    </div>
                    <div className="flex flex-row ml-auto items-center">
                      <small className="text-gray-500 mr-2 items-center">4 min read</small>
                      <button className="p-2">
                        <span className="h-6 w-6 flex items-center justify-center">
                          <HiOutlineBookmark className="h-5 w-5" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white p-5 border-[1.5px]">
                <div className="mb-2 mr-2 flex max-h-[35px] items-center">
                  <div className="mr-2 w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/images/winter.png"
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex max-h-[17.5px] items-center text-sm">
                      John Doe
                    </div>
                    <div className="flex max-h-[15px] items-center text-xs">
                      Sep 9
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:pl-[40px] md:pl-[20px] pl-[10px]">
                  <h2 className="mb-1 text-2xl font-bold">
                    <a>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                    </a>
                  </h2>
                  <div className="mb-2 flex w-full text-gray-500">
                    <a className="text-sm px-[7px] py-[4px]" href="/t/react">
                    #react
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/javascript">
                    #javascript
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/webdev">
                    #webdev
                    </a>
                    <a className="text-sm px-[7px] py-[4px]" href="/t/programming">
                    #programming
                    </a>
                  </div>
                  <div className="flex flex-row w-full items-center">
                    <div className="flex flex-row items-center">
                      <a className="text-sm pl-2 pr-3 py-1 items-center">
                        <span>💖🦄🤯👏🔥</span>
                        <span className="text-gray-500 ml-[14px]">190 reactions</span>
                      </a>
                      <a className="text-sm pl-2 pr-3 py-1 flex-row flex items-center">
                        <div className="h-6 w-6 mr-1 flex flex-row items-center">
                          <TfiComment className="h-4 w-4" />
                        </div>
                        <span className="text-gray-500">19 comments</span>
                      </a>
                    </div>
                    <div className="flex flex-row ml-auto items-center">
                      <small className="text-gray-500 mr-2 items-center">4 min read</small>
                      <button className="p-2">
                        <span className="h-6 w-6 flex items-center justify-center">
                          <HiOutlineBookmark className="h-5 w-5" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full space-y-4">
            <section className="rounded-md bg-white border-[1.5px]">
              <header className="py-3 px-4">
                <h3 className="text-xl font-bold text-gray-700">
                  <a href="/t/discuss">#discuss</a>
                </h3>
                <div className="text-gray-500 text-xs">
                   Discussion threads targeting the whole community 
                </div>
              </header>
              <div>
                <a className="p-4 flex flex-col">
                  ✨ Cursor AI Editor - Is It Actually Useful?
                  <div className="text-gray-500 text-xs pt-1">
                    3 comments
                  </div>
                </a>
              </div>
              <div>
                <a className="p-4 flex flex-col">
                  I&apos;m a Developer, But Lately, I&apos;m Just Stuck
                  <div className="text-gray-500 text-xs pt-1">
                    20 comments
                  </div>
                </a>
              </div>
              <div>
                <a className="p-4 flex flex-col">
                  Meme Monday
                  <div className="text-gray-500 text-xs pt-1">
                    45 comments
                  </div>
                </a>
              </div>
              <div>
                <a className="p-4 flex flex-col">
                  Google @ New Shortcut!
                  <div className="pt-1">
                    <div className="inline-block bg-yellow-400 rounded-md px-1 items-center">
                      <span className="text-orange-800 text-xs items-center">New</span>
                    </div>
                  </div>
                </a>
              </div>
              <div>
                <a className="p-4 flex flex-col">
                  Why Writing Your Own Tools Is More Important Than You Think
                  <div className="pt-1">
                    <div className="inline-block bg-yellow-400 rounded-md px-1 items-center">
                      <span className="text-orange-800 text-xs items-center">New</span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
            <section className="rounded-md bg-white border-[1.5px]">
              <header className="py-3 px-4">
                <h3 className="text-xl font-bold text-gray-700">
                  <a href="/t/discuss">#watercooler</a>
                </h3>
                <div className="text-gray-500 text-xs">
                   Light, and off-topic conversation
                </div>
              </header>
              <div>
                <a className="p-4 flex flex-col">
                  Meme Monday
                  <div className="text-gray-500 text-xs pt-1">
                    45 comments
                  </div>
                </a>
              </div>
              <div>
                <a className="p-4 flex flex-col">
                  Web Developers, AI, and Development Fundamentals
                  <div className="pt-1">
                    <div className="inline-block bg-yellow-400 rounded-md px-1 items-center">
                      <span className="text-orange-800 text-xs items-center">New</span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
            <section className="mt-2 px-4 pb-4">
              <header>
                <h4 className="font-mono text-sm font-bold py-2">
                  trending guides/resources
                </h4>
              </header>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
              <div className="flex flex-col text-sm">
                <a className="flex flex-row items-center p-4">
                  10 Things You Can Learn From Netflix's Architecture
                </a>
              </div>
            </section>
          </div>
        </div>
        {/* <div className="max-w-[15rem] sm:max-w-[16rem] md:max-w-[10rem] lg:max-w-[20rem] w-full bg-gray-100">
          </div>
          <main className="flex-grow bg-white max-">
          </main>
          <div className="w-64 bg-gray-100">
          </div> */}
        {/* </div> */}
      </div>
    </HydrateClient>
  );
}
