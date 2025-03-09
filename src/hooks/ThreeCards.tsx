import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddCard = (onsuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/threecards`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card added successfully!");
      queryClient.invalidateQueries({ queryKey: ["threecards"] });
      onsuccess();
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
        `${baseUrl}/admin/update/threecards`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["threecards"] });
      onsuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || null);
    },
  });
};

export const useDeleteThreeCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.delete(
        `${baseUrl}/admin/delete/threecards`,
        {
          data: { cardID: formData.get("cardID") },
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Card deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["threecards"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete card.");
    },
  });
};

export const useGetThreeCards = () => {
  return useQuery({
    queryKey: ["threecards"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/retrieve/threecards`);
      return response.data?.data?.threecards || [];
    },
  });
};
