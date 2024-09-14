'use client';

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

function SignInButtons({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  const searchParams = useSearchParams();

  if (!providers) return null;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <div className="flex flex-col items-center justify-center md:px-12 pt-6 pb-12 mx-auto w-[288px] md:w-[640px] lg:w-[640px]">
        <div className="flex flex-col items-center justify-center mb-6">
          <a href="/">
            <Image src="/images/logo.png" alt="logo" className="" width={60} height={60} />
          </a>
          <h1 className="mt-6 text-3xl font-bold text-center">
            Join the DEV Community
          </h1>
          <p className="mt-2 text-md text-gray-500 text-center">
            DEV Community is a community of 2,0333,865 amazing developers
          </p>
        </div>
        <div className="flex flex-col w-full items-center space-y-3">
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <GrApple className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with Apple</span>
              </button>
            </div>
          ))}
          </div>
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <ImFacebook2 className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with Facebook</span>
              </button>
            </div>
          ))}
          </div>
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <IoTerminal className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with Forem</span>
              </button>
            </div>
          ))}
          </div>
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <ImGithub className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with GitHub</span>
              </button>
            </div>
          ))}
          </div>
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <GrGoogle className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with Google</span>
              </button>
            </div>
          ))}
          </div>
          <div className="mr-auto p-3 w-full m-[1px] border-[1.5px] border-gray-300 rounded-md">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
              <button className="w-full flex flex-row items-center" onClick={() => signIn(provider.id, {
                  callbackUrl: searchParams.get('callbackUrl') ?? "/"
                })}>
                  <BsTwitterX className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Continue with Twitter (X)</span>
              </button>
            </div>
          ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-row items-center justify-center my-5">
            <div className="w-1/2 h-[1px] bg-gray-300"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="w-1/2 h-[1px] bg-gray-300"></div>
          </div>
          {/* form for email and password */}
          <form className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center mb-3">
              <label htmlFor="email" className="text-md justify-start mr-auto">Email</label>
              <input type="email" className="w-full px-2 py-[6.5px] border-[1px] mt-2 border-gray-300 rounded-md" />
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-3">
              <label htmlFor="password" className="text-md justify-start mr-auto">Password</label>
              <input type="password" className="w-full px-2 py-[6.5px] border-[1px] mt-2 border-gray-300 rounded-md" />
            </div>
            {/* remember me and forgot password */}
            <div className="w-full flex flex-row items-center justify-between mb-3">
              <div className="flex flex-row items-center justify-center">
                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded-md" />
                <label htmlFor="remember" className="text-md ml-2">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-md text-purple-500">Forgot password?</a>
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-[5px] pt-3">
              <button type="submit" className="w-full bg-purple-500 text-white rounded-md h-12 px-5 py-3">Log In</button>
            </div>
          </form>
          <div className="w-full flex flex-col items-center justify-center mt-6 lg:px-16">
            <p className="text-sm text-gray-500 text-center italic">By signing in, you are agreeing to our 
              <a href="/privacy-policy" className="pl-1 text-purple-500">privacy policy</a>, 
              <a href="/terms-of-use" className="pl-1 text-purple-500">terms of use</a> and 
              <a href="/code-of-conduct" className="pl-1 text-purple-500">code of conduct</a> . 
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center my-6">
            {/* add horizontal line */}
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>
          <div className="w-full flex flex-row items-center justify-center pb-6">
            <p className="text-md text-center">New to DEV Community?</p>
            <a href="/signup" className="pl-1 text-purple-500">Create account.</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SignInClient({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
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