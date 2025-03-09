"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../index.module.css";

function Logo({ activeTab }: any) {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerManuImage, setBannerManuImage] = useState<string | null>(null);
  const bannerImgInputRef = useRef<HTMLInputElement | null>(null);
  const bannerManuImgInputRef = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => bannerImgInputRef.current?.click();
  const triggerMenuFileInput = () => bannerManuImgInputRef.current?.click();
  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full">
      <div className={`p-4 grid grid-cols-1 gap-5 justify-center`}>
        <div className="card border p-4 rounded-lg">
          <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700">
            Map Photos
          </h2>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div
                className={`card relative inline-block border p-5 rounded-xl ${style.imgPrev}`}
              >
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner Image"
                    width={100}
                    height={100}
                    className="h-40 w-40 object-cover"
                  />
                ) : (
                  <Image
                    src={"/ImagePrv.svg"}
                    alt="Banner Image"
                    width={100}
                    height={100}
                  />
                )}
                <button
                  type="button"
                  className="absolute hidden top-2 right-3 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
              <input
                ref={bannerImgInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="border border-black text-white bg-gray-600 max-w-sm text-sm py-2 px-10 m-2 rounded-lg"
              >
                Select photo
              </button>
            </div>
          </div>
          <hr className="my-3 " />

          <div
            className={`flex-1 grid gap-4 border-l rounded-lg ${
              activeTab !== null ? "border-l-0" : ""
            } grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}
          >
            <div className="h-36 border rounded-xl overflow-hidden text-center">
              <div className={`card relative h-full w-full`}>
                <Image
                  src={"/map.png"}
                  alt="Gallery Image"
                  className="h-full object-cover w-full"
                  width={140}
                  height={140}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
              <input
                ref={bannerImgInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="card border p-4 rounded-lg">
          <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700">
            Company support logo
          </h2>
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <div
                className={`card relative inline-block border p-5 rounded-xl ${style.imgPrev}`}
              >
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner Image"
                    width={100}
                    height={100}
                    className="h-40 w-40 object-cover"
                  />
                ) : (
                  <Image
                    src={"/ImagePrv.svg"}
                    alt="Banner Image"
                    width={100}
                    height={100}
                  />
                )}
                <button
                  type="button"
                  className="absolute hidden top-2 right-3 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="border border-black text-white bg-gray-600 max-w-sm text-sm py-2 px-10 m-2 rounded-lg"
              >
                Select photo
              </button>
            </div>
          </div>
          <hr className="my-3 " />

          <div
            className={`flex-1 grid gap-4 border-l rounded-lg ${
              activeTab !== null ? "border-l-0" : ""
            } grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}
          >
            <div className="h-36 border rounded-xl overflow-hidden text-center">
              <div className={`card relative h-full w-full relative`}>
                <Image
                  src={"/companies/cp1.png"}
                  alt="Gallery Image"
                  className="h-full object-cover w-full"
                  width={140}
                  height={140}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="h-36 border rounded-xl text-center">
              <div className={`card relative h-full w-full relative`}>
                <Image
                  src={"/companies/cp2.png"}
                  alt="Gallery Image"
                  className="h-full object-cover w-full"
                  width={140}
                  height={140}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="h-36 border rounded-xl text-center">
              <div className={`card relative h-full w-full relative`}>
                <Image
                  src={"/companies/cp3.png"}
                  alt="Gallery Image"
                  className="h-full object-cover w-full"
                  width={140}
                  height={140}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-[#FF3D00]"
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo;
