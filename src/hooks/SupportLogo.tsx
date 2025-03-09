import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddSupportLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/add/supportlogo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Support logo added successfully!");
      queryClient.invalidateQueries({ queryKey: ["supportLogos"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add support logo.");
    },
  });
};

export const useUpdateSupportLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/update/supportlogo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Support logo updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["supportLogos"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update support logo.");
    },
  });
};

export const useDeleteSupportLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supportLogoID:FormData) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/supportlogo`, {
        headers: {
          "Content-Type": "application/json", 
        },
        data: Object.fromEntries(supportLogoID), 
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Support logo deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["supportLogos"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete support logo.");
    },
  });
};

export const useGetSupportLogos = (types: string[] = []) => {
  return useQuery({
    queryKey: ["supportLogos", types],
    queryFn: async () => {
      const response = await axios.post(`${baseUrl}/admin/retrieve/supportlogo`, { type: types });
      return response.data?.data?.supportLogos;
    },
  });
};
