// import style from "./Dashboard.module.css";

// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// function Dashboard() {
//   const [exam, setExam] = useState("Updating...");
//   const [question, setQuestion] = useState("Updating...");
//   const [user, setUser] = useState("Updating...");

//   useEffect(() => {
//     async function getAllExam() {
//       let value = await axios.get("http://localhost:3333/exam");
//       setExam("We have total " + value.data.length + " exam");
//     }
//     getAllExam();

//     async function getAllQuestions() {
//       let value = await axios.get("http://localhost:3333/question");
//       setQuestion("We have total " + value.data.length + " question");
//     }
//     getAllQuestions();

//     async function getAllUsers() {
//       let value = await axios.get("http://localhost:3333/user");
//       setUser("We have total " + value.data.length + " user");
//     }
//     getAllUsers();
//   });

//   let history = useHistory();

//   function showExam() {
//     history.push("/AdminDashboard/Exam");
//   }

//   function showQuestions() {
//     history.push("/AdminDashboard/Question");
//   }

//   function showUsers() {
//     history.push("/AdminDashboard/StudentList");
//   }

//   return (
//     <>
//       <div id={style.displayHeadingBox}>
//         <h1>Dashboard</h1>
//       </div>

//       <div id={style.box1}>
//         <p id={style.countOfExam}>{exam}</p>
//         <button onClick={showExam}>View Details</button>
//       </div>

//       <div id={style.box2}>
//         <p id={style.countOfQuestion}>{question}</p>
//         <button onClick={showQuestions}>View Details</button>
//       </div>

//       <div id={style.box3}>
//         <p id={style.countOfUser}>{user}</p>
//         <button onClick={showUsers}>View Details</button>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [exam, setExam] = useState("Updating...");
  const [question, setQuestion] = useState("Updating...");
  const [user, setUser] = useState("Updating...");

  useEffect(() => {
    async function getAllExam() {
      let value = await axios.get(
        "https://exambackend1.onrender.com/admin/getAllQuizName"
      );
      setExam("We have total " + value.data.data.length + " exam");
    }
    getAllExam();

    async function getAllQuestions() {
      let value = await axios.get(
        "https://exambackend1.onrender.com/admin/getAllQuestions"
      );
      setQuestion("We have total " + value.data.data.length + " question");
    }
    getAllQuestions();

    async function getAllUsers() {
      let value = await axios.get("http://localhost:3333/user");
      setUser("We have total " + value.data.length + " user");
    }
    getAllUsers();
  });

  let history = useHistory();

  function showExam() {
    history.push("/AdminDashboard/Exam");
  }

  function showQuestions() {
    history.push("/AdminDashboard/Question");
  }

  function showUsers() {
    history.push("/AdminDashboard/StudentList");
  }

  return (
    <>
      <div className="container col-xl-12 mx-auto">
        <div>
          <h1>Dashboard</h1>
        </div>

        <div class="row">
          <div class="col-xl-4 col-md mt-md-3 mt-sm-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{exam}</h5>
                <p class="card-text">
                  {exam}, We have to check Exam list here.
                </p>
                <Link onClick={showExam} class="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md mt-md-3 mt-sm-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{question}</h5>
                <p class="card-text">
                  {question}, We have to check Question list here.
                </p>
                <Link onClick={showQuestions} class="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md mt-md-3 mt-sm-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{user}</h5>
                <p class="card-text">
                  {user}, We have to check User list here.
                </p>
                <Link onClick={showUsers} class="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
