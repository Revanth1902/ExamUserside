import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import style from "../../SubjectComponent/Subject.module.css";

function ViewQuestion() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------

  const [display, setDisplay] = useState({
    display: "none",
  });

  function handleEditQuestion(questionId) {
    setDisplay({ display: "block" });
    setDataInInputField(questionId);
  }

  function handleClose() {
    setDisplay({ display: "none" });
  }

  const { id } = useParams();

  //  ---------------------- Fetching All Questions -------------------------------------

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      let value = await axios.get("http://localhost:3333/question");
      setQuestions(value.data);
    }
    getAllQuestions();
  }, []);

  //  ---------------------- handling text field -------------------------------------

  const [updatedQ, setUpdatedQ] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id,
    subject_name: "",
  });

  function onTextFieldChange(e) {
    setUpdatedQ({
      ...updatedQ,
      [e.target.name]: e.target.value,
    });
  }

  //  ---------------------- Showing data in text field -------------------------------------

  // Id of current question clicked
  const [qId, setQId] = useState();

  function setDataInInputField(questionId) {
    setQId(questionId);

    for (let i = 0; i < questions.length; i++) {
      if (parseInt(questions[i].id) === parseInt(questionId)) {
        setUpdatedQ(questions[i]);
      }
    }
  }
  // -----------------------------------------------------------------------------------------

  const [check, setCheck] = useState();

  async function updateQuestion() {
    await axios.put(`http://localhost:3333/question/${qId}`, updatedQ);
    setCheck(true);
  }

  // ----------------------------------------------------------------------------------------

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }
  // ----------------------------------------------------------------------------------------

  const [d, setD] = useState();

  async function deleteQuestion(id) {
    await axios.delete(`http://localhost:3333/question/${id}`);
    setD(true);
  }

  if (check) return <ViewQuestion />;

  if (d) return <ViewQuestion />;

  return (
    <>
      <div className="container mx-auto px-0">
        <div className="mx-2">
          <h2>Question List</h2>
        </div>

        <div className="mx-auto px-0 container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead className="table-dark">
              <tr>
                <th>Question Name</th>
                <th className="d-none d-sm-table-cell">Option one</th>
                <th className="d-none d-sm-table-cell">Option two</th>
                <th className="d-none d-sm-table-cell">Option three</th>
                <th className="d-none d-sm-table-cell">Option four</th>
                <th>Question Answer</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((data, i) => {
                if (parseInt(data.exam_id) === parseInt(id)) {
                  return (
                    <tr key={i}>
                      <td className="pt-3">{data.question_name}</td>
                      <td className="d-none d-sm-table-cell pt-3">
                        {data.option_one}
                      </td>
                      <td className="d-none d-sm-table-cell pt-3">
                        {data.option_two}
                      </td>
                      <td className="d-none d-sm-table-cell pt-3">
                        {data.option_three}
                      </td>
                      <td className="d-none d-sm-table-cell pt-3">
                        {data.option_four}
                      </td>
                      <td className="pt-3">{data.question_answer}</td>
                      <td>
                        <button
                          className="px-3 mx-1 my-1 rounded-pill"
                          onClick={() => handleEditQuestion(data.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 mx-1 my-1 rounded-pill"
                          onClick={() => deleteQuestion(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }

                return <React.Fragment key={i}></React.Fragment>;
              })}
            </tbody>
          </table>
        </div>

        <div>
          <button className="btn3 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div className="container mx-auto" style={display}>
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Question{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.question_name}
              onChange={(e) => onTextFieldChange(e)}
              name="question_name"
              type="text"
              placeholder="Enter Question "
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option A{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.option_one}
              onChange={(e) => onTextFieldChange(e)}
              name="option_one"
              type="text"
              placeholder="Enter Option A"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option B{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.option_two}
              onChange={(e) => onTextFieldChange(e)}
              name="option_two"
              type="text"
              placeholder="Enter Option B"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option C{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.option_three}
              onChange={(e) => onTextFieldChange(e)}
              name="option_three"
              type="text"
              placeholder="Enter Option C"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option D{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.option_four}
              onChange={(e) => onTextFieldChange(e)}
              name="option_four"
              type="text"
              placeholder="Enter Option D"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Question Answer{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.question_answer}
              onChange={(e) => onTextFieldChange(e)}
              name="question_answer"
              type="text"
              placeholder="Enter Answer"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Subject{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              value={updatedQ.subject_name}
              onChange={(e) => onTextFieldChange(e)}
              name="subject_name"
              type="text"
              placeholder="Enter Subject"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <div className="">
            <button
              className="btn2 col-12 col-lg-1 my-2 rounded-pill"
              onClick={updateQuestion}
            >
              Update
            </button>
            <button
              className="btn3 my-2 col-12 col-lg-1 mx-lg-1 rounded-pill"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewQuestion;
