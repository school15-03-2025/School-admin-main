import { useQuery } from "@tanstack/react-query";
import API from "@/lib/api";
import { IResponse, PaginatedResponse } from "@/types/generic.types";

export interface Payment {
  _id: string;
  userID: string;
  adminID: string;
  amount: number;
  vat: number;
  amountCredited: number;
  accountName: string;
  accountNumber: string;
  transactionID: string;
  transactionReceipt: string;
  payAccount: string;
  additionalInfo: string;
  currency: string;
  status: "pending" | "accepted" | "spam";
  paymentMethodID: string;
  createdAt: string;
}

export interface Withdrawal {
  _id: string;
  adminID: string | null;
  userID: string | null;
  teacherID: string | null;
  amount: number;
  vat: number;
  amountDebit: number;
  accountName: string;
  accountNumber: string;
  additionalInfo: string;
  currency: string;
  directInBank: boolean;
  routingNumber: string;
  bankCode: string;
  status: "pending" | "sending" | "ineligible";
  paymentMethodID: string;
  createdAt: string;
}

export const usePayments = (filters?: {
  startDate?: string;
  endDate?: string;
  division?: string;
  paymentMethod?: string;
}) => {
  return useQuery<PaginatedResponse<Payment>>({
    queryKey: ["payments", filters],
    queryFn: async () => {
      const response = await API.get<IResponse<PaginatedResponse<Payment>>>(
        "/admin/payments",
        {
          params: filters,
        }
      );

      return response.data.data;
    },
  });
};

// hooks/useWithdrawals.ts
export const useWithdrawals = (filters?: {
  startDate?: string;
  endDate?: string;
  division?: string;
  paymentMethod?: string;
}) => {
  return useQuery<PaginatedResponse<Withdrawal>>({
    queryKey: ["withdrawals", filters],
    queryFn: async () => {
      const response = await API.get<IResponse<PaginatedResponse<Withdrawal>>>(
        "/admin/withdrawals",
        {
          params: filters,
        }
      );

      return response.data.data;
    },
  });
};
