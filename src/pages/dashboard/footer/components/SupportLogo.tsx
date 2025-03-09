import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import style from "../index.module.css";
import {
  useGetSupportLogos,
  useAddSupportLogo,
  useDeleteSupportLogo,
} from "@/hooks/SupportLogo";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";

function SupportLogo({ activeTab }: any) {
  const { data: images, isLoading, error } = useGetSupportLogos();
  const addSupportLogo = useAddSupportLogo();
  const deleteSupportLogo = useDeleteSupportLogo();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [type, setType] = useState("company");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFilePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle Type Selection
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  // Handle Form Submission (Send both Image & Type)
  const handleAddLogo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image file.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("image", imageFile);

    addSupportLogo.mutate(formData, {
      onSettled: () => {
        setIsSubmitting(false);
        setImageFile(null);
        setFilePreview(null);
        setType("company");
      },
    });
  };

  // Handle Delete Logo
  const handleDeleteLogo = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      const formData = new FormData();
      formData.append("supportLogoID", id);
      deleteSupportLogo.mutate(formData);
    }
  };

  return (
    <div className="card  p-4 rounded-lg flex flex-col">
      <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700 text-center">
        Company Support Logo
      </h2>

      {/* Form to Add Support Logo */}
      <form
        onSubmit={handleAddLogo}
        className="flex flex-col lg:flex-col items-center gap-4"
      >
        {/* File Upload Section */}
        <div className="card flex flex-col  rounded-xl justify-center p-4 w-full lg:w-auto">
          <div className="relative inline-block p-5  justify-center">
            <Image
              src={filePreview || "/ImagePrv.svg"}
              alt="Preview Image"
              width={80}
              height={80}
              className="rounded-md"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="imageUpload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="imageUpload"
            className=" text-white bg-[#0059ff] text-sm py-2 px-5 m-2 rounded-lg cursor-pointer text-center"
          >
            Select Photo
          </label>
        </div>

        {/* Dropdown + Save Button in Row (Responsive) */}
        <div className="flex flex-col w-full lg:flex-col lg:items-center gap-4">
          {/* Select Type Dropdown */}
          <div className="flex-1">
            <select
              id="logoType"
              value={type}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="company">Company</option>
              <option value="map">Map</option>
              <option value="payment">Payment</option>
              <option value="social">Social</option>
            </select>
          </div>

          {/* Save Button (Only enabled when file is selected) */}
          <div className="text-center">
            <button
              type="submit"
              className={`text-white px-8 py-2 text-lg rounded-lg ${
                imageFile ? "bg-indigo-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!imageFile || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      <hr className="my-3" />

      {/* Display Support Logos */}
      <div
        className={`grid gap-4 border-l rounded-lg ${
          activeTab !== null ? "border-l-0" : ""
        } grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center`}
      >
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 text-center col-span-3">
            Error loading logos!
          </p>
        ) : images.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3 py-4">
            No logos found.
          </p>
        ) : (
          images.map((image: any, index: number) => (
            <div
              key={index}
              className="h-36 border rounded-xl overflow-hidden flex items-center justify-center relative"
            >
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_BACKEN_URL}/uploads/${image.logo}` ||
                  "/social/fb.png"
                }
                alt="Gallery Image"
                className="h-full object-contain w-full"
                width={140}
                height={140}
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-[#FF3D00]"
                onClick={() => handleDeleteLogo(image._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SupportLogo;
