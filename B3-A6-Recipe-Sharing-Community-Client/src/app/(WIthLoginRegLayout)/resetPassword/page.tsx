"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useResetPassword } from "@/src/hooks/auth.hook";
import resetPasswordValidationSchema from "@/src/schemas/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure it's running on the client side
      const urlParams = new URLSearchParams(window.location.search);
      setEmail(urlParams.get("email"));
      setToken(urlParams.get("token"));
    }
  }, [email, token]);

  const router = useRouter();

  const { mutate: handleResetPassword, isPending } = useResetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleResetPassword(
      {
        token: token as string,
        resetData: { email, ...data },
      },
      { onSuccess: () => router.push("/login") }
    );
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[url('/assets/images/login.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full sm:w-[70%] lg:w-[35%] bg-black/10 backdrop-blur-md p-10 rounded-lg">
        <h3 className="my-2 text-2xl font-bold">Reset Password</h3>

        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(resetPasswordValidationSchema)}
        >
          <div className="py-3">
            <FXInput
              name="newPassword"
              label="Enter New Password"
              type="password"
            />
          </div>

          <Button
            className="w-full my-3 bg-red-700 text-white"
            size="lg"
            radius="md"
            type="submit"
          >
            {isPending ? "Processing..." : "Proceed"}
          </Button>
        </FXForm>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
