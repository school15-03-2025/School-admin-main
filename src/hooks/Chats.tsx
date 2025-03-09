import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useGetChats = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["chats", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/chat/get_all_chatList?${params.toString()}`
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

export const useGetChatList = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["chatList", filters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const { data } = await axios.get(
          `${baseUrl}/chat/get_all_chatList?${params.toString()}`
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

export const useGetSingleAdmin = () => {
  return useQuery({
    queryKey: ["singleAdmin"],
    queryFn: async () => {
      try {
        const userID = localStorage.getItem("userID");
        const authToken = localStorage.getItem("authToken");

        if (!userID) {
          toast.error("No Admin ID found");
          return;
        }
        if (!authToken) {
          toast.error("No Auth Token found");
          return;
        }

        const { data } = await axios.post(
          `${baseUrl}/admin/retrieve/admin`,
          { adminId: userID },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return data?.data?.admin || null;
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred"
        );
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
    refetchOnWindowFocus: false,
  });
};
export const useUpdateChatStatus = () => {
  return useMutation({
    mutationFn: async ({
      chatID,
      status,
    }: {
      chatID: string;
      status: string;
    }) => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          toast.error("No Auth Token found");
          throw new Error("No Auth Token found");
        }

        const response = await axios.put(
          `${baseUrl}/chat/update-status`,
          { chatID, restriction: status },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to update chat status"
        );
        return Promise.reject(
          error.response?.data || { message: "Failed to update chat status" }
        );
      }
    },
    onSuccess: () => {
      toast.success("Chat status updated successfully");
    },
  });
};
