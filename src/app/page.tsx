import Link from "next/link";
import Image from "next/image";

import { LatestPost } from "t3/app/_components/post";
import { getServerAuthSession } from "t3/server/auth";
import { api, HydrateClient } from "t3/trpc/server";


import { HiOutlineHome } from "react-icons/hi2";
import { SlSpeech } from "react-icons/sl";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsCameraReels} from "react-icons/bs";
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
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white">
        <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-2 lg:px-4 h-full flex items-center justify-left">
          <a className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-[40px] sm:w-[50px]"/>
          </a>
          
          <div className="hidden sm:block flex-grow max-w-2xl mx-4">
            <form className="border border-grey-900 rounded-md h-[40px] flex items-center">
              <button className="pl-2 pr-1">
                <Image src="/search.svg" alt="search" width={20} height={20}/>
              </button>
              <input type="text" placeholder="Search" className="w-full h-full rounded-md pl-2 pr-4"/>
            </form>
          </div>
          <div className="flex items-center ml-auto">
            <a className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base rounded-md">
              Log In
            </a>
            <a className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base rounded-md border border-black">
             Create Account 
            </a>
          </div>
        </div>
      </header>
      <div className="max-w-[86.25rem] w-full mx-auto px-4 sm:px-2 lg:px-4 min-h-screen pt-[72px] flex flex-col">
        {/* <div className="flex flex-grow"> */}
          <div className="flex-grow grid grid-cols-[15rem,1fr,1fr,1fr] gap-4">
            <div className="max-w-[10rem] sm:max-w-[6rem] md:max-w-[10rem] lg:max-w-[15rem] w-full">
              <div className="px-4 py-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4 bg-white min-h-[320px] rounded-md">
                <h2 className="text-xl font-bold mb-4">
                  DEV Community is a community of 2,027,354 amazing developers
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  We&apos;re a place where coders share, stay up-to-date and grow their careers.
                </p>
                <div className="max-w-[208px] sm:max-w-[160px] md:max-w-[160px] lg:max-w-[208px] w-full h-[84px] rounded-md flex-col items-center justify-center">
                  <a className="inline-flex items-center justify-center w-full px-[15px] py-[7px] mb-[4px] text-sm border-[1px] border-black rounded-md">
                    Create account
                  </a>
                  <a className="inline-flex items-center justify-center w-full px-[15px] py-[7px] text-sm">
                    Log in 
                  </a>
                </div>
              </div>
              <nav className="flex flex-col mt-4 mb-4 min-h-[600px] text-sm">
                <ul className="min-h-[40px]">
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineHome className="w-5 h-5"/>
                      </span>
                      Home
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <SlSpeech className="w-5 h-5"/>
                      </span>
                     DEV++ 
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineMicrophone className="w-5 h-5"/>
                      </span>
                      Podcasts
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <BsCameraReels className="w-5 h-5"/>
                      </span>
                      Videos
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <IoPricetagsOutline className="w-5 h-5"/>
                      </span>
                      Tags
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineLightBulb className="w-5 h-5"/>
                      </span>
                      DEV Help
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineShoppingBag className="w-5 h-5"/>
                      </span>
                      Forem Shop
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineHeart className="w-5 h-5"/>
                      </span>
                      Advertise on DEV
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineTrophy className="w-5 h-5"/>
                      </span>
                      DEV Challenges
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineSparkles className="w-5 h-5"/>
                      </span>
                      DEV Showcase
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <FaDev className="w-5 h-5"/>
                      </span>
                      About
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineMegaphone className="w-5 h-5"/>
                      </span>
                      Contact
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <SiPostgresql className="w-5 h-5"/>
                      </span>
                      Free Postgres Database
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineBookOpen className="w-5 h-5"/>
                      </span>
                      Guides 
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineFaceSmile className="w-5 h-5"/>
                      </span>
                      Software Comparisons
                    </a>
                  </li>
                </ul>
              </nav>
              <nav className="flex flex-col mb-4 min-h-[160px] text-sm ">
                <h2 className="text-xl font-bold pl-3 pt-2 pb-2">
                  Other
                </h2>
                <ul className="min-h-[40px]">
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <HiOutlineHandThumbUp className="w-5 h-5"/>
                      </span>
                      Code of Conduct
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <PiEyeglasses className="w-5 h-5"/>
                      </span>
                      Privacy Policy 
                    </a>
                  </li>
                  <li className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2">
                      <span className="mr-2">
                        <PiEyesFill className="w-5 h-5"/>
                      </span>
                     Terms of use 
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="grid grid-cols-6 mb-4 justify-start">
                <a className="px-4 py-2" href="https://twitter.com/thepracticaldev">

                        <RiTwitterXFill className="w-5 h-5"/>
                </a>
                <a className="px-4 py-2" href="https://www.facebook.com/thepracticaldev">

                        <RiFacebookBoxFill className="w-5 h-5"/>
                </a>
                <a className="px-4 py-2" href="https://www.github.com/forem">

                        <RiGithubFill className="w-5 h-5"/>
                </a>
                <a className="px-4 py-2" href="https://www.instagram.com/thepracticaldev">

                        <RiInstagramLine className="w-5 h-5"/>
                </a>
                <a className="px-4 py-2" href="https://www.twitch.com/thepracticaldev">

                        <RiTwitchFill className="w-5 h-5"/>
                </a>
                <a className="px-4 py-2" href="https://www.fostodon.org/thepracticaldev">

                        <SiMcdonalds className="w-5 h-5"/>
                </a>
              </div>
              <nav className="mb-6 min-h-[250px]">
                <h3 className="text-l font-bold px-2 py-2 min-h-[40px]">
                  Popular Tags
                </h3>
                <div className="max-h-[210px] overflow-y-auto">
                  <div className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2 text-gray-700 font-thin-monospace" href="/t/webdev">
                      #webdev
                    </a>
                  </div>
                  <div className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2" href="/t/javascript">
                      #javascript
                    </a>
                  </div>
                  <div className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2" href="/t/beginners">
                      #beginners
                    </a>
                  </div>
                  <div className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2" href="/t/programming">
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
                    <a className="flex items-center px-4 py-2" href="/t/productivity">
                      #productivity
                    </a>
                  </div>
                  <div className="min-h-[40px]">
                    <a className="flex items-center px-4 py-2" href="/t/opensource">
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
                    <a className="flex items-center px-4 py-2" href="/t/typescript">
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
                    <a className="flex items-center px-4 py-2" href="/t/machinelearning">
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
                    <a className="flex items-center px-4 py-2" href="/t/development">
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
              <div className="flex flex-col px-3 pt-3 pb-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4 bg-white min-h-[320px] rounded-md">
                <div className="flex items-center min-h-[32px]">
                  <div className="text-sm ">💎 DEV Diamond Sponsors</div>
                  <button className="ml-auto">
                    <BsThreeDots className="w-6 h-6 px-1 py-1"/>
                  </button>
                </div>
                <div className="flex-grow pt-3 pb-1 px-1 h-full">
                  <h4 className="text-md font-bold mb-[10px]">
                    Thank you to our Diamond Sponsor Neon
                  </h4>
                  <img src="/images/neon.png" alt="neon" className="w-full h-full rounded-md mb-[20px]"/>
                  <p className="text-md font-light mb-[20px]">
                    <em className="">
                      Neon is the official database partner of DEV
                    </em>
                  </p>
                  <p>Happy coding ❤️</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex flex-col max-h-[413px] overflow-y-auto px-3 pt-3 pb-4 sm:px-2 sm:py-2 lg:px-4 lg:py-4 bg-white min-h-[320px] rounded-md">
                  <div className="flex items-center min-h-[32px]">
                    <div className="text-sm ">DEV Community</div>
                    <button className="ml-auto">
                      <BsThreeDots className="w-6 h-6 px-1 py-1"/>
                    </button>
                  </div>
                  <div className="flex-grow pt-3 pb-1 px-1 h-full">
                    <h2 className="text-xl font-bold mb-[10px]">
                      Get Your Writing Debut Badge
                    </h2>
                    <p className="text-md font-light mb-[20px]">
                      Share your first DEV post and join a vibrant community of tech enthusiasts!
                    </p>
                    <img src="/images/write.png" alt="write-badge" className="w-full h-full rounded-md mb-[20px]"/>
                  <a className="inline-flex items-center justify-center w-full px-[15px] py-[7px] mb-[4px] text-sm border-[1px] border-black rounded-md">
                   Write Your First Post 
                  </a>
                  </div>
                </div>
              </div>
              <footer className="mt-6 min-h-[221px] font-light text-sm">
                <p>
                  <a className="pr-[4px] text-blue-500" href="/">
                    DEV Community 
                  </a>
                  A constructive and inclusive social network for software developers. With you every step of your journey. 
                </p>
                <p className="mt-[16px]">
                  Built on
                  <a className="pr-[4px] pl-[4px] text-blue-500" href="/">
                    Forem
                  </a>
                  — the                </p>
                  <a className="pr-[4px] text-blue-500" href="/">
                   open source  
                  </a>
                  software that powers
                  <a className="pr-[4px] pl-[4px] text-blue-500" href="/">
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
            <div className="col-span-2">09</div>
            <div>09</div>
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
