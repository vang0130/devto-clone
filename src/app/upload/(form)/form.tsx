// import React, { useState } from "react";
// import { uploadFile } from "./action";
// import { useSession } from "next-auth/react";
// import { api } from "src/trpc/react";

// type UploadState = {
//   status: "success" | "error";
//   message: string;
// };

// const initialState: UploadState = { status: "success", message: "" };

// export function UploadForm() {
//   const [state, setState] = useState<UploadState>(initialState);
//   const [file, setFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const { data: session, update } = useSession();

//   const handleUpdateProfilePicture = api.user.updateProfilePicture.useMutation({
//     onSuccess: async (data) => {
//       await update({ image: data.image });
//       setState({ status: "success", message: "" });
//     },
//     onError: (error) => {
//       // console.error("Failed to update profile picture:", error);
//       setState({ status: "error", message: "" });
//     },
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleFileUpload = async () => {

//     if (!file) {
//       setState({ status: "error", message: "" });
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     const result = await uploadFile(formData, state);

//     if (typeof result === "string") {
//       setImageUrl(result);
//       setState({ status: "success", message: "" });

//       handleUpdateProfilePicture.mutate({ image: result });
//     } else {
//       // setState({ status: "error", message: result.message || "" });
//     }
//   };

//   return (
//     <div className="flex flex-row items-center justify-center">
//       <div className="flex flex-row items-center">
//         <label className="cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px] mr-3">
//           Browse...
//           <input
//             type="file"
//             id="file"
//             name="file"
//             accept="image/*" 
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </label>
//         <button
//           className="submit-button cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px]"
//           onClick={handleFileUpload}
//           disabled={!file}
//         >
//           Upload Image
//         </button>
//       </div>
//       <div className="ml-3">
//         {state?.status && (
//           <div className={`state-message ${state.status}`}>
//             {state.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
