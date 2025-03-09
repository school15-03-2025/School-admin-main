import React from "react";
import { useGetCourses } from "@/hooks/Courses";
import Paginations from "./Paginations";
import { format } from "date-fns";
import { TableSkeleton } from "@/components/Table";
function Table({ filters, setFilters }: any) {
  const { data, isLoading, isError, error } = useGetCourses(filters);

  const viewOrderData = (data: any) => {
    console.log("Viewing course:", data);
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-blue-500";
      case "upcoming":
        return "bg-yellow-500";
      case "blocked":
        return "bg-red-500";
      case "live":
        return "bg-green-500";
      case "ended":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <>
      <div className="w-full overflow-x-scroll">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <p className="text-center text-red-500 text-lg font-semibold py-4">
            Error fetching courses: {error?.message || "Something went wrong!"}
          </p>
        ) : data && data.courses && data.courses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold py-4">
            No courses found.
          </p>
        ) : (
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden">
            <thead>
              <tr>
                {[
                  "No.",
                  "Course ID",
                  "Topic",
                  "Skill Level",
                  "Language",
                  "Students",
                  "Money Arrived",
                  "End Date",
                  "Status",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.courses?.map((course: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white text-xs"
                >
                  <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                    <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                      {index + 1}
                    </span>
                  </td>
                  <td
                    className="py-4 px-3 border-r border-[#1D4ED8]"
                    onClick={() => viewOrderData(course)}
                  >
                    {course._id.substring(0, 20)}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {course.courseName}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {course.skillLevel}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {course.language}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {course.students || "N/A"}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {course.moneyArrived}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {format(course.endDate, "MM dd, yy")}
                  </td>
                  <td className="py-3 px-4 border-r relative border-[#1D4ED8] min-w-44">
                    <span
                      className={`relative h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Ensure pagination data exists before rendering the pagination component */}
      {!isLoading &&
        data &&
        data.pagination &&
        data.pagination.totalPages > 0 && (
          <>
            <Paginations
              pagination={data.pagination}
              filters={filters}
              setFilters={setFilters}
            />
          </>
        )}
    </>
  );
}

export default Table;
