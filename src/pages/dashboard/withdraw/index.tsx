import { useState } from "react";
import { useGetWithdraw } from "@/hooks/Payments";
import { NextPage } from "next";
import Cards from "./components/Cards";
import { format } from "date-fns";
import { TableSkeleton } from "@/components/Table";
const Withdraw: NextPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    status: null,
    payAccount: null,
    date: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (value == "all") {
      value = null;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isLoading, isError, error } = useGetWithdraw(filters);
  return (
    <>
      <Cards />
      <div className="flex flex-wrap justify-start md:justify-end gap-3 mt-3">
        <div>
          <label htmlFor="dates" className="w-full block"></label>
          <div className="flex">
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="startDate"
                className="p-1 bg-white rounded-lg"
                onChange={(e) => updateFilter("date", e.target.value)}
              />
            </div>
            <span className="py-2 px-2">To</span>
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="endDate"
                className="p-1 bg-white rounded-lg"
                onChange={(e) => updateFilter("date", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <select
            name="status"
            className="border min-w-36 border-white text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="all">Status</option>
            <option value="all">All</option>
            <option value="sending">Sending</option>
            <option value="pending">Pending</option>
            <option value="ineligible">Ineligible</option>
          </select>
        </div>
        <div>
          <select
            name="paymethods"
            className="border min-w-36 border-white text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("payAccount", e.target.value)}
          >
            <option value="all">Payment Methods</option>
            <option value="all">All</option>
            <option value="sbi bank">SBI Bank</option>
            <option value="PayPal">PayPal</option>
            <option value="apple pay">Apple Pay</option>
          </select>
        </div>
      </div>
      <hr className="my-5" />

      <div className="w-full overflow-x-auto">
        <div className="flex overflow-x-scroll">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden">
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Withdraw ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Withdrawal Account
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Account Number
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Amount
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Withdrawal Day
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
              {/* Loading State */}
              {isLoading && (
                <tr>
                  <td colSpan={8} className="py-4 px-3 text-center">
                    <TableSkeleton />
                  </td>
                </tr>
              )}

              {/* Error State */}
              {isError && (
                <tr>
                  <td colSpan={8} className="py-4 px-3 text-center">
                    <span className="text-red-500 font-semibold">
                      Error: {error.message}
                    </span>
                  </td>
                </tr>
              )}

              {/* No Data State */}
              {!isLoading && !isError && (!data || data.length === 0) && (
                <tr>
                  <td colSpan={8} className="py-4 px-3 text-center">
                    <span className="text-gray-500">No withdrawals found.</span>
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!isLoading &&
                !isError &&
                data?.payments?.map((data: any, index: number) => (
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
                      {data.bankCode}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.amountDebit}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.accountNumber}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {data.amount}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {format(data.createdAt, "MM dd, yy")}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      <span
                        className={`h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg w-32 ${data.status}-bg`}
                      >
                        {data.status}
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
        </div>

        {/* Pagination */}
        {data?.payments?.length > 0 && (
          <div className="mt-[2rem]">
            <div className="text-center p-3">
              <h1>
                Showing {(filters.page - 1) * filters.pageSize + 1} to{" "}
                {filters.page * filters.pageSize} of{" "}
                {data.pagination.totalResult} Results
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

export default Withdraw;
