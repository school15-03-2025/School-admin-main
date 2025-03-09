import { useState } from "react";
import { TableSkeleton } from "@/components/Table";
import { useGetStudents } from "@/hooks/Students";
import Cards from "./components/Cards";
import { NextPage } from "next";
import { AxiosError } from "axios";

// Define types for filters and student data
interface Filters {
  page: number;
  pageSize: number;
  country: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
}

interface Student {
  studentId: string;
  course: string;
  totalDeposit: number;
  totalPrice: number;
  buyCourse: number;
  buyVideo: number;
  suspendedModulesCount: number;
  status: string;
}

interface StudentResponse {
  users: Student[];
  pagination: {
    totalResult: number;
    totalPages: number;
  };
}

const Students: NextPage = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    pageSize: 2,
    country: null,
    status: null,
    startDate: null,
    endDate: null,
  });

  const { data, isLoading, isError, error } = useGetStudents(filters);

  // Function to render "N/A" if value is missing
  const renderValue = (value: any) => {
    return value !== null && value !== undefined && value !== ""
      ? value
      : "N/A";
  };

  // Function to update filters
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value === "all" ? null : value };
      return updatedFilters;
    });
  };

  // Function to get status class based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "suspend":
        return "bg-yellow-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <Cards />
      <div className="flex flex-wrap justify-start md:justify-end gap-3 mt-3">
        {/* Country Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            name="country"
            id="country"
            className="border w-full sm:min-w-36 border-gray-300 text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("country", e.target.value)}
          >
            <option value="all">Country</option>
            <option value="japan">Japan</option>
            <option value="london">London</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="w-full sm:w-auto">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <input
              type="date"
              name="startDate"
              className="p-2 bg-white border border-gray-300 rounded-lg w-full sm:w-auto"
              onChange={(e) => updateFilter("startDate", e.target.value)}
            />
            <span className="text-gray-600 text-sm">To</span>
            <input
              type="date"
              name="endDate"
              className="p-2 bg-white border border-gray-300 rounded-lg w-full sm:w-auto"
              onChange={(e) => updateFilter("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            name="status"
            id="status"
            className="border w-full sm:min-w-36 border-gray-300 text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="all">Status</option>
            <option value="active">Active</option>
            <option value="suspend">Suspend</option>
            <option value="blocked">Block</option>
          </select>
        </div>
      </div>

      <hr className="my-5" />
      <div className="w-full overflow-x-auto">
        <div className="flex overflow-x-scroll">
          <table
            className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l `}
          >
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Student ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Total Buy Course
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Total Course Price
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Pay Amount
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Missing Classes
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Exams
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Suspend
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Status
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="text-center py-10">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-red-500">
                    Error:
                    {(error as AxiosError<{ message?: string }>)?.response?.data
                      ?.message ||
                      error?.message ||
                      "Something went wrong."}
                  </td>
                </tr>
              ) : data?.users?.length > 0 ? (
                data.users.map((student: Student, index: number) => (
                  <tr
                    key={student.studentId}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.studentId)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.course)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.totalDeposit)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.totalPrice)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.buyCourse)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {renderValue(student.buyVideo)}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white text-xs items-center justify-center rounded-lg bg-[#322488]">
                        {renderValue(student.suspendedModulesCount)}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      <span
                        className={`h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg w-32 ${getStatusClass(
                          student.status
                        )}`}
                      >
                        {renderValue(student.status)}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        type="button"
                        className="h-8 min-w-8 px-3 inline-flex text-white text-xs items-center justify-center rounded-lg bg-[#1D4ED8] w-16"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && !isError && data && (
          <div className="mt-[2rem]">
            <div className="text-center p-3">
              <h1>
                Showing {(filters.page - 1) * filters.pageSize + 1} to{" "}
                {Math.min(
                  filters.page * filters.pageSize,
                  data.pagination.totalResult
                )}{" "}
                of {data.pagination.totalResult} Results
              </h1>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#0059ff] p-3 rounded-xl text-white"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={filters.page >= data.pagination.totalPages}
              >
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Students;
