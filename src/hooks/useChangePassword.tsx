import API from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface LoginData {
  password: string;
  newPassword: string;
}

export const useChangePassword = () => {

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await API.post(`/auth/admin/change-password`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Unknown error occured");
    },
  });
};
