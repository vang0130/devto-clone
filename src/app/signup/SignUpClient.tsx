'use client';
import React from 'react';
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { ClientSafeProvider } from "next-auth/react";
import { GrApple, GrGoogle } from "react-icons/gr";
import { Suspense } from "react";
import { BsTwitterX } from "react-icons/bs";
import { ImGithub } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
import { IoTerminal } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";
declare module './SignUpClient';
import Image from "next/image";


// interface SignUpClientProps {
//   providers: Record<string, ClientSafeProvider> | null;
// }

// export default function SignUpClient({ providers }: SignUpClientProps) {

function SignUpButtons({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  const searchParams = useSearchParams();
  
  if (!providers) return null;
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <div className="flex flex-col items-center justify-center lg:px-12 pt-6 pb-12 mx-auto w-[288px] md:w-[400px] lg:w-[640px]">
        <div className="flex flex-col items-center justify-center mb-6">
          <a href="/">
            <Image src="/images/logo.png" alt="logo" className="w-[60px]" />
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
                  <span className="justify-center mx-auto text-sm">Sign Up with Apple</span>
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
                  <span className="justify-center mx-auto text-sm">Sign Up with Facebook</span>
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
                  <span className="justify-center mx-auto text-sm">Sign Up with Forem</span>
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
                  <span className="justify-center mx-auto text-sm">Sign Up with GitHub</span>
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
                  <span className="justify-center mx-auto text-sm">Sign Up with Google</span>
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
                  <span className="justify-center mx-auto text-sm">Sign Up with Twitter (X)</span>
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
                  <IoMailSharp className="justify-start w-5 h-5"/>
                  <span className="justify-center mx-auto text-sm">Sign Up with Email</span>
              </button>
            </div>
          ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center mt-6 lg:px-16">
            <p className="text-sm text-gray-500 text-center italic">By signing up, you are agreeing to our 
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
            <p className="text-md text-center">Already have an account?</p>
            <a href="/signin" className="pl-1 text-purple-500">Log in.</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SignUpClient({ providers }: { providers: Record<string, ClientSafeProvider> | null }) {
  return (
    <div className="">
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpButtons providers={providers} />
        </Suspense>
      </div>
    </div>
  );
}