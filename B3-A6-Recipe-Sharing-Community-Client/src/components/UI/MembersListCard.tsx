"use client";

import { IUser } from "@/src/types/user.type";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";

const MembersListCard = ({ member }: { member: IUser }) => {
  const { _id, name, email, profilePhoto } = member;
  return (
    <Card className="shadow-sm rounded-none">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={profilePhoto}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{email}</p>
          </div>
        </div>
        <Link href={`/member-details/${_id}`}>View</Link>
      </CardHeader>
    </Card>
  );
};

export default MembersListCard;
