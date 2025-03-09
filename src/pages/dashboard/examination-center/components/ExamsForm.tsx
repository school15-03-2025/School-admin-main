import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useAddExamination, useUpdateExamination } from "@/hooks/Examination";
import { useGetCourses } from "@/hooks/Courses";
import { useGetTopics } from "@/hooks/Topics";
import { toDatetimeLocal } from "../../../../utils/implement";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
interface FormData {
  courseID: string;
  topicID: string;
  title: string;
  examDate: string;
  image: FileList;
}

interface ExamFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ({ _id: string } & FormData) | null;
}

const ExamForm: React.FC<ExamFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const addExamMutation = useAddExamination();
  const updateExamMutation = useUpdateExamination();

  const { data: courses, isLoading, isError } = useGetCourses({});
  const {
    data: topics,
    isLoading: loadingTopics,
    isError: topicsError,
  } = useGetTopics({});

  const courseArray =
    courses?.courses?.map(({ _id, courseName }: any) => ({
      id: _id,
      name: courseName,
    })) || [];

  const topicsArray =
    topics?.notice?.map(({ _id, title }: any) => ({ id: _id, name: title })) ||
    [];

  useEffect(() => {
    if (initialData) {
      reset({
        courseID: initialData.courseID,
        topicID: initialData.topicID,
        title: initialData.title,
        examDate: initialData.examDate
          ? toDatetimeLocal(initialData.examDate)
          : "",
      });
    } else {
      reset({
        courseID: "",
        topicID: "",
        title: "",
        examDate: "",
      });
    }
  }, [initialData, reset]);

  if (isLoading || loadingTopics) return <Loader />;
  if (isError || topicsError)
    return (
      <Alert
        className="bg-red-300 "
        title="Error wilte loading"
        type="danger"
        key={1}
        children={""}
      />
    );

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("courseID", data.courseID);
    formData.append("topicID", data.topicID);
    formData.append("title", data.title);
    formData.append("examDate", data.examDate);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    if (initialData?._id) {
      formData.append("examinationRoomID", initialData._id);
      updateExamMutation.mutate(
        { updatedExam: formData },
        { onSuccess: onClose }
      );
    } else {
      addExamMutation.mutate(formData, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Exam" : "Create Exam"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Course</label>
            <Controller
              control={control}
              name="courseID"
              defaultValue=""
              rules={{ required: "Course is required" }}
              render={({ field }) => (
                <select {...field} className="w-full border rounded px-2 py-1">
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courseArray.map(({ id, name }: any) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.courseID && (
              <p className="text-red-500 text-sm">{errors.courseID.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Topic</label>
            <Controller
              control={control}
              name="topicID"
              defaultValue=""
              rules={{ required: "Topic is required" }}
              render={({ field }) => (
                <select {...field} className="w-full border rounded px-2 py-1">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {topicsArray.map(({ id, name }: any) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.topicID && (
              <p className="text-red-500 text-sm">{errors.topicID.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded px-2 py-1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Exam Date</label>
            <input
              type="datetime-local"
              {...register("examDate", { required: "Exam Date is required" })}
              className="w-full border rounded px-2 py-1"
            />
            {errors.examDate && (
              <p className="text-red-500 text-sm">{errors.examDate.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              {...register("image", {
                required: initialData ? false : "Image is required",
              })}
              className="w-full border rounded px-2 py-1"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#0059ff] text-white rounded"
              disabled={
                addExamMutation.isPending || updateExamMutation.isPending
              }
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;
