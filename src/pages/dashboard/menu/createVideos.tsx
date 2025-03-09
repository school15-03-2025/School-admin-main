import Modal from "@/components/modal";
import style from "./index.module.css";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CreateVideos = () => {
  const dataList = [
    {
      videoId: "NCWD562",
      topic: "Web dev",
      module: [100, 25],
      purchase: 3,
      moneyArrived: "125462 USD",
      residueMoney: "273 USD",
      transferMoney: "2732 USD",
      status: "active",
    },
    {
      videoId: "NCWD562",
      topic: "Web dev",
      module: [1, 0],
      purchase: 3,
      moneyArrived: "125462 USD",
      residueMoney: "273 USD",
      transferMoney: "2732 USD",
      status: "block",
    },
    {
      videoId: "NCWD562",
      topic: "Web dev",
      module: [1, 2],
      purchase: 3,
      moneyArrived: "125462 USD",
      residueMoney: "273 USD",
      transferMoney: "2732 USD",
      status: "suspend",
    },
    {
      videoId: "NCWD562",
      topic: "Web dev",
      module: [1, 0],
      purchase: 3,
      moneyArrived: "125462 USD",
      residueMoney: "273 USD",
      transferMoney: "2732 USD",
      status: "active",
    },
  ];

  const columnColors = [
    "#95A4FC",
    "#BAEDBD",
    "#C6C7F8",
    "#B1E3FF",
    "#A8C5DA",
    "#A1E3CB",
  ];
  const [columnOptions] = useState<ApexOptions>({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
      toolbar: {
        show: true, // Show the toolbar
        tools: {
          download: false, // Disable the export (download) option
        },
      },
    },
    colors: columnColors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Traffic by Device",
      align: "left",
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Linux", "Mac", "IOS", "Windows", "Android", "Other"],
      labels: {
        style: {
          // colors: columnColors,
          fontSize: "12px",
        },
      },
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const viewOrderData = (data: any) => {
    setModalOpen(true);
  };

  const closeModel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between mb-5 gap-3">
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Video</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Module</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Purchase people</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Money Arrived</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Residue Money</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total Transfer Money</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
      </div>
      <div className="flex justify-between mb-5 gap-3">
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total candidates</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl bg-white flex flex-col justify-between flex-1 py-4 px-4">
          <h4 className="flex justify-between items-start gap-1">
            <p className="font-semibold text-sm">Total exam participants</p>
            <span className="flex text-sm items-center font-light text-md gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.15385 16.7757H0.923077C0.678262 16.7757 0.443474 16.6913 0.270363 16.541C0.0972525 16.3908 0 16.187 0 15.9745V11.1669C0 10.9544 0.0972525 10.7506 0.270363 10.6003C0.443474 10.4501 0.678262 10.3656 0.923077 10.3656H2.15385C2.39866 10.3656 2.63345 10.4501 2.80656 10.6003C2.97967 10.7506 3.07692 10.9544 3.07692 11.1669V15.9745C3.07692 16.187 2.97967 16.3908 2.80656 16.541C2.63345 16.6913 2.39866 16.7757 2.15385 16.7757ZM10.7692 16.7757H9.53846C9.29365 16.7757 9.05886 16.6913 8.88575 16.541C8.71264 16.3908 8.61539 16.187 8.61539 15.9745V7.96185C8.61539 7.74934 8.71264 7.54554 8.88575 7.39527C9.05886 7.245 9.29365 7.16059 9.53846 7.16059H10.7692C11.014 7.16059 11.2488 7.245 11.4219 7.39527C11.5951 7.54554 11.6923 7.74934 11.6923 7.96185V15.9745C11.6923 16.187 11.5951 16.3908 11.4219 16.541C11.2488 16.6913 11.014 16.7757 10.7692 16.7757ZM15.0769 16.7757H13.8462C13.6013 16.7757 13.3666 16.6913 13.1934 16.541C13.0203 16.3908 12.9231 16.187 12.9231 15.9745V4.22262C12.9231 4.01012 13.0203 3.80631 13.1934 3.65605C13.3666 3.50578 13.6013 3.42136 13.8462 3.42136H15.0769C15.3217 3.42136 15.5565 3.50578 15.7296 3.65605C15.9027 3.80631 16 4.01012 16 4.22262V15.9745C16 16.187 15.9027 16.3908 15.7296 16.541C15.5565 16.6913 15.3217 16.7757 15.0769 16.7757ZM6.46154 16.7757H5.23077C4.98595 16.7757 4.75117 16.6913 4.57806 16.541C4.40494 16.3908 4.30769 16.187 4.30769 15.9745V1.55175C4.30769 1.33924 4.40494 1.13544 4.57806 0.985173C4.75117 0.834907 4.98595 0.750488 5.23077 0.750488H6.46154C6.70635 0.750488 6.94114 0.834907 7.11425 0.985173C7.28736 1.13544 7.38462 1.33924 7.38462 1.55175V15.9745C7.38462 16.187 7.28736 16.3908 7.11425 16.541C6.94114 16.6913 6.70635 16.7757 6.46154 16.7757Z"
                  fill="white"
                />
              </svg>
            </span>
          </h4>
          <div className="text-xl text-center m-2 font-semibold">7,265</div>
        </div>
        <div className="card rounded-xl flex flex-col justify-between flex-1 py-4 px-4"></div>
        <div className="card rounded-xl flex flex-col justify-between flex-1 py-4 px-4"></div>
        <div className="card rounded-xl flex flex-col justify-between flex-1 py-4 px-4"></div>
        <div className="card rounded-xl flex flex-col justify-between flex-1 py-4 px-4"></div>
      </div>

      <div className="flex gap-3 mt-3 justify-end">
        <div>
          <label htmlFor="search" className="w-full block">
            Search
          </label>
          <div className="flex items-center max-w-sm">
            <div className="relative w-full">
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 border border-gray-700 text-sm rounded-lg block w-full ps-10 p-3 pl-2 rounded-r-none"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-3 px-3 text-sm font-medium text-white bg-gray-700 rounded-lg rounded-l-none border border-gray-700 "
            >
              <svg
                className="w-4 h-5 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="types" className="w-full block">
            Type
          </label>
          <select
            name="types"
            className="border min-w-28 border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          >
            <option value={""}>All</option>
            <option value={"japan"}>Paid</option>
            <option value={"london"}>Non Paid</option>
          </select>
        </div>

        <div>
          <label htmlFor="topic" className="w-full block">
            Topic
          </label>
          <select
            name="topic"
            className="border min-w-28  border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          >
            <option value={""}>All</option>
            <option value={"web dev"}>Web dev</option>
            <option value={"App dev"}>App dev</option>
          </select>
        </div>

        <div>
          <label htmlFor="topic" className="w-full block">
            Status
          </label>
          <select
            name="topic"
            className="border min-w-28  border-gray-700 text-gray-900 text-sm p-3 rounded-lg"
          >
            <option value={""}>All</option>
            <option value={"active"}>Active</option>
            <option value={"suspend"}>Suspend</option>
            <option value={"block"}>Block</option>
          </select>
        </div>

        <div>
          <label htmlFor="dates" className="w-full block">
            Date
          </label>
          <div className="flex">
            <div className="flex border border-black rounded-lg rounded-r-none">
              <input
                type="date"
                name="startDate"
                className="border-none p-1 bg-transparent"
              />
              <span className="py-2 px-2">To</span>
              <input
                type="date"
                name="endDate"
                className="border-none p-1 bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-gray-700 rounded-lg rounded-l-none border border-gray-700 "
            >
              <svg
                className="w-4 h-4 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="w-full">
        <div className="w-full overflow-x-scroll">
          <table
            className={`bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden`}
          >
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  No.
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Videos ID
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Topic
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Module
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Purchase
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Money arrived
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Residue Money
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white">
                  Transfer Money
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left border-r border-[#1D4ED8] text-white ">
                  {" "}
                  Status
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white text-xs"
                >
                  <td className="py-4 px-2 border-r border-[#1D4ED8] text-center">
                    {" "}
                    <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-[#1D4ED8]">
                      {index + 1}
                    </span>
                  </td>
                  <td
                    className="py-4 px-3 border-r border-[#1D4ED8]"
                    onClick={viewOrderData}
                  >
                    {data.videoId}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.topic}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    <span className="text-[--active-color] font-semibold">
                      {data.module[0]}
                    </span>
                    /
                    <span className="text-[--block-color] font-semibold">
                      {data.module[1]}
                    </span>
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.purchase}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.moneyArrived}
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    <span
                      className={`h-8 flex text-xs items-center justify-center rounded-lg bg-[#D3D66D]`}
                    >
                      {data.residueMoney}
                    </span>
                  </td>
                  <td className="py-4 px-3 border-r border-[#1D4ED8]">
                    {data.transferMoney}
                  </td>
                  <td className="py-3 px-4 border-r relative border-[#1D4ED8] min-w-28">
                    <span
                      className={`relative h-8 min-w-8 flex text-white text-xs items-center justify-center rounded-lg ${
                        data.status + "-bg"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <button
                      type="button"
                      className="h-8 min-w-8 px-3 inline-flex text-white text-xs items-center justify-center rounded-lg bg-[#1D4ED8]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModel}
        title="Money Arrived History"
      >
        <div className="w-full card relative rounded-xl mt-8 bg-[--off-white-yellow-color] p-6">
          <ApexChart
            options={columnOptions}
            series={columnOptions.series}
            type="bar"
            height={250}
          />
          <div className="flex absolute top-4 right-4">
            <select
              name="year"
              className="border border-black rounded-lg p-1 bg-transparent"
            >
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateVideos;
