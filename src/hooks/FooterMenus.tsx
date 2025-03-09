import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// API Base URL from environment variable
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;
export const useAddFooterMenus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/menuDetails`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card added successfully!");
      queryClient.invalidateQueries({ queryKey: ["footerMenus"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add card.");
    },
  });
};

export const useUpdateCard = (onsuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/fourcards`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notice updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["fourcards"] });
      onsuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update notice.");
    },
  });
};

export const useDeletefourcards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/fourcards`, {
        data: { cardID: formData.get("cardID") },
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["fourcards"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete card.");
    },
  });
};

export const useGetfourcards = () => {
  return useQuery({
    queryKey: ["footerMenus"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/admin//retrieve/menuDetails`
      );
      return response.data?.data?.fourcards || [];
    },
  });
};
