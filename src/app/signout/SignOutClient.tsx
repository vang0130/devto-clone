'use client';

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import type { ClientSafeProvider } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Header from '../header/header'

function SignOutButton() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      <Header />
      <div className="w-full min-h-screen flex flex-col py-[56px] items-center justify-center px-[7.5px] sm:px-[15px]">
        <h1 className="text-2xl sm:text-2xl font-bold mb-2 text-center">
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