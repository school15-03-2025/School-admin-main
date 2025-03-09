"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAddNotice, useUpdateNotice } from "@/hooks/Notics";

// Validation Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  status: z.enum(["ongoing", "expired", "comming soon"]),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  image: z.instanceof(File).optional(), // Validate image file
});

type FormData = z.infer<typeof formSchema>;

const AddNoticeModal = ({
  noticeData,
  onClose,
}: {
  noticeData?: any;
  onClose: () => void;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: addNotice } = useAddNotice();
  const { mutate: updateNotice } = useUpdateNotice();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: noticeData || {}, // Prefill with noticeData if editing
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (noticeData) {
      setValue("title", noticeData.title);
      setValue("status", noticeData.status);
      // setValue("updatedAt", noticeData.updatedAt);
      if (noticeData.image) {
        setImage(noticeData.image);
      }
    }
  }, [noticeData, setValue]);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("status", data.status);
    // formData.append("updatedAt", data.updatedAt);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (noticeData) {
      const isActive: boolean = true;
      formData.append("isActive", isActive.toString());
      formData.append("noticeID", noticeData._id);
      updateNotice(formData); // Now sending ID inside formData
    } else {
      addNotice(formData);
    }

    onClose();
  };

  // Handle image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
      {/* Image Upload Section */}
      <div className="card text-center flex flex-col border rounded-xl justify-center">
        <div className="relative inline-block p-5">
          {image ? (
            <Image
              src={image}
              alt="Banner Image"
              width={80}
              height={80}
              className="rounded"
            />
          ) : (
            <Image
              src="/ImagePrv.svg"
              alt="Banner Image"
              width={80}
              height={80}
            />
          )}
          {image && (
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setSelectedFile(null);
              }}
              className="absolute top-2 right-3 text-[#FF3D00]"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <label className="border border-black text-white bg-gray-600 max-w-sm text-sm py-2 px-5 m-2 rounded-lg cursor-pointer">
          Select photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form Fields */}
      <div className="flex-1">
        {/* Title */}
        <div className="w-full">
          <label htmlFor="title" className="w-full block">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="w-full px-3 py-2.5 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="w-full mt-4">
          <label htmlFor="status" className="w-full block">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ongoing">On Going</option>
            <option value="expired">Expired</option>
            <option value="comming soon">Coming Soon</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Updated Date */}
        <div className="w-full mt-4">
          <label htmlFor="updatedAt" className="w-full block">
            Updated Date
          </label>
          <input
            type="date"
            id="updatedAt"
            {...register("updatedAt")}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.updatedAt && (
            <p className="text-red-500 text-sm">{errors.updatedAt.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right mt-5">
          <button
            type="submit"
            className="text-white px-8 py-2 mt-5 text-lg bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {noticeData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNoticeModal;
