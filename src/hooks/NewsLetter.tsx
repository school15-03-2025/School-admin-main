import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { constructNow } from "date-fns";
import { toast } from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useGetNewsletters = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["newsletters", filters],
    queryFn: async () => {
      try {
        const formData = new FormData();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        const { data } = await axios.post(
          `${baseUrl}/admin/retrieve/newsletter`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        return data.data || [];
      } catch (error: any) {
        const errorMessage = error.response?.data || {
          message: "An unexpected error occurred",
        };
        console.error("Error fetching newsletters:", errorMessage);
        return Promise.reject(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useDeleteNewsletters = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionIDs: string[]) => {
      const response = await axios.delete(
        `${baseUrl}/admin/delete/newsletter`,
        {
          data: { subscriptionID: subscriptionIDs },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Subscription(s) removed successfully!");
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete subscription(s)."
      );
    },
  });
};
