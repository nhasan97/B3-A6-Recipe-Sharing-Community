import React from "react";
import FXModal from "./FXModal";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useForgotPAssword } from "@/src/hooks/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordValidationSchema from "@/src/schemas/forgotPassword.schema";

const ForgotEmailModal = () => {
  const { mutate: handleForgotPassword, isPending } = useForgotPAssword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgotPassword(data);
  };
  return (
    <FXModal
      title="Enter your email"
      buttonText="Forgot Password?"
      buttonClassName="w-fit bg-transparent"
      buttonSize="md"
      radius="md"
      isIconOnly
    >
      <FXForm
        onSubmit={onSubmit}
        resolver={zodResolver(forgotPasswordValidationSchema)}
      >
        <FXInput name="email" label="Your email" />
        <Button type="submit" className="w-full my-2">
          {isPending ? "Processing..." : "Proceed"}
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default ForgotEmailModal;
