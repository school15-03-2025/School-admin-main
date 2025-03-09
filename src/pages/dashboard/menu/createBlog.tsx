import Modal from "@/components/modal";
import ToggleSwitch from "@/components/toggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import BlogForm from "./components/BlogForm";
import { useGetBlogs, useDeleteBlog } from "@/hooks/Blogs";
import Paginations from "../course/components/Paginations";
import { TableSkeleton } from "@/components/Table";

const CreateBlog = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

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

  const { data, error, isLoading, refetch } = useGetBlogs(filters);
  const { mutate: deleteBlog } = useDeleteBlog();

  const handleNewBlog = () => {
    setEditEntry(null);
    setModalOpen(true);
  };

  const handleEdit = (blog: any) => {
    setEditEntry(blog);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id, {
        onSuccess: () => refetch(), // Refresh the data after deletion
      });
    }
  };

  return (
    <>
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-wrap gap-3 justify-between items-end">
          {/* Date Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="flex border rounded-lg w-full sm:w-auto">
              <input
                type="date"
                name="startDate"
                className="p-2 bg-white rounded-lg w-full sm:w-auto"
                onChange={(e) => updateFilter("startDate", e.target.value)}
              />
            </div>
            <span className="text-gray-700 text-sm">To</span>
            <div className="flex border rounded-lg w-full sm:w-auto">
              <input
                type="date"
                name="endDate"
                className="p-2 bg-white rounded-lg w-full sm:w-auto"
                onChange={(e) => updateFilter("endDate", e.target.value)}
              />
            </div>
          </div>

          {/* Create Blog Button */}
          <div className="w-full sm:w-auto flex justify-end">
            <button
              type="submit"
              onClick={handleNewBlog}
              className="py-3 px-5 text-sm font-medium text-white bg-[#0059ff] rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Create Blog
            </button>
          </div>
        </div>

        <hr className="my-5" />

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden min-w-max">
            <thead>
              <tr>
                {["No.", "Photo", "Title", "Tag", "Updated Date", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {/* Show Loading State */}
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-600">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-red-500">
                    Error loading blogs. Please try again later.
                  </td>
                </tr>
              ) : data?.blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500">
                    No blogs available.
                  </td>
                </tr>
              ) : (
                data?.blogs?.map((blog: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-100 even:bg-white text-xs"
                  >
                    <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                      <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                        {index + 1}
                      </span>
                    </td>

                    {/* Blog Image */}
                    <td className="py-4 px-4 border-r border-[#1D4ED8] text-center">
                      <Image
                        src={blog.image || "/default-image.png"}
                        height={80}
                        width={120}
                        alt="Blog Image"
                        className="object-cover rounded-md"
                        unoptimized
                      />
                    </td>

                    {/* Blog Details */}
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {blog.title}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {blog.shortDescription}
                    </td>
                    <td className="py-4 px-3 border-r border-[#1D4ED8]">
                      {blog.updatedAt}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-2 text-center max-w-18">
                      <div className="flex gap-2 bg-[--off-white-color] px-2 py-1 rounded-xl">
                        <ToggleSwitch />
                        <button
                          type="button"
                          className="text-xs text-blue-500"
                          onClick={() => handleEdit(blog)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#FF3D00]"
                          onClick={() => handleDelete(blog._id)}
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
        {data && data.blogs.length > 0 && (
          <Paginations
            filters={filters}
            setFilters={setFilters}
            pagination={data?.pagination}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editEntry ? "Edit Blog" : "Add Blog"}
      >
        <BlogForm
          existingData={editEntry}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default CreateBlog;
