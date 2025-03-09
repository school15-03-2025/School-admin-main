import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface ForwardModelProps {
  setopenForwardModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForwardModel: React.FC<ForwardModelProps> = ({ setopenForwardModel }) => {
  return (
    <div className="absolute z-50 right-16 top-32 p-2">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">
        <div className="flex justify-end pb-2">
          <button
            className="text-lg"
            onClick={() => setopenForwardModel(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <div className="flex items-center gap-2">
              <Image src="/user.png" alt="User" width={30} height={30} />
              <span className="font-medium">Mr.hunre</span>
            </div>
            <button className="px-1 py-2 w-16 rounded-2xl bg-green-500 text-white ">
              Send
            </button>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <div className="flex items-center gap-2">
              <Image src="/user.png" alt="User" width={30} height={30} />
              <span className="font-medium">Ms.paris</span>
            </div>
            <button className="px-1 py-2 w-16 rounded-2xl bg-green-500 text-white ">
              Send
            </button>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <div className="flex items-center gap-2">
              <Image src="/user.png" alt="User" width={30} height={30} />
              <span className="font-medium">Mr.jams</span>
            </div>
            <button className="px-1 py-2 w-16 rounded-2xl bg-red-500 text-white ">
              Unsend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardModel;
