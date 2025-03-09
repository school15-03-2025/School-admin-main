import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddBroadcast = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/broadcast`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Broadcast added successfully!");
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add broadcast.");
    },
  });
};

export const useUpdateBroadcast = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/broadcast`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Broadcast updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update broadcast."
      );
    },
  });
};

export const useUpdateBroadcastStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ broadcastID, status }: any) => {
      const response = await axios.post(`${baseUrl}/update/broadcast/status`, {
        broadcastID,
        status,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Broadcast status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update broadcast status."
      );
    },
  });
};

export const useDeleteBroadcast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/broadcast`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: Object.fromEntries(formData),
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Broadcast deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete broadcast."
      );
    },
  });
};

export const useGetBroadcasts = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["broadcasts", filters],
    queryFn: async () => {
      try {
        const formData = new FormData();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });
        const response = await axios.post(
          `${baseUrl}/admin/retrieve/broadcast`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data?.data || [];
      } catch (error: any) {
        const errorMessage = error.response?.data || {
          message: "An unexpected error occurred",
        };
        console.error("Error fetching broadcasts:", errorMessage);
        return Promise.reject(errorMessage);
      }
    },
    refetchOnWindowFocus: false,
  });
};
