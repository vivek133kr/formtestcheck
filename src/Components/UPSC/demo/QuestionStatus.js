import React from "react";

const QuestionStatus = ({ number, text, circleColor }) => {
  const circleStyle = {
    backgroundColor: circleColor,
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="flex items-center gap-1 ">
      <div className="flex-none" style={circleStyle}>
        <span className="text-white font-medium text-center">{number}</span>
      </div>
      <span className="px-2px text-gray-700 font-normal">{text}</span>
    </div>
  );
};

export default QuestionStatus;
