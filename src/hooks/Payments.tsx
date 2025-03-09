import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useGetPayments = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["payments", filters],
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
          `${baseUrl}/admin/retrieve/payments`,
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

export const useGetPaymentsForState = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["payments", filters],
    queryFn: async () => {
      try {
        const formData = new FormData();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        const response = await axios.post(
          `${baseUrl}/admin/retrieve/payments`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        return response.data || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};

export const useGetWithdraw = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["withdraw", filters],
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
          `${baseUrl}/admin/retrieve/withdraw`,
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
export const useGetWithdrawalsForState = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["withdraw", filters],
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
          `${baseUrl}/admin/retrieve/withdraw`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        return response.data || [];
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};
export const useGetTransaction = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await axios.post(
        `${baseUrl}/admin/retrieve/transaction`
      );
      console.log("API Response:", response.data); // Debugging

      // Ensure we're accessing the correct nested structure
      return response || [];
    },
  });
};
