"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook";

const RegisterPage = () => {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[url('/assets/images/reg.avif')] bg-cover bg-center bg-no-repeat">
      <div className="w-full sm:w-[70%] lg:w-[35%] bg-black/10 backdrop-blur-md p-10 rounded-lg">
        <h3 className="my-2 text-2xl font-bold text-white">
          Register to TasteTribe
        </h3>
        <p className="mb-4 text-white">
          Where Every Dish Tells a Story – Share, Discover, and Savor!
        </p>

        <FXForm
          //! Only for development
          defaultValues={{
            name: "n",
            email: "n@yahoo.com",
            mobileNumber: "47365734654",
            password: "123456",
          }}
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
            className="my-3 w-full bg-red-700 text-white"
            size="lg"
            radius="md"
            type="submit"
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
