import React, { useState } from "react";
import style from "./index.module.css";
import CreateCourse from "./createCourse";
import CreateVideos from "./createVideos";
import CreateTopic from "./createTopic";
import CreateNotice from "./createNotice";
import CreateEmployee from "./createEmployee";
import CreateBlog from "./createBlog";

interface Tab {
  label: string;
  key: string;
}

const Menu: React.FC = () => {
  const tabs: Tab[] = [
    { label: "N Create Course", key: "course" },
    // { label: 'N Creator Videos', key: "video"},
    { label: "Creator Topic", key: "topic" },
    { label: "Creator Notice", key: "notice" },
    { label: "Create Employee", key: "employee" },
    { label: "Create Blog", key: "blog" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="w-full">
        {/* Dropdown for small screens */}
        <div className="sm:hidden mb-2 m-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            onChange={(e) => setActiveTab(e.target.value)}
            value={activeTab}
          >
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tab buttons for larger screens */}
        <div className="hidden sm:flex border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-4 m-1 rounded-tr-lg border border-none rounded-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === tab.key
                  ? "bg-[#0059ff] text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 border border-gray-300 rounded-b-lg">
        {activeTab === "course" && (
          <div className="card pb-5">
            <CreateCourse />
          </div>
        )}

        {/* {activeTab === "video" && (
          <div className="card pb-5">
            <CreateVideos />
          </div>
        )} */}

        {activeTab === "topic" && (
          <div className="card pb-5">
            <CreateTopic />
          </div>
        )}

        {activeTab === "notice" && (
          <div className="card pb-5">
            <CreateNotice />
          </div>
        )}

        {activeTab === "employee" && (
          <div className="card pb-5">
            <CreateEmployee />
          </div>
        )}

        {activeTab === "blog" && (
          <div className="card pb-5">
            <CreateBlog />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
