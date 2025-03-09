import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_BACKEN_URL;

//  Fetch Gallery Images
export function useGetGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/admin/retrieve/servicegallery`
      );
      return data;
    },
  });
}

//  Add Gallery Image
export function useAddGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageData: {
      title: string;
      type: string;
      image: File;
    }) => {
      const formData = new FormData();
      formData.append("url", imageData.title);
      formData.append("category", imageData.type);
      formData.append("image", imageData.image);

      const { data } = await axios.post(
        `${API_URL}/admin/add/servicegallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

//  Delete Gallery Image
export function useDeleteGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/admin/delete/servicegallery`, {
        data: { serviceGalleryID: id },
      });
    },
    onSuccess: () => {
      toast.success("Service gallery deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
