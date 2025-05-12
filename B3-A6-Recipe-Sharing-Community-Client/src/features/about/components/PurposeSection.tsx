import { Image } from "@nextui-org/image";
import React from "react";

const PurposeSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center lg:bg-[url('/assets/images/about-purpose-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full md:w-1/2">
        <Image
          src={"/assets/images/undraw_Target_re_fi8j.png"}
          alt=""
          className="mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2 h-full">
        <h1 className="text-lg md:text-2xl text-center font-semibold mb-6">
          Our purpose
        </h1>
        <p className="text-sm md:text-base text-justify  text-[#696969]">
          At TasteTribe, our mission is to bring people together through the joy
          of cooking and sharing recipes from around the world. Whether
          you&apos;re a seasoned chef, a home cook, or just starting your
          culinary journey, our platform is designed to inspire, connect, and
          empower you to create and share your favorite dishes with a community
          that shares your passion for food. We believe that food is more than
          just sustenance – it&apos;s a universal language that brings cultures,
          families, and friends together.
        </p>
      </div>
    </div>
  );
};

export default PurposeSection;
