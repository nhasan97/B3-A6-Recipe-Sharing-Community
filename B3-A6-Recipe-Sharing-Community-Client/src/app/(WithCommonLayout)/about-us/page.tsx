import AboutUsPage from "@/src/features/about/AboutUsPage";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutUsPage />
    </div>
  );
};

export default page;

// const AboutUsPage = async () => {
//   const title = {
//     mainTitle: "About Us",
//     subTitle: "Who we are",
//   };

//   return (
//     <div className="">
//       <Container>
//         <div className="w-full min-h-screen">
//           <PageTitle title={title} />

//           <div className="flex flex-col gap-16">
//             {/* //// Our purpose //// */}
//             <div className="w-full flex flex-col md:flex-row items-center lg:bg-[url('/assets/images/about-purpose-bg.png')] bg-cover bg-center bg-no-repeat">
//               <div className="w-full md:w-1/2">
//                 <Image
//                   src={"/assets/images/undraw_Target_re_fi8j.png"}
//                   alt=""
//                   className="mx-auto"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 h-full">
//                 <h1 className="text-lg md:text-2xl text-center font-semibold mb-6">
//                   Our purpose
//                 </h1>
//                 <p className="text-sm md:text-base text-justify  text-[#696969]">
//                   At TasteTribe, our mission is to bring people together through
//                   the joy of cooking and sharing recipes from around the world.
//                   Whether you&apos;re a seasoned chef, a home cook, or just
//                   starting your culinary journey, our platform is designed to
//                   inspire, connect, and empower you to create and share your
//                   favorite dishes with a community that shares your passion for
//                   food. We believe that food is more than just sustenance –
//                   it&apos;s a universal language that brings cultures, families,
//                   and friends together.
//                 </p>
//               </div>
//             </div>

//             {/* //// Our Values //// */}
//             <div className="w-full">
//               <h1 className="text-lg md:text-2xl font-semibold mb-6 text-center">
//                 Values
//               </h1>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//                 {values.map((value) => (
//                   <ValuesCard key={value.valueName} value={value} />
//                 ))}
//               </div>
//             </div>

//             {/* //// Our team //// */}
//             <div className="w-full xl:w-3/4 mx-auto">
//               <h1 className="text-lg md:text-2xl text-center font-semibold mb-6">
//                 Our Team
//               </h1>
//               <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
//                 {members.map((member: TTeamMember) => (
//                   <TeamCard key={member.id} member={member} />
//                 ))}
//               </div>
//             </div>

//             {/* //// Our history and milestone //// */}
//             <div className="w-full xl:w-3/4 mx-auto md:bg-[url('/assets/images/about-history-bg.png')] bg-cover bg-center bg-no-repeat">
//               <h1 className="text-lg md:text-2xl text-center font-semibold my-12">
//                 History & Milestones
//               </h1>
//               <div className="w-full  mx-auto">
//                 {milestones.map((milestone, index) => (
//                   <MilestoneCard
//                     key={milestone.milestoneName}
//                     milestone={milestone}
//                     flexclass={index % 2 === 1 ? "flex-row-reverse" : ""}
//                     imageJustifyclass={
//                       index % 2 === 1 ? "justify-start" : "justify-end"
//                     }
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* //// Contact Info //// */}
//             <div className="w-full flex flex-col justify-center items-center p-5 sm:p-10 lg:p-20 bg-gradient-to-r from-[#121213] via-[#19191a] to-[#121213] rounded-t-lg">
//               <h1 className="text-center text-lg md:text-2xl text-white font-semibold mb-6">
//                 Contact Info
//               </h1>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
//                     <i className="fa-solid fa-envelope" />
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-[#8a8a8a] font-medium">Email</h3>
//                     <p className="text-sm md:text-base text-[#696969]">
//                       Sample@gmail.com
//                     </p>
//                   </div>
//                 </div>
//                 {/* ---------------------------------------------------------------------------- */}

//                 <div className="flex flex-col items-center gap-3">
//                   <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
//                     <i className="fa-solid fa-phone" />
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-[#303030] font-medium">Cell</h3>
//                     <p className="text-sm md:text-base text-[#696969]">
//                       +8943465445
//                     </p>
//                   </div>
//                 </div>
//                 {/* ---------------------------------------------------------------------------- */}

//                 <div className="flex flex-col items-center gap-3">
//                   <div className="size-12 bg-red-700 flex justify-center items-center text-white text-2xl rounded-lg">
//                     <i className="fa-solid fa-location-dot" />
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-[#303030] font-medium">
//                       Office Location
//                     </h3>
//                     <p className="text-sm md:text-base text-[#696969] text-wrap">
//                       house# 29, sarwardi avenue, baridhara diplomatic enclave,
//                       1212, Dhaka, Bangladesh
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AboutUsPage;
