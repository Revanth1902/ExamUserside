import style from "../../SubjectComponent/Subject.module.css";

import axios from "axios";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: "",
  });

  useEffect(() => {
    async function getExamDetails() {
      const value = await axios.get(`http://localhost:3333/Exam/${id}`);
      setExam(value.data);
    }
    getExamDetails();
  }, [id]);

  // -------------------------Go back function---------------------------------------

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2">
          <h2>Exam Details</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead>
              <tr>
                <th className="table-dark">Exam Name</th>
                <td> {exam.exam_name} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam Description</th>
                <td> {exam.exam_desc} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam Creation Date</th>
                <td> {exam.exam_date} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam TotalMarks</th>
                <td> {exam.exam_marks} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam TotalQuestion</th>
                <td> {exam.exam_totalQuestion} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam PassMarks</th>
                <td> {exam.exam_passMarks} </td>
              </tr>

              <tr>
                <th className="table-dark">Exam Level</th>
                <td id={style.center}> {exam.exam_level} </td>
              </tr>
            </thead>
          </table>
        </div>

        <div>
          <button className="btn3 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Details;
