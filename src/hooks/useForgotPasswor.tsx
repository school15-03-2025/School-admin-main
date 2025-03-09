import API from "@/lib/api";
import { IError } from "@/types/generic.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface ForgotPasswordData {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await API.post(`/auth/admin/forgot-password`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Please check your mailbox");
    },
    onError: (error: any) => {
      toast.error(error.message || "Unknown error occured");
    },
  });
};
