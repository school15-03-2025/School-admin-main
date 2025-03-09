"use client";

import React, { useRef, useState } from "react";
import style from "../index.module.css";
import Image from "next/image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// Define Form Validation Schema using Zod
const bannerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tag: z.string().min(5, "Tag must be at least 5 characters"),
  bannerImage: z.instanceof(File).optional(),
  bannerManuImage: z.instanceof(File).optional(),
});

type BannerFormData = z.infer<typeof bannerSchema>;

function HomeBanner() {
  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
  });

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerManuImage, setBannerManuImage] = useState<string | null>(null);

  const bannerImgInputRef = useRef<HTMLInputElement | null>(null);
  const bannerManuImgInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    inputName: "bannerImage" | "bannerManuImage"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue(inputName, file);
    }
  };

  const triggerFileInput = () => bannerImgInputRef.current?.click();
  const triggerMenuFileInput = () => bannerManuImgInputRef.current?.click();

  // useMutation for API request
  const mutation = useMutation({
    mutationFn: async (data: BannerFormData) => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("tags", data.tag);
        if (data.bannerImage) {
          formData.append("image", data.bannerImage);
        }
        // if (data.bannerManuImage) formData.append("bannerManuImage", data.bannerManuImage);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEN_URL}/admin/add/banner`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return response.data;
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
    onSuccess: () => {
      toast.success("Banner added successfully!");
      reset();
      setBannerImage(null);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  //  Form Submit Handler
  const onSubmit = (data: BannerFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card pb-5 relative">
      <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700">
        Website Banner
      </h2>

      <div className="flex gap-10 flex-col">
        {/* Banner Image */}
        <div className="w-full flex flex-col">
          <div className="text-center">
            <div
              className={`card relative inline-block border p-5 rounded-xl ${style.imgPrev}`}
            >
              {bannerImage ? (
                <Image
                  src={bannerImage}
                  alt="Banner"
                  width={150}
                  height={150}
                  className="h-40 w-40 object-cover"
                />
              ) : (
                <Image
                  src={"/ImagePrv.svg"}
                  alt="Banner"
                  width={150}
                  height={150}
                />
              )}
              <button
                type="button"
                className="absolute hidden top-2 right-3 text-[#FF3D00]"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <input
              ref={bannerImgInputRef}
              type="file"
              accept="image/*, video/*"
              onChange={(e) =>
                handleFileChange(e, setBannerImage, "bannerImage")
              }
              className="hidden"
            />
          </div>
          <button
            type="button"
            onClick={triggerFileInput}
            className="border border-black text-white bg-gray-600 max-w-sm text-sm py-2 px-4 m-2 rounded-lg text-center mx-auto"
          >
            Select Banner Image
          </button>
          {errors.bannerImage && (
            <p className="text-red-500 text-sm">{errors.bannerImage.message}</p>
          )}
        </div>

        {/* Menu Banner Image */}
        {/* <div>
          <div className="text-center">
            <div
              className={`card relative inline-block border p-5 rounded-xl ${style.imgPrev}`}
            >
              {bannerManuImage ? (
                <Image
                  src={bannerManuImage}
                  alt="Menu Banner"
                  width={150}
                  height={150}
                  className="h-40 w-40 object-cover"
                />
              ) : (
                <Image
                  src={"/ImagePrv.svg"}
                  alt="Banner"
                  width={150}
                  height={150}
                />
              )}
              <button
                type="button"
                className="absolute hidden top-2 right-3 text-[#FF3D00]"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <input
              ref={bannerManuImgInputRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setBannerManuImage, "bannerManuImage")
              }
              className="hidden"
            />
          </div>
          <button
            type="button"
            onClick={triggerMenuFileInput}
            className="border border-black text-white bg-gray-600 max-w-sm text-sm py-2 px-4 m-2 rounded-lg"
          >
            Select Menu Banner Image
          </button>
          {errors.bannerManuImage && (
            <p className="text-red-500 text-sm">
              {errors.bannerManuImage.message}
            </p>
          )}
        </div> */}

        {/* Text Inputs */}
        <div className="flex-1 w-[60%] mx-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="w-full block">
                Banner Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Banner Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="tag" className="w-full block">
                Banner Tag
              </label>
              <textarea
                id="tag"
                {...register("tag")}
                rows={5}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Banner Tag"
              ></textarea>
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="text-left mt-10 absolute top-0 right-0">
        <button
          type="submit"
          className="text-white px-8 py-2 text-lg bg-[#000080] rounded-md"
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default HomeBanner;
