import { useGetStudentState } from "@/hooks/Students";
import React, { useState } from "react";
import CardSvg from "./CardSvg";
import Loader from "@/components/Loader";

function Cards() {
  const {
    data: userState,
    isLoading: loadingUserState,
    isError: userStateError,
    error: stateError,
  } = useGetStudentState();

  if (!loadingUserState) {
    if (userStateError || !userState || userState.length === 0) {
      return (
        <div className="text-red-500 text-center font-semibold p-4 bg-red-100 rounded-lg">
          Error:{" "}
          {stateError?.message || "Failed to fetch data. Please try again."}
        </div>
      );
    }
  }

  const totalUsers = userState?.[0]?.totalUsers ?? "N/A";
  const totalActiveUsers = userState?.[0]?.statusCounts?.[0]?.count ?? "N/A";
  const totalSuspendUsers = userState?.[0]?.statusCounts?.[1]?.count ?? "N/A";
  const totalBlockedUsers = userState?.[0]?.statusCounts?.[2]?.count ?? "N/A";
  const pendingDeletion = userState?.[0]?.deletionDueDateNotNullCount ?? "N/A";
  const completedDeletion = userState?.[0]?.accountDeletedCount ?? "N/A";

  const cardsData = [
    {
      title: "Total Users",
      value: totalUsers,
      bg: "bg-[#0059ff]",
      textColor: "text-white",
    },
    {
      title: "Total Active Users",
      value: totalActiveUsers,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Suspended Users",
      value: totalSuspendUsers,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Blocked Users",
      value: totalBlockedUsers,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Pending Delete Accounts",
      value: pendingDeletion,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Completed Delete Accounts",
      value: completedDeletion,
      bg: "bg-white",
      textColor: "text-black",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className={`card rounded-xl flex flex-col py-6 px-4 transition-colors duration-300 ${
            hoveredIndex === index
              ? "bg-[#0059ff] text-white"
              : index === 0 && hoveredIndex !== 0
              ? "bg-white text-black"
              : card.bg + " " + card.textColor
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
        >
          <div className="flex justify-between items-start">
            <p
              className={`font-semibold text-sm ${
                hoveredIndex === index
                  ? "text-white"
                  : index === 0 && hoveredIndex !== 0
                  ? "text-black"
                  : card.textColor
              }`}
            >
              {card.title}
            </p>
            <CardSvg
              color={
                hoveredIndex === index
                  ? "white"
                  : index === 0 && hoveredIndex !== 0
                  ? "black"
                  : "black"
              }
            />
          </div>
          <div
            className={`text-xl text-right mt-4 font-semibold ${
              hoveredIndex === index
                ? "text-white"
                : index === 0 && hoveredIndex !== 0
                ? "text-black"
                : card.textColor
            }`}
          >
            {loadingUserState ? <Loader /> : card.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
