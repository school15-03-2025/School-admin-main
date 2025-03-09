import Modal from "@/components/modal";
import { useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/components/toggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddNoticeModal from "./components/NoticForm";
import { useDeleteNotice, useGetNotices } from "@/hooks/Notics";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Paginations from "../course/components/Paginations";
import Loader from "@/components/Loader";
import { TableSkeleton } from "@/components/Table";

const CreateNotice = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleEdit = (notice: any) => {
    setSelectedNotice(notice);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedNotice(null);
    setModalOpen(true);
  };

  const closeModel = () => {
    setModalOpen(false);
  };

  const { mutate: deleteNotice } = useDeleteNotice();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      deleteNotice(id);
    }
  };

  const viewOrderData = (data: any) => {
    setModalOpen(true);
  };

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 1,
    startDate: null,
    endDate: null,
  });

  const updateFilter = (key: string, value: any) => {
    if (key === "status" && value === "all") {
      value = null;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isLoading, isError } = useGetNotices(filters);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap gap-3 sm:gap-5 justify-between items-end">
          {/* Date Filters */}
          <div className="w-full sm:w-auto">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 rounded-lg">
              <div className="flex border rounded-lg w-full sm:w-auto">
                <input
                  type="date"
                  name="startDate"
                  className="p-2 bg-white rounded-lg w-full sm:w-auto"
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                />
              </div>
              <span className="text-gray-700 text-sm">To</span>
              <div className="flex rounded-lg w-full sm:w-auto">
                <input
                  type="date"
                  name="endDate"
                  className="p-2 bg-white rounded-lg w-full sm:w-auto"
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Create Notice Button */}
          <div className="w-full sm:w-auto flex justify-end">
            <button
              type="submit"
              onClick={viewOrderData}
              className="inline-flex items-center py-3 px-4 text-sm font-medium text-white bg-[#0059ff] border-none rounded-lg w-full sm:w-auto"
            >
              Create Notice
            </button>
          </div>
        </div>

        <hr className="my-5" />

        <div className="w-full overflow-x-auto">
          <table className="w-full max-w-full bg-white text-sm border-[#1D4ED8] rounded-xl border-l">
            <thead>
              <tr>
                {[
                  "No.",
                  "Notice Title",
                  "Updated Date",
                  "Status",
                  "Document",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-5 bg-[#1D4ED8] text-center border-r border-[#1D4ED8] text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-red-500">
                    <p className="text-lg font-semibold">
                      Error fetching notices. Please try again later.
                    </p>
                  </td>
                </tr>
              ) : !data?.notice || data.notice.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <p className="text-xl">No Notices Found</p>
                  </td>
                </tr>
              ) : (
                data.notice.map((data: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 border-r border-[#1D4ED8] text-center">
                      {data.title}
                    </td>
                    <td className="py-4 border-r border-[#1D4ED8] text-center">
                      {format(data.createdAt, "MM dd, yy")}
                    </td>
                    <td className="py-4 border-r border-[#1D4ED8] min-w-28 text-center">
                      <span
                        className={`relative h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg ${
                          data.status + "-bg"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="py-4 border-r border-[#1D4ED8] min-w-28 text-center">
                      <div className="flex justify-center">
                        <Image
                          src={"/pdfIcon.png"}
                          height={50}
                          width={50}
                          className="mx-1"
                          alt="PDF file"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex justify-center gap-2 bg-[--off-white-color] px-2 py-1 rounded-xl">
                        <ToggleSwitch />
                        <button
                          type="button"
                          className="text-xs"
                          onClick={() => handleEdit(data)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#FF3D00]"
                          onClick={() => handleDelete(data._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data && data.notice.length > 0 && (
          <Paginations
            filters={filters}
            setFilters={setFilters}
            pagination={data?.pagination}
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModel} title="Add Notice">
        <AddNoticeModal noticeData={selectedNotice} onClose={closeModel} />
      </Modal>
    </>
  );
};

export default CreateNotice;
