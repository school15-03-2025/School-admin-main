import React, { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaBan,
  FaExclamationTriangle,
  FaCreditCard,
} from "react-icons/fa";
import { useGetPaymentsForState } from "@/hooks/Payments";
import Loader from "@/components/Loader";

function Cards() {
  const { data, isLoading, isError, error } = useGetPaymentsForState({});

  if (isError) {
    return (
      <div className="text-red-500 text-center font-semibold p-4 rounded-lg">
        Error: {error?.message || "Something went wrong. Please try again."}
      </div>
    );
  }

  const payments = data?.data?.payments || [];

  const totalPayments = payments.length || "N/A";
  const totalPayAmount =
    payments.reduce((sum: any, payment: any) => sum + payment.amount, 0) ||
    "N/A";
  const totalPendingPayments =
    payments.filter((p: any) => p.status === "pending").length || "N/A";
  const totalAcceptedPayments =
    payments.filter((p: any) => p.status === "accepted").length || "N/A";
  const totalSpamPayments =
    payments.filter(
      (p: any) => p.status !== "accepted" && p.status !== "pending"
    ).length || "N/A";
  const totalSpamPayAmount =
    payments
      .filter((p: any) => p.status !== "accepted" && p.status !== "pending")
      .reduce((sum: any, payment: any) => sum + payment.amount, 0) || "N/A";

  const cardsData = [
    {
      title: "Total Payments",
      value: totalPayments,
      bg: "bg-[#0059ff]",
      textColor: "text-white",
      icon: <FaCreditCard />,
    },
    {
      title: "Total Pay Amount ($)",
      value: `$${totalPayAmount.toFixed?.(2) || "N/A"}`,
      bg: "bg-white",
      textColor: "text-black",
      icon: <FaCreditCard />,
    },
    {
      title: "Total Pending Payment",
      value: totalPendingPayments,
      bg: "bg-white",
      textColor: "text-black",
      icon: <FaClock />,
    },
    {
      title: "Total Accepted Payment",
      value: totalAcceptedPayments,
      bg: "bg-white",
      textColor: "text-black",
      icon: <FaCheckCircle />,
    },
    {
      title: "Total Spam Payments",
      value: totalSpamPayments,
      bg: "bg-white",
      textColor: "text-black",
      icon: <FaExclamationTriangle />,
    },
    {
      title: "Total Spam Pay Amount ($)",
      value: `$${totalSpamPayAmount.toFixed?.(2) || "N/A"}`,
      bg: "bg-white",
      textColor: "text-black",
      icon: <FaBan />,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
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
            <div
              className={`text-2xl ${
                hoveredIndex === index
                  ? "text-white"
                  : index === 0 && hoveredIndex !== 0
                  ? "text-black"
                  : card.textColor
              }`}
            >
              {card.icon}
            </div>
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

export default Cards;
