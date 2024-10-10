"use client";

import Container from "@/src/components/layouts/Container";
import React from "react";
import { Image } from "@nextui-org/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import FXTextarea from "@/src/components/form/FXTextarea";

const ContactUsPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      {/* <Helmet>
        <title>Sport Odyssey | Contact Us</title>
      </Helmet> */}
      <div className="w-full h-[calc(100vh-64px)]">
        {/* <Title title={title}></Title> */}

        <div className="w-full h-full flex lg:flex-row flex-col justify-center items-center gap-6 px-2 py-2 md:px-10 md:py-5">
          <div className="w-full lg:w-1/2 h-full rounded-lg">
            <Image
              src={
                "/assets/images/undraw_Contact_us_re_4qqt-removebg-preview.png"
              }
              alt=""
              className="mx-auto"
            />

            <div className="text-base text-[#757575]">
              <h1 className="">Our</h1>
              <p>
                <span className="text-[#a5a5a5] font-medium">Email: </span>
                Sample@gmail.com
              </p>
              <p>
                <span className="text-[#a5a5a5] font-medium">Cell: </span>
                +8943465445
              </p>
              <p>
                <span className="text-[#a5a5a5] font-medium">
                  Office Location:{" "}
                </span>
                house# 29, sarwardi avenue, baridhara diplomatic enclave, 1212,
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-full rounded-lg border border-red-600">
            <FXForm onSubmit={onSubmit}>
              <div className="space-y-6">
                <FXInput name="name" label="Name" required />

                <FXInput name="email" label="Your Email" required />

                <FXInput name="subject" label="Subject" required />

                <FXTextarea name="message" label="Message" required />

                <Button
                  type="submit"
                  className="w-full hover:bg-transparent bg-red-700 hover:text-red-700 text-[rgba(255,255,255,0.88)] text-lg border hover:border-red-700 border-transparent space-x-2 rounded-lg"
                >
                  Send
                </Button>
              </div>
            </FXForm>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUsPage;
