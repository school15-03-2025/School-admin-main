import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-full  w-full">
      <div className="w-8 h-8 border-4 border-gray-100 border-t-[#0059ff] rounded-full animate-spin "></div>
    </div>
  );
}

export default Loader;
