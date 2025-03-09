import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import style from "./index.module.css";
import CardLayouts from "./cardLayout";
import HomeBanner from "./Components/HomeBanner";
import Logo from "./Components/Logo";
import Gallery from "./Components/Gallery";
import ThreeCards from "./Components/ThreeCards";
import FourCard from "./Components/FourCards";
import SecurityCard from "./Components/SecurityCard";

interface Tab {
  label: string;
  key: string;
}

const Home: React.FC = () => {
  const tabs: Tab[] = [
    { label: "Banner", key: "banner" },
    { label: "3 card", key: "3card" },
    { label: "4 card", key: "4card" },
    { label: "Security", key: "security" },
    { label: "Service Gallery", key: "gallery" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const bannerImgInputRef: any = useState<HTMLInputElement | null>(null);
  const [bannerImage, setBannerImage] = useState<any>(null);

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    bannerImgInputRef.current?.click();
  };

  const bannerManuImgInputRef: any = useState<HTMLInputElement | null>(null);
  const [bannerManuImage, setBannerManuImage] = useState<any>(null);

  const handleBannerManuImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerManuImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerMenuFileInput = () => {
    bannerManuImgInputRef.current?.click();
  };

  const cards3: Tab[] = [
    { label: "Card 1", key: "card1" },
    { label: "Card 2", key: "card2" },
    { label: "Card 3", key: "card3" },
  ];
  const [activeCard3Tab, setActiveCard3Tab] = useState(cards3[0].key);

  const cards4: Tab[] = [
    { label: "Card 1", key: "card1" },
    { label: "Card 2", key: "card2" },
    { label: "Card 3", key: "card3" },
    { label: "Card 4", key: "card4" },
  ];

  const [activeCard4Tab, setActiveCard4Tab] = useState(cards4[0].key);

  const galleryCategory = [
    { label: "Category 1", key: "cat1" },
    { label: "Category 2", key: "cat2" },
    { label: "Category 3", key: "cat3" },
    { label: "Category 4", key: "cat4" },
  ];
  const [activeGalleryTab, setActiveGalleryTab] = useState(
    galleryCategory[0].key
  );

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-gray-300 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index} // Always add a key when mapping over arrays
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 m-1 text-sm font-medium transition-colors duration-300 border rounded-lg whitespace-nowrap
        ${
          activeTab === tab.key
            ? "bg-[#0059ff] text-white"
            : "bg-white text-black"
        }
      `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-transparent border border-gray-300 rounded-b-lg">
        {activeTab === "banner" && <HomeBanner />}

        {activeTab === "3card" && (
          <ThreeCards
            activeTab={activeTab}
            setActiveCard3Tab={setActiveCard3Tab}
          />
        )}

        {activeTab === "4card" && (
          <FourCard
            activeTab={activeTab}
            setActiveCard4Tab={setActiveCard3Tab}
          />
        )}

        {activeTab === "security" && <SecurityCard title={`Security Cart`} />}

        {activeTab === "gallery" && <Gallery activeTab={activeTab} />}

        {activeTab === "logo" && <Logo activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default Home;
