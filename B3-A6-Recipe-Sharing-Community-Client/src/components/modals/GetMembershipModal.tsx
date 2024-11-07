import React from "react";
import FXModal from "./FXModal";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";

interface IProps {
  buttonText: React.ReactNode;
  buttonVariant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  buttonSize?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  redirect?: string;
}

const GetMembershipModal = ({
  buttonText,
  buttonVariant,
  buttonClassName,
  buttonSize,
  radius,
  redirect,
}: IProps) => {
  const { user } = useUser();

  return (
    <FXModal
      title="Access to Exclusive Content"
      buttonText={buttonText}
      buttonClassName={`flex-1 ${buttonClassName}`}
      buttonVariant={buttonVariant}
      buttonSize={buttonSize}
      radius={radius}
    >
      <div>
        Please consider getting membership for enjoying exclusive contents.
      </div>
      <div className="mb-4 mt-2 flex gap-2">
        <Link
          className="flex-1"
          href={`/user-dashboard/get-membership?redirect=${redirect}`}
        >
          <Button className="w-full">Get Membership</Button>
        </Link>
        {/*       
        {user?.email && <Link className="flex-1" href={`/login?redirect=${redirect}`}>
          <Button className="w-full">Login</Button>
        </Link> } */}
      </div>
    </FXModal>
  );
};

export default GetMembershipModal;