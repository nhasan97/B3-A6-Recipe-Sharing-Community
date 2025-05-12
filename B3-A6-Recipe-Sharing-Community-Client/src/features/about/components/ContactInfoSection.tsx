import React from "react";

const ContactInfoSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-5 sm:p-10 lg:p-20 bg-gradient-to-r from-[#121213] via-[#19191a] to-[#121213] rounded-t-lg">
      <h1 className="text-center text-lg md:text-2xl text-white font-semibold mb-6">
        Contact Info
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5">
        <div className="flex flex-col items-center gap-3">
          <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
            <i className="fa-solid fa-envelope" aria-hidden="true" />
          </div>
          <div className="text-center">
            <h3 className="text-[#8a8a8a] font-medium">Email</h3>
            <p className="text-sm md:text-base text-[#696969]">
              Sample@gmail.com
            </p>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------- */}

        <div className="flex flex-col items-center gap-3">
          <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
            <i className="fa-solid fa-phone" aria-hidden="true" />
          </div>
          <div className="text-center">
            <h3 className="text-[#303030] font-medium">Cell</h3>
            <p className="text-sm md:text-base text-[#696969]">+8943465445</p>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------- */}

        <div className="flex flex-col items-center gap-3">
          <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
          </div>
          <div className="text-center">
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
