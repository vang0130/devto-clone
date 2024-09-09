'use client';

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import type { ClientSafeProvider } from "next-auth/react";

function SignOutButton() {
  const searchParams = useSearchParams();

  return (
    <button onClick={() => signOut({ 
      callbackUrl: searchParams.get('callbackUrl') ?? "/"
    })}>
      Sign out
    </button>
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