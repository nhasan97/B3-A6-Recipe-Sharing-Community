"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import FXModal from "./FXModal";

interface IProps {
  buttonText: string;
  redirect: string;
}
// `/login?redirect=found-items/${id}`
const AuthenticationModal = ({ buttonText, redirect }: IProps) => {
  return (
    <FXModal
      title="Authentication"
      buttonText={buttonText}
      buttonClassName="flex-1"
    >
      <div>
        You are not currently logged in. Please login first to continue.
      </div>
      <div className="mb-4 mt-2 flex gap-2">
        <Link className="flex-1" href={`/register?redirect=${redirect}`}>
          <Button className="w-full">Register</Button>
        </Link>
        <Link className="flex-1" href={`/login?redirect=${redirect}`}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </FXModal>
  );
};

export default AuthenticationModal;
