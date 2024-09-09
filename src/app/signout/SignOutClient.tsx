'use client';

import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { ClientSafeProvider } from "next-auth/react";

export default function SignOutClient({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!providers) return null;

  return (
    <Suspense>
    <div>
        <button onClick={() => signOut({ 
            callbackUrl: searchParams.get('callbackUrl') ?? "/"
          })}>
        Sign out
      </button>
    </div>
    </Suspense>
  );
}