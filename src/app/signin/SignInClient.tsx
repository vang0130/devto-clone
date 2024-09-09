'use client';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import { Button } from "t/components/ui/button";
import { Suspense } from "react";

function SignInButtons({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  const searchParams = useSearchParams();

  if (!providers) return null;

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="grid gap-4">
          <Button 
            variant="outline" className="w-full" 
            onClick={() => signIn(provider.id, {
              callbackUrl: searchParams.get('callbackUrl') ?? "/"
            })}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function SignInClient({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInButtons providers={providers} />
        </Suspense>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}