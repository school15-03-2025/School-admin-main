import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  useAddOfficeAddress,
  useUpdateOfficeAddress,
} from "@/hooks/mutations/company-details";

// Define the form data interface
interface OfficeAddressFormData {
  address: string;
  email: string;
  phone: string;
  faxNumber: string;
}

// Explicitly type the schema
const schema: Yup.ObjectSchema<OfficeAddressFormData> = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  faxNumber: Yup.string().required("Fax number is required"),
});

const OfficeAddressForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfficeAddressFormData>({
    resolver: yupResolver(schema), // Pass the typed schema
  });

  const { mutateAsync, isPending } = useAddOfficeAddress(() => reset());

  const onSubmit = async (data: OfficeAddressFormData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="card pb-5 mt-5">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg p-10 space-y-6 rounded-2xl shadow-md bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Address Field */}
            <div>
              <label htmlFor="address" className="w-full block">
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address")}
                className={`w-full px-4 py-3 mt-1 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Address"
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="w-full block">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full px-4 py-3 mt-1 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Email"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="w-full block">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className={`w-full px-4 py-3 mt-1 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Phone"
                aria-invalid={errors.phone ? "true" : "false"}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Fax Number Field */}
            <div>
              <label htmlFor="faxNumber" className="w-full block">
                Fax Number
              </label>
              <input
                type="text"
                id="faxNumber"
                {...register("faxNumber")}
                className={`w-full px-4 py-3 mt-1 border ${
                  errors.faxNumber ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Fax Number"
                aria-invalid={errors.faxNumber ? "true" : "false"}
              />
              {errors.faxNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.faxNumber.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="text-white px-8 py-2 mt-2 text-lg relative bg-[#000080] w-full rounded-md disabled:opacity-50"
                disabled={isPending || isSubmitting}
              >
                {isPending || isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeAddressForm;
