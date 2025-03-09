import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/notice`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notice added successfully!");
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add notice.");
    },
  });
};
export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/notice`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notice updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update notice.");
    },
  });
};
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noticeId: string) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/notice`, {
        data: { noticeID: noticeId },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Notice deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete notice.");
    },
  });
};
export const useGetNotices = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["notices", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/admin/retrieve/notice?${params.toString()}`
        );

        return data?.data || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};
