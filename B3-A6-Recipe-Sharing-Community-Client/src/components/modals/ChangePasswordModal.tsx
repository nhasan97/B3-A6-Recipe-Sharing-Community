import React from "react";
import FXModal from "./FXModal";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePassword } from "@/src/hooks/user.hook";
import { logout } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import changePasswordValidationSchema from "@/src/schemas/changePassword.schema";

const ChangePasswordModal = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleChangePassword, isPending } = useChangePassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleChangePassword(data, {
      onSuccess: () => {
        logout();
        userLoading(true);
        router.push("/login");
      },
    });
  };

  return (
    <FXModal
      title="Change Password"
      buttonText="Change Password"
      buttonClassName="flex-1 bg-red-700 text-white"
    >
      <FXForm
        onSubmit={onSubmit}
        resolver={zodResolver(changePasswordValidationSchema)}
      >
        <div className="space-y-6">
          <FXInput name="oldPassword" label="Old Password" />
          <FXInput name="newPassword" label="New Password" />
          <Button
            className="my-3 w-full bg-red-700 font-semibold text-white"
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

export default ChangePasswordModal;
