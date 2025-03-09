"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClose } from "@fortawesome/free-solid-svg-icons";
import { useAddEmployee, useUpdateEmployee } from "@/hooks/Employees";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  socialLinks: z
    .array(z.object({ url: z.string().url(), icon: z.string() }))
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const EmployeeForm = ({
  initialData,
  onClose,
}: {
  initialData?: any;
  onClose: any;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    initialData?.profilePhoto || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState<
    { url: string; icon: string }[]
  >(initialData?.socialLinks || []);
  const [socialInput, setSocialInput] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [icon, SetIcon] = useState<string | null | any>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.fullname || "",
      title: initialData?.title || "",
      image: initialData?.image,
    },
  });

  const { mutate: addEmployee, isPending: adding } = useAddEmployee(() => {
    reset(), onClose();
  });
  const { mutate: updateEmployee, isPending: updating } = useUpdateEmployee(
    () => {
      reset(), onClose();
    }
  );

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.fullname,
        title: initialData.title,
        image: initialData.image || undefined,
      });
    }
  }, [initialData, reset]);

  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectURL = URL.createObjectURL(file);
      setProfileImage(objectURL);
      setValue("image", file);
    }
  };

  // Handle Icon Upload
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      SetIcon(file);
      const iconURL = URL.createObjectURL(file);
      setSelectedIcon(iconURL);
      setIconPreview(iconURL);
    }
  };

  // Handle Adding Social Links
  const addSocialLink = () => {
    if (socialInput.trim() === "") return;
    setSocialLinks((prev) => [
      ...prev,
      {
        url: socialInput,
        icon: icon ?? "/social/icons/default.png",
      },
    ]);
    setSocialInput("");
    setSelectedIcon(null);
    setIconPreview(null);
    SetIcon(null);
  };

  // Remove a Social Link
  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("fullname", data.name);
    formData.append("title", data.title);
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    } else if (profileImage && !selectedFile) {
      if (profileImage.startsWith("http")) {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const file = new File([blob], initialData.profilePhoto, {
          type: blob.type,
        });
        formData.append("profilePhoto", file);
      }
    }
    if (initialData) {
      formData.append("employeeID", initialData._id);
      updateEmployee(formData);
    } else {
      formData.append("socialLinks", JSON.stringify(socialLinks));
      addEmployee(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Profile Image Upload */}
      <div className="card text-center flex flex-col border rounded-xl justify-center items-center">
        <div className="relative inline-block p-5">
          <Image
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : profileImage
                ? profileImage.startsWith("http")
                  ? profileImage
                  : `http://localhost:4000/uploads/${profileImage}`
                : "/ImagePrv.svg"
            }
            alt="Profile Image"
            width={80}
            height={80}
            className="rounded"
            unoptimized={!!selectedFile}
          />

          {profileImage && (
            <button
              type="button"
              onClick={() => {
                setProfileImage(null);
                setSelectedFile(null);
                setValue("image", undefined);
              }}
              className="absolute top-2 right-3 text-[#FF3D00]"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <label className="text-white bg-[#0059ff] max-w-sm text-sm py-2 px-5 m-2 rounded-lg cursor-pointer w-32">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Name & Title Fields */}
      <div className="grid grid-cols-2 gap-2">
        <div className="w-full">
          <label htmlFor="name" className="w-full block">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2.5 mt-1 border rounded-xl"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="title" className="w-full block">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="w-full px-3 py-2.5 mt-1 border rounded-xl"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
      </div>

      {/* Social Links */}
      {!initialData && (
        <div className="border rounded-xl mt-3 p-3">
          <label className="w-full block">Social Links</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="bg-gray-50 border border-gray-700 text-sm rounded-lg w-full p-3"
              placeholder="Add social link"
              value={socialInput}
              onChange={(e) => setSocialInput(e.target.value)}
            />

            {/* Icon Preview (if selected) */}
            {iconPreview && (
              <Image
                src={iconPreview}
                alt="Selected Icon"
                width={30}
                height={30}
                className="rounded"
              />
            )}

            {/* Hidden File Input for Icon Selection */}
            <label className="cursor-pointer bg-gray-200 text-sm py-1 px-3 rounded-lg">
              Select Icon
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={addSocialLink}
              className="py-2 px-5 text-white bg-[#0059ff] rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Display Social Links with Selected Icons */}
          <div className="flex flex-wrap mt-2">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="relative flex items-center gap-2 p-2 border rounded-lg"
              >
                <Image
                  src={link.icon}
                  alt="Social Icon"
                  width={30}
                  height={30}
                  className="rounded"
                />
                <span className="text-sm break-all">{link.url}</span>
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 ml-2"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-right mt-5">
        <button
          type="submit"
          className="text-white px-8 py-2 bg-[#0059ff] rounded-lg"
        >
          {adding || updating ? "Saving..." : initialData ? "Update " : "Save "}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
