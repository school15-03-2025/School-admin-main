// hooks/useDashboard.ts
import API from "@/lib/api";
import { IResponse } from "@/types/generic.types";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  students: {
    total: number;
    growth: string;
  };
  teachers: {
    total: number;
    growth: string;
  };
  courses: {
    total: number;
    growth: string;
  };
  videos: {
    total: number;
    growth: string;
  };
  revenue: {
    total: number;
    growth: string;
  };
}

interface DashboardAnalytics {
  monthlyEnrollments: number[];
  monthlyUsers: number[];
  locationStats: Record<string, number>;
  deviceStats: Record<string, number>;
}

interface DashboardResponse {
  stats: DashboardStats;
  analytics: DashboardAnalytics;
  recent: RecentActivitiesResponse;
}

interface RecentActivity {
  courseName: string;
  category: string;
  description: string;
  createdAt: Date;
  totalPurchase: number;
}

interface RecentUser {
  fullname: string;
  email: string;
  createdAt: Date;
}

interface RecentTeacher {
  fullname: string;
  email: string;
  createdAt: Date;
}

interface RecentActivitiesResponse {
  recentCourses: RecentActivity[];
  recentUsers: RecentUser[];
  recentTeachers: RecentTeacher[];
  recentPayments: Payment[];
}

interface Payment {
  transactionID: string;
  amount: number;
  status: string;
  createdAt: Date;
}

export const useDashboardData = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await API.get<IResponse<DashboardResponse>>(
        "/admin/dashboard"
      );
      return response.data.data;
    },
    refetchInterval: 300000,
  });
};
