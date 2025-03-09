import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import ToggleSwitch from "@/components/toggleSwitch";
import TopicForm from "./components/TopicForm";
import { useDeleteTopic, useGetTopics } from "@/hooks/Topics";
import Paginations from "../course/components/Paginations";
import Loader from "@/components/Loader";
import { TableSkeleton } from "@/components/Table";

const CreateTopic = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<null | any>(null);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setEditData(null);
    setModalOpen(false);
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
  const { data, isLoading, isError } = useGetTopics(filters);
  const {
    mutate: deleteTopic,
    isPending: isDeleting,
    isError: isDeleteError,
  } = useDeleteTopic();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      const formData = new FormData();
      formData.append("topicID", id);
      deleteTopic(formData, {
        onSuccess: () => toast.success("Topic deleted successfully!"),
        onError: () => toast.error("Failed to delete topic"),
      });
    }
  };
  return (
    <>
      {/* Top Section */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 gap-4">
          <div>
            <label htmlFor="dates" className="w-full block"></label>
            <div className="flex flex-wrap gap-2">
              <div className="flex border rounded-xl">
                <input
                  type="date"
                  name="startDate"
                  className="p-2 bg-white rounded-lg"
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                />
              </div>
              <span className="py-2 px-2">To</span>
              <div className="flex border rounded-xl">
                <input
                  type="date"
                  name="endDate"
                  className="p-2 bg-white rounded-lg"
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="bg-[#0059ff] text-white px-4 py-3 rounded-lg"
          >
            Create Topic
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border">
            <thead>
              <tr className="bg-[#1D4ED8] text-white">
                <th className="p-4 text-left">No.</th>
                <th className="p-4 text-left">Icon</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-red-500">
                    Error fetching topics. Please try again.
                  </td>
                </tr>
              ) : !data?.notice || data.notice.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    No Topics Found
                  </td>
                </tr>
              ) : (
                data.notice.map((topic: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-3 border">{index + 1}</td>
                    <td className="py-4 px-3 border">
                      <Image
                        src={topic.image ? topic.image : "/customer.png"}
                        height={50}
                        width={50}
                        alt="Topic Icon"
                      />
                    </td>
                    <td className="py-4 px-3 border">{topic.title}</td>
                    <td className="py-4 px-3 border">{topic.status}</td>
                    <td className="py-4 px-3 text-center">
                      <div className="flex gap-2">
                        <ToggleSwitch />
                        <button
                          className="text-xs"
                          onClick={() => {
                            setEditData(topic);
                            openModal();
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="text-xs text-[#FF3D00]"
                          onClick={() => handleDelete(topic._id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            "Deleting..."
                          ) : (
                            <FontAwesomeIcon icon={faTrash} />
                          )}
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
            pagination={data?.pagination}
            setFilters={setFilters}
          />
        )}
      </div>

      {/* Modal for Create/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editData ? "Edit Topic" : "Create Topic"}
      >
        <TopicForm onClose={closeModal} editData={editData} />
      </Modal>
    </>
  );
};

export default CreateTopic;
