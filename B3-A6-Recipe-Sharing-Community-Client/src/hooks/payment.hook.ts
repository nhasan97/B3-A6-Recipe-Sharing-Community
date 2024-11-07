import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { payment } from "../services/Payment";

export const usePayment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["PAYMENT"],
    mutationFn: async (userId) => await payment(userId),
    onSuccess: (data) => {
      const redirectUrl = data?.data?.payment_url;
      if (redirectUrl) {
        toast.success("Payment successful. Redirecting...");
        window.location.href = redirectUrl;
      } else {
        toast.error("Payment succeeded, but no redirect URL provided.");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
