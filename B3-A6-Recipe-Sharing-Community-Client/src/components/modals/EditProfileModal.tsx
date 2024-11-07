"use client";

import React, { useState } from "react";
import FXModal from "./FXModal";
import FXForm from "../form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXTextarea from "../form/FXTextarea";
import FXInput from "../form/FXInput";
import { Button } from "@nextui-org/button";
import { IUser } from "@/src/types/user.type";
import { useUpdateUserProfile } from "@/src/hooks/user.hook";
import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";

const EditProfileModal = ({ userData }: { userData: { data: IUser } }) => {
  // -----------------------------------------------------------------------------------

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handlImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  // -----------------------------------------------------------------------------------

  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUpdateUserProfile, isPending } = useUpdateUserProfile();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const updatedData = {
      ...data,
    };

    formData.append("data", JSON.stringify(updatedData));

    for (let image of imageFiles) {
      formData.append("profilePhoto", image);
    }

    handleUpdateUserProfile(formData, {
      onSuccess: () => {
        logout();
        userLoading(true);
        router.push("/");
      },
    });
  };

  return (
    <FXModal
      title="Edit Profile Info"
      buttonText="Edit Info"
      buttonClassName="flex-1 bg-red-700 text-white"
    >
      <FXForm
        onSubmit={onSubmit}
        defaultValues={userData?.data}
        // resolver={zodResolver(registerValidationSchema)}
      >
        <div className="space-y-6">
          <FXInput name="name" label="Name" />

          <FXTextarea name="bio" label="Bio" />

          <FXInput name="mobileNumber" label="Cell" />

          <div className="flex-1">
            <div>
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                type="file"
                multiple
                id="image"
                name="title"
                className="hidden"
                onChange={(e) => handlImageChange(e)}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex items-center gap-4 my-4 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <img
                    key={imageDataUrl}
                    src={imageDataUrl}
                    alt="item"
                    className="size-20 object-cover object-center rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            className="w-full bg-red-700 font-semibold text-white"
            size="lg"
            type="submit"
            radius="lg"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </FXForm>
    </FXModal>
  );
};

export default EditProfileModal;
