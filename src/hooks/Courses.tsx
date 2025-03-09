import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_BACKEN_URL;

export interface Course {
  _id: string;
  teacherID: string;
  adminID?: string;
  image: string;
  title: string;
  category: string;
  type:
    | "nonInstitutionCourse"
    | "institutionCourse"
    | "nonInstitutionVideoCourse"
    | "institutionVideoCourse";
  courseName: string;
  language: string;
  skillLevel: string;
  price: number;
  discount: number;
  totalSeats: number;
  totalCourseDuration: string;
  hasCerticifate?: boolean;
  description: string;
  lessonsPerClass: number;
  applicationLastDate?: string;
  startDate?: string;
  endDate?: string;
  moneyArrived: number;
  remainingMoney: number;
  transferredMoney: number;
  totalPurchase: number;
  classesPerWeek: { day: string; time: string }[];
  status: "ongoing" | "upcoming" | "live" | "ended" | "blocked";
  modules: {
    title: string;
    video: string;
    description: string;
    price: number;
    status: "active" | "blocked" | "suspended";
    createdAt?: string;
  }[];
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const useGetCourses = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: async () => {
      try {
        const formData = new FormData();

        // Convert filters object to FormData
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        // Make API call with FormData
        const response = await axios.post(
          `${baseUrl}/admin/retrieve/courses`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        return response.data.data || []; 
      } catch (error: any) {
        return Promise.reject(
          error.response?.data || { message: "An unexpected error occurred" }
        );
      }
    },
  });
};

// Fetch all video courses
export const useGetVideoCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["videoCourses"],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Course[]>>(
        "/api/courses/video"
      );
      return data.data;
    },
  });
};

// Fetch Course Stats
export const useGetCourseStats = () => {
  return useQuery({
    queryKey: ["courseStats"],
    queryFn: async () => {
      const formData = new FormData();
      formData.append("type", "none");

      const { data } = await axios.post<ApiResponse<any>>(
        `${baseUrl}/admin/retrieve/courses/stats`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    },
  });
};

// Add a Course
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCourse: FormData) => {
      const { data } = await axios.post<ApiResponse<Course>>(
        `${baseUrl}/admin/add/course`,
        newCourse
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course has been successfully added.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add course.");
    },
  });
};

// Update a Course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updatedCourse,
    }: {
      id: string;
      updatedCourse: FormData;
    }) => {
      const { data } = await axios.put<ApiResponse<Course>>(
        `/api/courses/${id}`,
        updatedCourse
      );
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};

// Delete a Course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/courses/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};
