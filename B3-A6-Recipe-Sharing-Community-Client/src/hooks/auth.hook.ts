import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useForgotPAssword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (email) => await forgotPassword(email),
    onSuccess: () => {
      toast.success("Please check email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, { token: string; resetData: FieldValues }>({
    mutationKey: ["Reset_PASSWORD"],
    mutationFn: async ({
      token,
      resetData,
    }: {
      token: string;
      resetData: FieldValues;
    }) => await resetPassword(token, resetData),
    onSuccess: () => {
      toast.success("Password reset successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
