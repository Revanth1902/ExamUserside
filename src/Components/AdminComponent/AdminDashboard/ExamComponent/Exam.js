import { useState, useEffect } from "react";
import axios from "axios";

import { useHistory, NavLink } from "react-router-dom";

function Exam() {
  //  ---------------------- add Exam & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard`);
  }

  function handleAddExam() {
    setDisplay({ display: "block" });
  }

  function handleCloseExam() {
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all Exam from db.json file-------------------------

  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function getAllExam() {
      let value = await axios.get("http://localhost:3333/Exam");
      setExams(value.data);
      //  console.log(exams);
    }
    getAllExam();
  }, []);

  // --------------------Adding Exam And re-render Exam component-----------------

  var date = new Date();
  var d =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: d + " " + t,
  });

  function handleInput(e) {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
    //  console.log(exam);
  }

  async function handleAddNewExam() {
    await axios.post("http://localhost:3333/Exam", exam);
    setStatus(true);
  }

  const [status, setStatus] = useState();

  // ----------------------------Deleting Exam-----------------------------------------------

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      let value = await axios.get("http://localhost:3333/question");
      setQuestions(value.data);
    }
    getAllQuestions();
  }, []);

  const [statusDeleteExam, setStatusDeleteExam] = useState();

  async function deleteExam(id) {
    //    console.log(id);

    for (let i = 0; i < questions.length; i++) {
      if (parseInt(questions[i].exam_id) === parseInt(id)) {
        // console.log(questions[i].id);
        await axios.delete(`http://localhost:3333/question/${questions[i].id}`);
      }
    }
    await axios.delete(`http://localhost:3333/exam/${id}`);
    setStatusDeleteExam(true);
  }

  if (status) return <Exam />;

  if (statusDeleteExam) return <Exam />;

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
                <th>Exam Name</th>
                <th className="d-none d-sm-table-cell">Exam Desc.</th>
                <th>Exam Creation Date</th>
                <th>Exam Level</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((data, i) => {
                return (
                  <tr key={i}>
                    <td className="pt-3">{data.exam_name}</td>
                    <td className="d-none d-sm-table-cell pt-3">
                      {data.exam_desc}
                    </td>
                    <td className="pt-3">{data.exam_date}</td>
                    <td className="pt-3">{data.exam_level}</td>
                    <td>
                      <NavLink
                        exact
                        to={`/AdminDashboard/Exam/Details/${data.id}`}
                      >
                        <button className="px-3 mx-1 my-1 rounded-pill">
                          Details
                        </button>
                      </NavLink>

                      <NavLink
                        exact
                        to={`/AdminDashboard/Exam/ViewQuestion/${data.id}`}
                      >
                        <button className="px-3 mx-1 my-1 rounded-pill">
                          View
                        </button>
                      </NavLink>

                      <NavLink
                        exact
                        to={`/AdminDashboard/Exam/AddQuestion/${data.id}`}
                      >
                        <button className="px-3 mx-1 my-1 rounded-pill">
                          Add
                        </button>
                      </NavLink>

                      <button
                        className="px-3 mx-1 my-1 rounded-pill"
                        onClick={() => deleteExam(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <button className="btn1 mx-2 rounded-pill" onClick={handleAddExam}>
            Add Exam
          </button>
          <button className="btn2 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div className="container mx-auto" style={display}>
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Subject Name{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_name"
              type="text"
              placeholder="Enter Subject Name"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Exam desc{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_desc"
              type="text"
              placeholder="Enter Exam des"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Exam Level{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_level"
              type="text"
              placeholder="Enter Exam Level"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Total Question{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_totalQuestion"
              type="text"
              placeholder="Enter Total Question"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Total Marks{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_marks"
              type="text"
              placeholder="Enter Total Marks"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Pass Marks{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              name="exam_passMarks"
              type="text"
              placeholder="Enter Pass Marks"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <div className="">
            <button
              className="btn1 col-12 col-lg-1 my-2 rounded-pill"
              onClick={handleAddNewExam}
            >
              Add
            </button>
            <button
              className="btn2 my-2 col-12 col-lg-1 mx-lg-1 rounded-pill"
              onClick={handleCloseExam}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exam;
