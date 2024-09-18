'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsLightningCharge } from "react-icons/bs";
import { api } from "src/trpc/react";
import { uploadFile } from "src/app/upload/action";
import Header from "../header/header"

type UploadState = {
  status: "success" | "error";
  message: string;
};

const initialState: UploadState = { status: "success", message: "" };

export default function SettingsClient() {
  const { data: session, update } = useSession();
  const [website, setWebsiteURL] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<UploadState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImageUrl] = useState(session?.user?.image ?? ''); // Use initial image from session

  // Mutation to update user information
  const handleUserInfoChanges = api.user.updateUserInfo.useMutation({
    onSuccess: async () => {
      await update({ name, email, image, website, location, bio });
      setState({ status: "success", message: "" });
    },
    onError: () => {
      setState({ status: "error", message: "" });
    },
  });

  // Handle file input change
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile); // Update file state when user selects a file

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Upload the file and get the resulting image URL
      const result = await uploadFile(formData, state);
      if (typeof result === "string") {
        setImageUrl(result); // Update the image URL state
        setState({ status: "success", message: "" });
      } else {
        // setState({ status: "error", message: result.message ?? "Failed to upload image." });
      }
    }
  };

  // Update user information including the image URL
  const updateUser = async () => {
    const changes: Record<string, string> = {};

    // Check each field and add to changes if not empty
    if (name) changes.name = name;
    if (email) changes.email = email;
    if (image) changes.image = image;
    if (website) changes.website = website;
    if (location) changes.location = location;
    if (bio) changes.bio = bio;

    if (Object.keys(changes).length > 0) {
      handleUserInfoChanges.mutate(changes);
    } else {
      setState({ status: "error", message: "No changes to update." });
    }
    // handleUserInfoChanges.mutate({  })
  };

  return (
    <div>
      <Header />
      {/* Profile and Settings UI */}
      <div className="sm:px-2 grid mt-[68px] max-w-[1024px] mx-auto sm:grid-rows-[70px,240px,min-content,min-content] sm:grid-cols-[2fr,4fr] sm:gap-4 lg:grid-cols-[240px,736px]">
        {/* Side Menu for Settings */}
        <div className="sm:hidden flex flex-col items-center justify-center p-2">
          <select className="p-2 w-full h-[39px] border border-gray-300 rounded-md bg-white">
            <option>Profile</option>
            <option>Customisation</option>
            <option>Notifications</option>
            <option>Account</option>
            <option>Organisation</option>
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
              Organisation
            </a>
            <a href="/settings" className="p-2 flex items-center">
              <BsLightningCharge className="mr-4 h-6 w-6" />
              Extensions
            </a>   
          </nav>
        </div>

        {/* Profile Section */}
        <div className="py-1 sm:hidden"></div>
        <div className="sm:col-start-2 col-span-1 sm:row-span-1 mx-auto p-3 h-[70px] w-full max-w-[1380px]">
          <div className="align-top flex flex-col items-start">
            <h1 className="text-xl sm:text-3xl font-bold text-blue-500 align-top">@{session?.user?.id}</h1>
          </div>
        </div>
        
        {/* Connect Accounts Section */}
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
        
        {/* User Information Form */}
        <div className="sm:col-start-2 col-span-1">
          <div className="p-4 mb-4 grid grid-cols-1 sm:rounded-md gap-4 bg-white border border-gray-300">
            <h2 className="text-2xl font-bold col-span-1">User</h2>
            <div className="flex flex-col col-span-1">
              <label>Name</label>
              <input 
                type="text" 
                placeholder={session?.user?.name ?? ''} 
                className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label>Email</label>
              <input 
                type="email" 
                placeholder={session?.user?.email ?? ''} 
                className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[min-content,1fr] gap-1 items-center">
              <input type="checkbox" className="h-[14px] w-[14px] border border-gray-300 rounded-md bg-white m-[3px]" />
              <label className="justify-start">Display email on profile</label>
            </div>
            <div className="flex flex-col col-span-1">
              <label>Username</label>
              <input 
                type="text" 
                placeholder={session?.user?.id ?? ''} 
                className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
              />
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col col-span-1">
              <label>Profile image</label>
              <div className="mt-2 flex items-center">
                <div className="mr-2 h-16 items-center justify-center flex w-min-content">
                  <img
                    src={session?.user?.image ?? "/images/avatar.png"}  // Use the updated image state
                    alt="logo"
                    className="h-12 w-12 flex items-center justify-start object-cover rounded-full overflow-hidden"
                  />
                </div>
                <div className="flex flex-grow items-center justify-start p-3">
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-row items-center">
                      <label className="cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px] mr-3">
                        Browse...
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept="image/*" 
                          className="hidden"
                          onChange={handleFileChange}  // Attach file change handler
                        />
                      </label>
                    </div>
                    <div className="ml-3">
                      {state?.status && (
                        <div className={`state-message ${state.status}`}>
                          {state.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information Form */}
          <div className="p-4 mb-4 mt-2 grid grid-cols-1 sm:rounded-md sm:grid-start-2 gap-4 bg-white border border-gray-300">
            <h2 className="text-2xl font-bold col-span-1">Basic</h2>
            <div className="flex flex-col col-span-1">
              <label>Website URL</label>
              <input type="url" 
                placeholder={session?.user?.website ?? "https://yoursite.com"}
                size={100} 
                className="p-[6.5px] mt-2 w-full h-[39px] border border-gray-300 rounded-md bg-white"
                value={website}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
              <span className="text-xs text-gray-500 justify-end mt-2 ml-auto">
                {website.length}/100
              </span>
            </div>
            <div className="flex flex-col col-span-1">
              <label>Location</label>
              <input type="text" 
                placeholder={session?.user?.location ?? "Halifax, Nova Scotia"}
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
                placeholder={session?.user?.bio ?? "A short bio..."}
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

          <div className="flex flex-col col-span-1 m-1">
            <button className="h-[40px] px-3 py-2 rounded-md bg-blue-500 text-white w-full" 
              onClick={updateUser}
              type="submit"
              disabled={handleUserInfoChanges.isPending}
            >
              {handleUserInfoChanges.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
