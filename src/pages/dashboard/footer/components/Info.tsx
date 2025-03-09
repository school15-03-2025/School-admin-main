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

function Info({ activeTab }: any) {
  const [companyCategory, setCompanyCategory] = useState<CompanyCategoryItem[]>(
    []
  );
  //const [companyCategory, setCompanyCategory] = useState([]);
  const [activeCompanyTab, setActiveCompanyTab] = useState(companyCategory[0]);
  const [newCompany, setNewCompany] = useState("");
  const [htmlData, setHtmlData] = useState("");
  const [error, setError] = useState({ company: "", description: "" });
  const { mutate: addFooterMenu } = useAddFooterMenus();

  const handleAddCompany = () => {
    let validationErrors = { company: "", description: "" };

    if (!newCompany.trim()) {
      validationErrors.company = "Company name cannot be empty!";
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
    formData.append("type", "company");

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
        <div className="flex flex-col md:flex-row h-auto">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 border-r flex flex-col bg-white">
            <div className="flex items-center max-w-sm m-3 ml-0 p-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="bg-gray-50 border text-sm rounded-lg block w-full p-3 rounded-r-none"
                  placeholder="New Company"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleAddCompany}
                className="inline-flex items-center py-3 px-5 text-sm font-medium text-white bg-[#0059ff] rounded-lg rounded-l-none"
              >
                Add
              </button>
            </div>
            {error.company && (
              <p className="text-red-500 text-sm mt-1 ml-3">{error.company}</p>
            )}

            <hr className="border-gray-300 mt-3" />
            <ul className="my-5 pr-0">
              {companyCategory.map((tab: any, index: number) => (
                <li
                  key={index}
                  className={`cursor-pointer flex justify-between px-4 py-3 border-l-2 ${
                    activeCompanyTab === tab.key
                      ? "border-gray-700 font-semibold bg-green-200"
                      : "border-transparent"
                  } bg-green-100`}
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
          <div className="flex-1 p-3 bg-white">
            <div className="card py-5 pt-0 h-[50%]">
              <h2 className="text-2xl text-center font-medium mb-8 poppins-bold text-black-700">
                Company
              </h2>
              <div className="w-full inline-block">
                <label htmlFor="description" className="w-full block">
                  Description
                </label>
                {typeof window !== "undefined" && ReactQuill ? (
                  <ReactQuill
                    value={htmlData}
                    onChange={handleContentChange}
                    theme="snow"
                    style={{ height: "250px" }}
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
                  <p className="text-red-500 text-sm mt-12">
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

export default Info;
