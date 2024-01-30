import style from "./Subject.module.css";

import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

function Subject() {
  //  ---------------------- add Subject & close buttton working  -------------------------------------
  const [display, setDisplay] = useState({
    display: "none",
  });

  let history = useHistory();

  function handleGoBack() {
    history.push(`/AdminDashboard`);
  }

  function handleAddSubject() {
    setDisplay({ display: "block" });
  }

  function handleCloseAdd() {
    setDisplay({ display: "none" });
  }

  // --------------- Fetching all subjects from db.json file-------------------------

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function getAllSubject() {
      let value = await axios.get(
        "https://exambackend1.onrender.com/admin/getAllQuizName"
      );
      setSubjects(value.data.data);
      //  console.log(value.data[0].subject_name);
    }
    getAllSubject();
  }, []);

  // --------------------Adding Subject And re-render subject component-----------------

  const [subject, setSubject] = useState({
    name: "",
    description: "",
    key: "",
  });

  function handleInput(e) {
    setSubject({
      name: e.target.value,
      description: e.target.value,
      key: e.target.value,
    });
    //   console.log(subject);
  }

  async function handleAddNewSubject() {
    await axios.post(
      "https://exambackend1.onrender.com/admin/addQuiz",
      subject
    );
    setStatus(true);
  }

  const [status, setStatus] = useState();

  // ------------------------Deleting Subject and reload component------------------------------

  async function deleteSubject(_id) {
    await axios.delete(
      `https://exambackend1.onrender.com/admin/deleteQuiz/${_id}`
    );
    setStatusDelete(true);
  }

  const [statusDelete, setStatusDelete] = useState();

  if (statusDelete) return <Subject />;

  if (status) return <Subject />;

  // -------------------------------------------------------

  if (subjects.length === 0)
    return (
      <>
        <div id={style.content}>
          <div id={style.displayHeadingBox}>
            <h2>No Quiz Available</h2>
          </div>

          <div id={style.addSubjectBox}>
            <button onClick={handleAddSubject}>Add Quiz</button>
          </div>

          {/* Add Subject */}

          <div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Enter Quiz
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  placeholder="Enter Subject Name"
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>

            <div>
              <button onClick={handleAddNewSubject}>Add</button>
              <button onClick={handleCloseAdd}>Close</button>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="container mx-auto">
        <div className="mx-2">
          <h2>Quiz List</h2>
        </div>

        <div className="mx-auto container table responsive col-lg-12">
          <table className="table table-light table-stripped table-hover table-borderless">
            <thead className="table-dark">
              <tr>
                <th>Quiz Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>
                      <button
                        className="rounded-pill"
                        onClick={() => deleteSubject(data._id)}
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
          <button className="btn1 mx-2 rounded-pill" onClick={handleAddSubject}>
            Add Quiz
          </button>
          <button className="btn2 mx-2 rounded-pill" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        {/* Add Subject */}

        <div className="container mx-auto" style={display}>
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Quiz
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              type="text"
              placeholder="Enter Subject Name"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Description
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              type="text"
              placeholder="Enter Description"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <label for="inputPassword" class="col-sm-2 col-form-label">
            Enter Key
          </label>
          <div class="col-sm-10 my-2">
            <input
              onChange={(e) => handleInput(e)}
              type="text"
              placeholder="Enter Key"
              class="form-control"
              id="inputPassword"
            />
          </div>

          <div className="">
            <button
              className="btn1 col-12 col-lg-1 my-2 rounded-pill"
              onClick={handleAddNewSubject}
            >
              Add
            </button>
            <button
              className="btn2 my-2 col-12 col-lg-1 mx-lg-1 rounded-pill"
              onClick={handleCloseAdd}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subject;
