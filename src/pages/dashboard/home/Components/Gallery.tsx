"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../index.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetGallery,
  useAddGallery,
  useDeleteGallery,
} from "@/hooks/Gallery";
import Category from "./Category";
import Loader from "@/components/Loader";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string().min(1, "Type is required"),
  // description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.instanceof(File, { message: "Image file is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Gallery({ activeTab }: { activeTab: string | null }) {
  const { data: gallery, isLoading, error } = useGetGallery();
  const addGalleryMutation = useAddGallery();
  const deleteGalleryMutation = useDeleteGallery();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => imgInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const onSubmit = (formData: FormData) => {
    addGalleryMutation.mutate(formData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap md:flex-nowrap h-screen justify-center w-full">
        <Category />

        {/* Form & Gallery Section */}
        <div className="p-3 w-full">
          <div className="flex flex-wrap sm:flex-nowrap gap-3 m-3 ml-5 justify-start">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-wrap sm:flex-nowrap gap-5 px-5 w-full justify-center"
            >
              {/* Select Type */}
              <div className="w-full sm:w-auto">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Type
                </label>
                <select
                  {...register("type")}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Type</option>
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-xs">{errors.type.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="mt-4">
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*, video/mp4,mvc,mkv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Image
                  src={"/imageUpload.png"}
                  alt="Upload Image"
                  width={50}
                  height={50}
                  onClick={triggerFileInput}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>

              {/* URL/Title Input */}
              <div className="w-full sm:w-auto">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL/Title
                </label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Title / URL"
                  className="border p-2 rounded w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#0059ff] text-white h-10 rounded w-32 my-auto mt-5"
              >
                {addGalleryMutation.isPending ? "Saving..." : "Save"}
              </button>
            </form>
          </div>

          <hr className="my-5" />

          {/* Gallery Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500">Error loading gallery</p>
            ) : (
              gallery.data.serviceGallery?.map(
                (item: { _id: string; media: string; title: string }) => {
                  const isVideo = /\.(mp4|webm|ogg|avi|mov|mkv)$/i.test(
                    item.media
                  );
                  return (
                    <div
                      key={item._id}
                      className="h-36 border rounded-xl overflow-hidden text-center relative"
                    >
                      {isVideo ? (
                        <video
                          src={item.media}
                          width={140}
                          height={140}
                          className="object-cover w-full h-full"
                          controls
                        />
                      ) : (
                        <Image
                          src={item.media}
                          alt={item.title}
                          width={140}
                          height={140}
                          className="object-cover w-full h-full"
                        />
                      )}

                      <button
                        onClick={() => deleteGalleryMutation.mutate(item._id)}
                        className="absolute top-2 right-2 text-[#FF3D00]"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <div className="absolute bottom-0 right-0 left-0 text-white text-xs text-left p-2 bg-black/40">
                        <p className="m-0">{item.title}</p>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
