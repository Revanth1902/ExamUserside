import axios from "axios";

import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

function Result() {
  const [results, setResults] = useState([]);

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }

  useEffect(() => {
    async function getAllResults() {
      let value = await axios.get("http://localhost:3333/result");
      setResults(value.data);
    }
    getAllResults();
  }, []);

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2">
          <h2>Exam List</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead className="table-dark">
              <tr>
                <th>User Email</th>
                <th>Exam Name</th>
                <th className="d-none d-sm-table-cell">Exam Date</th>
                <th>Result Status</th>
                <th>Your Score</th>
                <th className="d-none d-sm-table-cell">Total Marks</th>
                <th className="d-none d-sm-table-cell">Total Question</th>
              </tr>
            </thead>
            <tbody>
              {results.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.user_email}</td>
                    <td>{data.exam_name}</td>
                    <td className="d-none d-sm-table-cell">{data.exam_date}</td>
                    <td>{data.result_status}</td>
                    <td>{data.result_score}</td>
                    <td className="d-none d-sm-table-cell">
                      {data.total_marks}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {data.total_Question}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <button className="btn2 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
