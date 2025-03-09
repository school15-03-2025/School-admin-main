import React from "react";
import Image from "next/image"; // Make sure to import the Image component
// Adjust the path to your image

interface CardsProps {
  title: string;
  total: number;
  grow: string;
}

function Cards({ title, total, grow }: CardsProps) {
  return (
    <div
      className="card rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
      style={{ backgroundColor: "#BAEDBD" }} // Custom green background
    >
      <p className="text-gray-600 text-sm mb-2">Total {title}</p>
      <div className="flex justify-between items-center">
        <span className="text-4xl font-bold text-gray-900">{total}</span>
        <div className="flex items-center gap-2  px-3 py-1 rounded-full">
          <span className="text-black text-lg font-medium">
            +{Number(grow).toFixed(1)}%
          </span>
          {/* Replace the SVG with Image */}
          <Image
            src="/arrow-up.png" // Directly use the image from the public folder
            width={20}
            height={15}
            alt="trend-icon-up"
            className="ml-1 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
