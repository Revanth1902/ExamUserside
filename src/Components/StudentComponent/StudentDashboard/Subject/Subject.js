// //    import style from "../StudentDashboard.module.css";

// //      import {useState , useEffect} from "react";
// //      import axios from "axios";

// //      import {NavLink} from "react-router-dom";

// //      function Subject(){

// //   const [allSubject , setAllSubject] = useState([]);

// //   useEffect(() => {
// //       async function getAllSubject(){
// //           let value = await axios.get("http://localhost:3333/subject");
// //           setAllSubject(value.data);
// //       }
// //       getAllSubject();
// //   },[])

// //          return (
// //                <>
// //                   <div id={style.displayBoxHeadingBox}>
// //                        <h1>Choose Subjects</h1>
// //                   </div>

// //                   {
// //                       allSubject.map((data , i) => {
// //                           return (
// //                               <div id={style.displayBoxSubjectBox} key={i}>

// //                                  <div id={style.subjectText}>
// //                                      <span>{data.subject_name}</span>
// //                                  </div>

// //                                 <div id={style.subjectButton}>
// //                                      <NavLink exact to={`/StudentDashboard/Exam/${data.subject_name}`}>
// //                                        <button>Go to Exam</button>
// //                                      </NavLink>
// //                                 </div>
// //                            </div>
// //                           );
// //                       })
// //                   }
// //                </>
// //          );
// //      }

// //     export default Subject;

// import { useState, useEffect } from "react";
// import axios from "axios";

// import { NavLink } from "react-router-dom";

// function Subject() {
//   const [allSubject, setAllSubject] = useState([]);

//   useEffect(() => {
//     async function getAllSubject() {
//       let value = await axios.get("http://localhost:3333/subject");
//       setAllSubject(value.data);
//     }
//     getAllSubject();
//   }, []);

//   return (
//     <>
//       <div className="my-3 container mx-auto">
//         <h2>Choose Subject</h2>
//       </div>
//       <div class="row row-cols-1 row-cols-md-2 g-4 my-2 container mx-auto">
//         {allSubject.map((data, i) => {
//           return (
//             <div class="col" key={i}>
//               <div class="card">
//                 <img
//                   src="https://1.bp.blogspot.com/-jb2R1CTYbFs/XvdDQ7BILyI/AAAAAAAAAgg/F0K-ILF7zc0L9LeFPakprPvN48fE_qW4QCK4BGAsYHg/s1950/16.jpg"
//                   class="card-img-top"
//                   alt="..."
//                 />
//                 <div class="card-body">
//                   <h5 class="card-title">{data.subject_name}</h5>
//                   <p class="card-text">
//                     Some quick example text to build on the card title and make
//                     up the bulk of the card's content.
//                   </p>
//                 </div>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item">Total Question :- 40</li>
//                   <li class="list-group-item">Total Time :- 1 Hour</li>
//                   <li class="list-group-item">No Negative Mark</li>
//                 </ul>
//                 <div class="card-body">
//                   <NavLink
//                     exact
//                     to={`/StudentDashboard/Exam/${data.subject_name}`}
//                     class="card-link"
//                   >
//                     Go To Exam
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Subject;

//    import style from "../StudentDashboard.module.css";

//      import {useState , useEffect} from "react";
//      import axios from "axios";

//      import {NavLink} from "react-router-dom";

//      function Subject(){

//   const [allSubject , setAllSubject] = useState([]);

//   useEffect(() => {
//       async function getAllSubject(){
//           let value = await axios.get("http://localhost:3333/subject");
//           setAllSubject(value.data);
//       }
//       getAllSubject();
//   },[])

//          return (
//                <>
//                   <div id={style.displayBoxHeadingBox}>
//                        <h1>Choose Subjects</h1>
//                   </div>

//                   {
//                       allSubject.map((data , i) => {
//                           return (
//                               <div id={style.displayBoxSubjectBox} key={i}>

//                                  <div id={style.subjectText}>
//                                      <span>{data.subject_name}</span>
//                                  </div>

//                                 <div id={style.subjectButton}>
//                                      <NavLink exact to={`/StudentDashboard/Exam/${data.subject_name}`}>
//                                        <button>Go to Exam</button>
//                                      </NavLink>
//                                 </div>
//                            </div>
//                           );
//                       })
//                   }
//                </>
//          );
//      }

