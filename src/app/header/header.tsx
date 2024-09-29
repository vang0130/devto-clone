"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import PopUpComponent from "../profileoptions/profileOptions";
import SideBar from "../sidebar/sideBar";
import { RiSearchLine } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // get url
  const [searchTerm, setSearchTerm] = useState("");

  // keep search term in search bar
  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts[1] === "search" && pathParts[2]) {
      setSearchTerm(decodeURIComponent(pathParts[2])); // get curr search term from class
    }
  }, [pathname]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // set debounced search term when user types something, with 200ms timeout
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);
    // cleanup if user types again before 200ms passes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // conduct search otherwise (happens whenever debouncedSearchTerm is updated)
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, router]);

  // conduct search if user click enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(`/search/${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[56px] border-b-[1px] border-gray-300 bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1380px] items-center justify-start sm:px-1 md:px-2 lg:px-4">
        <SideBar />
        <a className="flex items-center" href="/">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
        </a>
        <button className="mr-1 flex flex-grow justify-end p-2 md:hidden">
          <RiSearchLine className="h-6 w-6" />
        </button>
        <div className="mx-4 hidden max-w-2xl flex-grow md:block md:w-[680px]">
          <form className="flex h-[40px] items-center rounded-md border border-gray-300">
            <button className="pl-2 pr-1">
              <RiSearchLine className="h-6 w-6" />
            </button>
            <input
              type="text"
              value={searchTerm} // keeps search term in bar
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="h-full w-full rounded-md pl-2 pr-4 focus:outline-none"
            />
          </form>
        </div>
        {status === "loading" ? (
          <SkeletonLoader />
        ) : session ? (
          <div className="ml-auto flex items-center">
            <div className="">
              <a href="/createpost">
                <div className="mr-2 hidden w-[116.5px] items-center justify-center rounded-md border border-blue-700 px-3 py-2 text-center text-sm text-blue-700 sm:flex">
                  Create Post
                </div>
              </a>
            </div>
            <div className="p-2 sm:hidden">
              <a href="/">
                <RiSearchLine className="h-6 w-6" />
              </a>
            </div>
            <div className="mx-1 p-2">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-labelledby="aqx7ji0vxmsiywct9cbn0tnrw42ujc92"
                >
                  <title id="aqx7ji0vxmsiywct9cbn0tnrw42ujc92">
                    Notifications
                  </title>
                  <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                </svg>
              </a>
            </div>
            <div className="mx-1 p-2">
              <PopUpComponent />
            </div>
          </div>
        ) : (
          <div className="ml-auto flex items-center">
            <div className="hidden flex-col md:block">
              <a href="/signin">
                <div className="mr-2 min-w-[100px] rounded-md px-4 py-2 text-center text-sm sm:px-3 sm:py-1 sm:text-base md:px-4">
                  Log In
                </div>
              </a>
            </div>
            <div className="">
              <a href="/signup">
                <div className="mr-2 flex w-[140px] items-center justify-center rounded-md border border-blue-700 px-3 py-2 text-center text-sm text-blue-700">
                  Create Account
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function SkeletonLoader() {
  return <div className="ml-auto flex items-center"></div>;
}
