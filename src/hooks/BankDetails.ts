import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";


const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/add/paymentMethod`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Payment method added successfully!");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add payment method.");
    },
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${baseUrl}/admin/update/paymentMethod`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      // toast.success(data.message || "Payment method updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update payment method.");
    },
  });
};
export const useUpdatePaymentMethodStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentMethodID, isActive }: { paymentMethodID: string; isActive: boolean }) => {
      const response = await axios.post(`${baseUrl}/admin/update/payment-method-status`, { paymentMethodID, isActive });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Payment method status updated!");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update payment method status.");
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentMethodID: FormData) => {
      const response = await axios.delete(`${baseUrl}/admin//delete/paymentMethod`, {
        headers: {
          "Content-Type": "application/json", 
        },
        data: Object.fromEntries(paymentMethodID), 
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Payment method deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete payment method.");
    },
  });
};

export const useGetPaymentMethods = (search?: string) => {
  return useQuery({
    queryKey: ["paymentMethods", search],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/retrieve/paymentMethod`);
      return response.data?.data?.paymentMethods;
    },
  });
};
