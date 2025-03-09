import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// API Base URL from environment variable
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;
export const useAddCard = (onsuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/security`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Security Card added successfully!");
      queryClient.invalidateQueries({ queryKey: ["security"] });
      onsuccess();
    },
    onError: (error: any) => {
      // toast.error(error.response?.data?.message || "");
    },
  });
};

export const useUpdateCard = (onsuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/security`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notice updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["security"] });
      onsuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update notice.");
    },
  });
};

export const useDeletesecurity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/security`, {
        data: { cardID: formData.get("cardID") },
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["security"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete card.");
    },
  });
};

export const useGetsecurity = () => {
  return useQuery({
    queryKey: ["security"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/retrieve/security`);
      return response.data?.data?.security || [];
    },
  });
};
