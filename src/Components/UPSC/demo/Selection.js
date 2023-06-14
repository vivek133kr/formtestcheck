import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReportOverview from "./ReportOverview";
import axios from "axios";

const Selection = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://34.93.138.253/api/v1/quiz/report/?student_id=${studentId}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div className="container">
      <h2 className="text-center">Good Attempt ({data && data.name})</h2>
      {data && <ReportOverview data={data} />}
    </div>
  );
};

export default Selection;
