import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddTopic = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/topic`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Topic added successfully!");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      onSuccess();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add topic.");
    },
  });
};

export const useUpdateTopic = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/topic`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Topic updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update topic.");
    },
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formdata: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/delete/topic`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};

export const useGetTopics = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["topics", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
        const response = await axios.get(
          `${baseUrl}/admin/retrieve/topic?${params.toString()}`
        );

        return response.data?.data || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};
