import API from "@/lib/api";
import { IError } from "@/types/generic.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface NewPasswordData {
  token: string;
  password: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: NewPasswordData) => {
      const response = await API.post(`/auth/admin/reset-password`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Your password updated");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Unknown error occured"
      );
    },
  });
};
