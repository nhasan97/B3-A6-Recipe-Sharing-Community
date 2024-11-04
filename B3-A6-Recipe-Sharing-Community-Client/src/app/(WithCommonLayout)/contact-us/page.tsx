"use client";

import Container from "@/src/components/layouts/Container";
import React from "react";
import { Image } from "@nextui-org/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import FXTextarea from "@/src/components/form/FXTextarea";
import PageTitle from "@/src/components/shared/PageTitle";

const ContactUsPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const title = {
    mainTitle: "Contact Us",
    subTitle: "We would love to hear from you",
  };

  return (
    <Container>
      <div className="w-full min-h-screen 2xl:h-[calc(100vh-64px)]">
        <PageTitle title={title} />

        <div className="w-full h-full flex flex-col xl:flex-row gap-6 px-2 py-2 md:px-10 md:py-5 mt-6">
          <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[98%] flex flex-col justify-center items-center gap-6 rounded-lg">
            <div className="w-full h-[50%] flex flex-col justify-center items-center bg-gradient-to-r from-[#121213] via-[#19191a] to-[#121213] rounded-lg">
              <Image
                src={
                  "/assets/images/undraw_Contact_us_re_4qqt-removebg-preview.png"
                }
                alt=""
                className="mx-auto "
              />
            </div>

            {/* //// Contact Info //// */}
            <div className="w-full h-[50%] flex flex-col justify-center items-center p-5 border-4 border-[#6C6555] rounded-lg">
              <h1 className="w-full text-lg md:text-2xl text-left font-semibold mb-6">
                Contact Info
              </h1>
              <div className="w-full space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-[#6C6555] flex justify-center items-center text-white text-2xl rounded-lg">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div>
                    <h3 className="text-[#303030] font-medium">Email</h3>
                    <p className="text-sm md:text-base text-[#696969]">
                      Sample@gmail.com
                    </p>
                  </div>
                </div>
                {/* ---------------------------------------------------------------------------- */}

                <div className="flex items-center gap-3">
                  <div className="size-12 bg-[#6C6555] flex justify-center items-center text-white text-2xl rounded-lg">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div>
                    <h3 className="text-[#303030] font-medium">Cell</h3>
                    <p className="text-sm md:text-base text-[#696969]">
                      +8943465445
                    </p>
                  </div>
                </div>
                {/* ---------------------------------------------------------------------------- */}

                <div className="flex items-center gap-3">
                  <div className="size-12 bg-[#6C6555] flex justify-center items-center text-white text-2xl rounded-lg">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div>
                    <h3 className="text-[#303030] font-medium">
                      Office Location
                    </h3>
                    <p className="text-sm md:text-base text-[#696969] text-wrap">
                      house# 29, sarwardi avenue, baridhara diplomatic enclave,
                      1212, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[98%] bg-[#b91c1cbe] backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg">
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUsPage;
