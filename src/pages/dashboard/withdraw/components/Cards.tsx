import React, { useState } from "react";
import CardSvg from "./CardSvg";
import { useGetWithdrawalsForState } from "@/hooks/Payments";
import Loader from "@/components/Loader";

function WithdrawCards() {
  const { data, isLoading, isError, error } = useGetWithdrawalsForState({});

  if (isError || (!data?.data?.payments && !isLoading)) {
    return (
      <div className="text-red-500 text-center font-semibold p-4 bg-red-100 rounded-lg">
        Error:{" "}
        {error?.message || "Failed to fetch withdrawal data. Please try again."}
      </div>
    );
  }

  const withdrawals = data?.data?.payments || [];

  const totalWithdrawals = withdrawals.length ?? "N/A";

  const totalWithdrawAmount =
    withdrawals.reduce((sum: any, w: any) => sum + w.amount, 0) ?? "N/A";

  const totalPendingWithdrawals =
    withdrawals.filter((w: any) => w.status === "pending").length ?? "N/A";

  const totalSendingWithdrawals =
    withdrawals.filter((w: any) => w.status === "sending").length ?? "N/A";

  const totalCompletedWithdrawals =
    withdrawals.filter(
      (w: any) => w.status !== "pending" && w.status !== "sending"
    ).length ?? "N/A";

  const totalSendingWithdrawAmount =
    withdrawals
      .filter((w: any) => w.status === "sending")
      .reduce((sum: any, w: any) => sum + w.amount, 0) ?? "N/A";

  const cardsData = [
    {
      title: "Total Withdraw",
      value: totalWithdrawals,
      bg: "bg-[#0059ff]",
      textColor: "text-white",
    },
    {
      title: "Total Withdraw Amount",
      value: `$${totalWithdrawAmount.toFixed(2)}`,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Pending Withdraw",
      value: totalPendingWithdrawals,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Sending Withdraw",
      value: totalSendingWithdrawals,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Ineligible Withdraw",
      value: totalCompletedWithdrawals,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Total Sending Withdraw Amount",
      value: `$${totalSendingWithdrawAmount.toFixed(2)}`,
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
            {isLoading ? <Loader /> : card.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WithdrawCards;
