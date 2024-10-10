import { Dispatch, SetStateAction } from "react";
import { roleBasedRoutes } from "../middleware";

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  __v?: number;
}

export type TRole = keyof typeof roleBasedRoutes;

export interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
