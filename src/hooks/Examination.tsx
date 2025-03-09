import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export interface Examination {
  _id: string;
  adminID: string;
  courseID: string;
  topicID: string;
  image: string;
  title: string;
  examDate: string;
  createdAt: string;
}

interface Pagination {
  totalResults: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

interface ApiResponse {
  status: string;
  data: {
    examinations: Examination[];
    pagination: Pagination;
    totalExaminationRooms: number;
    totalCandidate: number;
    totalExamParticipants: number;
    totalNonExamParticipants: number;
  };
  message?: string;
}

export const useGetExaminations = (filters: any) => {
  return useQuery({
    queryKey: ["examinations", filters],
    queryFn: async () => {
      const response = await axios.post<ApiResponse>(
        `${baseUrl}/admin/retrieve/examinationroom`,
        filters
      );
      return response.data.data; // Return the entire `data` object
    },
  });
};

export const useGetExaminationStats = () => {
  return useQuery({
    queryKey: ["examinationStats"],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>(
        `${baseUrl}/admin/retrieve/examinationroom/stat`
      );
      return data.data;
    },
  });
};

export const useAddExamination = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExam: FormData) => {
      const { data } = await axios.post<ApiResponse>(
        `${baseUrl}/admin/add/examinationroom`,
        newExam,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data.data;
    },
    onSuccess: () => {
      toast.success("Examination added successfully!");
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add examination. Please try again!"
      );
    },
  });
};

export const useUpdateExamination = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ updatedExam }: { updatedExam: FormData }) => {
      const { data } = await axios.post<ApiResponse>(
        `${baseUrl}/admin/update/examinationroom`,
        updatedExam,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
      toast.success("Examination updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update examination. Please try again!"
      );
    },
  });
};

export const useDeleteExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const authToken = localStorage.getItem("authToken");
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      await axios.delete(`${baseUrl}/admin/delete/examinationroom`, {
        headers,
        data: { examinationRoomID: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
      toast.success("Examination deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete examination. Please try again!"
      );
    },
  });
};
