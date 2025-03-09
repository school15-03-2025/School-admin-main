import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";


const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;
export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/add/category`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Category added successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add category.");
    },
  });
}
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/update/category`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category.");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await axios.delete(`${baseUrl}/admin/delete/category`, {
        data: { categoryID: categoryId },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete category.");
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/retrieve/categories`);
      return response.data?.data?.categories;
    },
  });
};
