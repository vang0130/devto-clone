'use client'
import Image from "next/image";
import { PiBellSimple } from "react-icons/pi";
import PopUpComponent from '../profileoptions/profileOptions';
import SideBar from '../sidebar/sideBar';
import { RiSearchLine } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsLightningCharge } from "react-icons/bs";

export default function SettingsClient() {
    const { data: session } = useSession();
    const [websiteURL, setWebsiteURL] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

  return (
    <div>
      <header className="fixed left-0 right-0 top-0 h-[56px] border-b-[1.5px] bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1380px] items-center justify-start md:px-2 sm:px-1 lg:px-4">
          <SideBar />
          <a className="flex items-center" href="/">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          </a>
          <div className="mx-4 hidden flex-grow max-w-2xl sm:block lg:w-[680px]">
            <form className="border-grey-900 flex h-[40px] items-center rounded-md border">
              <button className="pl-2 pr-1">
                <RiSearchLine className="h-6 w-6" />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="h-full w-full rounded-md pl-2 pr-4"
              />
            </form>
          </div>
          {session ?
          <div className="ml-auto flex items-center">
            <div className="">
              <a href="/createpost">
                <div className="hidden sm:flex w-[116.5px] mr-2 items-center justify-center rounded-md border border-black px-3 py-2 text-center text-sm">
                  Create Post
                </div>
              </a>
            </div>
            <div className="p-2 sm:hidden">
              <a href="/">  
                <RiSearchLine className="h-6 w-6" />
              </a>
            </div>
            <div className="p-2 mx-1">
              <a href="">
                <PiBellSimple className="h-6 w-6" />
              </a>
            </div>
            <div className="p-2 mx-1">
              <PopUpComponent />
              {/* <button onClick={() => setIsPopupVisible(true)}>
                <img src="/images/winter.png" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
              {isPopupVisible && (
                <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-md shadow-md p-2">
                  <p>User Profile</p>
                  <p>Settings</p>
                  <p>Logout</p>
                </div>
              )}
              </button> */}
            </div>
          </div>
          : null}
          {!session ?
          <div className="ml-auto flex items-center">
            <div className="hidden flex-col md:block">
              <a href="/signin">
                <div className="mr-2 min-w-[100px] rounded-md px-4 py-2 text-center text-sm sm:px-3 sm:py-1 sm:text-base lg:px-4">
                  Log In
                </div>
              </a>
            </div>
            <div className="">
              <a href="/signup">
                <div className="flex w-[140px] items-center justify-center rounded-md border border-black px-3 py-2 text-center text-sm mr-2">
                  Create Account
                </div>
              </a>
            </div>
          </div>
          : null}
        </div>
      </header>
      <div className="sm:px-2 grid mt-[68px] max-w-[1024px] mx-auto sm:grid-rows-4 sm:grid-rows-[70px,240px,min-content,min-content] sm:grid-cols-[2fr,4fr] sm:gap-4 lg:grid-cols-[240px,736px]">
        <div className="sm:hidden flex flex-col items-center justify-center p-2">
          <select className="p-2 w-full h-[39px] border border-gray-300 rounded-md bg-white">
            <option>Profile</option>
            <option>Customisation</option>
            <option>Notifications</option>
            <option>Account</option>
            <option>Orgnisation</option>
            <option>Extensions</option>
        </select>
        </div>
        <div className="hidden sm:flex sm:col-start-1 sm:col-span-1 sm:pt-3 sm:row-span-4">
            <nav className="flex flex-col h-[240px]">
                <a href="/settings" className="p-2 flex items-center">
                    <FaRegSmile className="mr-4 h-6 w-6" />
                    Profile
                </a>
                <a href="/settings" className="p-2 flex items-center">
                    <IoSettingsOutline className="mr-4 h-6 w-6" />
                    Customisation
                </a>
                <a href="/settings" className="p-2 flex items-center">
                    <BsMailbox className="mr-4 h-6 w-6" />
                    Notifications
                </a>
                <a href="/settings" className="p-2 flex items-center">
                    <PiPlant className="mr-4 h-6 w-6" />
                    Account
                </a>
                <a href="/settings" className="p-2 flex items-center">
                    <HiOutlineOfficeBuilding className="mr-4 h-6 w-6" />
                Organisation</a>
                <a href="/settings" className="p-2 flex items-center">
                    <BsLightningCharge className="mr-4 h-6 w-6" />
                        Extensions
                </a>   
            </nav>
        </div>
      <div className="py-1 sm:hidden"></div>
      <div className="sm:col-start-2 col-span-1 sm:row-span-1mx-auto p-3 h-[70px] w-full max-w-[1380px]">
        <div className="align-top flex flex-col items-start">
          <h1 className="text-xl sm:text-3xl font-bold text-blue-500 align-top">@{session?.user?.id}</h1>
        </div>
      </div>
      <div className="sm:col-start-2 sm:row-start-2 col-span-1 sm:rounded-md bg-white border border-gray-300 p-4 mb-4 sm:mb-2 grid grid-cols-1 items-center justify-center">
        <button className="h-[40px] px-3 py-2 m-1 rounded-md bg-blue-500 text-white w-full">
          Connect Facebook Account
        </button>
        <button className="h-[40px] px-3 py-2 m-1 rounded-md bg-green-900 text-white w-full">
          Connect Forem Account
        </button>
        <button className="h-[40px] px-3 py-2 m-1 rounded-md bg-gray-900 text-white w-full">
          Connect GitHub Account
        </button>
        <button className="h-[40px] px-3 py-2 m-1 rounded-md bg-black text-white w-full">
          Connect Twitter (X) Account
        </button>
      </div>
      <div className="sm:col-start-2 col-span-1">
      <div className="p-4 mb-4 grid grid-cols-1 sm:rounded-md gap-4 bg-white border border-gray-300">
        <h2 className="text-2xl font-bold col-span-1">User</h2>
        <div className="flex flex-col col-span-1">
            <label>Name</label>
            <input type="text" placeholder={session?.user?.name ?? ''} className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white">
            </input>
        </div>
        <div className="flex flex-col col-span-1">
            <label>Email</label>
            <input type="email" placeholder={session?.user?.email ?? ''} className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white">
            </input>

        </div>
        <div className="grid grid-cols-[min-content,1fr] gap-1 items-center">
            <input type="checkbox" className="h-[14px] w-[14px] border border-gray-300 rounded-md bg-white m-[3px]">
            </input>
            <label className="justify-start">Display email on profile</label>
        </div>
        <div className="flex flex-col col-span-1">
            <label>Username</label>
            <input type="text" placeholder={session?.user?.id ?? ''} className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white">
            </input>
        </div>
        <div className="flex flex-col col-span-1">
            <label>Profile image</label>
            <div className="mt-2 flex items-center">
                <div className="mr-2 h-16 items-center justify-center flex w-min-content">
                      <img
                        src="/images/winter.png"
                        alt="logo"
                        className="h-12 w-12 flex items-center justify-start object-cover rounded-full overflow-hidden"
                      />
                </div>
                <div className="flex flex-grow items-center justify-start p-3">
                    <label className="cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px]">
                        Browse...
                        <input accept="image/*" type="file" className="hidden" />
                    </label>
                </div>
            </div>
        </div>
        </div>
    <div className="flex flex-col col-span-1"></div>

          <div className="p-4 mb-4 mt-2 grid grid-cols-1 sm:rounded-md sm:grid-start-2 gap-4 bg-white border border-gray-300">
        <h2 className="text-2xl font-bold col-span-1">Basic</h2>
        <div className="flex flex-col col-span-1">
            <label>Website URL</label>
            <input type="url" 
            placeholder="https://yoursite.com" 
            size={100} 
            className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            />
            <span className="text-xs text-gray-500 justify-end mt-2 ml-auto">
                {websiteURL.length}/100
            </span>
        </div>
        <div className="flex flex-col col-span-1">
            <label>Location</label>
            <input type="text" 
            placeholder="Halifax, Nova Scotia" 
            size={100} 
            className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <span className="text-xs text-gray-500 justify-end mt-2 ml-auto">
                {location.length}/100
            </span>
        </div>
        <div className="flex flex-col col-span-1 items-start">
            <label>Bio</label>
            <textarea
            placeholder="A short bio..." 
            // size={200} 
            maxLength={200}
            className="p-[6.5px] mt-2 w-full h-[63px] border border-gray-300 rounded-md bg-white items-start break-words whitespace-pre-wrap"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            />
            <span className="text-xs text-gray-500 justify-end mt-2 ml-auto">
                {bio.length}/200
            </span>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
