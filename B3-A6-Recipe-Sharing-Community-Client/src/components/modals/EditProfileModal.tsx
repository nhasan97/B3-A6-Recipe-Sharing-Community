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
import { zodResolver } from "@hookform/resolvers/zod";
import registerValidationSchema from "@/src/schemas/register.schema";

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

  const { mutate: handleUpdateUserProfile, isPending } = useUpdateUserProfile();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const updatedData = {
      ...data,
      //   ingredients: data.ingredients.map(
      //     (ingredient: { value: string }) => ingredient.value
      //   ),
      //   rating: 0,
      //   upVote: [],
      //   downVote: [],
      //   tags: data.tags.map((tag: { value: string }) => tag.value),
      //   status: "PUBLISHED",
      //   user: user?._id,
    };

    formData.append("data", JSON.stringify(updatedData));

    for (let image of imageFiles) {
      formData.append("profilePhoto", image);
    }

    handleUpdateUserProfile(formData);
  };
  return (
    <FXModal title="Edit Profile" buttonText="Edit" buttonClassName="flex-1">
      <FXForm
        onSubmit={onSubmit}
        defaultValues={userData?.data}
        // resolver={zodResolver(registerValidationSchema)}
      >
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

          <div className="flex items-center gap-4 my-4 flex-wrap">
            {imagePreviews.length > 0 &&
              imagePreviews.map((imageDataUrl) => (
                <img
                  key={imageDataUrl}
                  src={imageDataUrl}
                  alt="item"
                  className="size-20 object-cover object-center rounded-md"
                />
              ))}
          </div>
        </div>

        <Button type="submit" className="w-full my-2">
          {isPending ? "Saving..." : "Save"}
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default EditProfileModal;
