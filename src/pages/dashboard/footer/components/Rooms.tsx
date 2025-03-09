import React, { useState } from "react";
import ToggleSwitch from "@/components/toggleSwitch";
import Modal from "@/components/modal";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import RoomForm from "./RoomForm";
import { useGetBroadcasts, useDeleteBroadcast } from "@/hooks/Room";
import Loader from "@/components/Loader";

function Rooms({ activeTab, setActiveTab }: any) {
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

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

  const { data, isLoading, error } = useGetBroadcasts(filters);
  const { mutate: deleteBroadcast } = useDeleteBroadcast();
  const openRoomModal = () => {
    setEditRoom(null);
    setRoomModalOpen(true);
  };
  const handleEdit = (room: any) => {
    setEditRoom(room);
    setRoomModalOpen(true);
  };

  const handleDelete = (roomId: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      const formData = new FormData();
      formData.append("broadcastID", roomId);
      deleteBroadcast(formData);
    }
  };

  const closeModel = () => {
    setRoomModalOpen(false);
    setEditRoom(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-between items-end">
        <div className="w-full sm:w-auto">
          <label htmlFor="dates" className="w-full block"></label>
          <div className="flex flex-wrap sm:flex-nowrap">
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="startDate"
                className="p-1 bg-white rounded-lg w-full sm:w-auto"
                onChange={(e) => updateFilter("startDate", e.target.value)}
              />
            </div>
            <span className="py-2 px-2">To</span>
            <div className="flex border rounded-xl">
              <input
                type="date"
                name="endDate"
                onChange={(e) => updateFilter("endDate", e.target.value)}
                className="p-1 bg-white rounded-lg w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openRoomModal}
          className="w-full sm:w-auto inline-flex items-center py-3 px-3 text-sm font-medium text-white bg-[#0059ff] rounded-lg border"
        >
          Create Room
        </button>
      </div>

      {/* Room Form Modal */}
      <Modal isOpen={isRoomModalOpen} onClose={closeModel} title="Room">
        <RoomForm
          mode={editRoom ? "edit" : "add"}
          roomData={editRoom}
          onClose={closeModel}
        />
      </Modal>

      <hr className="my-5" />

      {/* Rooms Grid or Loading/Error */}
      <div
        className={`flex-1 p-4 grid gap-4 border-l ${
          activeTab !== null ? "border-l-0" : ""
        } grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {isLoading && <Loader />}

        {error && (
          <div className="col-span-full text-center text-red-500">
            Error fetching broadcasts. Please try again later.
          </div>
        )}

        {/* Show broadcasts only if data is available */}
        {data && data.broadcasts && data.broadcasts.length > 0
          ? data.broadcasts.map((broadCast: any) => (
              <div
                key={broadCast._id}
                className="relative h-48 border rounded-xl overflow-hidden text-center"
              >
                <Image
                  src={
                    broadCast.image ? broadCast.image : "/gallery/image1.jpeg"
                  }
                  alt="Gallery Image"
                  className="h-full object-cover w-full"
                  width={140}
                  height={140}
                />

                {/* Edit & Delete Buttons */}
                <div className="absolute top-2 right-2 z-[100]">
                  <div className="flex gap-2 bg-[--off-white-color] px-2 py-1 rounded-xl">
                    {/* <ToggleSwitch /> */}
                    <button
                      type="button"
                      className="text-xs"
                      onClick={() => handleEdit(broadCast)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      className="text-xs text-[#FF3D00]"
                      onClick={() => handleDelete(broadCast._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 left-0 top-0 flex items-center text-white text-xs text-center p-3 bg-black/40">
                  <p className="m-0">
                    {broadCast.title ||
                      "No description available for this room."}
                  </p>
                </div>
              </div>
            ))
          : !isLoading && (
              <div className="col-span-full text-center">
                No broadcasts found.
              </div>
            )}
      </div>

      {data && data.broadcasts.length > 0 && (
        <div className="mt-[2rem]">
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
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={filters.page >= data.pagination.totalPages}
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Rooms;
