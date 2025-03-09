import API from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;
interface IUpdateOfficeAddress {
  address: string;
  email: string;
  phone: string;
  faxNumber: string;
}

export const useUpdateOfficeAddress = () => {
  return useMutation({
    mutationFn: async (input: IUpdateOfficeAddress) => {
      const result = await API.post(`${baseUrl}/admin/update/officeaddress`, input);
      return result.data;
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.error("company updated successfully");
    },
  });
};
export const useAddOfficeAddress = (onSuccess:()=>void) => {
  return useMutation({
    mutationFn: async (input: IUpdateOfficeAddress) => {
      const result = await API.post(`${baseUrl}/admin/add/officeaddress`, input);
      return result.data;
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.success("company address added successfully");
      onSuccess();
    },
  });
};
