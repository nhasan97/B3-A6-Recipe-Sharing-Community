import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeUserStatus } from "../services/UpdateUserStatus";
import { toast } from "sonner";
import { updateUserProfile } from "../services/UpdateUserProfile";
import {
  getActiveUsers,
  getAllAdmins,
  getAllUsers,
  getUsersCount,
} from "../services/GetActiveUsers";
import { getSingleUser } from "../services/GetSingleUser";
import { followUnfollowMember } from "../services/FollowUnfollowMember";
import { getLoggedInUserProfile } from "../services/GetLoggedInUserProfile";
import { FieldValues } from "react-hook-form";
import { changeUserPassword } from "../services/ChangeUserPassword";
import { deleteUser } from "../services/DeleteUser";
import { addAdmin } from "../services/AddAdmin";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useGetActiveUsers = (loggedInUserEmail: string | undefined) => {
  return useQuery({
    queryKey: ["GET_ACTIVE_USERS", loggedInUserEmail],
    queryFn: async () => await getActiveUsers(loggedInUserEmail),
  });
};

export const useAddAdmin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SHARE_RECIPE"],
    mutationFn: async (adminData) => await addAdmin(adminData),
    onSuccess: () => {
      toast.success("Admin added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ["GET_ALL_ADMINS"],
    queryFn: async () => await getAllAdmins(),
  });
};

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_USER", userId],
    queryFn: async () => await getSingleUser(userId),
    enabled: !!userId,
  });
};

export const useGetLoggedInUserProfile = () => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE"],
    queryFn: async () => await getLoggedInUserProfile(),
  });
};

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
      toast.success("User status changed successfully", {
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

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (passwordData) => await changeUserPassword(passwordData),
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useFollowUnfollowMember = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    {
      memberId: string;
      loggedInUserId: string;
      followStatus: string;
    }
  >({
    mutationKey: ["FOLLOW_UNFOLLOW_MEMBER"],
    mutationFn: async ({
      memberId,
      loggedInUserId,
      followStatus,
    }: {
      memberId: string;
      loggedInUserId: string;
      followStatus: string;
    }) =>
      await followUnfollowMember({
        memberId,
        loggedInUserId,
        followStatus,
      }),
    onSuccess: (_, { memberId }) => {
      toast.success("Done", {
        duration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_USER", memberId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ["GET_USERS_COUNT"],
    queryFn: async () => await getUsersCount(),
  });
};

export const useDeleleUser = () => {
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async ({ userId }: { userId: string }) =>
      await deleteUser({
        userId,
      }),
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