//     export default Subject;

import "./subject.css";
import { useState, useEffect } from "react";
import axios from "axios";

import React from "react";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavLink } from "react-router-dom";

function Subject() {
  const [allSubject, setAllSubject] = useState([]);
  const [weeklyNoOffElement, setweeklyNoOffElement] = useState(4);
  const [monthlyNoOffElement, setmonthlyNoOffElement] = useState(4);
  const [pweeklyNoOffElement, setpweeklyNoOffElement] = useState(4);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    async function getAllSubject() {
      let value = await axios.get("http://localhost:3333/subject");
      setAllSubject(value.data);
    }
    getAllSubject();
  }, []);

  const slice = allSubject.slice(0, weeklyNoOffElement);

  const loadMore = () => {
    setweeklyNoOffElement(weeklyNoOffElement + weeklyNoOffElement);
  };

  const monthlySlice = allSubject.slice(0, monthlyNoOffElement);

  const monthlyLoadMore = () => {
    setmonthlyNoOffElement(monthlyNoOffElement + monthlyNoOffElement);
  };

  const pslice = allSubject.slice(0, pweeklyNoOffElement);

  const ploadMore = () => {
    setpweeklyNoOffElement(pweeklyNoOffElement + pweeklyNoOffElement);
  };

  const MockModel = () => {
    const [acceptTerms, setTerms] = useState(false);

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
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#22222280",
            zIndex: 1,
          }}
        ></div>
        <div className="mock-model-con">
          <h1>Mock Test</h1>
          <p>
            Welcome to the upcoming Multiple Choice Question (MCQ) test! This
            assessment is designed to evaluate your understanding of the
            material and assess your knowledge on various topics. It's important
            to note that this test includes negative marking, meaning that
            incorrect answers will result in a deduction of points. Therefore,
            it is advised to approach each question carefully, weigh your
            options, and only select an answer when you are confident in your
            choice. This format aims to encourage thoughtful consideration and
            discourage random guessing. Best of luck, and let your knowledge
            shine through!
          </p>
          <h5>Total Marks : 100</h5>
          <h5>CutOff Marks : 30</h5>
          <h5>Exam Time : 45 Mins</h5>
          <div>
            <input
              onChange={() => {
                setTerms(!acceptTerms);
              }}
              checked={acceptTerms}
              type="checkbox"
            />
            <p>Accept The Terms and Condition</p>
          </div>
          <button
            onClick={() => {
              if (acceptTerms === false) {
                toast("Please Accept Terms and conditions");
              } else {
                window.location.href = "/mockmcq";
              }
            }}
            button="button"
          >
            Go To Exam
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {showModel && <MockModel />}
      <section className="py-4 container">
        <h2 className="pt-4 text-center text-lg-start">
          Current Affair <span class="badge bg-secondary">New</span>
        </h2>
        <h3 className="pb-2 text-center">
          <span class="badge bg-secondary">Weekly</span> Current Affair
        </h3>
        <div className="row justify-content-center">
          {slice.map((item, index) => {
            return (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img
                    src="https://1.bp.blogspot.com/-jb2R1CTYbFs/XvdDQ7BILyI/AAAAAAAAAgg/F0K-ILF7zc0L9LeFPakprPvN48fE_qW4QCK4BGAsYHg/s1950/16.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.subject_name}</h5>
                    <div className="text-center">
                      <button type="button" class="btn btn-secondary">
                        <NavLink
                          exact
                          to={`/StudentDashboard/Exam/${item.subject_name}`}
                          class="card-link text-white text-decoration-none"
                        >
                          Go To Exam
                        </NavLink>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-dark d-block w-100"
          onClick={() => loadMore()}
        >
          Load More
        </button>
      </section>

      <hr />

      <section className="py-4 container">
        <h3 className="pb-2 text-center">
          <span class="badge bg-secondary">Monthly</span> Current Affair
        </h3>
        <div className="row justify-content-center">
          {monthlySlice.map((item, index) => {
            return (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img
                    src="https://1.bp.blogspot.com/-jb2R1CTYbFs/XvdDQ7BILyI/AAAAAAAAAgg/F0K-ILF7zc0L9LeFPakprPvN48fE_qW4QCK4BGAsYHg/s1950/16.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.subject_name}</h5>
                    <div className="text-center">
                      <button type="button" class="btn btn-secondary">
                        <NavLink
                          exact
                          to={`/StudentDashboard/Exam/${item.subject_name}`}
                          class="card-link text-white text-decoration-none"
                        >
                          Go To Exam
                        </NavLink>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-dark d-block w-100"
          onClick={() => monthlyLoadMore()}
        >
          Load More
        </button>
      </section>

      <hr />

      <section className="py-4 container">
        <h2 className="pb-4 text-center text-lg-start">
          Previous year Paper <span class="badge bg-secondary">New</span>
        </h2>
        <div className="row justify-content-center">
          {pslice.map((item, index) => {
            return (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img
                    src="https://1.bp.blogspot.com/-jb2R1CTYbFs/XvdDQ7BILyI/AAAAAAAAAgg/F0K-ILF7zc0L9LeFPakprPvN48fE_qW4QCK4BGAsYHg/s1950/16.jpg"
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.subject_name}</h5>
                    <div className="text-center">
                      <button type="button" class="btn btn-secondary">
                        <NavLink
                          exact
                          to={`/StudentDashboard/Exam/${item.subject_name}`}
                          class="card-link text-white text-decoration-none"
                        >
                          Go To Exam
                        </NavLink>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-dark d-block w-100"
          onClick={() => ploadMore()}
        >
          Load More
        </button>
      </section>

      <hr />

      <div class="container py-4">
        <h2 className="text-center text-lg-start">
          Quiz by Custom Subject / Topic{" "}
          <span class="badge bg-secondary">New</span>
        </h2>
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-8 col-lg-6">
            <div class="container bg-white rounded my-2 px-0">
              <div class="py-1 bg-info text-white">
                <h1 style={{ textAlign: "center" }}>CUSTOM SUBJECT</h1>
              </div>
              <div class="mt-3 " style={{ textAlign: "center" }}>
                <img src="register-icon.png" width="100px" alt="" />
              </div>
              <form action="">
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    No. of Question
                  </label>
                  <input
                    type="text"
                    name="noOfQuestion"
                    required
                    class="form-control  border-info"
                    placeholder="No. of Question"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    class="form-control  border-info"
                    placeholder="Subject"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    required
                    class="form-control  border-info"
                    placeholder="Topic"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Sub Topic
                  </label>
                  <input
                    type="text"
                    name="subTopic"
                    required
                    class="form-control  border-info"
                    placeholder="Sub Topic"
                  />
                </div>
                <div class="py-3 mx-5">
                  <label htmlFor="" className="mb-2">
                    Difficulty Level
                  </label>
                  <input
                    type="text"
                    name="difficultyLevel"
                    required
                    class="form-control  border-info"
                    placeholder="Difficulty Level"
                  />
                </div>
                <div class="pt-3 mx-5 ">
                  <input
                    type="button"
                    class="form-control btn-info text-white"
                    value="Start Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <section className="py-4 container">
        <h2 className="pb-4 text-center text-lg-start">
          Full size Mock Text <span className="badge bg-secondary">New</span>
        </h2>
        {/* <div
          id="carouselExampleCaptions"
          className="carousel slide col-lg-6 mx-auto"
        >
          <div className="carousel-indicators ">
            {slice.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner ">
            {slice.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src="https://1.bp.blogspot.com/-jb2R1CTYbFs/XvdDQ7BILyI/AAAAAAAAAgg/F0K-ILF7zc0L9LeFPakprPvN48fE_qW4QCK4BGAsYHg/s1950/16.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-md-block text-dark ">
                  <h5>{item.subject_name}</h5>
                  <div className="text-center">
                    <button type="button" class="btn btn-secondary">
                      <NavLink
                        exact
                        to={`/StudentDashboard/Exam/${item.subject_name}`}
                        class="card-link text-white text-decoration-none"
                      >
                        Go To Exam
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev "
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-secondary"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-secondary"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
        <div className="mock-div">
          <div>
            <img src="./Mock.png" alt="Mock" />
            <h3>Mock Test</h3>
            <button
              type="button"
              onClick={() => {
                setShowModel(true);
              }}
            >
              Take Test
            </button>
          </div>
        </div>
      </section>

      <hr />
    </>
  );
}

export default Subject;
