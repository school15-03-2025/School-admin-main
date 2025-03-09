import Modal from "@/components/modal";
import { useState, useEffect } from "react";
import Filters from "./components/Filters";
import { adminSchema } from "@/utils/schema";
import AdminHeader from "./components/AdminHeader";
import Inputs from "./components/Inputs";
import { useAddAdmin, useUpdateAdmin } from "@/hooks/Admin";
import Access from "./components/Access";

const AddAdmin = ({
  selectedAdmin,
  setSelectedAdmin,
}: {
  selectedAdmin?: any;
  setSelectedAdmin: any;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    username: string;
    email: string;
    loginUrl: string;
    pin: string;
    password: string;
    photo: File | null;
  }>({
    name: "",
    username: "",
    email: "",
    loginUrl: "",
    pin: "",
    password: "",
    photo: null,
  });

  const { mutate: addAdmin } = useAddAdmin(() => closeModel());
  const { mutate: updateAdmin } = useUpdateAdmin(() => closeModel());

  const removeFile = () => {
    setFormData({ ...formData, photo: null });
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const viewOrderData = (data: any) => {
    setModalOpen(true);
    if (data) {
      setFormData({
        name: data.name,
        username: data.username,
        email: data.email,
        loginUrl: data.loginUrl,
        pin: data.pin,
        password: data.password,
        photo: data.photo ? null : null,
      });
    }
  };

  const closeModel = () => {
    setModalOpen(false);
    setSelectedAdmin(null);
    setFormData({
      name: "",
      username: "",
      email: "",
      loginUrl: "",
      pin: "",
      password: "",
      photo: null,
    });
    setSelectedValues({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "number" ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = adminSchema.safeParse({
      ...formData,
      pin: Number(formData.pin),
    });

    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    const formDataForm = new FormData();
    Object.entries(formData).forEach(([key, value]: any) => {
      formDataForm.append(key, value);
    });
    formDataForm.append("adminType", "subAdmin");
    formDataForm.append("access", JSON.stringify(selectedValues));

    if (selectedAdmin) {
      formDataForm.append("adminID", selectedAdmin._id);
      updateAdmin(formDataForm);
    } else {
      addAdmin(formDataForm);
    }

    setErrors({});
  };

  const [selectedValues, setSelectedValues] = useState<any | null>({});
  const handleCheckboxChange = (
    category: string,
    subCategory: string,
    value: string
  ) => {
    setSelectedValues((prevState: any) => {
      const updatedState: any = { ...prevState };
      if (!updatedState[category]) {
        updatedState[category] = {};
      }
      if (!updatedState[category][subCategory]) {
        updatedState[category][subCategory] = new Set();
      }

      if (updatedState[category][subCategory].has(value)) {
        updatedState[category][subCategory].delete(value);
      } else {
        updatedState[category][subCategory].add(value);
      }

      if (updatedState[category][subCategory].size === 0) {
        delete updatedState[category][subCategory];
      }
      if (Object.keys(updatedState[category]).length === 0) {
        delete updatedState[category];
      }

      return { ...updatedState };
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex gap-3 justify-between items-end">
          <div>
            <button
              type="submit"
              onClick={() => viewOrderData(selectedAdmin)}
              className="inline-flex items-center py-3 px-3 text-sm font-medium text-white bg-[#0059ff] border-none rounded-lg border border-gray-700"
            >
              {selectedAdmin ? "Edit Admin" : "Add Sub Admin"}
            </button>
          </div>
          <Filters />
        </div>
        <hr className="my-5" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModel}
        title={selectedAdmin ? "Edit Admin" : "Add Sub Admin"}
      >
        <form method="post" className="gap-4" onSubmit={(e) => handleSubmit(e)}>
          <AdminHeader
            handleFileChange={handleFileChange}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          <Inputs
            errors={errors}
            formData={formData}
            handleChange={handleChange}
          />

          <div>
            <label htmlFor="password" className="w-full">
              Access
            </label>
            <Access
              selectedValues={selectedValues}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="text-right flex justify-end gap-5 mt-5">
            <button
              type="button"
              className="block items-center py-2 px-8 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700"
            >
              Cancel
            </button>
            <button className="text-white px-8 py-2 text-lg relative clip-button">
              {selectedAdmin ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAdmin;
