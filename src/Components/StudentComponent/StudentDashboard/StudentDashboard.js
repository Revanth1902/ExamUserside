//    import {NavLink , Switch , Route , BrowserRouter , useHistory} from "react-router-dom";

//    import { useEffect } from "react";

//     import style from "./StudentDashboard.module.css";

//     import Subject from "./Subject/Subject";

//     import Result from "./ResultComponent/Result";
// import Exam from "./ExamComponent/Exam";
// import Test from "./TestComponent/Test";

//       function StudentDashboard(){

//         useEffect( () => {
//                 if(sessionStorage.getItem("user") == null){
//                     alert("Detect Illegal Way of Entering");
//                     history.push("/StudentLogin");
//                 }
//         })

//          let history = useHistory();

//          function logout(){
//              sessionStorage.clear();
//             history.push("/StudentLogin");
//          }

//           return (
//               <>
//              <BrowserRouter>
//                  <div id={style.header}>

//                       <div id={style.headerHeadingBox}>
//                           <h3>Online Exam System</h3>
//                       </div>

//                         <div id={style.headerMenuBox}>
//                             <NavLink exact to="/StudentDashboard"> <span>Subject</span> </NavLink>
//                             <NavLink exact to="/StudentDashboard/Result"> <span>My Result</span></NavLink>
//                             <NavLink onClick={logout} exact to="/StudentLogin"> <span>Logout</span> </NavLink>
//                        </div>

//                    </div>

//                   <div id={style.displayBox}>
//                       <Switch>
//                            <Route exact path="/StudentDashboard" component={Subject} ></Route>
//                            <Route exact path="/StudentDashboard/Result" component={Result} ></Route>

//                            <Route exact path="/StudentDashboard/Exam/:category" component={Exam} ></Route>

//                            <Route exact path="/StudentDashboard/Exam/:category/:id" component={Test} ></Route>
//                       </Switch>
//                    </div>
//              </BrowserRouter>
//               </>
//           );
//       }

//       export default StudentDashboard;

import {
  Link,
  Switch,
  Route,
  BrowserRouter,
  useHistory,
} from "react-router-dom";

import { useEffect } from "react";

import style from "./StudentDashboard.module.css";

import Subject from "./Subject/Subject";

import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";

import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentDashboard() {
  useEffect(() => {
    if (Cookies.get("userToken") === undefined) {
      toast("Detect Illegal Way of Entering");
      history.push("/StudentLogin");
    }
  });

  let history = useHistory();

  function logout() {
    Cookies.remove();
    history.push("/StudentLogin");
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container py-2">
            <Link className="navbar-brand fw-bold fs-4" to="/">
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
            {/* means */}
            <div
              className="collapse navbar-collapse align-middle"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto nav_ul align-items-center">
                <div className="d-flex flex-wrap justify-content-around my-3 my-lg-0 ">
                  <Link exact to="/StudentDashboard">
                    <button type="button" className="btn1 mx-2 rounded-pill">
                      Subject
                    </button>
                  </Link>

                  <Link exact to="/StudentDashboard/Result">
                    <button type="button" className="btn2 mx-2 rounded-pill">
                      My Result
                    </button>
                  </Link>

                  <Link onClick={logout} exact to="/StudentLogin">
                    <button type="button" className="btn3 ms-2 rounded-pill">
                      Log Out
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
            {/* end */}
          </div>
        </nav>

        <div>
          <Switch>
            <Route exact path="/StudentDashboard" component={Subject}></Route>
            <Route
              exact
              path="/StudentDashboard/Result"
              component={Result}
            ></Route>

            <Route
              exact
              path="/StudentDashboard/Exam/:category"
              component={Exam}
            ></Route>

            <Route
              exact
              path="/StudentDashboard/Exam/:category/:id"
              component={Test}
            ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default StudentDashboard;
