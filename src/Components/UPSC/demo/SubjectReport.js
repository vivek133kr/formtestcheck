import React from "react";

const SubjectReport = ({ subjectWiseData }) => {
  return (
    <div className="flex flex-col items-center my-16 mx-4">
      <h4 className="font-medium text-center">
        Subject-wise Performance Analysis:
      </h4>
      <div className="flex w-1/3 mt-4 ">
        <div className="bg-[#FAFBFC] rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.25)] p-8 w-full">
          {subjectWiseData.map((subject, index) => (
            <div
              className="flex items-center justify-between mb-2"
              key={index}
            >
              <span className="text-base font-medium p-2">
                {subject.question__subject__name}
              </span>
              <div className="flex items-center justify-center bg-orange-500 rounded px-2 py-1">
                <span className="text-white">
                  {subject.correct_answers}/{subject.total_questions}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectReport;


