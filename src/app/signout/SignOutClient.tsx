'use client';

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Suspense } from 'react';
import type { ClientSafeProvider } from "next-auth/react";

function SignOutButton() {
  // const { data: session } = useSession();
  const searchParams = useSearchParams();

  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      <header className="fixed left-0 right-0 top-0 h-[56px] bg-white border-b-[1.5px]">
        <div className="justify-start mx-auto flex h-full w-full max-w-[1380px] items-center px-4 sm:px-2 lg:px-4">
          <a className="flex items-center">
            <Image src="/images/logo.png" alt="logo" className="w-[50px]" />
          </a>
          <div className="mr-auto mx-4 max-w-2xl hidden sm:block sm:w-[400px] md:w-[600px] lg:w-[680px]">
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
              <div className="flex-col hidden md:block">
                <a href="/signout">
                  <div className="rounded-md px-4 mr-2 text-sm lg:px-4 py-2 sm:px-3 sm:py-1 sm:text-base min-w-[100px] text-center">
                    Sign Out 
                  </div>
                </a>
              </div>
              <div className="">
                <a href="/" > 
                <div className="flex items-center justify-center rounded-md border border-black text-sm px-3 py-2 w-[140px] text-center">
                  Create Post
                </div>
                </a>
              </div>
            </div>
          {/* } */}
        </div>
      </header>
      <div className="w-full min-h-screen flex flex-col py-[56px] items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">
          Are you sure you want to sign out?
        </h1>
          <button type="submit" className="flex bg-purple-500 text-white rounded-md h-12 px-5 py-3 justify-center" onClick={
            () => signOut({ 
              callbackUrl: searchParams.get('callbackUrl') ?? "/"
            })
          }>Yes, sign out
          </button>
      </div>
    </div>
  );
}

export default function SignOutClient({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  if (!providers) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <SignOutButton />
      </div>
    </Suspense>
  );
}