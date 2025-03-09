import React, { useState } from "react";
import style from "./index.module.css";
import BankDetails from "./bankDetails";
import AddAdmin from "./addAdmin";
import AdminTable from "./components/AdminTable";

interface Tab {
  label: string;
  key: string;
}

const Admin: React.FC = () => {
  const tabs: Tab[] = [
    { label: "Bank & wallet", key: "bank" },
    { label: "Admin", key: "admin" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <div key={tab.key}>
            <button
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-4 m-1 rounded-tr-lg rounded-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === tab.key
                  ? "bg-[#0059ff] text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border border-gray-300 rounded-b-lg">
        {activeTab === "bank" && (
          <div className="card pb-5">
            <BankDetails />
          </div>
        )}

        {activeTab === "admin" && (
          <div className="card pb-5">
            <AddAdmin
              selectedAdmin={selectedAdmin}
              setSelectedAdmin={setSelectedAdmin}
            />
            <AdminTable setSelectedAdmin={setSelectedAdmin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
