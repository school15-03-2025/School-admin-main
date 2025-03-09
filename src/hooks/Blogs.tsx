import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;
// Add Blog Hook
export const useAddBlog = (onsuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/add/blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog added successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add blog.");
    },
  });
};

// Update Blog Hook
export const useUpdateBlog = (onsuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        `${baseUrl}/admin/update/blog`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onsuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update blog.");
    },
  });
};

// Update Blog Status Hook
export const useUpdateBlogStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      blogId,
      status,
    }: {
      blogId: string;
      status: string;
    }) => {
      const response = await axios.post(`${baseUrl}/admin/update/blog/status`, {
        blogId,
        status,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update blog status."
      );
    },
  });
};

// Delete Blog Hook
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogId: string) => {
      const formData = new FormData();
      formData.append("blogID", blogId);

      const response = await axios.delete(`${baseUrl}/admin/delete/blog`, {
        data: { blogID: blogId },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete blog.");
    },
  });
};

// Retrieve Blogs Hook
export const useGetBlogs = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["blogs", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/admin/retrieve/blogs?${params.toString()}`
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
