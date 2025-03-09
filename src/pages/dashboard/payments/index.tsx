import { useState } from "react";
import { useGetPayments } from "@/hooks/Payments";
import { NextPage } from "next";
import Cards from "./components/Cards";
import { TableSkeleton } from "@/components/Table";

const Deposit: NextPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    status: null,
    payAccount: null,
    // startDate: null,
    // endDate: null,
    date: null,
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

  const { data, isLoading, isError, error } = useGetPayments(filters);

  return (
    <>
      <Cards />
      <div className="flex flex-wrap justify-start md:justify-end gap-3 my-8">
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
                // className="p-1 bg-white rounded-lg"
                onChange={(e) => updateFilter("date", e.target.value)}
                className="p-1 bg-white rounded-lg"
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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="spam">Spam</option>
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

      <div className="w-full overflow-auto">
        <div className="flex overflow-x-scroll">
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <div className="w-full text-center py-5 text-red-500">
              Error loading data. Please try again.
            </div>
          ) : !data || data.payments.length === 0 ? (
            <div className="w-full text-center py-10 text-gray-500">
              No data found.
            </div>
          ) : (
            <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l ">
              <thead>
                <tr>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    No.
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Payment ID
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Payment Method
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Pay Account
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Account Number
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Amount
                  </th>
                  <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                    Payment Day
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
                {data.payments?.map((item: any, index: number) => (
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
                      {item.transactionID}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {item.payAccount}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {item.payAccount}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {item.accountNumber}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {item.amount}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {item.payDate}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      <span
                        className={`h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg w-32 ${item.status}-bg`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button className="h-8 min-w-8 px-3 inline-flex text-white text-xs items-center justify-center rounded-lg bg-[#1D4ED8] w-16">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {data && data.payments.length > 0 && (
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

export default Deposit;
