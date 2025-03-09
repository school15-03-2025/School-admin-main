import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useGetTeacher = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["teachers", filters],
    queryFn: async () => {
      try {
        const formData = new FormData();

        // Convert filters object to FormData
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        const response = await axios.post(
          `${baseUrl}/admin/retrieve/teacher`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        return response.data.data || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};

export const useGetTeachersState = () => {
  return useQuery({
    queryKey: ["studentState"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/admin/retrieve/teachersStats`
        );
        return response.data.data.userStats || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};
