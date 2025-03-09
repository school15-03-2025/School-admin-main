import React, { useState } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dataList from "@/utils/DataList";
function ContactUs() {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
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
  return (
    <div className="card pb-5">
      <div className="w-full">
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
        <hr className="my-5" />
        <div className="w-full overflow-x-scroll">
          <table
            className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden`}
          >
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white min-w-32">
                  Name
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Email
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white min-w-32">
                  Phone No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Message
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white min-w-32">
                  Date
                </th>
                <th className="p-5 px-4 bg-[#1D4ED8] text-left text-white min-w-24">
                  <div className="flex justify-between">
                    <input type="checkbox" name="checkAll" />
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white text-xs"
                >
                  <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                    {" "}
                    <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-32">
                    {data.name}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.email}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-32">
                    {data.phone}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.message}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8] min-w-32">
                    {data.date}
                  </td>
                  <td className="py-4 px-2 text-center min-w-24">
                    <div className="flex justify-between gap-2 bg-[--off-white-color] px-2 py-1 rounded-xl">
                      <input type="checkbox" name="selectList" />
                      <button type="button" className="text-xs text-[#FF3D00]">
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {data && data.broadcasts.length > 0 && ( */}
        <div className="mt-[2rem]">
          <div className="text-center p-3">
            <h1>
              {/* Showing {(filters.page - 1) * filters.pageSize + 1} to{" "}
                {filters.page * filters.pageSize < data.pagination.totalResult
                  ? filters.page * filters.pageSize
                  : data.pagination.totalResult}{" "}
                of {data.pagination.totalResult} Results */}
              Showing 1 to 5 out of 97 results
            </h1>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#0059ff] p-3 rounded-xl text-white"
              // onClick={() =>
              //   setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              // }
              // disabled={filters.page >= data.pagination.totalPages}
            >
              Load More
            </button>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default ContactUs;
