"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      role: decodedToken.role,
      email: decodedToken.email,
      status: decodedToken.status,
      userType: decodedToken.userType,
      mobileNumber: decodedToken.mobileNumber,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

export const forgotPassword = async (email: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", email);

    return data;
  } catch (error: any) {
    throw new Error(`Failed ${error.message}`);
  }
};

export const resetPassword = async (
  token: string,
  resetData: FieldValues
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      resetData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed ${error.message}`);
  }
};
