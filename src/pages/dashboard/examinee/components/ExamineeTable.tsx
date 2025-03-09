import { TableSkeleton } from "@/components/Table";
import { useDeleteExaminee, useGetExaminees } from "@/hooks/Examinee";
import React from "react";
import Paginations from "../../course/components/Paginations";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from "date-fns";
function ExamineeTable({ filters, setFilters }: any) {
  const {
    data: examineeList,
    isLoading,
    isError,
    error,
  } = useGetExaminees(filters);
  const { mutate } = useDeleteExaminee();
  const handleDeleteExaminee = (id: string) => {
    mutate(id);
  };

  return (
    <>
      <table
        className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-x-auto`}
      >
        <thead>
          <tr>
            <th className="p-5 bg-[#1D4ED8] text-left text-white">No.</th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Student Name
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Roll No
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Registeration No
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Session
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
              Exam date
            </th>
            <th className="p-5 bg-[#1D4ED8] text-left text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8} className="text-center text-blue-600 py-4">
                <TableSkeleton />
              </td>
            </tr>
          )}

          {isError && (
            <tr>
              <td colSpan={8} className="text-center text-red-600 py-4">
                Error loading examinees:{" "}
                {error?.message || "Something went wrong"}
              </td>
            </tr>
          )}

          {!isLoading &&
            !isError &&
            (examineeList?.result?.length ?? 0) > 0 && (
              <>
                {examineeList?.result.map((data: any, index: number) => (
                  <tr
                    key={data._id}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data?.userDetails?.fullname || "N/A"}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data?.userDetails?.rollNo ||
                        Math.floor(Math.random() * 10000) + 1}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data?.userDetails?.registerationNO || "N/A"}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data?.userDetails?.session || 2016}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {format(data.createdAt, "dd MMM,yy") || "N/A"}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        type="button"
                        className="h-8 min-w-8 px-3 inline-flex text-red-700 text-xs items-center justify-center rounded-lg "
                        onClick={() => {
                          handleDeleteExaminee(data._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}

          {!isLoading && !isError && examineeList?.result?.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 py-4">
                No examinees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!isLoading &&
        !isError &&
        (examineeList?.pagination?.totalPages ?? 0) > 0 && (
          <Paginations
            pagination={examineeList?.pagination}
            filters={filters}
            setFilters={setFilters}
          />
        )}
    </>
  );
}

export default ExamineeTable;
