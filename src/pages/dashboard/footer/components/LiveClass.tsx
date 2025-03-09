import React, { useState } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import ToggleSwitch from "@/components/toggleSwitch";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useAddFooterMenus } from "@/hooks/FooterMenus";
// enum: ["company", "onlinecoure", "liveclass"]

interface CompanyCategoryItem {
  label: string;
  key: string;
}

function LiveClass({ activeTab }: any) {
  const [companyCategory, setCompanyCategory] = useState<CompanyCategoryItem[]>(
    []
  );
  //const [companyCategory, setCompanyCategory] = useState([]);
  const [activeCompanyTab, setActiveCompanyTab] = useState(
    companyCategory[0]?.key || ""
  );
  const [newCompany, setNewCompany] = useState("");
  const [htmlData, setHtmlData] = useState("");
  const [error, setError] = useState({ company: "", description: "" });

  const { mutate: addFooterMenu } = useAddFooterMenus();

  const handleAddCompany = () => {
    let validationErrors = { company: "", description: "" };

    if (!newCompany.trim()) {
      validationErrors.company = "Class name cannot be empty!";
    }
    if (!htmlData.trim()) {
      validationErrors.description = "Description cannot be empty!";
    }

    if (validationErrors.company || validationErrors.description) {
      setError(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("category", newCompany);
    formData.append("description", htmlData);
    formData.append("type", "liveclass");

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
    <>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row lg:flex-row h-auto">
          {/* Left Sidebar */}
          <div className="w-full sm:w-1/3 lg:w-1/4 border-r flex flex-col bg-white">
            <div className="flex items-center max-w-sm m-3 ml-0 p-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="bg-gray-50 text-sm rounded-lg block w-full p-3 rounded-r-none border"
                  placeholder="New Civil Engineering"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleAddCompany}
                className="inline-flex items-center py-3 px-5 text-sm font-medium text-white bg-[#0059ff] rounded-lg rounded-l-none border"
              >
                Add
              </button>
            </div>
            {error.company && (
              <p className="text-red-500 text-sm mt-1 ml-3">{error.company}</p>
            )}

            <hr className="border-gray-300 mt-3" />
            <ul className="my-5 pr-0 ">
              {companyCategory.map((tab, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex justify-between px-4 py-3 border-l-2  ${
                    activeCompanyTab === tab.key
                      ? "border-gray-700 font-semibold bg-green-200"
                      : "border-transparent"
                  } bg-green-50 `}
                  onClick={() => setActiveCompanyTab(tab.key)}
                >
                  {tab.label}
                  <div className="flex gap-2">
                    <ToggleSwitch />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex-1 w-full sm:w-2/3 lg:w-3/4 relative">
            <div className="card py-5 pt-0 bg-white p-3">
              <h2 className="text-2xl text-center font-medium mb-8 poppins-bold text-black-700 pt-2">
                Civil Engineering
              </h2>
              <div className="w-full inline-block ">
                <label htmlFor="description" className="w-full block">
                  Description
                </label>
                {typeof window !== "undefined" && ReactQuill ? (
                  <ReactQuill
                    value={htmlData}
                    onChange={handleContentChange}
                    theme="snow"
                    style={{ height: "200px" }}
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
                  <p className="text-red-500 text-sm mt-12 absolute bottom-0 p-2">
                    {error.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveClass;
