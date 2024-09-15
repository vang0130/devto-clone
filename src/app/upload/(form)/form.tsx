// import React, { useState, useCallback } from "react";
// import { uploadFile } from "./action";
// import { SubmitButton } from "./submit-button";
// import {useSession } from "next-auth/react"
// import { api } from "src/trpc/react"
// import { useFormStatus } from "react-dom"

// type UploadState = { status: string; message: string | null };

// const initialState: UploadState = { status: "", message: null };

// export function UploadForm() {
//   const [state, setState] = useState<UploadState>(initialState);
//   const [file, setFile] = useState<File | null>(null);
//   const [image , setImageUrl] = useState<string | null>(null);

//   const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);

//     const result = await uploadFile(state, formData);

//     if (typeof result === "string") {
//       // If the result is a URL, it means the upload was successful
//       setImageUrl(result); // Set the image URL
//       setState({ status: "success", message: "File has been uploaded." });
//     } else {
//       // If the result is an error state
//       setState(result);
//     }
//   }, [state]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     setFile(selectedFile); // Update file state when user selects a file
//   };

//   const { pending } = useFormStatus();
//   // const [image, setImage] = useState('');
//   const { data: session, update } = useSession();
//   const handleUpdateProfilePicture = api.user.updateProfilePicture.useMutation({
//     onSuccess: async () => {
//         await update({ image })
//     },
//   });

//   return (
//     <div className="flex flex-row items-center justify-center">
//       <form onSubmit={handleFormSubmit} className="">
//         <div className="flex flex-row items-center">
//           <label className="cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px] mr-3">
//             Browse...
//             <input
//               type="file"
//               id="file"
//               name="file"
//               accept="images/*"
//               className="hidden"
//               onChange={handleFileChange} // Attach file change handler
//             />
//           </label>
//             <button type="submit" className="submit-button cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px]" aria-disabled={pending}
//     onClick={(e) => handleUpdateProfilePicture.mutate({ image: image || '' })}
//     >
//       {pending ? "Uploading..." : "File Upload"}
//     </button>
//           {/* <SubmitButton /> */}
//         </div>
//       </form>
//       <div className="ml-3">
//         {state?.status && (
//           <div className={`state-message ${state.status}`}>
//             {state.message}
//           </div>
//         )}
//         {/* Display uploaded image */}
//         {/* {imageUrl && (
//           <div className="mt-3">
//             <p>Uploaded Image:</p>
//             <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback } from "react";
import { uploadFile } from "./action";
import { useSession } from "next-auth/react";
import { api } from "src/trpc/react";
import { useFormStatus } from "react-dom";

type UploadState = { status: string; message: string | null };

const initialState: UploadState = { status: "", message: null };

export function UploadForm() {
  const [state, setState] = useState<UploadState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the uploaded image URL

  const { pending } = useFormStatus();
  const { data: session, update } = useSession();

  // Mutation to update the user's profile picture
  const handleUpdateProfilePicture = api.user.updateProfilePicture.useMutation({
    onSuccess: async (data) => {
      // Update the session with the new image data after a successful mutation
      await update({ image: data.image }); // Assuming the mutation returns the new image URL
      setState({
        status: "success",
        message: "Profile picture updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Failed to update profile picture:", error);
      setState({
        status: "error",
        message: "Failed to update profile picture.",
      });
    },
  });

  // Handle form submission to upload the file
  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const result = await uploadFile(state, formData);

      if (typeof result === "string") {
        // If the result is a URL, it means the upload was successful
        setImageUrl(result); // Set the image URL
        setState({ status: "success", message: "File has been uploaded." });

        // After successful upload, update the profile picture in the database
        handleUpdateProfilePicture.mutate({ image: result });
      } else {
        // If the result is an error state
        setState(result);
      }
    },
    [state, handleUpdateProfilePicture],
  );

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile); // Update file state when user selects a file
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <form onSubmit={handleFormSubmit} className="">
        <div className="flex flex-row items-center">
          <label className="mr-3 flex h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-gray-300">
            Browse...
            <input
              type="file"
              id="file"
              name="file"
              accept="images/*"
              className="hidden"
              onChange={handleFileChange} // Attach file change handler
            />
          </label>
          <button
            type="submit"
            className="submit-button flex h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-gray-300"
            aria-disabled={pending}
          >
            {pending ? "Uploading..." : "File Upload"}
          </button>
        </div>
      </form>
      <div className="ml-3">
        {state?.status && (
          <div className={`state-message ${state.status}`}>{state.message}</div>
        )}
        {/* {imageUrl && (
          <div className="mt-3">
            <p>Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
          </div>
        )} */}
      </div>
    </div>
  );
}
