"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { ClientSafeProvider } from "next-auth/react";
import { GrApple, GrGoogle } from "react-icons/gr";
import { Suspense } from "react";
import { BsTwitterX } from "react-icons/bs";
import { ImGithub } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
import { IoTerminal } from "react-icons/io5";
import Image from "next/image";

function SignInButtons({
  providers,
}: {
  providers: Record<string, ClientSafeProvider> | null;
}) {
  const searchParams = useSearchParams();

  if (!providers) return null;

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4">
      <div className="mx-auto flex w-full flex-col items-center justify-center pb-12 pt-6 md:w-[640px] md:px-12 lg:w-[640px]">
        <div className="mb-6 flex flex-col items-center justify-center">
          <a href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              className=""
              width={60}
              height={60}
            />
          </a>
          <h1 className="mt-6 text-center text-3xl font-bold">
            Join the DEV Community
          </h1>
          <p className="text-md mt-2 text-center text-gray-500">
            DEV Community is a community of 2,0333,865 amazing developers
          </p>
        </div>
        <div className="flex w-full flex-col items-center space-y-3">
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <GrApple className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with Apple
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <ImFacebook2 className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with Facebook
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <IoTerminal className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with Forem
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <ImGithub className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with GitHub
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <GrGoogle className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with Google
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="m-[1px] mr-auto w-full rounded-md border-[1.5px] border-gray-300 p-3">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: searchParams.get("callbackUrl") ?? "/",
                    })
                  }
                >
                  <BsTwitterX className="h-5 w-5 justify-start" />
                  <span className="mx-auto justify-center text-sm">
                    Continue with Twitter (X)
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="my-5 flex w-full flex-row items-center justify-center">
            <div className="h-[1px] w-1/2 bg-gray-300"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="h-[1px] w-1/2 bg-gray-300"></div>
          </div>
          {/* form for email and password */}
          <form className="flex w-full flex-col items-center justify-center">
            <div className="mb-3 flex w-full flex-col items-center justify-center">
              <label htmlFor="email" className="text-md mr-auto justify-start">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-md border-[1px] border-gray-300 px-2 py-[6.5px] focus:outline-none"
              />
            </div>
            <div className="mb-3 flex w-full flex-col items-center justify-center">
              <label
                htmlFor="password"
                className="text-md mr-auto justify-start"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-md border-[1px] border-gray-300 px-2 py-[6.5px] focus:outline-none"
              />
            </div>
            {/* remember me and forgot password */}
            <div className="mb-3 flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-md border border-gray-300 focus:outline-none"
                />
                <label htmlFor="remember" className="text-md ml-2">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-md text-blue-700">
                Forgot password?
              </a>
            </div>
            <div className="mb-[5px] flex w-full flex-col items-center justify-center pt-3">
              <button
                type="submit"
                className="h-12 w-full rounded-md bg-blue-700 px-5 py-3 text-white"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="mt-6 flex w-full flex-col items-center justify-center lg:px-16">
            <p className="text-center text-sm italic text-gray-500">
              By signing in, you are agreeing to our
              <a href="/privacy-policy" className="pl-1 text-blue-700">
                privacy policy
              </a>
              ,
              <a href="/terms-of-use" className="pl-1 text-blue-700">
                terms of use
              </a>{" "}
              and
              <a href="/code-of-conduct" className="pl-1 text-blue-700">
                code of conduct
              </a>{" "}
              .
            </p>
          </div>
          <div className="my-6 flex w-full flex-col items-center justify-center">
            {/* add horizontal line */}
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>
          <div className="flex w-full flex-row items-center justify-center pb-6">
            <p className="text-md text-center">New to DEV Community?</p>
            <a href="/signup" className="pl-1 text-blue-700">
              Create account.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInClient({
  providers,
}: {
  providers: Record<string, ClientSafeProvider> | null;
}) {
  return (
    <div className="">
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInButtons providers={providers} />
        </Suspense>
      </div>
    </div>
  );
}
