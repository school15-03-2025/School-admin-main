import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddCard, useUpdateCard } from "@/hooks/Security";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

//  Zod Validation Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tags: z.string().min(1, "Tag is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SecurityCard = ({
  title,
  mode = "add",
  existingData,
  onSuccess,
}: any) => {
  const bannerImgInputRef = useRef<HTMLInputElement | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [htmlData, setHtmlData] = useState("");

  //  React Hook Form Setup
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

  const addCard = useAddCard(() => {
    reset();
    setBannerImage(null);
    setHtmlData("");
    onSuccess();
  });

  const updateCard = useUpdateCard(() => {
    reset();
    setBannerImage(null);
    setHtmlData("");
    onSuccess();
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
    if (!bannerImage) {
      toast.error("Please select a Security image");
    }
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
    <div className="card pb-5 p-2  relative">
      <h2 className="text-xl font-medium mb-8 poppins-semibold text-black-700 text-left">
        {title}
      </h2>
      <form onSubmit={handleSubmit(onFormSubmit)} className="">
        {/* Image Upload */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center w-full">
            <div className="text-center flex flex-col items-center justify-center w-64">
              <div className="card relative inline-block p-5 rounded-xl w-64">
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
                    src={"/ImagePrv.svg"}
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
                className="border border-black text-white bg-gray-600 px-4 py-2 mr-10 rounded-lg"
              >
                Select photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col justify-center items-center w-full max-w-xl">
            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="title" className="block text-left">
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
                <label htmlFor="tag" className="block text-left">
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

        {/* Rich Text Editor */}
        <div className="mt-5 w-full max-w-xl mx-auto ">
          <label htmlFor="description" className="block text-left">
            Description
          </label>
          {typeof window !== "undefined" && ReactQuill ? (
            <ReactQuill
              value={htmlData}
              onChange={handleContentChange}
              theme="snow"
              style={{ height: "250px", background: "white" }}
            />
          ) : (
            <p>Loading editor...</p>
          )}
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center absolute top-0 right-3">
          <button
            type="submit"
            className="bg-[#000080] text-white px-8  py-3 rounded-sm"
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
          {/* <button
            type="button"
            onClick={onSuccess}
            className="bg-black text-white px-6 py-2 rounded-sm"
          >
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SecurityCard;
