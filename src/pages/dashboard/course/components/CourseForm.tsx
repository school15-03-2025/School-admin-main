import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAddCourse } from "@/hooks/Courses";

// ✅ Validation schema with Zod
const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  courseName: z.string().min(3, "Course Name is required"),
  price: z.coerce.number().min(1, "Price must be greater than zero"),
  discount: z.coerce.number().min(0, "Discount cannot be negative"),
  totalSeats: z.coerce.number().min(1, "At least one seat is required"),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  language: z.string().min(2, "Language is required"),
  lessonsPerClass: z.coerce.number().min(1, "At least 1 lesson per class"),
  status: z.enum(["ongoing", "upcoming", "live", "ended", "blocked"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  totalCourseDuration: z.string().min(1, "Course duration is required"),
  hasCertificate: z.boolean(),
  type: z.enum([
    "nonInstitutionCourse",
    "institutionCourse",
    "nonInstitutionVideoCourse",
    "institutionVideoCourse",
  ]),
  classesPerWeek: z.string().min(1, "At least 1 class per week"),
  image: z.any().optional(),
});

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

const CourseForm: React.FC<CourseFormProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      courseName: "",
      price: 0,
      discount: 0,
      totalSeats: 1,
      skillLevel: "Beginner",
      language: "",
      lessonsPerClass: 1,
      status: "ongoing",
      startDate: "",
      endDate: "",
      totalCourseDuration: "",
      hasCertificate: false,
      type: "nonInstitutionCourse",
      classesPerWeek: "",
      image: null,
      ...editData,
    },
  });

  useEffect(() => {
    if (editData) {
      Object.keys(editData).forEach((key) =>
        setValue(key as any, editData[key])
      );
    }
  }, [editData, setValue]);

  const { mutate: addCourse } = useAddCourse();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else if (key === "hasCertificate") {
        formData.append(key, data[key] ? "true" : "false"); // ✅ Convert to string for backend
      } else {
        formData.append(key, data[key].toString());
      }
    });

    addCourse(formData);
    console.log("✅ Form Data Submitted:", formData);
    onClose();
  };

  const onError = (errors: any) => {
    console.log("❌ Validation Errors:", errors);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editData ? "Edit Course" : "Add Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="grid grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          {[
            { label: "Title", name: "title" },
            { label: "Course Name", name: "courseName" },
            { label: "Language", name: "language" },
            { label: "Total Course Duration", name: "totalCourseDuration" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <input
                {...register(name)}
                className="input-field border border-gray-300 p-2 rounded w-full"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">
                  {typeof errors[name]?.message === "string"
                    ? errors[name]?.message
                    : ""}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2">
            <label className="block font-semibold">Description</label>
            <textarea
              {...register("description")}
              className="input-field border border-gray-300 p-2 rounded w-full h-20"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {typeof errors.description.message === "string"
                  ? errors.description.message
                  : ""}
              </p>
            )}
          </div>

          {[
            { label: "Price ($)", name: "price", type: "number" },
            { label: "Discount (%)", name: "discount", type: "number" },
            { label: "Total Seats", name: "totalSeats", type: "number" },
            {
              label: "Lessons Per Class",
              name: "lessonsPerClass",
              type: "number",
            },
            { label: "Classes Per Week", name: "classesPerWeek", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <input
                type={type}
                {...register(name)}
                className="input-field border border-gray-300 p-2 rounded w-full"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">
                  {typeof errors[name]?.message === "string"
                    ? errors[name]?.message
                    : ""}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block font-semibold">Status</label>
            <select
              {...register("status")}
              className="input-field border border-gray-300 p-2 rounded w-full"
            >
              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="ended">Ended</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Status</label>
            <select
              {...register("type")}
              className="input-field border border-gray-300 p-2 rounded w-full"
            >
              <option value="nonInstitutionCourse">
                Non Institution Course
              </option>
              <option value="institutionCourse">Institution Course</option>
              <option value="nonInstitutionVideoCourse">
                Non Institution Video Course
              </option>
              <option value="institutionVideoCourse">
                Institution Video Course
              </option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className="input-field border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="input-field border border-gray-300 p-2 rounded w-full"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">
                {typeof errors.startDate.message === "string"
                  ? errors.startDate.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className="input-field border border-gray-300 p-2 rounded w-full"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">
                {typeof errors.endDate.message === "string"
                  ? errors.endDate.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Has Certificate</label>
            <input
              type="checkbox"
              {...register("hasCertificate")}
              className="mr-2"
              onChange={(e) => setValue("hasCertificate", e.target.checked)}
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {editData ? "Update Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
