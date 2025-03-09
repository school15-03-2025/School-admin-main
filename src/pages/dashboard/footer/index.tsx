import React, { useState } from "react";
import OfficeAddressForm from "./components/OfficeAddressForm";
import NewsLetter from "./components/NewsLetter";
import Rooms from "./components/Rooms";
import SupportLogo from "./components/SupportLogo";
import Info from "./components/Info";
import OnlineCourse from "./components/OnlineCourse";
import LiveClass from "./components/LiveClass";
import MapPhotos from "./components/MapPhoto";
import {
  tabs,
  companyCategory,
  coursesCategory,
} from "../../../utils/DataList";
import ContactUs from "./components/ContactUs";

const Footer: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const [activeCompanyTab, setActiveCompanyTab] = useState(
    companyCategory[0].key
  );

  const [activeCourseTab, setActiveCourseTab] = useState(
    coursesCategory[0].key
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center sm:justify-start border-gray-600">
        {tabs.map((tab, index) => (
          <button
            key={index}
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

      {/* Tab Content */}
      <div className="p-4  border border-gray-300 rounded-lg">
        {activeTab === "address" && <OfficeAddressForm />}

        {activeTab === "room" && (
          <>
            <Rooms activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}

        {activeTab === "contact" && <ContactUs />}

        {activeTab === "subscribe" && <NewsLetter />}

        {activeTab === "company" && <Info activeTab={activeTab} />}

        {activeTab === "info" && <OnlineCourse activeTab={activeTab} />}

        {activeTab === "civil" && <LiveClass activeTab={activeTab} />}

        {activeTab === "social" && (
          <div className="w-full">
            <div className="p-4 flex flex-col justify-center items-center ">
              <MapPhotos />
              <SupportLogo activeTab={activeTab} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
