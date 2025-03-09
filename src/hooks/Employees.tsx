import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useGetEmployees = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/admin/retrieve/employee?${params.toString()}`
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

export const useAddEmployee = (onSuccess:any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/add/employee`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee added successfully!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add employee.");
    },
  });
};

//  Update employee
export const useUpdateEmployee = (onSuccess:any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/employee`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onSuccess()
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update employee."
      );
    },
  });
};

//  Update employee social links
export const useUpdateEmployeeSocialLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "/api/update/employee/socialLink",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee social links updated!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update social links."
      );
    },
  });
};

//  Delete employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/employee`, {
        data: { employeeID: formData.get("employeeID") },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete employee."
      );
    },
  });
};

//  Delete employee social link
export const useDeleteEmployeeSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/delete/employee/socialLink`, {
        data: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee social link deleted!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete social link."
      );
    },
  });
};
