"use client";

import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react"
import { api } from "src/trpc/react"
import { useState } from "react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const [image, setImage] = useState('');
  const { data: session, update } = useSession();
  const handleUpdateProfilePicture = api.user.updateProfilePicture.useMutation({
    onSuccess: async () => {
        await update({ image })
    },
  });

  return (
    <button type="submit" className="submit-button cursor-pointer bg-gray-300 rounded-md items-center justify-center flex w-[100px] h-[40px]" aria-disabled={pending} 
    onClick={(e) => handleUpdateProfilePicture.mutate({ image })}
    // onClick={(e) => {
        // e.preventDefault();
        // updateProfilePicture.mutate({ image })
    // }}>
    >
      {pending ? "Uploading..." : "File Upload"}
    </button>
  );
}