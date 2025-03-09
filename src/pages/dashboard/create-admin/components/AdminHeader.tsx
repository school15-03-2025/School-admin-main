import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function AdminHeader({
  handleFileChange,
  formData,
  setFormData,
  errors,
}: {
  handleFileChange: any;
  formData: any;
  setFormData: any;
  errors: any;
}) {
  return (
    <div className="text-center flex card gap-10 px-5 items-end">
      <label htmlFor="galleryImg">
        <input
          id="galleryImg"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Image
          src={"/imageUpload.png"}
          alt="Banner Image"
          width={50}
          height={50}
        />
      </label>
      {formData.photo && (
        <div className="relative inline-block px-2 pl-0">
          <Image
            src={URL.createObjectURL(formData.photo)}
            alt="Preview"
            width={50}
            height={50}
          />
          <button
            type="button"
            className="absolute top-0 right-0 text-[#FF3D00]"
            onClick={() => setFormData({ ...formData, photo: null })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {errors.photo && (
            <p className="text-red-500 text-xs">{errors.name}</p>
          )}
        </div>
      )}
    </div>
  );
}
