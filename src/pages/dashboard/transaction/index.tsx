import Modal from "@/components/modal";
import { useGetPayments } from "@/hooks/Payments";
import { NextPage } from "next";
import { useState } from "react";
import Filters from "../course/components/Filters";

const Transaction: NextPage = () => {
  const dataList = [
    {
      orderId: "045101",
      name: "Web dev",
      transactionId: "46669496496",
      amount: "200 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
    {
      orderId: "045801",
      name: "Webb dev",
      transactionId: "46669496496",
      amount: "140 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
    {
      orderId: "045601",
      name: "Web dev",
      transactionId: "46669496496",
      amount: "180 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
    {
      orderId: "045201",
      name: "Web dev",
      transactionId: "46669496496",
      amount: "100 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
    {
      orderId: "045031",
      name: "Web dev",
      transactionId: "46669496496",
      amount: "100 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
    {
      orderId: "045021",
      name: "Web dev",
      transactionId: "46669496496",
      amount: "100 USD",
      payDate: "UTC.03-02-25. 02:05  PM",
    },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const viewOrderData = (data: any) => {
    setModalOpen(true);
  };

  const closeModel = () => {
    setModalOpen(false);
  };

  const modelData = [
    {
      type: "videos",
      id: "045101",
      amount: "200 USD",
    },
    {
      type: "course",
      id: "035101",
      amount: "150 USD",
    },
    {
      type: "videos",
      id: "045101",
      amount: "280 USD",
    },
    {
      type: "course",
      id: "047101",
      amount: "133 USD",
    },
    {
      type: "course",
      id: "045901",
      amount: "399 USD",
    },
  ];

  const [filters, setFilters] = useState({
    pageSize: 10,
    searchQuery: "",
    startDate: "",
    endDate: "",
  });

  const { data, isLoading, isError, error } = useGetPayments(filters);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return <div>Error loading blogs. Please try again later.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No blogs available.</div>;
  }
  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <label htmlFor="status" className="w-full block">
            Show
          </label>
          <select
            name="status"
            id="status"
            className="border min-w-18 border-white text-gray-900 text-sm p-3 rounded-lg"
          >
            <option value={"10"}>10</option>
            <option value={"20"}>20</option>
            <option value={"50"}>50</option>
            <option value={"100"}>100</option>
          </select>
        </div>
        <div className="flex gap-3 mt-3 justify-end items-end">
          <div>
            <label htmlFor="status" className="w-full block">
              Search
            </label>
            <div className="flex items-center max-w-sm">
              <div className="relative w-full">
                <input
                  type="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-700 text-sm rounded-lg block w-full p-3 rounded-r-none"
                  placeholder="Search"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-3 px-3 text-sm font-medium text-white bg-gray-700 rounded-lg rounded-l-none border border-gray-700 "
              >
                <svg
                  className="w-4 h-5 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="w-full block">
              Date
            </label>
            <div className="flex">
              <div className="flex border border-black rounded-lg rounded-r-none">
                <input
                  type="date"
                  name="startDate"
                  className="border-none p-1 bg-transparent"
                />
                <span className="py-2 px-2">To</span>
                <input
                  type="date"
                  name="endDate"
                  className="border-none p-1 bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-gray-700 rounded-lg rounded-l-none border border-gray-700 "
              >
                <svg
                  className="w-4 h-4 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="w-full">
        <div className="flex">
          <table
            className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden`}
          >
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Oders ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Project Name
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Transaction ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Amount
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Payment Day
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white text-xs"
                >
                  <td className="py-4 px-2 border border-y-0 border-[#1D4ED8] text-center">
                    {" "}
                    <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                      {index + 1}
                    </span>
                  </td>
                  <td
                    className="py-4 px-3 border-r border-[#1D4ED8]"
                    onClick={() => viewOrderData({})}
                  >
                    {data.orderId}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.name}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.transactionId}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.amount}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.payDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModel} title="Order Details">
        <table
          className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl  overflow-hidden`}
        >
          <thead>
            <tr>
              <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                No.
              </th>
              <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                Type
              </th>
              <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                ID
              </th>
              <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {modelData.map((data, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white text-xs">
                <td className="py-4 px-2 border border-y-0 border-[#1D4ED8] text-center">
                  {" "}
                  <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                    {index + 1}
                  </span>
                </td>
                <td className="py-4 px-3 border-r border-[#1D4ED8]">
                  {data.type}
                </td>
                <td className="py-4 px-3 border-r border-[#1D4ED8]">
                  {data.id}
                </td>
                <td className="py-4 px-3 border-r border-[#1D4ED8]">
                  {data.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default Transaction;
