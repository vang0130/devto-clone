"use client";
import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { RiMenuFill } from "react-icons/ri";

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
import { TfiComment } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";

export default function SideBarClient() {
  const { data: session } = useSession();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  return (
    <div className="overflow-scroll">
      <button className="mx-2 p-2 md:hidden" onClick={toggleSidebar}>
        <RiMenuFill className="h-6 w-6" />
      </button>
      {isSidebarVisible && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute left-0 top-0 h-full w-[300px] items-center overflow-scroll bg-white">
            <header className="align-center flex h-[56px] w-full flex-row items-center px-4">
              <p className="justify-start text-xl font-bold">DEV Community</p>
              <button className="ml-auto justify-end" onClick={toggleSidebar}>
                <IoIosClose className="h-6 w-6" />
              </button>
            </header>
            <div className="p-2">
              {!session ? (
                <div className="mb-4 rounded-md border-[1.5px] bg-white px-4 py-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4">
                  <h2 className="mb-4 text-xl font-bold">
                    DEV Community is a community of 2,027,354 amazing developers
                  </h2>
                  <p className="mb-4 text-sm text-gray-500">
                    We&apos;re a place where coders share, stay up-to-date and
                    grow their careers.
                  </p>
                  <div className="mx-auto w-full max-w-[208px] flex-col items-center justify-center rounded-md sm:max-w-[160px] md:max-w-[160px] lg:max-w-[208px]">
                    <a
                      className="mb-[4px] inline-flex w-full items-center justify-center rounded-md border-[1px] border-blue-700 px-[15px] py-[7px] text-sm text-blue-700"
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
              ) : null}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
