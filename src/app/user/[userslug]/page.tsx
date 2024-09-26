"use client";
import ProfilePage from "../../profile/profilePage";
import { api } from "src/trpc/react";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "src/app/header/header";

export default function Page({ params }: { params: { userslug: string } }) {
  const { data: user, isLoading } = api.user.getUser.useQuery({
    userId: params.userslug,
  });

  if (isLoading || !user) {
    return <SkeletonLoader />;
  }

  return <ProfilePage user={user} />;
}

function SkeletonLoader() {
  return (
    <div>
      <Header />
      <div className="absolute z-0 h-[40px] w-full bg-black sm:h-[128px] sm:border-0 lg:h-[128px] lg:px-2"></div>
      <div className="mt-[56px] h-[336px] border-b-[1px] border-gray-300 sm:h-[319px] sm:w-full sm:rounded-md sm:border-0 md:px-2 lg:mx-auto lg:h-[343px] lg:w-[1024px] lg:px-4 lg:pb-3">
        <div className="relative h-[40px] w-full sm:h-[128px]">
          <div className="absolute z-10 w-full overflow-hidden px-3 py-2">
            <div className="h-[60px] w-[60px] rounded-full border-[4px] border-black bg-gray-200 object-cover sm:mx-auto sm:h-[128px] sm:w-[128px] sm:border-8" />
          </div>
        </div>
        <div className="relative h-[52px] justify-center bg-white pr-4 pt-4 sm:mx-2 sm:mt-[-56px] sm:h-[56px] sm:rounded-t-lg sm:border-x-[1px] sm:border-gray-300 sm:pb-5 md:mx-auto">
          <div className="ml-auto flex h-[40px] w-[115px] animate-pulse items-center rounded-md bg-gray-200 px-4 py-2 text-white"></div>
        </div>
        {/* <div className="flex h-[156px] flex-col items-center justify-center bg-white px-3 pb-3 pt-3 sm:mx-2 sm:h-[186px] sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-300 sm:p-4 sm:pt-9 md:mx-auto lg:h-[200px] lg:px-6 lg:pb-10 lg:pt-11"> */}
        <div className="flex h-[156px] flex-col bg-white px-3 pb-3 pt-3 sm:mx-2 sm:h-[186px] sm:rounded-b-lg sm:border-x-[1px] sm:border-b-[1px] sm:border-gray-300 sm:p-4 sm:pt-9 md:mx-auto lg:h-[200px] lg:px-6 lg:pb-10 lg:pt-11">
          <div className="mb-2 flex justify-start sm:justify-center">
            {/* <h1 className="text-2xl font-bold sm:text-3xl"></h1> */}
            <div className="sm:[160px] h-[32px] w-[135px] animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="mb-4 flex justify-start sm:justify-center">
            <div className="h-[24px] w-[115px] animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="mb-2 flex h-[40px] items-center justify-start text-xs text-gray-500 sm:justify-center">
            <div className="h-[24px] w-[190px] animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-grow bg-white p-3 sm:hidden">
          <div className="my-3 h-[64px] w-[351px] animate-pulse justify-start rounded-md bg-gray-200 px-[14px] py-[6px] sm:justify-center"></div>
        </div>
      </div>
      {/* Profile Details */}
      <div className="p-1 sm:p-0"></div>
      <div className="sm:grid sm:w-full sm:grid-cols-[2fr,5fr] lg:mx-auto lg:w-[1024px] lg:px-2">
        <div className="hidden bg-white sm:col-span-1 sm:col-start-1 sm:ml-2 sm:mt-1 sm:block sm:h-[136px] sm:flex-col sm:rounded-md sm:border-[1px] sm:border-gray-300 sm:px-3 sm:py-4 md:mt-0">
          <div className="mb-5 flex flex-row">
            <div className="h-[20px] w-[200px] animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="mb-5 flex flex-row">
            <div className="h-[20px] w-[200px] animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="mb-5 flex flex-row">
            <div className="h-[20px] w-[200px] animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>

        {/* User Posts */}
        <div className="mt-6 flex flex-col pt-4 sm:col-start-2 sm:mx-2 sm:pt-0 lg:mt-0">
          <div className="mb-2 flex flex-col">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="mb-2 w-full border-[1px] border-gray-300 bg-white px-4 pb-3 pt-4 sm:rounded-md"
              >
                <div className="mb-3 flex max-h-[35px] items-center">
                  <div className="mr-2 h-8 w-8 animate-pulse overflow-hidden rounded-full bg-gray-200"></div>

                  <div className="flex flex-col">
                    <div className="mb-1 h-[15px] w-[80px] animate-pulse rounded-md bg-gray-200" />
                    <div className="flex h-[12px] w-[40px] animate-pulse items-center rounded-md bg-gray-200 text-xs" />
                  </div>
                </div>
                <div className="flex flex-col items-center md:pl-[20px] lg:pl-[40px]">
                  <div className="mb-2 h-[28px] w-full justify-start">
                    <div className="h-[28px] w-[250px] animate-pulse rounded-md bg-gray-200" />
                  </div>
                  <div className="flex w-full flex-row items-center">
                    <div className="flex flex-row items-center">
                      <a className="flex flex-row items-center py-1 pr-3 text-sm">
                        <div className="mr-1 flex h-6 w-6 animate-pulse flex-row items-center rounded-md bg-gray-200 sm:w-[130px]"></div>
                        <div className="hidden animate-pulse rounded-md bg-gray-200 sm:inline-block"></div>
                      </a>
                    </div>
                    <div className="ml-auto flex flex-row items-center">
                      <div className="mr-2 h-[24px] w-[65px] animate-pulse items-center rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
