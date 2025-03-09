import { TableSkeleton } from "@/components/Table";
import { useGetNewsletters } from "@/hooks/NewsLetter";
import React, { useState } from "react";

function NewsLetter() {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    startDate: null,
    endDate: null,
    search: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (value === "all") {
      value = null;
    }
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data, isPending, isError } = useGetNewsletters(filters);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-3 justify-between items-end my-6">
        <div>
          <label htmlFor="dates" className="w-full block"></label>
          <div className="flex">
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="startDate"
                className="p-1 bg-white rounded-lg"
                onChange={(e) => updateFilter("startDate", e.target.value)}
              />
            </div>
            <span className="py-2 px-2">To</span>
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="endDate"
                onChange={(e) => updateFilter("endDate", e.target.value)}
                className="p-1 bg-white rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isPending && <TableSkeleton />}

      {/* Error State */}
      {isError && (
        <div className="w-full text-center py-5">
          <p>Error fetching newsletters</p>
        </div>
      )}

      {/* No Data State */}
      {data?.emailList &&
        data.emailList.length === 0 &&
        !isPending &&
        !isError && (
          <div className="w-full text-center py-5">
            <p>No Data Available</p>
          </div>
        )}

      {/* Data Table */}
      {data?.emailList &&
        data.emailList.length > 0 &&
        !isPending &&
        !isError && (
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl">
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Email
                </th>
                <th className="p-5 bg-[#1D4ED8] text-center text-white">
                  <input type="checkbox" name="allRowSelect" />
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.emailList?.map((email: any, index: number) => (
                <tr key={index} className="odd:bg-gray-100 even:bg-white">
                  <td className="py-4 px-2 border-r border-[#1D4ED8] text-left">
                    {" "}
                    {/* Change text-center to text-left */}
                    <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                      {(filters.page - 1) * filters.pageSize + index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-3">{email.email}</td>
                  <td className="py-4 px-3 text-center">
                    <input
                      type="checkbox"
                      name="email"
                      checked={email.checked}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      {/* Pagination */}
      {data && data?.emailList?.length > 0 && (
        <div className="mt-[2rem] w-full flex justify-center flex-col items-center">
          <div className="text-center p-3">
            <h1>
              Showing {(filters.page - 1) * filters.pageSize + 1} to{" "}
              {filters.page * filters.pageSize < data.pagination.totalResult
                ? filters.page * filters.pageSize
                : data.pagination.totalResult}{" "}
              of {data.pagination.totalResult} Results
            </h1>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#0059ff] p-3 rounded-xl text-white"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              disabled={filters.page >= data.pagination.totalPages}
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsLetter;
