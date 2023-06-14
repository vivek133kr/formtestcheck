import React from "react";
import { useRouter } from "next/router";
import QuizComponent from "../../../Components/UPSC/QuizPage/demoquiz/QuizComponent";

function QuizPage() {
  const router = useRouter();
  const { studentId } = router.query;

  return (
    <div>
      {/* Pass necessary props to QuizComponent2 */}
      <QuizComponent studentId={studentId} />
    </div>
  );
}

export default QuizPage;