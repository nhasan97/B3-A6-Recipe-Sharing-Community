import React from "react";

const ContactInfoSection = () => {
  return (
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
            <p className="text-sm md:text-base text-[#696969]">+8943465445</p>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------- */}

        <div className="flex items-center gap-3">
          <div className="size-12 bg-[#6C6555] flex justify-center items-center text-white text-2xl rounded-lg">
            <i className="fa-solid fa-location-dot" />
          </div>
          <div>
            <h3 className="text-[#303030] font-medium">Office Location</h3>
            <p className="text-sm md:text-base text-[#696969] text-wrap">
              house# 29, sarwardi avenue, baridhara diplomatic enclave, 1212,
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
