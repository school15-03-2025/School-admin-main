import React, { useState } from "react";
import CardSvg from "../../withdraw/components/CardSvg";
import { useGetCourseStats } from "@/hooks/Courses";
import Loader from "@/components/Loader";

export default function Card() {
  const { data: courseState, isError, isLoading, error } = useGetCourseStats();

  const stats = [
    { title: "Total Courses", value: courseState?.totalCourses },
    { title: "Total Ongoing Courses", value: courseState?.totalOngoingCourses },
    { title: "Total Waiting Courses", value: courseState?.totalWaitingCourses },
    { title: "Total Live Courses", value: courseState?.totalLiveCourses },
    { title: "Total Ended Courses", value: courseState?.totalEndedCourses },
    { title: "Total Course Purchase", value: courseState?.totalCoursePurchase },
    { title: "Total Money Arrived", value: courseState?.totalMoneyArrived },
    {
      title: "Total Transferred Money",
      value: courseState?.totalTransferredMoney,
    },
    { title: "Total Remaining Money", value: courseState?.totalRemainingMoney },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
      {isLoading && <Loader />}
      {isError && (
        <div className="col-span-full flex justify-center items-center h-40 text-red-500">
          <p className="text-lg font-semibold">
            Error: {error?.message || "Failed to load data"}
          </p>
        </div>
      )}
      {!isLoading &&
        !isError &&
        stats.map((stat, index) => (
          <div
            key={index}
            className={`card rounded-xl flex flex-col justify-between flex-1 py-4 px-4 transition-colors duration-300 ${
              hoveredIndex === index
                ? "bg-[#0059ff] text-white"
                : index === 0 && hoveredIndex !== 0
                ? "bg-white text-black"
                : "bg-white text-black" //ensure all white cards have black text.
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <h4 className="flex justify-between items-start gap-1">
              <p
                className={`font-semibold text-sm ${
                  hoveredIndex === index
                    ? "text-white"
                    : index === 0 && hoveredIndex !== 0
                    ? "text-black"
                    : "text-black" //ensure all white cards have black text.
                }`}
              >
                {stat.title}
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
            </h4>
            <div className="text-xl text-right mt-2 font-semibold">
              {stat.value ?? "Nothing"}
            </div>
          </div>
        ))}
    </div>
  );
}
