"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAddTopic, useUpdateTopic } from "@/hooks/Topics";

const formSchema = z.object({
  image: z.instanceof(File).optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  tags: z.string().min(3, "Tags must be at least 3 characters"),
  status: z.enum(["activated", "inactived"]).default("activated"),
});

type FormData = z.infer<typeof formSchema>;

const TopicForm = ({
  onClose,
  editData,
}: {
  onClose: () => void;
  editData?: any;
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: editData
      ? {
          title: editData.title,
          tags: editData.tags,
          status: editData.status,
        }
      : undefined,
  });

  const { mutate: addTopic, isPending: isAdding } = useAddTopic(() => {
    onClose(), reset();
  });
  const { mutate: updateTopic, isPending: isUpdating } = useUpdateTopic(() => {
    onClose(), reset();
  });

  useEffect(() => {
    if (editData) {
      if (editData.image) {
        setPreviewImage(editData.image);
      }
    }
  }, [editData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("status", data.status);
    if (selectedFile) formData.append("image", selectedFile);

    if (editData) {
      formData.append("topicID", editData._id);
      updateTopic(formData);
    } else {
      addTopic(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-start gap-4 w-full"
    >
      {/* Image Upload */}
      <div className="card text-center flex flex-col border rounded-xl justify-center w-full md:w-1/3">
        <div className="relative inline-block p-5">
          {previewImage ? (
            <Image
              src={previewImage}
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
          {previewImage && (
            <button
              type="button"
              onClick={() => {
                setPreviewImage(null);
                setSelectedFile(null);
              }}
              className="absolute top-2 right-3 text-[#FF3D00]"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <label className="border border-black text-white bg-gray-600 text-sm py-2 px-5 m-2 rounded-lg cursor-pointer">
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
      <div className="flex-1 w-full md:w-2/3">
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

        {/* Tags */}
        <div className="w-full mt-4">
          <label htmlFor="tags" className="w-full block">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            {...register("tags")}
            className="w-full px-3 py-2.5 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tags"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="w-full mt-4">
          <label htmlFor="status" className="w-full block">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-3 py-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="activated">Activated</option>
            <option value="inactived">Inactived</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-right mt-5">
          <button
            type="submit"
            className="text-white px-8 py-2 text-lg bg-indigo-600 rounded-lg hover:bg-indigo-700"
            disabled={isAdding || isUpdating}
          >
            {editData
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isAdding
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TopicForm;
