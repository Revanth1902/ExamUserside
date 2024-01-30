import { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function AddQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id,
    subject_name: "",
  });

  function onInputChange(e) {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  }

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard/Exam`);
  }

  async function addnewQuestion() {
    await axios.post("http://localhost:3333/question", question);
    history.push(`/AdminDashboard/Exam/ViewQuestion/${id}`);
  }

  return (
    <>
      <div className="container mx-auto px-0 ">
        <div className="mx-2">
          <h2>Adding Question</h2>
        </div>
        <div className="container mx-auto">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Question Name{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="question_name"
              type="text"
              placeholder="Enter Question"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option A{" "}
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="option_one"
              type="text"
              placeholder="Enter Option A"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option B
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="option_two"
              type="text"
              placeholder="Enter Option B"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option C
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="option_three"
              type="text"
              placeholder="Enter Option C"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Option D
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="option_four"
              type="text"
              placeholder="Enter Option D"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Question Answer
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="question_answer"
              type="text"
              placeholder="Enter Question answer (don't write option A,B,C,D)"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Subject
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => onInputChange(e)}
              name="subject_name"
              type="text"
              placeholder="Enter Subject"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <div className="">
            <button
              className="btn1 col-12 col-lg-1 my-2 rounded-pill"
              onClick={addnewQuestion}
            >
              Add
            </button>
            <button
              className="btn2 my-2 col-12 col-lg-1 mx-lg-1 rounded-pill"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
        s
      </div>
    </>
  );
}

export default AddQuestion;
