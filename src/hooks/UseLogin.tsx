import { useAuth } from "@/contexts/auth.context";
import API from "@/lib/api";
import { IResponse } from "@/types/generic.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { onAuth } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await API.post(`/auth/login/admin`, data);
      localStorage.setItem("userID", response.data.data?.id);
      return response.data;
    },
    onSuccess: (data: IResponse<{ token: string }>) => {
      onAuth(data.data?.token);
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Unknown error occured");
    },
  });
};
