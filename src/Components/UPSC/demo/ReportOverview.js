import React from "react";
import QuestionStatus from "./QuestionStatus";
import Score from "./Score";
import SubjectReport from "./SubjectReport";

export default function ReportOverview({ data }) {
  const { name, report, subject_wise } = data;

  const total = report.correct + report.wrong + report.unattempted;

  const questionStatusData = [
    {
      number: report.correct,
      text: "Questions answered correctly",
      circleColor: "#27B446"
    },
    {
      number: report.wrong,
      text: "Questions answered incorrectly",
      circleColor: "#E00000"
    },
    {
      number: report.unattempted,
      text: "Questions unattempted",
      circleColor: "#393B3F"
    }
  ];

  return (
    <section>
      <h5>Report Overview:</h5>
      <h6>Test Name Text:</h6>

      <div className="container border-2 border-black py-12 rounded">
        <div className="flex rounded bg-[#F2F9FF] py-4 gap-7 justify-center">
          {questionStatusData.map((data, index) => (
          <QuestionStatus
              key={index}
              number={data.number}
              text={data.text}
              circleColor={data.circleColor}
          />
          ))}
        </div>
        <Score
          name={name}
          report={report}
          total={total}
          rank={data.rank}
        />
      </div>

      <SubjectReport subjectWiseData={subject_wise} />
    </section>
  );
}
