import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

function Exam() {
  let { category } = useParams();

  const [allExam, setAllExam] = useState([]);

  useEffect(() => {
    async function getAllExams() {
      let value = await axios.get("http://localhost:3333/exam");
      setAllExam(value.data);
    }
    getAllExams();
  }, []);

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2 my-3">
          <h2>All {category} Exam</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          {allExam.map((data, i) => {
            if (data.exam_name === category) {
              return (
                <table
                  className="table table-light table-stripped table-hover table-borderless"
                  key={i}
                >
                  <thead className="table-dark">
                    <tr>
                      <th>{data.exam_name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Exam ID: {data.id}</td>
                    </tr>
                    <tr>
                      <td>Exam Description: {data.exam_desc}</td>
                    </tr>
                    <tr>
                      <td>Pass Marks:{data.exam_passMarks}</td>
                    </tr>
                    <tr>
                      <td>Total Marks:{data.exam_marks}</td>
                    </tr>
                    <tr>
                      <td>
                        <NavLink
                          exact
                          to={`/StudentDashboard/Exam/Maths/${data.id}`}
                          class="card-link"
                        >
                          Go to Exam
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            }
            return <React.Fragment key={i}></React.Fragment>;
          })}
        </div>
      </div>
    </>
  );
}
export default Exam;
