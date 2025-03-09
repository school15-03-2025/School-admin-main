import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddBroadcast, useUpdateBroadcast } from "@/hooks/Room";

// Room form schema
const roomSchema = z.object({
  type: z.enum(["public", "private"]),
  name: z.string().min(1, "Room name is required"),
  image: z.any().refine(
    (val) => {
      if (typeof window === "undefined") return true; // Skip validation on SSR
      if (val instanceof File) return true; // If it's a File, it's valid
      if (val instanceof FileList && val.length > 0) return true; // Allow FileList with at least one file
      if (typeof val === "string" && val.trim() !== "") return true; // Allow existing image URLs
      return false;
    },
    { message: "Image is required" }
  ),
});

function RoomForm({ mode = "add", roomData = null, onClose }: any) {
  const [previewImage, setPreviewImage] = useState(roomData?.image || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      type: roomData?.type || "public",
      name: roomData?.title || "",
      image: roomData?.image || null,
    },
  });

  // Handle add and update mutations
  const { mutate: addBroadcast } = useAddBroadcast(() => {
    reset(), onClose();
  });
  const { mutate: updateBroadcast } = useUpdateBroadcast(() => {
    reset(), onClose();
  });

  const imageFile = watch("image");

  // Handle file input changes and preview the image
  useEffect(() => {
    if (imageFile instanceof FileList && imageFile.length > 0) {
      setSelectedFile(imageFile[0]);
      setPreviewImage(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  // Convert image URL to a File
  const convertUrlToFile = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };

  // Create the form data to be submitted
  const createFormData = async (data: any) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("title", data.name);

    if (selectedFile) {
      formData.append("image", selectedFile);
    } else if (roomData?.image) {
      const fileFromUrl = await convertUrlToFile(roomData.image);
      formData.append("image", fileFromUrl);
    }

    return formData;
  };
  const onSubmit = async (data: any) => {
    const formData = await createFormData(data);

    if (mode === "add") {
      addBroadcast(formData);
    } else if (mode === "edit") {
      formData.append("broadcastID", roomData._id);
      updateBroadcast(formData);
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className=" p-6 rounded-lg shadow-md"
    >
      {/* Room Type */}
      <div className="mb-4">
        <label
          htmlFor="types"
          className="w-full block mb-2 text-gray-700 font-medium"
        >
          Type
        </label>
        <select
          {...register("type")}
          id="types"
          className="w-full border border-gray-300 bg-gray-200 text-gray-900 text-sm p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Room Name */}
      <div className="mb-4">
        <label
          htmlFor="roomName"
          className="w-full block text-gray-700 font-medium"
        >
          Room Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="roomName"
          required
          className="w-full p-3 mt-1 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter room name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.name.message)}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label
          htmlFor="imageUpload"
          className="w-full block text-gray-700 font-medium"
        >
          Upload Image
        </label>
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          id="imageUpload"
          className="w-full p-3 mt-1 border border-gray-300 bg-gray-200 rounded-lg"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.image.message)}
          </p>
        )}
      </div>

      {/* Image Preview */}
      {previewImage && (
        <div className="mb-4 text-center">
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover mx-auto rounded-lg border border-gray-400"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-[#0059ff] px-8 py-2 mt-1 text-lg rounded-lg focus:outline-none text-white"
        >
          {mode === "edit" ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default RoomForm;
