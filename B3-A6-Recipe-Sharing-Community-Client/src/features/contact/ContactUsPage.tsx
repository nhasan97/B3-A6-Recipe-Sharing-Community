import React from "react";
import Container from "@/src/components/layouts/Container";
import ContactInfoSection from "./components/ContactInfoSection";
import { Image } from "@nextui-org/image";
import PageTitle from "@/src/components/shared/PageTitle";
import GetInTouchSection from "./components/GetInTouchSection";

const ContactUsPage = () => {
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
            <ContactInfoSection />
          </div>

          <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[98%] bg-[#b91c1cbe] backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg">
            <GetInTouchSection />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUsPage;
