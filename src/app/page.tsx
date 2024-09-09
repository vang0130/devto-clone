import Link from "next/link";
import Image from "next/image";

import { LatestPost } from "t3/app/_components/post";
import { getServerAuthSession } from "t3/server/auth";
import { api, HydrateClient } from "t3/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>

    <nav>
      <div className="logo">
        <Link href="/">
          <Image src="/image.png" width={100} height={50} alt="Logo" />
        </Link>
      </div>
    </nav>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#024d6d] to-[#15222c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}. This is a secret message.</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
