import Container from "@/src/components/layouts/Container";
import LoadingPage from "@/src/components/shared/LoadingPage";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const loading = () => {
  return <LoadingPage />;

  // return (
  //   <Container>
  //     <div className="h-screen grid grid-cols-4 gap-6">
  //       <div className="flex justify-center items-center col-span-1 border">
  //         <Spinner size="lg" />
  //       </div>
  //       <div className="flex justify-center items-center col-span-2 border">
  //         <Spinner size="lg" />
  //       </div>
  //       <div className="flex justify-center items-center col-span-1 border">
  //         <Spinner size="lg" />
  //       </div>
  //     </div>
  //   </Container>
  // );
};

export default loading;
