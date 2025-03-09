import { useState } from "react";
import { useGetTeacher } from "@/hooks/Teacher";
import { NextPage } from "next";
import Cards from "./components/Cards";
import { TableSkeleton } from "@/components/Table";

const Teacher: NextPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    country: null,
    status: null,
    startDate: null,
    endDate: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (value === "all") {
      value = null;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isLoading, isError, error } = useGetTeacher(filters);

  return (
    <>
      <Cards />
      <div className="flex flex-wrap justify-start md:justify-end gap-3 mt-3">
        <div>
          <select
            name="country"
            id="country"
            className="border min-w-36 border-white text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("country", e.target.value)}
          >
            <option value={"all"}>Country</option>
            <option value={"all"}>ALL</option>
            <option value={"japan"}>Japan</option>
            <option value={"london"}>London</option>
          </select>
        </div>

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
                className="p-1 bg-white rounded-lg"
                onChange={(e) => updateFilter("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <select
            name="status"
            id="status"
            className="border min-w-36 border-white text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value={"all"}>Status</option>
            <option value={"active"}>Active</option>
            <option value={"suspend"}>Suspend</option>
            <option value={"blocked"}>Block</option>
            <option value={"pending"}>Pending</option>
          </select>
        </div>
      </div>

      <hr className="my-5" />

      <div className="w-full overflow-x-auto">
        <div className="flex overflow-x-scroll">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden overflow-x-scroll">
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Teacher ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Topic
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Language
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Total Course
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Total Amount Arrived
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Total Withdraw Amount
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Current Balance
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
                  <td colSpan={10} className="py-5 text-center">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={10} className="py-5 text-center text-red-500">
                    Error loading data. Please try again.
                  </td>
                </tr>
              ) : !data || data.users.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-5 text-center">
                    No data available.
                  </td>
                </tr>
              ) : (
                data.users.map((data: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.teacherID || `N/A`}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.topicOfTeaching}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.language}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.course}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.totalWithdraw}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.totalWithdraw}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.totalWithdraw}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      <span
                        className={`h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg w-32 ${
                          data.status + "-bg"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button className="h-8 min-w-8 px-3 inline-flex text-white text-xs items-center justify-center rounded-lg bg-[#1D4ED8] w-16">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data && data.pagination && (
          <div className="mt-5 text-center">
            <h1>
              Showing {(filters.page - 1) * filters.pageSize + 1} to{" "}
              {filters.page * filters.pageSize} of {data.pagination.totalResult}{" "}
              Results
            </h1>
            <button
              className="bg-[#0059ff] p-3 rounded-xl text-white mt-3"
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={filters.page >= data.pagination.totalPages}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Teacher;
