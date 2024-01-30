// import style from "./AdminDashboard.module.css";

// import {useHistory} from "react-router-dom";

// import {NavLink , BrowserRouter , Switch , Route} from "react-router-dom";

//  import pic4 from "../../../images/logo.png";

// import Dashboard from "./Dashboard/Dashboard";
// import Subject from "./SubjectComponent/Subject";
// import Exam from "./ExamComponent/Exam";
// import Question from "./QuestionComponent/Question";
// import Result from "./ResultComponent/Result";
// import StudentList from "./StudentList/StudentList";
// import Student from "./StudentList/Student/Student";

// import Details from "./ExamComponent/DetailComponent/Details";
// import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
// import AddQuestion from "./ExamComponent/AddQuestion/AddQuestion";

// function AdminDashboard(){

//      let history = useHistory();

//      function goToAdminLogin(){
//           history.push("/AdminLogin");
//      }

//     return (
//         <>

//          <BrowserRouter>

//              <div id={style.header}>

//         <div id={style.headerHeadingBox}>
//             <h3>Online Exam System</h3>
//         </div>

//          <div id={style.headerMenuBox}>
//             <NavLink exact to="/AdminDashboard"> <span> Dashboard</span> </NavLink>
//             <a> <span onClick={goToAdminLogin}> Logout</span></a>
//          </div>
//     </div>

//             <div id={style.content}>

//             <div id={style.sideMenubar}>
//                      <div id={style.sideMenubarImageBox}>
//                        <img src= {pic4} alt="" />
//                      </div>

//                      <div id={style.sideMenubarList}>
//                         <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Subject"> <button > <span>  Subject </span></button></NavLink>
//                         <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Exam"> <button > <span>  Exam </span></button></NavLink>
//                         <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Question"> <button > <span>  Question </span></button></NavLink>
//                         <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Result"> <button > <span>  Result </span></button></NavLink>
//                         <NavLink exact className={style.removeUnderline} to="/AdminDashboard/StudentList"> <button > <span>  StudentList </span></button></NavLink>
//                     </div>
//                 </div>

//                 <div id={style.display}>

//           <Switch>
//   <Route exact path="/AdminDashboard" component={Dashboard}></Route>

//   <Route exact path="/AdminDashboard/Subject" component={Subject}></Route>
//   <Route exact path="/AdminDashboard/Exam" component={Exam}></Route>
//   <Route exact path="/AdminDashboard/Question" component={Question}></Route>
//   <Route exact path="/AdminDashboard/Result" component={Result}></Route>
//   <Route exact path="/AdminDashboard/StudentList" component={StudentList}></Route>

//       <Route exact path="/AdminDashboard/Exam/Details/:id" component={Details}></Route>
//       <Route exact path="/AdminDashboard/Exam/ViewQuestion/:id"
//       component={ViewQuestion}></Route>
//       <Route exact path="/AdminDashboard/Exam/AddQuestion/:id" component={AddQuestion}></Route>

//       <Route exact path="/AdminDashboard/StudentList/Details/:id" component={Student}></Route>

//           </Switch>

//                 </div>

//             </div>

//             </BrowserRouter>

//         </>
//     );
// }

// export default AdminDashboard;

import { useHistory } from "react-router-dom";

import { Link, BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Subject from "./SubjectComponent/Subject";
import Exam from "./ExamComponent/Exam";
import Question from "./QuestionComponent/Question";
import Result from "./ResultComponent/Result";
import StudentList from "./StudentList/StudentList";
import Student from "./StudentList/Student/Student";

import Details from "./ExamComponent/DetailComponent/Details";
import ViewQuestion from "./ExamComponent/ViewQuestion/ViewQuestion";
import AddQuestion from "./ExamComponent/AddQuestion/AddQuestion";

function AdminDashboard() {
  let history = useHistory();

  function goToAdminLogin() {
    history.push("/AdminLogin");
  }

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container py-2">
            <Link
              exact
              to="/AdminDashboard"
              className="navbar-brand fw-bold fs-4"
            >
              Online Exam System
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse align-middle"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto nav_ul align-items-center my-3 my-lg-0">
                <div className="d-flex flex-wrap justify-content-around">
                  <Link exact to="/AdminDashboard">
                    <button type="button" className="btn1 mx-2 rounded-pill">
                      Dashboard
                    </button>
                  </Link>

                  <Link onClick={goToAdminLogin}>
                    <button type="button" className="btn3 mx-2 rounded-pill">
                      Logout
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
            {/* end */}
          </div>
        </nav>

        <div class="container-fluid d-flex flex-wrap p-md-0 p-sm-0">
          <div class="row flex-column flex-md-row col-xl-2 col-md-12 col-sm-12 col m-md-0 m-sm-0">
            {/* <aside class="col-12 col-md-3 col-xl-2 p-0 bg-dark "> */}
            <aside class="p-0 bg-dark ">
              <nav
                class="navbar navbar-expand-md navbar-dark bd-dark flex-md-column flex-row align-items-center py-2 text-center sticky-top "
                id="sidebar"
              >
                <div class="text-center p-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    alt="profile_picture"
                    class="img-fluid rounded-circle my-4 p-1 d-none d-md-block shadow"
                  />
                  <Link
                    exact
                    to="/AdminDashboard"
                    class="navbar-brand mx-0 font-weight-bold  text-nowrap"
                  >
                    Arun Choudhary
                  </Link>
                </div>
                {/* <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#nav"
                  aria-controls="nav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button> */}

                <div class="collapse navbar-collapse order-last" id="navbarNav">
                  <ul class="navbar-nav flex-column w-100 justify-content-center">
                    <li class="nav-item">
                      <Link
                        exact
                        to="/AdminDashboard/Subject"
                        class="nav-link active"
                      >
                        {" "}
                        Subject
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link exact to="/AdminDashboard/Exam" class="nav-link">
                        {" "}
                        Exam
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        exact
                        to="/AdminDashboard/Question"
                        class="nav-link"
                      >
                        {" "}
                        Question{" "}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link exact to="/AdminDashboard/Result" class="nav-link">
                        {" "}
                        Result{" "}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        exact
                        to="/AdminDashboard/StudentList"
                        class="nav-link"
                      >
                        {" "}
                        Student List{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>
          </div>

          <div className="col-xl-10 col-md-12 col-sm-12 px-sm-0 px-lg-3 py-3 mx-auto">
            <Switch>
              <Route exact path="/AdminDashboard" component={Dashboard}></Route>

              <Route
                exact
                path="/AdminDashboard/Subject"
                component={Subject}
              ></Route>
              <Route exact path="/AdminDashboard/Exam" component={Exam}></Route>
              <Route
                exact
                path="/AdminDashboard/Question"
                component={Question}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Result"
                component={Result}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/StudentList"
                component={StudentList}
              ></Route>

              <Route
                exact
                path="/AdminDashboard/Exam/Details/:id"
                component={Details}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Exam/ViewQuestion/:id"
                component={ViewQuestion}
              ></Route>
              <Route
                exact
                path="/AdminDashboard/Exam/AddQuestion/:id"
                component={AddQuestion}
              ></Route>

              <Route
                exact
                path="/AdminDashboard/StudentList/Details/:id"
                component={Student}
              ></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default AdminDashboard;
