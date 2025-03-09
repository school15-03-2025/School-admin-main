import React from "react";
import dynamic from "next/dynamic";
import {
  faNoteSticky,
  faDollar,
  faKissWinkHeart,
} from "@fortawesome/free-solid-svg-icons";
import Cards from "./components/Cards";
import CardList from "@/components/cardList";
import { useDashboardData } from "@/hooks/queries/dashboard.hooks";
//import { DashboardSkeleton } from "../../../utils/DashboardSkeleton";
import { DashboardSkeleton } from "@/utils/DashboardSkeleton";
import Alert from "@/components/Alert";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: React.FC = () => {
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError,
    error,
  } = useDashboardData();

  if (isDashboardLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <Alert type="danger">{error.message}</Alert>;
  }

  // Function to generate chart options
  const getChartOptions = (type: "line" | "bar" | "donut"): ApexOptions => {
    if (!dashboardData) return {};

    switch (type) {
      case "line":
        return {
          series: [
            {
              name: "Course Enrollments",
              data: dashboardData.analytics.monthlyEnrollments,
            },
            {
              name: "New Users",
              data: dashboardData.analytics.monthlyUsers,
            },
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: { enabled: false },
          },
          stroke: {
            width: [2, 2],
            curve: "smooth",
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        };

      case "bar":
        return {
          series: [
            {
              data: Object.values(dashboardData.analytics.deviceStats),
            },
          ],
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: Object.keys(dashboardData.analytics.deviceStats),
          },
        };

      case "donut":
        return {
          series: Object.values(dashboardData.analytics.locationStats),
          chart: {
            type: "donut",
          },
          labels: Object.keys(dashboardData.analytics.locationStats),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 200 },
                legend: { position: "bottom" },
              },
            },
          ],
        };

      default:
        return {};
    }
  };

  const recentCourses =
    (dashboardData?.recent?.recentCourses ?? []).map((course) => ({
      name: course.courseName,
      value: course.category,
      msg: course.description
        ? course.description.substring(0, 50) + "..."
        : "No description",
      time: new Date(course.createdAt).toLocaleDateString(),
    })) || [];

  const recentPayments =
    (dashboardData?.recent?.recentPayments ?? []).map((payment) => ({
      name: payment.transactionID,
      value: payment.amount,
      msg: `Status: ${payment.status}`,
      time: new Date(payment.createdAt).toLocaleDateString(),
    })) || [];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 p-4">
      {/* Main Content Area */}
      <div className="w-full lg:w-3/4 space-y-8">
        <h2 className="text-4xl font-bold">Dashboard Overview</h2>

        {/* Total Users Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <Cards
            title="Users"
            total={dashboardData?.stats?.students?.total || 0}
            grow={dashboardData?.stats?.students?.growth || "0.0"}
          />

          <Cards
            title="Teachers"
            total={dashboardData?.stats?.teachers?.total || 0}
            grow={dashboardData?.stats?.teachers?.growth || "0.0"}
          />

          <Cards
            title="Total Institute Courses"
            total={dashboardData?.stats.courses.total || 0}
            grow={dashboardData?.stats?.courses?.growth || "0.0"}
          />

          <Cards
            title="Videos"
            total={dashboardData?.stats.videos.total || 0}
            grow={dashboardData?.stats?.videos?.growth || "0.0"}
          />
        </div>

        {/* Charts Section */}
        <div className="card rounded-xl bg-white p-6 shadow-lg">
          <ApexChart
            options={getChartOptions("line")}
            series={getChartOptions("line").series}
            type="line"
            height={350}
            width="100%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card rounded-xl bg-white p-6 shadow-lg">
            <ApexChart
              options={getChartOptions("bar")}
              series={getChartOptions("bar").series}
              type="bar"
              height={350}
              width="100%"
            />
          </div>
          <div className="card rounded-xl bg-white p-6 shadow-lg">
            <ApexChart
              options={getChartOptions("donut")}
              series={getChartOptions("donut").series}
              type="donut"
              height={350}
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4 space-y-8">
        {/* Add margin-top to align with Total Users cards */}
        <div className="mt-[4.5rem]">
          {" "}
          {/* Adjust this value as needed */}
          <CardList
            title="Recent Courses"
            counts={recentCourses.length}
            data={recentCourses}
            type="courses"
            icon={faNoteSticky}
            href="/dashboard/course"
          />
        </div>

        <CardList
          title="Recent Payments"
          counts={recentPayments.length}
          data={recentPayments}
          type="payments"
          icon={faDollar}
          href="/dashboard/payments"
        />
        <CardList
          title="Withdraw"
          counts={0}
          data={[]}
          type="withdraw"
          icon={faKissWinkHeart}
          href="/dashboard/withdraw"
        />
      </div>
    </div>
  );
};

export default Dashboard;
