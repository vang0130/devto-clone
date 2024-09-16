'use client';

import Image from "next/image";
import { PiBellSimple } from "react-icons/pi";
import { useSession } from 'next-auth/react';
import PopUpComponent from '../profileoptions/profileOptions';
import SideBar from '../sidebar/sideBar';
import { RiSearchLine } from "react-icons/ri";

export default function Header() {
  const { data: session } = useSession();

  return (
      <header className="fixed left-0 right-0 top-0 h-[56px] border-b-[1.5px] bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1380px] items-center justify-start md:px-2 sm:px-1 lg:px-4">
          <SideBar />
          <a className="flex items-center" href="/">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          </a>
          <div className="mx-4 hidden flex-grow max-w-2xl sm:block lg:w-[680px]">
            <form className="border-grey-900 flex h-[40px] items-center rounded-md border">
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
            <div className="hidden flex-col md:block">
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
  );
}
