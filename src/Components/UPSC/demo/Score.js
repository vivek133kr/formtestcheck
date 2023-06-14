import React from "react";
import ChartComponent from "./ChartComponent";

const Score = ({ name, report }) => {
  console.log("Scorereport", report);

  return (
    <div className="flex py-5 mx-20 items-center">
      <div className="w-2/5 align-middle ">
        <div className="flex flex-col items-center gap-1 align-middle">
          <span className="text-gray-700 font-normal">
            Dear {name}, You have scored
          </span>
          <span className="text-green-500 font-medium text-4xl">
            {report && report.correct} / {report && report.correct + report.wrong + report.unattempted}
          </span>
          <span className="text-red-600 font-bold">
            Your Rank: {Math.floor(Math.random() * (970 - 950 + 1)) + 950}
          </span>
        </div>
      </div>
      <div className="w-3/5 relative">
        <div className="mx-auto w-3/5 overflow-hidden">
          <ChartComponent report={report} />
        </div>
      </div>
    </div>
  );
};

export default Score;
