import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useAddFooterMenus } from "@/hooks/FooterMenus";
import ToggleSwitch from "@/components/toggleSwitch";

interface CompanyCategoryItem {
  label: string;
  key: string;
}

function OnlineCourse({ activeTab }: any) {
  //const [companyCategory, setCompanyCategory] = useState([]);
  const [companyCategory, setCompanyCategory] = useState<CompanyCategoryItem[]>(
    []
  );
  const [activeCompanyTab, setActiveCompanyTab] = useState(companyCategory[0]);
  const [newCompany, setNewCompany] = useState("");
  const [htmlData, setHtmlData] = useState("");
  const [error, setError] = useState({ company: "", description: "" });

  const { mutate: addFooterMenu } = useAddFooterMenus();

  const handleAddCompany = () => {
    let validationErrors = { company: "", description: "" };

    if (!newCompany.trim())
      validationErrors.company = "Company name cannot be empty!";
    if (!htmlData.trim())
      validationErrors.description = "Description cannot be empty!";

    if (validationErrors.company || validationErrors.description) {
      setError(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("category", newCompany);
    formData.append("description", htmlData);
    formData.append("type", "onlinecourse");

    addFooterMenu(formData);

    setCompanyCategory([
      ...companyCategory,
      { label: newCompany, key: `cat${companyCategory.length + 1}` },
    ]);
    setNewCompany("");
    setHtmlData("");
    setError({ company: "", description: "" });
  };

  const handleContentChange = (value: any) => {
    setHtmlData(value);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row h-auto">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 border-r flex flex-col bg-white p-4">
          <div className="flex items-center w-full mb-3">
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="bg-gray-50 border text-sm rounded-lg block w-full p-3 rounded-r-none"
              placeholder="New category"
              required
            />
            <button
              type="button"
              onClick={handleAddCompany}
              className="py-3 px-5 text-sm font-medium text-white bg-[#0059ff] rounded-lg rounded-l-none"
            >
              Add
            </button>
          </div>
          {error.company && (
            <p className="text-red-500 text-sm">{error.company}</p>
          )}

          <hr className="border-gray-300 mt-3" />

          <ul className="mt-4 space-y-2">
            {companyCategory.map((tab: any, index: number) => (
              <li
                key={index}
                className={`cursor-pointer flex justify-between px-4 py-3 border-l-2 ${
                  activeCompanyTab === tab.key
                    ? "border-gray-700 font-semibold bg-green-300"
                    : "border-transparent"
                } bg-green-200 rounded-lg`}
                onClick={() => setActiveCompanyTab(tab.key)}
              >
                {tab.label}
                <ToggleSwitch />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4 bg-white">
          <div className="card py-5 pt-0">
            <h2 className="text-2xl text-center font-semibold mb-5 text-black-700">
              Information Technology
            </h2>

            <div className="w-full">
              <label htmlFor="description" className="block mb-2 font-medium">
                Description
              </label>
              {typeof window !== "undefined" && ReactQuill ? (
                <ReactQuill
                  value={htmlData}
                  onChange={handleContentChange}
                  theme="snow"
                  className="min-h-[200px]"
                  placeholder="Start typing here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ color: [] }, { background: [] }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "bold",
                    "italic",
                    "underline",
                    "list",
                    "bullet",
                    "link",
                    "image",
                    "color",
                    "background",
                  ]}
                />
              ) : (
                <p>Loading editor...</p>
              )}
              {error.description && (
                <p className="text-red-500 text-sm mt-2">{error.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineCourse;
