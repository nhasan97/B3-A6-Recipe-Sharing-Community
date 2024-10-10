import { useMutation } from "@tanstack/react-query";
import { changeUserStatus } from "../services/UpdateUserStatus";
import { toast } from "sonner";
import { updateUserProfile } from "../services/UpdateUserProfile";

export const useChangeUserStatus = () => {
  return useMutation<any, Error, { userId: string; status: string }>({
    mutationKey: ["CHANGE_USER_STATUS"],
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: string;
    }) =>
      await changeUserStatus({
        userId,
        status,
      }),
    onSuccess: () => {
      toast.success("user status changed successfully", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserProfile = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_USER_PROFILE"],
    mutationFn: async (userData) => await updateUserProfile(userData),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
