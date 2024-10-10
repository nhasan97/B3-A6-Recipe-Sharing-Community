import Container from "@/src/components/layouts/Container";
import MembersList from "@/src/components/modules/home/MembersList";
import RecipeFeed from "@/src/components/modules/home/RecipeFeed";
import React from "react";

const page = () => {
  return (
    <Container>
      <div className="grid grid-cols-4">
        <div className="col-span-1 overflow-y-auto border">
          <MembersList />
        </div>
        <div className="col-span-2 overflow-y-auto border">
          <RecipeFeed />
        </div>
        <div className="col-span-1 border"></div>
      </div>
    </Container>
  );
};

export default page;
