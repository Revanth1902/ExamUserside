//    import style from "./Question.module.css";

import { useHistory } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";

function Question() {
  const [questions, setQuestions] = useState([]);

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard`);
  }

  useEffect(() => {
    async function getAllQuestions() {
      const value = await axios.get("http://localhost:3333/question");
      setQuestions(value.data);
    }
    getAllQuestions();
  }, []);

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
                <th className="d-none d-sm-table-cell">Option Four</th>
                <th>Question Answer</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.question_name}</td>
                    <td className="d-none d-sm-table-cell">
                      {data.option_one}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {data.option_two}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {data.option_three}
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {data.option_four}
                    </td>
                    <td>{data.question_answer}</td>
                    <td>{data.subject_name}</td>
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

export default Question;
