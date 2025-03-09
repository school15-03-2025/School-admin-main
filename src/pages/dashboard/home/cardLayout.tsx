import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useAddCard, useUpdateCard } from "@/hooks/FourCard";
import {
  useAddCard as ThreeCardAdd,
  useUpdateCard as ThreeCardUpdate,
} from "@/hooks/ThreeCards";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tags: z.string().min(1, "Tag is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const CardLayouts = ({
  title,
  mode = "add",
  existingData,
  onSuccess,
  showForm,
  ThreeCard = false,
}: any) => {
  const bannerImgInputRef = useRef<HTMLInputElement | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [htmlData, setHtmlData] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: existingData || { title: "", tags: "", description: "" },
  });

  useEffect(() => {
    if (mode === "edit" && existingData) {
      reset(existingData);
      setBannerImage(existingData.bannerImage || null);
      setHtmlData(existingData.description || "");
    }
  }, [mode, existingData, reset]);

  const useAdd = ThreeCard ? ThreeCardAdd : useAddCard;
  const useUpdate = ThreeCard ? ThreeCardUpdate : useUpdateCard;
  const addCard = useAdd(() => {
    reset();
    setBannerImage(null);
    setHtmlData("");
    onSuccess();
    showForm();
  });

  const updateCard = useUpdate(() => {
    reset();
    setBannerImage(null);
    setHtmlData("");
    onSuccess();
    showForm();
  });

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };


  const handleContentChange = (value: string) => {
    setHtmlData(value);
    setValue("description", value);
  };

  const onFormSubmit = (data: FormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("description", htmlData);

    if (bannerImage && bannerImgInputRef.current?.files?.[0]) {
      formData.append("image", bannerImgInputRef.current.files[0]);
    }

    if (mode === "edit" && existingData) {
      formData.append("cardID", existingData._id);
      updateCard.mutate(formData);
    } else {
      addCard.mutate(formData);
    }
  };

  return (
    <div className="card pb-5">
      <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700">
        {title}
      </h2>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative">
        {/*  Image Upload */}
        <div className="flex gap-10">
          <div className="w-1/4">
            <div className="text-center">
              <div className="card relative inline-block border p-5 rounded-xl">
                {bannerImage ? (
                  <Image
                    src={bannerImage}
                    alt="Banner Image"
                    width={150}
                    height={150}
                    className="h-40 w-40 object-cover"
                  />
                ) : (
                  <Image
                    src={`${
                      existingData ? existingData.image : `/ImagePrv.svg`
                    }`}
                    alt="Banner Placeholder"
                    width={150}
                    height={150}
                  />
                )}
                {bannerImage && (
                  <button
                    type="button"
                    onClick={() => setBannerImage(null)}
                    className="absolute top-2 right-3 text-[#FF3D00]"
                  >
                    ❌
                  </button>
                )}
              </div>
              <input
                ref={bannerImgInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bannerImgInputRef.current?.click()}
                className="border border-black text-white bg-gray-600 px-4 py-2 m-2 rounded-lg"
              >
                Select photo
              </button>
            </div>
          </div>

          {/*  Form Fields */}
          <div className="flex-1 w-3/4">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="Title"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tag" className="block">
                  Tag
                </label>
                <textarea
                  {...register("tags")}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="Tag"
                ></textarea>
                {errors.tags && (
                  <p className="text-red-500">{errors.tags.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*  Rich Text Editor */}
        <div className="mt-5">
          <label htmlFor="description" className="block">
            Description
          </label>
          {typeof window !== "undefined" && ReactQuill ? (
            <ReactQuill
              value={htmlData}
              onChange={handleContentChange}
              theme="snow"
              style={{ height: "250px" }}
            />
          ) : (
            <p>Loading editor...</p>
          )}
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/*  Submit & Cancel Buttons */}
        <div className="mt-14 flex gap-4 ">
          <button
            type="submit"
            className="bg-[#0059ff] text-white px-6 py-2 rounded-lg"
          >
            {mode === "edit" ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardLayouts;
