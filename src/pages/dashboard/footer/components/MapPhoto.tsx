import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "../index.module.css";
import {
  useAddSupportLogo,
  useDeleteSupportLogo,
  useGetSupportLogos,
} from "@/hooks/SupportLogo";
import Loader from "@/components/Loader";

const MapPhotos = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSupportLogo = useAddSupportLogo();
  const deleteSupportLogo = useDeleteSupportLogo();
  const { data: images, isLoading, error } = useGetSupportLogos();

  // Filter only images with type "map"
  const mapImages = images?.filter((image: any) => image.type === "map") || [];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      toast.error("Please select an image file.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("type", "map");
    formData.append("image", imageFile);

    addSupportLogo.mutate(formData, {
      onSettled: () => {
        setIsSubmitting(false);
        setImageFile(null);
        setFilePreview(null);
      },
    });
  };

  return (
    <div className="card p-4 rounded-lg w-full flex flex-col items-center">
      <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700 text-center">
        Map Photos
      </h2>

      {/* Image Upload Section (Centered) */}
      <div className="flex flex-col items-center gap-4 w-full">
        <label className="cursor-pointer flex flex-col items-center">
          <div
            className={`card relative inline-block  p-5 rounded-xl ${style.imgPrev}`}
          >
            <Image
              src={filePreview || "/ImagePrv.svg"}
              alt="Upload Image"
              width={80}
              height={80}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </label>

        <button
          type="button"
          onClick={handleSaveImage}
          disabled={isSubmitting}
          className="border text-white bg-[#0059ff] max-w-sm text-sm py-2 px-10 m-2 rounded-lg"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>

      <hr className="my-5 w-full" />
      {/* Image Gallery - Centered as a whole */}
      <div className="w-full flex justify-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-6xl">
          {isLoading ? (
            <div className="col-span-full h-36 flex items-center justify-center">
              <Loader />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500 py-4">
              Error loading images!
            </div>
          ) : mapImages.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full py-4">
              No images found.
            </p>
          ) : (
            mapImages.map((image: any) => (
              <div
                key={image.id}
                className="h-36 rounded-xl overflow-hidden flex items-center justify-center"
              >
                <div className="relative h-full w-full flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEN_URL}/uploads/${image.logo}`}
                    alt="Gallery Image"
                    className="max-h-full max-w-full object-contain"
                    width={140}
                    height={140}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPhotos;
