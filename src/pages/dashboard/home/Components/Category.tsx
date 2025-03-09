import React, { useState, useEffect } from "react";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
  useGetCategories,
} from "@/hooks/Categories";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/Loader";
import ToggleSwitch from "@/components/toggleSwitch";

const categorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  type: z.enum(["gallery", "course", "company"], {
    errorMap: () => ({ message: "Category type is required" }),
  }),
});
type CategoryFormData = {
  category: string;
  type: "gallery" | "course" | "company";
};

const Category: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategories();

  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
    formState: { errors: errorsEdit },
  } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const onAddSubmit = async (formData: CategoryFormData) => {
    const form = new FormData();
    form.append("category", formData.category);
    form.append("type", formData.type);

    addCategoryMutation.mutate(form, {
      onSuccess: () => {
        reset();
        setShowCreateForm(false);
      },
    });
  };

  const onEditSubmit = async (formData: CategoryFormData) => {
    if (!editingCategory) return;

    const form = new FormData();
    form.append("categoryID", editingCategory._id);
    form.append("category", formData.category);
    form.append("type", formData.type);

    updateCategoryMutation.mutate(form, {
      onSuccess: () => {
        setEditingCategory(null);
        setShowEditForm(false);
        resetEdit();
      },
    });
  };

  const onDelete = (categoryID: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(categoryID);
    }
  };

  useEffect(() => {
    if (editingCategory) {
      setValue("category", editingCategory.category);
      setValue("type", editingCategory.type);
      setShowEditForm(true);
    }
  }, [editingCategory, setValue]);

  return (
    <div className="w-full md:w-1/3 border-r flex flex-col p-4 bg-white">
      <button
        onClick={() => {
          setShowCreateForm((prev) => !prev);
          setShowEditForm(false);
          setEditingCategory(null);
        }}
        className="bg-[#0059ff] text-white py-2 px-4 rounded flex items-center gap-2 mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> Create Category
      </button>

      {/* CREATE CATEGORY FORM */}
      {showCreateForm && (
        <form
          onSubmit={handleSubmit(onAddSubmit)}
          className="mb-4 p-3 bg-gray-100 rounded"
        >
          <input
            type="text"
            placeholder="Category Name"
            {...register("category")}
            className="w-full p-2 border border-gray-700 rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-xs">
              {String(errors.category.message)}
            </p>
          )}

          <select
            {...register("type")}
            className="w-full p-2 border border-gray-700 rounded mt-2"
          >
            <option value="">Select Type</option>
            <option value="gallery">Gallery</option>
            <option value="course">Course</option>
            <option value="company">Company</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 mt-2 rounded"
          >
            {addCategoryMutation.isPending ? "Adding..." : "Add Category"}
          </button>
        </form>
      )}

      {/* EDIT CATEGORY FORM */}
      {showEditForm && (
        <form
          onSubmit={handleSubmitEdit(onEditSubmit)}
          className="mb-4 p-3 bg-yellow-100 rounded"
        >
          <input
            type="text"
            placeholder="Category Name"
            {...registerEdit("category")}
            className="w-full p-2 border border-gray-700 rounded"
          />
          {errorsEdit.category && (
            <p className="text-red-500 text-xs">
              {String(errorsEdit.category.message)}
            </p>
          )}

          <select
            {...registerEdit("type")}
            className="w-full p-2 border border-gray-700 rounded mt-2"
          >
            <option value="">Select Type</option>
            <option value="gallery">Gallery</option>
            <option value="course">Course</option>
            <option value="company">Company</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 mt-2 rounded"
          >
            {updateCategoryMutation.isPending
              ? "Updating..."
              : "Update Category"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setShowEditForm(false);
              resetEdit();
            }}
            className="bg-gray-500 text-white py-2 px-4 mt-2 ml-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      <ul className="min-h-[100px] flex flex-col justify-center items-center w-full">
        {/* Loading State */}
        {isLoading && (
          <li className="text-center py-4">
            <Loader />
          </li>
        )}

        {/* Error State */}
        {error && (
          <li className="text-center py-4 text-red-700">
            Error loading categories
          </li>
        )}

        {/* Data List */}
        {!isLoading && !error && categories?.length > 0
          ? categories.map((cat: any) => (
              <li
                key={cat._id}
                className="flex justify-between py-2 border-b bg-green-300 p-1 w-full"
              >
                <span>
                  {cat.category} ({cat.type})
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setShowCreateForm(false);
                    }}
                    className="text-blue-600"
                  >
                    {/* <FontAwesomeIcon icon={faEdit} /> */}
                  </button>
                  <button
                    onClick={() => onDelete(cat._id)}
                    className="text-red-600"
                  >
                    {/* <FontAwesomeIcon icon={faTrash} /> */}
                  </button>
                  <ToggleSwitch />
                </div>
              </li>
            ))
          : !isLoading &&
            !error && (
              <li className="text-center py-4 text-gray-500">
                No categories found.
              </li>
            )}
      </ul>
    </div>
  );
};

export default Category;
