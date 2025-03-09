import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const getAxiosConfig = () => {
  const authToken = getAuthToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
};

//  Get Admins
export const useGetAdmins = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["admins", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/admin/retrieve/admins?${params.toString()}`,
          getAxiosConfig()
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

// Add Admin
export const useAddAdmin = (onSuccess: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/admin`,
        formData,
        getAxiosConfig()
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin added successfully!");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add admin.");
    },
  });
};

// Update Admin
export const useUpdateAdmin = (onSuccess: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/admin`,
        formData,
        getAxiosConfig()
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update admin.");
    },
  });
};

// Delete Admin
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminId: string) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/admin`, {
        data: { adminID: adminId },
        ...getAxiosConfig(),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete admin.");
    },
  });
};

// Get Single Admin
export const useGetSingleAdmin = () => {
  return useMutation({
    mutationFn: async (adminId: string) => {
      const response = await axios.post(
        `${baseUrl}/admin/retrieve/admin`,
        { adminID: adminId },
        getAxiosConfig()
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin retrieved successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to retrieve admin."
      );
    },
  });
};
