import FXForm from "@/src/components/UI/form/FXForm";
import FXInput from "@/src/components/UI/form/FXInput";
import FXTextarea from "@/src/components/UI/form/FXTextarea";
import { Button } from "@nextui-org/button";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const GetInTouchSection = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-white text-lg md:text-2xl font-semibold mb-6">
        Get in touch
      </h1>

      <FXForm onSubmit={onSubmit}>
        <div className="space-y-6">
          <div className="bg-white rounded-xl">
            <FXInput name="name" label="Name" required />
          </div>
          <div className="bg-white rounded-xl">
            <FXInput name="email" label="Your Email" required />
          </div>

          <div className="bg-white rounded-xl">
            <FXInput name="subject" label="Subject" required />
          </div>

          <div className="bg-white rounded-xl">
            <FXTextarea name="message" label="Message" required />
          </div>

          <Button type="submit" className="w-full bg-white rounded-xl">
            Send <i className="fa-solid fa-paper-plane" />
          </Button>
        </div>
      </FXForm>
    </>
  );
};

export default GetInTouchSection;
