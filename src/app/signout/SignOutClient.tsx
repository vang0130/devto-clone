"use client";

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { ClientSafeProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Header from "../header/header";

function SignOutButton() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-[7.5px] py-[56px] sm:px-[15px]">
        <h1 className="mb-2 text-center text-2xl font-bold sm:text-2xl">
          Are you sure you want to sign out?
        </h1>
        <button
          type="submit"
          className="flex h-12 justify-center rounded-md bg-blue-700 px-5 py-3 text-white"
          onClick={() =>
            signOut({
              callbackUrl: searchParams.get("callbackUrl") ?? "/",
            })
          }
        >
          Yes, sign out
        </button>
      </div>
    </div>
  );
}

export default function SignOutClient({
  providers,
}: {
  providers: Record<string, ClientSafeProvider> | null;
}) {
  if (!providers) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <SignOutButton />
      </div>
    </Suspense>
  );
}
