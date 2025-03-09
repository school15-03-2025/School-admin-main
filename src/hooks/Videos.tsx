import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Add Video Course Module
export const useAddVideoCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, module }: { courseId: string; module: FormData }) => {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEN_URL}/admin/courses/video/${courseId}/modules`, module);
      return data;
    },
    onSuccess: (_, { courseId }) => queryClient.invalidateQueries({queryKey:["videoCourses", courseId]}),
  });
};

// Update Video Course Module
export const useUpdateVideoCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, moduleId, updatedModule }: { courseId: string; moduleId: string; updatedModule: FormData }) => {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEN_URL}/admin/courses/video/${courseId}/modules/${moduleId}`, updatedModule);
      return data;
    },
    onSuccess: (_, { courseId }) => queryClient.invalidateQueries({queryKey:["videoCourses", courseId]}),
  });
};

// Delete Video Course Module
export const useDeleteVideoCourseModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseId, moduleId }: { courseId: string; moduleId: string }) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEN_URL}/admin/courses/video/${courseId}/modules/${moduleId}`);
    },
    onSuccess: (_, { courseId }) => queryClient.invalidateQueries({queryKey:["videoCourses", courseId]}),
  });
};
