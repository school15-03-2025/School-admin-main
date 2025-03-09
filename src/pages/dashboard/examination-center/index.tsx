import { useState } from "react";
import ExamForm from "./components/ExamsForm";
import { useDeleteExamination, useGetExaminations } from "@/hooks/Examination";
import { FaEdit, FaTrash } from "react-icons/fa";
import Card from "./components/Cards";
import Paginations from "../course/components/Paginations";
import Loader from "@/components/Loader";
import Filters from "./components/Filters";

const ExaminationCenter = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editExamData, setEditExamData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 2,
    type: null,
    topics: null,
    course: null,
    startDate: null,
    endDate: null,
  });

  const { data, isLoading, error } = useGetExaminations(filters);
  const { mutate } = useDeleteExamination();

  // Access the examinations and pagination data
  const examinations = data?.examinations || [];
  const pagination = data?.pagination || {
    totalResults: 0,
    totalPages: 1,
    page: 1,
    pageSize: 10,
  };

  const openCreateModal = () => {
    setEditExamData(null);
    setModalOpen(true);
  };

  const openEditModal = (exam: any) => {
    setEditExamData(exam);
    setModalOpen(true);
  };

  // Filter the examinations
  const filteredExams = examinations.filter((exam: any) => {
    return (
      (searchTerm === "" ||
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCourse === "" || exam.courseID === selectedCourse)
    );
  });

  const updateFilter = (key: string, value: any) => {
    if (value === "all") {
      value = null;
    }

    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-none min-h-screen">
      <Card />
      <Filters
        updateFilter={updateFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Examination Center</h2>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0059ff] text-white rounded"
        >
          + Create Exam
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">Error loading data</p>
      ) : filteredExams?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams?.map((exam: any) => (
            <div
              key={exam._id}
              className="bg-white p-2 shadow-md rounded-lg border"
            >
              <img
                src={exam.image}
                alt={exam.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold">{exam.title}</h3>
              <p className="text-gray-600">
                {new Date(exam.examDate).toLocaleDateString()}
              </p>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => openEditModal(exam)}
                  className=" text-[#0059ff] px-3 py-1 rounded"
                  aria-label="Edit Exam" // Add aria-label
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => mutate(exam._id)}
                  className=" text-red-700 px-3 py-1 rounded"
                  aria-label="Delete Exam" // Add aria-label
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No exams found</p>
      )}

      {!isLoading && !error && filteredExams?.length > 0 && (
        <div className="mt-[2rem]">
          <div className="text-center p-3">
            <h1>
              Showing {(filters?.page - 1) * filters?.pageSize + 1} to{" "}
              {Math.min(
                filters.page * filters?.pageSize,
                pagination.totalResults
              )}{" "}
              of {pagination.totalResults} Results
            </h1>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#0059ff] p-3 rounded-xl text-white"
              onClick={() =>
                setFilters((prev: any) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={filters?.page >= pagination?.totalPages}
            >
              Load More
            </button>
          </div>
        </div>
      )}

      <ExamForm
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false), setEditExamData(null);
        }}
        initialData={editExamData}
      />
    </div>
  );
};

export default ExaminationCenter;
