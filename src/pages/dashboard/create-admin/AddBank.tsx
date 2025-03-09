"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddPaymentMethod, useUpdatePaymentMethod } from "@/hooks/BankDetails";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// ✅ Zod Schema Validation
const paymentSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  accountName: z.string().min(1, "Account Name is required"),
  taxRate: z.string().min(1, "Tax Rate is required"),
  paymentMethod: z.string().min(1, "Payment Method is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  routingNumber: z.string().min(1, "Routing Number is required"),
});

interface AddBankProps {
  setModalOpen: (open: boolean) => void;
  editData?: any;
}

function AddBank({ setModalOpen, editData }: AddBankProps) {
  const isEditMode = !!editData; 
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const [currencies, setCurrencies] = useState<string[]>(editData?.currency || []);
  const [logo, setLogo] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(editData?.logo || null);
  const [qrPreview, setQrPreview] = useState<string | null>(editData?.qrCode || null);

  const addPaymentMethod = useAddPaymentMethod();
  const updatePaymentMethod = useUpdatePaymentMethod();

  // ✅ Pre-fill form fields when editing
  useEffect(() => {
    if (isEditMode) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
      });
    }
  }, [editData, setValue]);

  // ✅ Handle Form Submission
  const onSubmit = async (data: any) => {
    if (!logo && !isEditMode) {
      toast.error("Logo is required!");
      return;
    }
    if (!qrCode && !isEditMode) {
      toast.error("QR Code is required!");
      return;
    }

    const formData = new FormData();
    formData.append("bankName", data.bankName);
    formData.append("vat", data.taxRate);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("accountNumber", data.accountNumber);
    formData.append("routingNumber", data.routingNumber);
    formData.append("accountName", data.accountName);
    formData.append("currency", JSON.stringify(currencies));
    if (logo) formData.append("logo", logo);
    if (qrCode) formData.append("qrCode", qrCode);

    if (isEditMode) {
      formData.append("paymentMethodID",editData._id);
      // Update existing payment method
      updatePaymentMethod.mutate(
         formData ,
        {
          onSuccess: () => {
            toast.success("Payment Method Updated Successfully!");
            setModalOpen(false);
          },
        }
      );
    } else {
      // Add new payment method
      addPaymentMethod.mutate(formData, {
        onSuccess: () => {
          toast.success("Payment Method Added Successfully!");
          reset();
          setLogo(null);
          setQrCode(null);
          setLogoPreview(null);
          setQrPreview(null);
          setCurrencies([]);
          setModalOpen(false);
        },
      });
    }
  };

  // ✅ Handle Currency Addition
  const addCurrency = () => {
    const selectedCurrency = watch("currency");
    if (selectedCurrency && !currencies.includes(selectedCurrency)) {
      setCurrencies([...currencies, selectedCurrency]);
    }
  };

  // ✅ Handle Currency Removal
  const removeCurrency = (currency: string) => {
    setCurrencies(currencies.filter((c) => c !== currency));
  };

  // ✅ Handle File Selection & Preview
  const handleFileChange = (event: any, type: "logo" | "qrCode") => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "logo") {
          setLogo(file);
          setLogoPreview(reader.result as string);
        } else {
          setQrCode(file);
          setQrPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* File Uploads */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="logoInput" className="block font-medium">
            Logo
          </label>
          <div className="border p-3 rounded-lg flex justify-center items-center">
            <label htmlFor="logoInput" className="cursor-pointer">
              <input
                type="file"
                id="logoInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "logo")}
              />
              <Image src={logoPreview || "/imageUpload.png"} alt="Logo Preview" width={80} height={80} />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="qrInput" className="block font-medium">
            QR Code
          </label>
          <div className="border p-3 rounded-lg flex justify-center items-center">
            <label htmlFor="qrInput" className="cursor-pointer">
              <input
                type="file"
                id="qrInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "qrCode")}
              />
              <Image src={qrPreview || "/imageUpload.png"} alt="QR Code Preview" width={80} height={80} />
            </label>
          </div>
        </div>
      </div>

      {/* Text Inputs */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block font-medium">Bank Info</label>
          <input
            type="text"
            {...register("bankName")}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Account info .."
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm">
              {String(errors.bankName.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Tax Rate / VAT</label>
          <select
            {...register("taxRate")}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select Tax Rate</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
          </select>
          {errors.taxRate && (
            <p className="text-red-500 text-sm">
              {String(errors.taxRate.message)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block font-medium">Payment Method</label>
          <input
            type="text"
            {...register("paymentMethod")}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Payment Method"
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">
              {String(errors.paymentMethod.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Account Number</label>
          <input
            type="text"
            {...register("accountNumber")}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Account Number"
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm">
              {String(errors.accountNumber.message)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block font-medium">Routing Number</label>
          <input
            type="text"
            {...register("routingNumber")}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Routing Number"
          />
          {errors.routingNumber && (
            <p className="text-red-500 text-sm">
              {String(errors.routingNumber.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Account No</label>
          <input type="text" {...register("accountName")} className="w-full px-3 py-2 border rounded-lg" placeholder="Account Number" />
          {errors.accountName && <p className="text-red-500 text-sm">{String(errors.accountName.message)}</p>}
        </div>
      </div>
      <div>
        <label className="block font-medium">Supported Currencies</label>
        <div className="flex gap-2">
          <select
            {...register("currency")}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
            <option value="MATIC">MATIC</option>
          </select>
          <button
            type="button"
            onClick={addCurrency}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg"
          >
            Add
          </button>
        </div>
        {/* Display Added Currencies */}
        <ul className="mt-2">
          {currencies.map((curr, idx) => (
            <li
              key={idx}
              className="inline-block p-1 mx-1 border border-gray-500 rounded-full text-sm"
            >
              {curr}{" "}
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => removeCurrency(curr)}
                className="cursor-pointer ml-1 text-red-500"
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Submit Button */}
      <div className="text-right">
        <button type="submit" className="px-8 py-2 bg-[#0059ff] text-white rounded-lg">
          {isEditMode ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default AddBank;
