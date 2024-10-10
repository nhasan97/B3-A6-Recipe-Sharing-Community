"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import registerValidationSchema from "../../../../schemas/register.schema";

const AddAdminPage = () => {
  const { mutate: handleUserRegistration } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      role: "ADMIN",
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
  };

  return (
    <div className="h-screen">
      <DashboardContainer>
        {/* <Helmet>
      <title>Blooms & Beyond | Dashboard | Products</title>
    </Helmet> */}

        {/* <Title title={"Products"}></Title> */}
        <h3 className="my-2 text-2xl font-bold">Register with FoundX</h3>
        <p className="mb-4">Help Lost Items Find Their Way Home</p>
        <div className="w-[35%]">
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
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Save
            </Button>
          </FXForm>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AddAdminPage;
