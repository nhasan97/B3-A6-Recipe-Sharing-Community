"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/src/schemas/login.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import ForgotEmailModal from "@/src/components/modals/ForgotEmailModal";

const LoginPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[url('/assets/images/login.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full sm:w-[70%] lg:w-[35%] bg-black/10 backdrop-blur-md p-10 rounded-lg">
        <h3 className="my-2 text-2xl font-bold">Login</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>

        <FXForm
          //! Only for development
          defaultValues={{
            email: "n@yahoo.com",
            password: "123456",
          }}
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="email" label="Email" type="email" />
          </div>
          <div className="py-3">
            <FXInput name="password" label="Password" type="password" />
          </div>

          <Button
            className="w-full my-3 bg-red-700 text-white"
            size="lg"
            radius="md"
            type="submit"
          >
            {isPending ? "Logging In..." : "Login"}
          </Button>
        </FXForm>

        <div className="text-center my-2">
          <ForgotEmailModal />
        </div>

        <div className="text-center">
          Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
