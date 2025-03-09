"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAddBlog, useUpdateBlog } from "@/hooks/Blogs";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill (No SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Quill Config
const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
  "color",
  "background",
];

// Validation Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tag: z.string().min(2, "Tag must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const BlogForm = ({ existingData, onClose }: any) => {
  const [image, setImage] = useState<string | null>(
    existingData?.image || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>(
    existingData?.content || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingData?.title || "",
      tag: existingData?.shortDescription || "",
      description: existingData?.content || "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (existingData) {
      reset({
        title: existingData.title || "",
        tag: existingData.shortDescription || "",
        description: existingData.content || "",
      });

      // Set description (from API response)
      setDescription(existingData.content || "");

      // Set image preview (use full URL)
      if (existingData.image) {
        setImage(existingData.image);
      }
    }
  }, [existingData, reset]);

  // Update description in form
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setValue("description", value);
  };

  const addBlog = useAddBlog(() => {
    reset();
    setImage(null);
    setDescription("");
  });

  const updateBlog = useUpdateBlog(() => {
    reset();
    setImage(null);
    setDescription("");
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("shortDescription", data.tag);
    formData.append("content", description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (existingData) {
      formData.append("blogID", existingData._id);
      updateBlog.mutate(formData);
    } else {
      addBlog.mutate(formData);
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
              alt="Blog Image"
              width={80}
              height={80}
              className="rounded"
            />
          ) : (
            <Image
              src="/ImagePrv.svg"
              alt="Blog Image"
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

        {/* Tag */}
        <div className="w-full mt-4">
          <label htmlFor="tag" className="w-full block">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            {...register("tag")}
            className="w-full px-3 py-2.5 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tag"
          />
          {errors.tag && (
            <p className="text-red-500 text-sm">{errors.tag.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="w-full mt-4">
          <label htmlFor="description" className="w-full block">
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            theme="snow"
            className="h-40"
            placeholder="Write something amazing..."
            modules={quillModules}
            formats={quillFormats}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right mt-8">
          <button
            type="submit"
            className="text-white px-8 py-2 mt-5 text-lg bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {existingData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
