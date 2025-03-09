import React from "react";
import CardSvg from "../../withdraw/components/CardSvg";
import { useGetExamineeStats } from "@/hooks/Examinee";
import Loader from "@/components/Loader";
import { useGetExaminationStats } from "@/hooks/Examination";

function Cards() {
  // const { data, isLoading, isError, error } = useGetExamineeStats();
  const { data, isLoading, isError, error } = useGetExaminationStats();
  const stats = [
    {
      title: "Total Examination Rooms",
      value: data?.totalExaminationRooms ?? 0,
    },
    {
      title: "Total Candidate,",
      value: data?.totalCandidate ?? 0,
    },
    {
      title: "Total Exam Participants",
      value: data?.totalExamParticipants ?? 0,
    },
    {
      title: "Total Non Exam Participants",
      value: data?.totalNonExamParticipants ?? 0,
    },
  ];

  return (
    <div className="flex justify-between mb-5 gap-3">
      {isLoading && <Loader />}
      {isError && (
        <div className="col-span-full flex justify-center items-center h-40 text-red-500">
          <p className="text-lg font-semibold">
            Error: {error?.message || "Failed to load data"}
          </p>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`card rounded-xl flex flex-col justify-between flex-1 py-4 px-4 ${
                index === 0 ? "bg-[#0059ff] text-white" : "bg-white"
              }`}
            >
              <h4 className="flex justify-between items-start gap-1">
                <p className="font-semibold text-sm">{stat.title}</p>
                <span className="flex text-sm items-center font-light text-md gap-2">
                  <CardSvg color={index === 0 ? "white" : "black"} />
                </span>
              </h4>
              <div className="text-xl text-center m-2 font-semibold">
                {stat.value.toLocaleString()}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Cards;
