"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsLightningCharge } from "react-icons/bs";
import { api } from "src/trpc/react";
import { uploadFile } from "src/app/upload/action";
import Header from "../header/header";

type UploadState = {
  status: "success" | "error";
  message: string;
};

const initialState: UploadState = { status: "success", message: "" };

export default function SettingsClient() {
  const { data: session, update } = useSession();
  const [website, setWebsiteURL] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<UploadState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImageUrl] = useState(session?.user?.image ?? ""); // Use initial image from session

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
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      <div className="mx-auto mt-[68px] grid max-w-[1024px] sm:grid-cols-[2fr,4fr] sm:grid-rows-[70px,240px,min-content,min-content] sm:gap-4 sm:px-2 lg:grid-cols-[240px,736px]">
        <div className="flex flex-col items-center justify-center p-2 sm:hidden">
          <select className="h-[39px] w-full rounded-md border border-gray-300 bg-white p-2">
            <option>Profile</option>
            <option>Customisation</option>
            <option>Notifications</option>
            <option>Account</option>
            <option>Organisation</option>
            <option>Extensions</option>
          </select>
        </div>
        <div className="hidden sm:col-span-1 sm:col-start-1 sm:row-span-4 sm:flex sm:pt-3">
          <nav className="flex h-[240px] flex-col">
            <a href="/settings" className="flex items-center p-2">
              <FaRegSmile className="mr-4 h-6 w-6" />
              Profile
            </a>
            <a href="/settings" className="flex items-center p-2">
              <IoSettingsOutline className="mr-4 h-6 w-6" />
              Customisation
            </a>
            <a href="/settings" className="flex items-center p-2">
              <BsMailbox className="mr-4 h-6 w-6" />
              Notifications
            </a>
            <a href="/settings" className="flex items-center p-2">
              <PiPlant className="mr-4 h-6 w-6" />
              Account
            </a>
            <a href="/settings" className="flex items-center p-2">
              <HiOutlineOfficeBuilding className="mr-4 h-6 w-6" />
              Organisation
            </a>
            <a href="/settings" className="flex items-center p-2">
              <BsLightningCharge className="mr-4 h-6 w-6" />
              Extensions
            </a>
          </nav>
        </div>

        <div className="py-1 sm:hidden"></div>
        <div className="col-span-1 mx-auto h-[70px] w-full max-w-[1380px] p-3 sm:col-start-2 sm:row-span-1">
          <div className="flex flex-col items-start align-top">
            <h1 className="align-top text-xl font-bold text-blue-700 sm:text-3xl">
              @{session?.user?.id}
            </h1>
          </div>
        </div>

        <div className="col-span-1 mb-4 grid grid-cols-1 items-center justify-center border border-gray-300 bg-white p-4 sm:col-start-2 sm:row-start-2 sm:mb-2 sm:rounded-md">
          <button className="m-1 h-[40px] w-full rounded-md bg-blue-500 px-3 py-2 text-white">
            Connect Facebook Account
          </button>
          <button className="m-1 h-[40px] w-full rounded-md bg-green-900 px-3 py-2 text-white">
            Connect Forem Account
          </button>
          <button className="m-1 h-[40px] w-full rounded-md bg-gray-900 px-3 py-2 text-white">
            Connect GitHub Account
          </button>
          <button className="m-1 h-[40px] w-full rounded-md bg-black px-3 py-2 text-white">
            Connect Twitter (X) Account
          </button>
        </div>

        <div className="col-span-1 sm:col-start-2">
          <div className="mb-4 grid grid-cols-1 gap-4 border border-gray-300 bg-white p-4 sm:rounded-md">
            <h2 className="col-span-1 text-2xl font-bold">User</h2>
            <div className="col-span-1 flex flex-col">
              <label>Name</label>
              <input
                type="text"
                placeholder={session?.user?.name ?? ""}
                className="mt-2 h-[39px] w-full rounded-md border border-gray-300 bg-white p-[6.5px] focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                placeholder={session?.user?.email ?? ""}
                className="mt-2 h-[39px] w-full rounded-md border border-gray-300 bg-white p-[6.5px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[min-content,1fr] items-center gap-1">
              <input
                type="checkbox"
                className="m-[3px] h-[14px] w-[14px] rounded-md border border-gray-300 bg-white focus:outline-none"
              />
              <label className="justify-start">Display email on profile</label>
            </div>
            <div className="col-span-1 flex flex-col">
              <label>Username</label>
              <input
                type="text"
                placeholder={session?.user?.id ?? ""}
                className="mt-2 h-[39px] w-full rounded-md border border-gray-300 bg-white p-[6.5px]"
              />
            </div>

            <div className="col-span-1 flex flex-col">
              <label>Profile image</label>
              <div className="mt-2 flex items-center">
                <div className="w-min-content mr-2 flex h-16 items-center justify-center">
                  <img
                    src={session?.user?.image ?? "/images/avatar.png"}
                    alt="logo"
                    className="flex h-12 w-12 items-center justify-start overflow-hidden rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-grow items-center justify-start p-3">
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-row items-center">
                      <label className="mr-3 flex h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-gray-300">
                        Browse...
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept="image/*"
                          className="hidden focus:outline-none"
                          onChange={handleFileChange}
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

          <div className="sm:grid-start-2 mb-4 mt-2 grid grid-cols-1 gap-4 border border-gray-300 bg-white p-4 sm:rounded-md">
            <h2 className="col-span-1 text-2xl font-bold">Basic</h2>
            <div className="col-span-1 flex flex-col">
              <label>Website URL</label>
              <input
                type="url"
                placeholder={session?.user?.website ?? "https://yoursite.com"}
                size={100}
                className="mt-2 h-[39px] w-full rounded-md border border-gray-300 bg-white p-[6.5px] focus:outline-none"
                value={website}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
              <span className="ml-auto mt-2 justify-end text-xs text-gray-500">
                {website.length}/100
              </span>
            </div>
            <div className="col-span-1 flex flex-col">
              <label>Location</label>
              <input
                type="text"
                placeholder={session?.user?.location ?? "Halifax, Nova Scotia"}
                size={100}
                className="mt-2 h-[39px] w-full rounded-md border border-gray-300 bg-white p-[6.5px] focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="ml-auto mt-2 justify-end text-xs text-gray-500">
                {location.length}/100
              </span>
            </div>
            <div className="col-span-1 flex flex-col items-start">
              <label>Bio</label>
              <textarea
                placeholder={session?.user?.bio ?? "A short bio..."}
                maxLength={200}
                className="mt-2 h-[63px] w-full items-start whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-white p-[6.5px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <span className="ml-auto mt-2 justify-end text-xs text-gray-500">
                {bio.length}/200
              </span>
            </div>
          </div>

          <div className="col-span-1 m-1 flex flex-col">
            <button
              className="h-[40px] w-full rounded-md bg-blue-700 px-3 py-2 text-white"
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
