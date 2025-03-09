import { useState } from "react";
import { useAddCourse } from "@/hooks/Courses";
import CourseForm from "./components/CourseForm";
import Card from "./components/Card";
import Table from "./components/Table";
import { useRouter } from "next/router";
const Course = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { mutate: addCourse } = useAddCourse();
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
    type: null,
    topic: null,
    status: null,
    date: null,
  });

  // Update filter function
  const updateFilter = (key: string, value: any) => {
    if (key === "status" && value === "all") {
      value = null;
    }

    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleAddCourse = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEditCourse = (course: any) => {
    setEditData(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (formData: any) => {
    addCourse(formData);
    closeModal();
  };
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
      {path === "/dashboard/course" && <Card />}
      {/* Create Course Button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Courses</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddCourse}
        >
          Create Course
        </button>
      </div>
      {/* <Filters /> */}
      <div className="flex flex-wrap gap-3 mt-3 justify-between md:justify-end my-6">
        <div className="w-full sm:w-auto">
          <select
            name="types"
            className="border w-full sm:w-36  text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("type", e.target.value)}
          >
            <option value="all">Type</option>
            <option value="all">All</option>
            <option value="nonInstitutionCourse">Non Institution Course</option>
            <option value="institutionCourse">Institution Course</option>
          </select>
        </div>

        {/* Topic Filter */}
        <div className="w-full sm:w-auto">
          <select
            name="topic"
            className="border w-full sm:w-36  text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("topic", e.target.value)}
          >
            <option value="all">Topic</option>
            <option value="all">All</option>
            <option value="web dev">Web dev</option>
            <option value="app dev">App dev</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            name="course"
            className="border w-full sm:w-36  text-gray-900 text-sm p-3 rounded-lg"
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="all">Course</option>
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Coming Soon</option>
            <option value="blocked">Blocked</option>
            <option value="live">Live</option>
            <option value="ended">Done</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2  rounded-lg">
            <input
              type="date"
              name="startDate"
              className="p-2 bg-white rounded-lg  text-sm w-full sm:w-auto"
              onChange={(e) => updateFilter("date", e.target.value)}
            />
            <span className="text-gray-700 text-sm">To</span>
            <input
              type="date"
              name="endDate"
              className="p-2 bg-white rounded-lg  text-sm w-full sm:w-auto"
              onChange={(e) => updateFilter("date", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table filters={filters} setFilters={setFilters} />

      {/* Course Form Modal */}
      {isModalOpen && (
        <CourseForm
          isOpen={isModalOpen}
          onClose={closeModal}
          // onSubmit={handleSubmit}
          editData={editData}
        />
      )}
    </>
  );
};

export default Course;
