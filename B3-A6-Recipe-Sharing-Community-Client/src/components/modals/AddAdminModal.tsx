import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXModal from "./FXModal";
import FXForm from "../form/FXForm";
import { zodResolver } from "@hookform/resolvers/zod";
import registerValidationSchema from "@/src/schemas/register.schema";
import FXInput from "../form/FXInput";
import { Button } from "@nextui-org/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useAddAdmin } from "@/src/hooks/user.hook";

const AddAdminModal = ({
  refetchAdmins,
}: {
  refetchAdmins: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { mutate: handleAddAdmin, isPending } = useAddAdmin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      role: "ADMIN",
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleAddAdmin(userData, { onSuccess: () => refetchAdmins() });
  };

  return (
    <FXModal
      title="Add Admin"
      buttonText={
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-circle-plus" /> <p>Add Admin</p>
        </div>
      }
      buttonClassName="self-start bg-red-700 text-white mb-6"
      buttonSize="md"
      buttonVariant="flat"
      radius="lg"
    >
      <FXForm
        onSubmit={onSubmit}
        resolver={zodResolver(registerValidationSchema)}
      >
        <div className="py-3">
          <FXInput label="Name" name="name" />
        </div>
        <div className="py-3">
          <FXInput label="Email" name="email" />
        </div>
        <div className="py-3">
          <FXInput label="Mobile Number" name="mobileNumber" />
        </div>
        <div className="py-3">
          <FXInput label="Password" name="password" type="password" />
        </div>

        <Button
          className="my-3 w-full bg-red-700 font-semibold text-white"
          size="lg"
          type="submit"
          radius="lg"
        >
          {isPending ? "Adding Admin..." : "Add"}
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default AddAdminModal;
