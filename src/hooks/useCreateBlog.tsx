import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createBlog = async (blogData: FormData) => {
  const response = await axios.post("/api/blogs", blogData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
    //   queryClient.invalidateQueries(["blogs"]); // Refresh blogs list
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
    },
  });
};
