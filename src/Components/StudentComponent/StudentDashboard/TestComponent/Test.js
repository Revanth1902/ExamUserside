import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function Test() {
  // ---------------------------------------------------------
  let { id } = useParams();
  let { category } = useParams();

  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    async function getAllQuestions() {
      let value = await axios.get("http://localhost:3333/question");
      setAllQuestions(value.data);
    }
    getAllQuestions();
  }, []);

  // ---------------------------------------------------------

  // const [userAnswer , setUserAnswer] = useState({
  //     answer1:"",
  //     answer2:"",
  //     answer3:"",
  // });

  const [answer, setAnswer] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
  });

  let correctAnswer = [];

  function onRadioButtonChange(e) {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  }

  let count = 0;

  async function submitTest() {
    for (let i = 0; i < allQuestions.length; i++) {
      if (parseInt(allQuestions[i].exam_id) === parseInt(id)) {
        correctAnswer.push(allQuestions[i].question_answer);
      }
    }

    // console.log(answer);
    // console.log(correctAnswer);

    let score = 0;
    let status = "";

    if (correctAnswer[0] === answer.answer1) score++;
    if (correctAnswer[1] === answer.answer2) score++;
    if (correctAnswer[2] === answer.answer3) score++;
    if (correctAnswer[3] === answer.answer4) score++;
    if (correctAnswer[4] === answer.answer5) score++;

    // console.log(score);

    if (score >= 3) status = "Pass";
    else status = "Fail";

    var date = new Date();
    var d =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let data = {
      result_status: status,
      result_score: score,
      user_email: sessionStorage.getItem("user"),
      exam_date: d + " " + t,
      exam_name: category,
      total_marks: "5",
      exam_id: id,
      total_Question: "5",
    };

    await axios.post("http://localhost:3333/result", data);
    history.push("/StudentDashboard/Result");
  }

  let history = useHistory();

  return (
    <>
      <div className="my-3 container mx-auto">
        <h2>Answer all the questions</h2>
      </div>
      <div className="container mx-auto">
        {allQuestions.map((data, i) => {
          if (parseInt(data.exam_id) === parseInt(id)) {
            count++;
            return (
              <table class="table table-borderless" key={i}>
                <tbody>
                  <tr>
                    <th
                      style={{ border: "none" }}
                      className="d-flex align-items-center table-dark"
                    >
                      {data.question_name}
                    </th>
                  </tr>

                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}>
                      <div className="d-flex align-items-center">
                        <input
                          onChange={(e) => onRadioButtonChange(e)}
                          value={data.option_one}
                          name={"answer" + count}
                          type="radio"
                        />
                        <label className="ms-2" htmlFor="option1">
                          {data.option_one}
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}>
                      <div className="d-flex align-items-center">
                        <input
                          onChange={(e) => onRadioButtonChange(e)}
                          value={data.option_two}
                          name={"answer" + count}
                          type="radio"
                        />
                        <label className="ms-2" htmlFor="option2">
                          {data.option_two}
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}>
                      <div className="d-flex align-items-center">
                        <input
                          onChange={(e) => onRadioButtonChange(e)}
                          value={data.option_three}
                          name={"answer" + count}
                          type="radio"
                        />
                        <label className="ms-2" htmlFor="option3">
                          {data.option_three}
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr style={{ border: "none" }}>
                    <td style={{ border: "none" }}>
                      <div className="d-flex align-items-center">
                        <input
                          onChange={(e) => onRadioButtonChange(e)}
                          value={data.option_four}
                          name={"answer" + count}
                          type="radio"
                        />
                        <label className="ms-2" htmlFor="option4">
                          {data.option_four}
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          }
          return <React.Fragment key={i}></React.Fragment>;
        })}

        <div>
          <button className="btn2 mx-2 rounded-pill" onClick={submitTest}>
            Submit Exam
          </button>
        </div>
      </div>
    </>
  );
}

export default Test;
