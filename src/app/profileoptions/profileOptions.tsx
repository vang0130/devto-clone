'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PopupComponent() {
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { data: session } = useSession();

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);
  return (
    <div className="align-center flex items-centerjustify-center">
        <button onClick={togglePopup} className="align-center justify-center">
            <img src="/images/winter.png" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
        </button>
        {isPopupVisible && (
        <div className="absolute left-0 right-0 top-[60px] mx-2 sm:right-0 sm:left-auto md:right-0 md:left-auto  md:w-[256px] md:top-[52px] lg:right-40 lg:left-auto lg:w-[256px] lg:top-[52px] bg-white border border-gray-300 rounded-md shadow-md p-2">
            <ul className="flex flex-col">
                <li className="pb-2 mb-2 border-b-[1px] border-gray-300">

                    <a href="/profile" className="flex flex-col px-4 py-2">
                        <span className="text-md">{session?.user?.name}</span>
                        <span className="text-gray-500 text-sm">
                            @{session?.user?.id}
                        </span>
                    </a>
                </li>
                <li className="px-4 py-2">
                    <a href="/">Dashboard</a>
                </li>
                <li className="px-4 py-2">
                    <a href="/createpost">Create Post</a>
                </li>
                <li className="px-4 py-2">
                    <a href="/">Reading List</a>
                </li>
                <li className="px-4 pt-2 pb-4 border-b-[1px] border-gray-300">
                    <a href="/settings">Settings</a>
                </li>
                <li className="px-4 pt-4 pb-2">
                    <a href="/signout">Sign Out</a>
                </li>
            </ul>
        </div>
        )}
      {/* <button onClick={() => setIsPopupVisible(true)}>Open Popup</button>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2>Popup Content</h2>
            <p>This is the popup content.</p>
            <button onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
}