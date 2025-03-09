import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL; 

if (typeof window !== "undefined") {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export interface Examinee {
  _id: string;
  userID: string;
  fullname: string;
  rollNo: string;
  courseID: string;
  price: number;
  createdAt: string;
  isExaminee: boolean;
  examDate?: string;
}

interface Pagination {
  pageSize: number;
  page: number;
  totalPages: number;
  totalResult: number;
}

interface ExamineeResponse {
  result: Examinee[];
  pagination: Pagination;
}

interface ExamineeStats {
  totalCandidate: number;
  totalExamParticipants: number;
  totalNonExamParticipants: number;
}


export const useGetExaminees = (filters: any) => {
  return useQuery<ExamineeResponse>({
    queryKey: ["examinees", filters],

    queryFn: async () => {
      const { data } = await axios.post<{ status: string; data: ExamineeResponse }>(
        `${baseUrl}/admin/retrieve/examinee`,
        filters
      );
      console.log(data);
      return data.data;
    },
  });
};

export const useGetExamineeStats = () => {
  return useQuery<ExamineeStats>({
    queryKey: ["examineeStats"],
    queryFn: async () => {
      const { data } = await axios.get<{ status: string; data: ExamineeStats }>(
        `${baseUrl}/admin/retrieve/examinee/stats`
      );
      return data.data;
    },
  });
};

// Delete an Examinee
export const useDeleteExaminee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (examineeID: string) => {
      await axios.delete(`${baseUrl}/admin//delete/examinee`, { data: { examineeID } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["examinees"] }),
  });
};
